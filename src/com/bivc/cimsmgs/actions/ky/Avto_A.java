package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.AvtoDAO;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import com.bivc.cimsmgs.dto.ky.AvtoDTO;
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
 * Created by peter on 21.02.14.
 */
public class Avto_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(Avto_A.class);

    private String action;
    private Byte direction;
    private long routeId;
    private List<Filter> filters;
    private String filter;
    private String jsonRequest;

    @Autowired
    private Serializer defaultSerializer;

    @Autowired
    private Deserializer defaultDeserializer;

    @Autowired
    private NsiAvto_A nsiAvtoA;

    @Autowired
    private Mapper kyavtoMapper;

    @Autowired
    private AvtoDAO avtoDAO;

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        log.info(action);

        try {
            switch (Action.valueOf(action.toUpperCase())) {
                case LIST:
                    return list();
                case EDIT:
                    return edit();
                case SAVE:
                    return save();
                case DELETE:
                    return delete();
                case AVTOOUT_DIR_FOR_KONT_LIST:
                    return avtoOutDirForKontList();
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
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>(){}.getClass().getGenericSuperclass(), filter) :
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

        return SUCCESS;
    }

    private String avtoOutDirForKontList() throws Exception {
        log.debug("Rendering avtoOut to kont list.");

        filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>(){}.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;


        List<Avto> list = avtoDAO.findAvtosOut4Kont(getLimit(), getStart(), getFilters(), getUser().getUsr(), getLocale());
        Long total = avtoDAO.countAvtosOut4Kont(getFilters(), getUser().getUsr(), getLocale());

        log.debug("Found {} avtoOuts.", total);

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

        return SUCCESS;
    }

    public String edit() throws Exception {
        log.debug("Rendering edit Avto entry form for Avto entry with hid: {}", getHid());

        Avto avto = avtoDAO.findById(getHid(), false);

        log.debug("Rendering edit Avto entry form for Avto entry with information: {}", avto);

//        setJSONData(avtoIntoToFormSerializer.setLocale(getLocale()).write(new Response<Avto>(avto)));
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
        if(StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }

        AvtoBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(AvtoBaseDTO.class, jsonRequest);
        log.debug("Saving a Avto entry with information: {}", dto);

        Avto saved;

        if(dto.getHid() == null){
            saved = add(dto);
        } else {
            saved = update(dto);
        }

//        setJSONData(poezdIntoToFormSerializer.setLocale(getLocale()).write(new Response<Avto>(saved)));

        autoSaveToNsi(dto);
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyavtoMapper.copy(saved, AvtoBaseDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    private void autoSaveToNsi(AvtoBaseDTO dto) throws Exception {
        nsiAvtoA.autoSave(dto);
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
        log.debug("Updated the information of a Avto entry to: {}", updated);

        return updated;
    }


    public String delete() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }
        AvtoBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(AvtoBaseDTO.class, jsonRequest);
        log.debug("Deleting a Avto entry with id: {}", dto.getHid());

        Avto deleted = avtoDAO.getById(dto.getHid(), false);
        avtoDAO.makeTransient(deleted);
        log.info("Deleted Avto entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    enum Action {LIST, EDIT_INTO, EDIT_OUT, SAVE_INTO, EDIT, SAVE, DELETE, AVTOOUT_DIR_FOR_KONT_LIST, SAVE_OUT}

    public Avto_A setAvtoMapper(Mapper kyavtoMapper) {
        this.kyavtoMapper = kyavtoMapper;
        return this;
    }

    
    public Avto_A setDefaultSerializer(Serializer defaultSerializer) {
        this.defaultSerializer = defaultSerializer;
        return this;
    }

    public Avto_A setDefaultDeserializer(Deserializer defaultDeserializer) {
        this.defaultDeserializer = defaultDeserializer;
        return this;
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

    public Avto_A setAvtoDAO(AvtoDAO avtoDAO) {
        this.avtoDAO = avtoDAO;
        return this;
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
