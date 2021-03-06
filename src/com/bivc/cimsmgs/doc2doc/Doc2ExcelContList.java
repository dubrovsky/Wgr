/**
 *  класс для модели отображающий строку XLS файла контейнеров
 */
package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.actions.Doc2Doc_A;
import com.bivc.cimsmgs.actions.File_A;
import com.bivc.cimsmgs.commons.OutputStreamWriters;
import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.FileInfDAO;
import com.bivc.cimsmgs.dao.hibernate.*;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsFileInf;
import com.bivc.cimsmgs.exceptions.BusinessException;
import com.bivc.cimsmgs.upload.excel.Export2Excel;
import org.apache.commons.lang3.StringUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

public class Doc2ExcelContList implements OutputStreamWriters {
    private final String CONTENT_TYPE = "application/vnd.ms-excel";
    private final Export2Excel doc2Excel;

    public Doc2ExcelContList(Export2Excel doc2Excel) {
        this.doc2Excel = doc2Excel;
    }

    public void saveFile2DB(Doc2Doc_A action, String OUTPUT_FILE) throws Exception {
        Search search = action.getSearch();
        CimSmgs doc;
        // Look for Svodn vedomost'
        List<CimSmgs> docs;
        if(StringUtils.isNotBlank(search.getNpoezd())){
            docs = action.getSmgsDAO().findKontVedByNPoezd(search.getNpoezd(), action.getType().byteValue(), search.getRouteId());
        } else {
            docs = new ArrayList<>(1);
            docs.add(action.getSmgsDAO().getById(action.getHid(), false));
        }

        if (docs.size() > 0) {
            doc = docs.iterator().next();
        } else {
            docs = action.getSmgsDAO().findDocByNPoezd(search.getNpoezd(), action.getType().byteValue(), search.getRouteId());
            if (docs.size() > 0) {
                doc = docs.iterator().next();
            } else {
                throw new BusinessException("Некуда привязать файл при сохранении");
            }
        }
        /// Init File_A to save Excel in DB
        File_A file_a = new File_A();

        file_a.setUploadFileName(new String[]{OUTPUT_FILE});
        file_a.setUploadContentType(new String[]{CONTENT_TYPE});
//        file_a.setUpload(writeFile(doc2Excel));

//        file_a.setOutputStreamt(writeFile(doc2Excel));

        CimSmgsFileInf fileInf = new CimSmgsFileInf();
        fileInf.setPackDoc(doc.getPackDoc());
        fileInf.setType(search.getDocType());

        FileInfDAO fileInfDAO = new FileInfDAOHib();
        file_a.setFileInfDAO(fileInfDAO);
        fileInf = fileInfDAO.findById2(fileInf);
        if (fileInf == null) {
            fileInf = new CimSmgsFileInf();
            fileInf.setPackDoc(doc.getPackDoc());
            fileInf.setRoute(doc.getRoute());
            fileInf.setType(search.getDocType());
            fileInf.setNkon(OUTPUT_FILE + " " + StringUtils.defaultString(search.getNpoezd()));
        }
        file_a.setFile(fileInf);

        file_a.setFileDAO(new FileDAOHib());
        file_a.setRouteDAO(new RouteDAOHib());
        file_a.setPackDocDAO(new PackDocDAOHib());
        file_a.setUsrGroupsDirDAO(new UsrGroupsDirDAOHib());
        file_a.setUser(action.getUser());

        file_a.saveFile(this);
    }

    private OutputStream writeFile(Export2Excel doc2Excel) throws IOException {
        OutputStream os = null;
        try {
            os = new ByteArrayOutputStream();
            doc2Excel.getWb().write(os);
            return os;
        } finally {
            if (os != null) {
                os.close();
            }
        }
    }

    @Override
    public void writeTo(OutputStream os) throws IOException {
        doc2Excel.getWb().write(os);
    }
}
