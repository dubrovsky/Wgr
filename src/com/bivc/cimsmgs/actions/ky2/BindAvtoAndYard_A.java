package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.KontGruzHistory;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.db.ky.YardSector;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.*;
import com.bivc.cimsmgs.exchange.KYKontsLoader;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.bivc.cimsmgs.services.ky2.BindAvtoAndYardService;
import com.bivc.cimsmgs.services.ky2.BindPoezdAndYardService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

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
                case UPLOAD:
                    return uploadXLS();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }

    public String uploadXLS() throws Exception {
        log.info("uploadKontList");
        HashSet<String> konts = new KYKontsLoader().load(fileData);
        setJSONData(defaultSerializer.write(new Response<>(konts)));
        return SUCCESS;
    }

    private String bindAvtoToYard() throws Exception {
        setJSONData(bindAvtoAndYardService.bindAvtoToYard(avtoObj, yardSectorsObj, getUser().getUsr()));

        //        final AvtoBindDTO avtoBindDTO = defaultDeserializer.read(AvtoBindDTO.class, avtoObj);
//        final List<YardSectorBindDTO> yardSectorsBindDTO = defaultDeserializer.read(new ArrayList<YardSectorBindDTO>() {}.getClass().getGenericSuperclass(), yardSectorsObj);
//
//        Avto avto = avtoDAO.findById(avtoBindDTO.getHid(), false);
//        final List<YardSector> yardSectors = yardSectorDAO.findAll(getUser().getUsr());
//
//        Map<String, List<?>> contGruz4History = avto.bindAvtoToYard(avtoBindDTO.getKonts(), yardSectors, mapper, avto.getDotp());
//        avtoDAO.makePersistent(avto);
//        saveVagContGruzHistory(contGruz4History, kontGruzHistoryDAO, AVTO, vagonHistoryDAO, getUser().getUsr().getUn(), null);
//
//        for (YardSectorBindDTO yardSectorBindDTO : yardSectorsBindDTO){
//            for(YardSector yardSector: yardSectors){
//                if (Objects.equals(yardSector.getHid(), yardSectorBindDTO.getHid())) {  // found sector
//                    contGruz4History = yardSector.bindYardToAvto(yardSectorBindDTO, avto, mapper, yardSectors);
//                    yardSectorDAO.makePersistent(yardSector);
//                    saveVagContGruzHistory(contGruz4History, kontGruzHistoryDAO, YARD, vagonHistoryDAO, getUser().getUsr().getUn(), null);
//                    break;
//                }
//            }
//        }
//
//        setJSONData(defaultSerializer.write(new Response<>()));
        return SUCCESS;
    }

    private String getAvtoAndYardForBind() throws Exception {
        Avto avto = avtoDAO.findById(avtoHid, false);
        final List<YardSector> yardSectors = yardSectorDAO.findAll(getUser().getUsr());
        List<YardSectorBindViewDTO> yardSectorBindViewDTOS= mapper.mapAsList(yardSectors, YardSectorBindViewDTO.class);

        if(getFlag()!=null&&getFlag())
        {
            addHistory(yardSectorBindViewDTOS);
        }
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        Arrays.asList(
                                                mapper.map(avto, AvtoBindViewDTO.class),
                                                yardSectorBindViewDTOS
                                        ),
                                        2L
                                )
                        )
        );
        return SUCCESS;
    }
    private void addHistory(List<YardSectorBindViewDTO> list)
    {
        List<Long> hids= new ArrayList<>();
        for (YardSectorBindViewDTO sector : list) {
            for (YardBindViewDTO yard : sector.getYards()) {
                hids.addAll(yard.getKonts().stream().map(KontBindViewDTO::getHid).collect(Collectors.toList()));
            }
        }
        List<KontGruzHistory>histories=kontGruzHistoryDAO.findEarliestHistoryByArrivalList(hids);
        for (YardSectorBindViewDTO sector : list) {
            for (YardBindViewDTO yard : sector.getYards()) {
                for (KontBindViewDTO kont : yard.getKonts()) {
                    for(KontGruzHistory history:histories)
                    {
                        if(history.getKont().getHid().equals(kont.getHid()))
                        {
                            Poezd poezd=history.getPoezd();
                            if(poezd!=null)
                                kont.setPoezd(new PoezdFilterDTO(poezd.getHid(),poezd.getNpprm()));
                            Avto avto=history.getAvto();
                            if(avto!=null)
                                kont.setAvto(new AvtoFilterDTO(avto.getHid()));
                            break;
                        }
                    }
                }
            }
        }
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
    @Autowired
    private VagonHistoryDAO vagonHistoryDAO;
    @Autowired
    private BindAvtoAndYardService bindAvtoAndYardService;

    private File fileData;
    private String action;
    private String dataObj;
    private String avtoObj;
    private String yardSectorsObj;
    private Long avtoHid;

    public void setUpload(File file) {
        this.fileData = file;
    }

    public File getUpload() {
        return this.fileData;
    }

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

    enum Action {UPLOAD, GET_AVTO_AND_YARD_FOR_BIND, BIND_AVTO_AND_YARD}
}
