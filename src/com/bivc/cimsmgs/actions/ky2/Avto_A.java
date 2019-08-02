package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.AvtoDAO;
import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import com.bivc.cimsmgs.dto.ky.AvtoDTO;
import com.bivc.cimsmgs.dto.ky.PoezdBaseDTO;
import com.bivc.cimsmgs.dto.ky.PoezdDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.bivc.cimsmgs.services.ky.IPoezdService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by peter on 21.02.14.
 */
public class Avto_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(Avto_A.class);

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
        PoezdBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(PoezdBaseDTO.class, jsonRequest);
        log.debug("Deleting a Poezd entry with id: {}", dto.getHid());

        Avto deleted = avtoDAO.getById(dto.getHid(), false);
        avtoDAO.makeTransient(deleted);
        log.info("Deleted Poezd entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
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

    private String action;
    private Byte direction;
    private long routeId;

    enum Action {LIST, EDIT, SAVE, DELETE, AVTOS_DIR_FOR_AVTO_BIND}

    private List<Filter> filters;
    private String filter;
    private String jsonRequest;

    @Autowired
    private AvtoDAO avtoDAO;
    @Autowired
    private Mapper kyavtoMapper;
    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private IPoezdService poezdService;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.Mapper mapper;

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
