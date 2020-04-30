package Ti.DataProcessing;

import Ti.model.excel.SmgsFromXLS;
import com.bivc.cimsmgs.db.CimSmgsPlomb;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

public class ImportXlsSmgs extends ImportXLS {

    @Override
    public ArrayList<SmgsFromXLS> processSheet() {
        int row_num = 1;
        String test;
        ArrayList<SmgsFromXLS> smgsFromXLS = new ArrayList<>();

        Cell cell = safeGetCell(row_num, 0);
        while (StringUtils.isNumeric (getStringCellValue(cell))) {

            //B № вагона
            String nvag= getStringCellValue(safeGetCell(row_num , 1)).trim();
            //C Владелец вагона
            String klientName=getStringCellValue(safeGetCell(row_num , 2)).trim();
            //D Грузоподъемность вагона
            test = getStringCellValue(safeGetCell(row_num, 3    ));
            BigDecimal grPodVag=new BigDecimal(parseNumirec(test,getErrors(),3));
            //E Кол-во осей
            test = getStringCellValue(safeGetCell(row_num, 4)).trim();
            Byte kolOs=(byte) Integer.parseInt(parseNumirec(test,getErrors(),4));
            //F Тара вагона
            test = getStringCellValue(safeGetCell(row_num, 5));
            BigDecimal taraVag=new BigDecimal(parseNumirec(test,getErrors(),5));
            //G № контейнера
            String utiN= getStringCellValue(safeGetCell(row_num , 6)).trim();
            //H Фут. Конт
            test = getStringCellValue(safeGetCell(row_num, 7    ));
            BigDecimal sizeFoot= new BigDecimal(parseNumirec(test,getErrors(),7));
            //I Типоразмер конт.
            String utiType=getStringCellValue(safeGetCell(row_num , 8)).trim();
            //J Грузоподъемность конт.
            test = getStringCellValue(safeGetCell(row_num, 9));
            BigDecimal grpodCont=new BigDecimal(parseNumirec(test,getErrors(),9));
            //K тара контейнера
            test = getStringCellValue(safeGetCell(row_num, 10)).trim();
            Short taraKont=(short) Integer.parseInt(parseNumirec(test,getErrors(),10));
            //L Пломбы,  знаки
            String[] plombsArr;
            String[] separators={",",";","\n"};
            String separator=",";
            int max_len=0;
            test = getStringCellValue(safeGetCell(row_num, 11)).trim();
            for (String sep:separators) {
                if(test.split(sep).length>max_len)
                {
                    max_len=test.split(sep).length;
                    separator=sep;
                }
            }

            plombsArr=test.split(separator);
            CimSmgsPlomb[] plombs=convert2plombs(plombsArr);

            //M ГНГ груза
            String kgvn=getStringCellValue(safeGetCell(row_num , 12)).trim();
            //N ЕТСНГ груза
            String ekgvn=getStringCellValue(safeGetCell(row_num , 13)).trim();
            //O Наименование груза
            String nzgr=getStringCellValue(safeGetCell(row_num , 14)).trim();
            //P Упаковка
            String upak=getStringCellValue(safeGetCell(row_num , 15)).trim();
            //Q Кол-во мест
            test = getStringCellValue(safeGetCell(row_num, 16)).trim();
            Integer places=Integer.parseInt(parseNumirec(test,getErrors(),16));
            //R Нетто
            test = getStringCellValue(safeGetCell(row_num, 17));
            BigDecimal massa=new BigDecimal(parseNumirec(test,getErrors(),17));
            //S Гр. 15 доп.инфо
            String g11_prim=getStringCellValue(safeGetCell(row_num , 18)).trim();
            //T Отправитель РУ
            String g1r=getStringCellValue(safeGetCell(row_num , 19)).trim();
            //U Адрес отправителя ру
            String g19r=getStringCellValue(safeGetCell(row_num , 20)).trim();
            //V Отправитель доп инфо
            String g1_dop_info=getStringCellValue(safeGetCell(row_num , 21)).trim();
            //W Получатель
            String g4r=getStringCellValue(safeGetCell(row_num , 22)).trim();
            //X Адрес получателя
            String g49r=getStringCellValue(safeGetCell(row_num , 23)).trim();
            //Y Получатель доп инфо
            String g4_dop_info=getStringCellValue(safeGetCell(row_num , 24)).trim();
            //Z Код ст. назначения
            String g121=getStringCellValue(safeGetCell(row_num , 25)).trim();
            //AA Наименование ст. назначения ру
            String g101r=getStringCellValue(safeGetCell(row_num , 26)).trim();
            //AB Номер отправки
            String g694=getStringCellValue(safeGetCell(row_num , 27)).trim();
            //AC Дата отправки
            Date g281=getDateCell(safeGetCell(row_num , 28));

            SmgsFromXLS rec= new SmgsFromXLS(nvag,klientName,grPodVag,kolOs,taraVag,utiN,sizeFoot,utiType, grpodCont,taraKont,plombs,
                    kgvn,ekgvn,nzgr,upak,places,massa,g11_prim,g1r,g19r,g1_dop_info,g4r,g49r,g4_dop_info,g121,g101r,g694,g281);
            smgsFromXLS.add(rec);
            cell = safeGetCell(++row_num, 0);
        }
        return smgsFromXLS;
    }
    private CimSmgsPlomb[] convert2plombs(String[] plombs)
    {
        CimSmgsPlomb[] plombsArr=new CimSmgsPlomb[plombs.length];
        if(plombs.length>0)
        {
            for (int i=0;i<plombs.length;i++) {
                String plomb = plombs[i];
                CimSmgsPlomb plombObj = new CimSmgsPlomb();
                plombObj.setSort((byte)i);
                plombObj.setZnak(plomb);
                plombObj.setKpl((short)1);
                plombsArr[i]=plombObj;
            }
        }
        return plombsArr;
    }
}
