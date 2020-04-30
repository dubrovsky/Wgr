package com.bivc.cimsmgs.actions;

import Ti.DataProcessing.*;
import Ti.DataProcessing.Tools.DataProcessingTools;
import Ti.DataProcessing.Tools.DocCH;
import Ti.model.excel.InvoiceXls;
import Ti.model.excel.InvoiceXlsContainer;
import Ti.model.excel.MapPogruz;
import Ti.model.excel.XlsDefaultModel;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.DocType;
import com.bivc.cimsmgs.dao.Doc2DocTemplatesDAO;
import com.bivc.cimsmgs.dao.InvoiceDAO;
import com.bivc.cimsmgs.dao.RouteDAO;
import com.bivc.cimsmgs.dao.SmgsDAO;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.doc2doc.Doc2Doc;
import com.bivc.cimsmgs.doc2doc.orika.DefaultMapper;
import com.bivc.cimsmgs.dto.Aviso2CimSmgsDTO;
import com.bivc.cimsmgs.exceptions.BusinessException;
import com.bivc.cimsmgs.exchange.GrCopLoader;
import com.bivc.cimsmgs.exchange.PrilDocLoader;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.*;

import static com.bivc.cimsmgs.commons.Constants.convert2JSONUploadResult;

public class Doc2Doc_A extends CimSmgsSupport_A implements ServletRequestAware, SessionAware, ServletResponseAware {
    final static private Logger log = LoggerFactory.getLogger(Doc2Doc_A.class);
    public static final String UPLOAD_GRAF = "uploadGraf";

    @Autowired
    private Doc2Doc aviso2CimSmgs;

    @Autowired
    private ObjectMapper jacksonObjectMapper;

    @Autowired
    private DefaultMapper defaultMapper;

    private Doc2Doc aviso2SmgsGu;
    private Doc2Doc smgs2Invoice;
    private Doc2Doc file2SmgsInvoice;
    private Doc2Doc aviso2SmgsAppend;
    private Doc2Doc cimSmgs2CimSmgs4ContList;
    private Doc2Doc cimSmgs2ExcelContList_de;
    private Doc2Doc cimSmgs2ExcelDopList_de;
    private Doc2Doc smgs2Smgs4ContList;
    private Doc2Doc smgs2ExcelContList_pl;

    //ведомость контейнеров смгс2
    private Doc2Doc smgs2ExcelContList;
    //ведомость вагонов смгс2
    private Doc2Doc smgs2ExcelVagList;
    // шаблоны документов
    private Doc2Doc excelTpls;
    //спецификация Инвойсов
    private Doc2Doc invoiceSpecs;


    private ArrayList<? extends XlsDefaultModel> xlsList=null;



    private HttpServletResponse servletResponse;
    private Map<String, Object> session;

    public String execute() throws Exception {
        log.info("execute");
        Doc2Doc doc2doc = run();
        setJSONData(Constants.convert2JSON_True(doc2doc.getResultMsg()));
        return SUCCESS;
    }

    public String upload() throws Exception {
        log.info("upload");
        return execute();
    }

    public String downloadExcel() throws Exception {
        log.info("downloadExcel");

        session.put(Report_A.TK_FLAG, true);
        run();
        session.remove(Report_A.TK_FLAG);
        return null;
    }

    public String download() throws Exception {
        log.info("download");

        if (getToken() == null) {  // 1-st request - check if have data to proceed
            Long docsQuant = getSmgsDAO().countDocsByNPoezd(getSearch().getNpoezd(), getType(), getSearch().getRouteId());
            setJSONData(docsQuant > 0 ? Constants.convert2JSON_True() : Constants.convert2JSON_False());
            return SUCCESS;
        } else {   //  2-nd request - push data to Excel
            return downloadExcel();
        }
    }

    private Doc2Doc run() throws Exception {
        findTemplate();
        Doc2Doc doc2doc = (Doc2Doc) this.getClass().getMethod("get" + doc2docTempl.getMethodName()).invoke(this);
        doc2doc.convert(this);
        return doc2doc;
    }

    private void findTemplate() throws BusinessException {
        log.info("findTemplate");

        List<Doc2docTemplsRouteUnRefs> doc2DocRouteUnRefs = doc2DocTemplDao.findDoc2DocTempls4UnRoute(getSearch().getRouteId(), getUser().getUsername(), getGroupBy());
        if (doc2DocRouteUnRefs.size() > 0) {
            doc2docTempl = doc2DocRouteUnRefs.get(0).getDoc2docTemplates();
        } else {
            List<Doc2docTemplsRouteRefs> doc2DocRouteRefs = doc2DocTemplDao.findDoc2DocTempls4Route(getSearch().getRouteId(), getGroupBy());
            if (doc2DocRouteRefs.size() > 0) { // look for in refs
                doc2docTempl = doc2DocRouteRefs.get(0).getDoc2docTemplates();
            } else {  // check default
                List<Doc2docTemplates> doc2docTempls = doc2DocTemplDao.findDefaultDoc2DocTempls(getGroupBy());
                if (doc2docTempls.size() > 0) {
                    doc2docTempl = doc2docTempls.get(0);
                } else {
                    throw new BusinessException("Miss template for doc2doc module");
                }
            }
        }
    }

    public String uploadGrafCopies() throws Exception {
        log.info("uploadGrafCopies");
        Route route = getRouteDAO().getById(getSearch().getRouteId(), false);
        log.debug("start upload " + fileUpload.size());
        log.debug("type " + getType());
        log.debug(getPoezdNum());
        log.debug("route " + getSearch().getRouteId());
        log.debug(getSearch().getDocType());

        GrCopLoader.GrCop oldGrCop = (GrCopLoader.GrCop)session.get(UPLOAD_GRAF);
        if (oldGrCop != null) {
            log.debug("Delete second step files");
            oldGrCop.deleteSecond();
        }

        GrCopLoader.GrCop grCop = new GrCopLoader.GrCop(getType() != null, getPoezdNum());
        for (int i = 0; i < fileUpload.size(); i++) {
            grCop.addFileItem(new GrCopLoader.FileItem(i, fileUpload.get(i), fileUploadFileName.get(i), fileUploadContentType.get(i)));
        }

        GrCopLoader.GrCop secondGrCop = new GrCopLoader().load(grCop, route, getUser().getUsr(), "cimsmgs".equalsIgnoreCase(getSearch().getDocType()) ? DocType.CIMSMGS : DocType.SMGS);
        session.put(UPLOAD_GRAF, secondGrCop);
        log.debug("end upload");
        setJSONData(secondGrCop.fileList.isEmpty() ? Constants.convert2JSON_True() : Constants.convert2JSONUploadGrafResult(secondGrCop.fileList));

        return SUCCESS;
    }

