package com.bivc.cimsmgs.actions.ky2.report;

import com.bivc.cimsmgs.actions.ky2.Report_A;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.dto.ky.ReportParamsDTO;
import com.bivc.cimsmgs.sql.Select;
import com.isc.utils.dbStore.dbTool;
import com.isc.utils.dbStore.jsonStore;
import com.isc.utils.dbStore.stPack;
import com.isc.utils.dbStore.typesAndValues;

import java.sql.Types;

public class ClientInterval extends ReportAction {

    public ClientInterval() throws Exception {
    }

    @Override
    public String execute(Report_A report) throws Exception {
        ReportParamsDTO dto = report.getDefaultDeserializer().setLocale(report.getLocale()).read(ReportParamsDTO.class, report.getReportParams());
        if(dto.getStartDate() == null || dto.getEndDate() == null) throw new Exception("No reporting period specified");

        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack();

        typesAndValues tv = new typesAndValues().add(Types.DATE, dto.getStartDate()).add(Types.DATE, report.getEndDate(dto.getEndDate()));

        StringBuffer query = new StringBuffer();
        query.append(" AND k.TRANS IN (");
        for(int i = 0; i < report.getUser().getUsr().getTrans().size(); i++) {
            tv.add(Types.CHAR, report.getUser().getUsr().getTrans().get(i));
            if(i > 0) query.append(",");
            query.append("?");
        }
        query.append(")");

        dbt.read(st, Select.getSqlFile("ky/report/client_interval") + query, tv);

        report.setJSONData(new jsonStore(st).toString());
        return report.SUCCESS;
    }
}
