package com.bivc.cimsmgs.exchange.xls2kypoezd;

import java.math.BigDecimal;

public interface Reader {

    int start();

    boolean skip(int j);

    String getNvag(int j);

    String getNkon(int j);

    String getSobstvVag(int j);

    BigDecimal getTaraVag(int j);

    BigDecimal getPodSilaVag(int j);

    Integer getKolOs(int j);

    String getNotp(int j);

    String getTypeKont(int j);

    String getVidKont(int j);

    BigDecimal getTaraKont(int j);

    BigDecimal getPodSilaKont(int j);

    BigDecimal getBruttoKont(int j);

    BigDecimal getBruttoAllKont(int j, BigDecimal tara, BigDecimal mbrt);

    String getPrimKont(int j);

    String getPlombZnak(int j);

    String getKgvn(int j);

    String getNzgr(int j);

    void endRow();
}
