package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.AvtoDAO;
import com.bivc.cimsmgs.dao.KontGruzHistoryDAO;
import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.dao.VagonHistoryDAO;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.AvtoBindDTO;
import com.bivc.cimsmgs.dto.ky2.AvtoBindViewDTO;
import com.bivc.cimsmgs.dto.ky2.PoezdBindDTO;
import com.bivc.cimsmgs.dto.ky2.PoezdBindViewDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.AVTO;
import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.POEZD;

/**
 * @author p.dzeviarylin
 */
public class BindPoezdAndAvto_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(BindPoezdAndYard_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (BindPoezdAndAvto_A.Action.valueOf(action.toUpperCase())) {
                case GET_POEZD_AND_AVTO_FOR_BIND:
                    return getPoezdAndAvtoForBind();
                case BIND_POEZD_AND_AVTO:
                    return bindPoezdToAvto();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }

    private String bindPoezdToAvto() throws Exception {
        final PoezdBindDTO poezdBindDTO = defaultDeserializer.read(PoezdBindDTO.class, poezdObj);
        final List<AvtoBindDTO> avtosBindDTO = defaultDeserializer.read(new ArrayList<AvtoBindDTO>() {}.getClass().getGenericSuperclass(), avtosObj);

        Poezd poezd = poezdDAO.findById(poezdBindDTO.getHid(), false);
        List<Long> ids = new ArrayList<>(avtosBindDTO.size());
        for (AvtoBindDTO avtoBindDTO : avtosBindDTO) {
            ids.add(avtoBindDTO.getHid());
        }
        final List<Avto> avtos = avtoDAO.findByIds(ids);

        Map<String, List<?>> contGruz4History = poezd.bindPoezdToAvtos(poezdBindDTO.getVagons(), avtos, mapper);
        poezdDAO.makePersistent(poezd);
        saveVagContGruzHistory(contGruz4History, kontGruzHistoryDAO, POEZD, vagonHistoryDAO, getUser().getUsr().getUn(), null);

        for (AvtoBindDTO avtoBindDTO : avtosBindDTO){
            for(Avto avto: avtos){
                if (Objects.equals(avto.getHid(), avtoBindDTO.getHid())) {  // found avto
                    contGruz4History = avto.bindAvtoToPoezd(avtoBindDTO, poezd.getVagons(), mapper, avtos);
                    avtoDAO.makePersistent(avto);
                    saveVagContGruzHistory(contGruz4History, kontGruzHistoryDAO, AVTO, vagonHistoryDAO, getUser().getUsr().getUn(), null);
                    break;
                }
            }
        }

        setJSONData(defaultSerializer.write(new Response<>()));
        return SUCCESS;
    }

    private String getPoezdAndAvtoForBind() throws Exception {
        Poezd poezd = poezdDAO.findById(poezdHid, false);
        final List<Avto> avtos = avtoDAO.findAllPresentAvtos(getUser().getUsr(), routeId, direction);
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        Arrays.asList(
                                                mapper.map(poezd, PoezdBindViewDTO.class),
                                                mapper.mapAsList(avtos, AvtoBindViewDTO.class)
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
    private PoezdDAO poezdDAO;
    @Autowired
    private AvtoDAO avtoDAO;
    @Autowired
    private KontGruzHistoryDAO kontGruzHistoryDAO;
    @Autowired
    private VagonHistoryDAO vagonHistoryDAO;

    private String action;
    private String poezdObj;
    private String avtosObj;
    private Long poezdHid;
    private Byte direction;
    private long routeId;

    public void setAction(String action) {
        this.action = action;
    }

    public void setPoezdObj(String poezdObj) {
        this.poezdObj = poezdObj;
    }

    public void setAvtosObj(String avtosObj) {
        this.avtosObj = avtosObj;
    }

    public void setPoezdHid(Long poezdHid) {
        this.poezdHid = poezdHid;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public void setRouteId(long routeId) {
        this.routeId = routeId;
    }

    enum Action {GET_POEZD_AND_AVTO_FOR_BIND, BIND_POEZD_AND_AVTO}
}
