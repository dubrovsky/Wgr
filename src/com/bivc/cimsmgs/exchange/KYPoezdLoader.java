package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.db.ky.*;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import java.io.File;
import java.math.BigDecimal;
import java.util.*;

import static com.bivc.cimsmgs.exchange.Utils.getNumVal;
import static com.bivc.cimsmgs.exchange.Utils.getStrVal;

public class KYPoezdLoader {
    private static BigDecimal thousand = new BigDecimal(1000);

    public Map<String, List<?>> load(File file, Poezd poezd) throws Exception {
        Map<String, List<?>> res = new HashMap<>(1);
        ArrayList<Kont> kontList = new ArrayList<>();
        TreeMap<String, Vagon> vagMap = new TreeMap<>();

        short vagSort = 0;
        byte konSort = 0;

        try (Workbook wb = WorkbookFactory.create(file)) {
            Sheet sheet = wb.getSheetAt(0);

            for (int j = 1; j <= sheet.getLastRowNum() + 1; j++) {
                if (getNumVal(sheet, j, "A") == null)
                    continue;

                String nvag = getStrVal(sheet, j, "B");
                Vagon vag = vagMap.get(nvag);
                if (vag == null) {
                    vag = new Vagon();
                    vag.setNvag(nvag);
                    vag.setSort(vagSort++);
                    vag.setOtpravka(Otpravka.CONT);
                    vag.setSobstv(getStrVal(sheet, j, "E"));
                    BigDecimal tara = getNumVal(sheet, j, "L", 3);
                    if (tara != null) {
                        vag.setMasTar(tara.multiply(thousand).longValue());
                    }
                    vag.setPodSila(getNumVal(sheet, j, "M", 2));
                    BigDecimal kolos = getNumVal(sheet, j, "N");
                    if (kolos != null) {
                        vag.setKolOs(kolos.intValue());
                    }

                    poezd.addVagon(vag);
                    vagMap.put(nvag, vag);
                    konSort = 0;
                }

                Kont kont = new Kont();
                kont.setSort(konSort++);
                kont.setNkon(getStrVal(sheet, j, "C"));
                kont.setNotp(getStrVal(sheet, j, "D"));
                kont.setType(getStrVal(sheet, j, "F"));
                kont.setVid(getStrVal(sheet, j, "G"));
                BigDecimal tara = getNumVal(sheet, j, "I", 0);
                if (tara != null) {
                    kont.setMassa_tar(tara.longValue());
                }
                kont.setPod_sila(getNumVal(sheet, j, "J"));
                BigDecimal mbrt = getNumVal(sheet, j, "K");
                kont.setMassa_brutto(mbrt);
                if (tara != null && mbrt != null) {
                    kont.setMassa_brutto_all(tara.add(mbrt));
                }
                kont.setGruzotpr(poezd.getGruzotpr());

                Plomb plomb = new Plomb();
                plomb.setZnak(getStrVal(sheet, j, "H"));
                plomb.setKpl((short) 1);
                kont.addPlomb(plomb);

                kontList.add(kont);
                vag.addKont(kont);
            }
        }

        res.put("konts", kontList);
        return res;
    }
}
