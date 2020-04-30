/**
 *  обработка XLS файла вагонов
 */
package Ti.DataProcessing;

import Ti.model.excel.VagSmgs2;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ImportXLSSmgs2Vag extends ImportXLS {
    @Override
    public ArrayList<VagSmgs2> processSheet() {
        ArrayList<VagSmgs2> vagSmgs2s= new ArrayList<>();

        String nvag;
        String klientName;
        BigDecimal grPod;
        Byte kolOs;
        BigDecimal taraVag;
        int znak_kol;
        List<String> znak;
        int places=0;
        BigDecimal brutto;
        String test;

        int row_num = 1;
        Cell cell = safeGetCell(row_num, 0);
        while (StringUtils.isNumeric (getStringCellValue(cell))) {
            // column B
            nvag = getStringCellValue(safeGetCell(row_num , 1));
            // column C
            klientName = getStringCellValue(safeGetCell(row_num, 2));

            // column D
            test = getStringCellValue(safeGetCell(row_num, 3));
            grPod = new BigDecimal(parseNumirec(test,getErrors(),3));

            // column E
            test = getStringCellValue(safeGetCell(row_num, 4)).trim();
            kolOs=(byte) Integer.parseInt(parseNumirec(test,getErrors(),4));

            // column F
            test = getStringCellValue(safeGetCell(row_num, 5));
            taraVag = new BigDecimal(parseNumirec(test,getErrors(),5));

            // column G
            test = getStringCellValue(safeGetCell(row_num, 6)).trim();
            znak_kol=(byte) Integer.parseInt(parseNumirec(test,getErrors(),6));

            // column H
            test = getStringCellValue(safeGetCell(row_num, 7));
            if(Arrays.asList(test.split(",")).size()>Arrays.asList(test.split(";")).size())
                znak =Arrays.asList(test.split(",")) ;
            else
                znak =Arrays.asList(test.split(";"));

            // column I
            test = getStringCellValue(safeGetCell(row_num, 8)).trim();
            places=(byte) Integer.parseInt(parseNumirec(test,getErrors(),8));

            // column J
            test = getStringCellValue(safeGetCell(row_num, 9));
            brutto = new BigDecimal(parseNumirec(test,getErrors(),9), MathContext.DECIMAL64).stripTrailingZeros();

            vagSmgs2s.add(new VagSmgs2(nvag,klientName,grPod,kolOs,taraVag,znak_kol,znak,places,brutto));
            row_num++;
            cell = safeGetCell(row_num, 0);
        }

        return vagSmgs2s;
    }
}
