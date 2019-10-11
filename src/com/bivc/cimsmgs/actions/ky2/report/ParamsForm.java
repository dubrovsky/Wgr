package com.bivc.cimsmgs.actions.ky2.report;

import com.bivc.cimsmgs.actions.ky2.Report_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dto.ky.ReportParamsDTO;

public class ParamsForm extends ReportAction {
    @Override
    public String execute(Report_A report) throws Exception {
        ReportParamsDTO dto = new ReportParamsDTO();

        report.setJSONData(
          report.getDefaultSerializer()
            .setLocale(report.getLocale())
            .write(
              new Response<>(
                dto
              )
            )
        );
        return report.SUCCESS;
    }
}
