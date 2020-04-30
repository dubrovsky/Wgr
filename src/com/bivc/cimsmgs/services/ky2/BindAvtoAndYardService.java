package com.bivc.cimsmgs.services.ky2;

import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.db.ky.YardSector;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.AvtoBindDTO;
import com.bivc.cimsmgs.dto.ky2.PoezdBindDTO;
import com.bivc.cimsmgs.dto.ky2.YardSectorBindDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.*;
import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.saveVagContGruzHistory;

/**
 * @author p.dzeviarylin
 */
public class BindAvtoAndYardService {

    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private AvtoDAO avtoDAO;
    @Autowired
    private YardSectorDAO yardSectorDAO;
    @Autowired
    private Mapper mapper;
    @Autowired
    private KontGruzHistoryDAO kontGruzHistoryDAO;
    @Autowired
    private VagonHistoryDAO vagonHistoryDAO;
    @Autowired
    private Serializer defaultSerializer;

    public synchronized String bindAvtoToYard(String avtoObj, String yardSectorsObj, Usr usr) throws Exception {
        final AvtoBindDTO avtoBindDTO = defaultDeserializer.read(AvtoBindDTO.class, avtoObj);
        final List<YardSectorBindDTO> yardSectorsBindDTO = defaultDeserializer.read(new ArrayList<YardSectorBindDTO>() {}.getClass().getGenericSuperclass(), yardSectorsObj);

        Avto avto = avtoDAO.findById(avtoBindDTO.getHid(), false);
        final List<YardSector> yardSectors = yardSectorDAO.findAll(usr);

        Map<String, List<?>> contGruz4History = avto.bindAvtoToYard(avtoBindDTO.getKonts(), yardSectors, mapper, avto.getDotp());
        avtoDAO.makePersistent(avto);
        saveVagContGruzHistory(contGruz4History, kontGruzHistoryDAO, AVTO, vagonHistoryDAO, usr.getUn(), null);

        final List<Kont> rejectedKonts = new ArrayList<>();
        for (YardSectorBindDTO yardSectorBindDTO : yardSectorsBindDTO){
            for(YardSector yardSector: yardSectors){
                if (Objects.equals(yardSector.getHid(), yardSectorBindDTO.getHid())) {  // found sector
                    contGruz4History = yardSector.bindYardToAvto(yardSectorBindDTO, avto, mapper, yardSectors);
                    rejectedKonts.addAll((List<Kont>) contGruz4History.get("rejectedKonts"));
                    yardSectorDAO.makePersistent(yardSector);
                    saveVagContGruzHistory(contGruz4History, kontGruzHistoryDAO, YARD, vagonHistoryDAO, usr.getUn(), null);
                    break;
                }
            }
        }

        if(rejectedKonts.isEmpty()) {
            return defaultSerializer.write(new Response<>());
        } else {
            return defaultSerializer.write(new Response<>(rejectedKonts.stream().map(Kont::getNkon).collect(Collectors.joining(", "))));
        }
    }
}
