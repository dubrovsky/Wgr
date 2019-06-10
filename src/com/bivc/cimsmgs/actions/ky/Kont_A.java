package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.YardDTO;
import com.bivc.cimsmgs.dto.ky.kont.*;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.bivc.cimsmgs.services.ky.IKontOperationsService;
import com.bivc.cimsmgs.services.ky.IKontStatusHistoryService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Kont_A extends CimSmgsSupport_A {
    final static private Logger log = LoggerFactory.getLogger(Kont_A.class);

    private String action;
    private String jsonRequest;

    @Autowired
    private Serializer defaultSerializer;

    @Autowired
    private Deserializer defaultDeserializer;

    @Autowired
    private KontDAO kontDAO;

    @Autowired
    private YardDAO yardDAO;

    @Autowired
    private VagonDAO vagonDAO;

    @Autowired
    private PoezdDAO poezdDAO;

    @Autowired
    private AvtoDAO avtoDAO;

    private List<Filter> filters;
    private KontOperationsDTO kont;
    private Vagon vagon;
    private Poezd poezd;
    private Avto avto;

    @Autowired
    private Mapper kykontMapper;
    private String filter;

    @Autowired
    private IKontOperationsService kontOperationsService;

    @Autowired
    private IKontStatusHistoryService kontStatusHistoryService;

    @Autowired
    private KontStatusHistoryDAO statusHistoryDAO;

    @Autowired
    private NsiKont_A nsiKontA;

    public String execute() throws Exception {
        if(StringUtils.isEmpty(action)){
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (Action.valueOf(action.toUpperCase())){
                case SEARCH:
                    return search();
                case SAVE_IN_POEZDINTO:
                    return saveInPoezdInto();
                case SAVE_IN_POEZDOUT:
                    return saveInPoezdOut();
                case SAVE_NO_TRANSP:
                    return saveNoTransp();
                case SAVE_IN_AVTOINTO:
                    return saveInAvtoInto();
                case SAVE_IN_AVTOOUT:
                    return saveInAvtoOut();
                case SAVE_IN_YARD:
                    return saveInYard();

                case DELETE_IN_POEZDINTO:
                    return deleteInPoezdInto();
                case DELETE_IN_POEZDOUT:
                    return deleteInPoezdOut();
                case DELETE_IN_AVTOINTO:
                    return deleteInAvtoInto();
                case DELETE_IN_AVTOOUT:
                    return deleteInAvtoOut();
                case DELETE_NO_POEZD:
                    return deleteNoPoezd();
                case DELETE_IN_YARD:
                    return deleteInYard();

                case KONT_NO_TRANSP_LIST:
                    return kontNoTranspList();
                case KONTS_LIST_FOR_POEZD_OUT:
                    return kontsListForPoezdOut();
                case KONTS_LIST_FOR_AVTO_OUT:
                    return kontsListForAvtoOut();

                case KONTS_DIR_FROM_POEZD_INTO:
                    return kontsDirFromPoezdInto();
                case KONTS_DIR_FROM_AVTO_INTO:
                    return kontsDirFromAvtoInto();
                case KONTS_DIR_FROM_NO_TRANSP:
                    return kontsDirFromNoTransp();
                case KONTS_DIR_FOR_POEZD_OUT_FROM_ALL:
                    return kontsDirForPoezdOutFromAll();
                case KONTS_DIR_FOR_AVTO_OUT_FROM_ALL:
                    return kontsDirForAvtoOutFromAll();
                /*case KONTS_FOR_YARD_LIST_FROM_NO_TRANSP:
                    return kontsDirFromNoTransp();*/
                case KONTS_DIR_FOR_YARD_FROM_ALL:
                    return kontsDirForYardFromAll();
                case KONTS_DIR_FROM_YARD:
                    return kontsDirFromYard();

                case YARDPLACE_FOR_KONT_IN_POEZDINTO_BIND:
                    return yardPlaceForKontBind();
                case YARDPLACE_CANCEL_FOR_KONT_IN_POEZDINTO_BIND:
                    return yardPlaceCancelForKontBind();
                case YARDPLACE_CANCEL_FOR_KONT_IN_POEZDOUT_BIND:
                    return yardPlaceCancelForKontBind();
                case YARDPLACE_CANCEL_FOR_KONT_IN_AVTOINTO_BIND:
                    return yardPlaceCancelForKontBind();
                case YARDPLACE_CANCEL_FOR_KONT_IN_AVTOOUT_BIND:
                    return yardPlaceCancelForKontBind();
                case YARDPLACE_FOR_KONT_IN_AVTOINTO_BIND:
                    return yardPlaceForKontBind();
                case YARDPLACE_FOR_KONT_IN_NO_TRANSP_BIND:
                    return yardPlaceForKontBind();
                case KONT_FOR_YARDPLACES_IN_YARD_BIND:
                    return kontForYardPlaceBind();

                case YARDPLACE_FOR_KONT_IN_POEZDINTO_UNBIND:
                    return yardPlaceForKontInPoezdIntoUnbind();
                case YARDPLACE_FOR_KONT_IN_AVTOINTO_UNBIND:
                    return yardPlaceForKontInAvtoIntoUnbind();
                case KONT_FROM_YARD_IN_YARD_UNBIND:
                    return kontFromYardInYardUnbind();
                case KONT_IN_YARD_RELOCATE:
                    return kontInYardRelocate();


                case KONTS_FOR_POEZDOUT_IN_YARD_BIND:
                    return kontsForPoezdOutBind();
                case KONTS_FOR_POEZDOUT_IN_POEZDINTO_BIND:
                    return kontsForPoezdOutBind();
                case KONTS_FOR_POEZDOUT_IN_AVTOINTO_BIND:
                    return kontsForPoezdOutBind();
                case KONTS_FOR_POEZDOUT_IN_NOTRANSP_BIND:
                    return kontsForPoezdOutBind();
                case KONTS_FOR_POEZDOUT_IN_ALL_BIND:
                    return kontsForPoezdOutBind();

                case KONTS_FOR_AVTOOUT_IN_YARD_BIND:
                    return kontsForAvtoOutBind();
                case KONTS_FOR_AVTOOUT_IN_POEZDINTO_BIND:
                    return kontsForAvtoOutBind();
                case KONTS_FOR_AVTOOUT_IN_AVTOINTO_BIND:
                    return kontsForAvtoOutBind();
                case KONTS_FOR_AVTOOUT_IN_NOTRANSP_BIND:
                    return kontsForAvtoOutBind();
                case KONTS_FOR_AVTOOUT_IN_ALL_BIND:
                    return kontsForAvtoOutBind();

                case POEZDOUT_FOR_KONT_IN_POEZDINTO_BIND:
                    return poezdOutForKontBind();
                case POEZDOUT_FOR_KONT_IN_AVTOINTO_BIND:
                    return poezdOutForKontBind();
                case POEZDOUT_FOR_KONT_IN_NOTRANSP_BIND:
                    return poezdOutForKontBind();
                case POEZDOUT_FOR_KONT_IN_YARD_BIND:
                    return poezdOutForKontBind();

                case AVTOOUT_FOR_KONT_IN_POEZDINTO_BIND:
                    return avtoOutForKontBind();
                case AVTOOUT_FOR_KONT_IN_AVTOINTO_BIND:
                    return avtoOutForKontBind();
                case AVTOOUT_FOR_KONT_IN_NOTRANSP_BIND:
                    return avtoOutForKontBind();
                case AVTOOUT_FOR_KONT_IN_YARD_BIND:
                    return avtoOutForKontBind();

                case KONT_FOR_POEZDOUT_FROM_POEZDINTO_UNBIND:
                    return kontForPoezdOutFromPoezdIntoUnbind();
                case KONT_FOR_POEZDOUT_FROM_AVTOINTO_UNBIND:
                    return kontForPoezdOutFromAvtoIntoUnbind();
                case KONT_FOR_POEZDOUT_FROM_POEZDOUT_UNBIND:
                    return kontForPoezdOutFromPoezdOutUnbind();

                case KONT_FOR_AVTOOUT_FROM_POEZDINTO_UNBIND:
                    return kontForAvtoOutFromPoezdIntoUnbind();
                case KONT_FOR_AVTOOUT_FROM_AVTOINTO_UNBIND:
                    return kontForAvtoOutFromAvtoIntoUnbind();
                case KONT_FOR_AVTOOUT_FROM_AVTOOUT_UNBIND:
                    return kontForAvtoOutFromAvtoOutUnbind();
                /*case KONTS_IN_POEZD:
                    return kontsInPoezd();*/

                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

    }

    public String search() throws Exception {
        log.debug("Rendering kont list.");
        List<Kont> konts = kontDAO.findAll(getSearch().getNkon());
        log.debug("Found {} Kont entries.", konts.size());

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kykontMapper.copyList(konts, KontOperationsIntoOutDTO.class),
                                        (long) konts.size()
                                )
                        )
        );

        return SUCCESS;
    }

    /*public String kontsInPoezd(){
        log.debug("Rendering Konts in poezd list.");

        return SUCCESS;
    }*/

    public String kontsListForPoezdOut() throws Exception {
        log.debug("Rendering Konts Out list.");

        List<Kont> list = kontDAO.findAll4Vagon(getHid());
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kykontMapper.copyList(list, KontOperationsOutDTO.class),
                                        (long) list.size()
                                )
                        )
        );
        return SUCCESS;
    }

    public String kontsListForAvtoOut() throws Exception {
        log.debug("Rendering Konts for AvtoOut list.");

        List<Kont> list = kontDAO.findAll4Avto(getHid());
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kykontMapper.copyList(list, KontOperationsOutDTO.class),
                                        (long) list.size()
                                )
                        )
        );
        return SUCCESS;
    }

    public String saveInAvtoInto() throws Exception {
        /*IKontInAvtoIntoDTO dto = defaultDeserializer.setLocale(getLocale()).read(KontInAvtoIntoDTO.class, jsonRequest);
        log.debug("Saving a AvtoInto entry with information: {}", dto);*/

        return save(KontInAvtoIntoDTO.class,  KontStatus.AVTO_INTO);
    }

    public String saveInAvtoOut() throws Exception {
        /*IKontInAvtoOutDTO dto = defaultDeserializer.setLocale(getLocale()).read(KontInAvtoOutDTO.class, jsonRequest);
        log.debug("Saving a AvtoOut entry with information: {}", dto);*/

        return save(KontInAvtoOutDTO.class, KontStatus.AVTO_OUT);
    }

    public String saveInYard() throws Exception {
        return save(KontInYardDTO.class, KontStatus.YARD);
    }

    public String saveInPoezdInto() throws Exception {
        /*IKontInPoezdIntoDTO dto = defaultDeserializer.setLocale(getLocale()).read(KontInPoezdIntoDTO.class, jsonRequest);
        log.debug("Saving a KontInto entry with information: {}", dto);*/

        return save(KontInPoezdIntoDTO.class, KontStatus.POEZD_INTO);
    }

    public String saveInPoezdOut() throws Exception {
       /* IKontInPoezdOutDTO dto = defaultDeserializer.setLocale(getLocale()).read(KontInPoezdOutDTO.class, jsonRequest);
        log.debug("Saving a KontOut entry with information: {}", dto);*/

        return save(KontInPoezdOutDTO.class, KontStatus.POEZD_OUT);
    }

    public String saveNoTransp() throws Exception {
        /*IKontBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(KontBaseDTO.class, jsonRequest);
        log.debug("Saving a KontNoPoezd entry with information: {}", dto);*/

        return save(KontBaseDTO.class, KontStatus.NO_TRANSP);
    }

    private /*Kont*/String save(Class _class, KontStatus kontStatus) throws Exception {
        IKontBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(_class, jsonRequest);
        log.debug("Saving a Kont entry with information: {}", dto);

        Kont saved;
        if(dto.getHid() == null){
            saved = create(dto, kontStatus);
        } else {
            saved = update(dto);
        }

        autoSaveToNsi(dto);
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kykontMapper.copy(saved, KontIntoDTO.class)
                                )
                        )
        );

        return SUCCESS;
    }

    private void autoSaveToNsi(IKontBaseDTO dto) throws Exception {
        nsiKontA.autoSave(dto);
    }

    private Kont update(IKontBaseDTO dto) {
        Kont updated = kontDAO.getById(dto.getHid(), false);
        kykontMapper.copy(dto, updated);
        log.debug("Updated the information of a Kont entry to: {}", updated);

        return updated;
    }

    private Kont create(IKontBaseDTO dto, KontStatus kontStatus) {
        Kont added = kykontMapper.copy(dto, Kont.class);
        if(kontStatus == KontStatus.YARD){
            added = createKontInYard(added);
        } else {
            added = kontOperationsService.bindKont(added, kontStatus);
        }
        kontDAO.makePersistent(added);
        statusHistoryDAO.makePersistent(kontStatus.supplyHistory(added));

        log.debug("Added a Kont entry with information: {}", added);
        return added;
    }

    private Kont createKontInYard(Kont added) {
        Yard yard = yardDAO.getById(added.getYard().getHid(), false);
        added.setYard(yard);
        added = kontOperationsService.bindKontToYard(added, added.getYard(), added.getYard().getSector());
        yardDAO.makePersistent(yard);
        return added;
    }

    public String deleteInPoezdOut() throws Exception {
        return delete(KontInPoezdOutDTO.class);
    }

    public String deleteInPoezdInto() throws Exception {
        return delete(KontInPoezdIntoDTO.class);
    }

    public String deleteInAvtoOut() throws Exception {
        return delete(KontInAvtoOutDTO.class);
    }

    public String deleteInAvtoInto() throws Exception {
        return delete(KontInAvtoIntoDTO.class);
    }

    public String deleteNoPoezd() throws Exception {
        return delete(KontBaseDTO.class);
    }

    public String deleteInYard() throws Exception {
        return delete(KontInYardDTO.class);
    }

    private String delete(Class _class) throws Exception {
        if(StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }

        IKontBaseDTO dto = defaultDeserializer.setLocale(getLocale()).read(_class, jsonRequest);
        log.debug("Deleting  Kont entry with id: {}", dto.getHid());

        Kont deleted = kontDAO.getById(dto.getHid(), false);

        if(deleted.getYard() != null){
            deleteKontInYard(deleted);
        }
        kontDAO.makeTransient(deleted);


        log.info("Deleted  Kont entry with information: {}", deleted);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    private void deleteKontInYard(Kont deleted) {
        Yard yard = yardDAO.getYardBy(deleted.getHid());
        kontOperationsService.makeYardPalceEmpty(deleted, yard);
        yardDAO.makePersistent(yard);
    }

    public String kontNoTranspList() throws Exception {
        log.debug("Rendering KONT NO TRANSPORT list.");

        filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>(){}.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;

        List<Kont> list = kontDAO.findAll(getLimit(), getStart(), getFilters(), getUser().getUsr(), getLocale(), KontStatus.NO_TRANSP);
        Long total = kontDAO.countAll(getFilters(), getUser().getUsr(), getLocale(), KontStatus.NO_TRANSP);

        log.debug("Found {} KONT NO TRANSPORT entries.", total);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kykontMapper.copyList(list, KontIntoDTO.class),
                                        total
                                )
                        )
        );

