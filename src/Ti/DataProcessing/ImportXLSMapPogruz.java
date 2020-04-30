package Ti.DataProcessing;

import Ti.model.excel.MapPogruz;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ImportXLSMapPogruz extends ImportXLS {

    public ImportXLSMapPogruz() {
        super();
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
            sizeFoot = new BigDecimal(parseNumirec(test,getErrors(),5));

            // column G
            uti_type = getStringCellValue(safeGetCell(row_num + 1, 6));
            // column H
            znak_str = getStringCellValue(safeGetCell(row_num + 1, 7));
            znak = Arrays.asList(znak_str.split(","));

            // column I
            test = getStringCellValue(safeGetCell(row_num + 1, 8)).trim();
            taraKont = (short) Double.parseDouble(parseNumirec(test,getErrors(),8));

            // column J
            test = getStringCellValue(safeGetCell(row_num + 1, 9)).trim();
            grPodKont = new BigDecimal(parseNumirec(test,getErrors(),8));

            test = getStringCellValue(safeGetCell(row_num + 1, 11)).trim();
            taraVag = new BigDecimal(parseNumirec(test,getErrors(),8));

            // column M
            test = getStringCellValue(safeGetCell(row_num + 1, 12)).trim();
            System.out.println(test);
            grPod = new BigDecimal(parseNumirec(test,getErrors(),8));

            // column N
            test = getStringCellValue(safeGetCell(row_num + 1, 13)).trim();
            kolOs=(byte) Double.parseDouble(parseNumirec(test,getErrors(),13));

            MapPogruz mapPeregr = new MapPogruz(  nvag,utiN,"", g694, klientName,sizeFoot, uti_type, znak, taraKont, grPodKont, taraVag, grPod, kolOs,false);
            mapPeregruzs.add(mapPeregr);
            row_num++;
            cell = safeGetCell(row_num + 1, 0);
        }
        return mapPeregruzs;
    }

}
