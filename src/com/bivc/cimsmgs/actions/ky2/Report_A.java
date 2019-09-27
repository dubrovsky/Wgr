package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
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
            switch (Report_A.Action.valueOf(action.toUpperCase())) {
                case GET_REPORT:
                    return getReport();
                case PARAMS_FORM:
                    return paramsForm();
                case POEZDS_IN_INTERVAL:
                    return poezdsInInterval();
                case GRUZOTPR_INTERVAL:
                    return gruzotprInterval();
                case SOSTOJANIE_KONT_AVTO:
                    return sostojanieKontAvto();
                default:
                    throw new RuntimeException("Unknown action");
            }

//        } catch (IllegalArgumentException | IOException e) {
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String sostojanieKontAvto() throws Exception {
        String chk = "✓";

        String flNm = "OCENA STANU TECHNICZNEGO KONTENERA";

        XSSFWorkbook excel = new XSSFWorkbook(new ByteArrayInputStream(Excel.getXlsxFile(flNm)));

        XSSFFont f1 = excel.createFont();
        f1.setStrikeout(true);

        Sheet sheet = excel.getSheetAt(0);
        Row row = null;
        Cell cell = null;

        Kont kont = kontDAO.getByIdWithAllParents(getHid());
        Avto avto = kont.getAvto();
        if(kont != null && avto != null) {
            log.debug(avto.getNo_avto());

            row = sheet.getRow(3);
            cell = row.getCell(6);
            cell.setCellValue(kont.getNkon());

            row = sheet.getRow(4);
            if(avto.getDirection() != null) {
                if(avto.getDirection() == 1) {
                    cell = row.getCell(2);
                    cell.setCellValue(chk);
                }
                else if(avto.getDirection() == 2) {
                    cell = row.getCell(4);
                    cell.setCellValue(chk);
                }
            }

            if(kont.getType() == null || !kont.getType().equals("20")) {
                cell = row.getCell(10);
                cell.getCellStyle().setFont(f1);
            }
            if(kont.getType() == null || !kont.getType().equals("40")) {
                cell = row.getCell(12);
                cell.getCellStyle().setFont(f1);
            }


            row = sheet.getRow(7);

            cell = row.getCell(1);
            cell.setCellValue(avto.getNo_avto());

            cell = row.getCell(6);
            cell.setCellValue(avto.getNo_trail());

            cell = row.getCell(12);
            Set<Plomb> pl = kont.getPlombs();
            if(pl != null) {
                StringBuffer sb = new StringBuffer();
                int i = 0;
                for (Plomb p: pl) {
                    if(i > 0) {
                        sb.append(", ");
                    }
                    sb.append(p.getZnak());
                    i++;
                }
                cell.setCellValue(sb.toString());
            }

            row = sheet.getRow(32);

            cell = row.getCell(4);
            cell.setCellValue(getUser().getUsr().getNamKlient());

            cell = row.getCell(11);
            cell.setCellValue(avto.getDriver_fio());

            filename = flNm + " - " + kont.getNkon() + ".xlsx";
        }


        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excel.write(baos);
        baos.flush();
        baos.close();
        
        inputStream = new ByteArrayInputStream(baos.toByteArray());
        return "excel";
    }

    private String poezdsInInterval() throws Exception {
        ReportParamsDTO dto = defaultDeserializer.setLocale(getLocale()).read(ReportParamsDTO.class, reportParams);
        if(dto.getStartDate() == null || dto.getEndDate() == null) throw new Exception("No reporting period specified");

        dbTool dbt = initDbTool();
        stPack st = new stPack();

        typesAndValues tv = new typesAndValues().add(Types.DATE, dto.getStartDate()).add(Types.DATE, getEndDate(dto));

        StringBuffer query = new StringBuffer();
        query.append(" AND p.TRANS IN (");
        for(int i = 0; i < getUser().getUsr().getTrans().size(); i++) {
            tv.add(Types.CHAR, getUser().getUsr().getTrans().get(i));
            if(i > 0) query.append(",");
            query.append("?");
        }
        query.append(")");

        dbt.read(st, Select.getSqlFile("ky/report/poezds_in_interval") + query, tv);

        setJSONData(new jsonStore(st).toString());
        return SUCCESS;
    }

    private String gruzotprInterval() throws Exception {
        ReportParamsDTO dto = defaultDeserializer.setLocale(getLocale()).read(ReportParamsDTO.class, reportParams);
        if(dto.getStartDate() == null || dto.getEndDate() == null) throw new Exception("No reporting period specified");

        dbTool dbt = initDbTool();
        stPack st = new stPack();

        typesAndValues tv = new typesAndValues().add(Types.DATE, dto.getStartDate()).add(Types.DATE, getEndDate(dto));

        StringBuffer query = new StringBuffer();
        query.append(" AND k.TRANS IN (");
        for(int i = 0; i < getUser().getUsr().getTrans().size(); i++) {
          tv.add(Types.CHAR, getUser().getUsr().getTrans().get(i));
          if(i > 0) query.append(",");
          query.append("?");
        }
        query.append(")");

        dbt.read(st, Select.getSqlFile("ky/report/gruzotpr_interval") + query, tv);

        setJSONData(new jsonStore(st).toString());
        return SUCCESS;
    }

    private String getReport() throws Exception {
        ReportParamsDTO dto = defaultDeserializer.setLocale(getLocale()).read(ReportParamsDTO.class, reportParams);
        log.debug(ToStringBuilder.reflectionToString(dto));


        if(dto.getStartDate() == null || dto.getEndDate() == null) throw new Exception("No reporting period specified");

//        WHERE p1.DPRB>=? AND p1.DPRB<?
        StringBuffer query = new StringBuffer();
        dbTool dbt = initDbTool();
        stPack st = new stPack();

        typesAndValues tv = new typesAndValues().add(Types.DATE, dto.getStartDate()).add(Types.DATE, getEndDate(dto));
        query.append(" k.DPRB>=? AND k.DPRB<? AND p1.TRANS IN (");
        for(int i = 0; i < getUser().getUsr().getTrans().size(); i++) {
            tv.add(Types.CHAR, getUser().getUsr().getTrans().get(i));
            if(i > 0) query.append(",");
            query.append("?");
        }
        query.append(")");

        if(dto.getGruzotpr() != null && dto.getGruzotpr().length() > 0) {
          query.append(" AND k.GRUZOTPR LIKE CONCAT('%',?,'%')");
          tv.add(Types.CHAR, dto.getGruzotpr());
        }

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
        if(dto.getNpprm() != null && dto.getNpprm().length > 0) {
//            String[] npprms = dto.getNpprm().split("\\s?,\\s?");
            query.append(" AND (");
            for (int i = 0; i < dto.getNpprm().length; i++) {
                if(i > 0) query.append(" OR ");
                query.append("p1.HID=?");
                tv.add(Types.CHAR, dto.getNpprm()[i]);
            }
            query.append(")");
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

    private Date getEndDate(ReportParamsDTO dto) throws Exception {
      GregorianCalendar edt = new GregorianCalendar();
      edt.setTime(dto.getEndDate());
      edt.add(Calendar.DATE, 1);
      return edt.getTime();
    }

    private dbTool initDbTool() throws Exception {
      SessionFactoryImplementor sessionFactoryImplementation = (SessionFactoryImplementor) HibernateUtil.getSessionFactory();
      ConnectionProvider connectionProvider = sessionFactoryImplementation.getConnectionProvider();
      return new dbTool(connectionProvider.getConnection(), null);
    }

    public String paramsForm() throws Exception {
        ReportParamsDTO dto = new ReportParamsDTO();

        setJSONData(
          defaultSerializer
            .setLocale(getLocale())
            .write(
              new Response<>(
                dto
              )
            )
        );
        return SUCCESS;
    }


    private String action;
    private String reportParams;
    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private ReportService reportService;
    private HttpServletResponse response;
    private HttpServletRequest request;
    private InputStream inputStream;

    private String filename = "Report.xls";
    @Autowired
    private KontDAO kontDAO;

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

    enum Action {GET_REPORT,PARAMS_FORM,POEZDS_IN_INTERVAL,GRUZOTPR_INTERVAL,SOSTOJANIE_KONT_AVTO}

    public void setAction(String action) {
        this.action = action;
    }

    public void setReportParams(String reportParams) {
        this.reportParams = reportParams;
    }
}
