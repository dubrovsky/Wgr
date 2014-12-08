package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.actions.Doc2Doc_A;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.upload.ResponseCfg;
import com.bivc.cimsmgs.upload.excel.ExcelWriter;
import com.bivc.cimsmgs.upload.excel.Export2Excel;
import com.bivc.cimsmgs.upload.excel.ExportContList2Excel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.List;

public class Smgs2ExcelContList_pl implements Doc2Doc {
    final static private Logger log = LoggerFactory.getLogger(Smgs2ExcelContList_pl.class);
    private String resultMsg = null;
    private final String TEMPLATE_FILE = "ContsList_SMGS.xls";
    private final String OUTPUT_FILE = "Container's List";
    private Doc2ExcelContList doc2ExcelContList;

    @Override
    public void convert(Doc2Doc_A action) throws Exception {
        log.info("convert");
        List<CimSmgs> docs = action.getSmgsDAO().findDocsByNPoezd(action.getSearch().getNpoezd(), action.getType(), action.getSearch().getRouteId());
        String path4ExcelTmpl = action.getServletRequest().getSession().getServletContext().getRealPath(File.separator + "docs") + File.separator + TEMPLATE_FILE;
        ExportContList2Excel doc2Excel = new ExportContList2Excel(Export2Excel.XLS, docs, path4ExcelTmpl);
        doc2Excel.makeSmgsContList_PL();

        ///// Begin save file to DB
        doc2ExcelContList = new Doc2ExcelContList(doc2Excel);
        doc2ExcelContList.saveFile2DB(action, OUTPUT_FILE);
        ///// END  save file to DB

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
