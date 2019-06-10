package Ti.DataProcessing;

import Ti.model.MapPogruz;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ImportXLSMapPogruz {

    /**
     * errors array
     */
    private ArrayList<String> errors;
    /**
     * excel sheet.
     */
    private Sheet datatypeSheet;
    /**
     * shows was the file inited corectly.
     */
    private boolean isInited = false;

    public ImportXLSMapPogruz() {
        errors = new ArrayList<>();
        errors.add("Excel errors:");
    }

    public boolean isInited() {
        return isInited;
    }

    public ArrayList<String> getErrors() {
        return errors;
    }

    /**
     * Простая проверка на месте ли начало таблицы.
     *
     * @param inputStream - входной поток файла EXCEL.
     * @return результат проверки листа на валидность.
     */
    public boolean init(InputStream inputStream) {
        Workbook workbook;
        Cell cell;
        try {
            workbook = WorkbookFactory.create(inputStream);
            datatypeSheet = workbook.getSheetAt(0);

            cell = safeGetCell(2, 0);
            if (StringUtils.isNumeric(getStringCellValue(cell))) {
                isInited = true;
                return true;
            }
            else
                return false;

        }
        catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        catch (InvalidFormatException e) {
            errors.add("Wrong Excel File");
//            e.printStackTrace();
            return false;
        }

    }

    /**
     * Метод считывает данные из листа EXCEL документа и преобразует их в нужный формат.
     * При этом в случае возникновения ошибок они записываются.
     * @return список записей о погрузке
     */
    public ArrayList<MapPogruz> processSheet() {
        String nvag;
        String utiN;
        String g694;
        String klientName;
        BigDecimal sizeFoot;
        String uti_type;
        List<String> znak;
        short taraKont;
        BigDecimal grPodKont;
        BigDecimal taraVag;
        BigDecimal grPod;
        Byte kolOs;

        ArrayList<MapPogruz> mapPeregruzs = new ArrayList<>();
        String test;
        String znak_str;
        int row_num = 1;
        Cell cell = safeGetCell(row_num + 1, 0);

        while (StringUtils.isNumeric (getStringCellValue(cell))) {
            // column B
            nvag = getStringCellValue(safeGetCell(row_num + 1, 1));
            // column C
            utiN = getStringCellValue(safeGetCell(row_num + 1, 2));
            // column D
            g694 = getStringCellValue(safeGetCell(row_num + 1, 3));
            // column E
            klientName = getStringCellValue(safeGetCell(row_num + 1, 4));

            // column F
            test = getStringCellValue(safeGetCell(row_num + 1, 5));
            sizeFoot = new BigDecimal(parseNumirec(test,errors,5));

            // column G
            uti_type = getStringCellValue(safeGetCell(row_num + 1, 6));
            // column H
            znak_str = getStringCellValue(safeGetCell(row_num + 1, 7));
            znak = Arrays.asList(znak_str.split(","));

            // column I
            test = getStringCellValue(safeGetCell(row_num + 1, 8)).trim();
            taraKont = (short) Double.parseDouble(parseNumirec(test,errors,8));

            // column J
            test = getStringCellValue(safeGetCell(row_num + 1, 9)).trim();
            grPodKont = new BigDecimal(parseNumirec(test,errors,8));

            test = getStringCellValue(safeGetCell(row_num + 1, 11)).trim();
            taraVag = new BigDecimal(parseNumirec(test,errors,8));

            // column M
            test = getStringCellValue(safeGetCell(row_num + 1, 12)).trim();
            grPod = new BigDecimal(parseNumirec(test,errors,8));

            // column N
            test = getStringCellValue(safeGetCell(row_num + 1, 13)).trim();
            kolOs=(byte) Double.parseDouble(parseNumirec(test,errors,13));

            MapPogruz mapPeregr = new MapPogruz(  nvag,utiN,"", g694, klientName,sizeFoot, uti_type, znak, taraKont, grPodKont, taraVag, grPod, kolOs,false);
            mapPeregruzs.add(mapPeregr);
            row_num++;
            cell = safeGetCell(row_num + 1, 0);
        }
        return mapPeregruzs;
    }

    //-----------------------------Service Methods
    /**
     * Метод влзыращает текстовое значение ячейки.
     *
     * @param cell
     * @return тнестовое значение
     */
    public String getStringCellValue(Cell cell) {
        cell.setCellType(CellType.STRING);
        return cell.getStringCellValue();
    }

    /**
     * Метод безопасно считывает ячейку.
     *
     * @param row    row of the cell
     * @param column column of the cell
     * @return cell value
     */
    private Cell safeGetCell(int row, int column) {
        Cell cell;
        if (datatypeSheet.getRow(row) == null) {
            datatypeSheet.createRow(row);
        }
        cell = datatypeSheet.getRow(row).getCell(column);
        if (cell == null) {
            cell = datatypeSheet.getRow(row).createCell(column);
        }
        return cell;
    }
    /**
     * parseNumirec method try to parse numeric string and returns:
     * 0 - if string is empty
     * -1  - if parsing failed
     * input string - if string is numeric
     * @param test
     * @param errors
     * @param column_num
     * @return
     */
    private String parseNumirec(String test, ArrayList<String> errors, Integer column_num)
    {
        if(!test.isEmpty()) {
            if (StringUtils.isNumeric(test.replaceAll(",", "").replaceAll("\\.", ""))) {
                return test;
            }
            else {
                if(errors!=null&&column_num!=null)
                    errors.add("Data:" + test + "  Row:" + new Integer(column_num + 2) + " Column:"+String.valueOf((char)(column_num + 64+1)));
                return  "-1";
            }
        }
        else
            return "0";
    }
}
