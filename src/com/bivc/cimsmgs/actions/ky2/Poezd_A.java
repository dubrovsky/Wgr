package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.GruzDAO;
import com.bivc.cimsmgs.dao.KontDAO;
import com.bivc.cimsmgs.dao.KontGruzHistoryDAO;
import com.bivc.cimsmgs.dao.NsiClientDAO;
import com.bivc.cimsmgs.dao.PlombDAO;
import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.dao.PoezdZayavDAO;
import com.bivc.cimsmgs.dao.RouteDAO;
import com.bivc.cimsmgs.dao.VagonDAO;
import com.bivc.cimsmgs.dao.VagonHistoryDAO;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.ky.Gruz;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Plomb;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.db.ky.PoezdZayav;
import com.bivc.cimsmgs.db.ky.Vagon;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.PoezdBaseDTO;
import com.bivc.cimsmgs.dto.ky.PoezdDTO;
import com.bivc.cimsmgs.dto.ky2.PoezdImportDTO;
import com.bivc.cimsmgs.dto.ky2.PoezdViewDTO;
import com.bivc.cimsmgs.dto.ky2.VagonViewDTO;
import com.bivc.cimsmgs.exchange.KYKontsLoader;
import com.bivc.cimsmgs.exchange.KYPoezdLoader;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.bivc.cimsmgs.services.ky.IPoezdService;
import com.bivc.cimsmgs.sql.Select;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.ibm.icu.text.SimpleDateFormat;
import com.isc.utils.dbStore.RowNum;
import com.isc.utils.dbStore.dbPaketTool;
import com.isc.utils.dbStore.dbTool;
import com.isc.utils.dbStore.jsonStore;
import com.isc.utils.dbStore.modelDbForm;
import com.isc.utils.dbStore.modelDbPack;
import com.isc.utils.dbStore.sequenceFields;
import com.isc.utils.dbStore.stForm;
import com.isc.utils.dbStore.stPack;
import com.isc.utils.dbStore.typesAndValues;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.Vector;

import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.POEZD;
import static com.bivc.cimsmgs.commons.Utils.setNewMessCount;

/**
 * Created by peter on 21.02.14.
 */
public class Poezd_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(Poezd_A.class);

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
                case POEZDS_DIR_FOR_POEZD_BIND:
                    return poezdsDir4PoezdBind();
                case CREATE_POEZDOUT_FROM_POEZDINTO:
                    return createPoezdOutFromPoezdInto();
                case CREATE_POEZDOUT_FROM_POEZDSINTO:
                    return createPoezdOutFromPoezdsInto();
                case IMPORT_POEZD_LIST:
                    return importPoezdList();
                case IMPORT_POEZD_VAGON_LIST:
                    return importPoezdVagonList();
                case IMPORT_POESD:
                    return importPoezd();
                case UPLOAD:
                    return uploadPoezd(false);
                case UPDATE:
                    return uploadPoezd(true);
                case EXPORT_POEZD:
                    return exportPoezd();
