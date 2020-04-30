package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.*;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.bivc.cimsmgs.services.ky2.BindPoezdAndYardService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;
import java.util.stream.Collectors;

import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.POEZD;
import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.YARD;

/**
 * @author p.dzeviarylin
 */
public class BindPoezdAndYard_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(BindPoezdAndYard_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (BindPoezdAndYard_A.Action.valueOf(action.toUpperCase())) {
                case GET_POEZD_AND_YARD_FOR_BIND:
                    return getPoezdAndYardForBind();
                case BIND_POEZD_AND_YARD:
                    return bindPoezdToYard();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }

    public String bindPoezdToYard() throws Exception {
        setJSONData(bindPoezdAndYardService.bindPoezdToYard(poezdObj, yardSectorsObj, getUser().getUsr()));


        /*final PoezdBindDTO poezdBindDTO =  defaultDeserializer.read(PoezdBindDTO.class, poezdObj);
        final List<YardSectorBindDTO> yardSectorsBindDTO = defaultDeserializer.read(new ArrayList<YardSectorBindDTO>() {}.getClass().getGenericSuperclass(), yardSectorsObj);

        Poezd poezd = poezdDAO.findById(poezdBindDTO.getHid(), false);
        final List<YardSector> yardSectors = yardSectorDAO.findAll(getUser().getUsr());

        Map<String, List<?>> contGruz4History = poezd.bindPoezdToYard(poezdBindDTO.getVagons(), yardSectors, mapper, poezd.getDotp());
        poezdDAO.makePersistent(poezd);
        saveVagContGruzHistory(contGruz4History, kontGruzHistoryDAO, POEZD, vagonHistoryDAO, getUser().getUsr().getUn());

        for (YardSectorBindDTO yardSectorBindDTO : yardSectorsBindDTO){
            for(YardSector yardSector: yardSectors){
                if (Objects.equals(yardSector.getHid(), yardSectorBindDTO.getHid())) {  // found sector
                    contGruz4History = yardSector.bindYardToPoezd(yardSectorBindDTO, poezd.getVagons(), mapper, yardSectors);
                    yardSectorDAO.makePersistent(yardSector);
                    saveVagContGruzHistory(contGruz4History, kontGruzHistoryDAO, YARD, vagonHistoryDAO, getUser().getUsr().getUn());
                    break;
                }
            }
        }

        final List<Kont> rejectedKonts = (List<Kont>) contGruz4History.get("rejectedKonts");
        if(rejectedKonts == null || rejectedKonts.isEmpty()) {
            setJSONData(defaultSerializer.write(new Response<>()));
        } else {
            setJSONData(defaultSerializer.write(new Response<>(rejectedKonts.stream().map(Kont::getNkon).collect(Collectors.joining(", ")))));
        }*/

        return SUCCESS;
    }

    private String getPoezdAndYardForBind() throws Exception {
        Poezd poezd = poezdDAO.findById(poezdHid, false);
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
                                                mapper.map(poezd, PoezdBindViewDTO.class),
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
//                   List<KontGruzHistory>histories=kontGruzHistoryDAO.findEarliestHistoryByArrivalList(hids);
//                for (KontBindViewDTO kont : yard.getKonts()) {
//                    for(KontGruzHistory history:histories)
//                    {
//                     if(history.getKont().getHid()==kont.getHid())
//                     {
//                        Poezd poezd=history.getPoezd();
//                        if(poezd!=null)
//                            kont.setPoezd(new PoezdFilterDTO(poezd.getHid(),poezd.getNpprm()));
//                        Avto avto=history.getAvto();
//                        if(avto!=null)
//                            kont.setAvto(new AvtoFilterDTO(avto.getHid()));
//                         break;
//                     }
//                    }
////                    KontGruzHistory history=kontGruzHistoryDAO.findEarliestHistoryByArrival(kont.getHid());
////                    if(history!=null)
////                    {
////                        Poezd poezd=history.getPoezd();
////                        if(poezd!=null)
////                            kont.setPoezd(new PoezdFilterDTO(poezd.getHid(),poezd.getNpprm()));
////                        Avto avto=history.getAvto();
////                        if(avto!=null)
////                            kont.setAvto(new AvtoFilterDTO(avto.getHid()));
////                    }
//                }
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
    private PoezdDAO poezdDAO;
    @Autowired
    private YardDAO yardDAO;
    @Autowired
    private YardSectorDAO yardSectorDAO;
    @Autowired
    private KontGruzHistoryDAO kontGruzHistoryDAO;
    @Autowired
    private VagonHistoryDAO vagonHistoryDAO;
    @Autowired
    private BindPoezdAndYardService bindPoezdAndYardService;

    private String action;
    private String dataObj;
    private String poezdObj;
    private String yardSectorsObj;
    private Long poezdHid;

    public void setAction(String action) {
        this.action = action;
    }

    public void setDataObj(String dataObj) {
        this.dataObj = dataObj;
    }

    public void setPoezdHid(Long poezdHid) {
        this.poezdHid = poezdHid;
    }

    public void setPoezdObj(String poezdObj) {
        this.poezdObj = poezdObj;
    }

    public void setYardSectorsObj(String yardSectorsObj) {
        this.yardSectorsObj = yardSectorsObj;
    }

    enum Action {GET_POEZD_AND_YARD_FOR_BIND, BIND_POEZD_AND_YARD}
}
