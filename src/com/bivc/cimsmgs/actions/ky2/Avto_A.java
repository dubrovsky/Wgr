package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.*;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.db.nsi.Client;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import com.bivc.cimsmgs.dto.ky.AvtoDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.bivc.cimsmgs.services.ky2.AvtoWzPzService;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.AVTO;
import static com.bivc.cimsmgs.commons.Utils.setNewMessCount;
import static com.bivc.cimsmgs.services.ky2.AvtoWzPzService.AvtoDocType.PZ;
import static com.bivc.cimsmgs.services.ky2.AvtoWzPzService.AvtoDocType.WZ;

/**
 * Created by peter on 21.02.14.
 */
public class Avto_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(Avto_A.class);
    private DateFormat dateyearFormat = new SimpleDateFormat("yyyy");

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
                case AVTOS_DIR_FOR_AVTO_BIND:
                    return avtosDir4AvtoBind();
                case GET_WZ:
                    return getWzPz(WZ);
                case GET_PZ:
                    return getWzPz(PZ);
                case CREATE_AVTOOUT_FROM_AVTOINTO:
                    return createAvtoOutFromAvtoInto();
                case COPY_AVTOINTO_TO_AVTOINTO:
                    return copyAvtoIntoToAvtoInto();
                case IMPORT_FROM_ZAYAV:
                    return importFromZayav();

                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

    }

    public String list() throws Exception {
        log.debug("Rendering Avto list.");

        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>() {
                }.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;
        List<Avto> list = avtoDAO.findAll(getLimit(), getStart(), getRouteId(), getDirection(), filters, getUser().getUsr(), getLocale());
        setNewMessCount(list, getUser().getUsr().getUn());
        Long total = avtoDAO.countAll(getRouteId(), getDirection(), filters, getUser().getUsr(), getLocale());

        log.debug("Found {} Avto entries.", total);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyavtoMapper.copyList(list, AvtoBaseDTO.class),
                                        total
                                )
                        )
        );

//        setJSONData(poezdIntoToListSerializer.setLocale(getLocale()).write(response));
        return SUCCESS;
    }

    public String edit() throws Exception {
        log.debug("Rendering edit Poezd entry with hid: {}", getHid());

        Avto avto = avtoDAO.findById(getHid(), false);

        log.debug("Rendering edit avto entry form with information: {}", avto);

//        setJSONData(poezdIntoToFormSerializer.setLocale(getLocale()).write(new Response<Poezd>(poezd)));
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyavtoMapper.copy(avto, AvtoDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    public String save() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }

        AvtoBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(AvtoBaseDTO.class, jsonRequest);
        log.debug("Saving a Poezd entry with information: {}", dto);

        Avto saved;
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

        for (Kont kont : saved.getKonts()) {
            if(saved.getDprb() != null) {
                kont.setDprb(saved.getDprb());
            }
            if(saved.getDotp() != null) {
                kont.setDotp(saved.getDotp());
            }
        }

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyavtoMapper.copy(saved, AvtoBaseDTO.class)
                                )
                        )
        );

