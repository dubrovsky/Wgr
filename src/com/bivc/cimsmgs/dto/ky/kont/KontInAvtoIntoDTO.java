package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

/**
 * @author p.dzeviarylin
 */
public class KontInAvtoIntoDTO extends KontBaseIntoDTO implements IKontInAvtoIntoDTO {
    private AvtoBaseDTO avtoInto;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toStringExclude(this, "avtoInto");
    }


    @Override
    public AvtoBaseDTO getAvtoInto() {
        return avtoInto;
    }

    @Override
    public void setAvtoInto(AvtoBaseDTO avtoInto) {
        this.avtoInto = avtoInto;
    }


}