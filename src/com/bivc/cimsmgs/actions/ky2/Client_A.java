package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.HibernateUtil;
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
public class Client_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(Client_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (Client_A.Action.valueOf(action.toUpperCase())) {
                case LIST:
                    return list();
                default:
                    throw new RuntimeException("Unknown action");
            }
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }

    public String list() throws Exception {
        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>() {
                }.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;
        StringBuffer query = new StringBuffer();
        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack();

        typesAndValues tv = new typesAndValues().add(Types.NUMERIC, getRouteId()).add(Types.NUMERIC, getRouteId()).add(Types.NUMERIC, getRouteId());
        query.append(" AND clg.GROUP_ID IN (");
        for (int i = 0; i < getUser().getUsr().getTrans().size(); i++) {
            tv.add(Types.CHAR, getUser().getUsr().getTrans().get(i));
            if (i > 0) query.append(",");
            query.append("?");
        }
        query.append(") ORDER BY k.HID DESC");

        log.debug(query.toString());

        dbt.read(st, Select.getSqlFile("ky/client/kont_list") + query, tv, getStart(), getLimit());
        stPack st2 = new stPack();
        dbt.read(st2, Select.getSqlFile("ky/client/kont_list_count") + query, tv);
        if(st2.getRowCount() == 0) st2.setObject(0,0, 0);

        Date d = new Date();
        for (int i = 0; i < st.getRowCount(); i++) {
            if (st.getObject(i, "dprb") != null) {
                st.setObject(i, "kyDays", dayInterval((Date) st.getObject(i, "dprb"), d));
            }
        }

        /*



        List<ClientBaseDTO> dtos = new ArrayList<>(); // data goes here

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        dtos,
                                        (long) dtos.size()
                                )
                        )
        );
*/
        setJSONData(new jsonStore(st, ((Number)st2.getObject(0,0)).intValue()).toString());
        return SUCCESS;
    }

    private Long dayInterval(Date d1, Date d2) throws Exception {
        if (d1 == null || d2 == null) return null;
        int ro = TimeZone.getDefault().getRawOffset();
        long dt1 = (d1.getTime() + ro) / (1000 * 60 * 60 * 24);
        long dt2 = (d2.getTime() + ro) / (1000 * 60 * 60 * 24);
        return (dt2 - dt1 + 1);
    }


    private String action;
    private String filter;
    private long routeId;

    public long getRouteId() {
        return routeId;
    }

    public void setRouteId(long routeId) {
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
        LIST
    }
}
