package com.bivc.cimsmgs.exchange.xls2kypoezd;

import org.apache.poi.ss.usermodel.Sheet;

import java.math.BigDecimal;

import static com.bivc.cimsmgs.exchange.Utils.*;

public class AdampolAudiReader extends AbstractReader {

    private static final String MARKER = "TERMINAL ADAMPOL";

    public AdampolAudiReader(Sheet sheet) {
        super(sheet);
    }

    public static boolean isCompat(Sheet sheet) {
        String marker1 = getStrVal(sheet, 1, "A");
        boolean res1 = marker1.contains(MARKER);
        String marker2 = getStrVal(sheet, 2, "A");
        boolean res2 = marker2.contains(MARKER);
        return res1 || res2;
    }

    @Override
    public int start() {
        return 2;
    }

    @Override
    public boolean skip(int j) {
        return getNumVal(sheet, j, "A") == null;
    }

    @Override
    public String getNvag(int j) {
        return normNvagNkonStr(getStrVal(sheet, j, "B"));
    }

    @Override
    public String getNkon(int j) {
        return normNvagNkonStr(getStrVal(sheet, j, "C"));
    }

    @Override
    public String getSobstvVag(int j) {
        return getStrVal(sheet, j, "E");
    }

    @Override
    public BigDecimal getTaraVag(int j) {
        BigDecimal val = getNumVal(sheet, j, "L", 3);
        if (val != null) {
            val = val.multiply(THOUSAND);
        }
        return val;
    }

    @Override
    public BigDecimal getPodSilaVag(int j) {
        return getNumVal(sheet, j, "M", 2);
    }

    @Override
    public Integer getKolOs(int j) {
        return getIntVal(j, "N");
    }

    @Override
    public String getNotp(int j) {
        return getStrVal(sheet, j, "D");
    }

    @Override
    public String getTypeKont(int j) {
        return getStrVal(sheet, j, "F");
    }

    @Override
    public String getVidKont(int j) {
        return getStrVal(sheet, j, "G");
    }

    @Override
    public BigDecimal getTaraKont(int j) {
        return getNumVal(sheet, j, "I", 2);
    }

    @Override
    public BigDecimal getPodSilaKont(int j) {
        return getNumVal(sheet, j, "J");
    }

    @Override
    public BigDecimal getBruttoKont(int j) {
        return getNumVal(sheet, j, "K", 3);
    }

    @Override
    public String getPlombZnak(int j) {
        return getStrVal(sheet, j, "H");
    }
}
