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

import java.util.Arrays;

/**
 * @author p.dzeviarylin
 */
public class VgCtGrBind extends CimSmgsSupport_A {

    private static final Logger log = LoggerFactory.getLogger(VgCtGrBind.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (VgCtGrBind.Action.valueOf(action.toUpperCase())) {
                case GET_POESD_INTO_AND_POEZD_OUT_FOR_BIND:
                    return getPoesdIntoAndPoezdOutForBind();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
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

    enum Action {GET_POESD_INTO_AND_POEZD_OUT_FOR_BIND}
}
