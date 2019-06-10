package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.KontDAO;
import com.bivc.cimsmgs.dao.YardDAO;
import com.bivc.cimsmgs.db.ky.Yard;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.YardDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
                /*case KONT_FOR_YARDPLACES_SAVE:
                    return kontToYardPlacesSave();*/
                case YARDPLACES_FOR_KONT_LIST:
                    return yardPlacesForKontList();
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

        List<Yard> list = yardDAO.findAll(getLimit(), getStart(), filters, getLocale());
        Long total = yardDAO.countAll(filters, getLocale());

        log.debug("Found {} Yard entries.", total);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        yardMapper.copyList(list, YardDTO.class),
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
                                        yardMapper.copy(yard, YardDTO.class)
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
                                        yardMapper.copy(yard, YardDTO.class)
                                )
                        )
        );

//        setJSONData(yardToFormSerializer.setLocale(getLocale()).write(new Response<Yard>(yard)));
        return SUCCESS;
    }

    private Yard add(YardDTO dto) {
        Yard added = yardMapper.copy(dto, Yard.class);
        yardDAO.makePersistent(added);
        log.debug("Added a Yard entry with information: {}", added);
        return added;
    }

    private Yard update(YardDTO dto) {
        Yard updated = yardDAO.getById(dto.getHid(), false);
        yardMapper.copy(dto, updated);
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
        if(deleted.getKont() != null) {
            throw new RuntimeException("Нельзя удалять место на контейнерной площадке, т.к. на этом месте находится контейнер - " + deleted.getKont().getNkon());
//            log.debug("Yard with id: {} has Kont entity bound. Unbinding Kont entity with id: {}", deleted.getHid(), deleted.getKont().getHid());

//            deleted.getKont().unbindYard();
        }

        yardDAO.makeTransient(deleted);
        log.info("Deleted Yard entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    /*public String kontToYardPlacesSave() throws Exception {

        log.debug("Binding/unbinding a Kont to Yard entry with id: {}", yard.getHid());

        Long yardId = yard.getHid(),
             kontId = (yard.getKont() != null && yard.getKont().getHid() != null) ? yard.getKont().getHid() : null;

        yard = yardDAO.getById(yardId, false);
        Kont kont;
        if(kontId != null){    // bind kont
            kont = kontDAO.getById(kontId, false);
            log.info("Bind KONT with information - {} to yard with hid - {}", kont, yardId);
            if(yard.getKont() != null){
                log.info("Yard with hid - {} alredy has kont. Unbind this kont with information - {} before bind new kont with hid - {}", yardId, yard.getKont(), kontId);
                yard.getKont().unbindYard();
            }

//            kontStatusService.yard(kont, yard, KontStatus.YARD);
//            kont.bindYard(yard);
        } else {  // unbind kont
           kont = yard.getKont();
           if(kont == null){
               throw new BusinessException("No kont found to unbind");
           }
           log.info("Unbind kont with information - {} from yard with hid - {}", kont, yardId);
           kont.unbindYard();
        }

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<YardDTO>(
                                        yardMapper.copy(yard, YardDTO.class)
                                )
                        )
        );

        return SUCCESS;
    }*/

    public String yardPlacesForKontList() throws Exception {
        log.debug("Rendering YARD PLACES FOR KONT list.");

        filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>(){}.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;

        List<Yard> list = yardDAO.findPlaces4Kont(getLimit(), getStart(), getFilters(), getUser().getUsr(), getLocale());
        Long total = yardDAO.counPlaces4Kont(getFilters(), getUser().getUsr(), getLocale());

        log.debug("Found {} YARD PLACES FOR KONT entries.", total);

        setJSONData(yardPlacesForKontListSerializer.setLocale(getLocale()).write(new Response<Yard>(list, total)));

//        setJSONData(yardToFormSerializer.setLocale(getLocale()).write(new Response<Yard>(list, total)));

        return SUCCESS;
    }

    private String action;

    enum Action { LIST, SAVE, EDIT, DELETE, /*KONT_FOR_YARDPLACES_SAVE,*/ YARDPLACES_FOR_KONT_LIST }
    private Mapper yardMapper;
    private YardDAO yardDAO;
    private KontDAO kontDAO;
    private Yard yard;
    private String jsonRequest;
    private List<Filter> filters;
    private String filter;
    /*private Serializer yardToListSerializer;
    private Serializer yardToFormSerializer;*/
    private Serializer defaultSerializer;
    private Serializer yardPlacesForKontListSerializer;
    private Deserializer defaultDeserializer;

    public Yard_A setYardMapper(Mapper yardMapper) {
        this.yardMapper = yardMapper;
        return this;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }

    public Yard_A setKontDAO(KontDAO kontDAO) {
        this.kontDAO = kontDAO;
        return this;
    }

    public void setYard(Yard yard) {
        this.yard = yard;
    }

    public Yard getYard(){
        return yard;
    }

    public Yard_A setYardPlacesForKontListSerializer(Serializer yardPlacesForKontListSerializer) {
        this.yardPlacesForKontListSerializer = yardPlacesForKontListSerializer;
        return this;
    }

    public Yard_A setDefaultSerializer(Serializer defaultSerializer) {
        this.defaultSerializer = defaultSerializer;
        return this;
    }

    public Yard_A setDefaultDeserializer(Deserializer defaultDeserializer) {
        this.defaultDeserializer = defaultDeserializer;
        return this;
    }

    /*public Yard_A setYardToListSerializer(Serializer yardToListSerializer) {
        this.yardToListSerializer = yardToListSerializer;
        return this;
    }

    public Yard_A setYardToFormSerializer(Serializer yardToFormSerializer) {
        this.yardToFormSerializer = yardToFormSerializer;
        return this;
    }*/

    public Yard_A setYardDAO(YardDAO yardDAO) {
        this.yardDAO = yardDAO;
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

    public String getJsonRequest(){
        return this.jsonRequest;
    }
}
