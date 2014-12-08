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

public class CimSmgs2ExcelContList_de implements Doc2Doc {
    final static private Logger log = LoggerFactory.getLogger(CimSmgs2ExcelContList_de.class);
    private final String TEMPLATE_FILE = "ContsList_CimSMGS_de1.xls";
    private final String OUTPUT_FILE = "Container's List DE";
    private final String CONTENT_TYPE = "application/vnd.ms-excel";
    private String resultMsg = null;
    private Doc2ExcelContList doc2ExcelContList;

    @Override
    public void convert(Doc2Doc_A action) throws Exception {
        log.info("convert");
        List<CimSmgs> docs = action.getSmgsDAO().findDocsByNPoezd(action.getSearch().getNpoezd(), action.getType(), action.getSearch().getRouteId());
        String path4ExcelTmpl = action.getServletRequest().getSession().getServletContext().getRealPath(File.separator + "docs") + File.separator + TEMPLATE_FILE;
        ExportContList2Excel doc2Excel = new ExportContList2Excel(Export2Excel.XLS, docs, path4ExcelTmpl);
        doc2Excel.makeCimSmgsContList_de();

        ///// Begin save file to DB
        doc2ExcelContList = new Doc2ExcelContList(doc2Excel);
        doc2ExcelContList.saveFile2DB(action, OUTPUT_FILE);
        ///// END  save file to DB


        //// Stream file to response
        ExcelWriter excelWriter = new ExcelWriter(doc2Excel, OUTPUT_FILE, false);
        ResponseCfg responseCfg = new ResponseCfg(action.getServletResponse(), action.getServletRequest(), excelWriter.getFileFullName());
        excelWriter.write(responseCfg.getResponse().getOutputStream());
    }

    /*private void saveFile2DB(Doc2Doc_A action, ExportContList2Excel doc2Excel) throws Exception {
        Search search = action.getSearch();
        CimSmgs doc;
        // Look for Svodn vedomost'
        List<CimSmgs> docs = action.getSmgsDAO().findKontVedByNPoezd(search.getNpoezd(), action.getType().byteValue());
        if(docs.size() > 0){
            doc = docs.iterator().next();
        } else {
            docs = action.getSmgsDAO().findDocByNPoezd(search.getNpoezd(), action.getType().byteValue());
            if(docs.size() > 0){
                doc = docs.iterator().next();
            }
            else{
                throw new BusinessException("Некуда привязать файл при сохранении");
            }
        }
        /// Init File_A to save Excel in DB
        File_A file_a = new File_A();

        file_a.setUploadFileName(OUTPUT_FILE);
        file_a.setUploadContentType(CONTENT_TYPE);
        file_a.setUpload(writeFile(doc2Excel));

        CimSmgsFileInf fileInf = new CimSmgsFileInf();
        fileInf.setPackDoc(doc.getPackDoc());
        fileInf.setType(search.getDocType());

        FileInfDAO fileInfDAO = new FileInfDAOHib();
        file_a.setFileInfDAO(fileInfDAO);
        fileInf = fileInfDAO.findById2(fileInf);
        if(fileInf == null){
            fileInf = new CimSmgsFileInf();
            fileInf.setPackDoc(doc.getPackDoc());
            fileInf.setRoute(doc.getRoute());
            fileInf.setType(search.getDocType());
            fileInf.setNkon(OUTPUT_FILE + " " + search.getNpoezd());
        }
        file_a.setFile(fileInf);

        file_a.setFileDAO(new FileDAOHib());
        file_a.setRouteDAO(new RouteDAOHib());
        file_a.setPackDocDAO(new PackDocDAOHib());
        file_a.setUsrGroupsDirDAO(new UsrGroupsDirDAOHib());
        file_a.setUser(action.getUser());

        file_a.saveFile();
    }

    private File writeFile(Export2Excel doc2Excel) throws IOException {
        FileOutputStream fop = null;
        File file;

        try {

            file = new File("OUTPUT_FILE");
            fop = new FileOutputStream(file);

            // if file doesnt exists, then create it
            if (!file.exists()) {
                file.createNewFile();
            }

            doc2Excel.getWb().write(fop);
            fop.flush();
            fop.close();
            return file;
        } catch (FileNotFoundException e) {
            throw e;  //To change body of catch statement use File | Settings | File Templates.
        } catch (IOException e) {
            throw e;  //To change body of catch statement use File | Settings | File Templates.
        } finally {
            try {
                if (fop != null) {
                    fop.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }*/


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
