package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

/**
 * @author p.dzeviarylin
 */
public class KontInAvtoOutDTO extends KontBaseOutDTO implements IKontInAvtoOutDTO {
    private AvtoBaseDTO avtoOut;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toStringExclude(this, "avtoOut");
    }


    @Override
    public AvtoBaseDTO getAvtoOut() {
        return avtoOut;
    }

    @Override
    public void setAvtoOut(AvtoBaseDTO avtoOut) {
        this.avtoOut = avtoOut;
    }
}
