package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.KontDAO;
import com.bivc.cimsmgs.dao.VagonDAO;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Vagon;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.VagonBaseDTO;
import com.bivc.cimsmgs.dto.ky2.KontDTO;
import com.bivc.cimsmgs.dto.ky2.VagonDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author p.dzeviarylin
 */
public class Vagon_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(Vagon_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (Vagon_A.Action.valueOf(action.toUpperCase())) {
                case GETBYNVAG:
                    return getByNvag();
                default:
                    throw new RuntimeException("Unknown action");
            }
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }

    private String getByNvag() throws Exception {
        Vagon vagon = vagonDAO.findByNvag(getNvag());

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyvagonMapper.copy(vagon, VagonBaseDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    private String action;
    private String filter;
    private String nvag;
    private long routeId;
    @Autowired
    private VagonDAO vagonDAO;
    @Autowired
    private Mapper kyvagonMapper;

    public String getNvag() {
        return nvag;
    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public long getRouteId() {
        return routeId;
    }

    public void setRouteId(long routeId) {
        this.routeId = routeId;
    }

    @Autowired
    private Serializer defaultSerializer;

    public void setAction(String action) {
        this.action = action;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    enum Action {
        GETBYNVAG
    }
}
