package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.dao.YardDAO;
import com.bivc.cimsmgs.dao.YardSectorDAO;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.db.ky.YardSector;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.PoezdBindDTO;
import com.bivc.cimsmgs.dto.ky2.YardSectorBindDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;

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
                case BIND_POEZD_TO_YARD:
                    return bindPoezdToYard();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }

    private String bindPoezdToYard() {
        return SUCCESS;
    }

    private String getPoezdAndYardForBind() throws Exception {
        Poezd poezd = poezdDAO.findById(poezdHid, false);
        final List<YardSector> yardSectors = yardSectorDAO.findAll(getUser().getUsr());
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        Arrays.asList(
                                                mapper.map(poezd, PoezdBindDTO.class),
                                                mapper.mapAsList(yardSectors, YardSectorBindDTO.class)
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
    private YardDAO yardDAO;
    @Autowired
    private YardSectorDAO yardSectorDAO;

    private String action;
    private String dataObj;
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

    enum Action {GET_POEZD_AND_YARD_FOR_BIND, BIND_POEZD_TO_YARD}
}