    public String uploadGrafCopiesPart2() throws Exception {
        log.info("uploadGrafCopiesPart2");
        @SuppressWarnings("unchecked")
        GrCopLoader.GrCop grCop = (GrCopLoader.GrCop)session.get(UPLOAD_GRAF);
        if (grCop == null)
            throw new BusinessException("Miss list of files for upload");
        HashMap<Integer, String> id_nkon_map = new HashMap<>();
        for (JsonNode node: jacksonObjectMapper.readTree(getName())) {
            id_nkon_map.put(node.get("id").asInt(), node.get("nkon").textValue());
        }
        for (GrCopLoader.FileItem fileItem : grCop.fileList) {
            fileItem.nvagNkon = id_nkon_map.get(fileItem.id);
        }
        Route route = getRouteDAO().getById(getSearch().getRouteId(), false);
        GrCopLoader.GrCop secondGrCop = new GrCopLoader().load(grCop, route, getUser().getUsr(), "cimsmgs".equalsIgnoreCase(getSearch().getDocType()) ? DocType.CIMSMGS : DocType.SMGS);
        session.remove(UPLOAD_GRAF);
        setJSONData(Constants.convert2JSON_True());

        return SUCCESS;
    }

    public String uploadDoc9() throws Exception {
        log.info("uploadDoc9");
        ArrayList<String> res = new PrilDocLoader().load(getHid_cs(), cimSmgsDoc, new FileInputStream(fileData));

        setJSONData(res.isEmpty() ? Constants.convert2JSON_True() : Constants.convert2JSONUploadDoc9Result(defaultSerializer.write(res)));

        return SUCCESS;
    }

    /**
     * Добляем в документы относящиеся к выбраннм поездам данные из выбранного шаблона
     * @return ответ
     */
    public String avisoXsmgses() throws IllegalAccessException {
        List<CimSmgs> smgses= new ArrayList<>();
        List<String> errors= new ArrayList<>();
        CimSmgs aviso;
        String[] trainList = getQuery().split(",");
        aviso=getSmgsDAO().getById(getSearch().getHid(),false);
        if(checkAvisoXcombineSmgs(aviso)) {
            switch (getName()) {
                // checking processing stile
                case "trainlist": {
                    // получаем список по списку поездов
                    smgses = findAllSmgsesByTrains(trainList);

                }
                break;
                case "smgslist": {
                    String[] strHidList = getQuery().split(",");
                    List<Long>hids = new ArrayList<>();
                    for (String hidSTR : strHidList) {
                        hids.add(Long.parseLong(hidSTR.trim()));
                    }
                    // получаем список по списку hid-ов
                    smgses=getSmgsDAO().findByIds(hids);
                }
            }
            combineSmgsListXAviso(smgses, aviso,errors);
            for (CimSmgs smgs : smgses) {
                getSmgsDAO().makePersistent(smgs);
            }
            setJSONData(Constants.convert2JSON_True(String.valueOf(smgses.size()-errors.size()),errors));
        }
        else
        {
            setJSONData(Constants.convert2JSON_False());
        }
        return SUCCESS;
    }

    /**
     * Проверяет удволяет ли шаблон требуемым критериям, а именно, количество вагонов/контейнеров/грузов
     * в шаблоне не должно превышать 1
     * @param aviso шаблон
     * @return результат проверки
     */
    private boolean checkAvisoXcombineSmgs(CimSmgs aviso)
    {
        Map<Byte,CimSmgsCarList> carLists=aviso.getCimSmgsCarLists();
        if(carLists.size()>1)
            return false;
        if(carLists.size()>0)
        {
            if(aviso.isContOtpr())
            {
                Map<Byte,CimSmgsKonList>konLists=carLists.values().iterator().next().getCimSmgsKonLists();
                if(konLists.size()>2)
                    return false;
                if(konLists.size()>0)
                {
                    Map<Integer,CimSmgsGruz> smgsGruzs= konLists.values().iterator().next().getCimSmgsGruzs();
                    if(smgsGruzs.size()>2)
                        return false;
                }
            }
            else
            {
                Map<Integer,CimSmgsGruz> smgsGruzs=carLists.values().iterator().next().getCimSmgsGruzs();
                if(smgsGruzs.size()>2)
                    return false;
            }
        }
        return true;
    }

    /**
     * Объединяет все полоя документов из списка  и шаблона
     * @param cimSmgs список документов
     * @param aviso шаблон
     * @param errors список ошибок
     * @throws IllegalAccessException
     */
    public void combineSmgsListXAviso(List<CimSmgs> cimSmgs, CimSmgs aviso,List<String> errors) throws IllegalAccessException {
        for (CimSmgs smgs:cimSmgs) {
            if(aviso.isContOtpr()==smgs.isContOtpr())
                combineSmgsXAviso(smgs,aviso);
            else
            {
                errors.add(smgs.getHid().toString());
            }
        }
    }

