package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.db.ky.KontStatus;
import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import com.bivc.cimsmgs.dto.ky.PoezdBaseDTO;
import com.bivc.cimsmgs.dto.ky.VagonBaseDTO;

/**
 * @author p.dzeviarylin
 */
public class KontOperationsIntoDTO extends KontOperationsDTO {

    @Override
    public AvtoBaseDTO getAvtoOut() {
        return getStatus() == KontStatus.AVTO_OUT ? super.getAvtoOut() : null;
    }

    @Override
    public VagonBaseDTO getVagonOut() {
        return getStatus() == KontStatus.POEZD_OUT ? super.getVagonOut() : null;
    }

    @Override
    public PoezdBaseDTO getPoezdOut() {
        return getStatus() == KontStatus.POEZD_OUT ? super.getPoezdOut() : null;
    }

    @Override
    public Long getKy_x() {
        return getStatus() == KontStatus.YARD ? super.getKy_x() : null;
    }

    @Override
    public Long getKy_y() {
        return getStatus() == KontStatus.YARD ? super.getKy_y() : null;
    }

    @Override
    public Long getKy_z() {
        return getStatus() == KontStatus.YARD ? super.getKy_z() : null;
    }

    @Override
    public String getKy_sector() {
        return getStatus() == KontStatus.YARD ? super.getKy_sector() : null;
    }
}