//                case R27:
//                    return r27();
//                case R27BLANK:
//                    return r27Blank();
                case GET_POEZDINTO_FOR_POEZDOUT:
                    return getPoezdintoForPoezdout();
                case ADD_TO_POEZDINTO_FROM_ZAYAVINTO:
                    return addToPoezdintoFromZayavinto();
                case ADD_TO_POEZDOUT_FROM_ZAYAVOUT:
                    return addToPoezdoutFromZayavout();
                case CREATE_POEZDINTO_FROM_ZAYAVINTO:
                    return createPoezdintoFromZayavinto();
                /*case GET_POEZDS_IN_INTERVAL:
                    return getPoezdsInInterval();
                case GET_GRUZOTPR_IN_INTERVAL:
                    return getGruzotprInInterval();*/
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

    }

    public String list() throws Exception {
        log.debug("Rendering Poezd list.");

        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>() {
                }.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;
        List<Poezd> list = poezdDAO.findPoezdsInInterval(getLimit(), getStart(), getRouteId(), getDirection(), filters, getUser().getUsr(), getLocale(), getKoleya());
        setNewMessCount(list, getUser().getUsr().getUn());
        Long total = poezdDAO.countAll(getRouteId(), getDirection(), filters, getUser().getUsr(), getLocale(), getKoleya());

        log.debug("Found {} Poezd entries.", total);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kypoezdMapper.copyList(list, PoezdBaseDTO.class),
                                        total
                                )
                        )
        );

        return SUCCESS;
    }

    public String importPoezdList() throws Exception {

        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>() {
                }.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;

        StringBuffer query = new StringBuffer();
        typesAndValues tv = new typesAndValues();

        boolean isStartDate = false;
        if (CollectionUtils.isNotEmpty(filters)) {
            for (Filter filter : filters) {
                if (StringUtils.isNotBlank(filter.getProperty()) && StringUtils.isNotBlank(filter.getValue())) {
                    if(filter.getProperty().equals("nwag")) {
                        query.append(" AND a.NVAG=?");
                        tv.add(Types.CHAR, filter.getValue());
                    }
                    else if(filter.getProperty().equals("startDate")) {
                        SimpleDateFormat df = new SimpleDateFormat("dd.MM.yy");
                        query.append(" AND a.DATTR>=?");
                        tv.add(Types.DATE, df.parse(filter.getValue()));
                        isStartDate = true;
                    }
                    else if(filter.getProperty().equals("endDate")) {
                        SimpleDateFormat df = new SimpleDateFormat("dd.MM.yy");
                        GregorianCalendar edt = new GregorianCalendar();
                        edt.setTime(df.parse(filter.getValue()));
                        edt.add(Calendar.DATE, 1);
                        query.append(" AND a.DATTR<?");
                        tv.add(Types.DATE, edt.getTime());
                    }
                }
            }
        }

        if(!isStartDate) {
            query.append(" AND a.DATTR >= NOW() - INTERVAL 14 DAY");
        }

        String q2 = " GROUP BY a.N_POEZD, a.N_PACKET, a.VED_NOMER ORDER BY a.N_PACKET DESC";

        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack();
        dbt.read(st, Select.getSqlFile("ky/bringing/poezdList") + query + q2, tv);

        List<PoezdImportDTO> poezdImportDTOS = new ArrayList<>(st.getRowCount());
        for (int i = 0; i < st.getRowCount(); i++) {
            poezdImportDTOS.add(
                    new PoezdImportDTO(st.getTxt(i, "DATTR"), st.getTxt(i, "N_POEZD"), st.getTxt(i, "N_PACKET"),
                            st.getTxt(i, "VED_NOMER"), st.getTxt(i, "COUNT_NVAG"), st.getTxt(i, "COUNT_NKON"))
            );
//            System.out.println(
//                    "DATTR: " + st.getTxt(i, "DATTR") + ", " +
//                            "N_POEZD: " + st.getTxt(i, "N_POEZD") + ", " +
//                            "N_PACKET: " + st.getTxt(i, "N_PACKET") + ", " +
//                            "VED_NOMER: " + st.getTxt(i, "VED_NOMER") + ", " +
//                            "COUNT_NVAG: " + st.getTxt(i, "COUNT_NVAG")
//            );
        }

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        poezdImportDTOS,
                                        (long) poezdImportDTOS.size()
                                )
                        )
        );

        return SUCCESS;
    }

    public String importPoezdVagonList() throws Exception {
        dbTool dbt = HibernateUtil.initDbTool();
        typesAndValues tv = new typesAndValues().add(Types.NUMERIC, n_poezd).add(Types.CHAR, n_packet).add(Types.NUMERIC, ved_nomer);
        stPack st = new stPack();
        dbt.read(st, Select.getSqlFile("ky/bringing/poezdVagonList"), tv);
        setJSONData(new jsonStore(st).toString());
        return SUCCESS;
    }

    private String getPoezdintoForPoezdout() throws Exception {
        List<Vagon> vagons = vagonDAO.getVagsForPoezdout(getHid());
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        mapper.mapAsList(vagons, VagonViewDTO.class),
                                        (long) vagons.size()
                                )
                        )
        );
        return SUCCESS;
    }

    public String importPoezd() throws Exception {
        System.out.println("poezd hid - " + getHid() + ", routeId - " + routeId + ", n_poezd - " + n_poezd + ", ved_nomer - " + ved_nomer + ", n_packet - " + n_packet + ", koleya - " + koleya + ", direction - " + direction);

        if(nvag == null || nvag.length == 0) throw new Exception("There is no value for nvag");

        dbTool dbt = HibernateUtil.initDbTool();

        Vector keyNm = new Vector();
        keyNm.add("HID");

        stPack stw = new stPack("VAG_PER_VED");
        stw.setObject(0, "N_POEZD", n_poezd);
        stw.setObject(0, "N_PACKET", n_packet);
        stw.setObject(0, "VED_NOMER", ved_nomer);
        stw.setObject(0, "HID", getHid());
        dbt.read(stw, "VAG_PER_VED", "WHERE 1=0", null);

        stPack st2 = new stPack("POEZD");
        st2.getInfo().keyName = keyNm;

        dbt.read(st2, Select.getSqlFile("ky/bringing/ky_poezd"), stw, 0, "HID");
        stw.setPack(0, st2);

        stPack st_nvag = new stPack("VAGON_NVAG");
        st_nvag.info.setType(0, Types.CHAR);
        st2.setPack(0, st_nvag);
        for (int i = 0; i < nvag.length; i++) {
            st_nvag.setObject(i, "NVAG", nvag[i]);
        }

        dbt.readChildData(st2, "VAGON_NVAG", "VAGON_HID", Select.getSqlFile("ky/bringing/vagon_hid"), null, "N_POEZD,N_PACKET,VED_NOMER,NVAG");
        dbt.readChildData(st2, "VAGON_HID", "VAGON", Select.getSqlFile("ky/bringing/vagon"), null, "HID_VAG");
        dbt.readChildData(st2, "VAGON", "KONT_HID", Select.getSqlFile("ky/bringing/kont_hid"), null, "N_POEZD,N_PACKET,VED_NOMER,NVAG");
        dbt.readChildData(st2, "KONT_HID", "KONT", Select.getSqlFile("ky/bringing/kont"), null, "HID_KONT");
        dbt.readChildData(st2, "KONT", "GRUZ_KONT", Select.getSqlFile("ky/bringing/gruz_kont"), null, "HID_KONT");
        dbt.readChildData(st2, "VAGON", "GRUZ_VAG", Select.getSqlFile("ky/bringing/gruz_vag"), null, "HID_VAG");
        dbt.readChildData(st2, "KONT", "PLOMB_KONT", Select.getSqlFile("ky/bringing/plomb_kont"), null, "HID_KONT");
        dbt.readChildData(st2, "VAGON", "PLOMB_VAG", Select.getSqlFile("ky/bringing/plomb_vag"), null, "HID_VAG");

        dbPaketTool dbpt = new dbPaketTool(dbt);

/*
        stPack st_seq = new stPack();

        Date d = new Date();

        dbt.read(st_seq, "select NextVal('PACK_DOC_HID') AS NV", null);
        stPack st_packDoc = new stPack("PACK_DOC");
        st_packDoc.setObject(0,"HID", st_seq.getObject(0,"NV"));
        st_packDoc.setObject(0,"HID_ROUTE", routeId);
        st_packDoc.setObject(0,"UN", getUser().getUsr().getUn());
        st_packDoc.setObject(0,"TRANS", getUser().getUsr().getGroup().getName());
        st_packDoc.setObject(0,"DATTR", d);
        dbt.save("PACK_DOC", st_packDoc, 0, null);
*/

/*
        st_seq = new stPack();
        dbt.read(st_seq, "select NextVal('KY_POEZD_HID') AS NV", null);
        st2.setObject(0, "HID", st_seq.getObject(0,"NV"));
        st2.setObject(0, "HID_PACK", st_packDoc.getObject(0,"HID"));
        st2.setObject(0, "HID_ROUTE", st_packDoc.getObject(0,"HID_ROUTE"));
        st2.setObject(0, "KOLEYA", koleya);
        st2.setObject(0, "DIRECTION", direction);
        st2.setObject(0, "TRANS", st_packDoc.getObject(0,"TRANS"));
        st2.setObject(0, "UN", st_packDoc.getObject(0,"UN"));
        st2.setObject(0, "ALTERED", d);
        st2.setObject(0,"DATTR", d);
        dbt.save("KY_POEZD", st2, -1, null);
*/

        sequenceFields sq = new sequenceFields().addSequence("HID", "KY_VAGON_HID");
        String[][] fillParentKey = new String[][]{
                {"HID", "HID_POEZD"},
                {"UN", "UN"},
                {"ALTERED", "ALTERED"},
                {"DATTR", "DATTR"},
                {"TRANS", "TRANS"}
        };

        int rownum = 0;
        Number max_sort_vag = (Number) st2.getObject(0, "MAX_SORT_VAG");
        if (max_sort_vag != null) {
            rownum = max_sort_vag.intValue() + 1;
        }
        dbpt.fillRownum("VAGON", "SORT", st2, new RowNum(rownum));
        ifNullColumnValue("VAGON", new String[] {"KOL_OS", "MAS_TAR", "POD_SILA"}, st2);
        dbpt.save("VAGON", "KY_VAGON", keyNm, fillParentKey, st2, sq);

        sq = new sequenceFields().addSequence("HID", "KY_KONT_HID");
        fillParentKey = new String[][]{
                {"HID", "HID_VAGON"},
                {"UN", "UN"},
                {"ALTERED", "ALTERED"},
                {"DATTR", "DATTR"},
                {"TRANS", "TRANS"},
                {"HID_CLIENT", "HID_CLIENT"},
                {"GRUZOTPR", "GRUZOTPR"},
                {"DPRB", "DPRB"}
        };
        dbpt.fill_Rownum("KONT", "SORT", st2, 0);
        ifNullColumnValue("KONT", new String[] {"MASSA_TAR", "POD_SILA", "VID", "TYPE"}, st2);
        dbpt.save("KONT", "KY_KONT", keyNm, fillParentKey, st2, sq);

        sq = new sequenceFields().addSequence("HID", "KY_GRUZ_HID");
        fillParentKey = new String[][]{
                {"HID", "HID_KONT"},
                {"UN", "UN"},
                {"ALTERED", "ALTERED"},
                {"DATTR", "DATTR"},
                {"TRANS", "TRANS"}
        };
        dbpt.fillRownum("GRUZ_KONT", "SORT", st2);
        dbpt.save("GRUZ_KONT", "KY_GRUZ", keyNm, fillParentKey, st2, sq);

        fillParentKey = new String[][]{
                {"HID", "HID_VAGON"},
                {"UN", "UN"},
                {"ALTERED", "ALTERED"},
                {"DATTR", "DATTR"},
                {"TRANS", "TRANS"}
        };
        dbpt.fillRownum("GRUZ_VAG", "SORT", st2);
        dbpt.save("GRUZ_VAG", "KY_GRUZ", keyNm, fillParentKey, st2, sq);

        sq = new sequenceFields().addSequence("HID", "KY_PLOMB_HID");
        fillParentKey = new String[][]{
                {"HID", "HID_KONT"},
                {"UN", "UN"},
                {"ALTERED", "ALTERED"},
                {"DATTR", "DATTR"},
                {"TRANS", "TRANS"}
        };
        dbpt.splitPlomb("PLOMB_KONT", "KPL", "ZNAK", st2);
        dbpt.fillRownum("PLOMB_KONT", "SORT", st2);
        dbpt.save("PLOMB_KONT", "KY_PLOMB", keyNm, fillParentKey, st2, sq);

        fillParentKey = new String[][]{
                {"HID", "HID_VAGON"},
                {"UN", "UN"},
                {"ALTERED", "ALTERED"},
                {"DATTR", "DATTR"},
                {"TRANS", "TRANS"}
        };
        dbpt.splitPlomb("PLOMB_VAG", "KPL", "ZNAK", st2);
        dbpt.fillRownum("PLOMB_VAG", "SORT", st2);
        dbpt.save("PLOMB_VAG", "KY_PLOMB", keyNm, fillParentKey, st2, sq);

        sq = new sequenceFields().addSequence("HID", "KY_VAGON_HISTORY_HID");
        fillParentKey = new String[][]{
          {"UN", "UN"},
          {"DATTR", "DATE_OPERATION"},
          {"HID_POEZD", "HID_POEZD"},
          {"KOLEYA", "KOLEYA"},
          {"DIRECTION", "DIRECTION"},
          {"HID_VAGON", "HID_VAGON"}
        };
        dbpt.fillNewPaket("VAGON", "VAGON_HISTORY", fillParentKey, st2);
        dbpt.save("VAGON_HISTORY", "KY_VAGON_HISTORY", keyNm, fillParentKey, st2, sq);


        sq = new sequenceFields().addSequence("HID", "KY_KONT_GRUZ_HISTORY_HID");
        fillParentKey = new String[][]{
                {"HID", "HID_KONT"},
                {"UN", "UN"},
                {"DATTR", "DATE_OPERATION"},
                {"HID_POEZD", "HID_POEZD"},
                {"KOLEYA", "KOLEYA"},
                {"DIRECTION", "DIRECTION"},
                {"HID_VAGON", "HID_VAGON"}
        };
        dbpt.fillNewPaket("KONT", "KONT_HISTORY", fillParentKey, st2);
        dbpt.save("KONT_HISTORY", "KY_KONT_GRUZ_HISTORY", keyNm, fillParentKey, st2, sq);

        fillParentKey = new String[][]{
                {"HID", "HID_GRUZ"},
                {"UN", "UN"},
                {"DATTR", "DATE_OPERATION"},
                {"HID_POEZD", "HID_POEZD"},
                {"KOLEYA", "KOLEYA"},
                {"DIRECTION", "DIRECTION"},
                {"HID_VAGON", "HID_VAGON"}
        };
        dbpt.fillNewPaket("GRUZ_VAG", "GRUZ_HISTORY", fillParentKey, st2);
        dbpt.save("GRUZ_HISTORY", "KY_KONT_GRUZ_HISTORY", keyNm, fillParentKey, st2, sq);

        dbt.commit();

        log.debug(st2.toString());

        Poezd poezd = poezdDAO.findById(getHid(), false);
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kypoezdMapper.copy(poezd, PoezdBaseDTO.class)
                                )
                        )
        );

