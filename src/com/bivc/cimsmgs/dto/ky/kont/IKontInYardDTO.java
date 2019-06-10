package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.dto.ky.YardBaseDTO;

import java.util.Date;

/**
 * @author p.dzeviarylin
 */
public interface IKontInYardDTO extends IKontBaseDTO{
    Date getDyardDate();

    void setDyardDate(Date dyardDate);

    Date getDyardTime();

    void setDyardTime(Date dyardTime);

    Date getDyard();

    void setDyard(Date dyard);

    YardBaseDTO getYard();

    void setYard(YardBaseDTO yard);
}
