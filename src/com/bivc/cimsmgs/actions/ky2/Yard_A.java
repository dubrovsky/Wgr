package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.YardDAO;
import com.bivc.cimsmgs.dao.YardSectorDAO;
import com.bivc.cimsmgs.db.ky.Yard;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky2.YardDTO;
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
 * Created by peter on 21.01.14.
 */
public class Yard_A extends CimSmgsSupport_A {
    final static private Logger log = LoggerFactory.getLogger(Yard_A.class);

    public String execute() throws Exception {
        if(StringUtils.isEmpty(action)){
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (Action.valueOf(action.toUpperCase())){
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

    public String list() throws Exception {
        log.debug("Rendering Yard list.");

        filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>(){}.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;

        List<Yard> list = yardDAO.findAll(getLimit(), getStart(), filters, getLocale(), getUser().getUsr());
        Long total = yardDAO.countAll(filters, getLocale(), getUser().getUsr());

        log.debug("Found {} Yard entries.", total);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyyardMapper.copyList(list, YardDTO.class),
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
        if(dto.getHid() == null){
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
        if(!deleted.getKonts().isEmpty()) {
            throw new RuntimeException("Нельзя удалять место на контейнерной площадке, т.к. на этом месте находится контейнер");
//            log.debug("Yard with id: {} has Kont entity bound. Unbinding Kont entity with id: {}", deleted.getHid(), deleted.getKont().getHid());

//            deleted.getKont().unbindYard();
        }

        yardDAO.makeTransient(deleted);
        log.info("Deleted Yard entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    private String action;

    enum Action { LIST, SAVE, EDIT, DELETE}
    @Autowired
    private Mapper kyyardMapper;
    @Autowired
    private YardDAO yardDAO;
    @Autowired
    private YardSectorDAO yardSectorDAO;
    private Yard yard;
    private String jsonRequest;
    private List<Filter> filters;
    private String filter;
    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.Mapper mapper;

    public List<Filter> getFilters() {
        return filters;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }

    public void setYard(Yard yard) {
        this.yard = yard;
    }

    public Yard getYard(){
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

    public String getJsonRequest(){
        return this.jsonRequest;
    }
}
