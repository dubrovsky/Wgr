package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.DateTimeUtils;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.KontDAO;
import com.bivc.cimsmgs.dao.KontGruzHistoryDAO;
import com.bivc.cimsmgs.dao.NsiClientDAO;
import com.bivc.cimsmgs.dao.YardDAO;
import com.bivc.cimsmgs.dao.YardSectorDAO;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Yard;
import com.bivc.cimsmgs.db.nsi.Client;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky2.KontViewDTO;
import com.bivc.cimsmgs.dto.ky2.YardChangeClientDTO;
import com.bivc.cimsmgs.dto.ky2.YardDTO;
import com.bivc.cimsmgs.dto.ky2.YardFilerDirDTO;
import com.bivc.cimsmgs.exchange.KYKontsLoader;
import com.bivc.cimsmgs.exchange.KYStan;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import static com.bivc.cimsmgs.commons.Utils.setNewMessCount;

/**
 * Created by peter on 21.01.14.
 */
public class Yard_A extends CimSmgsSupport_A {
    final static private Logger log = LoggerFactory.getLogger(Yard_A.class);

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
                case UPLOAD:
                    return uploadXLS();
                case XLSEXPORT:
                    return exportXLS();
                case XLSSTAN:
                    return stanXLS();
                case UPDATE:
                    return updateXLS();
                case CHANGE_CLIENT:
                    return changeClient();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

    }

    public String list() throws Exception {
        log.debug("Rendering Yard list.");

        filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>() {
                }.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;

        List<Yard> list = yardDAO.findAll(getLimit(), getStart(), filters, getLocale(), getUser().getUsr(), getRouteId(), nkons);
        setNewMessCount(list, getUser().getUsr().getUn());
        Long total = yardDAO.countAll(filters, getLocale(), getUser().getUsr(), getRouteId(), nkons);

        log.debug("Found {} Yard entries.", total);

        final List<YardDTO> yardDTOS = kyyardMapper.copyList(list, YardDTO.class);
        boolean found;  // find same konts
        for (int i = 0; i < yardDTOS.size(); i++) {
            found = false;
            for (int y = (i + 1); y < yardDTOS.size(); y++) {
                final KontViewDTO kont1 = yardDTOS.get(i).getKonts().iterator().next();
                final KontViewDTO kont2 = yardDTOS.get(y).getKonts().iterator().next();
                if (kont1.getNkon().equals(kont2.getNkon())) {
                    kont1.setSameKont(true);
                    kont2.setSameKont(true);
                    found = true;
                }
                if (found) {
                    break;
                }
            }
        }

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        yardDTOS,
                                        total
                                )
                        )
        );

//        setJSONData(yardToListSerializer.setLocale(getLocale()).write(new Response<Yard>(list, total)));

        return SUCCESS;
    }

    public String edit() throws Exception {
        log.debug("Rendering edit YARD entry form for YARD entry with hid: {}", getHid());

        Yard yard = yardDAO.findById(getHid(), false);

        log.debug("Rendering edit YARD entry form for YARD entry with information: {}", yard);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyyardMapper.copy(yard, YardDTO.class)
                                )
                        )
        );

//        setJSONData(yardToFormSerializer.setLocale(getLocale()).write(new Response<Yard>(yard)));

        return SUCCESS;
    }

    public String save() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }

        YardDTO dto = defaultDeserializer.setLocale(getLocale()).read(YardDTO.class, jsonRequest);
        log.debug("Saving a Yard entry with information: {}", dto);

        Yard yard;
        if (dto.getHid() == null) {
            yard = add(dto);
        } else {
            yard = update(dto);
        }

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyyardMapper.copy(yard, YardDTO.class)
                                )
                        )
        );

