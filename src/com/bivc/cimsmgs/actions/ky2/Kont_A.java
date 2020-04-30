package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.KontDAO;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.doc2doc.orika.CopyKontMapper;
import com.bivc.cimsmgs.dto.ky2.KontDTO;
import com.bivc.cimsmgs.dto.ky2.KontSearchDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.bivc.cimsmgs.sql.Select;
import com.isc.utils.dbStore.dbTool;
import com.isc.utils.dbStore.jsonStore;
import com.isc.utils.dbStore.stPack;
import com.isc.utils.dbStore.typesAndValues;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Types;
import java.util.*;

/**
 * @author p.dzeviarylin
 */
public class Kont_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(Kont_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (Kont_A.Action.valueOf(action.toUpperCase())) {
                case GETBYNKON:
                    return getByNkon();
                default:
                    throw new RuntimeException("Unknown action");
            }
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }

    private String getByNkon() throws Exception {
        Kont kont = kontDAO.findByNkon(getNkon());
        KontSearchDTO kontSearchDTO = kykontMapper.copy(kont, KontSearchDTO.class);
        if (kontSearchDTO != null && (routeId == null || kont.getYard() == null || kont.getYard().getSector() == null || !routeId.equals(kont.getYard().getSector().getRoute().getHid())))
            kontSearchDTO.setYard(null);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(kontSearchDTO)
                        )
        );
        return SUCCESS;
    }

    private String action;
    private String filter;
    private String nkon;
    private Long routeId;
    @Autowired
    private KontDAO kontDAO;
    @Autowired
    private Mapper kykontMapper;



    public String getNkon() {
        return nkon;
    }

    public void setNkon(String nkon) {
        this.nkon = nkon;
    }

    public Long getRouteId() {
        return routeId;
    }

    public void setRouteId(Long routeId) {
        this.routeId = routeId;
    }

    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private Serializer defaultSerializer;

    public void setAction(String action) {
        this.action = action;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    enum Action {
        GETBYNKON
    }
}
