package Ti.DataProcessing;

import Ti.model.excel.InvoiceXls;
import Ti.model.excel.InvoiceXlsContainer;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.ArrayList;
import java.util.Date;

public class ImportXLSInvoice extends ImportXLS {
    @Override
    public ArrayList<InvoiceXlsContainer> processSheet() {

        String num;
        String tnved;
        String nzgr;
        String nzgrEn;
        BigDecimal kole;
        String eizm;
        BigDecimal mnet;
        BigDecimal mbrt;
        BigDecimal itogo;
        BigDecimal kolm;
        String invoiceNum;
        String contNum;

        Date date;
        ArrayList<InvoiceXlsContainer> list = new ArrayList<>();
        ArrayList<InvoiceXls> invoices = new ArrayList<>();
        int row_num = 5;
        contNum = getStringCellValue(safeGetCell(1, 2));
        contNum=contNum.trim().replaceAll(" +","").replaceAll("-+","");


        Cell cell = safeGetCell(row_num, 1);
        while (!getStringCellValue(cell).isEmpty() && StringUtils.isNumeric(getStringCellValue(cell))) {
            //B
            tnved = getStringCellValue(safeGetCell(row_num, 1));
            //D
            nzgr = getStringCellValue(safeGetCell(row_num, 3)).replaceAll("<","").replaceAll(">","");
            //E
            nzgrEn = getStringCellValue(safeGetCell(row_num, 4)).replaceAll("<","").replaceAll(">","");
            //F
            num = parseNumirecNull(getStringCellValue(safeGetCell(row_num, 5)), getErrors(), 7);
            kole = (num == null) ? null : new BigDecimal(num, MathContext.DECIMAL64);
            //G
            eizm = getStringCellValue(safeGetCell(row_num, 6));
            //H
            num = parseNumirecNull(getStringCellValue(safeGetCell(row_num, 7)), getErrors(), 9);
            mnet = (num == null) ? null : new BigDecimal(num, MathContext.DECIMAL64);
            //I
            num = parseNumirecNull(getStringCellValue(safeGetCell(row_num, 8)), getErrors(), 10);
            mbrt = (num == null) ? null : new BigDecimal(num, MathContext.DECIMAL64);
            //J
            num = parseNumirecNull(getStringCellValue(safeGetCell(row_num, 9)), getErrors(), 11);
            itogo = (num == null) ? null : new BigDecimal(num, MathContext.DECIMAL64);
            //K
            num = parseNumirecNull(getStringCellValue(safeGetCell(row_num, 10)), getErrors(), 12);
            kolm = (num == null) ? null : new BigDecimal(num, MathContext.DECIMAL64);
            //L
            invoiceNum = getStringCellValue(safeGetCell(row_num, 11));
            //M
            date = getDateCell(safeGetCell(row_num, 12));

            InvoiceXls invoice = new InvoiceXls(tnved, nzgr, nzgrEn, kole, eizm, mnet, mbrt, itogo, kolm,invoiceNum,date);
            invoices.add(invoice);
            row_num++;
            cell = safeGetCell(row_num, 1);
        }
        list.add(new InvoiceXlsContainer(contNum,invoices));

        return list;
    }
}
