package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.actions.ky2.report.ReportAction;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.KontDAO;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Plomb;
import com.bivc.cimsmgs.dto.ky.ReportParamsDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.services.ky2.AvtoWzPzService;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.bivc.cimsmgs.services.ky2.ReportService;
import com.bivc.cimsmgs.sql.Select;
import com.bivc.cimsmgs.xls.Excel;
import com.isc.utils.dbStore.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.hibernate.connection.ConnectionProvider;
import org.hibernate.engine.SessionFactoryImplementor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.sql.Types;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Set;

/**
 * @author p.dzeviarylin
 */
public class Report_A extends CimSmgsSupport_A implements ServletRequestAware, ServletResponseAware {

    private static final Logger log = LoggerFactory.getLogger(Report_A.class);

    public String execute() {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }
        try {
            Class cl = Class.forName("com.bivc.cimsmgs.actions.ky2.report." + action);
            java.lang.reflect.Constructor constructor = cl.getConstructor(new Class[]{});
            ReportAction p = (ReportAction) constructor.newInstance(new Object[]{});
            return p.execute(this);
        } catch (ClassNotFoundException ex) {
            throw new RuntimeException("Unknown action " + action);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    public Date getEndDate(ReportParamsDTO dto) throws Exception {
        GregorianCalendar edt = new GregorianCalendar();
        edt.setTime(dto.getEndDate());
        edt.add(Calendar.DATE, 1);
        return edt.getTime();
    }

    private String action;
    private String reportParams;
    private Long hid_client;

    public Long getHid_client() {
        return hid_client;
    }

    public void setHid_client(Long hid_client) {
        this.hid_client = hid_client;
    }

    public String getReportParams() {
        return reportParams;
    }

    @Autowired
    private Serializer defaultSerializer;

    public Serializer getDefaultSerializer() {
        return defaultSerializer;
    }

    @Autowired
    private Deserializer defaultDeserializer;

    public Deserializer getDefaultDeserializer() {
        return defaultDeserializer;
    }

    @Autowired
    private ReportService reportService;

    public ReportService getReportService() {
        return reportService;
    }

    private HttpServletResponse response;
    private HttpServletRequest request;
    private InputStream inputStream;

    private String filename = "Report.xls";
    @Autowired
    private KontDAO kontDAO;

    public KontDAO getKontDAO() {
        return kontDAO;
    }

    public InputStream getInputStream() {
        return inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    @Override
    public void setServletRequest(HttpServletRequest request) {
        this.request = request;
    }

    @Override
    public void setServletResponse(HttpServletResponse response) {
        this.response = response;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setReportParams(String reportParams) {
        this.reportParams = reportParams;
    }
}
