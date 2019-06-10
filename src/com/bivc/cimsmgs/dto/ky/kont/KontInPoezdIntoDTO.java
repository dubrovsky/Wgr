package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.dto.ky.PoezdBaseDTO;
import com.bivc.cimsmgs.dto.ky.VagonBaseDTO;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

/**
 * Created by peter on 21.08.2014.
 */
public class KontInPoezdIntoDTO extends KontBaseIntoDTO implements IKontInPoezdIntoDTO {
    private VagonBaseDTO vagonInto;
    private PoezdBaseDTO poezdInto;

    @Override
    public VagonBaseDTO getVagonInto() {
        return vagonInto;
    }

    @Override
    public void setVagonInto(VagonBaseDTO vagonInto) {
        this.vagonInto = vagonInto;
    }

    @Override
    public PoezdBaseDTO getPoezdInto() {
        return poezdInto;
    }

    @Override
    public void setPoezdInto(PoezdBaseDTO poezdInto) {
        this.poezdInto = poezdInto;
    }

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toStringExclude(this, "vagonInto", "poezdInto"/*, "status", "yard"*/);
    }
}