    /**
     * Объединяет все полоя документа и шаблона
     * @param cimSmgs документ
     * @param aviso шаблон
     * @throws IllegalAccessException
     */
    private void combineSmgsXAviso(CimSmgs cimSmgs, CimSmgs aviso) throws IllegalAccessException {
        Field[] fields = Aviso2CimSmgsDTO.class.getDeclaredFields();
        ArrayList<Field>[] allFields =new ArrayList[80];
        boolean copyFlag;
        for (Field field : fields) {
            if (field.isAnnotationPresent(DocCH.class)) {
                DocCH annotation = field.getAnnotation(DocCH.class);
                if(StringUtils.isNumeric(annotation.ch()))
                {
                    if(allFields[Integer.parseInt(annotation.ch())]==null)
                        allFields[Integer.parseInt(annotation.ch())]=new ArrayList<>();
                    allFields[Integer.parseInt(annotation.ch())].add(field);
                }
            }
        }
        // Копируем значения из шаблона в документ
        for (ArrayList<Field> list: allFields ) {
            if(list!=null)
            {
                copyFlag=false;
                for (Field field:list) {
                    if(FieldUtils.readDeclaredField(aviso,field.getName(),true)!=null)
                    {
                        copyFlag=true;break;
                    }
                }
                if(copyFlag)
                {
                    for (Field field:list) {
                        Object val=FieldUtils.readDeclaredField(aviso,field.getName(),true);
                        FieldUtils.writeDeclaredField(cimSmgs,field.getName(),val,true);
                    }
                }
            }
        }
        //объяединяем данные о пломбах
        avisoXsmgsPlombs(cimSmgs, aviso);
        // объяединяем объекта вагон/контейнер/груз
        avisoXsmgsWagContCargo(cimSmgs, aviso);
        //объяединяем данные о перевозчиках
        avisoXsmgsPerevoz(cimSmgs, aviso);
        //объяединяем данные о плательщиках
        avisoXsmgsPlatel(cimSmgs, aviso);
        //объяединяем данные о станциях
        avisoXsmgsDocses13(cimSmgs,aviso);
        //объяединяем данные о приложенных документах
        avisoXsmgsDocses9(cimSmgs,aviso);
    }

