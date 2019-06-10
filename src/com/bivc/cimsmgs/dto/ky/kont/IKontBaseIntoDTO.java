package com.bivc.cimsmgs.dto.ky.kont;

import java.util.Date;

/**
 * Created by dubrovsky on 25.01.2015.
 */
public interface IKontBaseIntoDTO extends IKontBaseDTO {
    Date getDprbDate();

    void setDprbDate(Date dprbDate);

    Date getDprbTime();

    void setDprbTime(Date dprbTime);

    Date getDprb();

    void setDprb(Date dprb);
}
