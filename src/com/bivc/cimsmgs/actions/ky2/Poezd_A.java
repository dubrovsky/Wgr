package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.KontGruzHistoryDAO;
import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.dao.VagonDAO;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.db.ky.Vagon;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.PoezdBaseDTO;
import com.bivc.cimsmgs.dto.ky.PoezdDTO;
import com.bivc.cimsmgs.dto.ky2.PoezdImportDTO;
import com.bivc.cimsmgs.exchange.KYPoezdLoader;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.bivc.cimsmgs.services.ky.IPoezdService;
import com.bivc.cimsmgs.sql.Select;
import com.isc.utils.dbStore.dbPaketTool;
import com.isc.utils.dbStore.dbTool;
import com.isc.utils.dbStore.sequenceFields;
import com.isc.utils.dbStore.stPack;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.connection.ConnectionProvider;
import org.hibernate.engine.SessionFactoryImplementor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.util.*;
import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.POEZD;
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
                case IMPORT_POEZD_LIST:
                    return importPoezdList();
                case IMPORT_POESD:
                    return importPoezd();
                case UPLOAD:
                    return uploadPoezd();
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
        List<Poezd> list = poezdDAO.findAll(getLimit(), getStart(), getRouteId(), getDirection(), filters, getUser().getUsr(), getLocale(), getKoleya());
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

