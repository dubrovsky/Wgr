package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.GruzDAO;
import com.bivc.cimsmgs.db.ky.Gruz;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.GruzDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by peter on 26.05.2014.
 */
public class Gruz_A extends CimSmgsSupport_A {
    final static private Logger log = LoggerFactory.getLogger(Gruz_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (Action.valueOf(action.toUpperCase())) {
                case SAVE:
                    return save();
                case DELETE:
                    return delete();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Unknown action param in request - " + ExceptionUtils.getRootCauseMessage(e));
        }

    }

    private String delete() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }

        GruzDTO dto = defaultDeserializer.setLocale(getLocale()).read(GruzDTO.class, jsonRequest);
        log.debug("Deleting Gruz entry with id: {}", dto.getHid());

        Gruz deleted = gruzDAO.getById(dto.getHid(), false);
        gruzDAO.makeTransient(deleted);
        log.info("Deleted Gruz entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    public String save() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }

        GruzDTO dto = defaultDeserializer.setLocale(getLocale()).read(GruzDTO.class, jsonRequest);
        log.debug("Saving a Gruz entry with information: {}", dto);

        Gruz saved;
        if(dto.getHid() == null){
            saved = add(dto);
        } else {
            saved = update(dto);
        }

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        gruzMapper.copy(saved, GruzDTO.class)
                                )
                        )
        );

//        setJSONData(gruzToFormSerializer.setLocale(getLocale()).write(new Response<Gruz>(saved)));
        return SUCCESS;
    }

    private Gruz update(GruzDTO dto) {
        Gruz updated = gruzDAO.getById(dto.getHid(), false);
        gruzMapper.copy(dto, updated);
        log.debug("Updated the information of a Gruz entry to: {}", updated);

        return updated;
    }

    private Gruz add(GruzDTO dto) {
        Gruz added = gruzMapper.copy(dto, Gruz.class);
        gruzDAO.makePersistent(added);
        log.debug("Added a Gruz entry with information: {}", added);
        return added;
    }

    enum Action {SAVE, DELETE}

    private String action;
    private String jsonRequest;
    private Serializer defaultSerializer;
    private Deserializer defaultDeserializer;
//    private Serializer gruzToFormSerializer;
    private GruzDAO gruzDAO;
    private Mapper gruzMapper;

    public void setAction(String action) {
        this.action = action;
    }

    public void setJsonRequest(String jsonRequest) {
        this.jsonRequest = jsonRequest;
    }

    public Gruz_A setGruzMapper(Mapper gruzMapper) {
        this.gruzMapper = gruzMapper;
        return this;
    }

    public Gruz_A setDefaultSerializer(Serializer defaultSerializer) {
        this.defaultSerializer = defaultSerializer;
        return this;
    }

    public Gruz_A setDefaultDeserializer(Deserializer defaultDeserializer) {
        this.defaultDeserializer = defaultDeserializer;
        return this;
    }

    /*public Gruz_A setGruzToFormSerializer(Serializer kontToFormSerializer) {
        this.gruzToFormSerializer = kontToFormSerializer;
        return this;
    }*/

    public Gruz_A setGruzDAO(GruzDAO gruzDAO) {
        this.gruzDAO = gruzDAO;
        return this;
    }
}
