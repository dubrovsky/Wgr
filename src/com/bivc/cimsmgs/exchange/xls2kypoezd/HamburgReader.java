package com.bivc.cimsmgs.exchange.xls2kypoezd;

import org.apache.poi.ss.usermodel.Sheet;

import java.math.BigDecimal;

import static com.bivc.cimsmgs.exchange.Utils.*;
import static org.apache.commons.lang3.StringUtils.substringBefore;

public class HamburgReader extends AbstractReader {

    private static final String MARKER = " Hamburg ";

    public HamburgReader(Sheet sheet) {
        super(sheet);
    }

    public static boolean isCompat(Sheet sheet) {
        String marker1 = getStrVal(sheet, 1, "A");
        return marker1.contains(MARKER);
    }

    @Override
    public int start() {
        return 5;
    }

    @Override
    public boolean skip(int j) {
        return getNumVal(sheet, j, "A") == null;
    }

    @Override
    public String getNvag(int j) {
        return normNvagNkonStr(getStrVal(sheet, j, "K"));
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
    public String getVidKont(int j) {
        return getStrVal(sheet, j, "D");
    }

    @Override
    public BigDecimal getTaraKont(int j) {
        return readVal(j, "F");
    }

    @Override
    public BigDecimal getPodSilaKont(int j) {
        return readVal(j, "E");
    }

    @Override
    public BigDecimal getBruttoKont(int j) {
        return readVal(j, "G");
    }

    private BigDecimal readVal(int j, String col) {
        String val = getStrVal(sheet, j, col);
        val = substringBefore(val, " ");
        return makeBigDecimal(val);
    }

    @Override
    public String getPlombZnak(int j) {
        return getStrVal(sheet, j, "J");
    }
}
