package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.NsiKontDAO;
import com.bivc.cimsmgs.db.ky.NsiKont;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.NsiKontDTO;
import com.bivc.cimsmgs.dto.ky.kont.IKontBaseDTO;
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
public class NsiKont_A extends CimSmgsSupport_A {
    final static private Logger log = LoggerFactory.getLogger(NsiKont_A.class);

    @Autowired
    private Serializer defaultSerializer;

    @Autowired
    private Deserializer defaultDeserializer;

    @Autowired
    private Mapper defaultMapper;

    @Autowired
    private Mapper kyNsiKontMapper;

    @Autowired
    private NsiKontDAO nsiKontDAO;

    private String jsonRequest;
    private String action;
    private String filter;
    private String nkon;

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
        log.debug("Rendering NsiKont list.");

        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>(){}.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;

        List<NsiKont> list = nsiKontDAO.findAll(getLimit(), getStart(), filters/*, getQuery()*/);
        Long total = nsiKontDAO.countAll(filters/*getQuery()*/);

        log.debug("Found {} NsiKont entries.", total);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        defaultMapper.copyList(list, NsiKontDTO.class),
                                        total
                                )
                        )
        );

        return SUCCESS;
    }

    public String edit() throws Exception {
        log.debug("Rendering edit NsiKontDTO entry with hid: {}", getHid());

        NsiKont nsiKont = nsiKontDAO.findById(getHid(), false);

        log.debug("Rendering edit NsiKontDTO entry form with information: {}", nsiKont);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        defaultMapper.copy(nsiKont, NsiKontDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    public String save() throws Exception {
        NsiKontDTO dto = defaultDeserializer.setLocale(getLocale()).read(NsiKontDTO.class, jsonRequest);
        log.debug("Saving a  NsiKont entry with information: {}", dto);

        checkKontUniqueness(dto.getNkont(), dto.getHid());
        NsiKont saved;
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
                                        kyNsiKontMapper.copy(saved, NsiKontDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    private void checkKontUniqueness(String nkon, Long hid) {
        if(nsiKontDAO.findBy(nkon, hid) != null){
            throw new RuntimeException("Номер контейнера должен быть уникальным");
        }
    }

    private NsiKont update(NsiKontDTO dto) {
        NsiKont updated = nsiKontDAO.getById(dto.getHid(), false);
        kyNsiKontMapper.copy(dto, updated);
        log.debug("Updated the information of a NsiKont entry to: {}", updated);

        return updated;
    }

    private NsiKont add(NsiKontDTO dto) {
        NsiKont added = kyNsiKontMapper.copy(dto, NsiKont.class);
        nsiKontDAO.makePersistent(added);
        log.debug("Added a NsiKont entry with information: {}", added);
        return added;
    }

    public String delete() throws Exception {

        NsiKontDTO dto = defaultDeserializer.setLocale(getLocale()).read(NsiKontDTO.class, jsonRequest);
        log.debug("Deleting a NsiKont entry with id: {}", dto.getHid());

        NsiKont deleted = nsiKontDAO.getById(dto.getHid(), false);
        nsiKontDAO.makeTransient(deleted);
        log.info("Deleted NsiKont entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    public String get() throws Exception {
        log.debug("Get NsiKont entity with nkon: {}", nkon);

        NsiKont kont = nsiKontDAO.findBy(nkon);

        if(kont != null){
            log.debug("Found NsiKont entity with information: {}", kont);
            setJSONData(
                    defaultSerializer
                            .setLocale(getLocale())
                            .write(
                                    new Response<>(
                                            kyNsiKontMapper.copy(kont, NsiKontDTO.class)
                                    )
                            )
            );
        }
        else {
            log.debug("Nothing Found for NsiKont with nkon: {}", nkon);
            setJSONData(defaultSerializer.write(new Response<>()));
        }

        return SUCCESS;
    }

    public String autoSave(IKontBaseDTO dto) throws Exception {

        NsiKont kont = nsiKontDAO.findBy(dto.getNkon());

        log.debug("AutoSaving a NsiKont entry with information: {}", dto);

        if(kont == null){
            kont = kyNsiKontMapper.copy(dto, NsiKont.class);
        } else {
            kyNsiKontMapper.copy(dto, kont);
        }

//        checkKontUniqueness(kont.getNkont(), kont.getHid());
        nsiKontDAO.makePersistent(kont);

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

    public void setNkon(String nkon) {
        this.nkon = nkon;
    }


    enum Action {LIST, EDIT, SAVE, GET, DELETE}
}

