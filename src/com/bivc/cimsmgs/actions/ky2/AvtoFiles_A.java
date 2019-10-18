package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.doc2doc.orika.CopyGruzMapper;
import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import com.bivc.cimsmgs.dto.ky.AvtoDTO;
import com.bivc.cimsmgs.dto.ky2.AvtoFilesViewDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.bivc.cimsmgs.services.ky2.AvtoWzPzService;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static com.bivc.cimsmgs.services.ky2.AvtoWzPzService.AvtoDocType.PZ;
import static com.bivc.cimsmgs.services.ky2.AvtoWzPzService.AvtoDocType.WZ;

/**
 * Created by peter on 21.02.14.
 */
public class AvtoFiles_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(AvtoFiles_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (Action.valueOf(action.toUpperCase())) {
//                case EDIT:
//                    return edit();
                case SAVE:
                    return save();
//                case DELETE:
//                    return delete();
                case LIST:
                    return list();
                case ZAYAVLIST:
                    return zayavlist();
                case VIEW:
                    return view();
//                case GET_WZ:
//                    return getWzPz(WZ);
//                case GET_PZ:
//                    return getWzPz(PZ);
//                case CREATE_AVTOOUT_FROM_AVTOINTO:
//                    return createAvtoOutFromAvtoInto();
//                case COPY_AVTOINTO_TO_AVTOINTO:
//                    return copyAvtoIntoToAvtoInto();
//                case IMPORT_FROM_ZAYAV:
//                    return importFromZayav();

                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

    }

    public String list() throws Exception {
        log.debug("Rendering AvtoFiles list.");

        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>() {
                }.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;
        List<AvtoFiles> list = avtoFilesDAO.findByAvto(getLimit(), getStart(), getUser().getUsr(), getHid());
        Long total = avtoFilesDAO.countByAvto(getUser().getUsr(), getHid());

        log.debug("Found {} AvtoFiles entries.", total);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyavtoMapper.copyList(list, AvtoFilesViewDTO.class),
                                        total
                                )
                        )
        );

//        setJSONData(poezdIntoToListSerializer.setLocale(getLocale()).write(response));
        return SUCCESS;
    }

    public String zayavlist() throws Exception {
        log.debug("Rendering AvtoFiles list.");

        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>() {
                }.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;
        List<AvtoFiles> list = avtoFilesDAO.findByZayav(getLimit(), getStart(), getUser().getUsr(), getHid());
        Long total = avtoFilesDAO.countByZayav(getUser().getUsr(), getHid());

        log.debug("Found {} AvtoFiles entries.", total);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyavtoMapper.copyList(list, AvtoFilesViewDTO.class),
                                        total
                                )
                        )
        );

//        setJSONData(poezdIntoToListSerializer.setLocale(getLocale()).write(response));
        return SUCCESS;
    }

    public String view() throws SQLException {
        log.info(getTask());
        AvtoFiles avtoFiles = avtoFilesDAO.findById(getHid(), false);
        inputStream = new ByteArrayInputStream(avtoFiles.getFiles().getBytes((long) 1, (int) avtoFiles.getFiles().length()));
        fileName = avtoFiles.getFileName();
        return "excel";
    }

    public String save() throws Exception {
        log.info("saveFile");
        AvtoZayav avtoZayav = avtoZayavDAO.findById(getHid(), false);

        AvtoFiles avtoFiles = new AvtoFiles();
        avtoFiles.setFileName(fileName);
        avtoFiles.setContentType(contentType);
        if(fileData != null){
            avtoFiles.setLength(new BigDecimal(fileData.length()));
        }
        avtoFiles.setDocType("ZF");
        avtoFiles.setAvtoZayav(avtoZayav);

        avtoFilesDAO.save(avtoFiles, fileData);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    private String action;
    private Byte direction;
    private long routeId;
    private long zayavHid;
    private long avtoHid;

    enum Action {LIST, ZAYAVLIST, EDIT, SAVE, DELETE, VIEW}

    private List<Filter> filters;
    private String filter;
    private String jsonRequest;
    private String fileName;
    private File fileData;
    private String contentType;

    @Autowired
    private AvtoFilesDAO avtoFilesDAO;
    @Autowired
    private AvtoDAO avtoDAO;
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
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.CopyAvtoMapper copyAvtoMapper;


    private InputStream inputStream;

    public void setUpload(File file) {
        this.fileData = file;
    }

    public File getUpload() {
        return this.fileData;
    }

    public void setUploadContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getUploadContentType() {
        return this.contentType;
    }

    public void setUploadFileName(String filename) {
        this.fileName = filename;
    }

    public String getUploadFileName() {
        return this.fileName;
    }

    public long getAvtoHid() {
        return avtoHid;
    }

    public void setAvtoHid(long avtoHid) {
        this.avtoHid = avtoHid;
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
