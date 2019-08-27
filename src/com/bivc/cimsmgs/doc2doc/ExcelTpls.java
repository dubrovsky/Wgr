package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.actions.Doc2Doc_A;
import com.bivc.cimsmgs.upload.ResponseCfg;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Класс создан для выгрузки шаблонов документов
 */
public class ExcelTpls implements Doc2Doc {
    final static private Logger log = LoggerFactory.getLogger(ExcelTpls.class);
//    private final String SMGS2_CONTS_TEMPLATE = "ContsTemplate.xls";
//    private final String SMGS2_VAG_TEMPLATE = "VagsTemplate.xls";

    private String resultMsg = null;

    @Override
    public void convert(Doc2Doc_A action) throws Exception {
        log.info("convert");
        String  templateName,
                tplPath = action.getServletRequest().getSession().getServletContext().getRealPath(File.separator + "docs") + File.separator + "uploadTpls";

//        switch (action.getSearch().getDocType().toUpperCase()) {
//            // шаблон для импорта в раздел вагон/контейнер/груз при контейнерной перевозке СМГС2
//            case "SMGS2_CONTS_TEMPLATE": {
//                templateName = this.SMGS2_CONTS_TEMPLATE;
//            }
//            break;
//            case "SMGS2_VAG_TEMPLATE": {
//                templateName = this.SMGS2_VAG_TEMPLATE;
//            }
//            break;
//        }
        //считываем имя файла шаблона
        templateName=action.getSearch().getDocType();

        ResponseCfg responseCfg = new ResponseCfg(action.getServletResponse(), action.getServletRequest(), templateName);
        Files.copy(Paths.get(tplPath + File.separator + templateName), responseCfg.getResponse().getOutputStream());
//        WorkbookFactory.create(new File(tplPath+File.separator+templateName)).write(responseCfg.getResponse().getOutputStream());
    }

    @Override
    public String getResultMsg() {
        return resultMsg;
    }
}
