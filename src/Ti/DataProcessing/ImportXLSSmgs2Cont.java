/**
 *  обработка XLS файла контейнеров
 */
package Ti.DataProcessing;

import Ti.model.ContSmgs2;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ImportXLSSmgs2Cont extends ImportXLS {
    @Override
    public ArrayList<ContSmgs2> processSheet() {
        ArrayList<ContSmgs2> conts = new ArrayList();
        String nvag;
        String klientName;
        BigDecimal grPod;
        Byte kolOs;
        BigDecimal taraVag;
        String utiN;
        BigDecimal sizeFoot;
        String utiType;
        BigDecimal grPodCont;
        int znak_kol;
        List<String> znak;
        int places;
        BigDecimal netto;
        BigDecimal taraKont;
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
            utiN = getStringCellValue(safeGetCell(row_num , 6));

            // column H
            test = getStringCellValue(safeGetCell(row_num, 7));
            sizeFoot = new BigDecimal(parseNumirec(test,getErrors(),7));

            // column I
            utiType = getStringCellValue(safeGetCell(row_num , 8));

            // column J
            test = getStringCellValue(safeGetCell(row_num, 9));
            grPodCont = new BigDecimal(parseNumirec(test,getErrors(),9));

            // column K
            test = getStringCellValue(safeGetCell(row_num, 10)).trim();
            znak_kol=(byte) Integer.parseInt(parseNumirec(test,getErrors(),10));

            // column L
            test = getStringCellValue(safeGetCell(row_num, 11));
            if(Arrays.asList(test.split(",")).size()>Arrays.asList(test.split(";")).size())
                znak =Arrays.asList(test.split(",")) ;
            else
                znak =Arrays.asList(test.split(";"));

            // column M
            test = getStringCellValue(safeGetCell(row_num, 12)).trim();
            places=(byte) Integer.parseInt(parseNumirec(test,getErrors(),12));

            // column N
            test = getStringCellValue(safeGetCell(row_num, 13));
            netto = new BigDecimal(parseNumirec(test,getErrors(),13), MathContext.DECIMAL64).stripTrailingZeros();

            // column O
            test = getStringCellValue(safeGetCell(row_num, 14));
            taraKont = new BigDecimal(parseNumirec(test,getErrors(),14), MathContext.DECIMAL64).stripTrailingZeros();

            // column P
            test = getStringCellValue(safeGetCell(row_num, 15));
            brutto = new BigDecimal(parseNumirec(test,getErrors(),15), MathContext.DECIMAL64).stripTrailingZeros();

            conts.add(new ContSmgs2(nvag,klientName,grPod,kolOs,taraVag,utiN,sizeFoot,utiType,grPodCont, znak_kol,znak,places,netto,taraKont,brutto));

            row_num++;
            cell = safeGetCell(row_num, 0);
        }

        return conts;
    }
}
