package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.NsiVagUzkyDAO;
import com.bivc.cimsmgs.db.ky.NsiVagUzky;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.NsiVagUzkyDTO;
import com.bivc.cimsmgs.dto.ky.VagonBaseDTO;
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
public class NsiVagUzky_A extends CimSmgsSupport_A {
    final static private Logger log = LoggerFactory.getLogger(NsiVagUzky_A.class);

    @Autowired
    private Serializer defaultSerializer;

    @Autowired
    private Deserializer defaultDeserializer;

    @Autowired
    private Mapper defaultMapper;

    @Autowired
    private Mapper kyNsiVagonMapper;

    @Autowired
    private NsiVagUzkyDAO nsiVagUzkyDAO;

    private String jsonRequest;
    private String action;
    private String filter;
    private String nvag;

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
        log.debug("Rendering NsiVagUzky list.");

        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>(){}.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;

        List<NsiVagUzky> list = nsiVagUzkyDAO.findAll(getLimit(), getStart(), filters/*, getQuery()*/);
        Long total = nsiVagUzkyDAO.countAll(filters/*getQuery()*/);

        log.debug("Found {} NsiVagUzky entries.", total);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        defaultMapper.copyList(list, NsiVagUzkyDTO.class),
                                        total
                                )
                        )
        );

        return SUCCESS;
    }

    public String edit() throws Exception {
        log.debug("Rendering edit NsiVagUzkyDTO entry with hid: {}", getHid());

        NsiVagUzky vagUzky = nsiVagUzkyDAO.findById(getHid(), false);

        log.debug("Rendering edit NsiVagUzkyDTO entry form with information: {}", vagUzky);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        defaultMapper.copy(vagUzky, NsiVagUzkyDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    public String save() throws Exception {
        NsiVagUzkyDTO dto = defaultDeserializer.setLocale(getLocale()).read(NsiVagUzkyDTO.class, jsonRequest);
        log.debug("Saving a  NsiVagUzky entry with information: {}", dto);

        checkVagonUniqueness(dto.getNvaguf(), dto.getHid());
        
        NsiVagUzky saved;
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
                                        defaultMapper.copy(saved, NsiVagUzkyDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    private void checkVagonUniqueness(String nvag, Long hid) {
        if(nsiVagUzkyDAO.findBy(nvag, hid) != null){
            throw new RuntimeException("Номер вагона должен быть уникальным");
        }
    }

    private NsiVagUzky update(NsiVagUzkyDTO dto) {
        NsiVagUzky updated = nsiVagUzkyDAO.getById(dto.getHid(), false);
        kyNsiVagonMapper.copy(dto, updated);
        log.debug("Updated the information of a NsiVagUzky entry to: {}", updated);

        return updated;
    }

    private NsiVagUzky add(NsiVagUzkyDTO dto) {
        NsiVagUzky added = kyNsiVagonMapper.copy(dto, NsiVagUzky.class);
        nsiVagUzkyDAO.makePersistent(added);
        log.debug("Added a NsiVagUzky entry with information: {}", added);
        return added;
    }

    public String delete() throws Exception {

        NsiVagUzkyDTO dto = defaultDeserializer.setLocale(getLocale()).read(NsiVagUzkyDTO.class, jsonRequest);
        log.debug("Deleting a NsiVagUzky entry with id: {}", dto.getHid());

        NsiVagUzky deleted = nsiVagUzkyDAO.getById(dto.getHid(), false);
        nsiVagUzkyDAO.makeTransient(deleted);
        log.info("Deleted NsiVagUzky entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    public String get() throws Exception {
        log.debug("Get NsiVag entity with nvag: {}", nvag);

        NsiVagUzky vagUzky = nsiVagUzkyDAO.findBy(nvag);

        if(vagUzky != null){
            log.debug("Found NsiVag entity with information: {}", vagUzky);
            setJSONData(
                    defaultSerializer
                            .setLocale(getLocale())
                            .write(
                                    new Response<>(
//                                            kyNsiVagonMapper.copy(vagUzky, VagonBaseDTO.class)
                                            kyNsiVagonMapper.copy(vagUzky, NsiVagUzkyDTO.class)
                                    )
                            )
            );
        }
        else {
            log.debug("Nothing Found for NsiVag with nvag: {}", nvag);
            setJSONData(defaultSerializer.write(new Response<>()));
        }

        return SUCCESS;
    }

    public String autoSave(VagonBaseDTO vagonBaseDTO) throws Exception {
        NsiVagUzky vagUzky = nsiVagUzkyDAO.findBy(vagonBaseDTO.getNvag());

        log.debug("AutoSaving a NsiVagUzky entry with information: {}", vagonBaseDTO);

        if(vagUzky == null){
            vagUzky = kyNsiVagonMapper.copy(vagonBaseDTO, NsiVagUzky.class);
        } else {
            kyNsiVagonMapper.copy(vagonBaseDTO, vagUzky);
        }

//        checkVagonUniqueness(vagUzky.getNvaguf(), vagUzky.getHid());
        nsiVagUzkyDAO.makePersistent(vagUzky);

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

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    enum Action {LIST, EDIT, SAVE, GET, DELETE}
}

