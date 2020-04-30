package com.bivc.cimsmgs.exchange.xls2kypoezd;

import org.apache.poi.ss.usermodel.Sheet;

import java.math.BigDecimal;
import java.util.regex.Pattern;

import static com.bivc.cimsmgs.exchange.Utils.getNumVal;

public abstract class AbstractReader implements Reader {

    protected static final BigDecimal THOUSAND = new BigDecimal(1000);
    protected static final Pattern NVAG_P = Pattern.compile("^[0-9]{8,12}$");
    public static final Pattern PRINNKON_P = Pattern.compile("^[a-zA-Z]{4}[0-9]{7,9}$");

    protected Sheet sheet;

    public AbstractReader(Sheet sheet) {
        this.sheet = sheet;
    }

    @Override
    public String getSobstvVag(int j) {
        return null;
    }

    @Override
    public BigDecimal getTaraVag(int j) {
        return null;
    }

    @Override
    public BigDecimal getPodSilaVag(int j) {
        return null;
    }

    @Override
    public Integer getKolOs(int j) {
        return null;
    }

    @Override
    public String getNotp(int j) {
        return null;
    }

    @Override
    public String getTypeKont(int j) {
        return null;
    }

    @Override
    public String getVidKont(int j) {
        return null;
    }

    @Override
    public BigDecimal getPodSilaKont(int j) {
        return null;
    }

    @Override
    public BigDecimal getTaraKont(int j) {
        return null;
    }

    @Override
    public BigDecimal getBruttoAllKont(int j, BigDecimal tara, BigDecimal mbrt) {
        return (tara != null && mbrt != null) ? tara.add(mbrt) : null;
    }

    @Override
    public BigDecimal getBruttoKont(int j) {
        return null;
    }

    @Override
    public String getPlombZnak(int j) {
        return null;
    }

    @Override
    public String getPrimKont(int j) {
        return null;
    }

    @Override
    public String getKgvn(int j) {
        return null;
    }

    @Override
    public String getNzgr(int j) {
        return null;
    }

    @Override
    public void endRow() {
    }

    protected Integer getIntVal(int j, String col) {
        Integer res = null;
        BigDecimal val = getNumVal(sheet, j, col);
        if (val != null) {
            res = val.intValue();
        }
        return res;
    }

}
