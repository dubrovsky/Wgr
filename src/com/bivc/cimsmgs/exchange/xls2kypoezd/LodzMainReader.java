package com.bivc.cimsmgs.exchange.xls2kypoezd;

import org.apache.poi.ss.usermodel.Sheet;

import java.math.BigDecimal;

import static com.bivc.cimsmgs.exchange.Utils.*;
import static org.apache.commons.lang3.StringUtils.substringAfter;
import static org.apache.commons.lang3.StringUtils.substringBefore;

public class LodzMainReader extends AbstractReader {

    private static final String MARKER1 = "Container number";
    private static final String MARKER2 = "Container type";

    public LodzMainReader(Sheet sheet) {
        super(sheet);
    }

    public static boolean isCompat(Sheet sheet) {
        return getStrVal(sheet, 1, "A").contains(MARKER1) && getStrVal(sheet, 1, "B").contains(MARKER2);
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
        return "";
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
    public BigDecimal getBruttoAllKont(int j, BigDecimal tara, BigDecimal mbrt) {
        return getNumVal(sheet, j, "H", 3);
    }

}
