package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.AvtoDAO;
import com.bivc.cimsmgs.dao.AvtoZayavDAO;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.AvtoZayav;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import com.bivc.cimsmgs.dto.ky.AvtoDTO;
import com.bivc.cimsmgs.dto.ky2.AvtoZayavBaseDTO;
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
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

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
//                case AVTOS_DIR_FOR_AVTO_BIND:
//                    return avtosDir4AvtoBind();

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
        List<AvtoZayav> list = avtoZayavDAO.findAll(getLimit(), getStart(), getRouteId(), getDirection(), filters, getUser().getUsr(), getLocale());
        Long total = avtoZayavDAO.countAll(getRouteId(), getDirection(), filters, getUser().getUsr(), getLocale());

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


    private String action;
    private Byte direction;
    private long routeId;

    enum Action {LIST, EDIT, SAVE, DELETE, AVTOS_DIR_FOR_AVTO_BIND}

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