/*
        setJSONData(
                defaultSerializer
                        .write(
                                new Response<>()
                        )
        );
*/
        return SUCCESS;
    }

    private void ifNullColumnValue(String packName, String[] aColumnNm, stPack st) throws Exception {
        if (st.getInfo().packName.equals(packName)) {
            for (int r = 0; r < st.getRowCount(); r++) {
                for (int j = 0; j < aColumnNm.length; j++) {
                    if(st.getObject(r, aColumnNm[j]) == null) {
                        st.setObject(r, aColumnNm[j], ((stForm) st.getParent()).getObject(aColumnNm[j]));
                    }
                }
            }
        } else {
            for(int i = 0; i < st.getRowCount(); i++) {
                modelDbForm f = st.getForm(i);
                TreeMap<String, modelDbPack> p = f.getPacks();
                Iterator it = p.keySet().iterator();

                while(it.hasNext()) {
                    stPack pk = (stPack) p.get(it.next());
                    ifNullColumnValue(packName, aColumnNm, pk);
                }
            }
        }
        return;
    }


    public String edit() throws Exception {
        log.debug("Rendering edit Poezd entry with hid: {}", getHid());

        Poezd poezd = poezdDAO.findById(getHid(), false);

        log.debug("Rendering edit Poezd entry form with information: {}", poezd);

//        setJSONData(poezdIntoToFormSerializer.setLocale(getLocale()).write(new Response<Poezd>(poezd)));
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kypoezdMapper.copy(poezd, PoezdDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    public String save() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }

        PoezdBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(PoezdBaseDTO.class, jsonRequest);
        log.debug("Saving a Poezd entry with information: {}", dto);

        Poezd poezd;
        /*if (StringUtils.isBlank(dto.getNppr())) {
            dto.setNppr(poezdService.produceNppr(dto));
        }*/

        if (dto.getHid() == null) {
            poezd = add(dto);
        } else {
            poezd = update(dto);
        }

        if (dto.getClient() != null && dto.getClient().getHid() != null) {
            poezd.setClient(clientDAO.getById(dto.getClient().getHid(), false));
        } else {
            poezd.setClient(null);
        }

        for (Vagon vagon : poezd.getVagons()) {
            for (Kont kont : vagon.getKonts()) {
                if(poezd.getDprb() != null) {
                    kont.setDprb(poezd.getDprb());
                }
                if(poezd.getDotp() != null) {
                    kont.setDotp(poezd.getDotp());
                }
            }
        }


        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kypoezdMapper.copy(poezd, PoezdBaseDTO.class)
                                )
                        )
        );