    /**
     * Объединяет вагон/контейнер/груз шаблона и документа.
     * @param cimSmgs документ
     * @param aviso шаблон
     */
    private void avisoXsmgsWagContCargo(CimSmgs cimSmgs, CimSmgs aviso)
    {
        boolean copyFlag;
        // заполнение объекта вагон/контейнер/груз
        if(aviso.getCimSmgsCarLists()!=null&&!aviso.getCimSmgsCarLists().isEmpty()) {
            // считываем вагон из шаблона, если он вообще существует
            CimSmgsCarList carList = aviso.getCimSmgsCarLists().values().iterator().next();
            copyFlag = carList.getNvag()!= null || carList.getVagOtm()!= null || carList.getGrPod() != null || carList.getTaraVag() != null
                    || carList.getKolOs() != null || !carList.getKlientName().isEmpty() || carList.getRod()!= null;
            //заполняем данные о вагоне
            if (copyFlag) {
                Map<Byte,CimSmgsCarList> cimSmgsCarLists=cimSmgs.getCimSmgsCarLists();
                if(cimSmgsCarLists.size()==0) //проверяем есть ли вагоны в документе, если нет создаем
                {
                    CimSmgsCarList carListNew = new CimSmgsCarList();
                    carListNew.setCimSmgs(cimSmgs);
                    carListNew.setSort((byte) 0);
                    cimSmgsCarLists.put((byte) 0,carListNew);
                }
                //заполняем данные о вагоне из шаблона
                for (CimSmgsCarList smgsCarList : cimSmgsCarLists.values()) {
                    if(carList.getNvag()!=null&&!carList.getNvag().isEmpty())
                        smgsCarList.setNvag(carList.getNvag());
                    smgsCarList.setVagOtm(carList.getVagOtm());
                    smgsCarList.setGrPod(carList.getGrPod());
                    smgsCarList.setTaraVag(carList.getTaraVag());
                    smgsCarList.setKolOs(carList.getKolOs());
                    smgsCarList.setKlientName(carList.getKlientName());
                    smgsCarList.setRod(carList.getRod());
                }
            }
            if(aviso.isContOtpr())
            {
                if(carList.getCimSmgsKonLists().size()>0)
                {
                    CimSmgsKonList konList=carList.getCimSmgsKonLists().values().iterator().next();
                    copyFlag=konList.getUtiN()!= null||konList.getSizeFoot()!=null||konList.getTaraKont()!=null||konList.getUtiType()!= null||konList.getGrpod()!=null;
                    //заполняем данные о контейнере
                    if(copyFlag)
                    for (CimSmgsCarList smgsCarList: cimSmgs.getCimSmgsCarLists().values()) {
                        //проверяем есть ли контейнры в документе, если нет создаем
                        if(smgsCarList.getCimSmgsKonLists().size()==0)
                        {
                            CimSmgsKonList konListNew = new CimSmgsKonList();
                            konListNew.setSort((byte) 0);
                            konListNew.setCimSmgsCarList(smgsCarList);
                            smgsCarList.getCimSmgsKonLists().put((byte) 0,konListNew);
                        }
                        for (CimSmgsKonList smgsKonList:smgsCarList.getCimSmgsKonLists().values()) {
                            //заполняем данные о вагоне из шаблона
                            if(konList.getUtiN()!=null&&!konList.getUtiN().isEmpty())
                                smgsKonList.setUtiN(konList.getUtiN());
                            smgsKonList.setSizeFoot(konList.getSizeFoot());
                            smgsKonList.setTaraKont(konList.getTaraKont());
                            smgsKonList.setUtiType(konList.getUtiType());
                            smgsKonList.setGrpod(konList.getGrpod());
                            if(konList.getCimSmgsGruzs().size()>0)
                            {
                                CimSmgsGruz smgsGruz=konList.getCimSmgsGruzs().values().iterator().next();
                                copyFlag=(smgsGruz.getKgvn()!=null&&!smgsGruz.getKgvn().isEmpty())||
                                        (smgsGruz.getNzgr()!=null&&!smgsGruz.getNzgr().isEmpty())||
                                        (smgsGruz.getNzgrEu()!=null&&!smgsGruz.getNzgrEu().isEmpty())||
                                        (smgsGruz.getEkgvn()!=null&&!smgsGruz.getEkgvn().isEmpty()) ||
                                        (smgsGruz.getEnzgr()!=null&&!smgsGruz.getEnzgr().isEmpty())||
                                        smgsGruz.getMassa()!=null||
                                        (smgsGruz.getUpak()!=null&&!smgsGruz.getUpak().isEmpty())||
                                        smgsGruz.getPlaces()!=null;
                                if(copyFlag) {
                                    //проверяем есть ли груз в документе, если нет создаем
                                    if(smgsKonList.getCimSmgsGruzs().size()==0)
                                    {
                                        CimSmgsGruz gruzNew= new CimSmgsGruz();
                                        gruzNew.setCimSmgsKonList(smgsKonList);
                                        gruzNew.setSort(0);
                                        smgsKonList.getCimSmgsGruzs().put(0,gruzNew);
                                        smgsCarList.getCimSmgsGruzs().put(0,gruzNew);
                                    }
                                    //заполняем данные о грузе из шаблона
                                    for (CimSmgsGruz cimSmgsGruz : smgsKonList.getCimSmgsGruzs().values()) {
                                        smgsGruz.copy2another(cimSmgsGruz);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                if(carList.getCimSmgsGruzs().size()>0) {
                    CimSmgsGruz smgsGruz = carList.getCimSmgsGruzs().values().iterator().next();
                    copyFlag = !smgsGruz.getKgvn().isEmpty() || !smgsGruz.getNzgr().isEmpty() || !smgsGruz.getNzgrEu().isEmpty() || !smgsGruz.getEkgvn().isEmpty()
                            || !smgsGruz.getEnzgr().isEmpty() || smgsGruz.getMassa() != null || !smgsGruz.getUpak().isEmpty() || smgsGruz.getPlaces() != null;
                    if(copyFlag) {
                        //проверяем есть ли груз в документе, если нет создаем
                        if(carList.getCimSmgsGruzs().size()==0)
                        {
                            CimSmgsGruz gruzNew= new CimSmgsGruz();
                            gruzNew.setCimSmgsCarList(carList);
                            gruzNew.setSort(0);
                            carList.getCimSmgsGruzs().put(0,gruzNew);
                        }
                        //заполняем данные о грузе из шаблона
                        for (CimSmgsGruz cimSmgsGruz : carList.getCimSmgsGruzs().values()) {
                            smgsGruz.copy2another(cimSmgsGruz);
                        }
                    }
                }
            }
        }
    }
    /**
     * Объединяет пломбы шаблона и документа.
     * @param cimSmgs документ
     * @param aviso шаблон
     */
    private void avisoXsmgsPlombs(CimSmgs cimSmgs, CimSmgs aviso)
    {
        if(cimSmgs.getCimSmgsCarLists().size()>0&&aviso.getCimSmgsCarLists().size()>0) {
            CimSmgsCarList carList = aviso.getCimSmgsCarLists().values().iterator().next();
            if (aviso.isContOtpr()) { //вагонная или контейнерная перевозка
                if (aviso.getCimSmgsPlombs().size()>0 && !carList.getCimSmgsKonLists().isEmpty()) {
                    // считываем контейнер из шаблона, если он вообще существует
                    CimSmgsKonList konList = carList.getCimSmgsKonLists().values().iterator().next();
                    // заполняем пломбы
                    for (CimSmgsCarList smgsCarList : cimSmgs.getCimSmgsCarLists().values()) {
                        smgsCarList.getCimSmgsPlombs().clear();
                        for (CimSmgsKonList cimSmgsKonList : smgsCarList.getCimSmgsKonLists().values()) {
                            Map<Byte,CimSmgsPlomb> plombsKon=cimSmgsKonList.getCimSmgsPlombs();
                            plombsKon.clear();
                            cimSmgs.getCimSmgsPlombs().clear();
                            for (CimSmgsPlomb plomb : konList.getCimSmgsPlombs().values()) {
                                CimSmgsPlomb cimSmgsPlomb = plomb.makeCopy();
                                cimSmgsPlomb.setCimSmgsKonList(cimSmgsKonList);
                                cimSmgs.addPlomb(cimSmgsPlomb);
                            }
                        }
                    }
                }
            }
            else {
                // заполняем пломбы
                if (aviso.getCimSmgsPlombs().size() > 0) {
                    for (CimSmgsCarList smgsCarList : cimSmgs.getCimSmgsCarLists().values()) {
                        Map<Byte,CimSmgsPlomb> plombsCar=smgsCarList.getCimSmgsPlombs();
                        plombsCar.clear();
                        cimSmgs.getCimSmgsPlombs().clear();
                        for (CimSmgsPlomb plomb : carList.getCimSmgsPlombs().values()) {
                            CimSmgsPlomb cimSmgsPlomb = plomb.makeCopy();
                            cimSmgsPlomb.setCimSmgsCarList(smgsCarList);
                            cimSmgs.addPlomb(cimSmgsPlomb);
                        }
                    }
                }
            }
        }
    }

    /**
     * Объединяет перевозчиков шаблона и документа.
     * @param cimSmgs документ
     * @param aviso шаблон
     */
    public void avisoXsmgsPerevoz(CimSmgs cimSmgs, CimSmgs aviso)
    {
        Map<Byte,CimSmgsPerevoz> cimSmgsPerevozMap = cimSmgs.getCimSmgsPerevoz();

        if(aviso.getCimSmgsPerevoz().size()>0)
            cimSmgsPerevozMap.clear();

        for (CimSmgsPerevoz perevoz:aviso.getCimSmgsPerevoz().values()) {
            CimSmgsPerevoz cimSmgsPerevoz = perevoz.makeCopy();
            cimSmgsPerevoz.setCimSmgs(cimSmgs);
            cimSmgsPerevoz.setSort((byte) cimSmgsPerevozMap.size());
            cimSmgsPerevozMap.put((byte) cimSmgsPerevozMap.size(),cimSmgsPerevoz);
        }
    }
    /**
     * Объединяет Плательщиков шаблона и документа.
     * @param cimSmgs документ
     * @param aviso шаблон
     */
    public void avisoXsmgsPlatel(CimSmgs cimSmgs, CimSmgs aviso)
    {
        Map<Byte,CimSmgsPlatel> cimSmgsPlatelMap =cimSmgs.getCimSmgsPlatels();
        if(aviso.getCimSmgsPlatels().size()>0)
            cimSmgsPlatelMap.clear();

        for (CimSmgsPlatel platel:aviso.getCimSmgsPlatels().values()) {
            CimSmgsPlatel cimSmgsPlatel =platel.makeCopy();
            cimSmgsPlatel.setCimSmgs(cimSmgs);
            cimSmgsPlatel.setSort((byte) cimSmgsPlatelMap.size());
            cimSmgsPlatelMap.put((byte) cimSmgsPlatelMap.size(),cimSmgsPlatel);
        }
    }

    /**
     * Объединяет Пограничные Станции перехода шаблона и документа.
     * @param cimSmgs документ
     * @param aviso шаблон
     */
    public void avisoXsmgsDocses13(CimSmgs cimSmgs, CimSmgs aviso) {

        Map<Integer,CimSmgsDocs> cimSmgsDocsesMap13= cimSmgs.getCimSmgsDocses13();
        Map<Integer,CimSmgsDocs> avisoSmgsDocsesMap13= aviso.getCimSmgsDocses13();

        if(avisoSmgsDocsesMap13.size()>0)
            cimSmgsDocsesMap13.clear();

        for (CimSmgsDocs docs:avisoSmgsDocsesMap13.values()) {
            CimSmgsDocs cimSmgsDocs = docs.makeCopy();
            cimSmgsDocs.setFieldNum("13");
            cimSmgsDocs.setCimSmgs(cimSmgs);
            cimSmgsDocs.setSort(cimSmgsDocsesMap13.size());

            cimSmgsDocsesMap13.put(cimSmgsDocsesMap13.size(),cimSmgsDocs);
        }
    }

    /**
     * Объединяет Приложенные документы  шаблона и документа.
     * @param cimSmgs документ
     * @param aviso шаблон
     */
    public void avisoXsmgsDocses9(CimSmgs cimSmgs, CimSmgs aviso)
    {
        Map<Integer,CimSmgsDocs> avisoDocsesMap9=aviso.getCimSmgsDocses9();

        if(avisoDocsesMap9.size()<1)
            return;
        Map<Integer,CimSmgsDocs> cimSmgsDocses9MapCimSmgs=cimSmgs.getCimSmgsDocses9();
        cimSmgsDocses9MapCimSmgs.clear();
        for (CimSmgsCarList cimSmgsCarList:cimSmgs.getCimSmgsCarLists().values()) {
            if (cimSmgs.isContOtpr()) {
                for (CimSmgsKonList cimSmgsKonList:cimSmgsCarList.getCimSmgsKonLists().values()) {
                    Map<Integer,CimSmgsDocs> cimSmgsDocses9Map=cimSmgsKonList.getCimSmgsDocses9();
                    cimSmgsDocses9Map.clear();
                    for (CimSmgsDocs smgsDocs:avisoDocsesMap9.values()) {
                        CimSmgsDocs cimSmgsDocs = smgsDocs.makeCopy();
                        cimSmgsDocs.setCimSmgs(cimSmgs);
                        cimSmgsDocs.setCimSmgsKonList(cimSmgsKonList);
                        cimSmgsDocs.setFieldNum("9");
                        cimSmgsDocs.setSort(cimSmgsDocses9Map.size());
                        cimSmgsDocses9Map.put(cimSmgsDocses9Map.size(),cimSmgsDocs);
                        cimSmgsDocses9MapCimSmgs.put(cimSmgsDocses9MapCimSmgs.size(),cimSmgsDocs);
                    }
                }
            }
            else {
                Map<Integer,CimSmgsDocs> cimSmgsDocses9Map = cimSmgsCarList.getCimSmgsDocses9();
                cimSmgsDocses9Map.clear();
                for (CimSmgsDocs smgsDocs:avisoDocsesMap9.values()) {
                    CimSmgsDocs cimSmgsDocs = smgsDocs.makeCopy();
                    cimSmgsDocs.setCimSmgs(cimSmgs);
                    cimSmgsDocs.setCimSmgsCarList(cimSmgsCarList);
                    cimSmgsDocs.setFieldNum("9");
                    cimSmgsDocs.setSort(cimSmgsDocses9Map.size());
                    cimSmgsDocses9Map.put(cimSmgsDocses9Map.size(),cimSmgsDocs);
                    cimSmgsDocses9MapCimSmgs.put(cimSmgsDocses9MapCimSmgs.size(),cimSmgsDocs);
                }
            }
        }

    }

    /**
     * Метод принимает решение как обрабатывать загруженный XLS файл.
     * @return ответ
     * @throws Exception
     */
    public String uploadXLS() throws Exception {
        log.info("uploadXLS");

        ImportXLS importXLS =null;
        switch (getName())
        {
            //загружаем XLS вагонной перевозки
            case "uploadVagsXLS":{importXLS= new ImportXLSSmgs2Vag();}break;
            //загружаем XLS контейнерной перевозки
            case "uploadContsXLS":{importXLS=new ImportXLSSmgs2Cont();}break;
            // загружаем XLS c данными для генерации СМГС из шаблона
            case "aviso2smgsXLS":{importXLS = new ImportXlsSmgs();}break;
            // загружаем XLS c данными грузов для invoice
            case "uploadInvoiceXlsCargo":{importXLS = new ImportXLSInvoiceCargo();}break;
            // загружаем XLS c данными Invoice и грузов
            case "importInvoiceXls":{importXLS = new ImportXLSInvoice();}break;
        }
        if(importXLS!=null) {
            if (importXLS.init(new FileInputStream(fileData))) {

                switch (getName()) {
                    case "uploadVagsXLS"://обрабатываем XLS контейнерной/вагонной перевозки
                    case "uploadContsXLS": {
                        processXlsAndGetJsonResult(importXLS);
                    }break;

                    // Обрабатываем XLS c данными для генерации СМГС из шаблона
                    case "aviso2smgsXLS": {
                        processAviso2smgsXLS(importXLS);
                    }break;

                    // Обрабатываем XLS c данными для добавления грузов в Invoice
                    case "uploadInvoiceXlsCargo": {
                        processXlsAndGetJsonResult(importXLS);
                    }break;

                    // Обрабатываем XLS c данными для добавления Invoice и грузов
                    case "importInvoiceXls": {
                        processXlsAndAdd2DB(importXLS);
                    }break;
                }
            }
            else {
                setJSONData(Constants.convert2JSONUploadDoc9Result(defaultSerializer.write(importXLS.getErrors())));
            }
        }
        else
        {
            setJSONData(Constants.convert2JSONUploadDoc9Result(defaultSerializer.write("Wrong file process instruction:"+getName())));
        }
        return SUCCESS;
    }

    /**
     * Обрабатывает XLS файл и запсиывает данные в формате JSON в ответ
     * @param importXLS объект обработчик
     * @throws Exception
     */
    private void processXlsAndGetJsonResult(ImportXLS importXLS) throws Exception
    {
        ArrayList<?> result;
        result = importXLS.processSheet();
        if (importXLS.getErrors().size() < 2) {
            setJSONData("{success: true,'rows': "+defaultSerializer.write(result)+",'type':'"+getName()+"'}");
        }
        else {
            setJSONData(Constants.convert2JSONUploadDoc9Result(defaultSerializer.write(importXLS.getErrors())));
        }
    }

    /**
     * Обрабатывает XLS файл и запсиывает инвойсы и грузы в базу данных
     * @param importXLS объект обработчик
     * @throws Exception
     */
    private void processXlsAndAdd2DB(ImportXLS importXLS) throws Exception {
        InvoiceXlsContainer container= (InvoiceXlsContainer) importXLS.processSheet().get(0);
        List<String> hids= new ArrayList<>();
        PackDoc invPacDoc=null;
        if(getHid()!=null)
            invPacDoc=getPackDocDAO().findById(getHid(),false);

        if (importXLS.getErrors().size() < 2) {
            Map<String,CimSmgsInvoice> invoiceMap = new HashMap<>();
            for (InvoiceXls inv:container.getInvoicesCargo()) {
                CimSmgsInvoice invoice = invoiceMap.get(inv.getInvoiceNum());
                if(invoice==null)
                {
                    invoice= new CimSmgsInvoice();
                    invoice.setUn(getUser().getUsr().getUn());
                    invoice.setTrans(getUser().getUsr().getGroup().getName());
                    invoice.setUtiN(container.getContNum());
                    invoice.setInvoice(inv.getInvoiceNum());
                    invoice.setDat_inv(inv.getDate());
                    invoice.setRoute(getRouteDAO().getById(Long.valueOf(getQuery()),false));
                    invoiceMap.put(inv.getInvoiceNum()!=null?inv.getInvoiceNum():"",invoice);
                }
                CimSmgsInvoiceGruz gruz= new CimSmgsInvoiceGruz();
                gruz.setTnved(inv.getTnved());
                gruz.setNzgr(inv.getNzgr());
                gruz.setNzgrEn(inv.getNzgrEn());
                gruz.setKole(inv.getKole());
                gruz.setEizm(inv.getEizm());
                gruz.setMnet(inv.getMnet());
                gruz.setMbrt(inv.getMbrt());
                gruz.setItogo(inv.getItogo()!=null?inv.getItogo().toString():"");
                gruz.setKolm(inv.getKolm());
                gruz.setInvoice(invoice);
                invoice.getInvoiceGruzs().put((long) invoice.getInvoiceGruzs().size(),gruz);
            }
            for (CimSmgsInvoice invoice:invoiceMap.values()) {
                invoice.prepare4save();
                if(invPacDoc==null)
                {
                    PackDoc pack = new PackDoc(invoice.getRoute(), getUser().getUsr().getGroup());
                    pack.addInvoiceItem(invoice);
                    getPackDocDAO().makePersistent(invoice.getPackDoc());
                }
                else
                {
                    invPacDoc.addInvoiceItem(invoice);
                }
                hids.add(String.valueOf(invoice.getHid()));
            }

            setJSONData(convert2JSONUploadResult(defaultSerializer.write(hids),true));
            //setJSONData("{success: true}");
        }
        else {
            setJSONData(Constants.convert2JSONUploadDoc9Result(defaultSerializer.write(importXLS.getErrors())));
        }
    }

    /**
     * Обрабатывает данные из XLS файла и создает на их основе и  шаблона докуенты
     * @param importXLS объект-обработчик XLS файла
     * @throws Exception
     */
    private void processAviso2smgsXLS(ImportXLS importXLS) throws Exception {
        xlsList= importXLS.processSheet();
        if (importXLS.getErrors().size() < 2) {
            aviso2CimSmgs.convert(this);
            setJSONData(Constants.convert2JSON_True(aviso2CimSmgs.getResultMsg()));
        }
    }

    /**
     * uploadPogruzList preparing data for processing Peregruzlist
     *
     * @return
     * @throws Exception
     */
    public String uploadPogruzList() throws Exception {

        log.info("uploadPogruzList");
//        ArrayList<String> res = new ArrayList<>();
        List<Long> smgsHIDs = makeSmgsHidsList();

//        if (getName() != null) {
//            Date date[] = new Date[2];
//            List<CimSmgs> smgses = new ArrayList<>();
//            switch (getName()) {
//                // checking processing stile
//                case "trainlist": {
//                    List<String> trainList = Arrays.asList(getQuery().split(","));
//                    // processing dates
//                    date = DataProcessingTools.parseDateString(getQuery1());
//                    setSearch(new Search());
//                    getSearch().setDate1(date[0]);
//                    getSearch().setDate2(date[1]);
//
//                    for (String train : trainList) {
//                        getSearch().setNpoezd(train);
//                        smgses.addAll(getSmgsDAO().findSmgsTrainDate(0, 0, getSearch(), getUser().getUsr()));
//                    }
//
//                    for (CimSmgs smgs : smgses) {
//                        smgsHIDs.add(smgs.getHid());
//                    }
//                }
//                break;
//                case "smgslist": {
//                    List<String> strHidList = Arrays.asList(getQuery().split(","));
//                    for (String hidSTR : strHidList) {
//                        smgsHIDs.add(Long.parseLong(hidSTR));
//                    }
//
//                }
//                break;
//                default: {
//                    smgsHIDs.add(getHid_cs());
//                }
//            }
//        }
        ImportXLSMapPogruz importXLSMapPogruz = new ImportXLSMapPogruz();

        ArrayList<MapPogruz> mapPogruzs = null;
        if (importXLSMapPogruz.init(new FileInputStream(fileData))) {
            mapPogruzs = importXLSMapPogruz.processSheet();
            if (importXLSMapPogruz.getErrors().size() < 2) {
                new PrilDocLoader().processMapPeregruz(smgsHIDs, mapPogruzs);
                setJSONData(Constants.convert2JSON_mapPogruz(mapPogruzs));
            }
            else {
                setJSONData(Constants.convert2JSONUploadDoc9Result(defaultSerializer.write(importXLSMapPogruz.getErrors())));
            }
        }
        else {
            setJSONData(Constants.convert2JSONUploadDoc9Result(defaultSerializer.write(importXLSMapPogruz.getErrors())));
        }
        //  res = new PrilDocLoader().processMapPeregruz2(smgsHIDs,mapPogruzs);
//
//        setJSONData(res.isEmpty() ? Constants.convert2JSON_True() : Constants.convert2JSONUploadDoc9Result(defaultSerializer.write(res)));

        return SUCCESS;
    }

    /**
     * Возвращает список ID документов по заданным критериям поиска
     * @return список ID документов
     */
    private List<Long> makeSmgsHidsList()
    {
        List<Long> smgsHIDs= new ArrayList<>();

        if (getName() != null) {
            Date[] date;
            List<CimSmgs> smgses = new ArrayList<>();
            switch (getName()) {
                // checking processing stile
                case "trainlist": {
                    String[] trainList = getQuery().split(",");
                    // processing dates
//                    date = DataProcessingTools.parseDateString(getQuery1());
//                    if(getSearch()==null)
//                        setSearch(new Search());
//                    getSearch().setDate1(date[0]);
//                    getSearch().setDate2(date[1]);

//                    for (String train : trainList) {
//                        getSearch().setNpoezd(train);
//                        smgses.addAll(getSmgsDAO().findSmgsTrainDate(0, 0, getSearch(), getUser().getUsr()));
//                    }
                    smgses=findAllSmgsesByTrains(trainList);

                    for (CimSmgs smgs : smgses) {
                        smgsHIDs.add(smgs.getHid());
                    }
                }
                break;
                case "smgslist": {
                    String[] strHidList = getQuery().split(",");
                    for (String hidSTR : strHidList) {
                        smgsHIDs.add(Long.parseLong(hidSTR));
                    }
                }
                break;
                default: {
                    smgsHIDs.add(getHid_cs());
                }
            }
        }
        return smgsHIDs;
    }

    private List<CimSmgs> findAllSmgsesByTrains(String[] trainList)
    {
        List<CimSmgs> smgses = new ArrayList<>();
        for (String train : trainList) {
            getSearch().setNpoezd(train);
            smgses.addAll(getSmgsDAO().findSmgsTrainDate(0, 0, getSearch(), getUser().getUsr()));
        }

        return smgses;
    }

    /**
     * uploadPeregruz2BaseList receives back and process map pogruz.
     *
     * @return response
     * @throws Exception
     */
    public String uploadPeregruz2BaseList() throws Exception {

        List<MapPogruz> list = DataProcessingTools.DeserializeMapPeregruz(getServletRequest().getParameter("jsonData"), jacksonObjectMapper);
        if (list != null) {
//            setJSONData(Constants.convert2JSONUploadDoc9Result( list.toString()));
            ArrayList<String> res=new PrilDocLoader().processPeregruz2BaseList(list);
            StringBuilder builder= new StringBuilder();
            for (String s:res) {
                builder.append(s);
            }
            setJSONData(Constants.convert2JSON_True(builder.length()>0?builder.toString():"Ok"));
        }
        else {
            setJSONData(Constants.convert2JSONUploadDoc9Result(defaultSerializer.write("Error during data precessing!")));
        }

        return SUCCESS;
    }

    private CimSmgsDocs cimSmgsDoc;
    private List<String> packIds;
    private List<Long> smgsIds;
    private BigDecimal docIdTo;
    private BigDecimal docIdFrom;
    private Doc2DocTemplatesDAO doc2DocTemplDao;
    /*private DocDirDAO docDirDAO;*/
    private SmgsDAO smgsDAO;
    private InvoiceDAO invoiceDAO;
    private Doc2docTemplates doc2docTempl;
    private File fileData;
    private String contentType;
    private String filename;
    private HttpServletRequest request;
    private CimSmgs smgs;
    private ArrayList<CimSmgs> smgsy;
    private Byte typeFrom;
    private Byte typeTo;
    private String groupBy;
    private String poezdNum;
    private Serializer defaultSerializer;

    private List<File> fileUpload = new ArrayList<>();
    private List<String> fileUploadContentType = new ArrayList<>();
    private List<String> fileUploadFileName = new ArrayList<>();

    public String getPoezdNum() {
        return poezdNum;
    }

    public void setPoezdNum(String poezdNum) {
        this.poezdNum = poezdNum;
    }

    public List<File> getFileUpload() {
        return fileUpload;
    }

    public void setFileUpload(List<File> fileUpload) {
        this.fileUpload = fileUpload;
    }

    public List<String> getFileUploadContentType() {
        return fileUploadContentType;
    }

    public void setFileUploadContentType(List<String> fileUploadContentType) {
        this.fileUploadContentType = fileUploadContentType;
    }

    public List<String> getFileUploadFileName() {
        return fileUploadFileName;
    }

    public void setFileUploadFileName(List<String> fileUploadFileName) {
        this.fileUploadFileName = fileUploadFileName;
    }

    public String getEncodedFileName() throws UnsupportedEncodingException {
        String user_agent = request.getHeader("user-agent");
        boolean isIE = (user_agent.indexOf("MSIE") > -1);
        if (isIE) {
            return URLEncoder.encode(filename, "utf-8");
        } else {
            return MimeUtility.encodeWord(filename);
        }
    }

    public void setUpload(File file) {
        this.fileData = file;
    }

    public File getUpload() {
        return this.fileData;
    }

    public void setUploadContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getUploadContentType() {
        return this.contentType;
    }

    public void setUploadFileName(String filename) {
        this.filename = filename;
    }

    public String getUploadFileName() {
        return this.filename;
    }


    public List<String> getPackIds() {
        return packIds;
    }

    public void setPackIds(List<String> packIds) {
        this.packIds = packIds;
    }

    public BigDecimal getDocIdTo() {
        return docIdTo;
    }

    public void setDocIdTo(BigDecimal docIdTo) {
        this.docIdTo = docIdTo;
    }

    public BigDecimal getDocIdFrom() {
        return docIdFrom;
    }

    public void setDocIdFrom(BigDecimal docIdFrom) {
        this.docIdFrom = docIdFrom;
    }

    public Doc2DocTemplatesDAO getDoc2DocTemplDao() {
        return doc2DocTemplDao;
    }

    public void setDoc2DocTemplatesDAO(Doc2DocTemplatesDAO dao) {
        doc2DocTemplDao = dao;
    }

   /* @Override
    public void setDocDirDAO(DocDirDAO dao) {
        docDirDAO = dao;
    }*/

    public void setServletRequest(HttpServletRequest request) {
        this.request = request;
    }

    public HttpServletRequest getServletRequest() {
        return request;
    }

    public List<Long> getSmgsIds() {
        return smgsIds;
    }

    public void setSmgsIds(List<Long> smgsIds) {
        this.smgsIds = smgsIds;
    }

    public void setSmgsDAO(SmgsDAO dao) {
        smgsDAO = dao;
    }

    public SmgsDAO getSmgsDAO() {
        return smgsDAO;
    }

    public void setInvoiceDAO(InvoiceDAO dao) {
        invoiceDAO = dao;
    }

    public InvoiceDAO getInvoiceDAO() {
        return invoiceDAO;
    }

    public CimSmgs getSmgs() {
        return smgs;
    }

    public void setSmgs(CimSmgs smgs) {
        this.smgs = smgs;
    }

    public ArrayList<CimSmgs> getSmgsy() {
        return smgsy;
    }

    public void setSmgsy(ArrayList<CimSmgs> smgsy) {
        this.smgsy = smgsy;
    }

    public Byte getTypeFrom() {
        return typeFrom;
    }

    public void setTypeFrom(Byte typeFrom) {
        this.typeFrom = typeFrom;
    }

    public Byte getTypeTo() {
        return typeTo;
    }

    public void setTypeTo(Byte typeTo) {
        this.typeTo = typeTo;
    }

    public String getGroupBy() {
        return groupBy;
    }

    public void setGroupBy(String groupBy) {
        this.groupBy = groupBy;
    }

    /*public String getClassPathPrefix() {
        return classPathPrefix;
    }

    public void setClassPathPrefix(String classPathPrefix) {
        this.classPathPrefix = classPathPrefix;
    }*/

    public Doc2Doc getAviso2SmgsGu() {
        return aviso2SmgsGu;
    }

    public void setAviso2SmgsGu(Doc2Doc aviso2SmgsGu) {
        this.aviso2SmgsGu = aviso2SmgsGu;
    }

    public Doc2Doc getSmgs2Invoice() {
        return smgs2Invoice;
    }

    public void setSmgs2Invoice(Doc2Doc smgs2Invoice) {
        this.smgs2Invoice = smgs2Invoice;
    }

    public Doc2Doc getFile2SmgsInvoice() {
        return file2SmgsInvoice;
    }

    public void setFile2SmgsInvoice(Doc2Doc file2SmgsInvoice) {
        this.file2SmgsInvoice = file2SmgsInvoice;
    }

    public Doc2Doc getAviso2SmgsAppend() {
        return aviso2SmgsAppend;
    }

    public void setAviso2SmgsAppend(Doc2Doc aviso2SmgsAppend) {
        this.aviso2SmgsAppend = aviso2SmgsAppend;
    }

    @Override
    public void setServletResponse(HttpServletResponse httpServletResponse) {
        servletResponse = httpServletResponse;
    }

    @Override
    public void setSession(Map<String, Object> stringObjectMap) {
        session = stringObjectMap;
    }

    public HttpServletResponse getServletResponse() {
        return servletResponse;
    }

    public Map<String, Object> getSession() {
        return session;
    }

    public Doc2Doc getSmgs2ExcelContList_pl() {
        return smgs2ExcelContList_pl;
    }

    public void setSmgs2ExcelContList_pl(Doc2Doc smgs2ExcelContList_pl) {
        this.smgs2ExcelContList_pl = smgs2ExcelContList_pl;
    }

    public Doc2Doc getSmgs2Smgs4ContList() {
        return smgs2Smgs4ContList;
    }

    public void setSmgs2Smgs4ContList(Doc2Doc smgs2Smgs4ContList) {
        this.smgs2Smgs4ContList = smgs2Smgs4ContList;
    }

    public Doc2Doc getCimSmgs2ExcelContList_de() {
        return cimSmgs2ExcelContList_de;
    }

    public void setCimSmgs2ExcelContList_de(Doc2Doc cimSmgs2ExcelContList_de) {
        this.cimSmgs2ExcelContList_de = cimSmgs2ExcelContList_de;
    }

    public Doc2Doc getCimSmgs2CimSmgs4ContList() {
        return cimSmgs2CimSmgs4ContList;
    }

    public void setCimSmgs2CimSmgs4ContList(Doc2Doc cimSmgs2CimSmgs4ContList) {
        this.cimSmgs2CimSmgs4ContList = cimSmgs2CimSmgs4ContList;
    }

    public Doc2Doc getCimSmgs2ExcelDopList_de() {
        return cimSmgs2ExcelDopList_de;
    }

    public void setCimSmgs2ExcelDopList_de(Doc2Doc cimSmgs2ExcelDopList_de) {
        this.cimSmgs2ExcelDopList_de = cimSmgs2ExcelDopList_de;
    }

    public CimSmgsDocs getCimSmgsDoc() {
        return cimSmgsDoc;
    }

    public void setCimSmgsDoc(CimSmgsDocs cimSmgsDoc) {
        this.cimSmgsDoc = cimSmgsDoc;
    }

    public void setDefaultSerializer(Serializer defaultSerializer) {
        this.defaultSerializer = defaultSerializer;
    }

    public Doc2Doc getAviso2CimSmgs() {
        return aviso2CimSmgs;
    }

    public Doc2Doc getSmgs2ExcelContList() {
        return smgs2ExcelContList;
    }

    public Doc2Doc getSmgs2ExcelVagList() {
        return smgs2ExcelVagList;
    }

    public void setSmgs2ExcelContList(Doc2Doc smgs2ExcelContList) {
        this.smgs2ExcelContList = smgs2ExcelContList;
    }

    public void setSmgs2ExcelVagList(Doc2Doc smgs2ExcelVagList) {
        this.smgs2ExcelVagList = smgs2ExcelVagList;
    }

    public Doc2Doc getExcelTpls() {
        return excelTpls;
    }

    public void setExcelTpls(Doc2Doc excelTpls) {
        this.excelTpls = excelTpls;
    }

    public ArrayList<? extends XlsDefaultModel> getXlsList() {
        return xlsList;
    }

    public Doc2Doc getInvoiceSpecs() {
        return invoiceSpecs;
    }

    public void setInvoiceSpecs(Doc2Doc invoiceSpecs) {
        this.invoiceSpecs = invoiceSpecs;
    }
}
