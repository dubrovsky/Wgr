package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.YardSector;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.AvtoBindDTO;
import com.bivc.cimsmgs.dto.ky2.AvtoBindViewDTO;
import com.bivc.cimsmgs.dto.ky2.YardSectorBindDTO;
import com.bivc.cimsmgs.dto.ky2.YardSectorBindViewDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.AVTO;
import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.YARD;

public class BindAvtoAndYard_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(BindAvtoAndYard_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (BindAvtoAndYard_A.Action.valueOf(action.toUpperCase())) {
                case GET_AVTO_AND_YARD_FOR_BIND:
                    return getAvtoAndYardForBind();
                case BIND_AVTO_AND_YARD:
                    return bindAvtoToYard();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }

    private String bindAvtoToYard() throws Exception {
        final AvtoBindDTO avtoBindDTO = defaultDeserializer.read(AvtoBindDTO.class, avtoObj);
        final List<YardSectorBindDTO> yardSectorsBindDTO = defaultDeserializer.read(new ArrayList<YardSectorBindDTO>() {}.getClass().getGenericSuperclass(), yardSectorsObj);

        Avto avto = avtoDAO.findById(avtoBindDTO.getHid(), false);
        final List<YardSector> yardSectors = yardSectorDAO.findAll(getUser().getUsr());

        Map<String, List<?>> contGruz4History = avto.bindAvtoToYard(avtoBindDTO.getKonts(), yardSectors, mapper);
        avtoDAO.makePersistent(avto);
        saveContGruzHistory(contGruz4History, kontGruzHistoryDAO, AVTO);

        for (YardSectorBindDTO yardSectorBindDTO : yardSectorsBindDTO){
            for(YardSector yardSector: yardSectors){
                if (Objects.equals(yardSector.getHid(), yardSectorBindDTO.getHid())) {  // found sector
                    contGruz4History = yardSector.bindYardToAvto(yardSectorBindDTO, avto, mapper, yardSectors);
                    yardSectorDAO.makePersistent(yardSector);
                    saveContGruzHistory(contGruz4History, kontGruzHistoryDAO, YARD);
                    break;
                }
            }
        }

        setJSONData(defaultSerializer.write(new Response<>()));
        return SUCCESS;
    }

    private String getAvtoAndYardForBind() throws Exception {
        Avto avto = avtoDAO.findById(avtoHid, false);
        final List<YardSector> yardSectors = yardSectorDAO.findAll(getUser().getUsr());
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        Arrays.asList(
                                                mapper.map(avto, AvtoBindViewDTO.class),
                                                mapper.mapAsList(yardSectors, YardSectorBindViewDTO.class)
                                        ),
                                        2L
                                )
                        )
        );
        return SUCCESS;
    }

    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private Mapper mapper;
    @Autowired
    private AvtoDAO avtoDAO;
    @Autowired
    private YardDAO yardDAO;
    @Autowired
    private YardSectorDAO yardSectorDAO;
    @Autowired
    private KontGruzHistoryDAO kontGruzHistoryDAO;

    private String action;
    private String dataObj;
    private String avtoObj;
    private String yardSectorsObj;
    private Long avtoHid;

    public void setAction(String action) {
        this.action = action;
    }

    public void setDataObj(String dataObj) {
        this.dataObj = dataObj;
    }

    public void setAvtoHid(Long avtoHid) {
        this.avtoHid = avtoHid;
    }

    public void setAvtoObj(String avtoObj) {
        this.avtoObj = avtoObj;
    }

    public void setYardSectorsObj(String yardSectorsObj) {
        this.yardSectorsObj = yardSectorsObj;
    }

    enum Action {GET_AVTO_AND_YARD_FOR_BIND, BIND_AVTO_AND_YARD}
}
