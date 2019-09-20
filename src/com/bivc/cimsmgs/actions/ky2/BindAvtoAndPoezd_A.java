package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.AvtoDAO;
import com.bivc.cimsmgs.dao.KontGruzHistoryDAO;
import com.bivc.cimsmgs.dao.PoezdDAO;
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
public class BindAvtoAndPoezd_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(BindPoezdAndYard_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (BindAvtoAndPoezd_A.Action.valueOf(action.toUpperCase())) {
                case GET_AVTO_AND_POEZD_FOR_BIND:
                    return getPoezdAndAvtoForBind();
                case BIND_AVTO_AND_POEZD:
                    return bindAvtoToPoezd();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }

    private String bindAvtoToPoezd() throws Exception {
        final AvtoBindDTO avtoBindDTO = defaultDeserializer.read(AvtoBindDTO.class, avtoObj);
        final List<PoezdBindDTO> poezdsBindDTO = defaultDeserializer.read(new ArrayList<PoezdBindDTO>() {}.getClass().getGenericSuperclass(), poezdsObj);

        Avto avto = avtoDAO.findById(avtoBindDTO.getHid(), false);
        List<Long> ids = new ArrayList<>(poezdsBindDTO.size());
        for (PoezdBindDTO poezdBindDTO : poezdsBindDTO) {
            ids.add(poezdBindDTO.getHid());
        }
        final List<Poezd> poezds = poezdDAO.findByIds(ids);

        Map<String, List<?>> contGruz4History = avto.bindAvtoToPoezd(avtoBindDTO, poezds, mapper);
        avtoDAO.makePersistent(avto);
        saveContGruzHistory(contGruz4History, kontGruzHistoryDAO, AVTO);

        for (PoezdBindDTO poezdBindDTO : poezdsBindDTO){
            for(Poezd poezd: poezds){
                if (Objects.equals(poezd.getHid(), poezdBindDTO.getHid())) {  // found avto
                    contGruz4History = poezd.bindPoezdsToAvto(poezdBindDTO.getVagons(), avto, mapper, poezds);
                    poezdDAO.makePersistent(poezd);
                    saveContGruzHistory(contGruz4History, kontGruzHistoryDAO, POEZD);
                    break;
                }
            }
        }

        setJSONData(defaultSerializer.write(new Response<>()));
        return SUCCESS;
    }

    private String getPoezdAndAvtoForBind() throws Exception {
        Avto avto = avtoDAO.findById(avtoHid, false);
        final List<Poezd> poezds = poezdDAO.findAllPresentPoezds(getUser().getUsr(), routeId, direction);
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        Arrays.asList(
                                                mapper.map(avto, AvtoBindViewDTO.class),
                                                mapper.mapAsList(poezds, PoezdBindViewDTO.class)
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

    private String action;
    private String avtoObj;
    private String poezdsObj;
    private Long avtoHid;
    private Byte direction;
    private long routeId;

    public void setAction(String action) {
        this.action = action;
    }

    public void setAvtoObj(String avtoObj) {
        this.avtoObj = avtoObj;
    }

    public void setPoezdsObj(String poezdsObj) {
        this.poezdsObj = poezdsObj;
    }

    public void setAvtoHid(Long avtoHid) {
        this.avtoHid = avtoHid;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public void setRouteId(long routeId) {
        this.routeId = routeId;
    }

    enum Action {GET_AVTO_AND_POEZD_FOR_BIND, BIND_AVTO_AND_POEZD}
}
