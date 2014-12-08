package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.actions.Doc2Doc_A;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.upload.ResponseCfg;
import com.bivc.cimsmgs.upload.excel.ExcelWriter;
import com.bivc.cimsmgs.upload.excel.Export2Excel;
import com.bivc.cimsmgs.upload.excel.ExportDopList2Excel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;

public class CimSmgs2ExcelDopList_de implements Doc2Doc{
    final static private Logger log = LoggerFactory.getLogger(CimSmgs2ExcelDopList_de.class);
    private final String TEMPLATE_FILE = "DopList_CimSMGS_de.xls";
    private final String OUTPUT_FILE = "Dop List DE";
    private final String CONTENT_TYPE = "application/vnd.ms-excel";
    private String resultMsg = null;

    @Override
    public void convert(Doc2Doc_A action) throws Exception {
        log.info("convert");
        CimSmgs doc = action.getSmgsDAO().getById(action.getHid(), false);
        String path4ExcelTmpl = action.getServletRequest().getSession().getServletContext().getRealPath(File.separator + "docs") + File.separator + TEMPLATE_FILE;
        ExportDopList2Excel doc2Excel = new ExportDopList2Excel(Export2Excel.XLS, doc, path4ExcelTmpl);
        doc2Excel.makeCimSmgsDopList_de();

        //// Stream file to response
        ExcelWriter excelWriter = new ExcelWriter(doc2Excel, OUTPUT_FILE, false);
        ResponseCfg responseCfg = new ResponseCfg(action.getServletResponse(), action.getServletRequest(), excelWriter.getFileFullName(), CONTENT_TYPE);
        excelWriter.write(responseCfg.getResponse().getOutputStream());
    }

    @Override
    public String getResultMsg() {
        return resultMsg;
    }
}
