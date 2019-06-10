package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.dao.VagonDAO;
import com.bivc.cimsmgs.db.ky.Vagon;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.VagonBaseDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by peter on 05.03.14.
 */
public class Vagon_A extends CimSmgsSupport_A {
    final static private Logger log = LoggerFactory.getLogger(Vagon_A.class);

    private String action;
    private Byte direction;
    private long poezdId;

    @Autowired
    private Mapper kyvagonMapper;

    @Autowired
    private NsiVagShir_A nsiVagShirA;

    @Autowired
    private NsiVagUzky_A nsiVagUzkyA;

    enum Action { LIST, EDIT, POEZDOUT_DIR_FOR_KONT_LIST, SAVE, DELETE }
    private List<Filter> filters;
    private String filter;

    @Autowired
    private VagonDAO vagonDAO;

    @Autowired
    private PoezdDAO poezdDAO;

    private String jsonRequest;

    @Autowired
    private Serializer defaultSerializer;

    @Autowired
    private Deserializer defaultDeserializer;

    public String execute() throws Exception {
        if(StringUtils.isEmpty(action)){
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (Action.valueOf(action.toUpperCase())){
                case SAVE:
                    return save();
                case DELETE:
                    return delete();
                case POEZDOUT_DIR_FOR_KONT_LIST:
                    return poezdOutDirForKontList();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Unknown action param in request - " + ExceptionUtils.getRootCauseMessage(e));
        }

    }

    private String poezdOutDirForKontList() throws Exception {
        log.debug("Rendering poezdout to kont list.");

        filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>(){}.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;


        List<Vagon> list = vagonDAO.findPoezdsOut4Kont(getLimit(), getStart(), getFilters(), getUser().getUsr(), getLocale());
        Long total = vagonDAO.countPoezdsOut4Kont(getFilters(), getUser().getUsr(), getLocale());

        log.debug("Found {} poezdout entries.", total);

//        setJSONData(poezdOutDirForKontListSerializer.setLocale(getLocale()).write(new Response<>(list, total)));

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyvagonMapper.copyList(list, VagonBaseDTO.class),
                                        total
                                )
                        )
        );

        return SUCCESS;
    }

    public String delete() throws Exception {
        if(StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }

        VagonBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(VagonBaseDTO.class, jsonRequest);
        log.debug("Deleting Vagon entry with id: {}", dto.getHid());

        Vagon deleted = vagonDAO.getById(dto.getHid(), false);
        vagonDAO.makeTransient(deleted);
        log.info("Deleted Vagon entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    public String save() throws Exception {
        if(StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }
        VagonBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(VagonBaseDTO.class, jsonRequest);
        log.debug("Saving a Vagon entry with information: {}", dto);

        Vagon saved;
        if(dto.getHid() == null){
            saved = add(dto);
        } else {
            saved = update(dto);
        }

        vagonDAO.makePersistent(saved);

        autoSaveToNsi(dto);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kyvagonMapper.copy(saved, VagonBaseDTO.class)
                                )
                        )
        );

        return SUCCESS;
    }

    private void autoSaveToNsi(VagonBaseDTO dto) throws Exception {
//        Byte koleya = poezdDAO.getById(dto.getPoezd().getHid(), false).getKoleya();
        if(dto.getPoezd().getKoleya() == 1) {
            nsiVagShirA.autoSave(dto);
        } else if(dto.getPoezd().getKoleya() == 2){
            nsiVagUzkyA.autoSave(dto);
        }
    }

    private Vagon update(VagonBaseDTO dto) {
        Vagon updated = vagonDAO.getById(dto.getHid(), false);
        kyvagonMapper.copy(dto, updated);
        log.debug("Updated the information of a Vagon entry to: {}", updated);

        return updated;
    }

    private Vagon add(VagonBaseDTO dto) {
        Vagon added = kyvagonMapper.copy(dto, Vagon.class);
        log.debug("Added a Vagon entry with information: {}", added);
        return added;
    }

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public long getPoezdId() {
        return poezdId;
    }

    public void setPoezdId(long poezdId) {
        this.poezdId = poezdId;
    }

    public String getJsonRequest() {
        return jsonRequest;
    }

    public void setJsonRequest(String jsonRequest) {
        this.jsonRequest = jsonRequest;
    }


}
