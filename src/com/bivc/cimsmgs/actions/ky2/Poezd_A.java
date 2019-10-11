package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.PoezdBaseDTO;
import com.bivc.cimsmgs.dto.ky.PoezdDTO;
import com.bivc.cimsmgs.dto.ky2.PoezdImportDTO;
import com.bivc.cimsmgs.dto.ky2.PoezdViewDTO;
import com.bivc.cimsmgs.dto.ky2.VagonViewDTO;
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
                case CREATE_POEZDOUT_FROM_POEZDSINTO:
                    return createPoezdOutFromPoezdsInto();
                case IMPORT_POEZD_LIST:
                    return importPoezdList();
                case IMPORT_POESD:
                    return importPoezd();
                case UPLOAD:
                    return uploadPoezd();
                case GET_POEZDINTO_FOR_POEZDOUT:
                    return getPoezdintoForPoezdout();
                case ADD_TO_POEZDINTO_FROM_ZAYAVINTO:
                    return addToPoezdintoFromZayavinto();
                case ADD_TO_POEZDOUT_FROM_ZAYAVOUT:
                    return addToPoezdoutFromZayavout();
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
        SessionFactoryImplementor sessionFactoryImplementation = (SessionFactoryImplementor) HibernateUtil.getSessionFactory();
        ConnectionProvider connectionProvider = sessionFactoryImplementation.getConnectionProvider();

        dbTool dbt = new dbTool(connectionProvider.getConnection(), null);
        stPack st = new stPack();
        dbt.read(st, Select.getSqlFile("ky/bringing/poezdList"), null);

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

        SessionFactoryImplementor sessionFactoryImplementation = (SessionFactoryImplementor) HibernateUtil.getSessionFactory();
        ConnectionProvider connectionProvider = sessionFactoryImplementation.getConnectionProvider();

        dbTool dbt = new dbTool(connectionProvider.getConnection(), null);

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

        dbt.readChildData(st2, "VAGON_HID", Select.getSqlFile("ky/bringing/vagon_hid"), -1, "N_POEZD,N_PACKET,VED_NOMER");
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
        dbpt.fill_Rownum("VAGON", "SORT", st2, 0);
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
        final List<Poezd> poezds = poezdDAO.getPoezdsIntoForPoezdOutDir(getUser().getUsr(), getRouteId());

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

//        createPoezdOutFromPoezdInto(poezdInto, poezdCopy);
//        Map<String, List<?>> contGruz4History = new HashMap<>(2);
//        contGruz4History.put("konts", new ArrayList<Kont>());
//        contGruz4History.put("gruzs", new ArrayList<>());

        short sort = 0;
        for (Vagon vagonInto : poezdInto.getVagons()) {
            if (hids.contains(vagonInto.getHid())) {
                Vagon vagonCopy = copyPoezdMapper.map(vagonInto, Vagon.class);

                // set props
                vagonCopy.setPoezd(poezdCopy);
                vagonCopy.setDirection((byte) 2);
                vagonCopy.setSort(sort);

                // save
                vagonDAO.makePersistent(vagonCopy);

                sort++;
            }
        }

