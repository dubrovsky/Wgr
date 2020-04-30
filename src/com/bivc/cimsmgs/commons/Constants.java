package com.bivc.cimsmgs.commons;

import Ti.model.excel.MapPogruz;
import com.bivc.cimsmgs.actions.exchange.Tdg_A;
import com.bivc.cimsmgs.dao.UsrDAO;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.db.nsi.*;
import com.bivc.cimsmgs.dto.CimSmgsTrainDateDTO;
import com.bivc.cimsmgs.exchange.GrCopLoader;
import eu.bitwalker.useragentutils.UserAgent;
import org.apache.commons.beanutils.BeanPredicate;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.beanutils.PropertyUtilsBean;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.PredicateUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static com.bivc.cimsmgs.dao.hibernate.SmgsDAOHib.DAY_IN_MS;
import static com.bivc.cimsmgs.dao.hibernate.SmgsDAOHib.DUPLICATE_PERIOD;

public class Constants {
    public static final String ERROR_MESSAGES_NOT_LOADED = "";
    public static final String ERROR_DATABASE_MISSING = "error.database.missing";
    public static final String ERROR_FIELDVALUE_STRINGLENGTH1 = "error.fieldvalue.stringlength1";
    public static final String ERROR_FIELDVALUE_EXISTS = "error.fieldvalue.exists";
    public static final String ERROR_FIELDVALUE_NOTEXISTS = "error.fieldvalue.notexists";
    public static final String CREATE = "create";
    public static final String EDIT = "edit";
    public static final String DELETE = "delete";
    public static final String SAVE = "save";
    public static final String PRINT = "print";
    public static final String CANCEL = "cancel";
    public static final String BACK = "back";
    public static final String ASC = "asc";
    public static final String DESC = "desc";

    final static private Logger log = LoggerFactory.getLogger(Constants.class);

    /*public static BigDecimal buildDoctype(byte type) {
        switch (type) {
            case 3:
                return new BigDecimal(3);
            case 6:
                return new BigDecimal(20);
            case 7:
                return new BigDecimal(21);
            case 1:
                return new BigDecimal(4);
            case 5:
                return new BigDecimal(23);
            case 0:
                return new BigDecimal(0);
            case 8:
                return new BigDecimal(25);
            case 4:
                return new BigDecimal(10);
            case 2:
                return new BigDecimal(1);
            case 9:
                return new BigDecimal(26);
            case -2:
                return new BigDecimal(2);   // invoice
            default:
                return new BigDecimal(-1);

        }
    }*/

   /* public static String buildDocName(byte type) {
        switch (type) {
            case 3:
                return "Инструкция СМГС";
            case 6:
                return "Инструкция ГУ";
            case 7:
                return "CIM";
            case 1:
                return "ЦИМ/СМГС";
            case 5:
                return "CMR";
            case 0:
                return "ЭПД";
            case 8:
                return "ГУ-27в";
            case 4:
                return "ГУ-29K";
            case 2:
                return "СМГС";
            case 9:
                return "СМГС Новороссийск";
            case -2:
                return "Инвойс";
            default:
                return "Документ";

        }
    }*/

    public static String convert2JSON_CimSmgsList(List<CimSmgs> data, Long total, myUser usr) throws IllegalAccessException,
            InvocationTargetException, NoSuchMethodException {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");
            for (CimSmgs elem : data) {
                buffer.append("{");
                buffer.append("dattr:'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));
                buffer.append("',altered:'");
                buffer.append(elem.getAltered() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getAltered()));
                buffer.append("',un:'");
                buffer.append(elem.getUn());

                buffer.append("',numClaim:'");
                buffer.append(javascriptString(elem.getG694()));
                buffer.append("',vags:'");
                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                    if(vag.isCarDuplicates()&&((new Date().getTime()-elem.getDattr().getTime())<DUPLICATE_PERIOD*DAY_IN_MS))
                        buffer.append("<font color=\"violet\">"+javascriptString(vag.getNvag()+"</font>"));
                    else
                        buffer.append(javascriptString(vag.getNvag()));
                    buffer.append("<br/>");
                }

                buffer.append("',vagVedNum:'");
                buffer.append(javascriptString(elem.getVagVedNum()));
                buffer.append("',g281:'");
                buffer.append(elem.getG281() == null ? "" : new SimpleDateFormat("dd.MM.yyyy").format(elem.getG281()));
                buffer.append("',status:");
                buffer.append(elem.getStatus() != null ? elem.getStatus() : "''");
                buffer.append(",greenRail:");
                buffer.append(elem.getFtsStatus() != null ? elem.getFtsStatus() : "0");
                buffer.append(",btlc:");
                buffer.append(elem.getBtlc_status() != null ? elem.getBtlc_status() : "0");
                buffer.append(",tdgFts:");
                buffer.append(elem.getTdg_status1() != null ? elem.getTdg_status1() : "0");

                resolveTdgStatus(usr, buffer, elem);

                if(usr.hasPrivileg("CIM_IFTMIN")){
                    buffer.append(",iftmin:'");
                    if (elem.getIftminOut() != null) {
                        if (elem.getIftminLogs() != null && elem.getIftminLogs().size() > 0) {
                            buffer.append("Iftmin");
                            BIftminLog iftmin = elem.getIftminLogs().iterator().next(); // записей быть много
                            if (iftmin.getBContrls() != null && iftmin.getBContrls().size() > 0) {
                                buffer.append(",Contrl");
                                Contrl contrl = iftmin.getBContrls().iterator().next();
                                buffer.append(contrl.getError().equals("1") ? "+" : "-");
                            }
                            if (iftmin.getBAperak() != null && iftmin.getBAperak().size() > 0) {
                                buffer.append(",Aperak");
                            }
                        }
                        if (elem.getCsComnt() != null && elem.getCsComnt().size() > 0) {
                            buffer.append(",Comnt");
                            buffer.append(elem.getCsComnt().iterator().next().hasDetail() ? "-" : "+");
                        }
                    }
                    buffer.append("'");
                }

                if(usr.hasPrivileg("CIM_BTLC")){
                    buffer.append(",iftminBtlc:'");
                    if (elem.getIftminOut2() != null) {
                        if (elem.getIftminLogsBtlc() != null && elem.getIftminLogsBtlc().size() > 0) {

                            buffer.append("Iftmin");
                            BIftminLog iftmin = elem.getIftminLogsBtlc().iterator().next(); // записей быть много
                            if (iftmin.getBContrls() != null && iftmin.getBContrls().size() > 0) {
                                buffer.append(",Contrl");
                                Contrl contrl = iftmin.getBContrls().iterator().next();
                                buffer.append(contrl.getError().equals("1") ? "+" : "-");
                            }
                            if (iftmin.getBAperak() != null && iftmin.getBAperak().size() > 0) {
                                buffer.append(",Aperak");
                            }
                        }
                        if (elem.getCsComnt() != null && elem.getCsComnt().size() > 0) {
                            buffer.append(",Comnt");
                            buffer.append(elem.getCsComnt().iterator().next().hasDetail() ? "-" : "+");
                        }
                    }
                    buffer.append("'");
                }

                buffer.append(",g1:'");
                buffer.append(javascriptString(elem.getG1r()));
                buffer.append("',g4:'");
                buffer.append(javascriptString(elem.getG4r()));
                buffer.append("',hid:'");
                buffer.append(elem.getHid());
                buffer.append("',src:'");
//                buffer.append(buildDoctype(elem.getType()));
                buffer.append(elem.getDocType1());
                buffer.append("',locked:'");

                /*if (elem.getStatus() != null) {
                    switch (elem.getStatus()) {
                        case 22:
                        case 24:
                            buffer.append("+");
                            break;
                    }
                }
                if (elem.getFtsStatus() != null) {
                    switch (elem.getFtsStatus()) {
                        case 25:
                        case 27:
                            buffer.append("+");
                            break;
                    }
                }
                if (elem.getBtlc_status() != null) {
                    switch (elem.getBtlc_status()) {
                        case 39:
                        case 41:
                            buffer.append("+");
                            break;
                    }
                }*/
                buffer.append("',print:'");
                for (Status status : elem.getStatuses()) {
                    if (status.getStatusDir().getHid().intValue() == 17) {
                        buffer.append("+");
                        break;
                    }
                }
                buffer.append("',ready:'");
                buffer.append(elem.getReady() != null ? elem.getReady() : "");
                buffer.append("',konts:'");

                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                    for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                        buffer.append(javascriptString(kon.getUtiN()));
                        buffer.append("<br/>");
                    }
                }

                buffer.append("',type:'");
                buffer.append(elem.getType());
                buffer.append("',npoezd:'");
                buffer.append(StringUtils.defaultString(elem.getNpoezd()));
                buffer.append("',trans:'");
                buffer.append(elem.getTrans());
                buffer.append("',messCount:'");
                buffer.append(elem.getMessCount());
                buffer.append("',newMessCount:'");
                buffer.append(elem.getNewMessCount());
                buffer.append("',packId:'");
                buffer.append(elem.getPackDoc().getHid());
                buffer.append("',routeId:'");
                buffer.append(elem.getRoute().getHid());
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiCarrier(List<Carrier> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{total:" + total + ", rows: [");

            for (Carrier carrier : data) {
                buffer.append("{");
                buffer.append("carrUn:'");
                buffer.append(carrier.getCarrUn());
                buffer.append("',carrId:'");
                buffer.append(carrier.getCarrId());
                buffer.append("',countryNo:'");
                buffer.append(javascriptString(carrier.getCountryNo()));
                buffer.append("',carrNo:'");
                buffer.append(javascriptString(carrier.getCarrNo()));
                buffer.append("',carrNameShort:'");
                buffer.append(carrier.getCarrNameShort());
                buffer.append("',carrName:'");
                buffer.append(carrier.getCarrName());
                buffer.append("',carrName:'");
                buffer.append(carrier.getCarrName());
                buffer.append("',carrName:'");
                buffer.append(carrier.getCarrName());
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{total:0, rows:[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_SmgsList(List<CimSmgs> data, Long total, myUser usr) throws IllegalAccessException,
            InvocationTargetException, NoSuchMethodException {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (CimSmgs elem : data) {
                buffer.append("{");
                buffer.append("dattr:'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));
                buffer.append("',altered:'");
                buffer.append(elem.getAltered() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getAltered()));
                buffer.append("',un:'");
                buffer.append(elem.getUn());
                buffer.append("',numClaim:'");
                buffer.append(javascriptString(elem.getG694()));
                buffer.append("',g1_dop_info:'");
                buffer.append(javascriptString(elem.getG1_dop_info()));
                buffer.append("',g4_dop_info:'");
                buffer.append(javascriptString(elem.getG4_dop_info()));
                buffer.append("',g16_dop_info:'");
                buffer.append(javascriptString(elem.getG16_dop_info()));
                buffer.append("',vags:'");
                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                    if (vag.isCarDuplicates() && ((new Date().getTime() - elem.getDattr().getTime()) < DUPLICATE_PERIOD * DAY_IN_MS))
                        buffer.append("<font color=\"violet\">" + javascriptString(vag.getNvag() + "</font>"));
                    else
                        buffer.append(javascriptString(vag.getNvag()));
                    buffer.append("<br/>");
                }
                buffer.append("',g281:'");
                buffer.append(elem.getG281() == null ? "" : new SimpleDateFormat("dd.MM.yyyy").format(elem.getG281()));
                buffer.append("'");

                if (usr.hasPrivileg("CIM_IFTMIN")) {
                    buffer.append(",iftmin:'");
                    if (elem.getIftminOut() != null) {
                        if (elem.getIftminLogs() != null && elem.getIftminLogs().size() > 0) {

                            buffer.append("Iftmin");
                            BIftminLog iftmin = elem.getIftminLogs().iterator().next(); // записей быть много
                            if (iftmin.getBContrls() != null && iftmin.getBContrls().size() > 0) {
                                buffer.append(",Contrl");
                                Contrl contrl = iftmin.getBContrls().iterator().next();
                                buffer.append(contrl.getError().equals("1") ? "+" : "-");
                            }
                            if (iftmin.getBAperak() != null && iftmin.getBAperak().size() > 0) {
                                buffer.append(",Aperak");
                            }
                        }
                        if (elem.getCsComnt() != null && elem.getCsComnt().size() > 0) {
                            buffer.append(",Comnt");
                            buffer.append(elem.getCsComnt().iterator().next().hasDetail() ? "-" : "+");
                        }
                    }
                    buffer.append("'");

                    buffer.append(",tbc2log:'");
                    if (!elem.getTbc2Logs().isEmpty()) {
                        Tbc2Log tbc2Log = elem.getTbc2Logs().iterator().next();
                        if (tbc2Log.getTbc2Pack() != null && !tbc2Log.getTbc2Pack().getTbc2Status().isEmpty()) {
                            Tbc2Status tbc2Status = tbc2Log.getTbc2Pack().getTbc2Status().iterator().next();
                            buffer.append(javascriptString(tbc2Status.getDescription()));
                        }
                    }
                    buffer.append("'");
                }

                if (usr.hasPrivileg("CIM_BTLC")) {
                    buffer.append(",iftminBtlc:'");
                    if (elem.getIftminOut2() != null) {
                        if (elem.getIftminLogsBtlc() != null && elem.getIftminLogsBtlc().size() > 0) {

                            buffer.append("Iftmin");
                            BIftminLog iftmin = elem.getIftminLogsBtlc().iterator().next(); // записей быть много
                            if (iftmin.getBContrls() != null && iftmin.getBContrls().size() > 0) {
                                buffer.append(",Contrl");
                                Contrl contrl = iftmin.getBContrls().iterator().next();
                                buffer.append(contrl.getError().equals("1") ? "+" : "-");
                            }
                            if (iftmin.getBAperak() != null && iftmin.getBAperak().size() > 0) {
                                buffer.append(",Aperak");
                            }
                        }
                        if (elem.getCsComnt() != null && elem.getCsComnt().size() > 0) {
                            buffer.append(",Comnt");
                            buffer.append(elem.getCsComnt().iterator().next().hasDetail() ? "-" : "+");
                        }
                    }
                    buffer.append("'");
                }

                buffer.append(",tbc:");
                buffer.append(elem.getTbcStatus() != null ? elem.getTbcStatus() : "0");
                buffer.append(",greenRail:");
                buffer.append(elem.getFtsStatus() != null ? elem.getFtsStatus() : "0");
                buffer.append(",btlc:");
                buffer.append(elem.getBtlc_status() != null ? elem.getBtlc_status() : "0");

                buffer.append(",tdgFts:");
                buffer.append(elem.getTdg_status1() != null ? elem.getTdg_status1() : "0");

                resolveTdgStatus(usr, buffer, elem);

                buffer.append(",print:'");
                for (Status status : elem.getStatuses()) {
                    if (status.getStatusDir().getHid().intValue() == 17) {
                        buffer.append("+");
                        break;
                    }
                }
                buffer.append("',status:");
                buffer.append(elem.getStatus() != null ? elem.getStatus() : "''");

                buffer.append(",g1:'");
                buffer.append(javascriptString(elem.getG1r()));
                buffer.append("',g4:'");
                buffer.append(javascriptString(elem.getG4r()));

                buffer.append("',vagVedNum:'");
                buffer.append(javascriptString(elem.getVagVedNum()));


                if (elem.getCimSmgs() != null && elem.getCimSmgs().getAviso_num() != null) {
                    buffer.append("',aviso:'");
                    buffer.append(elem.getCimSmgs().getAviso_num());
                    buffer.append("',avisoId:'");
                    buffer.append(elem.getCimSmgs().getHid());
                } else {
                    buffer.append("',aviso:'");
                    buffer.append("',avisoId:'");
                }
//                    buffer.append("','aviso_hid':'");
//                    buffer.append(elem.getCimSmgs() != null && elem.getCimSmgs().getHid() != null ? elem.getCimSmgs().getHid() : "");
                buffer.append("',hid:'");
                buffer.append(elem.getHid());
                buffer.append("',ready:'");
                buffer.append(elem.getReady() != null ? elem.getReady() : "");
                buffer.append("',konts:'");

                StringBuffer gng = new StringBuffer();
                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                    for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                        if (kon.isKonDuplicates())
                            buffer.append("<font color=\"violet\">" + javascriptString(kon.getUtiN() + "</font>"));
                        else
                            buffer.append(javascriptString(kon.getUtiN()));

                        buffer.append("<br/>");
                        for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                            gng.append(javascriptString(gruz.getKgvn()));
                            gng.append("<br/>");
                        }
                    }
                }

                buffer.append("',type:'");
                buffer.append(elem.getType());
                buffer.append("',gng:'");
                buffer.append(gng);
                buffer.append("',nstn:'");
                buffer.append(StringUtils.defaultString(elem.getG101r()));
                buffer.append("',src:'");
//                buffer.append(buildDoctype(elem.getType()));
                buffer.append(elem.getDocType1());
                buffer.append("',invQty:'");
                if (usr.hasPrivileg("CIM_DOC2DOC") /*&& elem.getRoute().hasDoc("invoicelist")*/) {
                    buffer.append(elem.getPackDoc().getCsInvoices().size());
                }
                buffer.append("',npoezd:'");
                buffer.append(StringUtils.defaultString(elem.getNpoezd()));
                buffer.append("',locked:'");
                /*if (elem.getTbcStatus() != null) {
                    switch (elem.getTbcStatus()) {
                        case 8:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            buffer.append("+");
                            break;
                    }
                }
                if (elem.getStatus() != null) {
                    switch (elem.getStatus()) {
                        case 22:
                        case 24:
                            buffer.append("+");
                            break;
                    }
                }
                if (elem.getFtsStatus() != null) {
                    switch (elem.getFtsStatus()) {
                        case 25:
                        case 27:
                            buffer.append("+");
                            break;
                    }
                }
                if (elem.getBtlc_status() != null) {
                    switch (elem.getBtlc_status()) {
                        case 39:
                        case 41:
                            buffer.append("+");
                            break;
                    }
                }*/
                buffer.append("',packId:'");
                buffer.append(elem.getPackDoc().getHid());
                buffer.append("',route:'");
                buffer.append(elem.getRoute().getName());
                buffer.append("',routeId:'");
                buffer.append(elem.getRoute().getHid());
                buffer.append("',trans:'");
                buffer.append(elem.getTrans());
                buffer.append("',messCount:'");
                buffer.append(elem.getMessCount());
                buffer.append("',newMessCount:'");
                buffer.append(elem.getNewMessCount());
                buffer.append("',newDoc:'");
                byte newDoc = 0;
                String userGroupName = usr.getUsr().getGroup().getName();
                for (CimSmgsFileInf cimSmgsFileInf : elem.getPackDoc().getCimSmgsFileInfs()) {
                    for (Object cimSmgsFile : cimSmgsFileInf.getCimSmgsFiles()) {
                        newDoc = 1;
                        boolean foundUnRead =  ((CimSmgsFile) cimSmgsFile).getCimSmgsFileNew().stream().noneMatch((nf -> userGroupName.equalsIgnoreCase(nf.getTrans())));
                        if (foundUnRead) {
                            newDoc = 2;
                            break;
                        }
                    }
                    if (newDoc == 2) break;
                }
                buffer.append(newDoc);
                buffer.append("'},");
            }
            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_4VedVagList(List<CimSmgs> data) {
        StringBuilder buffer = new StringBuilder();
        if (data != null && data.size() > 0) {
            buffer.append("{'rows': [");

            for (CimSmgs elem : data) {
                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                    for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                        buffer.append("{");
                        buffer.append("hidCs:'");
                        buffer.append(elem.getHid());
                        buffer.append("',numClaim:'");
                        buffer.append(javascriptString(elem.getG694()));
                        buffer.append("',nvag:'");
                        buffer.append(javascriptString(vag.getNvag()));
                        buffer.append("',g281:'");
                        buffer.append(elem.getG281() == null ? "" : new SimpleDateFormat("dd.MM.yyyy").format(elem.getG281()));
                        buffer.append("'");

                        buffer.append(",owner:'");
                        buffer.append(javascriptString(vag.getNameSob()));
                        buffer.append("',kind:'");
                        buffer.append(javascriptString(vag.getRod()));
                        buffer.append("',gp:");
                        buffer.append(vag.getGrPod());
//                        buffer.append(",hid:'");
//                        buffer.append(elem.getHid());
                        buffer.append(",axes:");
                        buffer.append(vag.getKolOs());
                        buffer.append(",tara:");
                        buffer.append(vag.getTaraVag());

                        int kpl = 0;
                        String znak = "";
                        for (CimSmgsPlomb plomb : kon.getCimSmgsPlombs().values()) {
                            kpl += (plomb.getKpl() != null ? plomb.getKpl() : 0);
                            znak += (StringUtils.isNotBlank(plomb.getZnak()) ? ("," +plomb.getZnak()) : "");
                        }
                        buffer.append(",kpl:");
                        buffer.append(kpl);
                        buffer.append(",znak:'");
                        buffer.append(javascriptString(znak.replaceFirst(",", "")));
                        buffer.append("',ksto:'");
                        buffer.append(javascriptString(elem.getG121()));
                        buffer.append("',nsto:'");
                        buffer.append(javascriptString(elem.getG101r()));
                        buffer.append("',kstn:'");
                        buffer.append(javascriptString(elem.getG17()));
                        buffer.append("',nstn:'");
                        buffer.append(javascriptString(elem.getG162r()));
                        buffer.append("',kont:'");
                        buffer.append(javascriptString(kon.getUtiN()));
                        buffer.append("',kontGp:");
                        buffer.append(kon.getGrpod());
                        buffer.append(",kontTara:");
                        buffer.append(kon.getTaraKont());

//                        StringBuilder places = new StringBuilder();
//                        StringBuilder upak = new StringBuilder();
//                        StringBuilder gng = new StringBuilder();
//                        StringBuilder gngn = new StringBuilder();
//                        StringBuilder mbrt = new StringBuilder();

                        int placasAll = 0;
                        BigDecimal mbrtAll = new BigDecimal(0);
                        for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                            placasAll += (gruz.getPlaces() != null ? gruz.getPlaces() : 0);
                            mbrtAll = mbrtAll.add(gruz.getMassa() != null ? gruz.getMassa() : new BigDecimal(0));
                        }
                        buffer.append(",places:");
                        buffer.append(placasAll);
                        buffer.append(",mbrt:");
                        buffer.append(mbrtAll.add(new BigDecimal(kon.getTaraKont() != null ? kon.getTaraKont().intValue() : 0)));
                        buffer.append(",kontType:'");
                        buffer.append(javascriptString(kon.getUtiType()));

                        if (!kon.getCimSmgsGruzs().isEmpty()) {
                            CimSmgsGruz gruz = kon.getCimSmgsGruzs().values().iterator().next();
                            buffer.append("',upak:'");
                            buffer.append("Контейнер");
                            buffer.append("',gng:'");
                            buffer.append(javascriptString(gruz.getKgvn()));
                            buffer.append("',gngn:'");
                            buffer.append(javascriptString(gruz.getNzgr()));
//                        }
                        }
                        buffer.append("'},");
                    }
                }
            }
            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'rows':[]}");
        }

        return buffer.toString();
    }

    private static void resolveTdgStatus(myUser usr, StringBuffer buffer, CimSmgs elem) {
        if(usr.hasPrivileg("CIM_TDG") && (elem.getTdg_status1() != null && elem.getTdg_status1() == Tdg_A.TDG_SENDED_STATUS)){
            buffer.append(",tdgFts1:'");
            TdgLog tdgLog = null;
            if(org.apache.commons.collections4.CollectionUtils.isNotEmpty(elem.getTdgLog())){
                tdgLog = elem.getTdgLog().iterator().next();
                buffer.append(javascriptString(tdgLog.getStatus_txt()));
            }
            buffer.append("'");
            if(tdgLog != null && StringUtils.isNotBlank(tdgLog.getResult_txt())){
                buffer.append(",tdgFtsHid:");
                buffer.append(tdgLog.getHid());
                buffer.append("");
            }
        }
    }

    public static String convert2JSON_EpdList(List<CimSmgs> data, Long total) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (CimSmgs elem : data) {
                buffer.append("{");
                buffer.append("dattr:'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));
                buffer.append("',altered:'");
                buffer.append(elem.getAltered() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getAltered()));
                buffer.append("',un:'");
                buffer.append(elem.getUn());
                buffer.append("',g1:'");
                buffer.append(javascriptString(elem.getG1r()));
                buffer.append("',g4:'");
                buffer.append(javascriptString(elem.getG4r()));
                buffer.append("',hid:'");
                buffer.append(elem.getHid());
                buffer.append("',konts:'");
                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                    for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                        buffer.append(javascriptString(kon.getUtiN()));
                        buffer.append("<br/>");
                    }
                }

                buffer.append("',type:'");
                buffer.append(elem.getType());
                buffer.append("',src:'");
                buffer.append(elem.getDocType1());
