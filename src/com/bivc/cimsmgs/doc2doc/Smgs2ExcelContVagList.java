package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.actions.Doc2Doc_A;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.upload.ResponseCfg;
import com.bivc.cimsmgs.upload.excel.ExcelWriter;
import com.bivc.cimsmgs.upload.excel.Export2Excel;
import com.bivc.cimsmgs.upload.excel.ExportContList2Excel;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.reflect.MethodUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class Smgs2ExcelContVagList implements Doc2Doc {

    final static private Logger log = LoggerFactory.getLogger(CimSmgs2ExcelContList_de.class);
    private final String CONTS_LIST_TEMPLATE = "ContsList_SMGS2.xls";
    private final String VAG_LIST_TEMPLATE = "VagsList_SMGS2.xls";
    private final String OUTPUT_FILE_CONT = "Containers List SMGS2";
    private final String OUTPUT_FILE_VAG = "Wagons List SMGS2";
    private String resultMsg = null;

    @Override
    public void convert(Doc2Doc_A action) throws Exception {
        log.info("convert");
        String outFile="",templateName="",method="";
        List<CimSmgs> docs;
        if (StringUtils.isNoneBlank(action.getSearch().getNpoezd())) {
            docs = action.getSmgsDAO().findDocsByNPoezd(action.getSearch().getNpoezd(), action.getType(), action.getSearch().getRouteId());
        }
        else {
            docs = new ArrayList<>(1);
            docs.add(action.getSmgsDAO().getById(action.getHid(), false));
        }

        switch (action.getGroupBy())
        {
            case "11": // контейнерная ведомость СМГС2
            {
                outFile=OUTPUT_FILE_CONT;
                templateName=CONTS_LIST_TEMPLATE;
                method="makeSmgs2ContList";

            }break;
            case "12": // вагонная ведомость СМГС2
            {
                outFile=OUTPUT_FILE_VAG;
                templateName=VAG_LIST_TEMPLATE;
                method="makeSmgs2VagList";
            }
        }

        String path4ExcelTmpl = action.getServletRequest().getSession().getServletContext().getRealPath(File.separator + "docs") + File.separator + templateName;
        ExportContList2Excel doc2Excel;
        doc2Excel = new ExportContList2Excel(Export2Excel.XLS, docs, path4ExcelTmpl);

        MethodUtils.invokeMethod(doc2Excel,method);

        ///// Begin save file to DB
        Doc2ExcelContList doc2ExcelContList = new Doc2ExcelContList(doc2Excel);
        doc2ExcelContList.saveFile2DB(action, outFile + "." + doc2Excel.getExcelFormat());
        ///// END  save file to DB

        //// Stream file to response
        ExcelWriter excelWriter = new ExcelWriter(doc2Excel, outFile, false);
        ResponseCfg responseCfg = new ResponseCfg(action.getServletResponse(), action.getServletRequest(), excelWriter.getFileFullName());
        excelWriter.write(responseCfg.getResponse().getOutputStream());
    }

    @Override
    public String getResultMsg() {
        return resultMsg;
    }

}