//        setJSONData(poezdIntoToFormSerializer.setLocale(getLocale()).write(new Response<Poezd>(saved)));
        return SUCCESS;
    }

    private Avto add(AvtoBaseDTO dto) {

        Avto added = kyavtoMapper.copy(dto, Avto.class);

        PackDoc pack = new PackDoc(added.getRoute(), getUser().getUsr().getGroup());
        pack.addAvtoItem(added);

        getPackDocDAO().makePersistent(pack);
        log.debug("Added a PackDoc entry with information: {}", pack);
        log.debug("Added a Avto entry with information: {}", added);

        return added;
    }

    private Avto update(AvtoBaseDTO dto) {
        Avto updated = avtoDAO.getById(dto.getHid(), false);
        kyavtoMapper.copy(dto, updated);
        log.debug("Updated the information of a Poezd entry to: {}", updated);

        return updated;
    }

    public String delete() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }
        AvtoBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(AvtoBaseDTO.class, jsonRequest);
        log.debug("Deleting a Poezd entry with id: {}", dto.getHid());

        Avto deleted = avtoDAO.getById(dto.getHid(), false);
        avtoDAO.makeTransient(deleted);
        log.info("Deleted Poezd entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }


    public String importFromZayav() throws Exception {
        AvtoZayav avtoZayav = avtoZayavDAO.findById(getZayavHid(), false);
        Avto avto;
        if (getHid() != 0L) {
            avto = avtoDAO.findById(getHid(), false);
            copyZajavDataToAvto(avto, avtoZayav);
        }
        else {
            avto = copyAvtoMapper.map(avtoZayav, Avto.class);
            avto.setDprb(new Date());
            PackDoc pack = new PackDoc(avtoZayav.getRoute(), getUser().getUsr().getGroup());
            pack.addAvtoItem(avto);
            getPackDocDAO().makePersistent(pack);
        }
        avto.setClient(avtoZayav.getClient());

        Map<String, List<?>> contGruz4History = new HashMap<>(2);
        contGruz4History.put("konts", new ArrayList<Kont>());
        contGruz4History.put("gruzs", new ArrayList<>());

        for (Kont kont : avtoZayav.getKonts()) {
            Kont kontCopy = copyKontMapper.map(kont, Kont.class);
            kontCopy.setAvto(avto);
            kontCopy.setClient(kont.getClient());
            avto.getKonts().add(kontCopy);
//            kontDAO.makePersistent(kontCopy);
            ((List<Kont>) contGruz4History.get("konts")).add(kontCopy);

            for (Gruz gruz : kont.getGruzs()) {
                Gruz gruzCopy = copyKontMapper.map(gruz, Gruz.class);
                gruzCopy.setKont(kontCopy);
                kontCopy.getGruzs().add(gruzCopy);
//                gruzDAO.makePersistent(gruzCopy);
            }
            for (Plomb plomb : kont.getPlombs()) {
                Plomb plombCopy = copyKontMapper.map(plomb, Plomb.class);
                plombCopy.setKont(kontCopy);
                kontCopy.getPlombs().add(plombCopy);
//                plombDAO.makePersistent(plombCopy);
            }
        }
        for (Gruz gruz : avtoZayav.getGruzs()) {
            Gruz gruzCopy = copyGruzMapper.map(gruz, Gruz.class);
            gruzCopy.setAvto(avto);
            avto.getGruzs().add(gruzCopy);
//            gruzDAO.makePersistent(gruzCopy);
            ((List<Gruz>) contGruz4History.get("gruzs")).add(gruzCopy);

        }
        avtoDAO.makePersistent(avto);

        saveVagContGruzHistory(contGruz4History, kontGruzHistoryDAO, AVTO, vagonHistoryDAO, getUser().getUsr().getUn(), null);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyavtoMapper.copy(avto, AvtoDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    public String copyAvtoIntoToAvtoInto() {
        Avto avtoInto = avtoDAO.getById(getHid(), false);
        log.debug("Found avto to copy to avtoOut: {}", avtoInto);

        // copy
        Avto avtoCopy = copyAvtoMapper.map(avtoInto, Avto.class);
        // set props
        avtoCopy.setDirection((byte) 1);
        avtoCopy.setRet_nkon(null);
        avtoCopy.setDprb(new Date());
        avtoCopy.setClient(avtoInto.getClient());

        // save new pack and poezd
        PackDoc pack = new PackDoc(avtoCopy.getRoute(), getUser().getUsr().getGroup());
        pack.addAvtoItem(avtoCopy);
        getPackDocDAO().makePersistent(pack);

        return SUCCESS;
    }

    public String createAvtoOutFromAvtoInto() {
        Avto avtoInto = avtoDAO.getById(getHid(), false);
        log.debug("Found avto to copy to avtoOut: {}", avtoInto);

        // copy
        Avto avtoCopy = copyAvtoMapper.map(avtoInto, Avto.class);
        // set props
        avtoCopy.setDirection((byte) 2);
        avtoCopy.setClient(avtoInto.getClient());
        if (dotp != null) {
            avtoCopy.setDotp(dotp);
            if (dotpTime != null)
                avtoCopy.setDotp(DateTimeUtils.addTimeToDate(this.dotp, this.dotpTime));

        }

        // save new pack and poezd
        PackDoc pack = new PackDoc(avtoCopy.getRoute(), getUser().getUsr().getGroup());
        pack.addAvtoItem(avtoCopy);
        getPackDocDAO().makePersistent(pack);

        return SUCCESS;
    }

    public String avtosDir4AvtoBind() throws Exception {
        final List<Avto> avtos = avtoDAO.findAvtosDir(getLimit(), getStart(), getFilters(), getUser().getUsr(), getRouteId(), getDirection());
        final Long total = avtoDAO.countAvtosDir(getFilters(), getUser().getUsr(), getRouteId(), getDirection());

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        mapper.mapAsList(avtos, AvtoBaseDTO.class),
                                        total
                                )
                        )
        );

        return SUCCESS;
    }

    private String getWzPz(AvtoWzPzService.AvtoDocType avtoDocType) throws Exception {
        byte[] xls = getWzPz(avtoDocType, getHid(), avtoDAO, getUser(), avtoWzPzService, avtoFilesDAO);
        inputStream = new ByteArrayInputStream(xls);
        return "excel";
    }

    public synchronized byte[] getWzPz(AvtoWzPzService.AvtoDocType avtoDocType, Long hid, AvtoDAO avtoDAO, myUser user, AvtoWzPzService avtoWzPzService, AvtoFilesDAO avtoFilesDAO) throws Exception {
        byte[] xls;
        String num = "";
        Avto avto = avtoDAO.findById(hid, false);
        for (AvtoFiles af : avto.getAvtoFiles()) {
            if (avtoDocType.toString().equals(af.getDocType()) && af.getNum() != null) {
                num = af.getNum();
                fileName = af.getFileName();
                break;
            }
        }
        if (num.isEmpty()) {
            Set<Kont> konts = avto.getKonts();
            if (!konts.isEmpty()) {
                Kont kont = (Kont) konts.toArray()[0];
                Client client = kont.getClient();
                if (client != null) {
                    int npp = 1;
                    if (PZ.equals(avtoDocType)) {
                        if (client.getCntPZ() != null)
                            npp = client.getCntPZ() + 1;
                        client.setCntPZ(npp);
                    } else {
                        if (client.getCntWZ() != null)
                            npp = client.getCntWZ() + 1;
                        client.setCntWZ(npp);
                    }
                    num = npp + "/" + dateyearFormat.format(new Date());
                    fileName = avtoDocType.toString() + "_" + num + "_" + StringUtils.defaultString(avto.getNo_zayav()) + "_" + client.getSname() + ".xlsx";
                }
            }
            else {
                fileName = avtoDocType.toString() + "_" + 0 + "_" + StringUtils.defaultString(avto.getNo_zayav()) + ".xlsx";
            }
        }

        XSSFWorkbook excel = avtoWzPzService.avtoDocsToExcel(avto, avtoDocType, user.getUsr(), num);
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            excel.write(baos);
//            baos.flush();
//            baos.close();
            xls = baos.toByteArray();
        }


        saveFile(avto, xls, avtoDocType.toString(), avtoFilesDAO, num, fileName);
        return xls;
    }

    private void saveFile(Avto avto, byte[] file, String docType, AvtoFilesDAO avtoFilesDAO, String num, String fileName ) throws Exception {
        log.info("saveFile");
        AvtoFiles avtoFiles = new AvtoFiles();
        avtoFiles.setFileName(fileName);
        avtoFiles.setContentType("application/vnd.ms-excel");
        avtoFiles.setLength(new BigDecimal(file.length));
        avtoFiles.setDocType(docType);
        avtoFiles.setNum(num.isEmpty() ? null : num);
        avtoFiles.setAvto(avto);
        avtoFilesDAO.save(avtoFiles, file);
    }


    private void copyZajavDataToAvto(Avto avto, AvtoZayav zayav) {
        avto.setDriver_fio(zayav.getDriver_fio());
        avto.setNo_avto(zayav.getNo_avto());
        avto.setNo_trail(zayav.getNo_trail());
        avto.setNo_zayav(zayav.getNo_zayav());
    }


    private Date dotp;
    private Date dotpTime;
    private String action;
    private Byte direction;
    private long routeId;
    private long zayavHid;

    enum Action {LIST, EDIT, SAVE, DELETE, AVTOS_DIR_FOR_AVTO_BIND, GET_WZ, GET_PZ, CREATE_AVTOOUT_FROM_AVTOINTO, COPY_AVTOINTO_TO_AVTOINTO, IMPORT_FROM_ZAYAV}

    private List<Filter> filters;
    private String filter;
    private String jsonRequest;
    private String fileName;


    @Autowired
    private KontGruzHistoryDAO kontGruzHistoryDAO;
    @Autowired
    private AvtoFilesDAO avtoFilesDAO;
    @Autowired
    private AvtoDAO avtoDAO;
    @Autowired
    private KontDAO kontDAO;
    @Autowired
    private GruzDAO gruzDAO;
    @Autowired
    private PlombDAO plombDAO;
    @Autowired
    private AvtoZayavDAO avtoZayavDAO;
    @Autowired
    private NsiClientDAO clientDAO;
    @Autowired
    private Mapper kyavtoMapper;
    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.Mapper mapper;
    @Autowired
    private AvtoWzPzService avtoWzPzService;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.CopyAvtoMapper copyAvtoMapper;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.CopyKontMapper copyKontMapper;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.CopyGruzMapper copyGruzMapper;
    @Autowired
    private VagonHistoryDAO vagonHistoryDAO;

    private InputStream inputStream;

    public Date getDotpTime() {
        return dotpTime;
    }

    public void setDotpTime(Date dotpTime) {
        this.dotpTime = dotpTime;
    }

    public Date getDotp() {
        return dotp;
    }

    public void setDotp(Date dotp) {
        this.dotp = dotp;
    }

    public long getZayavHid() {
        return zayavHid;
    }

    public void setZayavHid(long zayavHid) {
        this.zayavHid = zayavHid;
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
