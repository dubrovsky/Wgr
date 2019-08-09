package Ti.DataProcessing;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

public abstract class ImportXLS {

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

    public ImportXLS() {

        errors = new ArrayList<>();
        errors.add("Excel errors:");
    }

    public ArrayList<String> getErrors() {
        return errors;
    }

    public Sheet getDatatypeSheet() {
        return datatypeSheet;
    }

    public boolean isInited() {
        return isInited;
    }

    public void setErrors(ArrayList<String> errors) {
        this.errors = errors;
    }

    public void setDatatypeSheet(Sheet datatypeSheet) {
        this.datatypeSheet = datatypeSheet;
    }

    public void setInited(boolean inited) {
        isInited = inited;
    }


    //-----------------------------Service Methods
    /**
     * Метод влзыращает текстовое значение ячейки.
     *
     * @param cell
     * @return тнестовое значение
     */
    public static String getStringCellValue(Cell cell) {
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
    public  Cell safeGetCell(int row, int column) {
        Cell cell;
        if (getDatatypeSheet().getRow(row) == null) {
            getDatatypeSheet().createRow(row);
        }
        cell = getDatatypeSheet().getRow(row).getCell(column);
        if (cell == null) {
            cell = getDatatypeSheet().getRow(row).createCell(column);
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
    String parseNumirec(String test, ArrayList<String> errors, Integer column_num)
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

    /**
     * обработка листа XLS файла
     * @return список записей
     */
    public abstract ArrayList<?> processSheet();
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
            setDatatypeSheet(workbook.getSheetAt(0));
            return true;
        }
        catch (IOException e) {
            getErrors().add(e.getMessage());
            e.printStackTrace();
            return false;
        }
        catch (InvalidFormatException e) {
            getErrors().add("Wrong Excel File");
            return false;
        }
    }

}
