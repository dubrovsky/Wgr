package com.bivc.cimsmgs.exchange.xls2kypoezd;

import org.apache.poi.ss.usermodel.Sheet;

import java.math.BigDecimal;

import static com.bivc.cimsmgs.exchange.Utils.*;
import static org.apache.commons.lang3.StringUtils.isBlank;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

public class AgrostopReader extends AbstractReader {

    private static final String MARKER1 = "numer pociągu";
    private static final String MARKER2 = "Data nadania";

    private String nvag;
    private String sobstvVag;
    private BigDecimal taraVag;
    private BigDecimal podSilaVag;
    private Integer kolOs;
    private String oldNvag;
    private String oldSobstvVag;
    private BigDecimal oldTaraVag;
    private BigDecimal oldPodSilaVag;
    private Integer oldKolOs;

    public AgrostopReader(Sheet sheet) {
        super(sheet);
    }

    public static boolean isCompat(Sheet sheet) {
        return getStrVal(sheet, 3, "B").contains(MARKER1) && getStrVal(sheet, 4, "B").contains(MARKER2);
    }

    @Override
    public int start() {
        return 7;
    }

    @Override
    public boolean skip(int j) {
        String nkon = getNkon(j);
        String nvag = normNvagNkonStr(getStrVal(sheet, j, "B"));
        return !PRINNKON_P.matcher(nkon).matches() && !NVAG_P.matcher(nvag).matches();
    }

    @Override
    public String getNvag(int j) {
        nvag = normNvagNkonStr(getStrVal(sheet, j, "B"));
        return isBlank(nvag) ? oldNvag : nvag;
    }

    @Override
    public String getNkon(int j) {
        return normNvagNkonStr(getStrVal(sheet, j, "G"));
    }

    @Override
    public String getSobstvVag(int j) {
        return isBlank(nvag) ? oldSobstvVag : (sobstvVag = getStrVal(sheet, j, "C"));
    }

    @Override
    public BigDecimal getTaraVag(int j) {
        return isBlank(nvag) ? oldTaraVag : (taraVag = getDecimalVal(j, "D"));
    }

    @Override
    public BigDecimal getPodSilaVag(int j) {
        return isBlank(nvag) ? oldPodSilaVag : (podSilaVag = getNumVal(sheet, j, "E", 2));
    }

    @Override
    public Integer getKolOs(int j) {
        return isBlank(nvag) ? oldKolOs : (kolOs = getIntVal(j, "F"));
    }

    @Override
    public String getNotp(int j) {
        return getStrVal(sheet, j, "N");
    }

    @Override
    public String getTypeKont(int j) {
        return getStrVal(sheet, j, "I");
    }

    @Override
    public String getVidKont(int j) {
        return getStrVal(sheet, j, "H");
    }

    @Override
    public BigDecimal getTaraKont(int j) {
        return getNumVal(sheet, j, "L", 2);
    }

    @Override
    public BigDecimal getPodSilaKont(int j) {
        return getDecimalVal(j, "J");
    }

    @Override
    public BigDecimal getBruttoKont(int j) {
        return getNumVal(sheet, j, "K", 3);
    }

    @Override
    public String getPlombZnak(int j) {
        return getStrVal(sheet, j, "Q");
    }

    @Override
    public String getPrimKont(int j) {
        return getStrVal(sheet, j, "R");
    }

    @Override
    public String getKgvn(int j) {
        return getStrVal(sheet, j, "O");
    }

    @Override
    public String getNzgr(int j) {
        return getStrVal(sheet, j, "P");
    }

    @Override
    public void endRow() {
        if (isNotBlank(nvag)) {
            oldNvag = nvag;
            oldSobstvVag = sobstvVag;
            oldTaraVag = taraVag;
            oldPodSilaVag = podSilaVag;
            oldKolOs = kolOs;
        }
    }

    private BigDecimal getDecimalVal(int j, String col) {
        BigDecimal val = getNumVal(sheet, j, col, 3);
        if (val != null) {
            val = val.multiply(THOUSAND);
        }
        return val;
    }

}
