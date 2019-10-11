package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.NsiClientDAO;
import com.bivc.cimsmgs.dao.PoezdZayavDAO;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.ky.PoezdZayav;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky2.PoezdZayavBaseDTO;
import com.bivc.cimsmgs.exchange.KYZayavLoader;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.bivc.cimsmgs.sql.Select;
import com.isc.utils.dbStore.dbTool;
import com.isc.utils.dbStore.stPack;
import com.isc.utils.dbStore.typesAndValues;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author p.dzeviarylin
 */
public class PoezdZayav_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(PoezdZayav_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (PoezdZayav_A.Action.valueOf(action.toUpperCase())) {
                case EDIT:
                    return edit();
                case SAVE:
                    return save();
                case DELETE:
                    return delete();
                case LIST:
                    return list();
                case GET_ZAYAVINTO_FOR_POEZDINTO:
                case GET_ZAYAVOUT_FOR_POEZDOUT:
                    return getZayavsForPoezd();
                case UPLOAD:
                    return uploadZayav();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

    }

    private String getZayavsForPoezd() throws Exception {
        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack();
        StringBuffer query = new StringBuffer();

        typesAndValues tv = new typesAndValues().add(Types.NUMERIC, routeId);
        query.append(" AND z.HID_ROUTE=? AND z.TRANS IN (");
        for (int i = 0; i < getUser().getUsr().getTrans().size(); i++) {
            tv.add(Types.CHAR, getUser().getUsr().getTrans().get(i));
            if (i > 0) query.append(",");
            query.append("?");
        }
        query.append(")");

        if (direction == 1) {
            dbt.read(st, Select.getSqlFile("ky/zajav/poezd_not_unloading_zajav") + query, tv);
        } else if (direction == 2) {
            dbt.read(st, Select.getSqlFile("ky/zajav/poezd_not_loading_zajav") + query, tv);
        }

        List<Long> ids = new ArrayList<>();
        for (int i = 0; i < st.getRowCount(); ++i) {
            ids.add(((Number) st.getObject(i, "HID_ZAYAV")).longValue());
        }

        List<PoezdZayav> list = new ArrayList<>();
        if (!ids.isEmpty())
            list = poezdZayavDAO.findByIds(ids);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        mapper.mapAsList(list, PoezdZayavBaseDTO.class),
                                        (long) list.size()
                                )
                        )
        );

        return SUCCESS;
    }

    private String list() throws Exception {
        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>() {
                }.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;
        List<PoezdZayav> list = poezdZayavDAO.findAll(getLimit(), getStart(), routeId, direction, filters, getUser().getUsr(), getLocale());
        Long total = poezdZayavDAO.countAll(routeId, direction, filters, getUser().getUsr(), getLocale());
        initCountVagKont(list);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        mapper.mapAsList(list, PoezdZayavBaseDTO.class),
                                        total
                                )
                        )
        );

        return SUCCESS;
    }

    public String uploadZayav() throws Exception {
        log.info("uploadZayav");
        PoezdZayav zayav = poezdZayavDAO.findById(getHid(), false);
        new KYZayavLoader().load(fileData, zayav);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    private String delete() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }
        PoezdZayavBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(PoezdZayavBaseDTO.class, jsonRequest);
        log.debug("Deleting a Zayav entry with id: {}", dto.getHid());

        PoezdZayav deleted = poezdZayavDAO.getById(dto.getHid(), false);
        poezdZayavDAO.makeTransient(deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    private String save() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }

        PoezdZayavBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(PoezdZayavBaseDTO.class, jsonRequest);

        PoezdZayav saved;

        if (dto.getHid() == null) {
            saved = add(dto);
        } else {
            saved = update(dto);
        }

        if(dto.getClient() != null && dto.getClient().getHid() != null) {
            saved.setClient(clientDAO.getById(dto.getClient().getHid(), false));
        } else {
            saved.setClient(null);
        }

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        mapper.map(saved, PoezdZayavBaseDTO.class)
                                )
                        )
        );

        return SUCCESS;
    }

    private PoezdZayav update(PoezdZayavBaseDTO dto) {
        PoezdZayav updated = poezdZayavDAO.getById(dto.getHid(), false);
        kypoezdMapper.copy(dto, updated);
        return updated;
    }

    private PoezdZayav add(PoezdZayavBaseDTO dto) {
        PoezdZayav added = kypoezdMapper.copy(dto, PoezdZayav.class);

        PackDoc pack = new PackDoc(added.getRoute(), getUser().getUsr().getGroup());
        pack.addZayavItem(added);
        getPackDocDAO().makePersistent(pack);
        return added;
    }

    private String edit() throws Exception {
        PoezdZayav poezdZayav = poezdZayavDAO.findById(getHid(), false);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        mapper.map(poezdZayav, PoezdZayavBaseDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    private void initCountVagKont(List<PoezdZayav> list) throws Exception {
        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack();
        typesAndValues tv;

        for (PoezdZayav poezdZayav: list) {
            st.eraseData();
            tv = new typesAndValues();
            tv.add(Types.NUMERIC, poezdZayav.getHid());
            if(poezdZayav.getDirection() == 1) {
                dbt.read(st, Select.getSqlFile("ky/zajav/poezd_unloading_kont_count"), tv);
            }
            else if(poezdZayav.getDirection() == 2) {
                dbt.read(st, Select.getSqlFile("ky/zajav/poezd_loading_kont_count"), tv);
            }
            poezdZayav.setVagCount(((Number) st.getObject(0, "COUNT_VAG")).intValue());
            poezdZayav.setKontCount(((Number) st.getObject(0, "COUNT_KONT_ALL")).intValue());
            poezdZayav.setKontCountDone(((Number) st.getObject(0, "COUNT_KONT_DONE")).intValue());
        }
    }

    private File fileData;

    private String action;
    private Byte direction;
    private String filter;
    private long routeId;
    private String jsonRequest;
    @Autowired
    private NsiClientDAO clientDAO;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.Mapper mapper;
    @Autowired
    private PoezdZayavDAO poezdZayavDAO;
    @Autowired
    private Mapper kypoezdMapper;

    public void setUpload(File file) {
        this.fileData = file;
    }

    public File getUpload() {
        return this.fileData;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public void setRouteId(long routeId) {
        this.routeId = routeId;
    }

    public void setJsonRequest(String jsonRequest) {
        this.jsonRequest = jsonRequest;
    }

    enum Action {LIST, EDIT, SAVE, DELETE, UPLOAD, GET_ZAYAVINTO_FOR_POEZDINTO, GET_ZAYAVOUT_FOR_POEZDOUT}
}
