package com.bivc.cimsmgs.actions.ky2.report;

import com.bivc.cimsmgs.actions.ky2.Report_A;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.dto.ky.ReportParamsDTO;
import com.bivc.cimsmgs.sql.Select;
import com.isc.utils.dbStore.dbTool;
import com.isc.utils.dbStore.sortedStPack;
import com.isc.utils.dbStore.stPack;
import com.isc.utils.dbStore.typesAndValues;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.sql.Types;

public class KontReport extends ReportAction {
    private static final Logger log = LoggerFactory.getLogger(KontReport.class);

    public KontReport() throws Exception {
    }

    @Override
    public String execute(Report_A report) throws Exception {
        ReportParamsDTO dto = report.getDefaultDeserializer().setLocale(report.getLocale()).read(ReportParamsDTO.class, report.getReportParams());
        log.debug(ToStringBuilder.reflectionToString(dto));


        if(dto.getStartDate() == null || dto.getEndDate() == null) throw new Exception("No reporting period specified");

//        WHERE p1.DPRB>=? AND p1.DPRB<?
        StringBuffer query = new StringBuffer();
        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack();

        typesAndValues tv = new typesAndValues();
        if(dto.getStatus_ad().equals("-")) {
            query.append(" (k.DPRB>=? AND k.DPRB<? OR k.DOTP>=? AND k.DOTP<?)");
            tv.add(Types.DATE, dto.getStartDate()).add(Types.DATE, report.getEndDate(dto.getEndDate()));
        }
        else if(dto.getStatus_ad().equals("a")) {
            query.append(" k.DPRB>=? AND k.DPRB<? AND h2.HID IS NULL");
        }
        else if(dto.getStatus_ad().equals("d")) {
            query.append(" k.DOTP>=? AND k.DOTP<? AND h2.HID IS NOT NULL");
        }
        tv.add(Types.DATE, dto.getStartDate()).add(Types.DATE, report.getEndDate(dto.getEndDate()));

        query.append(" AND p1.TRANS IN (");
        for(int i = 0; i < report.getUser().getUsr().getTrans().size(); i++) {
            tv.add(Types.CHAR, report.getUser().getUsr().getTrans().get(i));
            if(i > 0) query.append(",");
            query.append("?");
        }
        query.append(")");

        if(dto.getHid_client() != null) {
            query.append(" AND k.HID_CLIENT=?");
            tv.add(Types.NUMERIC, dto.getHid_client());
        }

        String q = query.toString();
//        log.debug("avto: " + q);
        if(dto.getTr_arrival().equals("-") && dto.getTr_departure().equals("-")) {
            dbt.read(st, Select.getSqlFile("ky/report/kont[-]") + q, tv);
            dbt.read(st, Select.getSqlFile("ky/report/kont[p]") + q, tv);
        }
        if(dto.getTr_arrival().equals("-")) {
            if(dto.getTr_departure().equals("a") || dto.getTr_departure().equals("-")) {
                dbt.read(st, Select.getSqlFile("ky/report/kont[-a]") + q, tv);
            }
            if(dto.getTr_departure().equals("w") || dto.getTr_departure().equals("-")) {
                dbt.read(st, Select.getSqlFile("ky/report/kont[-w]") + q, tv);
            }
        }
        if(dto.getTr_arrival().equals("a") || dto.getTr_arrival().equals("-")) {
            if(dto.getTr_departure().equals("w") || dto.getTr_departure().equals("-")) {
                dbt.read(st, Select.getSqlFile("ky/report/kont[a-w]") + q, tv);
            }
            if(dto.getTr_departure().equals("a") || dto.getTr_departure().equals("-")) {
                dbt.read(st, Select.getSqlFile("ky/report/kont[a-a]") + q, tv);
            }
            dbt.read(st, Select.getSqlFile("ky/report/kont[a-]") + q, tv);
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
        log.debug("query: " + q);
        if(dto.getTr_arrival().equals("w") || dto.getTr_arrival().equals("-")) {
            if(dto.getTr_departure().equals("w") || dto.getTr_departure().equals("-")) {
                dbt.read(st, Select.getSqlFile("ky/report/kont[w-w]") + q, tv);
            }
            if(dto.getTr_departure().equals("a") || dto.getTr_departure().equals("-")) {
                dbt.read(st, Select.getSqlFile("ky/report/kont[w-a]") + q, tv);
            }
            dbt.read(st, Select.getSqlFile("ky/report/kont[w-]") + q, tv);
        }

        new sortedStPack(st, "DPRB", true);

        HSSFWorkbook excel = report.getReportService().reportToExcel(st);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excel.write(baos);
        baos.flush();
        baos.close();
        report.setInputStream(new ByteArrayInputStream(baos.toByteArray()));
        return "excel";
    }
}
