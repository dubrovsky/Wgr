package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.AvtoDAO;
import com.bivc.cimsmgs.dao.AvtoZayavDAO;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.AvtoZayav;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import com.bivc.cimsmgs.dto.ky.AvtoDTO;
import com.bivc.cimsmgs.dto.ky2.AvtoZayavBaseDTO;
import com.bivc.cimsmgs.dto.ky2.AvtoZayavDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.bivc.cimsmgs.services.ky2.AvtoWzPzService;
import com.bivc.cimsmgs.sql.Select;
import com.isc.utils.dbStore.dbTool;
import com.isc.utils.dbStore.stForm;
import com.isc.utils.dbStore.stPack;
import com.isc.utils.dbStore.typesAndValues;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.sql.Types;
import java.util.*;

import static com.bivc.cimsmgs.services.ky2.AvtoWzPzService.AvtoDocType.PZ;
import static com.bivc.cimsmgs.services.ky2.AvtoWzPzService.AvtoDocType.WZ;

/**
 * Created by peter on 21.02.14.
 */
public class AvtoZayav_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(AvtoZayav_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (Action.valueOf(action.toUpperCase())) {
                case EDIT:
                    return edit();
                case SAVE:
                    return save();
                case DELETE:
                    return delete();
                case LIST:
                    return list();
                case IMPORT_ZAYAV_INTO_LIST:
                case ZAYAV_INTO_LIST_FOR_FILTER:
                    return listOfActual();
                case GET_FOR_FILTER:
                    return zayav4Filter();

                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

    }

    public String list() throws Exception {
        log.debug("Rendering AvtoZayav list.");

        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>() {
                }.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;
        List<AvtoZayav> list = avtoZayavDAO.findAll(getLimit(), getStart(), getRouteId(), getDirection(), filters, getUser().getUsr(), getLocale());
        Long total = avtoZayavDAO.countAll(getRouteId(), getDirection(), filters, getUser().getUsr(), getLocale());
        initCountKont(list);

        log.debug("Found {} avtoZayav entries.", total);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyavtoMapper.copyList(list, AvtoZayavBaseDTO.class),
                                        total
                                )
                        )
        );

//        setJSONData(poezdIntoToListSerializer.setLocale(getLocale()).write(response));
        return SUCCESS;
    }

    public String listOfActual() throws Exception {
        log.debug("Rendering AvtoZayav list.");

        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack();
        StringBuffer query = new StringBuffer();

        typesAndValues tv = new typesAndValues().add(Types.NUMERIC, getRouteId());
        query.append(" AND z.HID_ROUTE=? AND z.TRANS IN (");
        for(int i = 0; i < getUser().getUsr().getTrans().size(); i++) {
            tv.add(Types.CHAR, getUser().getUsr().getTrans().get(i));
            if(i > 0) query.append(",");
            query.append("?");
        }
        query.append(")");

        if(getDirection() == 1) {
            dbt.read(st, Select.getSqlFile("ky/zajav/avto_not_unloading_zajav") + query, tv);
        }
        else if(getDirection() == 2) {
            dbt.read(st, Select.getSqlFile("ky/zajav/avto_not_loading_zajav") + query, tv);
        }

        List<Long> ids = new ArrayList<>();
        for(int i = 0; i < st.getRowCount(); ++i) {
            ids.add(((Number) st.getObject(i, "HID_ZAYAV")).longValue());
        }

        List<AvtoZayav> list = new ArrayList<>();
        if (!ids.isEmpty())
            list = avtoZayavDAO.findByIds( ids );

/*
        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>() {
                }.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;
        List<AvtoZayav> list = avtoZayavDAO.findAllActual(getRouteId(), getDirection(), filters, getUser().getUsr(), getLocale());
        Long total = avtoZayavDAO.countAll(getRouteId(), getDirection(), filters, getUser().getUsr(), getLocale());
*/

        log.debug("Found {} avtoZayav entries.", list.size());

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyavtoMapper.copyList(list, AvtoZayavBaseDTO.class),
                                        (long) list.size()
                                )
                        )
        );

