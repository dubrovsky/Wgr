package com.bivc.cimsmgs.upload.excel;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ExcelWriter {
    private final Export2Excel excel;
    private final String filename;
    static final String ZIP = "zip";
    private boolean zipped;
//    private final Workbook wb;
//    private final String excelFormat;
    private final String zipFileName = "Document";

//    public ExcelWriter(/*HttpServletResponse response, HttpServletRequest request, String filename,*/ Workbook wb, String excelFormat) throws UnsupportedEncodingException {
////        super(response, request, filename, excelFormat);
//        this.wb = wb;
//        this.excelFormat = excelFormat;
//    }

    public ExcelWriter(Export2Excel excel, String filename, boolean zipped) {
            //To change body of created methods use File | Settings | File Templates.
        this.excel = excel;
        this.filename = filename;
        this.zipped = zipped;
    }

    public void write(OutputStream os) throws IOException {
        if(zipped){
            ZipOutputStream zip = new ZipOutputStream(os);
            zip.putNextEntry(new ZipEntry(zipFileName + "." + excel.getExcelFormat()));
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            excel.getWb().write(baos);
            zip.write(baos.toByteArray());
            baos.close();
            zip.close();
        } else {
            excel.getWb().write(os);
        }
        os.flush();
        os.close();
    }

    public String getFileFullName(){
        if(zipped){
            return filename + "." + ZIP;
        } else {
            return filename + "." + excel.getExcelFormat();
        }
    }
}