//        setJSONData(poezdIntoToFormSerializer.setLocale(getLocale()).write(new Response<Poezd>(saved)));
        return SUCCESS;
    }

    private Poezd add(PoezdBaseDTO dto) {

        Poezd added = kypoezdMapper.copy(dto, Poezd.class);

        PackDoc pack = new PackDoc(added.getRoute(), getUser().getUsr().getGroup());
        pack.addPoezdItem(added);

        getPackDocDAO().makePersistent(pack);
        log.debug("Added a PackDoc entry with information: {}", pack);
        log.debug("Added a Poezd entry with information: {}", added);

        return added;
    }

    private Poezd update(PoezdBaseDTO dto) {
        Poezd updated = poezdDAO.getById(dto.getHid(), false);
        kypoezdMapper.copy(dto, updated);
//        updated.setClient(clientDAO.getById(dto.getClient().getHid(), false));
        log.debug("Updated the information of a Poezd entry to: {}", updated);

        return updated;
    }

    public String delete() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }
        PoezdBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(PoezdBaseDTO.class, jsonRequest);
        log.debug("Deleting a Poezd entry with id: {}", dto.getHid());

        Poezd deleted = poezdDAO.getById(dto.getHid(), false);
        poezdDAO.makeTransient(deleted);
        log.info("Deleted Poezd entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    public String poezdsDir4PoezdBind() throws Exception {
        final List<Poezd> poezds = poezdDAO.findPoezdsDir(getLimit(), getStart(), getFilters(), getUser().getUsr(), getRouteId(), getDirection());
        final Long total = poezdDAO.countPoezdsDir(getFilters(), getUser().getUsr(), getRouteId(), getDirection());

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        mapper.mapAsList(poezds, PoezdBaseDTO.class),
                                        total
                                )
                        )
        );

        return SUCCESS;
    }

    public String getPoezdsIntoForPoezdOutDir() throws Exception {
        final List<Poezd> poezds = poezdDAO.getPoezdsIntoForPoezdOutDir(getUser().getUsr(), getRouteId(), getKoleya());

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        mapper.mapAsList(poezds, PoezdViewDTO.class),
                                        (long) poezds.size()
                                )
                        )
        );

        return SUCCESS;
    }

    public String createPoezdOutFromPoezdInto() throws Exception {
        Poezd poezdInto = poezdDAO.getById(getHid(), false);
        log.debug("Found poezd to copy to poezdOut: {}", poezdInto);

        // copy
        Poezd poezdCopy = copyPoezdMapper.map(poezdInto, Poezd.class);
        // set props
        poezdCopy.setDirection((byte) 2);

        // save new pack and poezd
        PackDoc pack = new PackDoc(poezdCopy.getRoute(), getUser().getUsr().getGroup());
        pack.addPoezdItem(poezdCopy);
        getPackDocDAO().makePersistent(pack);

//        createPoezdOutFromPoezdInto(poezdInto, poezdCopy);
        Map<String, List<?>> vagContGruz4History = new HashMap<>(3);
        vagContGruz4History.put("konts", new ArrayList<Kont>());
        vagContGruz4History.put("gruzs", new ArrayList<Gruz>());
        vagContGruz4History.put("vags", new ArrayList<Vagon>());

        short sort = 0;
        List<Long> movedVagHids = new ArrayList<>();
        for (Vagon vagonInto : poezdInto.getVagons()) {
            if (hids.contains(vagonInto.getHid())) {
//                Vagon vagonCopy = copyPoezdMapper.map(vagonInto, Vagon.class);

                // set props
                vagonInto.setPoezd(poezdCopy);
                vagonInto.setDirection((byte) 2);
                vagonInto.setSort(sort);
//                vagonCopy.setOtpravka(null);

                // save
                vagonDAO.makePersistent(vagonInto);
                ((List<Vagon>) vagContGruz4History.get("vags")).add(vagonInto);
                ((List<Kont>) vagContGruz4History.get("konts")).addAll(vagonInto.getKonts());
                ((List<Gruz>) vagContGruz4History.get("gruzs")).addAll(vagonInto.getGruzs());
                movedVagHids.add(vagonInto.getHid());
                sort++;
            }
        }

        saveVagContGruzHistory(vagContGruz4History, kontGruzHistoryDAO, POEZD, vagonHistoryDAO, getUser().getUsr().getUn(), null);

        setJSONData(defaultSerializer.write(new Response<>(movedVagHids)));
        return SUCCESS;
    }

    public String createPoezdOutFromPoezdsInto() {
        Poezd poezdInto = poezdDAO.getById(getHidInto(), false);
        Poezd poezdOut = poezdDAO.getById(getHidOut(), false);

//        createPoezdOutFromPoezdInto(poezdInto, poezdOut);
        Map<String, List<?>> vagContGruz4History = new HashMap<>(3);
        vagContGruz4History.put("konts", new ArrayList<Kont>());
        vagContGruz4History.put("gruzs", new ArrayList<Gruz>());
        vagContGruz4History.put("vags", new ArrayList<Vagon>());

        short sort = (short) (poezdOut.getVagons().stream().mapToInt(Vagon::getSort).max().orElse(-1) + 1);
        for (Vagon vagonInto : poezdInto.getVagons()) {
            if (hids.contains(vagonInto.getHid())) {
//                Vagon vagonCopy = copyPoezdMapper.map(vagonInto, Vagon.class);

                // set props
                vagonInto.setPoezd(poezdOut);
                vagonInto.setDirection((byte) 2);
                vagonInto.setSort(sort);

                // save
                vagonDAO.makePersistent(vagonInto);

                ((List<Vagon>) vagContGruz4History.get("vags")).add(vagonInto);
                ((List<Kont>) vagContGruz4History.get("konts")).addAll(vagonInto.getKonts());
                ((List<Gruz>) vagContGruz4History.get("gruzs")).addAll(vagonInto.getGruzs());

                /*for (Kont kontInto : vagonInto.getKonts()) {  // remove konts from poezdInto to  poezdOut
                    kontInto.setVagon(vagonCopy);

                    kontDAO.makePersistent(kontInto);
                    ((List<Kont>) contGruz4History.get("konts")).add(kontInto);
                }

                for (Gruz gruzInto : vagonInto.getGruzs()) {  // remove gruzy from poezdInto to  poezdOut
                    gruzInto.setVagon(vagonCopy);

                    gruzDAO.makePersistent(gruzInto);
                    ((List<Gruz>) contGruz4History.get("gruzs")).add(gruzInto);
                }

                vagonInto.setOtpravka(null);  // no more konts and gruzy
                vagonDAO.makePersistent(vagonInto);*/
                sort++;
            }
        }

        saveVagContGruzHistory(vagContGruz4History, kontGruzHistoryDAO, POEZD, vagonHistoryDAO, getUser().getUsr().getUn(), null);
        return SUCCESS;
    }

    private String addToPoezdoutFromZayavout() {
        Poezd poezdOut = poezdDAO.getById(getHid(), false);
        final PoezdZayav zayav = poezdZayavDAO.getById(zayavHid, false);
        copyZajavDataToPoezd(poezdOut, zayav);

        Map<String, List<?>> vagContGruz4History = new HashMap<>(1);
        vagContGruz4History.put("vags", new ArrayList<Vagon>());
        short sort = (short) (poezdOut.getVagons().stream().mapToInt(Vagon::getSort).max().orElse(-1) + 1);;
        for (Vagon vagonInto : zayav.getVagons()) {
            if (
                    StringUtils.isNotBlank(vagonInto.getNvag()) &&
                            poezdOut.getVagons().stream().noneMatch(vagon -> vagon.getNvag().equals(vagonInto.getNvag()))
            ) {
                Vagon vagonCopy = copyPoezdMapper.map(vagonInto, Vagon.class);

                vagonCopy.setPoezd(poezdOut);
                vagonCopy.setDirection((byte) 2);
                vagonCopy.setSort(sort);
                vagonCopy.setOtpravka(null);
                vagonDAO.makePersistent(vagonCopy);
                ((List<Vagon>) vagContGruz4History.get("vags")).add(vagonCopy);
                sort++;
            }
        }

        saveVagContGruzHistory(vagContGruz4History, kontGruzHistoryDAO, POEZD, vagonHistoryDAO, getUser().getUsr().getUn(), null);
        return SUCCESS;
    }

    private String addToPoezdintoFromZayavinto() throws Exception {
        Poezd poezdInto = poezdDAO.getById(getHid(), false);
        PoezdZayav zayav = poezdZayavDAO.getById(zayavHid, false);
        copyZajavDataToPoezd(poezdInto, zayav);

        copyToPoezdintoFormZayavInto(poezdInto, zayav);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kypoezdMapper.copy(poezdInto, PoezdBaseDTO.class)
                                )
                        )
        );

        return SUCCESS;
    }

    private String createPoezdintoFromZayavinto() throws Exception {
        PoezdZayav zayav = poezdZayavDAO.getById(zayavHid, false);
        final Poezd poezd = copyPoezdMapper.map(zayav, Poezd.class);
        poezd.setKoleya(getKoleya());

        PackDoc pack = new PackDoc(zayav.getRoute(), getUser().getUsr().getGroup());
        pack.addPoezdItem(poezd);
        getPackDocDAO().makePersistent(pack);

        copyToPoezdintoFormZayavInto(poezd, zayav);

        return SUCCESS;
    }

    private void copyToPoezdintoFormZayavInto(Poezd poezdInto, PoezdZayav zayav) {
        Map<String, List<?>> vagContGruz4History = new HashMap<>(3);
        vagContGruz4History.put("konts", new ArrayList<Kont>());
        vagContGruz4History.put("gruzs", new ArrayList<>());
        vagContGruz4History.put("vags", new ArrayList<Vagon>());

        short sort = poezdInto.getVagons() != null ? (short) (poezdInto.getVagons().stream().mapToInt(Vagon::getSort).max().orElse(-1) + 1) : 0;
        for (Vagon vagonInto : zayav.getVagons()) {
            Vagon vagonCopy = copyPoezdMapper.map(vagonInto, Vagon.class);

            vagonCopy.setPoezd(poezdInto);
            vagonCopy.setDirection((byte) 1);
            vagonCopy.setSort(sort);
            vagonDAO.makePersistent(vagonCopy);
            ((List<Vagon>) vagContGruz4History.get("vags")).add(vagonCopy);

            for (Kont kontInto : vagonInto.getKonts()) {
                final Kont kontCopy = copyPoezdMapper.map(kontInto, Kont.class);
                kontCopy.setVagon(vagonCopy);
                kontDAO.makePersistent(kontCopy);
                ((List<Kont>) vagContGruz4History.get("konts")).add(kontCopy);

                for (Gruz gruzInto : kontInto.getGruzs()) {
                    final Gruz gruzCopy = copyPoezdMapper.map(gruzInto, Gruz.class);
                    gruzCopy.setKont(kontCopy);
                    gruzDAO.makePersistent(gruzCopy);
                }

                for (Plomb plombInto : kontInto.getPlombs()) {
                    final Plomb plombCopy = copyPoezdMapper.map(plombInto, Plomb.class);
                    plombCopy.setKont(kontCopy);
                    plombDAO.makePersistent(plombCopy);
                }
            }

            for (Gruz gruzInto : vagonInto.getGruzs()) {
                final Gruz gruzCopy = copyPoezdMapper.map(gruzInto, Gruz.class);
                gruzCopy.setVagon(vagonCopy);
                gruzDAO.makePersistent(gruzCopy);
                ((List<Gruz>) vagContGruz4History.get("gruzs")).add(gruzCopy);
            }

            sort++;
        }

        saveVagContGruzHistory(vagContGruz4History, kontGruzHistoryDAO, POEZD, vagonHistoryDAO, getUser().getUsr().getUn(), null);
    }

    private void copyZajavDataToPoezd(Poezd poezdInto, PoezdZayav zayav) {
        if (StringUtils.isNotBlank(zayav.getGruzotpr())) {
            poezdInto.setGruzotpr(zayav.getGruzotpr());
        }
        if(zayav.getClient() != null) {
            poezdInto.setClient(zayav.getClient());
        }
        if (StringUtils.isNotBlank(zayav.getNppr())) {
            poezdInto.setNppr(zayav.getNppr());
        }
        if (StringUtils.isNotBlank(zayav.getNpprm())) {
            poezdInto.setNpprm(zayav.getNpprm());
        }
    }

    public String uploadPoezd(Boolean update) throws Exception {
        log.info("uploadPoezd");
        Poezd poezd = poezdDAO.findById(getHid(), false);
        Map<String, List<?>> hist = new KYPoezdLoader().load(fileData, poezd, update);  // todo add vags to history
//        HibernateUtil.getSession().save(pd);
        saveVagContGruzHistory(hist, kontGruzHistoryDAO, POEZD, vagonHistoryDAO, getUser().getUsr().getUn(), null);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    final private java.text.SimpleDateFormat fileMask = new java.text.SimpleDateFormat("yyyy_MM_dd_HH_mm_ss");
    public String exportPoezd() throws Exception {
        log.info("exportPoezd");
        Poezd poezd = poezdDAO.findById(getHid(), false);

        ByteArrayOutputStream res = new KYKontsLoader().create(poezd);

        inputStream = new ByteArrayInputStream(res.toByteArray());
        fileName = "out" + fileMask.format(new Date()) + ".xlsx";
        return "excel";
    }

/*
    public String r27() throws Exception {
        log.info("r27");
        Poezd poezd = poezdDAO.findById(getHid(), false);

        ByteArrayOutputStream res = new KYKontsLoader().create(poezd);

        inputStream = new ByteArrayInputStream(res.toByteArray());
        fileName = "r27_" + fileMask.format(new Date()) + ".xlsx";
        return "excel";
    }
*/

/*
    public String r27Blank() throws Exception {
        log.info("r27Blank");
        Poezd poezd = poezdDAO.findById(getHid(), false);

        ByteArrayOutputStream res = new KYKontsLoader().create(poezd);

        inputStream = new ByteArrayInputStream(res.toByteArray());
        fileName = "r27_" + fileMask.format(new Date()) + ".xlsx";
        return "excel";
    }
*/

    private String fileName;
    private InputStream inputStream;
    private File fileData;
    private String action;
    private Byte direction;
    private Byte koleya;
    private long routeId;
    private String n_packet;
    private String n_poezd;
    private String ved_nomer;
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    private String[] nvag;
    private String reportParams;

    public String[] getNvag() {
        if(nvag != null && nvag.length == 1 && (nvag[0] == null || nvag[0].length() == 0)) return null;
        return nvag;
    }


    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public InputStream getInputStream() {
        return inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    public void setNvag(String[] nvag) {
        this.nvag = nvag;
    }

    public void setUpload(File file) {
        this.fileData = file;
    }

    public File getUpload() {
        return this.fileData;
    }

    public void setN_packet(String n_packet) {
        this.n_packet = n_packet;
    }

    public void setN_poezd(String n_poezd) {
        this.n_poezd = n_poezd;
    }

    public void setVed_nomer(String ved_nomer) {
        this.ved_nomer = ved_nomer;
    }

    public void setReportParams(String reportParams) {
        this.reportParams = reportParams;
    }

    public void setHids(List<Long> hids) {
        this.hids = hids;
    }

    public Long getHidInto() {
        return hidInto;
    }

    public void setHidInto(Long hidInto) {
        this.hidInto = hidInto;
    }

    public Long getHidOut() {
        return hidOut;
    }

    public void setHidOut(Long hidOut) {
        this.hidOut = hidOut;
    }

    public void setZayavHid(Long zayavHid) {
        this.zayavHid = zayavHid;
    }

    enum Action {
        LIST, EDIT, SAVE, DELETE, POEZDS_DIR_FOR_POEZD_BIND, CREATE_POEZDOUT_FROM_POEZDINTO, CREATE_POEZDOUT_FROM_POEZDSINTO,
        IMPORT_POEZD_LIST, IMPORT_POEZD_VAGON_LIST, IMPORT_POESD, UPLOAD, GET_POEZDS_IN_INTERVAL, GET_GRUZOTPR_IN_INTERVAL, GET_POEZDINTO_FOR_POEZDOUT,
        ADD_TO_POEZDINTO_FROM_ZAYAVINTO, ADD_TO_POEZDOUT_FROM_ZAYAVOUT, CREATE_POEZDINTO_FROM_ZAYAVINTO, UPDATE, EXPORT_POEZD, R27, R27BLANK
    }

    private List<Filter> filters;
    private String filter;
    private String jsonRequest;
    private List<Long> hids;
    private Long hidInto;
    private Long hidOut;
    private Long zayavHid;

    @Autowired
    private KontGruzHistoryDAO kontGruzHistoryDAO;
    @Autowired
    private PoezdDAO poezdDAO;
    @Autowired
    private VagonDAO vagonDAO;
    @Autowired
    private KontDAO kontDAO;
    @Autowired
    private GruzDAO gruzDAO;
    @Autowired
    private PlombDAO plombDAO;
    @Autowired
    private PoezdZayavDAO poezdZayavDAO;
    @Autowired
    private NsiClientDAO clientDAO;
    @Autowired
    private RouteDAO routeDAO;
    @Autowired
    private Mapper kypoezdMapper;
    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private IPoezdService poezdService;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.Mapper mapper;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.CopyPoezdMapper copyPoezdMapper;
    @Autowired
    private VagonHistoryDAO vagonHistoryDAO;

    public Byte getKoleya() {
        return koleya;
    }

    public void setKoleya(Byte koleya) {
        this.koleya = koleya;
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
