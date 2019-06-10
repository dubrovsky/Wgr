package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.dto.ky.kont.KontIntoDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * Created by peter on 27.08.2014.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class YardDTO extends YardBaseDTO {

    private KontIntoDTO kont;

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    public KontIntoDTO getKont() {
        return kont;
    }

    public void setKont(KontIntoDTO kont) {
        this.kont = kont;
    }
}
