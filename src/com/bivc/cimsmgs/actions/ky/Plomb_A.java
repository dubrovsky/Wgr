package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.PlombDAO;
import com.bivc.cimsmgs.db.ky.Plomb;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.PlombDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by peter on 29.05.2014.
 */
public class Plomb_A  extends CimSmgsSupport_A {
    final static private Logger log = LoggerFactory.getLogger(Plomb_A.class);

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

        PlombDTO dto = defaultDeserializer.setLocale(getLocale()).read(PlombDTO.class, jsonRequest);
        log.debug("Deleting Plomb entry with id: {}", dto.getHid());

        Plomb deleted = plombDAO.getById(dto.getHid(), false);
        plombDAO.makeTransient(deleted);
        log.info("Deleted Plomb entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    public String save() throws Exception {
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }

        PlombDTO dto = defaultDeserializer.setLocale(getLocale()).read(PlombDTO.class, jsonRequest);
        log.debug("Saving a Plomb entry with information: {}", dto);

        Plomb saved;
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
                                        plombMapper.copy(saved, PlombDTO.class)
                                )
                        )
        );

//        setJSONData(plombToFormSerializer.setLocale(getLocale()).write(new Response<Plomb>(saved)));
        return SUCCESS;
    }

    private Plomb update(PlombDTO dto) {
        Plomb updated = plombDAO.getById(dto.getHid(), false);
        plombMapper.copy(dto, updated);
        log.debug("Updated the information of a Plomb entry to: {}", updated);

        return updated;
    }

    private Plomb add(PlombDTO dto) {
        Plomb added = plombMapper.copy(dto, Plomb.class);
        plombDAO.makePersistent(added);
        log.debug("Added a Plomb entry with information: {}", added);
        return added;
    }

    enum Action {SAVE, DELETE}

    private String action;
    private String jsonRequest;
    private Serializer defaultSerializer;
    private Deserializer defaultDeserializer;
//    private Serializer plombToFormSerializer;
    private PlombDAO plombDAO;
    private Mapper plombMapper;

    public void setAction(String action) {
        this.action = action;
    }

    public void setJsonRequest(String jsonRequest) {
        this.jsonRequest = jsonRequest;
    }

    public Plomb_A setPlombMapper(Mapper plombMapper) {
        this.plombMapper = plombMapper;
        return this;
    }

    public Plomb_A setDefaultSerializer(Serializer defaultSerializer) {
        this.defaultSerializer = defaultSerializer;
        return this;
    }

    public Plomb_A setDefaultDeserializer(Deserializer defaultDeserializer) {
        this.defaultDeserializer = defaultDeserializer;
        return this;
    }

    /*public Plomb_A setPlombToFormSerializer(Serializer plombToFormSerializer) {
        this.plombToFormSerializer = plombToFormSerializer;
        return this;
    }*/

    public Plomb_A setPlombDAO(PlombDAO plombDAO) {
        this.plombDAO = plombDAO;
        return this;
    }
}
