package com.bivc.cimsmgs.dto.ky.kont;

import java.util.Date;

/**
 * Created by dubrovsky on 25.01.2015.
 */
public interface IKontBaseOutDTO extends IKontBaseDTO {
    Date getDotpDate();

    void setDotpDate(Date dotpDate);

    Date getDotpTime();

    void setDotpTime(Date dotpTime);

    Date getDotp();

    void setDotp(Date dotp);
}
