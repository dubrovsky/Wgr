package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.AvtoDAO;
import com.bivc.cimsmgs.dao.AvtoZayavDAO;
import com.bivc.cimsmgs.dao.NsiClientDAO;
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
import com.ibm.icu.text.SimpleDateFormat;
import com.isc.utils.dbStore.*;
import org.apache.commons.collections4.CollectionUtils;
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
                case CHECKKONT:
   					return check();


                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

    }

    public String list() throws Exception {
        log.debug("Rendering AvtoZayav list.");

        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack();
        StringBuffer query = new StringBuffer();

        typesAndValues tv = new typesAndValues().add(Types.CHAR, getUser().getUsr().getUn()).add(Types.NUMERIC, routeId);
        query.append(" AND z.TRANS IN (");
        for(int i = 0; i < getUser().getUsr().getTrans().size(); i++) {
            tv.add(Types.CHAR, getUser().getUsr().getTrans().get(i));
            if(i > 0) query.append(",");
            query.append("?");
        }
        query.append(")");

        List<Filter> filters = StringUtils.isNotBlank(filter) ?
          (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>() {
          }.getClass().getGenericSuperclass(), filter) :
          Collections.EMPTY_LIST;

        if (CollectionUtils.isNotEmpty(filters)) {
            for (Filter filter : filters) {
                if (StringUtils.isNotBlank(filter.getProperty()) && StringUtils.isNotBlank(filter.getValue())) {
                    if(filter.getProperty().equals("no_avto")) {
                        query.append(" AND z.NO_AVTO LIKE CONCAT(?,'%')");
                        tv.add(Types.CHAR, filter.getValue());
                    }
                    else if(filter.getProperty().equals("no_trail")) {
                        query.append(" AND z.NO_TRAIL LIKE CONCAT(?,'%')");
                        tv.add(Types.CHAR, filter.getValue());
                    }
                    else if(filter.getProperty().equals("driver_fio")) {
                        query.append(" AND z.DRIVER_FIO LIKE CONCAT(?,'%')");
                        tv.add(Types.CHAR, filter.getValue());
                    }
                    else if(filter.getProperty().equals("nkon")) {
                        query.append(" AND (kzz.NKON LIKE CONCAT(?,'%') OR SUBSTR(kzz.NKON,5) LIKE CONCAT(?,'%'))");
                        tv.add(Types.CHAR, filter.getValue());
                        tv.add(Types.CHAR, filter.getValue());
                    }
                    else if(filter.getProperty().equals("startDate")) {
                        SimpleDateFormat df = new SimpleDateFormat("dd.MM.yy");
                        query.append(" AND z.DATE_ZAYAV>=?");
                        tv.add(Types.DATE, df.parse(filter.getValue()));
                    }

                }
            }
        }

//        String q2 = "\nGROUP BY z.HID,z.NO_ZAYAV,z.DATE_ZAYAV,z.DATTR,z.UN,z.ALTERED,z.DIRECTION,z.HID_ROUTE,z.HID_PACK,z.NO_AVTO,z.NO_TRAIL,z.CLIENT,z.DRIVER_FIO";
//        String q3 = "\nORDER BY COUNT(kzz.HID)=COUNT(kz.HID) AND COUNT(kzz.HID) > 0,z.DATE_ZAYAV DESC";

        dbt.read(st, String.format(Select.getSqlFile("ky/zajav/avto_zayav_list"), query), tv, getStart(), getLimit());

        stPack st2 = new stPack();
        tv.remove(0);
        dbt.read(st2, Select.getSqlFile("ky/zajav/avto_zayav_list_count") + query, tv);
        if(st2.getRowCount() == 0) st2.setObject(0,0, 0);

        Vector<String[]> vv1 = new Vector<>();
        Vector<Integer> vv2 = new Vector<>();
        for (int i = 0; i < st.getRowCount(); i++) {
            if(((Number) st.getObject(i,"isZayavDone")).intValue() == 0) {
                vv1.add(st.getTxt(i,"kont_s").split("\\s?,\\s?"));
                vv2.add(i);
            }
        }
        for (int i = 0; i < vv1.size(); i++) {
            if( findRepeat(vv1, i)) {
                st.setObject(vv2.get(i).intValue(), "repeatNkon", 1);
            }
        }

        log.debug("Found {} avtoZayav entries.", ((Number)st2.getObject(0,0)).intValue());

        setJSONData(new jsonStore(st, ((Number)st2.getObject(0,0)).intValue()).toString());
        return SUCCESS;
/*
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

        return SUCCESS;
*/
    }

    private boolean findRepeat(Vector<String []> v, int row) throws Exception {
        String[] tt = v.get(row);
        for (int i = 0; i < v.size(); i++) {
            if(i != row) {
                String[] t = v.get(i);
                for (int j = 0; j < t.length; j++) {
                    for (int k = 0; k < tt.length; k++) {
                        if(t[j].length() > 0 && t[j].equals(tt[k])) return true;
                    }
                }
            }
        }
        return false;
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

        if (!nkons.isEmpty()) {
            query.append(" AND kz.NKON IN (");
            for (int i=0; i<nkons.size(); i++) {
                query.append("?");
                query.append((i == nkons.size()-1) ? ") " : "," );
                tv.add(Types.CHAR, nkons.get(i));
            }
        }

//        query.append(" AND kz.NKON=?");
//        tv.add(Types.CHAR, nkon);

//        query.append(" AND kz.NKON IN (?,?,?)");
//        tv.add(Types.CHAR, nkon1).add(Types.CHAR, nkon2).add(Types.CHAR, nkon3);

        if(getDirection() == 1) {
            dbt.read(st, Select.getSqlFile("ky/zajav/avto_not_unloading_zajav") + query, tv);
        }
        else if(getDirection() == 2) {
            dbt.read(st, Select.getSqlFile("ky/zajav/avto_not_loading_zajav") + query, tv);
        }

        List<Long> ids = new ArrayList<>();
        for(int i = 0; i < st.getRowCount(); ++i) {
            Long id = ((Number) st.getObject(i, "HID_ZAYAV")).longValue();
            if (!excludeAvtoHid.contains(id))
                ids.add(id);
        }

        List<AvtoZayav> list = new ArrayList<>();
        if (!ids.isEmpty())
            list = avtoZayavDAO.findByIds( ids );

        //---------Этот фрагмент используется для поля поиска в фронтэнде---------------- поиск по номеру заявки и отправителю
        // если передано значение для поиска
        if(getQuery()!=null&&!getQuery().trim().isEmpty())
        {
            List<AvtoZayav> searchList= new ArrayList<>();
            for (AvtoZayav avtoZayav : list){
                if((avtoZayav.getNo_zayav()!=null&&avtoZayav.getNo_zayav().matches(".*"+getQuery()+".*"))
                        || (avtoZayav.getClient().getSname()!=null&&avtoZayav.getClient().getSname().matches(".*"+getQuery()+".*"))
                )
                    searchList.add(avtoZayav);
            }
            list=searchList;
        }
        //------------Этот фрагмент используется для поля поиска в фронтэнде------------- поиск по номеру заявки и отправителю

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

    private String check() throws Exception {
   		AvtoZayav avtoZayav = avtoZayavDAO.findById(getHid(), false);
        setDirection(avtoZayav.getDirection());
        setRouteId(avtoZayav.getRoute().getHid());
        excludeAvtoHid.add(avtoZayav.getHid());
        listOfActual();
//        List<AvtoZayav> list = avtoZayavDAO.findByNkons(getRouteId(), getUser().getUsr(), nkons);
//        list.remove(avtoZayav);
//        setJSONData(
//                defaultSerializer
//                        .setLocale(getLocale())
//                        .write(
//                                new Response<>(
//                                        kyavtoMapper.copyList(list, AvtoZayavBaseDTO.class),
//                                        Integer.valueOf(list.size()).longValue()
//                                )
//                        )
//        );

   		return SUCCESS;
   	}




    private String action;
    private Byte direction;
    private long routeId;

    enum Action {LIST, EDIT, SAVE, DELETE, AVTOS_DIR_FOR_AVTO_BIND, IMPORT_ZAYAV_INTO_LIST, ZAYAV_INTO_LIST_FOR_FILTER, GET_FOR_FILTER, CHECKKONT}

    private List<Filter> filters;
    private String filter;
    private String jsonRequest;
    private String fileName;
    private List<String> nkons = new ArrayList<>();
    private List<Long> excludeAvtoHid = new ArrayList<>();



    @Autowired
    private AvtoZayavDAO avtoZayavDAO;
    @Autowired
    private Mapper kyavtoMapper;
    @Autowired
    private NsiClientDAO clientDAO;
    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.Mapper mapper;

    private InputStream inputStream;

    public List<String> getNkons() {
        return nkons;
    }

    public void setNkons(List<String> nkons) {
        this.nkons = nkons;
    }

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
