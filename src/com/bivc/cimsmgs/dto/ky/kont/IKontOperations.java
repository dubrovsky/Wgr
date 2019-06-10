package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.db.ky.KontStatus;

import java.util.Date;

/**
 * @author p.dzeviarylin
 */
public interface IKontOperations extends IKontInAvtoIntoDTO, IKontInAvtoOutDTO, IKontInPoezdIntoDTO, IKontInPoezdOutDTO, IKontInYardDTO{

    KontStatus getStatus();

    void setStatus(KontStatus status);

    KontStatus getPrevStatus();

    void setPrevStatus(KontStatus status);

    Long getKy_x();

    void setKy_x(Long ky_x);

    Long getKy_y();

    void setKy_y(Long ky_y);

    Long getKy_z();

    void setKy_z(Long ky_z);

    String getKy_sector();

    void setKy_sector(String ky_sector);

    Date getDatKyInto();

    void setDatKyInto(Date datKyInto);


}