//        saveContGruzHistory(contGruz4History, kontGruzHistoryDAO, POEZD);
        return SUCCESS;
    }

    public String createPoezdOutFromPoezdsInto() {
        Poezd poezdInto = poezdDAO.getById(getHidInto(), false);
        Poezd poezdOut = poezdDAO.getById(getHidOut(), false);

//        createPoezdOutFromPoezdInto(poezdInto, poezdOut);
        Map<String, List<?>> contGruz4History = new HashMap<>(2);
        contGruz4History.put("konts", new ArrayList<Kont>());
        contGruz4History.put("gruzs", new ArrayList<>());

        short sort = 0;
        for (Vagon vagonInto : poezdInto.getVagons()) {
            if (hids.contains(vagonInto.getHid())) {
                Vagon vagonCopy = copyPoezdMapper.map(vagonInto, Vagon.class);

                // set props
                vagonCopy.setPoezd(poezdOut);
                vagonCopy.setDirection((byte) 2);
                vagonCopy.setSort(sort);

                // save
                vagonDAO.makePersistent(vagonCopy);

                for (Kont kontInto : vagonInto.getKonts()) {
                    kontInto.setVagon(vagonCopy);

                    kontDAO.makePersistent(kontInto);
                    ((List<Kont>) contGruz4History.get("konts")).add(kontInto);
                }

                for (Gruz gruzInto : vagonInto.getGruzs()) {
                    gruzInto.setVagon(vagonCopy);

                    gruzDAO.makePersistent(gruzInto);
                    ((List<Gruz>) contGruz4History.get("gruzs")).add(gruzInto);
                }

                sort++;
            }
        }

        saveContGruzHistory(contGruz4History, kontGruzHistoryDAO, POEZD);
        return SUCCESS;
    }

    /*private void createPoezdOutFromPoezdInto(Poezd poezdInto, Poezd poezdOut) {
        Map<String, List<?>> contGruz4History = new HashMap<>(2);
        contGruz4History.put("konts", new ArrayList<Kont>());
        contGruz4History.put("gruzs", new ArrayList<>());

        short sort = 0;
        for (Vagon vagonInto : poezdInto.getVagons()) {
            if (hids.contains(vagonInto.getHid())) {
                Vagon vagonCopy = copyPoezdMapper.map(vagonInto, Vagon.class);

                // set props
                vagonCopy.setPoezd(poezdOut);
                vagonCopy.setDirection((byte) 2);
                vagonCopy.setSort(sort);

                // save
                vagonDAO.makePersistent(vagonCopy);

                for (Kont kontInto : vagonInto.getKonts()) {
//                    final Kont kontCopy = copyPoezdMapper.map(kontInto, Kont.class);
                    kontInto.setVagon(vagonCopy);

                    kontDAO.makePersistent(kontInto);
                    ((List<Kont>) contGruz4History.get("konts")).add(kontInto);

                    *//*for(Gruz gruzInto: kontInto.getGruzs()){
                        final Gruz gruzCopy = copyPoezdMapper.map(gruzInto, Gruz.class);
                        gruzCopy.setKont(kontCopy);

                        gruzDAO.makePersistent(gruzCopy);
                    }

                    for(Plomb plombInto: kontInto.getPlombs()){
                        final Plomb plombCopy = copyPoezdMapper.map(plombInto, Plomb.class);
                        plombCopy.setKont(kontCopy);

                        plombDAO.makePersistent(plombCopy);
                    }*//*
                }

                for (Gruz gruzInto : vagonInto.getGruzs()) {
//                    final Gruz gruzCopy = copyPoezdMapper.map(gruzInto, Gruz.class);
                    gruzInto.setVagon(vagonCopy);

                    gruzDAO.makePersistent(gruzInto);
                    ((List<Gruz>) contGruz4History.get("gruzs")).add(gruzInto);
                }

                sort++;
            }
        }

        saveContGruzHistory(contGruz4History, kontGruzHistoryDAO, POEZD);
    }*/

    private String addToPoezdoutFromZayavout() {
        Poezd poezdInto = poezdDAO.getById(getHid(), false);
        final PoezdZayav zayav = poezdZayavDAO.getById(zayavHid, false);
        copyZajavDataToPoezd(poezdInto, zayav);

        short sort = 0;
        for (Vagon vagonInto : zayav.getVagons()) {
            if (
                    StringUtils.isNotBlank(vagonInto.getNvag()) &&
                            poezdInto.getVagons().stream().noneMatch(vagon -> vagon.getNvag().equals(vagonInto.getNvag()))
            ) {
                Vagon vagonCopy = copyPoezdMapper.map(vagonInto, Vagon.class);

                vagonCopy.setPoezd(poezdInto);
                vagonCopy.setDirection((byte) 1);
                vagonCopy.setSort(sort);
                vagonDAO.makePersistent(vagonCopy);
                sort++;
            }
        }

        return SUCCESS;
    }

    private String addToPoezdintoFromZayavinto() {
        Poezd poezdInto = poezdDAO.getById(getHid(), false);
        PoezdZayav zayav = poezdZayavDAO.getById(zayavHid, false);
        copyZajavDataToPoezd(poezdInto, zayav);

        Map<String, List<?>> contGruz4History = new HashMap<>(2);
        contGruz4History.put("konts", new ArrayList<Kont>());
        contGruz4History.put("gruzs", new ArrayList<>());
        short sort = 0;
        for (Vagon vagonInto : zayav.getVagons()) {
            Vagon vagonCopy = copyPoezdMapper.map(vagonInto, Vagon.class);

            vagonCopy.setPoezd(poezdInto);
            vagonCopy.setDirection((byte) 1);
            vagonCopy.setSort(sort);
            vagonDAO.makePersistent(vagonCopy);

            for (Kont kontInto : vagonInto.getKonts()) {
                final Kont kontCopy = copyPoezdMapper.map(kontInto, Kont.class);
                kontCopy.setVagon(vagonCopy);
                kontDAO.makePersistent(kontCopy);
                ((List<Kont>) contGruz4History.get("konts")).add(kontCopy);

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
                ((List<Gruz>) contGruz4History.get("gruzs")).add(gruzCopy);
            }

            sort++;
        }

        saveContGruzHistory(contGruz4History, kontGruzHistoryDAO, POEZD);

        return SUCCESS;
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
    private String reportParams;

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
        LIST, EDIT, SAVE, DELETE, POEZDS_DIR_FOR_POEZD_BIND, CREATE_POEZDOUT_FROM_POEZDINTO, CREATE_POEZDOUT_FROM_POEZDSINTO, IMPORT_POEZD_LIST, IMPORT_POESD, UPLOAD, GET_POEZDS_IN_INTERVAL, GET_GRUZOTPR_IN_INTERVAL, GET_POEZDINTO_FOR_POEZDOUT, ADD_TO_POEZDINTO_FROM_ZAYAVINTO, ADD_TO_POEZDOUT_FROM_ZAYAVOUT
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
