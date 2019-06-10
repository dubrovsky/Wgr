package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.actions.Doc2Doc_A;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.upload.ResponseCfg;
import com.bivc.cimsmgs.upload.excel.ExcelWriter;
import com.bivc.cimsmgs.upload.excel.Export2Excel;
import com.bivc.cimsmgs.upload.excel.ExportContList2Excel;
import com.bivc.cimsmgs.upload.excel.ExportVagList2Excel;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class CimSmgs2ExcelContList_de implements Doc2Doc {
    final static private Logger log = LoggerFactory.getLogger(CimSmgs2ExcelContList_de.class);
    private final String CONTS_LIST_TEMPLATE = "ContsList_CimSMGS_de1.xls";
    private final String VAGS_LIST_TEMPLATE = "VagsList_CimSMGS_de.xls";
    private final String OUTPUT_FILE = "Container's List DE";
    private final String CONTENT_TYPE = "application/vnd.ms-excel";
    private String resultMsg = null;
    private Doc2ExcelContList doc2ExcelContList;

    @Override
    public void convert(Doc2Doc_A action) throws Exception {
        log.info("convert");
        List<CimSmgs> docs;
        if(StringUtils.isNoneBlank(action.getSearch().getNpoezd())){
            docs = action.getSmgsDAO().findDocsByNPoezd(action.getSearch().getNpoezd(), action.getType(), action.getSearch().getRouteId());
        } else {
            docs = new ArrayList<>(1);
            docs.add(action.getSmgsDAO().getById(action.getHid(), false));
        }

        boolean isContsList = docs.size() == 0 || docs.iterator().next().isContOtpr();
        String path4ExcelTmpl = action.getServletRequest().getSession().getServletContext().getRealPath(File.separator + "docs") + File.separator + (isContsList ? CONTS_LIST_TEMPLATE : VAGS_LIST_TEMPLATE);
        Export2Excel doc2Excel;
        if(isContsList){
            doc2Excel = new ExportContList2Excel(Export2Excel.XLS, docs, path4ExcelTmpl);
            doc2Excel.export();
        } else {
            doc2Excel = new ExportVagList2Excel(Export2Excel.XLS, docs, path4ExcelTmpl);
            doc2Excel.export();
        }

        ///// Begin save file to DB
        doc2ExcelContList = new Doc2ExcelContList(doc2Excel);
        doc2ExcelContList.saveFile2DB(action, OUTPUT_FILE + "." + doc2Excel.getExcelFormat());
        ///// END  save file to DB

        //// Stream file to response
        ExcelWriter excelWriter = new ExcelWriter(doc2Excel, OUTPUT_FILE, false);
        ResponseCfg responseCfg = new ResponseCfg(action.getServletResponse(), action.getServletRequest(), excelWriter.getFileFullName());
        excelWriter.write(responseCfg.getResponse().getOutputStream());
    }

    @Override
    public String getResultMsg() {
        return resultMsg;
    }

    public Doc2ExcelContList getDoc2ExcelContList() {
        return doc2ExcelContList;
    }

    public void setDoc2ExcelContList(Doc2ExcelContList doc2ExcelContList) {
        this.doc2ExcelContList = doc2ExcelContList;
    }
}
