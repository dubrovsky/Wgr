package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.dto.ky.PoezdBaseDTO;
import com.bivc.cimsmgs.dto.ky.VagonBaseDTO;

/**
 * Created by dubrovsky on 25.01.2015.
 */
public interface IKontInPoezdOutDTO extends IKontBaseOutDTO {
    VagonBaseDTO getVagonOut();

    void setVagonOut(VagonBaseDTO vagonOut);

    PoezdBaseDTO getPoezdOut();

    void setPoezdOut(PoezdBaseDTO poezdOut);
}
