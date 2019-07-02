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
                case GET_POESD_INTO_AND_POEZD_OUT_FOR_BIND:
                    return getPoesdIntoAndPoezdOutForBind();
                case BIND_POESD_INTO_TO_POEZD_OUT:
                    return bindPoesdIntoToPoezdOut();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }

    private String bindPoesdIntoToPoezdOut() throws Exception {
        List<PoezdBindDTO> poezdBindDTOS = defaultDeserializer.read(new ArrayList<PoezdBindDTO>() {}.getClass().getGenericSuperclass(), dataObj);
        PoezdBindDTO poezdBindDTOInto = poezdBindDTOS.get(0);
        PoezdBindDTO poezdBindDTOOut = poezdBindDTOS.get(1);
        Poezd poezdInto = poezdDAO.findById(poezdBindDTOInto.getHid(), false);
        Poezd poezdOut = poezdDAO.findById(poezdBindDTOOut.getHid(), false);
        poezdInto.bindPoezdToPoezd(poezdBindDTOInto.getVagons(), poezdOut.getVagons(), mapper);
        poezdOut.bindPoezdToPoezd(poezdBindDTOOut.getVagons(), poezdInto.getVagons(), mapper);
        poezdDAO.makePersistent(poezdInto);
        poezdDAO.makePersistent(poezdOut);

        setJSONData(defaultSerializer.write(new Response<>()));
        return SUCCESS;
    }

    private String getPoesdIntoAndPoezdOutForBind() throws Exception {
        Poezd intoPoezd = poezdDAO.findById(intoPoezdHid, false);
        Poezd outPoezd = poezdDAO.findById(outPoezdHid, false);
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        Arrays.asList(
                                                mapper.map(intoPoezd, PoezdBindDTO.class),
                                                mapper.map(outPoezd, PoezdBindDTO.class)
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
    private Long intoPoezdHid;
    private Long outPoezdHid;

    public void setAction(String action) {
        this.action = action;
    }

    public void setIntoPoezdHid(Long intoPoezdHid) {
        this.intoPoezdHid = intoPoezdHid;
    }

    public void setOutPoezdHid(Long outPoezdHid) {
        this.outPoezdHid = outPoezdHid;
    }

    public void setDataObj(String dataObj) {
        this.dataObj = dataObj;
    }

    enum Action {GET_POESD_INTO_AND_POEZD_OUT_FOR_BIND, BIND_POESD_INTO_TO_POEZD_OUT}
}
