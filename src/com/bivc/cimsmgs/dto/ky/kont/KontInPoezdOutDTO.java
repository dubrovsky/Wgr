package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.dto.ky.PoezdBaseDTO;
import com.bivc.cimsmgs.dto.ky.VagonBaseDTO;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

/**
 * Created by peter on 21.08.2014.
 */
public class KontInPoezdOutDTO extends KontBaseOutDTO implements IKontInPoezdOutDTO {

    private VagonBaseDTO vagonOut;

    private PoezdBaseDTO poezdOut;

    @Override
    public VagonBaseDTO getVagonOut() {
        return vagonOut;
    }

    @Override
    public void setVagonOut(VagonBaseDTO vagonOut) {
        this.vagonOut = vagonOut;
    }

    @Override
    public PoezdBaseDTO getPoezdOut() {
        return poezdOut;
    }

    @Override
    public void setPoezdOut(PoezdBaseDTO poezdOut) {
        this.poezdOut = poezdOut;
    }

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toStringExclude(this, "vagonOut", "poezdOut"/*, "status", "yard"*/);
    }
}
