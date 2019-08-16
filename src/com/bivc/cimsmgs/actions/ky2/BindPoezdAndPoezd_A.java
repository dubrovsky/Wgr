package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.PoezdBindDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

/**
 * @author p.dzeviarylin
 */
public class BindPoezdAndPoezd_A extends CimSmgsSupport_A {

    private static final Logger log = LoggerFactory.getLogger(BindPoezdAndPoezd_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (BindPoezdAndPoezd_A.Action.valueOf(action.toUpperCase())) {
                case GET_POEZD_AND_POEZD_FOR_BIND:
                    return getPoezdAndPoezdForBind();
                case GET_POEZD_AND_ALL_POEZDS_FOR_BIND:
                    return getPoezdAndAllPoezdsForBind();
                case BIND_POEZD_TO_POEZD:
                    return bindPoezdToPoezd();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }

    private String bindPoezdToPoezd() throws Exception {
        /*List<PoezdBindDTO> poezdBindDTOS = defaultDeserializer.read(new ArrayList<PoezdBindDTO>() {}.getClass().getGenericSuperclass(), dataObj);
        PoezdBindDTO poezd1BindDTO = poezdBindDTOS.get(0);
        PoezdBindDTO poezd2BindDTO = poezdBindDTOS.get(1);*/

        final PoezdBindDTO poezdBindDTO = defaultDeserializer.read(PoezdBindDTO.class, poezdObj);
        final List<PoezdBindDTO> poezdsBindDTO = defaultDeserializer.read(new ArrayList<PoezdBindDTO>() {
        }.getClass().getGenericSuperclass(), poezdsObj);

        Poezd poezd = poezdDAO.findById(poezdBindDTO.getHid(), false);
        List<Long> ids = new ArrayList<>(poezdsBindDTO.size());
        for (PoezdBindDTO poezdBindDTO1 : poezdsBindDTO) {
            ids.add(poezdBindDTO1.getHid());
        }
        List<Poezd> poezds = poezdDAO.findByIds(ids);

        poezd.bindPoezdToPoezds(poezdBindDTO.getVagons(), poezds, mapper);
        poezdDAO.makePersistent(poezd);

        for (PoezdBindDTO poezdBindDTO1 : poezdsBindDTO) {
            for (Poezd poezd1 : poezds) {
                if (Objects.equals(poezd1.getHid(), poezdBindDTO1.getHid())) {  // found poezd
                    poezd1.bindPoezdsToPoezd(poezdBindDTO1.getVagons(), poezd.getVagons(), mapper, poezds);
                    poezdDAO.makePersistent(poezd1);
                    break;
                }
            }
        }
//        Poezd poezd2 = poezdDAO.findById(poezd2BindDTO.getHid(), false);


        /*poezd1.bindPoezdToPoezd(poezd1BindDTO.getVagons(), poezd2.getVagons(), mapper);
        poezd2.bindPoezdToPoezd(poezd2BindDTO.getVagons(), poezd1.getVagons(), mapper);
        poezdDAO.makePersistent(poezd1);
        poezdDAO.makePersistent(poezd2);*/

        setJSONData(defaultSerializer.write(new Response<>()));
        return SUCCESS;
    }

    private String getPoezdAndPoezdForBind() throws Exception {
        Poezd poezd1 = poezdDAO.findById(poezd1Hid, false);
        Poezd poezd2 = poezdDAO.findById(poezd2Hid, false);
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        Arrays.asList(
                                                mapper.map(poezd1, PoezdBindDTO.class),
                                                mapper.map(poezd2, PoezdBindDTO.class)
                                        ),
                                        2L
                                )
                        )
        );
        return SUCCESS;
    }

    private String getPoezdAndAllPoezdsForBind() throws Exception {
        Poezd poezd = poezdDAO.findById(poezd1Hid, false);
        final List<Poezd> poezds = poezdDAO.findAllPresentPoezds(getUser().getUsr(), getRouteId(), getDirection());
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        Arrays.asList(
                                                mapper.map(poezd, PoezdBindDTO.class),
                                                mapper.mapAsList(poezds, PoezdBindDTO.class)
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

    private String action;
    private String dataObj;
    private String poezdObj;
    private String poezdsObj;
    private Long poezd1Hid;
    private Long poezd2Hid;
    private Byte direction;
    private long routeId;

    public void setAction(String action) {
        this.action = action;
    }

    public void setDataObj(String dataObj) {
        this.dataObj = dataObj;
    }

    public void setPoezd1Hid(Long poezd1Hid) {
        this.poezd1Hid = poezd1Hid;
    }

    public void setPoezd2Hid(Long poezd2Hid) {
        this.poezd2Hid = poezd2Hid;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public long getRouteId() {
        return routeId;
    }

    public void setRouteId(long routeId) {
        this.routeId = routeId;
    }

    public String getPoezdObj() {
        return poezdObj;
    }

    public void setPoezdObj(String poezdObj) {
        this.poezdObj = poezdObj;
    }

    public String getPoezdsObj() {
        return poezdsObj;
    }

    public void setPoezdsObj(String poezdsObj) {
        this.poezdsObj = poezdsObj;
    }

    enum Action {GET_POEZD_AND_POEZD_FOR_BIND, BIND_POEZD_TO_POEZD, GET_POEZD_AND_ALL_POEZDS_FOR_BIND}
}
