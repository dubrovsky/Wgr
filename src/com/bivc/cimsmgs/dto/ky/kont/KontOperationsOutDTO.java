package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.db.ky.KontStatus;
import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import com.bivc.cimsmgs.dto.ky.PoezdBaseDTO;
import com.bivc.cimsmgs.dto.ky.VagonBaseDTO;

/**
 * @author p.dzeviarylin
 */
public class KontOperationsOutDTO extends KontOperationsDTO {

    @Override
    public AvtoBaseDTO getAvtoInto() {
        return getPrevStatus() == KontStatus.AVTO_INTO ? super.getAvtoInto() : null;
    }

    @Override
    public VagonBaseDTO getVagonInto() {
        return getPrevStatus() == KontStatus.POEZD_INTO ? super.getVagonInto() : null;
    }

    @Override
    public PoezdBaseDTO getPoezdInto() {
        return getPrevStatus() == KontStatus.POEZD_INTO ? super.getPoezdInto() : null;
    }

    @Override
    public Long getKy_x() {
        return getPrevStatus() == KontStatus.YARD ? super.getKy_x() : null;
    }

    @Override
    public Long getKy_y() {
        return getPrevStatus() == KontStatus.YARD ? super.getKy_y() : null;
    }

    @Override
    public Long getKy_z() {
        return getPrevStatus() == KontStatus.YARD ? super.getKy_z() : null;
    }

    @Override
    public String getKy_sector() {
        return getPrevStatus() == KontStatus.YARD ? super.getKy_sector() : null;
    }
}
