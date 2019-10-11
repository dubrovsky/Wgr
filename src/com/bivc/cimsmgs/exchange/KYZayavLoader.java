package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.db.ky.*;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import java.io.File;
import java.math.BigDecimal;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.bivc.cimsmgs.exchange.Utils.*;
import static org.apache.commons.lang3.StringUtils.isNotEmpty;

public class KYZayavLoader {
    private static final Pattern prinnkon_p = Pattern.compile("^[a-zA-Z]{4}[0-9]{7,9}$");
    private static final Pattern nvag_p = Pattern.compile("^[0-9]{8,12}$");

    public Map<String, List<?>> load(File file, PoezdZayav zajav) throws Exception {
        Map<String, List<?>> res = new HashMap<>(1);
        ArrayList<Kont> kontList = new ArrayList<>();
        TreeMap<String, Vagon> vagMap = new TreeMap<>();

        short vagSort = 0;
        byte konSort = 0;

        try (Workbook wb = WorkbookFactory.create(file)) {
            Sheet sheet = wb.getSheetAt(0);

            for (int j = 1; j <= sheet.getLastRowNum() + 1; j++) {
                String nvag = normNvagNkonStr(getStrVal(sheet, j, "B"));
                String nkon = normNvagNkonStr(getStrVal(sheet, j, "D"));

                Matcher m = nvag_p.matcher(nvag);
                boolean isNvag = m.find();
                m = prinnkon_p.matcher(nkon);
                boolean isKont = m.find();

                if (!isNvag && !isKont)
                    continue;

                Vagon vag = vagMap.get(nvag);
                if (vag == null) {
                    vag = new Vagon();
                    vag.setNvag(nvag);
                    vag.setSort(vagSort++);
                    if (isKont)
                        vag.setOtpravka(Otpravka.CONT);

                    zajav.addVagon(vag);
                    vagMap.put(nvag, vag);
                    konSort = 0;
                }

                if (isKont) {
                    Kont kont = new Kont();
                    kont.setSort(konSort++);
                    kont.setIsZayav((byte) 1);
                    kont.setNkon(nkon);
                    kont.setNotp(getStrVal(sheet, j, "C"));
                    BigDecimal mnet = getNumVal(sheet, j, "E");
                    kont.setMassa_brutto(mnet);
                    BigDecimal tara = getNumVal(sheet, j, "F", 0);
                    if (tara != null) {
                        kont.setMassa_tar(tara.longValue());
                    }
                    BigDecimal mbrt = getNumVal(sheet, j, "G");
                    kont.setMassa_brutto_all(mbrt);

                    short plombSort = 0;
                    String znak = getStrVal(sheet, j, "J");
                    String[] zn = znak.split(",");
                    for (String item : zn) {
                        Plomb plomb = new Plomb();
                        plomb.setZnak(item);
                        plomb.setKpl(plombSort++);
                        kont.addPlomb(plomb);
                    }

                    Gruz gruz = new Gruz();
                    gruz.setSort((byte) 0);
                    gruz.setKgvn(getStrVal(sheet, j, "H"));
                    gruz.setMassa(kont.getMassa_brutto());
                    kont.addGruz(gruz);

                    kontList.add(kont);
                    vag.addKont(kont);
                }
            }
        }

        res.put("konts", kontList);
        return res;
    }
}