//        setJSONData(yardToFormSerializer.setLocale(getLocale()).write(new Response<Yard>(yard)));
        return SUCCESS;
    }

    private Yard add(YardDTO dto) {
        Yard added = mapper.map(dto, Yard.class);
        added.setSector(yardSectorDAO.getById(dto.getSector().getHid(), false));
        yardDAO.makePersistent(added);
        log.debug("Added a Yard entry with information: {}", added);
        return added;
    }

    private Yard update(YardDTO dto) {
        Yard updated = yardDAO.getById(dto.getHid(), false);
        mapper.map(dto, updated);
        updated.setSector(yardSectorDAO.getById(dto.getSector().getHid(), false));
        log.debug("Updated the information of a Yard entry to: {}", updated);

        return updated;
    }

    public String delete() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }

        YardDTO dto = defaultDeserializer.setLocale(getLocale()).read(YardDTO.class, jsonRequest);
        log.debug("Deleting a Yard entry with id: {}", dto.getHid());

        Yard deleted = yardDAO.getById(dto.getHid(), false);

        log.debug("Checking if a Yard with id: {} has Kont entity bound", deleted.getHid());
        if (!deleted.getKonts().isEmpty()) {
            throw new RuntimeException("Нельзя удалять место на контейнерной площадке, т.к. на этом месте находится контейнер");
//            log.debug("Yard with id: {} has Kont entity bound. Unbinding Kont entity with id: {}", deleted.getHid(), deleted.getKont().getHid());

//            deleted.getKont().unbindYard();
        }

        yardDAO.makeTransient(deleted);
        log.info("Deleted Yard entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    public String getPoezdsForFilter() throws Exception {
        final List<YardFilerDirDTO> gruzotprs = yardDAO.getPoezdsForFilter(getUser().getUsr());
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        gruzotprs,
                                        (long) gruzotprs.size()
                                )
                        )
        );
        return SUCCESS;
    }

    public String getGruzotprsForFilter() throws Exception {
        final List<YardFilerDirDTO> gruzotprs = yardDAO.getGruzotprsForFilter(getUser().getUsr(), routeId);
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        gruzotprs,
                                        (long) gruzotprs.size()
                                )
                        )
        );
        return SUCCESS;
    }
    
    // Step 1
    public String uploadXLS() throws Exception {
        log.info("uploadKontList");
        HashSet<String> konts = new KYKontsLoader().load(fileData);
        setJSONData(defaultSerializer.write(new Response<>(konts)));
        return SUCCESS;
    }

    final private SimpleDateFormat fileMask = new SimpleDateFormat("yyyy_MM_dd_HH_mm_ss");

    // Step 2
    public String exportXLS() throws Exception {

        filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>() {
                }.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;

        List<Yard> list = yardDAO.findAll(getLimit(), -1, filters, getLocale(), getUser().getUsr(), getRouteId(), nkons);

        ByteArrayOutputStream res = new KYKontsLoader().create(list);

        inputStream = new ByteArrayInputStream(res.toByteArray());
        fileName = "out" + fileMask.format(new Date()) + ".xlsx";
        return "excel";
    }

    // Step undefined ))
    public String stanXLS() throws Exception {

        filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>() {
                }.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;

        List<Yard> list = yardDAO.findAll(getLimit(), -1, filters, getLocale(), getUser().getUsr(), getRouteId(), nkons);

        // заменить на новый экспорт stan terminalu
        ByteArrayOutputStream res = new KYStan().create(list);

        inputStream = new ByteArrayInputStream(res.toByteArray());
        fileName = "outStan" + fileMask.format(new Date()) + ".xlsx";
        return "excel";
    }

    // Step 3
    public String updateXLS() throws Exception {
        List<Yard> list = yardDAO.findAll(getLimit(), -1, filters, getLocale(), getUser().getUsr(), getRouteId(), nkons);

        new KYKontsLoader().update(fileData, list);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    public String changeClient() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }
        YardChangeClientDTO dto = defaultDeserializer.setLocale(getLocale()).read(YardChangeClientDTO.class, jsonRequest);
        Client client = clientDAO.getById(dto.getClientHid(), false);

        for(Long hid: dto.getHid()) {
        Kont kont = kontDAO.getById(hid, false);
        Long sid = kont.getSid() != null ? kont.getSid() : kont.getHid() ;
        kont.setSid(sid);
        Date newDotp = DateTimeUtils.addDayToDate(dto.getChange(), -1);
        if (kont.getDprb() == null)
            kont.setDotp(newDotp);
        else if (kont.getDprb().after(newDotp))
            kont.setDotp(kont.getDprb());
        else
            kont.setDotp(newDotp);

        Kont kontCopy = copyKontMapper.map(kont, Kont.class);
        kontCopy.copyGruzs(kont.getGruzs(), copyKontMapper);
        kontCopy.copyPlombs(kont.getPlombs(), copyKontMapper);
        kontCopy.setYard(kont.getYard());
        kontCopy.setClient(client);
        kontCopy.setSid(sid);
        kontCopy.setDprb(dto.getChange());

        Map<String, List<?>> contGruz4HistoryOut = new HashMap<>(1);
        contGruz4HistoryOut.put("konts", new ArrayList<Kont>());
        ((List<Kont>) contGruz4HistoryOut.get("konts")).add(kont);
        saveVagContGruzHistory(contGruz4HistoryOut, kontGruzHistoryDAO, KontGruzHistoryType.OUTPUT, null, getUser().getUsr().getUn(), dto.getChange());
        kont.setYard(null);

        Map<String, List<?>> contGruz4HistoryIn = new HashMap<>(1);
        contGruz4HistoryIn.put("konts", new ArrayList<Kont>());
        ((List<Kont>) contGruz4HistoryIn.get("konts")).add(kontCopy);
        saveVagContGruzHistory(contGruz4HistoryIn, kontGruzHistoryDAO, KontGruzHistoryType.INPUT, null, getUser().getUsr().getUn(), dto.getChange());
        saveVagContGruzHistory(contGruz4HistoryIn, kontGruzHistoryDAO, KontGruzHistoryType.YARD, null, getUser().getUsr().getUn(), DateTimeUtils.addOneMinToDate(dto.getChange()));

        kontDAO.makePersistent(kont);
        kontDAO.makePersistent(kontCopy);
        }

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    private InputStream inputStream;
    private String fileName;
    private File fileData;

    private String action;

    public long getRouteId() {
        return routeId;
    }

    public void setRouteId(long routeId) {
        this.routeId = routeId;
    }

    enum Action {LIST, SAVE, EDIT, DELETE, UPLOAD, XLSEXPORT, UPDATE, CHANGE_CLIENT, XLSSTAN}

    @Autowired
   	private KontGruzHistoryDAO kontGruzHistoryDAO;
    @Autowired
    private Mapper kyyardMapper;
    @Autowired
    private KontDAO kontDAO;
    @Autowired
    private NsiClientDAO clientDAO;
    @Autowired
    private YardDAO yardDAO;
    @Autowired
    private YardSectorDAO yardSectorDAO;
    private Yard yard;
    private String jsonRequest;
    private List<Filter> filters;
    private String filter;
    private List<String> nkons;
    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.Mapper mapper;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.CopyKontMapper copyKontMapper;
    private long routeId;

    public void setUpload(File file) {
        this.fileData = file;
    }

    public File getUpload() {
        return this.fileData;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }

    public void setYard(Yard yard) {
        this.yard = yard;
    }

    public Yard getYard() {
        return yard;
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
}