//        setJSONData(poezdIntoToListSerializer.setLocale(getLocale()).write(response));
        return SUCCESS;
    }

    public String importPoezdList() throws Exception {
//      dbConnector dbc = new dbConnector();
//      Class.forName("oracle.jdbc.OracleDriver");
        SessionFactoryImplementor sessionFactoryImplementation = (SessionFactoryImplementor) HibernateUtil.getSessionFactory();
        ConnectionProvider connectionProvider = sessionFactoryImplementation.getConnectionProvider();

        dbTool dbt = new dbTool(connectionProvider.getConnection(), null);
        stPack st = new stPack();
        dbt.read(st, Select.getSqlFile("ky/bringing/poezdList"), null);

        List<PoezdImportDTO> poezdImportDTOS = new ArrayList<>(st.getRowCount());
        for (int i = 0; i < st.getRowCount(); i++) {
            poezdImportDTOS.add(
                    new PoezdImportDTO(st.getTxt(i, "DATTR"), st.getTxt(i, "N_POEZD"), st.getTxt(i, "N_PACKET"),
                            st.getTxt(i, "VED_NOMER"), st.getTxt(i, "COUNT_NVAG"), st.getTxt(i, "STO_F"), st.getTxt(i, "STN"))
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

    public String importPoezd() throws Exception {
        System.out.println("routeId - " + routeId + ", n_poezd - " + n_poezd + ", ved_nomer - " + ved_nomer + ", n_packet - " + n_packet + ", koleya - " + koleya + ", direction - " + direction);

        SessionFactoryImplementor sessionFactoryImplementation = (SessionFactoryImplementor) HibernateUtil.getSessionFactory();
        ConnectionProvider connectionProvider = sessionFactoryImplementation.getConnectionProvider();

        dbTool dbt = new dbTool(connectionProvider.getConnection(), null);

        Vector keyNm = new Vector();
        keyNm.add("HID");

        stPack stw = new stPack("VAG_PER_VED");
        stw.setObject(0, "N_POEZD", n_poezd);
        stw.setObject(0, "N_PACKET", n_packet);
        stw.setObject(0, "VED_NOMER", ved_nomer);
        dbt.read(stw, "VAG_PER_VED", "WHERE 1=0", null);

        stPack st2 = new stPack("POEZD");
        st2.getInfo().keyName = keyNm;

        dbt.read(st2, Select.getSqlFile("ky/bringing/poezd"), stw, 0, "N_POEZD,N_PACKET,VED_NOMER");
        stw.setPack(0, st2);

        dbt.readChildData(st2, "VAGON_HID", Select.getSqlFile("ky/bringing/vagon_hid"), -1, "NPPR,N_PACKET,VED_NOMER");
        dbt.readChildData(st2, "VAGON_HID", "VAGON", Select.getSqlFile("ky/bringing/vagon"), null, "HID_VAG");
        dbt.readChildData(st2, "VAGON", "KONT_HID", Select.getSqlFile("ky/bringing/kont_hid"), null, "NPPR,N_PACKET,VED_NOMER,NVAG");
        dbt.readChildData(st2, "KONT_HID", "KONT", Select.getSqlFile("ky/bringing/kont"), null, "HID_KONT");
        dbt.readChildData(st2, "KONT", "GRUZ_KONT", Select.getSqlFile("ky/bringing/gruz_kont"), null, "HID_KONT");
        dbt.readChildData(st2, "VAGON", "GRUZ_VAG", Select.getSqlFile("ky/bringing/gruz_vag"), null, "HID_VAG");
        dbt.readChildData(st2, "KONT", "PLOMB_KONT", Select.getSqlFile("ky/bringing/plomb_kont"), null, "HID_KONT");
        dbt.readChildData(st2, "VAGON", "PLOMB_VAG", Select.getSqlFile("ky/bringing/plomb_vag"), null, "HID_VAG");

        dbPaketTool dbpt = new dbPaketTool(dbt);

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

        sequenceFields sq = new sequenceFields().addSequence("HID", "KY_VAGON_HID");
        String[][] fillParentKey = new String[][]{
          {"HID", "HID_POEZD"},
          {"UN", "UN"},
          {"ALTERED", "ALTERED"},
          {"DATTR", "DATTR"},
          {"TRANS", "TRANS"}
        };
        dbpt.fillRownum("VAGON", "SORT", st2);
        dbpt.save("VAGON", "KY_VAGON", keyNm, fillParentKey, st2, sq);

        sq = new sequenceFields().addSequence("HID", "KY_KONT_HID");
        fillParentKey = new String[][] {
          {"HID", "HID_VAGON"},
          {"UN", "UN"},
          {"ALTERED", "ALTERED"},
          {"DATTR", "DATTR"},
          {"TRANS", "TRANS"}
        };
        dbpt.fillRownum("KONT", "SORT", st2);
        dbpt.save("KONT", "KY_KONT", keyNm, fillParentKey, st2, sq);

        sq = new sequenceFields().addSequence("HID", "KY_GRUZ_HID");
        fillParentKey = new String[][] {
          {"HID", "HID_KONT"},
          {"UN", "UN"},
          {"ALTERED", "ALTERED"},
          {"DATTR", "DATTR"},
          {"TRANS", "TRANS"}
        };
        dbpt.fillRownum("GRUZ_KONT", "SORT", st2);
        dbpt.save("GRUZ_KONT", "KY_GRUZ", keyNm, fillParentKey, st2, sq);

        fillParentKey = new String[][] {
          {"HID", "HID_VAGON"},
          {"UN", "UN"},
          {"ALTERED", "ALTERED"},
          {"DATTR", "DATTR"},
          {"TRANS", "TRANS"}
        };
        dbpt.fillRownum("GRUZ_VAG", "SORT", st2);
        dbpt.save("GRUZ_VAG", "KY_GRUZ", keyNm, fillParentKey, st2, sq);

        sq = new sequenceFields().addSequence("HID", "KY_PLOMB_HID");
        fillParentKey = new String[][] {
          {"HID", "HID_KONT"},
          {"UN", "UN"},
          {"ALTERED", "ALTERED"},
          {"DATTR", "DATTR"},
          {"TRANS", "TRANS"}
        };
        dbpt.fillRownum("PLOMB_KONT", "SORT", st2);
        dbpt.save("PLOMB_KONT", "KY_PLOMB", keyNm, fillParentKey, st2, sq);

        fillParentKey = new String[][] {
          {"HID", "HID_VAGON"},
          {"UN", "UN"},
          {"ALTERED", "ALTERED"},
          {"DATTR", "DATTR"},
          {"TRANS", "TRANS"}
        };
        dbpt.fillRownum("PLOMB_VAG", "SORT", st2);
        dbpt.save("PLOMB_VAG", "KY_PLOMB", keyNm, fillParentKey, st2, sq);

        sq = new sequenceFields().addSequence("HID", "KY_KONT_GRUZ_HISTORY_HID");
        fillParentKey = new String[][] {
          {"HID", "HID_KONT"},
          {"UN", "UN"},
          {"DATTR", "DATE_OPERATION"},
          {"HID_POEZD", "HID_POEZD"},
          {"KOLEYA", "KOLEYA"},
          {"DIRECTION", "DIRECTION"},
          {"HID_VAGON","HID_VAGON"}
        };
        dbpt.fillNewPaket("KONT", "KONT_HISTORY", fillParentKey, st2);
        dbpt.save("KONT_HISTORY", "KY_KONT_GRUZ_HISTORY", keyNm, fillParentKey, st2, sq);

        fillParentKey = new String[][] {
          {"HID", "HID_GRUZ"},
          {"UN", "UN"},
          {"DATTR", "DATE_OPERATION"},
          {"HID_POEZD", "HID_POEZD"},
          {"KOLEYA", "KOLEYA"},
          {"DIRECTION", "DIRECTION"},
          {"HID_VAGON","HID_VAGON"}
        };
        dbpt.fillNewPaket("GRUZ_VAG", "GRUZ_HISTORY", fillParentKey, st2);
        dbpt.save("GRUZ_HISTORY", "KY_KONT_GRUZ_HISTORY", keyNm, fillParentKey, st2, sq);

        dbt.commit();

        log.debug(st2.toString());

        setJSONData(
                defaultSerializer
                        .write(
                                new Response<>()
                        )
        );
        return SUCCESS;
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

        Poezd saved;
        if (StringUtils.isBlank(dto.getNppr())) {
            dto.setNppr(poezdService.produceNppr(dto));
        }

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
                                        kypoezdMapper.copy(saved, PoezdBaseDTO.class)
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

    public String createPoezdOutFromPoezdInto() {
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

        for (Vagon vagonInto : poezdInto.getVagons()) {
            Vagon vagonCopy = copyPoezdMapper.map(vagonInto, Vagon.class);

            // set props
            vagonCopy.setPoezd(poezdCopy);
            vagonCopy.setDirection((byte) 2);

            // save
            vagonDAO.makePersistent(vagonCopy);
        }

        return SUCCESS;
    }

    public String uploadPoezd() throws Exception {
        log.info("uploadPoezd");
        Poezd poezd = poezdDAO.findById(getHid(), false);
        Map<String, List<?>> hist = new KYPoezdLoader().load(fileData, poezd);
//        HibernateUtil.getSession().save(pd);
        saveContGruzHistory(hist, kontGruzHistoryDAO, POEZD);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    private File fileData;
    private String action;
    private Byte direction;
    private Byte koleya;
    private long routeId;
    private String n_packet;
    private String n_poezd;
    private String ved_nomer;

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

    enum Action {LIST, EDIT, SAVE, DELETE, POEZDS_DIR_FOR_POEZD_BIND, CREATE_POEZDOUT_FROM_POEZDINTO, IMPORT_POEZD_LIST, IMPORT_POESD, UPLOAD}

    private List<Filter> filters;
    private String filter;
    private String jsonRequest;

    @Autowired
    private KontGruzHistoryDAO kontGruzHistoryDAO;
    @Autowired
    private PoezdDAO poezdDAO;
    @Autowired
    private VagonDAO vagonDAO;
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
