package com.bivc.cimsmgs.exchange.xls2kypoezd;

import org.apache.poi.ss.usermodel.Sheet;

import java.math.BigDecimal;

import static com.bivc.cimsmgs.exchange.Utils.*;
import static org.apache.commons.lang3.StringUtils.substringAfter;
import static org.apache.commons.lang3.StringUtils.substringBefore;

public class AgrostopChinyReader extends AbstractReader {

    private static final String MARKER = "DYSPOZYCJA  PRZEŁADUNKOWA";

    public AgrostopChinyReader(Sheet sheet) {
        super(sheet);
    }

    public static boolean isCompat(Sheet sheet) {
        String marker1 = getStrVal(sheet, 1, "A");
        return marker1.contains(MARKER);
    }

    @Override
    public int start() {
        return 4;
    }

    @Override
    public boolean skip(int j) {
        String nkon = getNkon(j);
        return !PRINNKON_P.matcher(nkon).matches();
    }

    @Override
    public String getNvag(int j) {
        return "";
    }

    @Override
    public String getNkon(int j) {
        return normNvagNkonStr(getStrVal(sheet, j, "B"));
    }

    @Override
    public String getTypeKont(int j) {
        return getStrVal(sheet, j, "C");
    }

    @Override
    public BigDecimal getBruttoAllKont(int j, BigDecimal tara, BigDecimal mbrt) {
        return getNumVal(sheet, j, "D", 3);
    }

    @Override
    public String getKgvn(int j) {
        String str = getStrVal(sheet, j, "E");
        str = substringBefore(str, " ");
        return str;
    }

    @Override
    public String getNzgr(int j) {
        String str = getStrVal(sheet, j, "E");
        str = substringAfter(str, " - ");
        return str;
    }
}
