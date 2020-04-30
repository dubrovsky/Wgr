package Ti.DataProcessing;

import Ti.model.excel.InvoiceCargo;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.ArrayList;

/**
 * Считывает из XLS файла грузы для Invoice
 */
public class ImportXLSInvoiceCargo extends ImportXLS {
    @Override
    public ArrayList<InvoiceCargo> processSheet() {

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
        ArrayList<InvoiceCargo> invoiceCargos = new ArrayList<>();
        int row_num = 5;
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

            InvoiceCargo cargo = new InvoiceCargo(tnved, nzgr, nzgrEn, kole, eizm, mnet, mbrt, itogo, kolm);
            invoiceCargos.add(cargo);
            row_num++;
            cell = safeGetCell(row_num, 1);
        }
        return invoiceCargos;
    }
}