//        setJSONData(poezdIntoToListSerializer.setLocale(getLocale()).write(response));
        return SUCCESS;
    }

    public String edit() throws Exception {
        log.debug("Rendering edit Poezd entry with hid: {}", getHid());

        AvtoZayav avtoZayav = avtoZayavDAO.findById(getHid(), false);

        log.debug("Rendering edit avtoZayav entry form with information: {}", avtoZayav);

//        setJSONData(poezdIntoToFormSerializer.setLocale(getLocale()).write(new Response<Poezd>(poezd)));
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyavtoMapper.copy(avtoZayav, AvtoZayavBaseDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    public String zayav4Filter() throws Exception {
        log.debug("Get Zayav entry with hid: {}", getHid());

        AvtoZayav avtoZayav = avtoZayavDAO.findById(getHid(), false);
        initLoadingUnloadingKont(avtoZayav);

        log.debug("Get Zayav entry form with information: {}", avtoZayav);

//        setJSONData(poezdIntoToFormSerializer.setLocale(getLocale()).write(new Response<Poezd>(poezd)));
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyavtoMapper.copy(avtoZayav, AvtoZayavDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    private void initLoadingUnloadingKont(AvtoZayav avtoZayav) throws Exception {

        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack();
        StringBuffer query = new StringBuffer();

        typesAndValues tv = new typesAndValues();

        tv.add(Types.NUMERIC, getHid());
        query.append(" AND z.HID=?");

        if(avtoZayav.getDirection() == 1) {
            dbt.read(st, Select.getSqlFile("ky/zajav/avto_unloading_kont") + query, tv);
        }
        else if(avtoZayav.getDirection() == 2) {
            dbt.read(st, Select.getSqlFile("ky/zajav/avto_loading_kont") + query, tv);
        }

        Set<Kont> konts = avtoZayav.getKonts();

        for(int i = 0; i < st.getRowCount(); ++i) {
            if(konts != null) {
                for (Kont kont: konts) {
                    if(kont.getHid() == ((Number) st.getObject(i, "HID")).longValue()) {
                        if(avtoZayav.getDirection() == 1) {
                            kont.setIsUnloading((byte) 1);
                        }
                        else if(avtoZayav.getDirection() == 2) {
                            kont.setIsLoading((byte) 1);
                        }
                    }
                }
            }
        }
    }

    public String save() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }

        AvtoZayavBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(AvtoZayavBaseDTO.class, jsonRequest);
        log.debug("Saving a Poezd entry with information: {}", dto);

        AvtoZayav saved;
//        if (StringUtils.isBlank(dto.getNppr())) {
//            dto.setNppr(poezdService.produceNppr(dto));
//        }

        if (dto.getHid() == null) {
            saved = add(dto);
        } else {
            saved = update(dto);
        }

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyavtoMapper.copy(saved, AvtoZayavBaseDTO.class)
                                )
                        )
        );

//        setJSONData(poezdIntoToFormSerializer.setLocale(getLocale()).write(new Response<Poezd>(saved)));
        return SUCCESS;
    }

    private AvtoZayav add(AvtoZayavBaseDTO dto) {

        AvtoZayav added = kyavtoMapper.copy(dto, AvtoZayav.class);

        PackDoc pack = new PackDoc(added.getRoute(), getUser().getUsr().getGroup());
        pack.addAvtoZayavItem(added);

        getPackDocDAO().makePersistent(pack);
        log.debug("Added a PackDoc entry with information: {}", pack);
        log.debug("Added a Zayav entry with information: {}", added);

        return added;
    }

    private AvtoZayav update(AvtoZayavBaseDTO dto) {
        AvtoZayav updated = avtoZayavDAO.getById(dto.getHid(), false);
        kyavtoMapper.copy(dto, updated);
        log.debug("Updated the information of a Zayav entry to: {}", updated);

        return updated;
    }

    public String delete() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }
        AvtoZayavBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(AvtoZayavBaseDTO.class, jsonRequest);
        log.debug("Deleting a Zayav entry with id: {}", dto.getHid());

        AvtoZayav deleted = avtoZayavDAO.getById(dto.getHid(), false);
        avtoZayavDAO.makeTransient(deleted);
        log.info("Deleted Zayav entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    private void initCountKont(List<AvtoZayav> list) throws Exception {
        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack();
        typesAndValues tv;

        for (AvtoZayav avtoZayav: list) {
            st.eraseData();
            tv = new typesAndValues();
            tv.add(Types.NUMERIC, avtoZayav.getHid());
            if(avtoZayav.getDirection() == 1) {
                dbt.read(st, Select.getSqlFile("ky/zajav/avto_unloading_kont_count"), tv);
            }
            else if(avtoZayav.getDirection() == 2) {
                dbt.read(st, Select.getSqlFile("ky/zajav/avto_loading_kont_count"), tv);
            }
            avtoZayav.setKontCount(((Number) st.getObject(0, "COUNT_KONT_ALL")).intValue());
            avtoZayav.setKontCountDone(((Number) st.getObject(0, "COUNT_KONT_DONE")).intValue());
        }
    }


    private String action;
    private Byte direction;
    private long routeId;

    enum Action {LIST, EDIT, SAVE, DELETE, AVTOS_DIR_FOR_AVTO_BIND, IMPORT_ZAYAV_INTO_LIST, ZAYAV_INTO_LIST_FOR_FILTER, GET_FOR_FILTER}

    private List<Filter> filters;
    private String filter;
    private String jsonRequest;
    private String fileName;


    @Autowired
    private AvtoZayavDAO avtoZayavDAO;
    @Autowired
    private Mapper kyavtoMapper;
    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.Mapper mapper;
//    @Autowired
//    private AvtoWzPzService avtoWzPzService;
//    @Autowired
//    private com.bivc.cimsmgs.doc2doc.orika.CopyAvtoMapper copyAvtoMapper;

    private InputStream inputStream;

    public InputStream getInputStream() {
        return inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }


    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
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

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public void setJsonRequest(String json) {
        this.jsonRequest = json;
    }

    public String getJsonRequest() {
        return this.jsonRequest;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }
}
