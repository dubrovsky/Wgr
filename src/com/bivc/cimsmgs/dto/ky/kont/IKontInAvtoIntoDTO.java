package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;

/**
 * Created by dubrovsky on 25.01.2015.
 */
public interface IKontInAvtoIntoDTO extends IKontBaseIntoDTO {
    AvtoBaseDTO getAvtoInto();

    void setAvtoInto(AvtoBaseDTO avtoInto);
}
