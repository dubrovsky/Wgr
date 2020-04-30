package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.actions.Doc2Doc_A;
import com.bivc.cimsmgs.db.CimSmgsInvoice;
import com.bivc.cimsmgs.upload.ResponseCfg;
import com.bivc.cimsmgs.upload.excel.ExcelWriter;
import com.bivc.cimsmgs.upload.excel.ExportInvoiceSpecs;
import org.apache.commons.lang3.reflect.MethodUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.bivc.cimsmgs.upload.excel.Export2Excel.XLS;

public class InvoiceSpecs implements Doc2Doc {
    final static private Logger log = LoggerFactory.getLogger(InvoiceSpecs.class);

    private final String INVOICE_SPECS_TEMPLATE = "InvoiceSpec.xls";
    @Override
    public void convert(Doc2Doc_A action) throws Exception {
        log.debug("convert");
        String path4ExcelTmpl = action.getServletRequest().getSession().getServletContext().getRealPath(File.separator + "docs") + File.separator + INVOICE_SPECS_TEMPLATE;
        List<CimSmgsInvoice> docs=null;
        if(action.getQuery1()!=null&&!action.getQuery1().isEmpty())
        {
            List<Long> hids = Arrays.stream(action.getQuery1().split(",")).map(Long::valueOf).collect(Collectors.toList());
            docs=action.getInvoiceDAO().findByIdinList(hids);
        }
        else
            docs= action.getInvoiceDAO().findAll(-1,-1,action.getSearch(),action.getUser().getUsr());

        ExportInvoiceSpecs specs= new ExportInvoiceSpecs(XLS,docs,path4ExcelTmpl, action.getQuery());
        // создаем табличку спецификации
        MethodUtils.invokeMethod(specs,"makeSpecs");

        //// Stream file to response
        ExcelWriter excelWriter = new ExcelWriter(specs, INVOICE_SPECS_TEMPLATE, false);
        ResponseCfg responseCfg = new ResponseCfg(action.getServletResponse(), action.getServletRequest(), excelWriter.getFileFullName());
        excelWriter.write(responseCfg.getResponse().getOutputStream());
    }

    @Override
    public String getResultMsg() {
        return null;
    }
}
