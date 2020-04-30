package com.bivc.cimsmgs.exchange.xls2kypoezd;

import org.apache.poi.ss.usermodel.Sheet;

import java.math.BigDecimal;

import static com.bivc.cimsmgs.exchange.Utils.*;

public class DuisburgReader extends AbstractReader {

    private static final String MARKER = "Wagenliste mit Gefahrgutangaben";

    public DuisburgReader(Sheet sheet) {
        super(sheet);
    }

    public static boolean isCompat(Sheet sheet) {
        String marker1 = getStrVal(sheet, 1, "A");
        return marker1.contains(MARKER);
    }

    @Override
    public int start() {
        return 10;
    }

    @Override
    public boolean skip(int j) {
        String nvag = getNvag(j);
        return !NVAG_P.matcher(nvag).matches();
    }

    @Override
    public String getNvag(int j) {
        return normNvagNkonStr(getStrVal(sheet, j, "B"));
    }

    @Override
    public String getNkon(int j) {
        return normNvagNkonStr(getStrVal(sheet, j, "M"));
    }

    @Override
    public BigDecimal getTaraVag(int j) {
        BigDecimal val = getNumVal(sheet, j, "I", 3);
        if (val != null) {
            val = val.multiply(THOUSAND);
        }
        return val;
    }

    @Override
    public Integer getKolOs(int j) {
        return getIntVal(j, "E");
    }

    @Override
    public String getTypeKont(int j) {
        return getStrVal(sheet, j, "O");
    }

    @Override
    public BigDecimal getTaraKont(int j) {
        BigDecimal val = getNumVal(sheet, j, "G", 3);
        if (val != null) {
            val = val.multiply(THOUSAND);
        }
        return val;
    }

    @Override
    public BigDecimal getBruttoKont(int j) {
        BigDecimal val = getNumVal(sheet, j, "H", 3);
        if (val != null) {
            val = val.multiply(THOUSAND);
        }
        return val;
    }

}
