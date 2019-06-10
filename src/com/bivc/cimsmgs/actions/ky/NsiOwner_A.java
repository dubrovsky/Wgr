package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.NsiOwnerDAO;
import com.bivc.cimsmgs.db.ky.NsiKyOwners;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.NsiKyOwnersDTO;
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
public class NsiOwner_A extends CimSmgsSupport_A {
    final static private Logger log = LoggerFactory.getLogger(NsiOwner_A.class);

    @Autowired
    private Serializer defaultSerializer;

    @Autowired
    private Deserializer defaultDeserializer;

    @Autowired
    private Mapper defaultMapper;

   /* @Autowired
    private Mapper kyNsiOwnerMapper;*/

    @Autowired
    private NsiOwnerDAO nsiOwnerDAO;

    private String jsonRequest;
    private String action;
    private String filter;
//    private String noAvto;

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
                /*case GET:
                    return get();*/
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

    }

    public String list() throws Exception {
        log.debug("Rendering NsiKyOwners list.");

        List<Filter> filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>(){}.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;

        List<NsiKyOwners> list = nsiOwnerDAO.findAll(getLimit(), getStart(), filters/*, getQuery()*/);
        Long total = nsiOwnerDAO.countAll(filters/*getQuery()*/);

        log.debug("Found {} NsiKyOwners entries.", total);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        defaultMapper.copyList(list, NsiKyOwnersDTO.class),
                                        total
                                )
                        )
        );

        return SUCCESS;
    }

    public String edit() throws Exception {
        log.debug("Rendering edit NsiKyOwnersDTO entry with hid: {}", getHid());

        NsiKyOwners nsiOwners = nsiOwnerDAO.findById(getHid(), false);

        log.debug("Rendering edit NsiKyOwnersDTO entry form with information: {}", nsiOwners);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        defaultMapper.copy(nsiOwners, NsiKyOwnersDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    public String save() throws Exception {
        NsiKyOwnersDTO dto = defaultDeserializer.setLocale(getLocale()).read(NsiKyOwnersDTO.class, jsonRequest);
        log.debug("Saving a  NsiKyOwners entry with information: {}", dto);

        NsiKyOwners saved;
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
                                        defaultMapper.copy(saved, NsiKyOwnersDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    private NsiKyOwners update(NsiKyOwnersDTO dto) {
        NsiKyOwners updated = nsiOwnerDAO.getById(dto.getHid(), false);
        defaultMapper.copy(dto, updated);
        log.debug("Updated the information of a NsiKyOwners entry to: {}", updated);

        return updated;
    }

    private NsiKyOwners add(NsiKyOwnersDTO dto) {
        NsiKyOwners added = defaultMapper.copy(dto, NsiKyOwners.class);
        nsiOwnerDAO.makePersistent(added);
        log.debug("Added a NsiKyOwners entry with information: {}", added);
        return added;
    }

    public String delete() throws Exception {

        NsiKyOwnersDTO dto = defaultDeserializer.setLocale(getLocale()).read(NsiKyOwnersDTO.class, jsonRequest);
        log.debug("Deleting a NsiKyOwners entry with id: {}", dto.getHid());

        NsiKyOwners deleted = nsiOwnerDAO.getById(dto.getHid(), false);
        nsiOwnerDAO.makeTransient(deleted);
        log.info("Deleted NsiKyOwners entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    /*public String get() throws Exception {
        log.debug("Get NsiKyOwners entity with nkon: {}", noAvto);

        NsiKyOwners avto = nsiOwnerDAO.findBy(noAvto);

        if(avto != null){
            log.debug("Found NsiKyOwners entity with information: {}", avto);
            setJSONData(
                    defaultSerializer
                            .setLocale(getLocale())
                            .write(
                                    new Response<>(
                                            kyNsiAvtoMapper.copy(avto, AvtoBaseDTO.class)
                                    )
                            )
            );
        }
        else {
            log.debug("Nothing Found for NsiKyOwners with nkon: {}", noAvto);
            setJSONData(defaultSerializer.write(new Response<>()));
        }

        return SUCCESS;
    }*/

    /*public String autoSave(AvtoBaseDTO avtoBaseDTO) throws Exception {
        NsiKyOwners avto = nsiOwnerDAO.findBy(avtoBaseDTO.getNo_avto());

        log.debug("AutoSaving a NsiKyOwners entry with information: {}", avtoBaseDTO);

        if(avto == null){
            avto = kyNsiAvtoMapper.copy(avtoBaseDTO, NsiKyOwners.class);
        } else {
            kyNsiAvtoMapper.copy(avtoBaseDTO, avto);
        }
        nsiOwnerDAO.makePersistent(avto);

        return SUCCESS;
    }*/

    public void setJsonRequest(String jsonRequest) {
        this.jsonRequest = jsonRequest;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    /*public void setNoAvto(String noAvto) {
        this.noAvto = noAvto;
    }*/


    enum Action {LIST, EDIT, SAVE, /*GET,*/ DELETE}
}