//        setJSONData(kontNoTraspToListSerializer.setLocale(getLocale()).write(new Response<Kont>(list, total)));

        return SUCCESS;
    }

    public String kontsDirFromPoezdInto() throws Exception {
        return kontsDir(new KontStatus[] {KontStatus.POEZD_INTO});
    }

    public String kontsDirFromAvtoInto() throws Exception {
        return kontsDir(new KontStatus[] {KontStatus.AVTO_INTO});
    }

    public String kontsDirFromNoTransp() throws Exception {
        return kontsDir(new KontStatus[] {KontStatus.NO_TRANSP});
    }

    public String kontsDirForYardFromAll() throws Exception {
        return kontsDir(new KontStatus[] {KontStatus.POEZD_INTO, KontStatus.NO_TRANSP, KontStatus.AVTO_INTO});
    }

    public String kontsDirForPoezdOutFromAll() throws Exception {
        return kontsDir(new KontStatus[] {KontStatus.POEZD_INTO, KontStatus.NO_TRANSP, KontStatus.AVTO_INTO, KontStatus.YARD});
    }

    public String kontsDirForAvtoOutFromAll() throws Exception {
        return kontsDir(new KontStatus[] {KontStatus.POEZD_INTO, KontStatus.NO_TRANSP, KontStatus.YARD});
    }

    public String kontsDirFromYard() throws Exception {
        return kontsDir(new KontStatus[] {KontStatus.YARD});
    }

    public String kontsDir(KontStatus[] kontStatuses) throws Exception {
        log.debug("Rendering KONTS DIR list.");

        filters = StringUtils.isNotBlank(filter) ?
                (List<Filter>) defaultDeserializer.read(new ArrayList<Filter>(){}.getClass().getGenericSuperclass(), filter) :
                Collections.EMPTY_LIST;


        List<Kont> list = kontDAO.findKontDir(getLimit(), getStart(), getFilters(), getUser().getUsr(), getLocale(), kontStatuses);
        Long total = kontDAO.countKontDir(getFilters(), getUser().getUsr(), getLocale(), kontStatuses);

        log.debug("Found {} KONTS TO YARD entries.", total);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kykontMapper.copyList(list, KontOperationsDTO.class),
                                        total
                                )
                        )
        );

        return SUCCESS;
    }

    public String poezdOutForKontBind() throws Exception {
        Long kontId = kont.getHid();
        Kont kont = kontToPoezdOutBind(kontId);

        return kontOperationsResponse(kont, KontOperationsIntoDTO.class);
    }

    public String kontsForPoezdOutBind() throws IOException {
        List<Long> kontsIds = defaultDeserializer.read(new ArrayList<Long>(){}.getClass().getGenericSuperclass(), jsonRequest);
        for(Long kontId: kontsIds){
            kontToPoezdOutBind(kontId);
        }
        return SUCCESS;
    }

    private Kont kontToPoezdOutBind(Long kontId){
        log.debug("Binding a Kont {} to PoezdOut entry", kontId);

        Long vagonId = vagon.getHid(),
             poezdId = poezd.getHid();

        Kont _kont = kontDAO.getByIdWithAllParents(kontId);  // need if to avoid - AssertionFailure: collection [com.bivc.cimsmgs.db.ky.Avto.kontsInto] was not processed by flush()
        Vagon vagon = vagonDAO.getById(vagonId, false);
        Poezd poezd = poezdDAO.getById(poezdId, false);


        // check if kont from Yard
        Yard yard = yardDAO.getYardBy(kontId);
        if(yard != null) { // can't split into another method as we have binding from ALL
            kontOperationsService.makeYardPalceEmpty(_kont, yard);
            yardDAO.makePersistent(yard);
        }

        _kont = kontOperationsService.bindKontToPoezdOut(_kont, poezd, vagon, kont);

        kontDAO.makePersistent(_kont);
        poezdDAO.makePersistent(poezd);
        vagonDAO.makePersistent(vagon);
        statusHistoryDAO.makePersistent(KontStatus.POEZD_OUT.supplyHistory(_kont));

        return _kont;
    }

    public String avtoOutForKontBind() throws Exception {
        Long kontId = kont.getHid();
        Kont kont = kontToAvtoOutBind(kontId);

        return kontOperationsResponse(kont, KontOperationsIntoDTO.class);
    }

    public String kontsForAvtoOutBind() throws IOException {
        List<Long> kontsIds = defaultDeserializer.read(new ArrayList<Long>(){}.getClass().getGenericSuperclass(), jsonRequest);
        for(Long kontId: kontsIds){
            kontToAvtoOutBind(kontId);
        }

        return SUCCESS;
    }

    private Kont kontToAvtoOutBind(Long kontId){
        log.debug("Binding a Kont {} to AvtoOut entry", kontId);

        Long avtoId = avto.getHid();

//        Kont _kont = kontDAO.getById(kontId, false);
        Kont _kont = kontDAO.getByIdWithAllParents(kontId);  // need if to avoid - AssertionFailure: collection [com.bivc.cimsmgs.db.ky.Avto.kontsInto] was not processed by flush()
        Avto avto = avtoDAO.getById(avtoId, false);

        // check if kont from Yard
        Yard yard = yardDAO.getYardBy(kontId);
        if(yard != null) { // can't split into another method as we have binding from ALL
            kontOperationsService.makeYardPalceEmpty(_kont, yard);
            yardDAO.makePersistent(yard);
        }

        _kont = kontOperationsService.bindKontToAvtoOut(_kont, avto, kont);

        kontDAO.makePersistent(_kont);
        avtoDAO.makePersistent(avto);
        statusHistoryDAO.makePersistent(KontStatus.AVTO_OUT.supplyHistory(_kont));

        return _kont;
    }

    public String kontForPoezdOutFromPoezdIntoUnbind() throws Exception {
        Kont kont = kontFromPoezdOutUnbind(/*KontStatus.POEZD_INTO*/);

        return kontOperationsResponse(kont, KontOperationsIntoDTO.class);
    }

    public String kontForPoezdOutFromAvtoIntoUnbind() throws Exception {
        Kont kont = kontFromPoezdOutUnbind(/*KontStatus.AVTO_INTO*/);

        return kontOperationsResponse(kont, KontOperationsIntoDTO.class);
    }

    public String kontForPoezdOutFromPoezdOutUnbind() throws Exception {
        Kont kont = kontFromPoezdOutUnbind();
        return kontOperationsResponse(kont, KontOperationsOutDTO.class);
    }

    private Kont kontFromPoezdOutUnbind() {
        KontStatusHistory kontPrevStatus = kontStatusHistoryService.findKontPrevStatusInHistory(kontDAO.findById(kont.getHid(), false), statusHistoryDAO.findAllHistoryBy(kont.getHid()));
        if (kontPrevStatus != null && checkIfPrevKontPlaceCanBeUsed(kontPrevStatus)) {
            return kontFromPoezdOutUnbind(kontPrevStatus);
        }
        return null;
    }

    private boolean checkIfPrevKontPlaceCanBeUsed(KontStatusHistory kontPrevStatus) {
        return !(kontPrevStatus.getStatus() == KontStatus.YARD && !kontPrevStatus.getYard().isEmpty());
    }

    private Kont kontFromPoezdOutUnbind(KontStatusHistory prevStatus) {
        Long kontId = kont.getHid();
//        Kont kont = kontDAO.findById(kontId, false);
        Kont kont = kontDAO.getByIdWithAllParents(kontId);
        KontStatus curStatus = kont.getStatus();

        log.debug("Unbinding a Kont {} from PoezdOut entry", kont.getHid());
        KontStatusHistory prevPrevStatusInHistory = kontStatusHistoryService.findKontPrevPrevStatusInHistory(kont, statusHistoryDAO.findAllHistoryBy(kontId));
        kont = kontOperationsService.unbindKontFromPoezdOut(kont, prevStatus, prevPrevStatusInHistory != null ? prevPrevStatusInHistory.getStatus() : null);

        kontDAO.makePersistent(kont);
        if(prevStatus.getStatus() == KontStatus.YARD){
            yardDAO.makePersistent(kont.getYard());
        }

        perfomUnbindInStatusHistory(kont, curStatus);
        return kont;
    }

    public String kontForAvtoOutFromAvtoOutUnbind() throws Exception {
        Kont kont = kontFromAvtoOutUnbind();

        return kontOperationsResponse(kont, KontOperationsOutDTO.class);
    }

    public String kontForAvtoOutFromPoezdIntoUnbind() throws Exception {
        Kont kont = kontFromAvtoOutUnbind(/*KontStatus.AVTO_INTO*/);

        return kontOperationsResponse(kont, KontOperationsIntoDTO.class);
    }

    public String kontForAvtoOutFromAvtoIntoUnbind() throws Exception {
        Kont kont = kontFromAvtoOutUnbind(/*KontStatus.AVTO_INTO*/);

        return kontOperationsResponse(kont, KontOperationsIntoDTO.class);
    }

    private Kont kontFromAvtoOutUnbind() {
        KontStatusHistory prevStatus = kontStatusHistoryService.findKontPrevStatusInHistory(kontDAO.findById(kont.getHid(), false), statusHistoryDAO.findAllHistoryBy(kont.getHid()));
        if (checkIfPrevKontPlaceCanBeUsed(prevStatus)) {
            return kontFromAvtoOutUnbind(prevStatus);
        }
        return null;
    }

    private Kont kontFromAvtoOutUnbind(KontStatusHistory prevStatus) {
        Long kontId = kont.getHid();
//        Kont kont = kontDAO.getByIdWithPoezdIntoAndVagonIntoAndAvtoInto(kontId);
//        Kont kont = kontDAO.findById(kontId, false);
        Kont kont = kontDAO.getByIdWithAllParents(kontId);
        KontStatus curStatus = kont.getStatus();

        log.debug("Unbinding a Kont {} from AvtoOut entry", kont.getHid());
        KontStatusHistory prevPrevStatusInHistory = kontStatusHistoryService.findKontPrevPrevStatusInHistory(kont, statusHistoryDAO.findAllHistoryBy(kontId));
        kont = kontOperationsService.unbindKontFromAvtoOut(kont, prevStatus, prevPrevStatusInHistory != null ? prevPrevStatusInHistory.getStatus() : null);

        kontDAO.makePersistent(kont);

        perfomUnbindInStatusHistory(kont, curStatus);
        return kont;
    }

    private void kontOperationsForYardResponse(Kont kont) throws Exception {
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        kykontMapper.copy(kont.getYard(), YardDTO.class)
                                )
                        )
        );
    }

    public String yardPlaceForKontInPoezdIntoUnbind() throws Exception {
        Kont kont = kontFromYardUnbind(/*KontStatus.POEZD_INTO*/);
        return kontOperationsResponse(kont, KontOperationsIntoDTO.class);
    }

    public String yardPlaceForKontInAvtoIntoUnbind() throws Exception {
        Kont kont = kontFromYardUnbind(/*KontStatus.AVTO_INTO*/);
        return kontOperationsResponse(kont, KontOperationsIntoDTO.class);
    }

    public String kontFromYardInYardUnbind() throws Exception {
        Kont kont = kontFromYardUnbind();

        kontOperationsForYardResponse(kont);
        return SUCCESS;
    }

    private Kont kontFromYardUnbind(){
        KontStatusHistory prevStatus = kontStatusHistoryService.findKontPrevStatusInHistory(kontDAO.findById(kont.getHid(), false), statusHistoryDAO.findAllHistoryBy(kont.getHid()));
        return kontFromYardUnbind(prevStatus);
    }

    private Kont kontFromYardUnbind(KontStatusHistory prevStatus){
        Long kontId = kont.getHid();
        Kont kont = kontDAO.getByIdWithAllParents(kontId); // eager init poezd and vagon to avoid error when save status history
//        Kont kont = kontDAO.findById(kontId, false);
        KontStatus curStatus = kont.getStatus();
        Yard yard = yardDAO.getById(kont.getYard().getHid(), false);

        log.info("Unbind Yard with information - {} from Kont with hid - {}", yard, kontId);

        kont = kontOperationsService.unbindKontFromYard(kont, yard, prevStatus);
        kontDAO.makePersistent(kont);
        yardDAO.makePersistent(yard);

        perfomUnbindInStatusHistory(kont, curStatus);

        return kont;
    }

    public String kontInYardRelocate() throws Exception {
        Long kontId = kont.getHid();
//        Kont kont = kontDAO.getById(kontId, false); // get live kont from Db
        Kont kont = kontDAO.getByIdWithAllParents(kontId);
        Yard yard = kont.getYard();

        log.info("Unbind Yard with information - {} from Kont with hid - {}", yard, kontId);

        kontOperationsService.makeYardPalceEmpty(kont, kont.getYard());
        kont = kontToYardBind(kont.getPrevStatus());

        return kontOperationsResponse(kont, KontOperationsIntoDTO.class);
    }

    public String yardPlaceForKontBind() throws Exception {
        Long kontId = kont.getHid();
        Kont kont = kontDAO.getById(kontId, false); // get live kont from Db
        kont = kontToYardBind(kont.getStatus());

        return kontOperationsResponse(kont, KontOperationsIntoDTO.class);
    }

    public String yardPlaceCancelForKontBind() throws Exception {
        Long kontId = kont.getHid();
        Kont kont = kontDAO.getById(kontId, false); // get live kont from Db

        switch(kont.getStatus()){
            case POEZD_OUT:
                kontOperationsService.unbindKontFromPoezdOut(kont);
                break;
            case AVTO_OUT:
                kontOperationsService.unbindKontFromAvtoOut(kont);
                break;
        }

        perfomUnbindInStatusHistory(kont, kont.getStatus());
        perfomUnbindInStatusHistory(kont, kont.getPrevStatus());

        kont = kontToYardBind(kont.getStatus());

        return kontOperationsResponse(kont, KontOperationsIntoDTO.class);
    }

    public String kontForYardPlaceBind() throws Exception {
        Long kontId = kont.getHid();
        Kont kont = kontDAO.getById(kontId, false); // get live kont from Db
        kont = kontToYardBind(kont.getStatus());

        kontOperationsForYardResponse(kont);

        return SUCCESS;
    }

    private Kont kontToYardBind(KontStatus prevStatus){
        Long kontId = kont.getHid(),
             yardId = kont.getYard().getHid();

//        Kont _kont = ko ntDAO.getById(kontId, false); // get live kont from Db
        Kont _kont = kontDAO.getByIdWithAllParents(kontId);

        Yard yard = yardDAO.getById(yardId, false);

        log.info("Bind Yard with information - {} to Kont with hid - {}", yard, kontId);

        _kont = kontOperationsService.bindKontToYard(_kont, yard, yard.getSector(), prevStatus, kont);
        kontDAO.makePersistent(_kont);
        yardDAO.makePersistent(yard);
        statusHistoryDAO.makePersistent(KontStatus.YARD.supplyHistory(_kont));
        return _kont;
    }

    private void perfomUnbindInStatusHistory(Kont kont, KontStatus curStatus) {

        List<KontStatusHistory> kontHistoryStatuses = kontStatusHistoryService.findKontHistoryStatusesFor(curStatus, statusHistoryDAO.findAllHistoryBy(kont.getHid()));
        for(KontStatusHistory statusHistory:  kontHistoryStatuses){
            statusHistory.setActive(false);
            statusHistoryDAO.makePersistent(statusHistory);
        }

        statusHistoryDAO.makePersistent(KontStatus.CANCEL.supplyHistory(kont));
//        statusHistoryDAO.makePersistent(prevStatus.supplyHistory(kont));
    }

    private String kontOperationsResponse(Kont kont, Class _class) throws Exception {
        if(kont != null){
            setJSONData(
                    defaultSerializer
                            .setLocale(getLocale())
                            .write(
                                    new Response<>(
                                            kykontMapper.copy(kont, _class)
                                    )
                            )
            );
        }
        else{ // if try to return to yard, but yard is already busy
            setJSONData(defaultSerializer.write(new Response<>(false)));
        }
        return SUCCESS;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public Vagon getVagon() {
        return vagon;
    }

    public void setVagon(Vagon vagon) {
        this.vagon = vagon;
    }

    public Poezd getPoezd() {
        return poezd;
    }

    public void setPoezd(Poezd poezd) {
        this.poezd = poezd;
    }

    public void setAvto(Avto avto) {
        this.avto = avto;
    }

    enum Action {
        SEARCH,
        KONTS_FOR_YARD_LIST,
        YARDPLACE_FOR_KONT_IN_POEZDINTO_BIND,
        YARDPLACE_FOR_KONT_IN_NO_TRANSP_BIND,
        KONTS_FOR_TRAINOUT_LIST,
        SAVE_NO_TRANSP,
        SAVE_IN_POEZDINTO,
        SAVE_IN_POEZDOUT,
        KONT_NO_TRANSP_LIST,
        KONT_IN_YARD_RELOCATE,
        KONTS_DIR_FROM_YARD,
        KONTS_YARD_FOR_TRAINOUT_SAVE,
        POEZDOUT_FOR_KONT_IN_POEZDINTO_BIND,
        POEZDOUT_FOR_KONT_IN_NOTRANSP_BIND,
        POEZDOUT_FOR_KONT_IN_YARD_BIND,
        KONTS_DIR_FROM_POEZD_INTO,
        KONTS_FOR_POEZDOUT_IN_YARD_BIND,
        KONTS_FOR_POEZDOUT_IN_POEZDINTO_BIND,
        KONTS_DIR_FROM_NO_TRANSP,
        KONTS_FOR_POEZDOUT_IN_NOTRANSP_BIND,
        KONT_FOR_POEZDOUT_FROM_POEZDOUT_UNBIND,
        KONTS_DIR_FOR_YARD_FROM_ALL,
        KONTS_DIR_FOR_POEZD_OUT_FROM_ALL,
        KONTS_FOR_POEZDOUT_IN_ALL_BIND,
        KONTS_LIST_FOR_POEZD_OUT,
        SAVE_IN_AVTOINTO,
        SAVE_IN_AVTOOUT,
        DELETE_IN_POEZDINTO,
        DELETE_IN_POEZDOUT,
        DELETE_IN_AVTOINTO,
        DELETE_IN_AVTOOUT,
        DELETE_NO_POEZD,
        YARDPLACE_FOR_KONT_IN_POEZDINTO_UNBIND,
        KONT_FOR_YARDPLACES_IN_YARD_BIND,
        KONT_FROM_YARD_IN_YARD_UNBIND,
        YARDPLACE_FOR_KONT_IN_AVTOINTO_BIND,
        YARDPLACE_FOR_KONT_IN_AVTOINTO_UNBIND,
        KONT_FOR_POEZDOUT_FROM_POEZDINTO_UNBIND,
        POEZDOUT_FOR_KONT_IN_AVTOINTO_BIND,
        KONT_FOR_POEZDOUT_FROM_AVTOINTO_UNBIND,
        AVTOOUT_FOR_KONT_IN_POEZDINTO_BIND,
        AVTOOUT_FOR_KONT_IN_AVTOINTO_BIND,
        AVTOOUT_FOR_KONT_IN_NOTRANSP_BIND,
        AVTOOUT_FOR_KONT_IN_YARD_BIND,
        KONT_FOR_AVTOOUT_FROM_POEZDINTO_UNBIND,
        KONT_FOR_AVTOOUT_FROM_AVTOINTO_UNBIND,
        KONTS_FOR_POEZDOUT_IN_AVTOINTO_BIND,
        KONTS_DIR_FOR_AVTO_OUT_FROM_ALL,
        KONTS_LIST_FOR_AVTO_OUT,
        KONTS_FOR_AVTOOUT_IN_YARD_BIND,
        KONTS_FOR_AVTOOUT_IN_POEZDINTO_BIND,
        KONTS_FOR_AVTOOUT_IN_NOTRANSP_BIND,
        KONTS_FOR_AVTOOUT_IN_ALL_BIND,
        KONT_FOR_AVTOOUT_FROM_AVTOOUT_UNBIND,
        SAVE_IN_YARD,
        DELETE_IN_YARD,
        YARDPLACE_CANCEL_FOR_KONT_IN_POEZDINTO_BIND,
        YARDPLACE_CANCEL_FOR_KONT_IN_AVTOINTO_BIND,
        YARDPLACE_CANCEL_FOR_KONT_IN_POEZDOUT_BIND,
        YARDPLACE_CANCEL_FOR_KONT_IN_AVTOOUT_BIND,
        /*KONTS_IN_POEZD,*/ KONTS_DIR_FROM_AVTO_INTO,
        KONTS_FOR_AVTOOUT_IN_AVTOINTO_BIND
    }



    public void setKont(KontOperationsDTO kont) {
        this.kont = kont;
    }

    public KontOperationsDTO getKont(){
        return kont;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setJsonRequest(String jsonRequest) {
        this.jsonRequest = jsonRequest;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }
}
