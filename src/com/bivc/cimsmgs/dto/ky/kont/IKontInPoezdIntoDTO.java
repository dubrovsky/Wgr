package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.dto.ky.PoezdBaseDTO;
import com.bivc.cimsmgs.dto.ky.VagonBaseDTO;

/**
 * Created by dubrovsky on 25.01.2015.
 */
public interface IKontInPoezdIntoDTO extends IKontBaseIntoDTO {
    VagonBaseDTO getVagonInto();

    void setVagonInto(VagonBaseDTO vagonInto);

    PoezdBaseDTO getPoezdInto();

    void setPoezdInto(PoezdBaseDTO poezdInto);
}
