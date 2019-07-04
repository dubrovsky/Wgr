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

/**
 * @author p.dzeviarylin
 */
public class PoezdVgCtGrBind_A extends CimSmgsSupport_A {

    private static final Logger log = LoggerFactory.getLogger(PoezdVgCtGrBind_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (PoezdVgCtGrBind_A.Action.valueOf(action.toUpperCase())) {
                case GET_POEZD_AND_POEZD_FOR_BIND:
                    return getPoezdAndPoezdForBind();
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
        List<PoezdBindDTO> poezdBindDTOS = defaultDeserializer.read(new ArrayList<PoezdBindDTO>() {}.getClass().getGenericSuperclass(), dataObj);
        PoezdBindDTO poezd1BindDTO = poezdBindDTOS.get(0);
        PoezdBindDTO poezd2BindDTO = poezdBindDTOS.get(1);
        Poezd poezd1 = poezdDAO.findById(poezd1BindDTO.getHid(), false);
        Poezd poezd2 = poezdDAO.findById(poezd2BindDTO.getHid(), false);
        poezd1.bindPoezdToPoezd(poezd1BindDTO.getVagons(), poezd2.getVagons(), mapper);
        poezd2.bindPoezdToPoezd(poezd2BindDTO.getVagons(), poezd1.getVagons(), mapper);
        poezdDAO.makePersistent(poezd1);
        poezdDAO.makePersistent(poezd2);

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
    private Long poezd1Hid;
    private Long poezd2Hid;

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

    enum Action {GET_POEZD_AND_POEZD_FOR_BIND, BIND_POEZD_TO_POEZD}
}
