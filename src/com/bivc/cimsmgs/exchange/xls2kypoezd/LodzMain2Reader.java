package com.bivc.cimsmgs.exchange.xls2kypoezd;

import org.apache.poi.ss.usermodel.Sheet;

import java.math.BigDecimal;

import static com.bivc.cimsmgs.exchange.Utils.*;

public class LodzMain2Reader extends AbstractReader {

    private static final String MARKER1 = "Nrkontenera";
    private static final String MARKER2 = "Typ";
    private static final String MARKER3 = "Krajwyj";

    public LodzMain2Reader(Sheet sheet) {
        super(sheet);
    }

    public static boolean isCompat(Sheet sheet) {
        return getStrVal(sheet, 1, "A").contains(MARKER1) && getStrVal(sheet, 1, "B").contains(MARKER2) && getStrVal(sheet, 1, "I").contains(MARKER3);
    }

    @Override
    public int start() {
        return 2;
    }

    @Override
    public boolean skip(int j) {
        String nkon = getNkon(j);
        return !PRINNKON_P.matcher(nkon).matches();
    }

    @Override
    public String getNvag(int j) {
        return normNvagNkonStr(getStrVal(sheet, j, "O"));
    }

    @Override
    public String getNkon(int j) {
        return normNvagNkonStr(getStrVal(sheet, j, "A"));
    }

    @Override
    public String getTypeKont(int j) {
        return getStrVal(sheet, j, "B");
    }

    @Override
    public BigDecimal getTaraKont(int j) {
        return getNumVal(sheet, j, "R", 0);
    }

    @Override
    public BigDecimal getBruttoKont(int j) {
        return getNumVal(sheet, j, "L", 0);
    }

    @Override
    public String getPlombZnak(int j) {
        return getStrVal(sheet, j, "M");
    }

}