//                buffer.append(buildDoctype(elem.getType()));
                buffer.append("',packId:'");
                buffer.append(elem.getPackDoc().getHid());
                buffer.append("',routeId:'");
                buffer.append(elem.getRoute().getHid());
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_StatListCimSmgs(List<CimSmgs> data, Long total, List<DocDir> docDirs) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (CimSmgs elem : data) {
                buffer.append("{");
                buffer.append("dattr:'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));
                buffer.append("',altered:'");
                buffer.append(elem.getAltered() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getAltered()));
                buffer.append("',un:'");
                buffer.append(elem.getUn());
                buffer.append("',vags:'");
                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                    buffer.append(javascriptString(vag.getNvag()));
                    buffer.append("<br/>");
                }


                buffer.append("',g1:'");
                buffer.append(javascriptString(elem.getG1r()));
                buffer.append("',g4:'");
                buffer.append(javascriptString(elem.getG4r()));

                buffer.append("',hid:'");
                buffer.append(elem.getHid());
                buffer.append("',konts:'");

                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                    for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                        buffer.append(javascriptString(kon.getUtiN()));
                        buffer.append("<br/>");
                    }
                }

                buffer.append("',type:'");
                buffer.append(elem.getType());
                buffer.append("',doc:'");

                for(DocDir docDir: docDirs){
                    if(docDir.getHid().equals(elem.getDocType1())){
                        buffer.append(docDir.getDescr());
                        break;
                    }
                }

