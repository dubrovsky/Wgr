package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.dto.ky.ReportParamsDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.services.ky2.AvtoWzPzService;
import com.bivc.cimsmgs.services.ky2.ReportService;
import com.bivc.cimsmgs.sql.Select;
import com.isc.utils.dbStore.dbTool;
import com.isc.utils.dbStore.sortedStPack;
import com.isc.utils.dbStore.stPack;
import com.isc.utils.dbStore.typesAndValues;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
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
import java.util.GregorianCalendar;

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
            switch (Report_A.Action.valueOf(action.toUpperCase())) {
                case GET_REPORT:
                    return getReport();
                default:
                    throw new RuntimeException("Unknown action");
            }

//        } catch (IllegalArgumentException | IOException e) {
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String getReport() throws Exception {
        ReportParamsDTO dto = defaultDeserializer.setLocale(getLocale()).read(ReportParamsDTO.class, reportParams);
        log.debug(ToStringBuilder.reflectionToString(dto));

        if(dto.getStartDate() == null || dto.getEndDate() == null) throw new Exception("No reporting period specified");

//        WHERE p1.DPRB>=? AND p1.DPRB<?
        StringBuffer query = new StringBuffer();

        SessionFactoryImplementor sessionFactoryImplementation = (SessionFactoryImplementor) HibernateUtil.getSessionFactory();
        ConnectionProvider connectionProvider = sessionFactoryImplementation.getConnectionProvider();

        dbTool dbt = new dbTool(connectionProvider.getConnection(), null);
        stPack st = new stPack();

        GregorianCalendar edt = new GregorianCalendar();
        edt.setTime(dto.getEndDate());
        edt.add(Calendar.DATE, 1);
        typesAndValues tv = new typesAndValues().add(Types.DATE, dto.getStartDate()).add(Types.DATE, edt.getTime());
        query.append(" p1.DPRB>=? AND p1.DPRB<?");



        String q = query.toString();
        log.debug("avto: " + q);
        if(dto.getTr_arrival().equals("a") || dto.getTr_arrival().equals("-")) {
            if(dto.getTr_departure().equals("w") || dto.getTr_departure().equals("-")) {
                dbt.read(st, Select.getSqlFile("ky/report/kont[a-w]") + q, tv);
            }
            if(dto.getTr_departure().equals("a") || dto.getTr_departure().equals("-")) {
                dbt.read(st, Select.getSqlFile("ky/report/kont[a-a]") + q, tv);
            }
        }

        // Параметры для поезда по прибытию
        if(dto.getNpprm() != null && dto.getNpprm().length() > 0) {
            String[] npprms = dto.getNpprm().split("\\s?,\\s?");
            query.append(" AND (");
            for (int i = 0; i < npprms.length; i++) {
                if(i > 0) query.append(" OR ");
                query.append("p1.NPPRM=?");
                tv.add(Types.CHAR, npprms[i]);
            }
            query.append(")");
        }
        if(dto.getGruzotpr() != null && dto.getGruzotpr().length() > 0) {
            query.append(" AND p1.GRUZOTPR LIKE CONCAT('%',?,'%')");
            tv.add(Types.CHAR, dto.getGruzotpr());
        }

        q = query.toString();
        log.debug("poezd: " + q);
        if(dto.getTr_arrival().equals("w") || dto.getTr_arrival().equals("-")) {
            if(dto.getTr_departure().equals("w") || dto.getTr_departure().equals("-")) {
                dbt.read(st, Select.getSqlFile("ky/report/kont[w-w]") + q, tv);
            }
            if(dto.getTr_departure().equals("a") || dto.getTr_departure().equals("-")) {
                dbt.read(st, Select.getSqlFile("ky/report/kont[w-a]") + q, tv);
            }
        }

        new sortedStPack(st, "DPRB", true);

        HSSFWorkbook excel = reportService.reportToExcel(st);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excel.write(baos);
        baos.flush();
        baos.close();
        inputStream = new ByteArrayInputStream(baos.toByteArray());
        return "excel";
    }

    private String action;
    private String reportParams;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private ReportService reportService;
    private HttpServletResponse response;
    private HttpServletRequest request;
    private InputStream inputStream;

    public InputStream getInputStream() {
        return inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    @Override
    public void setServletRequest(HttpServletRequest request) {
        this.request = request;
    }

    @Override
    public void setServletResponse(HttpServletResponse response) {
        this.response = response;
    }

    enum Action {GET_REPORT}

    public void setAction(String action) {
        this.action = action;
    }

    public void setReportParams(String reportParams) {
        this.reportParams = reportParams;
    }
}
