package com.bivc.cimsmgs.exchange.xls2kypoezd;

import org.apache.poi.ss.usermodel.Sheet;

import java.math.BigDecimal;

import static com.bivc.cimsmgs.exchange.Utils.*;

public class LodzOlechowReader extends AbstractReader {

    private static final String MARKER = "Wykaz przesyłek nadawanych";

    public LodzOlechowReader(Sheet sheet) {
        super(sheet);
    }

    public static boolean isCompat(Sheet sheet) {
        return getStrVal(sheet, 6, "A").contains(MARKER);
    }

    @Override
    public int start() {
        return 17;
    }

    @Override
    public boolean skip(int j) {
        String nvag = getNvag(j);
        return !NVAG_P.matcher(nvag).matches();
    }

    @Override
    public String getNvag(int j) {
        return normNvagNkonStr(getStrVal(sheet, j, "G"));
    }

    @Override
    public String getNkon(int j) {
        return normNvagNkonStr(getStrVal(sheet, j, "Q"));
    }

    @Override
    public BigDecimal getTaraKont(int j) {
        return "993100".equals(getKgvn(j)) ? getBruttoAllKont(j, null, null) : null;
    }

    @Override
    public BigDecimal getBruttoAllKont(int j, BigDecimal tara, BigDecimal mbrt) {
        return getNumVal(sheet, j, "V", 0);
    }

    @Override
    public String getKgvn(int j) {
        return getStrVal(sheet, j, "M");
    }
}