//                buffer.append(buildDocName(elem.getType()));
                buffer.append("',route:'");
                buffer.append(elem.getRoute() != null ? elem.getRoute().getName() : "");
                buffer.append("',project:'");
                buffer.append(elem.getRoute() != null ? elem.getRoute().getProject().getName() : "");

                buffer.append("',packId:'");
                buffer.append(elem.getPackDoc() != null ? elem.getPackDoc().getHid() : "");
                buffer.append("',routeId:'");
                buffer.append(elem.getRoute() != null ? elem.getRoute().getHid() : "");
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_StatListInvoice(List<CimSmgsInvoice> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (CimSmgsInvoice elem : data) {
                buffer.append("{");
                buffer.append("dattr:'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));
                buffer.append("',altered:'");
                buffer.append(elem.getAltered() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getAltered()));
                buffer.append("',un:'");
                buffer.append(elem.getUn());
                buffer.append("',vags:'");
//                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
//                    buffer.append(javascriptString(vag.getNvag()));
//                    buffer.append("<br/>");
//                }


                buffer.append("',g1:'");
                buffer.append(javascriptString(elem.getNotd()));
                buffer.append("',g4:'");
                buffer.append(javascriptString(elem.getNpol()));

                buffer.append("',hid:'");
                buffer.append(elem.getHid());
                buffer.append("',konts:'");

//                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
//                    for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
//                        buffer.append(javascriptString(kon.getUtiN()));
//                        buffer.append("<br/>");
//                    }
//                }

//                buffer.append("',type:'");
//                buffer.append(elem.getType());
                buffer.append("',doc:'");
                buffer.append("Инвойс");
                buffer.append("',route:'");
                buffer.append(elem.getRoute() != null ? elem.getRoute().getName() : "");
                buffer.append("',project:'");
                buffer.append(elem.getRoute() != null ? elem.getRoute().getProject().getName() : "");

                buffer.append("',packId:'");
                buffer.append(elem.getPackDoc() != null ? elem.getPackDoc().getHid() : "");
                buffer.append("',routeId:'");
                buffer.append(elem.getRoute() != null ? elem.getRoute().getHid() : "");
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_Gu29kList(List<CimSmgs> data, Long total) throws IllegalAccessException,
            InvocationTargetException, NoSuchMethodException {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (CimSmgs elem : data) {
                buffer.append("{");
                buffer.append("dattr:'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));
                buffer.append("',altered:'");
                buffer.append(elem.getAltered() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getAltered()));
                buffer.append("',un:'");
                buffer.append(elem.getUn());
                buffer.append("',numClaim:'");
                buffer.append(javascriptString(elem.getG694()));
                buffer.append("',vags:'");
                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                    buffer.append(javascriptString(vag.getNvag()));
                    buffer.append("<br/>");
                }
                buffer.append("',konts:'");
                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                    for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                        buffer.append(javascriptString(kon.getUtiN()));
                        buffer.append("<br/>");
                    }
                }

                buffer.append("',g281:'");
                buffer.append(elem.getG281() == null ? "" : new SimpleDateFormat("dd.MM.yyyy").format(elem.getG281()));
                buffer.append("',g1:'");
                buffer.append(javascriptString(elem.getG1r()));
                buffer.append("',g4:'");
                buffer.append(javascriptString(elem.getG4r()));
                if (elem.getCimSmgs() != null && elem.getCimSmgs().getAviso_num() != null) {
                    buffer.append("',aviso:'");
                    buffer.append(elem.getCimSmgs().getAviso_num());
                    buffer.append("',avisoId:'");
                    buffer.append(elem.getCimSmgs().getHid());
                } else {
                    buffer.append("',aviso:'");
                    buffer.append("',avisoId:'");
                }
                buffer.append("',hid:'");
                buffer.append(elem.getHid());
                buffer.append("',src:'");
                buffer.append(elem.getDocType1());
//                buffer.append(buildDoctype(elem.getType()));
                buffer.append("',ready:'");
                buffer.append(elem.getReady() != null ? elem.getReady() : "");
                buffer.append("',type:'");
                buffer.append(elem.getType());
                buffer.append("',print:'");
                for (Status status : elem.getStatuses()) {
                    if (status.getStatusDir().getHid().intValue() == 17) {
                        buffer.append("+");
                        break;
                    }
                }
                buffer.append("',packId:");
                buffer.append(elem.getPackDoc().getHid());
                buffer.append(",routeId:");
                buffer.append(elem.getRoute().getHid());
                buffer.append("},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_CimList(List<CimSmgs> data, Long total) throws IllegalAccessException,
            InvocationTargetException, NoSuchMethodException {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (CimSmgs elem : data) {
                buffer.append("{");
                buffer.append("dattr:'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));
                buffer.append("',altered:'");
                buffer.append(elem.getAltered() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getAltered()));
                buffer.append("',un:'");
                buffer.append(elem.getUn());
                buffer.append("',numClaim:'");
                buffer.append(javascriptString(elem.getG694()));
                buffer.append("',konts:'");
                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                    for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                        if(kon.isKonDuplicates())
                            buffer.append("<font color=\"violet\">"+javascriptString(kon.getUtiN()+"</font>"));
                        else
                            buffer.append(javascriptString(kon.getUtiN()));
                        buffer.append("<br/>");
                    }
                }
                buffer.append("',g1:'");
                buffer.append(javascriptString(elem.getG1()));
                buffer.append("',g4:'");
                buffer.append(javascriptString(elem.getG4()));
                buffer.append("',hid:'");
                buffer.append(elem.getHid());
                buffer.append("',npoezd:'");
                buffer.append(elem.getNpoezd()!=null?elem.getNpoezd():"");
                buffer.append("',src:'");
//                buffer.append(buildDoctype(elem.getType()));
                buffer.append(elem.getDocType1());
                buffer.append("',type:'");
                buffer.append(elem.getType());
                buffer.append("',print:'");
                for (Status status : elem.getStatuses()) {
                    if (status.getStatusDir().getHid().intValue() == 17) {
                        buffer.append("+");
                        break;
                    }
                }
                buffer.append("',packId:'");
                buffer.append(elem.getPackDoc().getHid());
                buffer.append("',routeId:'");
                buffer.append(elem.getRoute().getHid());

                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_AvisoList(List<CimSmgs> data, Long total) throws IllegalAccessException,
            InvocationTargetException, NoSuchMethodException {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (CimSmgs elem : data) {
                buffer.append("{");
                buffer.append("dattr:'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));
                buffer.append("',altered:'");
                buffer.append(elem.getAltered() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getAltered()));
                buffer.append("',un:'");
                buffer.append(elem.getUn());
                buffer.append("',numClaim:'");
                buffer.append(javascriptString(elem.getG694()));
                buffer.append("',amount:'");
                buffer.append(elem.getAmount());
                buffer.append("',profile:'");
                buffer.append(elem.getProfile()!= null ?elem.getProfile():"");
                buffer.append("',g1:'");
                buffer.append(javascriptString(elem.getG1r()));
                buffer.append("',g4:'");
                buffer.append(javascriptString(elem.getG4r()));
//                buffer.append("','scan':'");
//                buffer.append(elem.getCimSmgsScans().size());
                buffer.append("',avizo_num:'");
                buffer.append(javascriptString(elem.getAviso_num()));
//                buffer.append(elem.getAviso_num() != null ? elem.getAviso_num() : "0");
                buffer.append("',hid:'");
                buffer.append(elem.getHid());
                buffer.append("',src:'");
//                buffer.append(buildDoctype(elem.getType()));
                buffer.append(elem.getDocType1());
                buffer.append("',status:'");
                buffer.append(elem.getStatus() != null ? elem.getStatus() : "");
                buffer.append("',ready:'");
                buffer.append(elem.getReady() != null ? elem.getReady() : "");
                buffer.append("',konts:'");
                StringBuffer gng = new StringBuffer();
                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                    for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                        buffer.append(javascriptString(kon.getUtiN()));
                        buffer.append("<br/>");
                        for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                            gng.append(javascriptString(gruz.getKgvn()));
                            gng.append("<br/>");
                        }
                    }
                }
                buffer.append("',gng:'");
                buffer.append(gng);
                buffer.append("',type:'");
                buffer.append(elem.getType());
                buffer.append("',graf:'");
                for (CimSmgsFileInf fileInf : elem.getPackDoc().getCimSmgsFileInfs()) {
                    if (fileInf.getCimSmgsFiles().size() > 0) {
                        buffer.append("+");
                        break;
                    }
                }
                buffer.append("',locked:'");
                if (elem.getStatus() != null) {
                    switch (elem.getStatus()) {
                        case 3:
                            break;
                        case 4:
                            buffer.append("+");
                            break;
                        case 6:
                            break;
                        case 7:
                            buffer.append("+");
                            break;
                        default:
                            break;
                    }
                }
                buffer.append("',comments:");
                buffer.append(elem.getPackDoc().getFieldsCommentses().size());
                buffer.append(",npoezd:'");
                buffer.append(StringUtils.defaultString(elem.getNpoezd()));
                buffer.append("',trans:'");
                buffer.append(elem.getTrans());
                buffer.append("',messCount:'");
                buffer.append(elem.getMessCount());
                buffer.append("',newMessCount:'");
                buffer.append(elem.getNewMessCount());
                buffer.append("',packId:");
                buffer.append(elem.getPackDoc().getHid());
                buffer.append(",routeId:");
                buffer.append(elem.getRoute().getHid());
                buffer.append("},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_Smgs(CimSmgs elem) {
        StringBuffer buffer = new StringBuffer();
        buffer.append("{'total':1, 'rows': [");

        buffer.append("{");
        buffer.append("'g12':'");
        buffer.append(javascriptString(elem.getG12()));
        buffer.append("','g121':'");
        buffer.append(javascriptString(elem.getG121()));
        buffer.append("','g171':'");
        buffer.append(javascriptString(elem.getG171()));
        buffer.append("','g17':'");
        buffer.append(javascriptString(elem.getG17()));
        buffer.append("','g181':'");
        buffer.append(javascriptString(elem.getG181()));
        buffer.append("','g18B1':'");
        buffer.append(javascriptString(elem.getG18B1()));
        buffer.append("','g18B1a':'");
        buffer.append(javascriptString(elem.getG18B1a()));
        buffer.append("','g18B1b':'");
        buffer.append(javascriptString(elem.getG18B1b()));
        buffer.append("','g18B2':'");
        buffer.append(javascriptString(elem.getG18B2()));
        buffer.append("','g694':'");
        buffer.append(javascriptString(elem.getG694()));


        for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
            for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                buffer.append("','utiN':'");
                buffer.append(javascriptString(kon.getUtiN()));
                buffer.append("','plombs':'");
                buffer.append(javascriptString(kon.getPlombs()));
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    buffer.append("','kgvn':'");
                    buffer.append(javascriptString(gruz.getKgvn()));
                    buffer.append("','nzgr':'");
                    buffer.append(javascriptString(gruz.getNzgr()));
                    break;
                }
                break;
            }
            break;
        }
        buffer.append("','hid':'");
        buffer.append(elem.getHid());
        buffer.append("'},");
        buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");

        return buffer.toString();
    }

    public static String convert2JSON_Smgs4IftminList(List<CimSmgs> data, Integer total, String un) throws IllegalAccessException,
            InvocationTargetException, NoSuchMethodException {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (CimSmgs elem : data) {
                buffer.append("{");
                buffer.append("'dattr':'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));
                buffer.append("','hid':'");
                buffer.append(elem.getHid());
                buffer.append("','check':'");
                buffer.append(false);
                buffer.append("'},");
            }
            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_VedList(List<Ved> data, Long total, myUser usr) throws IllegalAccessException, InvocationTargetException,
            NoSuchMethodException {
        StringBuffer buffer = new StringBuffer();

        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (Ved elem : data) {
                buffer.append("{");
                buffer.append("'dattr':'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));

//                buffer.append("','altered':'");
//                buffer.append(elem.getAltered() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getAltered()));
                buffer.append("','un':'");
                buffer.append(elem.getUn());
                buffer.append("','num':'");
                buffer.append(StringUtils.defaultString(elem.getNum()));
                buffer.append("','pervednum':'");
                HashSet<String> pernumSet = new HashSet<>();
                for(VedVag vag : elem.getVags())
                    if(StringUtils.isNotBlank(vag.getPerVed()))
                        pernumSet.add(vag.getPerVed().trim());
                buffer.append(StringUtils.join(pernumSet, ","));
                buffer.append("','train':'");
                buffer.append(StringUtils.defaultString(elem.getTrain()));
                buffer.append("','trainname':'");
                buffer.append(StringUtils.defaultString(elem.getTrainname()));
                buffer.append("','vagcount':'");
                buffer.append(elem.getVags().size());
//                buffer.append(javascriptString(elem.getNotd()));
//
//                buffer.append("','npol':'");
//                buffer.append(javascriptString(elem.getNpol()));
//
//                buffer.append("','invoice':'");
//                buffer.append(javascriptString(elem.getInvoice()));
//
//                buffer.append("','dat_inv':'");
//                buffer.append(elem.getDat_inv() == null ? "" : new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat_inv()));

                buffer.append("','hid':'");
                buffer.append(elem.getHid());
//                buffer.append("'");

                /*if(usr.hasPrivileg("CIM_IFTMIN")){
                    buffer.append(",'iftmin':'");
                    if (elem.getInvoicOut() != null) {
                        if (elem.getIftminLogs() != null && elem.getIftminLogs().size() > 0) {
                            buffer.append("Iftmin");
                            BIftminLog iftmin = elem.getIftminLogs().iterator().next();
                            if (iftmin.getBContrls() != null && iftmin.getBContrls().size() > 0) {
                                buffer.append(", Contrl");
                                Contrl contrl = iftmin.getBContrls().iterator().next();
                                buffer.append(contrl.getError().equals("1") ? "+" : "-");
                            }
                            if (iftmin.getBAperakDets() != null && iftmin.getBAperakDets().size() > 0) {
                                buffer.append(", Aperak");
                            }
                        }
                    }
                    buffer.append("'");
                }

                if(usr.hasPrivileg("CIM_BTLC")){
                    buffer.append(",'btlc':'");
                    if (elem.getInvoicOut2() != null) {
                        if (elem.getIftminLogsBtlc() != null && elem.getIftminLogsBtlc().size() > 0) {
                            buffer.append("Iftmin");
                            BIftminLog iftmin = elem.getIftminLogsBtlc().iterator().next();
                            if (iftmin.getBContrls() != null && iftmin.getBContrls().size() > 0) {
                                buffer.append(", Contrl");
                                Contrl contrl = iftmin.getBContrls().iterator().next();
                                buffer.append(contrl.getError().equals("1") ? "+" : "-");
                            }
                            if (iftmin.getBAperakDets() != null && iftmin.getBAperakDets().size() > 0) {
                                buffer.append(", Aperak");
                            }
                        }
                    }
                    buffer.append("'");
                }*/

                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_InvoiceList(List<CimSmgsInvoice> data, Long total, myUser usr) throws IllegalAccessException, InvocationTargetException,
            NoSuchMethodException {
        StringBuffer buffer = new StringBuffer();

        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (CimSmgsInvoice elem : data) {
                buffer.append("{");
                buffer.append("'dattr':'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));

                buffer.append("','altered':'");
                buffer.append(elem.getAltered() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getAltered()));
                buffer.append("','un':'");
                buffer.append(elem.getUn());
                buffer.append("','notd':'");
                buffer.append(javascriptString(elem.getNotd()));

                buffer.append("','npol':'");
                buffer.append(javascriptString(elem.getNpol()));

                buffer.append("','invoice':'");
                buffer.append(javascriptString(elem.getInvoice()));

                buffer.append("','dat_inv':'");
                buffer.append(elem.getDat_inv() == null ? "" : new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat_inv()));

                buffer.append("','hid':'");
                buffer.append(elem.getHid());
                buffer.append("'");

                /*if(usr.hasPrivileg("CIM_IFTMIN")){
                    buffer.append(",'iftmin':'");
                    if (elem.getInvoicOut() != null) {
                        if (elem.getIftminLogs() != null && elem.getIftminLogs().size() > 0) {
                            buffer.append("Iftmin");
                            BIftminLog iftmin = elem.getIftminLogs().iterator().next();
                            if (iftmin.getBContrls() != null && iftmin.getBContrls().size() > 0) {
                                buffer.append(", Contrl");
                                Contrl contrl = iftmin.getBContrls().iterator().next();
                                buffer.append(contrl.getError().equals("1") ? "+" : "-");
                            }
                            if (iftmin.getBAperakDets() != null && iftmin.getBAperakDets().size() > 0) {
                                buffer.append(", Aperak");
                            }
                        }
                    }
                    buffer.append("'");
                }

                if(usr.hasPrivileg("CIM_BTLC")){
                    buffer.append(",'btlc':'");
                    if (elem.getInvoicOut2() != null) {
                        if (elem.getIftminLogsBtlc() != null && elem.getIftminLogsBtlc().size() > 0) {
                            buffer.append("Iftmin");
                            BIftminLog iftmin = elem.getIftminLogsBtlc().iterator().next();
                            if (iftmin.getBContrls() != null && iftmin.getBContrls().size() > 0) {
                                buffer.append(", Contrl");
                                Contrl contrl = iftmin.getBContrls().iterator().next();
                                buffer.append(contrl.getError().equals("1") ? "+" : "-");
                            }
                            if (iftmin.getBAperakDets() != null && iftmin.getBAperakDets().size() > 0) {
                                buffer.append(", Aperak");
                            }
                        }
                    }
                    buffer.append("'");
                }*/

                buffer.append(",'src':'");
                buffer.append(elem.getDocType1() != null ? elem.getDocType1() : "");
                buffer.append("','packId':'");
                buffer.append(elem.getPackDoc().getHid());
                buffer.append("','routeId':'");
                buffer.append(elem.getRoute().getHid());

                buffer.append("','notpr':'");
                buffer.append(StringUtils.defaultString(elem.getNotpr()));
                buffer.append("','utiN':'");
                buffer.append(StringUtils.defaultString(elem.getUtiN()));
                buffer.append("','dat_inv':'");
                buffer.append(elem.getDat_inv() != null ? new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat_inv()) : "");

                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_InvoiceBriefList(List<CimSmgsInvoiceBrief> data, Long total) {
        StringBuffer buffer = new StringBuffer();

        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (CimSmgsInvoiceBrief elem : data) {
                buffer.append("{");
                buffer.append("'dattr':'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));

                buffer.append("','num':'");
                buffer.append(javascriptString(elem.getNum()));

                buffer.append("','dat':'");
                buffer.append(elem.getDat() == null ? "" : new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat()));

                buffer.append("','places':'");
                buffer.append(elem.getPlaces());

                buffer.append("','g24N':'");
                buffer.append(elem.getG24N());

                buffer.append("','utiN':'");
                buffer.append(javascriptString(elem.getUtiN()));

                buffer.append("','hid':'");
                buffer.append(elem.getHid());
                buffer.append("','smgsId':'");
                if (elem.getCimSmgs() != null) {
                    buffer.append(elem.getCimSmgs().getHid());
                }
                buffer.append("','packId':'");
                buffer.append(elem.getPackDoc().getHid());
                buffer.append("','routeId':'");
                buffer.append(elem.getRoute().getHid());
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_PackList(List<PackList> data, Integer total) throws IllegalAccessException, InvocationTargetException,
            NoSuchMethodException {
        StringBuffer buffer = new StringBuffer();

        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (PackList elem : data) {
                // checkBeanProps(elem);

                buffer.append("{");
                buffer.append("'dattr':'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));

                buffer.append("','notd':'");
                buffer.append(javascriptString(elem.getNotd()));

                buffer.append("','npol':'");
                buffer.append(javascriptString(elem.getNpol()));
                //
                buffer.append("','nomer_pl':'");
                buffer.append(javascriptString(elem.getNomer_pl()));
                //
                buffer.append("','dat_pl':'");
                buffer.append(elem.getDat_pl() == null ? "" : new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat_pl()));

                /*
                 * int count = 0; buffer.append("','vags':'");
                 * for(CimSmgsCarList vag : elem.getCimSmgsCarLists().values())
                 * { buffer.append(javascriptString(vag.getNvag()));
                 * buffer.append("<br/>"); count++; }
                 * buffer.append("','vagsKol':'"); buffer.append(count);
                 *
                 * count = 0; buffer.append("','konts':'");
                 *
                 * for(CimSmgsCarList vag : elem.getCimSmgsCarLists().values())
                 * { for(CimSmgsKonList kon : vag.getCimSmgsKonLists().values())
                 * { buffer.append(javascriptString(kon.getUtiN()));
                 * buffer.append("<br/>"); count++; } } //
                 * if(elem.getCimSmgsKonLists() == null ||
                 * elem.getCimSmgsKonLists().size() == 0) // buffer.append("");
                 * // else // { // for(CimSmgsKonList kon :
                 * elem.getCimSmgsKonLists().values()) // { //
                 * buffer.append(kon.getNvag()); // buffer.append(","); //
                 * count++; // } // buffer.replace(buffer.lastIndexOf(","),
                 * buffer.length(), ""); // } buffer.append("','kontsKol':'");
                 * buffer.append(count);
                 *
                 * // buffer.append("','profile':'"); //
                 * buffer.append(elem.getProfile() == null ? "" :
                 * elem.getProfile()); buffer.append("','g281':'");
                 * buffer.append(elem.getG281() == null ? "" : new
                 * SimpleDateFormat("dd.MM.yyyy").format(elem.getG281()));
                 * buffer.append("','g1':'");
                 * buffer.append(javascriptString(elem.getG1()));
                 * buffer.append("','g4':'");
                 * buffer.append(javascriptString(elem.getG4()));
                 */
                buffer.append("','hid_cs':'");
                buffer.append(elem.getHid_cs());

                buffer.append("','hid':'");
                buffer.append(elem.getHid());

                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        // System.out.println("buffer - " + buffer.toString());
        return buffer.toString();
    }

    public static String convert2JSON_NsiSmgsG1(List<NsiCsG1> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (NsiCsG1 elem : data) {
                // checkBeanProps(elem);
                buffer.append("{");
                buffer.append("'g1':'");
                buffer.append(javascriptString(elem.getG1()));
                buffer.append("','g11':'");
                buffer.append(javascriptString(elem.getG11()));
                buffer.append("','g12':'");
                buffer.append(javascriptString(elem.getG12()));
                buffer.append("','g13':'");
                buffer.append(javascriptString(elem.getG13()));
                buffer.append("','g14':'");
                buffer.append(javascriptString(elem.getG14()));
                buffer.append("','g15_1':'");
                buffer.append(javascriptString(elem.getG15_1()));
                buffer.append("','g16_1':'");
                buffer.append(javascriptString(elem.getG16_1()));
                buffer.append("','g_1_5k':'");
                buffer.append(javascriptString(elem.getG_1_5k()));
                buffer.append("','g16r':'");
                buffer.append(javascriptString(elem.getG16r()));
                buffer.append("','g17_1':'");
                buffer.append(javascriptString(elem.getG17_1()));
                buffer.append("','g18_1':'");
                buffer.append(javascriptString(elem.getG18_1()));
                buffer.append("','g18r':'");
                buffer.append(javascriptString(elem.getG18r_1()));
                buffer.append("','g19_1':'");
                buffer.append(javascriptString(elem.getG19_1()));
                buffer.append("','g19r':'");
                buffer.append(javascriptString(elem.getG19r()));
                buffer.append("','g2':'");
                buffer.append(javascriptString(elem.getG2()));
                buffer.append("','g3':'");
                buffer.append(javascriptString(elem.getG3()));
                buffer.append("','g1r':'");
                buffer.append(javascriptString(elem.getG1r()));
                buffer.append("','g110':'");
                buffer.append(javascriptString(elem.getG110()));
                buffer.append("','g111':'");
                buffer.append(javascriptString(elem.getG111()));
                buffer.append("','g18r_1':'");
                buffer.append(javascriptString(elem.getG18r_1()));
                buffer.append("','g_2inn':'");
                buffer.append(javascriptString(elem.getG_2inn()));
                buffer.append("','dop_info':'");
                buffer.append(javascriptString(elem.getDop_info()));
                buffer.append("','hid':'");
                buffer.append(elem.getHid() == null ? "" : elem.getHid());
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiPlatel(List<NsiPlatel> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (NsiPlatel elem : data) {
                // checkBeanProps(elem);
                buffer.append("{");
                buffer.append("'dor':'");
                buffer.append(javascriptString(elem.getDor()));
                buffer.append("','dorR':'");
                buffer.append(javascriptString(elem.getDorR()));
                buffer.append("','plat':'");
                buffer.append(javascriptString(elem.getPlat()));
                buffer.append("','platR':'");
                buffer.append(javascriptString(elem.getPlatR()));
                buffer.append("','prim':'");
                buffer.append(javascriptString(elem.getPrim()));
                buffer.append("','primR':'");
                buffer.append(javascriptString(elem.getPrimR()));
                buffer.append("','kplat':'");
                buffer.append(javascriptString(elem.getKplat()));
                buffer.append("','kplat1':'");
                buffer.append(javascriptString(elem.getKplat1()));
                buffer.append("','kplat2':'");
                buffer.append(javascriptString(elem.getKplat2()));
                buffer.append("','kplat3':'");
                buffer.append(javascriptString(elem.getKplat3()));
                buffer.append("','strana':'");
                buffer.append(javascriptString(elem.getStrana()));
                buffer.append("','hid':'");
                buffer.append(elem.getHid() == null ? "" : elem.getHid());
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiSmgsG4(List<NsiCsG4> data, Integer total) throws IllegalAccessException, InvocationTargetException,
            NoSuchMethodException {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (NsiCsG4 elem : data) {
                // checkBeanProps(elem);
                buffer.append("{");
                buffer.append("'g4':'");
                buffer.append(javascriptString(elem.getG4()));
                buffer.append("','g41':'");
                buffer.append(javascriptString(elem.getG41()));
                buffer.append("','g42':'");
                buffer.append(javascriptString(elem.getG42()));
                buffer.append("','g43':'");
                buffer.append(javascriptString(elem.getG43()));
                buffer.append("','g44':'");
                buffer.append(javascriptString(elem.getG44()));
                buffer.append("','g45':'");
                buffer.append(javascriptString(elem.getG45()));
                buffer.append("','g46':'");
                buffer.append(javascriptString(elem.getG46()));
                buffer.append("','g46r':'");
                buffer.append(javascriptString(elem.getG46r()));
                buffer.append("','g47':'");
                buffer.append(javascriptString(elem.getG47()));
                buffer.append("','g48':'");
                buffer.append(javascriptString(elem.getG48()));
                buffer.append("','g48r':'");
                buffer.append(javascriptString(elem.getG48r()));
                buffer.append("','g49':'");
                buffer.append(javascriptString(elem.getG49()));
                buffer.append("','g49r':'");
                buffer.append(javascriptString(elem.getG49r()));
                buffer.append("','g5':'");
                buffer.append(javascriptString(elem.getG5()));
                buffer.append("','g6':'");
                buffer.append(javascriptString(elem.getG6()));
                buffer.append("','g4r':'");
                buffer.append(javascriptString(elem.getG4r()));
                buffer.append("','g410':'");
                buffer.append(javascriptString(elem.getG410()));
                buffer.append("','g411':'");
                buffer.append(javascriptString(elem.getG411()));
                buffer.append("','g412':'");
                buffer.append(javascriptString(elem.getG412()));
                buffer.append("','dop_info':'");
                buffer.append(javascriptString(elem.getDop_info()));
                buffer.append("','hid':'");
                buffer.append(elem.getHid() == null ? "" : elem.getHid());
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiSmgsGng(List<CargoGng> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (CargoGng elem : data) {
                buffer.append("{");
                buffer.append("code:'");
                buffer.append(javascriptString(elem.getCargo_group()));
                buffer.append("',name:'");
                buffer.append(javascriptString(elem.getCargo_fullname()));
                buffer.append("',id:");
                buffer.append(elem.getC_gn_id() == null ? "" : elem.getC_gn_id());
                buffer.append(",ohr:");
                boolean ohr = false;
                for(NsiOhr nsiOhr: elem.getOhranas()){
                    ohr = nsiOhr.isOhr();
                    break;
                }
                buffer.append(ohr);
                buffer.append("},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiGngDe(List<NsiGngDe> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (NsiGngDe elem : data) {
                buffer.append("{");
                buffer.append("kgvn:'");
                buffer.append(javascriptString(elem.getKgvn()));
                buffer.append("',nzgr:'");
                buffer.append(javascriptString(elem.getNzgr()));
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiGngDe(List<NsiGngDe> data) {
        StringBuffer buffer = new StringBuffer();
        buffer.append("{");
        if (CollectionUtils.isNotEmpty(data)) {
            NsiGngDe elem = data.iterator().next();
            buffer.append("kgvn:'");
            buffer.append(javascriptString(elem.getKgvn()));
            buffer.append("', nzgr:'");
            buffer.append(javascriptString(elem.getNzgr()));
            buffer.append("'");
        }

        buffer.append("}");
        return buffer.toString();
    }

    public static String convert2JSON_NsiGng(List<CargoGng> data) {
        StringBuffer buffer = new StringBuffer();
        buffer.append("{");
        if (CollectionUtils.isNotEmpty(data)) {
            CargoGng elem = data.iterator().next();
            buffer.append("kgvn:'");
            buffer.append(javascriptString(elem.getCargo_group()));
            buffer.append("',nzgr:'");
            buffer.append(javascriptString(elem.getCargo_fullname()));
            buffer.append("'");
        } else {
            buffer.append("kgvn:'");
            buffer.append("");
            buffer.append("',nzgr:'");
            buffer.append("");
            buffer.append("'");
        }

        buffer.append("}");
        return buffer.toString();
    }

    public static String convert2JSON_NsiSmgsEtsng(List<Cargo> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (Cargo elem : data) {
                // checkBeanProps(elem);
                buffer.append("{");
                buffer.append("code:'");
                buffer.append(javascriptString(elem.getCargo()));
                buffer.append("',name:'");
                buffer.append(javascriptString(elem.getCargo_fullname()));
                buffer.append("',id:"); // big_decimal
                buffer.append(elem.getCar_id() == null ? "" : elem.getCar_id());
                buffer.append(",ohr:");
                boolean ohr = false;
                for(NsiOhr nsiOhr: elem.getOhranas()){
                    ohr = nsiOhr.isOhr();
                    break;
                }
                buffer.append(ohr);
                buffer.append("},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiStEu(List<NsiStEu> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (NsiStEu elem : data) {
                // checkBeanProps(elem);
                buffer.append("{");
                buffer.append("'kst':'");
                buffer.append(javascriptString(elem.getKst()));
                buffer.append("','nst':'");
                buffer.append(javascriptString(elem.getNst()));
                NsiDor nsiDor = elem.getNsiDor();
                if (nsiDor != null) {
                    buffer.append("','strana':'");
                    buffer.append(javascriptString(nsiDor.getStrana()));
                    buffer.append("','sokrNam':'");
                    buffer.append(javascriptString(nsiDor.getSokrNam()));
                    buffer.append("','sokrNamEu':'");
                    buffer.append(javascriptString(nsiDor.getSokrNamEu()));
                    buffer.append("','codDir':'");
                    buffer.append(javascriptString(nsiDor.getKod()));
                    NsiCountries nsiCountries = nsiDor.getNsiCountries();
                    if (nsiCountries != null) {
                        buffer.append("','anaim':'");
                        buffer.append(javascriptString(nsiCountries.getAnaim()));
                    } else {
                        buffer.append("','anaim':''");
                    }
                } else {
                    buffer.append("','strana':'','sokrNam':'','sokrNamEu':'','anaim':'','codDir':''");
                }

                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiStCis(List<Railroadstation> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (Railroadstation elem : data) {
                buffer.append("{");
                buffer.append("'name':'");
                buffer.append(MLString(elem.getMlName()));
                buffer.append("','nameLatin1':'");
                buffer.append(javascriptString(elem.getNameLatin1()));
                buffer.append("','code':'");
                buffer.append(javascriptString(elem.getCode()));
                Railroadland elem1 = elem.getRailroadland();
                if (elem1 != null) {
                    buffer.append("','name1':'");
                    buffer.append(MLString(elem1.getMlName()));
                    buffer.append("','nameLatin11':'");
                    buffer.append(javascriptString(elem1.getNameLatin1()));
                    buffer.append("','landId':'");
                    buffer.append(javascriptString(elem1.getLandid()));
                    buffer.append("','dorCodeR':'");
                    buffer.append(javascriptString(elem1.getImpRname()));
                } else {
                    buffer.append("','name1':'','nameLatin11':'','landId':'','dorCodeR':''");
                }
                Railroad elem2 = elem.getRailroad();
                if (elem2 != null) {
                    buffer.append("','name2':'");
                    buffer.append(MLString(elem2.getMlName()));
                    buffer.append("','nameLatin12':'");
                    buffer.append(javascriptString(elem2.getNameLatin1()));
                    buffer.append("','code2':'");
                    buffer.append(javascriptString(elem2.getCode()));
                } else {
                    buffer.append("','name2':'','nameLatin12':'','code2':''");
                }

                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiSta(List<Sta> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{total:" + total + ", rows: [");

            for (Sta sta : data) {
                buffer.append("{");
                buffer.append("staName:'");
                buffer.append(javascriptString(sta.getStaName()));
                buffer.append("',staNameCh:'");
                buffer.append(javascriptString(sta.getStaNameCh()));
                buffer.append("',staNameEn:'");
                buffer.append(javascriptString(sta.getStaNameEn()));
                buffer.append("',staNo:'");
                buffer.append(javascriptString(sta.getStaNo()));
                buffer.append("',stUn:'");
                buffer.append(sta.getStUn());
                buffer.append("',ro:'");
                buffer.append(sta.getRo());
                Road road = sta.getRoad();
                if (road != null) {
                    buffer.append("',roadun:'");
                    buffer.append(road.getRoadUn());
                    buffer.append("',roadno:'");
                    buffer.append(road.getRoadNo());
                    buffer.append("',roadname:'");
                    buffer.append(javascriptString(road.getRoadName()));
                } else {
                    buffer.append("',roadname:'',roadno:'',roadun:'");
                }
                Management manag = sta.getManagement();
                if (manag != null) {
                    buffer.append("',managno:'");
                    buffer.append(manag.getManagNo());
                    buffer.append("',managun:'");
                    buffer.append(manag.getManagUn());
                    buffer.append("',mnamerus:'");
                    buffer.append(javascriptString(manag.getMNameRus()));

                    Countrys country = manag.getCountrys();
                    if (country != null) {
                        buffer.append("',countryname:'");
                        buffer.append(javascriptString(country.getCountryName()));
                    } else {
                        buffer.append("',countryname:'");
                    }
                } else {
                    buffer.append("',managno:'',managun:'',mnamerus:'',countryname:'");
                }

                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{total:0, rows:[]}");
        }

        return buffer.toString();
    }

    // public static String convert2JSON_NsiCompany(List<Company> data, Integer
    // total, String type) throws IllegalAccessException,
    // InvocationTargetException,
    // NoSuchMethodException
    // {
    // StringBuffer buffer = new StringBuffer();
    // MLString mlStr = new MLString("ru");
    // if(data != null && data.size() > 0)
    // {
    // buffer.append("{'total':" + total + ", 'rows': [");
    // if("otprav".equals(type)){
    // for(Company elem : data)
    // {
    // buffer.append("{");
    // buffer.append("'g1':'");
    // buffer.append(javascriptString(elem.getNameLatin1()));
    //
    // buffer.append("','g1r':'");
    // buffer.append(MLString(elem.getName()));
    //
    // buffer.append("','g14':'");
    // buffer.append(javascriptString(elem.getDigSignature()));
    // buffer.append("','g110':'");
    // buffer.append(javascriptString(elem.getVatcode()));
    // Country elem1 = elem.getCountry();
    // if(elem1 != null)
    // {
    // buffer.append("','g16r':'");
    // buffer.append(MLString(elem1.getName()));
    // buffer.append("','g16_1':'");
    // buffer.append(javascriptString(elem1.getNameLatin1()));
    // buffer.append("','g15_1':'");
    // buffer.append(elem1.getCodeInt() == null ? "" : elem1.getCodeInt());
    // }
    // else
    // {
    // buffer.append("','g16r':'','g16_1':'','g15_1':''");
    // }
    //
    // Set<Address> set = elem.getAddresses();
    // if(set.size() > 0)
    // {
    // for(Address elem2 : set)
    // {
    // buffer.append("','g11_1':'");
    // buffer.append(javascriptString(elem2.getEmail()));
    // buffer.append("','g12_1':'");
    // buffer.append(javascriptString(elem2.getPhones()));
    // buffer.append("','g13_1':'");
    // buffer.append(javascriptString(elem2.getFax()));
    //
    // buffer.append("','g17_1':'");
    // buffer.append(javascriptString(elem2.getZip()));
    // buffer.append("','g18_1':'");
    // buffer.append("','g18r_1':'");
    // buffer.append(MLString(elem2.getCity()));
    // buffer.append("','g19_1':'");
    // buffer.append("','g19r':'");
    // buffer.append(MLString(elem2.getStreet()));
    //
    // break;
    // }
    // }
    // else
    // {
    // buffer.append("','g11_1':'','g12_1':'','g13_1':'','g17_1':'','g18_1':'','g18r_1':'','g19_1':'','g19r':''");
    // }
    //
    // buffer.append("'},");
    // }
    // }
    // else if("poluch".equals(type)){
    // for(Company elem : data)
    // {
    // buffer.append("{");
    // buffer.append("'g4':'");
    // buffer.append(javascriptString(elem.getNameLatin1()));
    // buffer.append("','g4r':'");
    // buffer.append(MLString(elem.getName()));
    // buffer.append("','g44_1':'");
    // buffer.append(javascriptString(elem.getDigSignature()));
    // buffer.append("','g410':'");
    // buffer.append(javascriptString(elem.getVatcode()));
    // Country elem1 = elem.getCountry();
    // if(elem1 != null)
    // {
    // buffer.append("','g46r':'");
    // buffer.append(MLString(elem1.getName()));
    // buffer.append("','g46_1':'");
    // buffer.append(javascriptString(elem1.getNameLatin1()));
    // buffer.append("','g45_1':'");
    // buffer.append(elem1.getCodeInt() == null ? "" : elem1.getCodeInt());
    // }
    // else
    // {
    // buffer.append("','g46r':'','g46_1':'','g45_1':''");
    // }
    //
    // Set<Address> set = elem.getAddresses();
    // if(set.size() > 0)
    // {
    // for(Address elem2 : set)
    // {
    // buffer.append("','g41_1':'");
    // buffer.append(javascriptString(elem2.getEmail()));
    // buffer.append("','g42_1':'");
    // buffer.append(javascriptString(elem2.getPhones()));
    // buffer.append("','g43_1':'");
    // buffer.append(javascriptString(elem2.getFax()));
    //
    // buffer.append("','g47_1':'");
    // buffer.append(javascriptString(elem2.getZip()));
    // buffer.append("','g48_1':'");
    // buffer.append("','g48r':'");
    // buffer.append(MLString(elem2.getCity()));
    // buffer.append("','g49':'");
    // buffer.append("','g49r':'");
    // buffer.append(MLString(elem2.getStreet()));
    //
    // break;
    // }
    //
    // }
    // else
    // {
    // buffer.append("','g11_1':'','g12_1':'','g13_1':'','g17_1':'','g18_1':'','g18r_1':'','g19_1':'','g19r':''");
    // }
    //
    // buffer.append("'},");
    // }
    // }
    //
    // buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
    // }
    // else
    // {
    // buffer.append("{'total':0, 'rows':[]}");
    // }
    //
    // return buffer.toString();
    // }

    public static String convert2JSON_NsiCompany(List<Company> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");
            for (Company elem : data) {
                buffer.append("{");
                buffer.append("'id':'");
                buffer.append(elem.getId());
                buffer.append("','g1':'");
                buffer.append(javascriptString(elem.getNameLatin1()));

                buffer.append("','g1r':'");
                buffer.append(MLString(elem.getName()));

                buffer.append("','g14':'");
                buffer.append(javascriptString(elem.getDigSignature()));
                buffer.append("','g110':'");
                buffer.append(javascriptString(elem.getVatcode()));
                Country elem1 = elem.getCountry();
                if (elem1 != null) {
                    buffer.append("','g16r':'");
                    buffer.append(MLString(elem1.getName()));
                    buffer.append("','g16_1':'");
                    buffer.append(javascriptString(elem1.getNameLatin1()));
                    buffer.append("','g15_1':'");
                    buffer.append(elem1.getCodeInt() == null ? "" : elem1.getCodeInt());
                } else {
                    buffer.append("','g16r':'','g16_1':'','g15_1':''");
                }

                Set<Address> set = elem.getAddresses();
                if (set.size() > 0) {
                    for (Address elem2 : set) {
                        buffer.append("','g11_1':'");
                        buffer.append(javascriptString(elem2.getEmail()));
                        buffer.append("','g12_1':'");
                        buffer.append(javascriptString(elem2.getPhones()));
                        buffer.append("','g13_1':'");
                        buffer.append(javascriptString(elem2.getFax()));

                        buffer.append("','g17_1':'");
                        buffer.append(javascriptString(elem2.getZip()));
                        buffer.append("','g18_1':'");
                        buffer.append("','g18r_1':'");
                        buffer.append(MLString(elem2.getCity()));
                        buffer.append("','g19_1':'");
                        buffer.append("','g19r':'");
                        buffer.append(MLString(elem2.getStreet()));

                        break;
                    }
                } else {
                    buffer.append("','g11_1':'','g12_1':'','g13_1':'','g17_1':'','g18_1':'','g18r_1':'','g19_1':'','g19r':'");
                }

                buffer.append("'},");
            }
            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiFieldsOpt(List<NsiFieldsOpt> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (NsiFieldsOpt elem : data) {
                // checkBeanProps(elem);
                buffer.append("{");
                // buffer.append("'nsiName':'");
                // buffer.append(elem.getNsiFName() == null ? "" :
                // elem.getNsiFName());
                buffer.append("'nsiFName':'");
                buffer.append(javascriptString(elem.getNsiFName()));
                buffer.append("','nsiFDesc':'");
                buffer.append(javascriptString(elem.getNsiFDesc()));
                buffer.append("','nsiFDsc2':'");
                buffer.append(javascriptString(elem.getNsiFDsc2()));
                buffer.append("','nsiFDsc3':'");
                buffer.append(javascriptString(elem.getNsiFDsc3()));
                buffer.append("','nsiFNcas':'");
                buffer.append(javascriptString(elem.getNsiFNcas()));
                buffer.append("','nsiFNn':'");
                buffer.append(javascriptString(elem.getNsiFNn()));
                buffer.append("','nsiFType':'"); // byte
                buffer.append(elem.getNsiFType() == null ? "" : elem.getNsiFType());

                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiCountries(List<NsiCountries> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (NsiCountries elem : data) {
                buffer.append("{");
                buffer.append("'kod':'");
                buffer.append(javascriptString(elem.getKod()));
                buffer.append("','abc2':'");
                buffer.append(javascriptString(elem.getAbc2()));
                buffer.append("','naim':'");
                buffer.append(javascriptString(elem.getNaim()));
                buffer.append("','anaim':'");
                buffer.append(javascriptString(elem.getAnaim()));
                buffer.append("','krnaim':'");
                buffer.append(javascriptString(elem.getKrnaim()));
                for (NsiDor dor : elem.getNsiDors()) {
                    buffer.append("','sokrNam':'");
                    buffer.append(javascriptString(dor.getSokrNam()));
                    break;
                }
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_SmgsStatus(List<CimSmgsStatus> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (CimSmgsStatus elem : data) {
                // checkBeanProps(elem);
                buffer.append("{");
                // buffer.append("'nsiName':'");
                // buffer.append(elem.getNsiFName() == null ? "" :
                // elem.getNsiFName());
                buffer.append("'status':'");
                buffer.append(elem.getStatus() == null ? "" : (elem.getStatus() == 1 ? "Принят" : "Отклонен"));
                buffer.append("','statusText':'");
                buffer.append(javascriptString(elem.getStatusText()));
                buffer.append("','statusDate':'");
                buffer.append(elem.getStatusDate() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getStatusDate()));
                buffer.append("','arch':'");
                buffer.append(elem.getArch() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getArch()));
                buffer.append("','hid':'");
                buffer.append(elem.getHid());

                Company company = elem.getCompany();
                buffer.append("','hidComp':'");
                buffer.append(company.getId());
                buffer.append("','company':'");
                buffer.append(MLString(company.getName()));

                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_SmgsScan(List<CimSmgsScan> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (CimSmgsScan elem : data) {
                // checkBeanProps(elem);
                buffer.append("{");
                // buffer.append("'nsiName':'");
                // buffer.append(elem.getNsiFName() == null ? "" :
                // elem.getNsiFName());
                buffer.append("'fileName':'");
                buffer.append(javascriptString(elem.getFileName()));
                buffer.append("','dattr':'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));
                buffer.append("','hid':'");
                buffer.append(elem.getHid());
                buffer.append("','contentType':'");
                buffer.append(elem.getContentType());
                buffer.append("','length':'");
                buffer.append(elem.getLength());

                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_Aperak(Set<AperakDet> data, Integer total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (AperakDet elem : data) {
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(elem.getHid());
                buffer.append(",errText2:'");
                buffer.append(javascriptString(elem.getErrText2()));
                buffer.append("',errText:'");
                buffer.append(elem.getErrText());
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_Comnt(Set<CsComntDet> data) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + data.size() + ", 'rows': [");

            for (CsComntDet elem : data) {
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(elem.getHid());
                buffer.append(",seg:'");
                String seg = elem.getSeg();
                seg = seg.substring(seg.indexOf('.') + 1);
                buffer.append(javascriptString(seg));
                buffer.append("',text:'");
                buffer.append(javascriptString(elem.getText()));
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_UsrList(List<Usr> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && !data.isEmpty()) {
            buffer.append("{'total':" + total + ", 'rows': [");
            String prefix = "";
            for (Usr elem : data) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("'un':'");
                buffer.append(javascriptString(elem.getUn()));
                buffer.append("','group':'");
                buffer.append(javascriptString(elem.getGroup().getName()));
                buffer.append("','groupsIds':'");
                buffer.append(javascriptString(elem.buildGroupsIds()));
                buffer.append("','locked':'");
                buffer.append(elem.isLocked());
                buffer.append("','su':'");
                buffer.append(elem.isSu());
                buffer.append("','privilegsIds':'");
                buffer.append(javascriptString(elem.buildPrivilegsIds()));
                buffer.append("','email':'");
                buffer.append(javascriptString(elem.getEmail()));
                buffer.append("','lng':'");
                buffer.append(javascriptString(elem.getLng()));
                // buffer.append("','strans':'");
                // buffer.append(elem.isStrans());
                buffer.append("','namKlient':'");
                buffer.append(javascriptString(elem.getNamKlient()));
                buffer.append("'");
                buffer.append("}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_ProjList(List<Project> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && !data.isEmpty()) {
            buffer.append("{'total':" + total + ", 'rows': [");
            String prefix = "";
            for (Project elem : data) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:'");
                buffer.append(elem.getHid());
                buffer.append("',name:'");
                buffer.append(javascriptString(elem.getName()));
                buffer.append("',grps:'");
                buffer.append(javascriptString(elem.buildGroups()));
                buffer.append("',rts:'");
                buffer.append(javascriptString(elem.buildRoutes()));
                buffer.append("'");
                buffer.append("}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_UsrGrList(List<UsrGroupsDir> data) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'rows': [");
            String prefix = "";
            for (UsrGroupsDir elem : data) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("'name':'");
                buffer.append(javascriptString(elem.getName()));
                // buffer.append("','deptrans':'");
                // buffer.append(javascriptString(elem.getDeptrans()));
                buffer.append("','descr':'");
                buffer.append(javascriptString(elem.getDescr()));
                // buffer.append("','locked':'");
                // buffer.append(elem.isLocked());
                buffer.append("'");
                buffer.append("}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_UsrPrivList(List<UsrPrivilegsDir> data) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'rows': [");
            String prefix = "";
            for (UsrPrivilegsDir elem : data) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("'name':'");
                buffer.append(javascriptString(elem.getName()));
                buffer.append("','descr':'");
                buffer.append(javascriptString(elem.getDescr()));
                // buffer.append("','locked':'");
                // buffer.append(elem.isLocked());
                buffer.append("'");
                buffer.append("}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'rows':[]}");
        }
        return buffer.toString();
    }

    public static String emptyJSONResult() {

        return "{'total':0, 'rows':''}";
    }

    public static String convert2JSON_Smgs_Save_Results(Object smgs, String name) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        return convert2JSON_Smgs_Save_Results(smgs, name, null);
    }

    public static String convert2JSON_Smgs_Save_Results(Object smgs, String name, String doc) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        doc = doc != null ? (",doc:" + doc) : "";
        return "{success: true, hid:" + findHids(smgs, name) + doc + "}";
    }

    public static String convert2JSON_Ved_Save_Results(Ved ved) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        return "{success: true, hid:{'ved.hid':" + ved.getHid() + "}}";
    }

    public static String convert2JSON_Hid(CimSmgs smgs) {
        return "{success: true, 'hid':" + smgs.getHid() + "}";
    }

    public static String convert2JSON_Usr_Save_Results(Usr usr) {
        return "{success: true, 'hid':'" + usr.getUn() + "'}";
    }

    public static String convert2JSON_UsrGr_Save_Results(UsrGroupsDir usrGr) {
        return "{success: true, 'hid':'" + usrGr.getName() + "'}";
    }

    public static String convert2JSON_Smgs_Save_Results1(ArrayList<Long> hids) {
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append("success: true");
        sb.append(",");
        sb.append("hids:");
        sb.append("[");
        for (Long elem : hids) {
            sb.append(elem);
            sb.append(",");
        }
        sb.replace(sb.lastIndexOf(","), sb.length(), "");
        sb.append("]");
        sb.append("}");
        return sb.toString();
    }

    public static String convert2JSON_Smgs_Save_Results() {
        return "{success: true}";
    }

    public static String convert2JSON_FTS_Save_Results() {
        return "{success: true}";
    }

    public static String convert2JSON_SmgsScan_Save_Results(CimSmgsScan smgs) {
        return "{success: true, 'hid':'" + smgs.getHid() + "'}";
    }

    public static String convert2JSON_Smgs_Status(int owner, int allowed, int status) {
        return "{success: true, 'owner':" + owner + ", 'form':" + allowed + ", 'status':" + status + "}";
    }

    public static String convert2JSON_Save_Results() {
        return "{success: true}";
    }

    public static String convert2JSON_Invoice_Save_Results() {
        return "{success: true}";
    }

    public static String convert2JSON_PackList_Save_Results() {
        return "{success: true}";
    }

    public static String convert2JSON_True() {
        return "{success: true}";
    }

    public static String convert2JSON_TrueWithMsg(String msg) {
        return String.format("{success: true, msg:'%s'}", StringUtils.defaultString(msg));
    }

    public static String convert2JSON_True(String msg) {
        return msg != null && msg.length() > 0 ? String.format("{success: true, result:'%s'}", msg) : convert2JSON_True();
    }

    public static String convert2JSON_True(String msg,List<String> errors) {
        StringBuilder errorsString= new StringBuilder();
        for (String error : errors){
            errorsString.append(error);
        }
        return String.format("{success: true, result:'%s', errors:'%s'}", msg,errorsString.toString());
    }

    public static String convert2JSON_False() {
        return "{success: false}";
    }

    public static String convert2JSON_False(String msg) {
        return String.format("{success: false, msg:'%s'}", StringUtils.defaultString(msg));
    }

    public static String convert2JSON_IFTMIN_Results1() {
        return "{err:'Нет накладных для отправки', success: false}";
    }

    public static String convert2JSON_IFTMIN_Results(List<String> errors) {
        if (errors.size() == 0)
            return "{success: true}";
        else {
            String res = "{err:'Накладные ";
            for (String elem : errors)
                res += elem + " ";
            res += "',success: false}";
            return res;
        }
    }

    public static String convert2JSON_SendingDocsWait() {
        return "{success: true, msg:'Идет пакетная обработка данных. Проверьте состояние отправки через некоторое время, обновив список'}";
    }

    public static String convert2JSON_SendingDocs(int count) {
        return String.format("{success: true, msg:'Обработано %s накладных'}", count);
    }

    public static Map<String,List<GridConfig>> gridConfigList2Map(List<GridConfig> gridConfigs)
    {
        Map<String,List<GridConfig>> configMap= new HashMap<>();

        for (GridConfig config : gridConfigs)
        {
            if(configMap.get(config.getItemId())!=null)
            {
                configMap.get(config.getItemId()).add(config);
            }
            else
            {
                List<GridConfig> configList=new ArrayList<>();
                configList.add(config);
                configMap.put(config.getItemId(),configList);
            }
        }
        return configMap;
    }

    public static String convert2JSON_UserProfile(List<GridConfig> gridConfigs, List<DocDir> docs, myUser user, UsrDAO dao) {


        StringBuffer buffer = new StringBuffer();
        buffer.append("{priv: [");
        String prefix = "";
        for (GrantedAuthority auth : user.getAuthorities()) {
            buffer.append(prefix);
            prefix = ",";
            buffer.append("'");
            buffer.append(javascriptString(auth.getAuthority()));
            buffer.append("'");
        }
        buffer.append("]");

        if (docs != null && docs.size() > 0) {
            prefix = "";
            buffer.append(",docs: [");
            for (DocDir doc : docs) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(doc.getHid() + ",");
                buffer.append("name:'");
                buffer.append(javascriptString(doc.getName()) + "',");
                buffer.append("descr:'");
                buffer.append(javascriptString(doc.getDescr()) + "',");
                buffer.append("alias:'");
                buffer.append(javascriptString(doc.getAlias()) + "',");
                buffer.append("groupAlias:'");
                buffer.append(javascriptString(doc.getGroupAlias()) + "',");
//                buffer.append("aliasChild:'");
//                buffer.append(javascriptString(doc.getAliasChild()) + "',");
                buffer.append("range:'");
                buffer.append(javascriptString(doc.getRange()) + "',");
                buffer.append("prefix:'");
                buffer.append(javascriptString(doc.getPrefix()) + "',");
                buffer.append("type:");
                buffer.append(doc.getType() != null ? doc.getType() : "''");
                buffer.append("}");
            }
            buffer.append("]");
        }
        // записываем по
        if (gridConfigs != null && gridConfigs.size() > 0) {
            Map<String,List<GridConfig>> configMap=gridConfigList2Map(gridConfigs);
            prefix = "";
            buffer.append(",gridConfig: {");
            for(String itemId:configMap.keySet()) {
                buffer.append(prefix+itemId+": {");
                prefix="";
                for (GridConfig config : configMap.get(itemId)) {
                    buffer.append(prefix+config.getDataIndex()+":");
                    prefix = ",";
                    buffer.append("{");
                    buffer.append("width:'");
                    buffer.append(javascriptString(config.getWidth()==null?"":config.getWidth().toString()) + "',");
                    buffer.append("sort:'");
                    buffer.append(javascriptString(Byte.toString(config.getSort())) + "',");
                    buffer.append("hidden:'");
                    buffer.append(javascriptString(Boolean.toString(config.isHidden())) + "'");
                    buffer.append("}");
                }
                buffer.append("}");
            }
            buffer.append("}");
        }

        buffer.append(",un: '");
        buffer.append(user.getUsr().getUn());
        buffer.append("',group: '");
        buffer.append(user.getUsr().getGroup().getName());
        buffer.append("',lang: '");
        Usr usr=dao.getById(user.getUsr().getUn(),false);
        buffer.append(usr.getLng()!=null?usr.getLng():"");
        buffer.append("',fio: '");
        buffer.append(user.getUsr().getNamKlient() != null ? user.getUsr().getNamKlient() : "");
        buffer.append("'");
        buffer.append("}");
        return buffer.toString();
    }

//    public static String convert2JSON_Num2Str(CimSmgs smgs) {
//		StringBuffer buffer = new StringBuffer();
//		buffer.append("{priv: [");
//
//		buffer.append("]}");
//		return buffer.toString();
//	}

    public static String MLString(String in, String lang) {
        if (in == null || lang == null)
            return "";
        return doMLString(in, lang);
    }

    public static String MLString(String in) {
        if (in == null)
            return "";
        return doMLString(in, "ru");
    }

    private static String doMLString(String in, String lang) {
        MLString mlStr = new MLString();
        mlStr.unmarshal(in);
        in = mlStr.getText(lang);
        return javascriptString(in);
    }

    /**
     * Change quote and newline characters to their javascript character literal
     * representations.
     */
    public static String javascriptString(String in) {
        if (in == null)
            return "";
        else {
            // result = new StringBuffer(in);
            // if(javascriptString(result))
            // {
            // return result.toString().trim();
            // }
            return StringParser.encode(in).replaceAll("^\"|\"$", "");
        }
    }

    public static void checkBeanProps(Object smgs) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        PropertyUtilsBean pub = new PropertyUtilsBean();
        @SuppressWarnings("unchecked")
        Map<String, Object> props = pub.describe(smgs);
        Set<Map.Entry<String, Object>> es = props.entrySet();
        for (Map.Entry<String, Object> elem : es) {
            Class<?> propertyType = PropertyUtils.getPropertyType(smgs, elem.getKey());
            if (elem.getValue() != null) {
                if (propertyType.isAssignableFrom(java.lang.String.class)) {
                    PropertyUtils.setProperty(smgs, elem.getKey(), javascriptString((String) elem.getValue()).trim());
                } else if (propertyType.isAssignableFrom(java.util.Map.class)) {
                    Map<?, ?> map = (Map<?, ?>) PropertyUtils.getProperty(smgs, elem.getKey());
                    Set<?> inEs = map.entrySet();
                    for (Object inElem : inEs) {
                        checkBeanProps(((Map.Entry<?, ?>) inElem).getValue());
                    }
                }
                // else if(SpecSimbAware.class.isAssignableFrom(propertyType))
                // {
                // checkBeanProps(elem.getValue());
                // }
            }
        }
    }

    public static void delHids(Object obj) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        if (obj == null) {
            return;
        }
        PropertyUtilsBean pub = new PropertyUtilsBean();
        pub.setProperty(obj, "hid", null);

        @SuppressWarnings("unchecked")
        Map<String, Object> props = pub.describe(obj);
        Set<Map.Entry<String, Object>> es = props.entrySet();
        for (Map.Entry<String, Object> elem : es) {
            Class<?> propertyType = PropertyUtils.getPropertyType(obj, elem.getKey());
            if (propertyType.isAssignableFrom(java.util.Map.class)) {
                Map<?, ?> map = (Map<?, ?>) PropertyUtils.getProperty(obj, elem.getKey());
                Set<?> inEs = map.entrySet();
                for (Object inElem : inEs) {
                    delHids(((Map.Entry<?, ?>) inElem).getValue());
                }
            } else if (propertyType.isAssignableFrom(java.util.Set.class)) {
                Set<?> set = (Set<?>) PropertyUtils.getProperty(obj, elem.getKey());
                if(set != null){
                    for (Object inElem : set) {
                        delHids(inElem);
                    }
                }
            }
        }
    }

    private static void findHidsBuild(Object obj, StringBuffer sb, PropertyUtilsBean pub, String name) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
//		Long hid = (Long) pub.getProperty(obj, "hid");
//		if(hid == null){
//			HibernateUtil.getSession().refresh(obj);
//		}
        sb.append(pub.getProperty(obj, "hid"));
        @SuppressWarnings("unchecked")
        Map<String, Object> props = pub.describe(obj);
        Set<Map.Entry<String, Object>> es = props.entrySet();
        for (Map.Entry<String, Object> elem : es) { // obj properties
            Class<?> propertyType = pub.getPropertyType(obj, elem.getKey()); // prop name
            if (propertyType.isAssignableFrom(java.util.Map.class)) {
                Map<?, ?> map = (Map<?, ?>) pub.getProperty(obj, elem.getKey());
                Set<?> inEs = map.entrySet();
                int index = 0;
                String nam;
                for (Object inElem : inEs) {
                    sb.append(",");
                    nam = name + "." + elem.getKey() + "[" + index++ + "]";
                    sb.append("'" + nam + ".hid':");
                    findHidsBuild(((Map.Entry<?, ?>) inElem).getValue(), sb, pub, nam);
                }
            }
        }
    }

    public static String findHids(Object obj, String name) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        PropertyUtilsBean pub = new PropertyUtilsBean();
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append("'" + name + ".hid':");
        findHidsBuild(obj, sb, pub, name);
        if (!(obj instanceof PackDoc)) {
            sb.append(","); // pack hid
            sb.append("'" + name + ".packDoc.hid':");
            sb.append(((PackDoc) pub.getProperty(obj, "packDoc")).getHid());
        }
        sb.append("}");
        return sb.toString();
    }

    public static String convert2JSON_NsiCurrency(List<NsiCurrency> currency, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (currency != null && currency.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");
            for (NsiCurrency elem : currency) {
                buffer.append("{");
                buffer.append("'hid':'");
                buffer.append(elem.getHid());
                buffer.append("','abv3':'");
                buffer.append(javascriptString(elem.getAbv3()));
                buffer.append("','name':'");
                buffer.append(javascriptString(elem.getName()));
                buffer.append("'},");
            }
            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiTnved(List<NsiTnved4> tnveds, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (tnveds != null && tnveds.size() > 0) {
            buffer.append("{'total':").append(total).append(", 'rows': [");
            for (NsiTnved4 elem : tnveds) {
                buffer.append("{");
                buffer.append("'hid':'");
                buffer.append(elem.getHid());
                buffer.append("','kod':'");
                buffer.append(javascriptString(elem.getKod()));
                buffer.append("','naim':'");
                buffer.append(javascriptString(elem.getNaim()));
                buffer.append("'},");
            }
            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_FileList(List<CimSmgsFile> files, Long total, Usr usr) {
        StringBuilder buffer = new StringBuilder();
        if (files != null && files.size() > 0) {
            buffer.append("{'total':").append(total).append(", 'rows': [");
            String prefix = "";
            for (CimSmgsFile elem : files) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(elem.getHid());
                buffer.append(",contentType:'");
                buffer.append(javascriptString(elem.getContentType()));
                buffer.append("',fileName:'");
                buffer.append(javascriptString(elem.getFileName()));
                buffer.append("',length:");
                buffer.append(elem.getLength());
                buffer.append(",fileInf:");
                buffer.append(elem.getCimSmgsFileInf().getHid());
                buffer.append(",userFlag:");
                buffer.append(elem.getUserFlag());
                buffer.append(",altered:'");
                buffer.append(elem.getDat() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDat()));
                buffer.append("',un:'");
                buffer.append(StringUtils.defaultString(elem.getUn()));
                buffer.append("',newDoc:");
                boolean newDoc = true;
                for (CimSmgsFileNew cimSmgsFileNew : elem.getCimSmgsFileNew() ) {
                    if (usr.getGroup().getName().equalsIgnoreCase(cimSmgsFileNew.getTrans())) {
                        newDoc = false;
                        break;
                    }
                }
                buffer.append(newDoc);
                buffer.append("}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_FileInfList(List<CimSmgsFileInf> files, Long total, myUser usr) {
        StringBuilder buffer = new StringBuilder();
        if (files != null && files.size() > 0) {
            buffer.append("{'total':").append(total).append(", 'rows': [");
            String prefix = "";
            for (CimSmgsFileInf elem : files) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(elem.getHid());
                buffer.append(",nkon:'");
                buffer.append(javascriptString(elem.getNkon()));
                buffer.append("',dattr:'");
                buffer.append(elem.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDattr()));
                buffer.append("',type:'");
                buffer.append(elem.getType());
                buffer.append("',trans:'");
                buffer.append(elem.getTrans());
                buffer.append("',un:'");
                buffer.append(elem.getUn());
                buffer.append("',packId:");
                buffer.append(elem.getPackDoc().getHid());
                buffer.append(",routeId:");
                buffer.append(elem.getRoute().getHid());

                switch (elem.getType()) {
                    case "filecimsmgs":  // Графика ЦИМ/СМГС
                        if (elem.getPackDoc().getCimSmgses() != null && elem.getPackDoc().getCimSmgses().size() > 0) {
                            for (CimSmgs cimSmgs : elem.getPackDoc().getCimSmgses()) {
                                if (cimSmgs.getType() == 1) {
                                    buffer.append(",numCont:'");

                                    for (CimSmgsCarList vag : cimSmgs.getCimSmgsCarLists().values()) {
                                        for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                                            buffer.append(javascriptString(kon.getUtiN()));
                                            buffer.append("<br/>");
                                        }
                                    }

                                    buffer.append("',dateOtpr:'");
                                    buffer.append(cimSmgs.getG281() == null ? "" : new SimpleDateFormat("dd.MM.yyyy").format(cimSmgs.getG281()));

                                    buffer.append("',numOtpr:'");
                                    buffer.append(javascriptString(cimSmgs.getG694()));

                                    break;
                                }
                            }
                            buffer.append("'");
                        }
                        break;
                    case "files":    // Прочие документы
                        if (elem.getPackDoc().getCimSmgses() != null && elem.getPackDoc().getCimSmgses().size() > 0) {
                            List<CimSmgs> smgsList = new ArrayList<>();
                            CimSmgs cimsmgs = null;
                            CimSmgs smgs = null;
                            for (CimSmgs cimSmgs : elem.getPackDoc().getCimSmgses()) {
                                if(cimSmgs.getType() == 1){
                                    cimsmgs = cimSmgs;
                                } else if(cimSmgs.getType() == 12){
                                    smgs = cimSmgs;
                                }
                            }

                            StringBuilder numCont = new StringBuilder();
                            StringBuilder numWag = new StringBuilder();
                            String dateOtpr = "";
                            String numOtpr = "";

                            if(cimsmgs != null){
                                for (CimSmgsCarList vag : cimsmgs.getCimSmgsCarLists().values()) {
                                    for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                                        numCont.append(javascriptString(kon.getUtiN()));
                                        numCont.append("<br/>");
                                    }
                                }

                                dateOtpr = cimsmgs.getG281() == null ? "" : new SimpleDateFormat("dd.MM.yyyy").format(cimsmgs.getG281());

                                numOtpr = javascriptString(cimsmgs.getG694());
                            }

                            if(numCont.length() == 0 && smgs != null){
                                for (CimSmgsCarList vag : smgs.getCimSmgsCarLists().values()) {
                                    for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                                        numCont.append(javascriptString(kon.getUtiN()));
                                        numCont.append("<br/>");
                                    }
                                    numWag.append(javascriptString(vag.getNvag()));
                                    numWag.append("<br/>");
                                }
                            }

                            if(dateOtpr.length() == 0 && smgs != null){
                                dateOtpr = smgs.getG281() == null ? "" : new SimpleDateFormat("dd.MM.yyyy").format(smgs.getG281());
                            }

                            if(numOtpr.length() == 0 && smgs != null){
                                numOtpr = javascriptString(smgs.getG694());
                            }

                            buffer.append(",numCont:'");
                            buffer.append(numCont);
                            buffer.append("',numWag:'");
                            buffer.append(numWag);
                            buffer.append("',dateOtpr:'");
                            buffer.append(dateOtpr);
                            buffer.append("',numOtpr:'");
                            buffer.append(numOtpr);
                            if(smgs != null) {
                                buffer.append("',npoezd:'");
                                buffer.append(StringUtils.defaultString(smgs.getNpoezd()));
                            }
                            buffer.append("',newDoc:'");
                            byte newDoc = 0;
                            String userGroupName = usr.getUsr().getGroup().getName();
                            for (Object cimSmgsFile : elem.getCimSmgsFiles()) {
                                newDoc = 1;
                                boolean foundUnRead =  ((CimSmgsFile) cimSmgsFile).getCimSmgsFileNew().stream().noneMatch((nf -> userGroupName.equalsIgnoreCase(nf.getTrans())));
                                if (foundUnRead) {
                                    newDoc = 2;
                                    break;
                                }
                            }
                            buffer.append(newDoc);
                            buffer.append("'");
                        }
                        break;
                    default:
                        buffer.append(",numOtpr:''");
                        buffer.append(",numCont:''");
                        buffer.append(",dateOtpr:'");
                        buffer.append("'");
                        break;
                }

                buffer.append("}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_NsiDeliv(List<NsiDeliv> delivs, Long total) {
        StringBuilder buffer = new StringBuilder();
        if (delivs != null && delivs.size() > 0) {
            buffer.append("{'total':").append(total).append(", 'rows': [");
            String prefix = "";
            for (NsiDeliv deliv : delivs) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(deliv.getHid());
                buffer.append(",kod:'");
                buffer.append(javascriptString(deliv.getKod()));
                buffer.append("',name:'");
                buffer.append(javascriptString(deliv.getDnameR()));
                buffer.append("'}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_NsiUpak(List<NsiUpak> upaks, Long total) {
        StringBuilder buffer = new StringBuilder();
        if (upaks != null && upaks.size() > 0) {
            buffer.append("{'total':").append(total).append(", 'rows': [");
            String prefix = "";
            for (NsiUpak upak : upaks) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(upak.getHid());
                buffer.append(",kod:'");
                buffer.append(javascriptString(upak.getKodOon()));
                buffer.append("',kypk:'");
                buffer.append(javascriptString(upak.getKypk()));
                buffer.append("',name:'");
                buffer.append(javascriptString(upak.getNzypRu()));
                buffer.append("',nameDe:'");
                buffer.append(javascriptString(upak.getNzypDe()));
                buffer.append("'}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_NsiGroups(List<UsrGroupsDir> groups, Long total) {
        StringBuilder buffer = new StringBuilder();
        if (groups != null && groups.size() > 0) {
            buffer.append("{'total':").append(total).append(", 'rows': [");
            String prefix = "";
            for (UsrGroupsDir group : groups) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("name:'");
                buffer.append(javascriptString(group.getName()));
                buffer.append("',descr:'");
                buffer.append(javascriptString(group.getDescr()));
                buffer.append("'}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_NsiRouteDocs(List<DocDir> docs) {
        StringBuilder buffer = new StringBuilder();
        if (docs != null && docs.size() > 0) {
            buffer.append("{'rows': [");
            String prefix = "";
            for (DocDir doc : docs) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("name:'");
                buffer.append(javascriptString(doc.getName()));
                buffer.append("',descr:'");
                buffer.append(javascriptString(doc.getDescr()));
                buffer.append("',hid:");
                buffer.append(doc.getHid());
                buffer.append("}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'rows':[]}");
        }
        return buffer.toString();
    }

    /*
    public static String convert2JSON_PrintBlanks(List<PrintBlank> blanks) {
        StringBuilder buffer = new StringBuilder();
        if (blanks != null && blanks.size() > 0) {
            buffer.append("{'rows': [");
            String prefix = "";
            for (PrintBlank doc : blanks) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("name:'");
                buffer.append(javascriptString(doc.getName()));
                buffer.append("',page:");
                buffer.append(doc.getPage());
                buffer.append(",hid:");
                buffer.append(doc.getHid());
                buffer.append("}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'rows':[]}");
        }
        return buffer.toString();
    }
*/
    public static String convert2JSON_PrintBlanks(List<PrintBlank> blanks) {
        StringBuilder buffer = new StringBuilder();
        if (blanks != null && blanks.size() > 0) {
            buffer.append("{'rows': [");
            String prefix = "";
            for (PrintBlank doc : blanks) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("name:'");
                buffer.append(javascriptString(doc.getName()));
                buffer.append("',fileName:'");
                buffer.append(javascriptString(doc.getFileName()));
                buffer.append("',contentType:'");
                buffer.append(javascriptString(doc.getContentType()));
                buffer.append("',length:");
                buffer.append(doc.getLength());
                buffer.append(",page:");
                buffer.append(doc.getPage());
                buffer.append(",ncopy:");
                buffer.append(doc.getNcopy());
                buffer.append(",preview:");
                buffer.append(doc.isPreview());
                buffer.append(",hid:");
                buffer.append(doc.getHid());
                buffer.append("}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_Project_Save_Results(Project project) {
        StringBuffer sb = new StringBuffer("{success: true, 'hid':");
        sb.append("{");
        sb.append("'project.hid':");
        sb.append(project.getHid());
        sb.append(",");
        sb.append("'route_hids':'");
        String prefix = "";
        for (Route route : project.getRoutes()) {
            sb.append(prefix);
            prefix = ",";
            sb.append(route.getHid() != null ? route.getHid() : "");
        }
        sb.append("'");
        sb.append("}");
        sb.append("}");
        return sb.toString();
//        return "{success: true, 'hid':" + findHids(smgs, name) + "}";
    }

    public static String convert2JSON_PrintTemlate_Save_Results(PrintTemplates prnTempl) {
        StringBuilder sb = new StringBuilder("{success: true, 'hid':");
        sb.append("{");
        sb.append("'prnTempl.hid':");
        sb.append(prnTempl.getHid());
        sb.append(",");
        sb.append("'prnData_hids':'");
        String prefix = "";
        for (PrintData prnData : prnTempl.getPrintDatas().values()) {
            sb.append(prefix);
            prefix = ",";
            sb.append(prnData.getHid());
        }
        sb.append("'");
        sb.append("}");
        sb.append("}");
        return sb.toString();
//        return "{success: true, 'hid':" + findHids(smgs, name) + "}";
    }

    public static String convert2JSON_NsiDirList(List<NsiDir> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (NsiDir elem : data) {
                buffer.append("{");
                buffer.append("name:'");
                buffer.append(javascriptString(elem.getName()));
                buffer.append("',descr:'");
                buffer.append(javascriptString(elem.getDescr()));
                buffer.append("',zipped:");
                buffer.append(elem.isZipped());
                buffer.append(",hid:");
                buffer.append(elem.getHid());
                buffer.append("},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiRoad(List<Road> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (Road elem : data) {
                buffer.append("{");
                buffer.append("roadNo:'");
                buffer.append(elem.getRoadNo());
                buffer.append("',roadName:'");
                buffer.append(javascriptString(elem.getRoadName()));
                buffer.append("',roadUn:");
                buffer.append(elem.getRoadUn());
                buffer.append("},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiCountriesGd(List<Road> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (Road elem : data) {
                buffer.append("{");
                buffer.append("roadNo:'");
                buffer.append(elem.getRoadNo());
                Management mn = elem.getManagement();
                String cntrnm = "";
                String mngno = "";
                if (mn != null) {
                    mngno = mn.getManagNo();
                    Countrys cn = mn.getCountrys();
                    if (cn != null) {
                        cntrnm = cn.getCountryName();
                    }
                }
                buffer.append("',managNo:'");
                buffer.append(mngno);
                buffer.append("',roadName:'");
                buffer.append(javascriptString(elem.getRoadName()));
                buffer.append("',countryName:'");
                buffer.append(javascriptString(cntrnm));
                buffer.append("',roadUn:");
                buffer.append(elem.getRoadUn());
                buffer.append("},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiDangCode(List<DangCode> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (DangCode elem : data) {
                buffer.append("{");
                buffer.append("hid:'");
                buffer.append(elem.getHid());
                buffer.append("',code:'");
                buffer.append(elem.getCode());
                buffer.append("',descr:'");
                buffer.append(javascriptString(elem.getDescr()));
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_CargoGng(List<CargoGng> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (CargoGng elem : data) {
                buffer.append("{");
                buffer.append("c_gn_un:'");
                buffer.append(elem.getC_gn_un());
                buffer.append("',cargo_group:'");
                buffer.append(elem.getCargo_group());
                buffer.append("',cargo_fullname:'");
                buffer.append(javascriptString(elem.getCargo_fullname()));
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_Cargo(List<Cargo> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (Cargo elem : data) {
                buffer.append("{");
                buffer.append("car_un:'");
                buffer.append(elem.getCar_un());
                buffer.append("'code':'");
                buffer.append(javascriptString(elem.getCargo()));
                buffer.append("','name':'");
                buffer.append(javascriptString(elem.getCargo_fullname()));
                buffer.append("','id':'"); // big_decimal
                buffer.append(elem.getCar_id() == null ? "" : elem.getCar_id());
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiVeterin(List<Veterin> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (Veterin elem : data) {
                buffer.append("{");
                buffer.append("hid:'");
                buffer.append(elem.getHid());
                buffer.append("',kgvn:'");
                buffer.append(elem.getKgvn());
                buffer.append("',nzgr:'");
                buffer.append(javascriptString(elem.getNzgr()));
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiKarantin(List<Karantin> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (Karantin elem : data) {
                buffer.append("{");
                buffer.append("hid:'");
                buffer.append(elem.getHid());
                buffer.append("',kgvn:'");
                buffer.append(elem.getKgvn());
                buffer.append("',nzgr:'");
                buffer.append(javascriptString(elem.getNzgr()));
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_NsiManagement(List<Management> data, Long total) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");

            for (Management elem : data) {
                buffer.append("{");
                buffer.append("managNo:'");
                buffer.append(elem.getManagNo());
                buffer.append("',managName:'");
                buffer.append(javascriptString(elem.getManagName()));
                buffer.append("',managUn:'");
                buffer.append(elem.getManagUn());
                buffer.append("',mnamerus:'");
                buffer.append(elem.getMNameRus());
                Countrys country = elem.getCountrys();
                if (country != null) {
                    buffer.append("',countryname:'");
                    buffer.append(javascriptString(country.getCountryName()));
                } else {
                    buffer.append("',countryname:'");
                }
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_History(List<Status> data) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'rows': [");

            for (Status elem : data) {
                buffer.append("{");
                buffer.append("status:'");
                buffer.append(elem.getStatusDir().getName());
                buffer.append("',statusDe:'");
                buffer.append(elem.getStatusDir().getNameDe());
                buffer.append("',datBegin:'");
                buffer.append(elem.getDatBegin() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(elem.getDatBegin()));
                buffer.append("',user:'");
                buffer.append(elem.getUsr().getUn());
                buffer.append("',hid:'");
                buffer.append(elem.getHid());
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        } else {
            buffer.append("{'rows':[]}");
        }

        return buffer.toString();
    }

    public static String convert2JSON_Logs(List<LoggingEvent> logs, Long total) {
        StringBuilder buffer = new StringBuilder();
        if (logs != null && logs.size() > 0) {
            buffer.append("{'total':").append(total).append(", 'rows': [");
            String prefix = "";
            for (LoggingEvent log : logs) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("eventId:'");
                buffer.append(log.getEventId());

                for (LoggingEventProperty logProp : log.getLoggingEventProperties()) {
                    if (logProp.getId().getMappedKey().equals("userName")) {
                        buffer.append("',userName:'");
                        buffer.append(logProp.getMappedValue());
                    }
                    if (logProp.getId().getMappedKey().equals("req.remoteHost")) {
                        buffer.append("',remoteHost:'");
                        buffer.append(logProp.getMappedValue());
                    }
                    if (logProp.getId().getMappedKey().equals("req.userAgent")) {
                        buffer.append("',userAgent:'");
//                        buffer.append(logProp.getMappedValue());
                        UserAgent ua = new UserAgent(logProp.getMappedValue());
                        buffer.append(ua.toString());
//                        buffer.append(ua.getBrowser().toString());
//                        buffer.append("; ");
//                        buffer.append(ua.getBrowserVersion().toString());
//                        buffer.append("; ");
//                        buffer.append(ua.getOperatingSystem().toString());
                    }
                    if (logProp.getId().getMappedKey().equals("req.requestURI")) {
                        buffer.append("',requestURI:'");
                        buffer.append(logProp.getMappedValue());
                    }
                }
                buffer.append("',timestamp:'");
                buffer.append(new SimpleDateFormat("dd.MM.yyyy HH:mm:ss,S").format(new Date(log.getTimestmp().longValue())));
                buffer.append("',formattedMessage:'");
                buffer.append(javascriptString(log.getFormattedMessage()));
                buffer.append("',loggerName:'");
                buffer.append(javascriptString(log.getLoggerName()));
                buffer.append("',levelString:'");
                buffer.append(javascriptString(log.getLevelString()));
                buffer.append("',threadName:'");
                buffer.append(javascriptString(log.getThreadName()));
//                buffer.append("',referenceFlag:'");
//                buffer.append(log.getReferenceFlag());
                buffer.append("',callerFilename:'");
                buffer.append(javascriptString(log.getCallerFilename()));
                buffer.append("',callerClass:'");
                buffer.append(javascriptString(log.getCallerClass()));
                buffer.append("',callerMethod:'");
                buffer.append(javascriptString(log.getCallerMethod()));
                buffer.append("',callerLine:'");
                buffer.append(javascriptString(log.getCallerLine()));
                buffer.append("'}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_UsrText(Usr user) {
        StringBuilder buffer = new StringBuilder();
        buffer.append("{");
        buffer.append("success: true,");
        buffer.append("data: {");
        buffer.append("un:");
        buffer.append("'" + user.getUn() + "',");
        buffer.append("name:");
        buffer.append("'" + (user.getNamKlient() != null ? user.getNamKlient() : "") + "',");
        buffer.append("email:");
        buffer.append("'" + (user.getEmail() != null ? user.getEmail() : "") + "',");
        buffer.append("group:");
        buffer.append("'" + user.getGroup().getName() + "'");
        buffer.append("}}");
        return buffer.toString();
    }

    public static String convert2JSON_NsiRoute(List<Route> routes, Long total) {
        StringBuilder buffer = new StringBuilder();
        if (routes != null && routes.size() > 0) {
            buffer.append("{'total':").append(total).append(", 'rows': [");
            String prefix = "";
            for (Route route : routes) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(route.getHid());
                buffer.append(",name:'");
                buffer.append(javascriptString(route.getName()));
                buffer.append("',project:'");
                buffer.append(javascriptString(route.getProject().getName()));
                buffer.append("'}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_NsiProject(List<Project> projects, Long total) {
        StringBuilder buffer = new StringBuilder();
        if (projects != null && projects.size() > 0) {
            buffer.append("{'total':").append(total).append(", 'rows': [");
            String prefix = "";
            for (Project project : projects) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(project.getHid());
                buffer.append(",name:'");
                buffer.append(javascriptString(project.getName()));
                buffer.append("'}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_PrintTemplatesList(List<PrintTemplates> prnTempls, Long total) {
        StringBuilder buffer = new StringBuilder();
        if (prnTempls != null && prnTempls.size() > 0) {
            buffer.append("{'total':").append(total).append(", 'rows': [");
            String prefix = "";
            for (PrintTemplates tmpl : prnTempls) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(tmpl.getHid());
                buffer.append(",docId:");
                buffer.append(tmpl.getDocDir().getHid());
                buffer.append(",name:'");
                buffer.append(javascriptString(tmpl.getName()));
                buffer.append("',defaults:");
                buffer.append(tmpl.isDefaults());
                buffer.append(",dattr:'");
                buffer.append(tmpl.getDattr() == null ? "" : new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(tmpl.getDattr()));
                buffer.append("',routes:'");
                buffer.append(javascriptString(tmpl.buildRoutes()));
                buffer.append("',blanks:'");
                String prefix1 = "";
                for(PrintBlankTemplRef blanksRefs : tmpl.getPrintBlankTemplRefs()){
                    buffer.append(prefix1);
                    prefix1 = ",";
                    buffer.append(blanksRefs.getId().getHidBlank());
                }
                buffer.append("'}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_PrintTemplatesList1(List<PrintTemplates> prnTempls, Long total, Search search, String username) {
        StringBuilder buffer = new StringBuilder();
        if (prnTempls != null && prnTempls.size() > 0) {
            buffer.append("{'total':").append(total).append(", 'rows': [");
            String prefix = "";
            for (PrintTemplates tmpl : prnTempls) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(tmpl.getHid());
                buffer.append(",docId:");
                buffer.append(tmpl.getDocDir().getHid());
                buffer.append(",name:'");
                buffer.append(javascriptString(tmpl.getName()));
                buffer.append("',selected:");
                String selected = "false";
                if(tmpl.getRouteUnPrintTemplateses().size() > 0){
                    for(RouteUnPrintTemplates refs: tmpl.getRouteUnPrintTemplateses()){
                        if(refs.getId().getHidRoute().equals(search.getRouteId()) && refs.getId().getHidUn().equals(username)){
                            selected = "true";
                            break;
                        }
                    }
                }
                buffer.append(selected);
                buffer.append("}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_PrintTemplatesList4Print(List<PrintTemplates> prnTempls, Long total) {
        StringBuilder buffer = new StringBuilder();
        if (prnTempls != null && prnTempls.size() > 0) {
            buffer.append("{'total':").append(total).append(", 'rows': [");
            String prefix = "";
            for (PrintTemplates tmpl : prnTempls) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(tmpl.getHid());
                buffer.append(",docId:");
                buffer.append(tmpl.getDocDir().getHid());
                buffer.append(",name:'");
                buffer.append(javascriptString(tmpl.getName()));
                buffer.append("'}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{'total':0, 'rows':[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_PrintWinParams(List<Integer> pages, Long nBlankRefs) {
        StringBuilder buffer = new StringBuilder();
        buffer.append("{pages:");
        buffer.append(pages.toString());
        buffer.append(",nBlanks:");
        buffer.append(nBlankRefs);
        buffer.append("}");
        return buffer.toString();
    }

    public static String convert2JSON_Doc2DocResults(int docsAmountFrom, int docsAmountTo, String docNameFrom, String docNameTo) {
        return  new StringBuilder().
                append("{success: true,").
                append("result: '").
                append("Обработано - ").
                append(docsAmountFrom).
                append(" ").
                append(docNameFrom).
                append("<br/>").
                append("Создано - ").
                append(docsAmountTo).
                append(" ").
                append(docNameTo).
                append("'}").
                toString();
    }

    /*public static String convert2JSON_Doc2DocResults(int docsAmountTo, String docNameTo) {
        return  new StringBuilder().
                append("{success: true,").
                append("result: '").
                append("Создано - ").
                append(docsAmountTo).
                append(" ").
                append(docNameTo).
                append("'}").
                toString();
    }*/

    public static String convert2JSON_Doc2DocResults(String result) {
        return result.length() > 0 ?  new StringBuilder().
                append("{success: true,").
                append("result: '").
                append(result).
                append("'}").
                toString() : convert2JSON_True();
    }

    public static String convert2JSON_FieldCommentsList(List<FieldsComments> list, Long total) {
        StringBuilder buffer = new StringBuilder();
        if (list != null && list.size() > 0) {
            buffer.append("{total:").append(total).append(", rows: [");
            String prefix = "";
            for (FieldsComments comnts : list) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(comnts.getHid());
                buffer.append(",comment:'");
                buffer.append(javascriptString(comnts.getComments()));
                buffer.append("',dattr:'");
                buffer.append(new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(comnts.getDattr()));
                buffer.append("',un:'");
                buffer.append(javascriptString(comnts.getUsr().getUn()));
                buffer.append("',fieldName:'");
                buffer.append(comnts.getFieldsDir().getName());
                buffer.append("',fieldPath:'");
                buffer.append(comnts.getFieldsDir().getPath());
                buffer.append("',fieldDescr:'");
                String fieldDescr = "";
                if(comnts.getFieldsDir().getFieldsDocsRefses().size() > 0){
                    fieldDescr = comnts.getFieldsDir().getFieldsDocsRefses().iterator().next().getDescr();
                }
                buffer.append(StringUtils.isNotBlank(fieldDescr) ? fieldDescr : StringUtils.defaultString(comnts.getFieldsDir().getDescr()));
                buffer.append("'}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{total:0, rows:[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_FieldsList(List<FieldsDir> list) {
        StringBuilder buffer = new StringBuilder();
        if (list != null && list.size() > 0) {
            buffer.append("{rows: [");
            String prefix = "";
            for (FieldsDir fields : list) {
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(fields.getHid());
                buffer.append(",name:'");
                buffer.append(javascriptString(fields.getName()));
                buffer.append("',descr:'");
                String fieldDescr = "";
                if(fields.getFieldsDocsRefses().size() > 0){
                    fieldDescr = fields.getFieldsDocsRefses().iterator().next().getDescr();
                }
                buffer.append(StringUtils.isNotBlank(fieldDescr) ? fieldDescr : StringUtils.defaultString(fields.getDescr()));
                buffer.append("'}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{rows:[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_SendingEmail() {
        return "{success: true, msg:'Инструкция отправлена'}";
    }

    public static Object findObjectByFieldValue(Collection collection, String field, Object value) {
        return CollectionUtils.find(collection, new BeanPredicate(field, PredicateUtils.equalPredicate(value)));
    }

    public static String convert2JSON_Tbc2Logs(Set<Tbc2Log> tbc2Logs) {
        StringBuilder buffer = new StringBuilder();
        if (tbc2Logs != null && tbc2Logs.size() > 0) {
            buffer.append("{rows: [");
            String prefix = "";
            for(Tbc2Log tbc2Log: tbc2Logs){
                if(tbc2Log.getTbc2Pack() != null && !tbc2Log.getTbc2Pack().getTbc2Status().isEmpty()){
                    for(Tbc2Status tbc2Status: tbc2Log.getTbc2Pack().getTbc2Status()){
                        buffer.append(prefix);
                        prefix = ",";
                        buffer.append("{");
                        buffer.append("hid:");
                        buffer.append(tbc2Status.getHid());
                        buffer.append(",status_txt:'");
                        buffer.append(javascriptString(tbc2Status.getDescription()));
                        buffer.append("',result_txt:'");
                        buffer.append(javascriptString(tbc2Status.getSignComment()));
                        buffer.append("',date_tdg:'");
                        buffer.append(tbc2Status.getChangeDate() != null ? new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(tbc2Status.getChangeDate()) : "");
                        buffer.append("'}");
                    }
                }
            }
            buffer.append("]}");
        } else {
            buffer.append("{rows:[]}");
        }
        return buffer.toString();
    }

    public static String convert2JSON_NsiCargoDanV(List<CargoDanV> cargoDanVList, Long total, List<CargoDanGV> cargoDanGVList) {
        StringBuilder buffer = new StringBuilder();
        if (cargoDanVList != null && cargoDanVList.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");
            Pattern regex = Pattern.compile("(\\d+\\.\\d+|\\d+)");
            String prefix = "";
            for(CargoDanV cargoDanV: cargoDanVList){
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(cargoDanV.getCarDanUn());
                buffer.append(",numOon:'");
                buffer.append(cargoDanV.getNumOon());
                buffer.append("',carDName:'");
                buffer.append(javascriptString(cargoDanV.getCarDName()));
                buffer.append("',codDanger:'");
                buffer.append(javascriptString(cargoDanV.getCodDanger()));

                String clazz = javascriptString(cargoDanV.getClazz());
                buffer.append("',clazz:'");
                buffer.append(clazz);

                List<String> dangSigns = getDangSign(regex, javascriptString(cargoDanV.getDangSign()), clazz);
                buffer.append("',dangSign:'");
                buffer.append(CollectionUtils.isNotEmpty(dangSigns) ?  StringUtils.join(dangSigns, ",") : "");

                buffer.append("',groupPack:'");
                buffer.append(javascriptString(cargoDanV.getGroupPack()));
                buffer.append("',emergenCard:'");
                buffer.append(cargoDanV.getEmergenCard() != null ? cargoDanV.getEmergenCard() : "");
                buffer.append("',stamps:'");

                List<String> stamps = getStamps(cargoDanGVList, clazz, dangSigns);
                buffer.append(CollectionUtils.isNotEmpty(stamps) ?  StringUtils.join(new HashSet<>(stamps), ",") : "");
                buffer.append("'}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{rows:[]}");
        }
        return buffer.toString();
    }

    private static List<String> getStamps(List<CargoDanGV> cargoDanGVList, String clazz, List<String> dangSigns) {
        List<String> stamps = new ArrayList<>();
        clazz = StringUtils.defaultString(clazz);
        if(dangSigns == null){
            dangSigns = new ArrayList<>();
        }
        if(CollectionUtils.isNotEmpty(cargoDanGVList)){
            for(CargoDanGV cargoDanGV: cargoDanGVList){
                if(StringUtils.isNotBlank(clazz) && cargoDanGV.getCarDCode().equals(clazz)){
                    stamps.add(cargoDanGV.getCarDName());
                } else {
                    for(String dangSign: dangSigns){
                        if(cargoDanGV.getCarDCode().equals(dangSign)){
                            stamps.add(cargoDanGV.getCarDName());
                            break;
                        }
                    }
                }
            }
        }
        return stamps;
    }

    private static List<String> getDangSign(Pattern regex, String dangSign, String clazz) {
        Matcher matcher = regex.matcher(dangSign);
        List<String> list = new ArrayList<>();
        while(matcher.find()){
            list.add(matcher.group(1));
        }
//        dangSign = "";
        if(!list.isEmpty()){
            if(StringUtils.isNotBlank(clazz)) {
                list.remove(clazz);
            }
            // dangSign = StringUtils.join(list, ",");
        }
        return list;
    }

    public static String convert2JSON_NsiCargoDanDe(List<CargoDanDe> cargoDanVList, Long total) {
        StringBuilder buffer = new StringBuilder();
        if (cargoDanVList != null && cargoDanVList.size() > 0) {
            buffer.append("{'total':" + total + ", 'rows': [");
            String prefix = "";
            for(CargoDanDe cargoDanV: cargoDanVList){
                buffer.append(prefix);
                prefix = ",";
                buffer.append("{");
                buffer.append("hid:");
                buffer.append(cargoDanV.getHid());
                buffer.append(",carDNameDe:'");
                buffer.append(javascriptString(cargoDanV.getCarDNameDe()));
                buffer.append("',numOonDe:'");
                buffer.append(javascriptString(cargoDanV.getNumOonDe()));
                buffer.append("',ridNhmCode:'");
                buffer.append(javascriptString(cargoDanV.getRidNhmCode()));
                buffer.append("',bem:'");
                buffer.append(javascriptString(cargoDanV.getBem()));

                buffer.append("'}");
            }
            buffer.append("]}");
        } else {
            buffer.append("{rows:[]}");
        }
        return buffer.toString();
    }


    public static String convert2JSONUploadGrafResult(List<GrCopLoader.FileItem> result) {

        StringBuilder buffer = new StringBuilder();
        buffer.append("{" +
                "success: true" +
                "," +
                "msg: [");
        for (GrCopLoader.FileItem fileItem : result) {
            buffer.append("{");
            buffer.append("id:'");
            buffer.append(fileItem.id);
            buffer.append("',file:'");
            buffer.append(fileItem.fileName);
            buffer.append("'},");
        }
        buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        return buffer.toString();
    }

    public static String convert2JSONUploadDoc9Result(String result) {
//        StringBuilder buffer = new StringBuilder();
//        buffer.append("{");
//        buffer.append("success: false");
//        buffer.append(",");
//        buffer.append("msg: ");
//        buffer.append(result);
//        buffer.append("}");
//
//        return buffer.toString();
         return convert2JSONUploadResult(result,false);
    }

    public static String convert2JSONUploadResult(String result,boolean res) {
        StringBuilder buffer = new StringBuilder();
        buffer.append("{");
        buffer.append("success:");
        buffer.append(res);
        buffer.append(",");
        buffer.append("msg: ");
        buffer.append(result);
        buffer.append("}");

        return buffer.toString();
    }
    /**
     *
     * @param absentTnveds список отсутствующих кодов ТНВЭД
     * @param presnt6 список присутствующих по 6 сиволам  кодов ТНВЭД
     * @return json
     */
    public static String convertCheckTnvedResults2Json(List<String> absentTnveds,List<String> presnt6)
    {
        StringBuilder buffer = new StringBuilder();
        buffer.append("{");
        buffer.append("absent:'");
        buffer.append(String.join(",", absentTnveds));
        buffer.append("',");
        buffer.append("presnt6:'");
        buffer.append(String.join(",", presnt6));
        buffer.append("'}");
        return buffer.toString();
    }

    /**
     * convert2JSON_trainDate converts list of CimSmgsTrainDateDTO records to json
     *
     * @param data list of CimSmgsTrainDateDTO records
     * @return result json
     */
    public static String convert2JSON_trainDate(List<CimSmgsTrainDateDTO> data) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'rows': [");

            for (CimSmgsTrainDateDTO elem : data) {
                buffer.append("{");
                buffer.append("npoezd:'");
                buffer.append(elem.getNpoezd());
                buffer.append("',count:'");
                buffer.append(elem.getCount());
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        }
        else {
            buffer.append("{'rows':[]}");
        }

        return buffer.toString();
    }

    /**
     * convert2JSON_trainDateList list of smgs records to json
     *
     * @param data list of smgs records
     * @return json
     */
    public static String convert2JSON_trainDateList(List<CimSmgs> data) {
        StringBuffer buffer = new StringBuffer();
        if (data != null && data.size() > 0) {
            buffer.append("{'rows': [");

            for (CimSmgs elem : data) {
                buffer.append("{");
                buffer.append("hid:'");
                buffer.append(elem.getHid());
                buffer.append("',g694:'");
                if (elem.getG694() != null)
                    buffer.append(elem.getG694());

                buffer.append("',vags:'");
                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                    buffer.append(javascriptString(vag.getNvag()));
                    buffer.append("<br/>");
                }
                buffer.append("',konts:'");

                for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                    for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                        buffer.append(javascriptString(kon.getUtiN()));
                        buffer.append("<br/>");
                    }
                }

                buffer.append("',g101:'");
                if (elem.getG101() != null) {
                    buffer.append(elem.getG101());
                }
                if (elem.getG101r() != null) {
                    if (elem.getG101() != null)
                        buffer.append("<br/>");
                    buffer.append(elem.getG101r());
                }

                buffer.append("',altered:'");
                buffer.append(elem.getAltered());
                buffer.append("'},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        }
        else {
            buffer.append("{'rows':[]}");
        }

        return buffer.toString();
    }

    /**
     * convert2JSON_mapPogruz list of MapPogruz records to json
     * @param data of MapPogruz records
     * @return
     */
    public static String convert2JSON_mapPogruz(List<MapPogruz> data) {
        StringBuilder buffer = new StringBuilder();

        if (data != null && data.size() > 0) {
            buffer.append("{");
            buffer.append("success: true,");
            buffer.append("'rows': [");

            for (MapPogruz elem : data) {
                buffer.append("{");
                buffer.append("cs_hid:'");
                if (elem.getCs_hid() != null)
                    buffer.append(elem.getCs_hid());

                buffer.append("',nvag:'");
                if (elem.getNvag() != null)
                    buffer.append(elem.getNvag());

                buffer.append("',utin:'");
                buffer.append(elem.getUtiN().toUpperCase());

                buffer.append("',utin_db:'");
                buffer.append(elem.getUtiN_db().toUpperCase());

                buffer.append("',g694:'");
                buffer.append(elem.getG694());

                buffer.append("',klientname:'");
                if (elem.getNvag() != null)
                    buffer.append(elem.getKlientName());

                buffer.append("',sizefoot:'");
                if (elem.getSizeFoot() != null)
                    buffer.append(elem.getSizeFoot());

                buffer.append("',uti_type:'");
                if (elem.getUti_type() != null)
                    buffer.append(elem.getUti_type());

                buffer.append("',znak:'");
                if (elem.getZnak().size() != 0)
                    buffer.append(elem.getZnak().toString());

                buffer.append("',tarakont:'");
                if (elem.getTaraKont() != 0)
                    buffer.append(elem.getTaraKont());

                buffer.append("',grpodkont:'");
                if (elem.getGrPodKont() != null)
                    buffer.append(elem.getGrPodKont());

                buffer.append("',taravag:'");
                if (elem.getTaraVag() != null)
                    buffer.append(elem.getTaraVag());

                buffer.append("',grpod:'");
                if (elem.getGrPod() != null)
                    buffer.append(elem.getGrPod());

                buffer.append("',kolos:'");
                if (elem.getKolOs() != null)
                    buffer.append(elem.getKolOs());

                buffer.append("',isSelected:");
                buffer.append(elem.isSelected());

                buffer.append("},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        }
        else {
            buffer.append("{'rows':[]}");
        }

        return buffer.toString();
    }
    public static String convert2JSON_groupEdit(List<CimSmgs> data)
    {
        StringBuilder buffer = new StringBuilder();
        int multivagKonText=-1;
        int vagText=-2;


        if (data != null && data.size() > 0) {
            buffer.append("{");
            buffer.append("success: true,");
            buffer.append("'rows': [");

            for (CimSmgs elem : data) {
                CimSmgsCarList carList=null;
                CimSmgsKonList konList=null;
                CimSmgsGruz gruz=null;
                boolean multivagKon=false;
                boolean isVag=!elem.isContOtpr();

                buffer.append("{");
                buffer.append("hid:'");
                buffer.append(elem.getHid());

//                buffer.append("',isCont:'");
//                buffer.append(elem.isContOtpr());
                buffer.append("',nvag:'");
                if (elem.getCimSmgsCarLists().size() != 1&&elem.getCimSmgsCarLists().size() != 0)
                {
                    buffer.append(multivagKonText);
                    multivagKon=true;
                }
                else
                {
                    if(elem.getCimSmgsCarLists().values().iterator().hasNext()) {
                        carList = elem.getCimSmgsCarLists().values().iterator().next();
                        if(carList.getNvag()!=null)
                            buffer.append(carList.getNvag());
                    }
                }

                buffer.append("',sort:'");
                if(multivagKon)
                    buffer.append(multivagKonText);
                else
                if (carList!=null&&carList.getSort() != null)
                    buffer.append(carList.getSort());

                buffer.append("',klientname:'");
                if(multivagKon)
                    buffer.append(multivagKonText);
                else
                if (carList!=null&&carList.getKlientName() != null)
                    buffer.append(carList.getKlientName());

                buffer.append("',vagOtm:'");
                if(multivagKon)
                    buffer.append(multivagKonText);
                else
                if (carList!=null&&carList.getVagOtm() != null)
                    buffer.append(carList.getVagOtm());

                buffer.append("',grPod:'");
                if(multivagKon)
                    buffer.append(multivagKonText);
                else
                if (carList!=null&&carList.getGrPod() != null)
                    buffer.append(carList.getGrPod());

                buffer.append("',kolOs:'");
                if(multivagKon)
                    buffer.append(multivagKonText);
                else
                if (carList!=null&&carList.getKolOs() != null)
                    buffer.append(carList.getKolOs());

                buffer.append("',taraVag:'");
                if(multivagKon)
                    buffer.append(multivagKonText);
                else
                if (carList!=null&&carList.getTaraVag() != null)
                    buffer.append(carList.getTaraVag());

                if(carList!=null)
                    if(carList.getCimSmgsKonLists().size()!=1&&carList.getCimSmgsKonLists().size()!=0)
                    {
                        multivagKon=true;
                    }
                    else
                    {
                        if(carList.getCimSmgsKonLists().values().iterator().hasNext()) {
                            konList = carList.getCimSmgsKonLists().values().iterator().next();
                        }
                    }
                buffer.append("',utiN:'");
                if(isVag)
                {
                    buffer.append(vagText);
                }
                else {
                    if (multivagKon)
                        buffer.append(multivagKonText);
                    else if (konList != null && konList.getUtiN() != null)
                        buffer.append(konList.getUtiN());
                }

                buffer.append("',utiType:'");
                if(isVag)
                {
                    buffer.append(vagText);
                }
                else {
                    if (multivagKon)
                        buffer.append(multivagKonText);
                    else if (konList != null && konList.getUtiType() != null)
                        buffer.append(konList.getUtiType());
                }

                buffer.append("',grPodKont:'");
                if(isVag)
                {
                    buffer.append(vagText);
                }
                else {
                    if (multivagKon)
                        buffer.append(multivagKonText);
                    else if (konList != null && konList.getGrpod() != null)
                        buffer.append(konList.getGrpod());
                }

                buffer.append("',taraKont:'");
                if(isVag)
                {
                    buffer.append(vagText);
                }
                else {
                    if (multivagKon)
                        buffer.append(multivagKonText);
                    else if (konList != null && konList.getTaraKont() != null)
                        buffer.append(konList.getTaraKont());
                }

                if(elem.isContOtpr()) {
                    if (konList != null) {
                        if (konList.getCimSmgsGruzs().size() != 1&&konList.getCimSmgsGruzs().size() != 0) {
                            multivagKon=true;
                        }
                        else {
                            if(konList.getCimSmgsGruzs().size() == 1)
                                gruz = konList.getCimSmgsGruzs().values().iterator().next();
                        }
                    }
                }
                else
                {
                    if (carList != null) {
                        if (carList.getCimSmgsGruzs().size() != 1&&carList.getCimSmgsGruzs().size() != 0) {
                            multivagKon=true;
                        }
                        else {
                            if(carList.getCimSmgsGruzs().size() == 1)
                                gruz = carList.getCimSmgsGruzs().values().iterator().next();
                        }
                    }
                }

                buffer.append("',massa:'");
                if(multivagKon)
                    buffer.append(multivagKonText);
                else
                if (gruz != null&&gruz.getMassa()!=null)
                    buffer.append(gruz.getMassa());

                buffer.append("',kgvn:'");
                if(multivagKon)
                    buffer.append(multivagKonText);
                else
                if (gruz != null&&gruz.getKgvn()!=null)
                    buffer.append(gruz.getKgvn());

                buffer.append("',places:'");
                if(multivagKon)
                    buffer.append(multivagKonText);
                else
                if (gruz != null&&gruz.getPlaces()!=null)
                    buffer.append(gruz.getPlaces());

                buffer.append("',upak:'");
                if(multivagKon)
                    buffer.append(multivagKonText);
                else
                if (gruz != null&&gruz.getUpak()!=null)
                    buffer.append(gruz.getUpak());

                buffer.append("',g22:'");
                if (elem.getG22()!=null)
                    buffer.append(elem.getG22());

                buffer.append("',gs_48:'");
                if (elem.getGs_48()!=null)
                    buffer.append(elem.getGs_48());

                buffer.append("',g694:'");
                if (elem.getG694()!=null)
                    buffer.append(elem.getG694());

                buffer.append("',g281:'");
                if (elem.getG281()!=null)
                    buffer.append(elem.getG281());

                buffer.append("',npoezd:'");
                if (elem.getNpoezd()!=null)
                    buffer.append(elem.getNpoezd());

                StringBuilder plombs= new StringBuilder();
                buffer.append("',plombs:'");
                if(multivagKon)
                {
                    buffer.append(multivagKonText);
                }
                else {
                    for (CimSmgsPlomb plomb : elem.getCimSmgsPlombs().values()) {
                        if (plomb.getKpl() != null) {
                            for (int i = 0; i < plomb.getKpl(); i++) {
                                if (plomb.getZnak() != null) {
                                    if (plombs.length() > 0)
                                        plombs.append(",");
                                    plombs.append(plomb.getZnak().replaceAll("\n",""));
                                }
                            }
                        }
                        else {
                            if (plomb.getZnak() != null) {
                                if (plombs.length() > 0)
                                    plombs.append(",");
                                plombs.append(plomb.getZnak());
                            }
                        }
                    }
                }
                buffer.append(plombs.toString());
                buffer.append("'");
                buffer.append("},");
            }

            buffer.replace(buffer.lastIndexOf(","), buffer.length(), "]}");
        }
        else {
            buffer.append("{'rows':[]}");
        }

        return buffer.toString();
    }
}
