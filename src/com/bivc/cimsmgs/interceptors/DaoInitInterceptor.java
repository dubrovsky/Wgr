package com.bivc.cimsmgs.interceptors;


import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.dao.hibernate.*;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;


public class DaoInitInterceptor implements Interceptor {
    public void destroy() {
    }

    public void init() {
    }

    public String intercept(ActionInvocation actionInvocation) throws Exception {
        Action action = (Action) actionInvocation.getAction();
        if (action instanceof SmgsDAOAware) {
            ((SmgsDAOAware) action).setSmgsDAO(new SmgsDAOHib());
        }

        if (action instanceof TdgLogDAOAware) {
            ((TdgLogDAOAware) action).setTdgLogDAO(new TdgLogDAOHib());
        }

        if (action instanceof ProjectDAOAware) {
            ((ProjectDAOAware) action).setProjectDAO(new ProjectDAOHib());
        }

        if (action instanceof StatusDAOAware) {
            ((StatusDAOAware) action).setStatusDAO(new StatusDAOHib());
        }

        if (action instanceof PrintTemplatesDAOAware) {
            ((PrintTemplatesDAOAware) action).setPrintTemplatesDAO(new PrintTemplatesDAOHib());
        }

        if (action instanceof Doc2DocTemplatesDAOAware) {
            ((Doc2DocTemplatesDAOAware) action).setDoc2DocTemplatesDAO(new Doc2DocTemplatesDAOHib());
        }

        if (action instanceof FieldsAccessFobiddenDAOAware) {
            ((FieldsAccessFobiddenDAOAware) action).setFieldsAccessFobiddenDAO(new FieldsAccessFobiddenDAOHib());
        }

        if (action instanceof FieldsCommentsDAOAware) {
            ((FieldsCommentsDAOAware) action).setFieldsCommentsDAO(new FieldsCommentsDAOHib());
        }

        if (action instanceof FieldsDirDAOAware) {
            ((FieldsDirDAOAware) action).setFieldsDirDAO(new FieldsDirDAOHib());
        }

        if (action instanceof PrintBlankTemplRefDAOAware) {
            ((PrintBlankTemplRefDAOAware) action).setPrintBlankTemplRefDAO(new PrintBlankTemplRefDAOHib());
        }

        if (action instanceof PrintBlankDAOAware) {
            ((PrintBlankDAOAware) action).setPrintBlankDAO(new PrintBlankDAOHib());
        }

        if (action instanceof LoggingEventDAOAware) {
            ((LoggingEventDAOAware) action).setLoggingEventDAO(new LoggingEventDAOHib());
        }

        if (action instanceof DocDirDAOAware) {
            ((DocDirDAOAware) action).setDocDirDAO(new DocDirDAOHib());
        }

        if (action instanceof StatusDirDAOAware) {
            ((StatusDirDAOAware) action).setStatusDirDAO(new StatusDirDAOHib());
        }

        if (action instanceof PackDocDAOAware) {
            ((PackDocDAOAware) action).setPackDocDAO(new PackDocDAOHib());
        }

        if (action instanceof RoutePrintTemplatesDAOAware) {
            ((RoutePrintTemplatesDAOAware) action).setRoutePrintTemplatesDAO(new RoutePrintTemplatesDAOHib());
        }

        if (action instanceof RouteUnPrintTemplatesDAOAware) {
            ((RouteUnPrintTemplatesDAOAware) action).setRouteUnPrintTemplatesDAO(new RouteUnPrintTemplatesDAOHib());
        }

        if (action instanceof RouteDAOAware) {
            ((RouteDAOAware) action).setRouteDAO(new RouteDAOHib());
        }

        if (action instanceof NsiDirDAOAware) {
            ((NsiDirDAOAware) action).setNsiDirDAO(new NsiDirDAOHib());
        }

//    if(action instanceof SmgsStatusDAOAware)
//    {
//      ((SmgsStatusDAOAware)action).setSmgsStatusDAO(new SmgsStatusDAOHib());
//    }
//
//    if(action instanceof SmgsStatusAllowedDAOAware)
//    {
//      ((SmgsStatusAllowedDAOAware)action).setSmgsStatusAllowedDAO(new SmgsStatusAllowedDAOHib());
//    }

        if (action instanceof NsiSmgsG1DAOAware) {
            ((NsiSmgsG1DAOAware) action).setNsiSmgsG1DAO(new NsiSmgsG1DAOHib());
        }

        if (action instanceof FileInfDAOAware) {
            ((FileInfDAOAware) action).setFileInfDAO(new FileInfDAOHib());
        }

        if (action instanceof RouteDocsDAOAware) {
            ((RouteDocsDAOAware) action).setRouteDocsDAO(new RouteDocsDAOHib());
        }

        if (action instanceof FileDAOAware) {
            ((FileDAOAware) action).setFileDAO(new FileDAOHib());
        }

        if (action instanceof NsiPlatelDAOAware) {
            ((NsiPlatelDAOAware) action).setNsiPlatelDAO(new NsiPlatelDAOHib());
        }

        if (action instanceof NsiSmgsG4DAOAware) {
            ((NsiSmgsG4DAOAware) action).setNsiSmgsG4DAO(new NsiSmgsG4DAOHib());
        }

        if (action instanceof NsiSmgsGngDAOAware) {
            ((NsiSmgsGngDAOAware) action).setNsiSmgsGngDAO(new NsiSmgsGngDAOHib());
        }

        if (action instanceof NsiSmgsEtsngcodeDAOAware) {
            ((NsiSmgsEtsngcodeDAOAware) action).setNsiSmgsEtsngcodeDAO(new NsiSmgsEtsngcodeDAOHib());
        }

        if (action instanceof NsiSmgsStEuDAOAware) {
            ((NsiSmgsStEuDAOAware) action).setNsiSmgsStEuDAO(new NsiSmgsStEuDAOHib());
        }

        if (action instanceof NsiSmgsStCisDAOAware) {
            ((NsiSmgsStCisDAOAware) action).setNsiSmgsStCisDAO(new NsiSmgsStCisDAOHib());
        }

        if (action instanceof NsiStaDAOAware) {
            ((NsiStaDAOAware) action).setNsiStaDAO(new NsiStaDAOHib());
        }

        if (action instanceof NsiCountriesDAOAware) {
            ((NsiCountriesDAOAware) action).setNsiCountriesDAO(new NsiCountriesDAOHib());
        }

        if (action instanceof NsiSmgsFieldsOptDAOAware) {
            ((NsiSmgsFieldsOptDAOAware) action).setNsiSmgsFieldsOptDAO(new NsiSmgsFieldsOptDAOHib());
        }
//    if(action instanceof InvoiceDAOAware)
//    {
//      ((InvoiceDAOAware)action).setInvoiceDAO(new InvoiceDAOHib());
//    }

        if (action instanceof NsiSmgsCompanyDAOAware) {
            ((NsiSmgsCompanyDAOAware) action).setNsiSmgsCompanyDAO(new NsiSmgsCompanyDAOHib());
        }

        if (action instanceof InvoiceDAOAware) {
            ((InvoiceDAOAware) action).setInvoiceDAO(new InvoiceDAOHib());
        }

        if (action instanceof InvoiceBriefDAOAware) {
            ((InvoiceBriefDAOAware) action).setInvoiceBriefDAO(new InvoiceBriefDAOHib());
        }

        if (action instanceof PackListDAOAware) {
            ((PackListDAOAware) action).setPackListDAO(new PackListDAOHib());
        }

        if (action instanceof SmgsScanDAOAware) {
            ((SmgsScanDAOAware) action).setSmgsScanDAO(new SmgsScanDAOHib());
        }

        if (action instanceof UsrDAOAware) {
            ((UsrDAOAware) action).setUsrDAO(new UsrDAOHib());
        }

        if (action instanceof UsrGroupsDirDAOAware) {
            ((UsrGroupsDirDAOAware) action).setUsrGroupsDirDAO(new UsrGroupsDirDAOHib());
        }

        if (action instanceof UsrPrivilegsDirDAOAware) {
            ((UsrPrivilegsDirDAOAware) action).setUsrPrivilegsDirDAO(new UsrPrivilegsDirDAOHib());
        }

        if (action instanceof NsiCurrencyDAOAware) {
            ((NsiCurrencyDAOAware) action).setCurrencyDAO(new NsiCurrencyDAOHib());
        }

        if (action instanceof NsiTnvedDAOAware) {
            ((NsiTnvedDAOAware) action).setTnvedDAO(new NsiTnvedDAOHib());
        }

        if (action instanceof NsiDelivDAOAware) {
            ((NsiDelivDAOAware) action).setDelivDAO(new NsiDelivDAOHib());
        }

        if (action instanceof NsiUpakDAOAware) {
            ((NsiUpakDAOAware) action).setUpakDAO(new NsiUpakDAOHib());
        }

        if (action instanceof RoadDAOAware) {
            ((RoadDAOAware) action).setRoadDAO(new RoadDAOHib());
        }

        if (action instanceof ManagementDAOAware) {
            ((ManagementDAOAware) action).setManagementDAO(new ManagementDAOHib());
        }

        if (action instanceof StaEDAOAware) {
            ((StaEDAOAware) action).setStaEDAO(new StaEDAOHib());
        }

        if (action instanceof DangCodeDAOAware) {
            ((DangCodeDAOAware) action).setDangCodeDAO(new DangCodeDAOHib());
        }
        if (action instanceof KarantinDAOAware) {
            ((KarantinDAOAware) action).setKarantinDAO(new KarantinDAOHib());
        }
        if (action instanceof VeterinDAOAware) {
            ((VeterinDAOAware) action).setVeterinDAO(new VeterinDAOHib());
        }

        if (action instanceof CargoGngDAOAware) {
            ((CargoGngDAOAware) action).setCargoGngDAO(new CargoGngDAOHib());
        }

        if (action instanceof MailSettingsDAOAware) {
            ((MailSettingsDAOAware) action).setMailSettingsDAO(new MailSettingsDAOHib());
        }

        if (action instanceof NsiCarrierDAOAware) {
            ((NsiCarrierDAOAware) action).setNsiCarrierDAO(new NsiCarrierDAOHib());
        }
        return actionInvocation.invoke();
    }
}
