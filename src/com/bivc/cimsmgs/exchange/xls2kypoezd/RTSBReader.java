package com.bivc.cimsmgs.exchange.xls2kypoezd;

import org.apache.poi.ss.usermodel.Sheet;

import java.math.BigDecimal;

import static com.bivc.cimsmgs.exchange.Utils.*;
import static org.apache.commons.lang3.StringUtils.substringBefore;

public class RTSBReader extends AbstractReader {

    private static final String MARKER = "RTSB GmbH Rail";

    public RTSBReader(Sheet sheet) {
        super(sheet);
    }

    public static boolean isCompat(Sheet sheet) {
        String marker1 = getStrVal(sheet, 2, "B");
        return marker1.contains(MARKER);
    }

    @Override
    public int start() {
        return 10;
    }

    @Override
    public boolean skip(int j) {
        return getNumVal(sheet, j, "B") == null;
    }

    @Override
    public String getNvag(int j) {
        return normNvagNkonStr(getStrVal(sheet, j, "F"));
    }

    @Override
    public String getNkon(int j) {
        return normNvagNkonStr(getStrVal(sheet, j, "D"));
    }

    @Override
    public BigDecimal getTaraKont(int j) {
        return getNumVal(sheet, j, "E");
    }

    @Override
    public String getNzgr(int j) {
        return getStrVal(sheet, j, "G");
    }
}
