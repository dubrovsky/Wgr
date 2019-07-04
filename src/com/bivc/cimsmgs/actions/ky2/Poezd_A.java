package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.doc2doc.Mapper;
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
        List<Poezd> list = poezdDAO.findAll(getLimit(), getStart(), getRouteId(), getDirection(), filters, getUser().getUsr(), getLocale());
        Long total = poezdDAO.countAll(getRouteId(), getDirection(), filters, getUser().getUsr(), getLocale());

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

    private String action;
    private Byte direction;
    private long routeId;

    enum Action {LIST, EDIT, SAVE, DELETE, POEZDS_DIR_FOR_POEZD_BIND}

    private List<Filter> filters;
    private String filter;
    private String jsonRequest;

    @Autowired
    private PoezdDAO poezdDAO;
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
