package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.NsiAvtoDAO;
import com.bivc.cimsmgs.db.ky.NsiAvto;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import com.bivc.cimsmgs.dto.ky.NsiAvtoDTO;
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
public class NsiAvto_A extends CimSmgsSupport_A {
    final static private Logger log = LoggerFactory.getLogger(NsiAvto_A.class);

    @Autowired
    private Serializer defaultSerializer;

    @Autowired
    private Deserializer defaultDeserializer;

    @Autowired
    private Mapper defaultMapper;

    @Autowired
    private Mapper kyNsiAvtoMapper;

    @Autowired
    private NsiAvtoDAO nsiAvtoDAO;

    private String jsonRequest;
    private String action;
    private String filter;
    private String noAvto;

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
                case GET:
                    return get();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

    }

    public String list() throws Exception {
        log.debug("Rendering NsiAvto list.");

        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>(){}.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;

        List<NsiAvto> list = nsiAvtoDAO.findAll(getLimit(), getStart(), filters/*, getQuery()*/);
        Long total = nsiAvtoDAO.countAll(filters/*getQuery()*/);

        log.debug("Found {} NsiAvto entries.", total);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        defaultMapper.copyList(list, NsiAvtoDTO.class),
                                        total
                                )
                        )
        );

        return SUCCESS;
    }

    public String edit() throws Exception {
        log.debug("Rendering edit NsiAvtoDTO entry with hid: {}", getHid());

        NsiAvto nsiAvto = nsiAvtoDAO.findById(getHid(), false);

        log.debug("Rendering edit NsiAvtoDTO entry form with information: {}", nsiAvto);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        defaultMapper.copy(nsiAvto, NsiAvtoDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    public String save() throws Exception {
        NsiAvtoDTO dto = defaultDeserializer.setLocale(getLocale()).read(NsiAvtoDTO.class, jsonRequest);
        log.debug("Saving a  NsiAvto entry with information: {}", dto);

        NsiAvto saved;
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
                                        kyNsiAvtoMapper.copy(saved, NsiAvtoDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    private NsiAvto update(NsiAvtoDTO dto) {
        NsiAvto updated = nsiAvtoDAO.getById(dto.getHid(), false);
        kyNsiAvtoMapper.copy(dto, updated);
        log.debug("Updated the information of a NsiAvto entry to: {}", updated);

        return updated;
    }

    private NsiAvto add(NsiAvtoDTO dto) {
        NsiAvto added = kyNsiAvtoMapper.copy(dto, NsiAvto.class);
        nsiAvtoDAO.makePersistent(added);
        log.debug("Added a NsiAvto entry with information: {}", added);
        return added;
    }

    public String delete() throws Exception {

        NsiAvtoDTO dto = defaultDeserializer.setLocale(getLocale()).read(NsiAvtoDTO.class, jsonRequest);
        log.debug("Deleting a NsiAvto entry with id: {}", dto.getHid());

        NsiAvto deleted = nsiAvtoDAO.getById(dto.getHid(), false);
        nsiAvtoDAO.makeTransient(deleted);
        log.info("Deleted NsiAvto entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    public String get() throws Exception {
        log.debug("Get NsiAvto entity with nkon: {}", noAvto);

        NsiAvto avto = nsiAvtoDAO.findBy(noAvto);

        if(avto != null){
            log.debug("Found NsiAvto entity with information: {}", avto);
            setJSONData(
                    defaultSerializer
                            .setLocale(getLocale())
                            .write(
                                    new Response<>(
                                            kyNsiAvtoMapper.copy(avto, NsiAvtoDTO.class)
                                    )
                            )
            );
        }
        else {
            log.debug("Nothing Found for NsiAvto with nkon: {}", noAvto);
            setJSONData(defaultSerializer.write(new Response<>()));
        }

        return SUCCESS;
    }

    public String autoSave(AvtoBaseDTO avtoBaseDTO) throws Exception {
        NsiAvto avto = nsiAvtoDAO.findBy(avtoBaseDTO.getNo_avto());

        log.debug("AutoSaving a NsiAvto entry with information: {}", avtoBaseDTO);

        if(avto == null){
            avto = kyNsiAvtoMapper.copy(avtoBaseDTO, NsiAvto.class);
        } else {
            kyNsiAvtoMapper.copy(avtoBaseDTO, avto);
        }
        nsiAvtoDAO.makePersistent(avto);

        return SUCCESS;
    }

    public void setJsonRequest(String jsonRequest) {
        this.jsonRequest = jsonRequest;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public void setNoAvto(String noAvto) {
        this.noAvto = noAvto;
    }


    enum Action {LIST, EDIT, SAVE, GET, DELETE}
}


