package com.bivc.cimsmgs.services.ky2;

import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.KontGruzHistoryDAO;
import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.dao.VagonHistoryDAO;
import com.bivc.cimsmgs.dao.YardSectorDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.db.ky.YardSector;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
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

import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.POEZD;
import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.YARD;
import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.saveVagContGruzHistory;

/**
 * @author p.dzeviarylin
 */
public class BindPoezdAndYardService {

    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private PoezdDAO poezdDAO;
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

    public synchronized String bindPoezdToYard(String poezdObj, String yardSectorsObj, Usr usr) throws Exception {
        final PoezdBindDTO poezdBindDTO =  defaultDeserializer.read(PoezdBindDTO.class, poezdObj);
        final List<YardSectorBindDTO> yardSectorsBindDTO = defaultDeserializer.read(new ArrayList<YardSectorBindDTO>() {}.getClass().getGenericSuperclass(), yardSectorsObj);

        Poezd poezd = poezdDAO.findById(poezdBindDTO.getHid(), false);
        final List<YardSector> yardSectors = yardSectorDAO.findAll(usr);

        Map<String, List<?>> contGruz4History = poezd.bindPoezdToYard(poezdBindDTO.getVagons(), yardSectors, mapper, poezd.getDotp());
        poezdDAO.makePersistent(poezd);
        saveVagContGruzHistory(contGruz4History, kontGruzHistoryDAO, POEZD, vagonHistoryDAO, usr.getUn(), null);

        final List<Kont> rejectedKonts = new ArrayList<>();
        for (YardSectorBindDTO yardSectorBindDTO : yardSectorsBindDTO){
            for(YardSector yardSector: yardSectors){
                if (Objects.equals(yardSector.getHid(), yardSectorBindDTO.getHid())) {  // found sector
                    contGruz4History = yardSector.bindYardToPoezd(yardSectorBindDTO, poezd.getVagons(), mapper, yardSectors);
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
