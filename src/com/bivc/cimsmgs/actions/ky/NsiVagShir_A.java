package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.NsiVagShirDAO;
import com.bivc.cimsmgs.db.ky.NsiVagShir;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.NsiVagShirDTO;
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
public class NsiVagShir_A extends CimSmgsSupport_A {
    final static private Logger log = LoggerFactory.getLogger(NsiVagShir_A.class);

    @Autowired
    private Serializer defaultSerializer;

    @Autowired
    private Deserializer defaultDeserializer;

    @Autowired
    private Mapper defaultMapper;

    @Autowired
    private Mapper kyNsiVagonMapper;

    @Autowired
    private NsiVagShirDAO nsiVagShirDAO;

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
        log.debug("Rendering NsiVagShir list.");

        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>(){}.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;

        List<NsiVagShir> list = nsiVagShirDAO.findAll(getLimit(), getStart(), filters/*, getQuery()*/);
        Long total = nsiVagShirDAO.countAll(filters/*getQuery()*/);

        log.debug("Found {} NsiVagShir entries.", total);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        defaultMapper.copyList(list, NsiVagShirDTO.class),
                                        total
                                )
                        )
        );

        return SUCCESS;
    }

    public String edit() throws Exception {
        log.debug("Rendering edit NsiVagShirDTO entry with hid: {}", getHid());

        NsiVagShir vagShir = nsiVagShirDAO.findById(getHid(), false);

        log.debug("Rendering edit NsiVagShirDTO entry form with information: {}", vagShir);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        defaultMapper.copy(vagShir, NsiVagShirDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    public String save() throws Exception {
        NsiVagShirDTO dto = defaultDeserializer.setLocale(getLocale()).read(NsiVagShirDTO.class, jsonRequest);
        log.debug("Saving a  NsiVagShir entry with information: {}", dto);

        checkVagonUniqueness(dto.getNvag(), dto.getHid());
        NsiVagShir saved;
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
                                        defaultMapper.copy(saved, NsiVagShirDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    private void checkVagonUniqueness(String nvag, Long hid) {
        if(nsiVagShirDAO.findBy(nvag, hid) != null){
            throw new RuntimeException("Номер вагона должен быть уникальным");
        }
    }

    private NsiVagShir update(NsiVagShirDTO dto) {
        NsiVagShir updated = nsiVagShirDAO.getById(dto.getHid(), false);
        kyNsiVagonMapper.copy(dto, updated);
        log.debug("Updated the information of a NsiVagShir entry to: {}", updated);

        return updated;
    }

    private NsiVagShir add(NsiVagShirDTO dto) {
        NsiVagShir added = kyNsiVagonMapper.copy(dto, NsiVagShir.class);
        nsiVagShirDAO.makePersistent(added);
        log.debug("Added a NsiVagShir entry with information: {}", added);
        return added;
    }

    public String delete() throws Exception {

        NsiVagShirDTO dto = defaultDeserializer.setLocale(getLocale()).read(NsiVagShirDTO.class, jsonRequest);
        log.debug("Deleting a NsiVagShir entry with id: {}", dto.getHid());

        NsiVagShir deleted = nsiVagShirDAO.getById(dto.getHid(), false);
        nsiVagShirDAO.makeTransient(deleted);
        log.info("Deleted NsiVagShir entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    public String get() throws Exception {
        log.debug("Get NsiVag entity with nvag: {}", nvag);

        NsiVagShir vagShir = nsiVagShirDAO.findBy(nvag);

        if(vagShir != null){
            log.debug("Found NsiVag entity with information: {}", vagShir);
            setJSONData(
                    defaultSerializer
                            .setLocale(getLocale())
                            .write(
                                    new Response<>(
//                                            kyNsiVagonMapper.copy(vagShir, VagonBaseDTO.class)
                                            kyNsiVagonMapper.copy(vagShir, NsiVagShirDTO.class)
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
        NsiVagShir vagShir = nsiVagShirDAO.findBy(vagonBaseDTO.getNvag());

        log.debug("AutoSaving a NsiVagShir entry with information: {}", vagonBaseDTO);

        if(vagShir == null){
            vagShir = kyNsiVagonMapper.copy(vagonBaseDTO, NsiVagShir.class);
        } else {
            kyNsiVagonMapper.copy(vagonBaseDTO, vagShir);
        }

//        checkVagonUniqueness(vagShir.getNvag(), vagShir.getHid());
        nsiVagShirDAO.makePersistent(vagShir);

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
