package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.PoezdZayavDAO;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.ky.Zayav;
import com.bivc.cimsmgs.dto.ky.PoezdZayavBaseDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author p.dzeviarylin
 */
public class PoezdZayav_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(PoezdZayav_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (PoezdZayav_A.Action.valueOf(action.toUpperCase())) {
                case EDIT:
                    return edit();
                case SAVE:
                    return save();
                case DELETE:
                    return delete();
                case LIST:
                    return list();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

    }

    private String list() throws Exception {
        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>() {
                }.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;
        List<Zayav> list = poezdZayavDAO.findAll(getLimit(), getStart(), routeId, direction, filters, getUser().getUsr(), getLocale());
        Long total = poezdZayavDAO.countAll(routeId, direction, filters, getUser().getUsr(), getLocale());

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        mapper.mapAsList(list, PoezdZayavBaseDTO.class),
                                        total
                                )
                        )
        );

        return SUCCESS;
    }

    private String delete() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }
        PoezdZayavBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(PoezdZayavBaseDTO.class, jsonRequest);
        log.debug("Deleting a Zayav entry with id: {}", dto.getHid());

        Zayav deleted = poezdZayavDAO.getById(dto.getHid(), false);
        poezdZayavDAO.makeTransient(deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    private String save() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }

        PoezdZayavBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(PoezdZayavBaseDTO.class, jsonRequest);

        Zayav saved;

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
                                        mapper.map(saved, PoezdZayavBaseDTO.class)
                                )
                        )
        );

        return SUCCESS;
    }

    private Zayav update(PoezdZayavBaseDTO dto) {
        Zayav updated = poezdZayavDAO.getById(dto.getHid(), false);
        mapper.map(dto, updated);
        return updated;
    }

    private Zayav add(PoezdZayavBaseDTO dto) {
        Zayav added = mapper.map(dto, Zayav.class);

        PackDoc pack = new PackDoc(added.getRoute(), getUser().getUsr().getGroup());
        pack.addZayavItem(added);
        getPackDocDAO().makePersistent(pack);
        return added;
    }

    private String edit() throws Exception {
        Zayav poezdZayav = poezdZayavDAO.findById(getHid(), false);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        mapper.map(poezdZayav, PoezdZayavBaseDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    private String action;
    private Byte direction;
    private String filter;
    private long routeId;
    private String jsonRequest;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.Mapper mapper;
    @Autowired
    private PoezdZayavDAO poezdZayavDAO;

    public void setAction(String action) {
        this.action = action;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public void setRouteId(long routeId) {
        this.routeId = routeId;
    }

    public void setJsonRequest(String jsonRequest) {
        this.jsonRequest = jsonRequest;
    }

    enum Action {LIST, EDIT, SAVE, DELETE}
}
