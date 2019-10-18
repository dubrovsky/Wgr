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

public class ClientNpprm extends ReportAction {
    @Override
    public String execute(Report_A report) throws Exception {
        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack();

        typesAndValues tv = new typesAndValues().add(Types.NUMERIC, report.getHid());

        dbt.read(st, Select.getSqlFile("ky/report/client_npprm"), tv);

        report.setJSONData(new jsonStore(st).toString());
        return report.SUCCESS;
    }
}
