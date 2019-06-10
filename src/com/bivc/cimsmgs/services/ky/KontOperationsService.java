package com.bivc.cimsmgs.services.ky;

import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.dto.ky.kont.KontOperationsDTO;
import org.springframework.stereotype.Service;

/**
 * @author p.dzeviarylin
 */

@Service
public class KontOperationsService implements IKontOperationsService {

    @Override
    public Kont bindKont(Kont kont, KontStatus status) {

        return bindKont(kont, status, null);
    }

    @Override
    public Kont bindKont(Kont kont, KontStatus status, KontStatus prevStatus) {

        kont.setStatus(status);
        kont.setPrevStatus(prevStatus);

        return kont;
    }

    @Override
    public Kont bindKontToYard(Kont kont, Yard yard, YardSector sector) {
        return bindKontToYard(kont, yard, sector, null, null);
    }

    @Override
    public Kont bindKontToYard(Kont kont, Yard yard, YardSector sector, KontStatus prevStatus, KontOperationsDTO kontDTO) {
        yard.setKont(kont);
        yard.setEmpty(false);

        kont.setYard(yard);
        kont.setKy_x(yard.getX());
        kont.setKy_y(yard.getY());
        kont.setKy_z(yard.getZ());
        kont.setKy_sector(sector.getName());
        if(kontDTO != null){
            kont.setDyard(kontDTO.getDyard());
        }
        bind(kont, KontStatus.YARD, prevStatus);

        return kont;
    }

    @Override
    public Kont unbindKontFromYard(Kont kont, Yard yard, KontStatusHistory status) {
        kont.setKy_sector(null);
        kont.setKy_x(null);
        kont.setKy_y(null);
        kont.setKy_z(null);
        kont.setDyard(null);

        makeYardPalceEmpty(kont, yard);
        bind(kont, status.getStatus(), null);

        return kont;
    }

    @Override
    public Kont makeYardPalceEmpty(Kont kont, Yard yard) {
        kont.setYard(null);

        yard.setKont(null);
        yard.setEmpty(true);

        return kont;
    }

    @Override
    public Kont bindKontToPoezdOut(Kont kont, Poezd poezd, Vagon vagon, KontOperationsDTO kontDTO) {

        kont.setVagonOut(vagon);
        kont.setPoezdOut(poezd);
        kont.setDotp(kontDTO.getDotp());
        vagon.getKontsOut().add(kont);
        poezd.getKontsOut().add(kont);

        bind(kont, KontStatus.POEZD_OUT, kont.getStatus());

        return kont;
    }

    @Override
     public Kont unbindKontFromPoezdOut(Kont kont, KontStatusHistory status, KontStatus prevStatus) {
        kont.setVagonOut(null);
        kont.setPoezdOut(null);
        kont.setDotp(null);

        if(status != null) {
            unbind(kont, status, prevStatus);
        }

        return kont;
    }

    @Override
    public Kont unbindKontFromPoezdOut(Kont kont) {
        return unbindKontFromPoezdOut(kont, null, null);
    }

    @Override
    public Kont bindKontToAvtoOut(Kont kont, Avto avto, KontOperationsDTO kontDTO) {
        kont.setAvtoOut(avto);
        avto.getKontsOut().add(kont);
        kont.setDotp(kontDTO.getDotp());

        bind(kont, KontStatus.AVTO_OUT, kont.getStatus());

        return kont;
    }

    @Override
    public Kont unbindKontFromAvtoOut(Kont kont, KontStatusHistory status, KontStatus prevStatus) {
        kont.setAvtoOut(null);
        kont.setDotp(null);
        if(status != null) {
            unbind(kont, status, prevStatus);
        }

        return kont;
    }

    @Override
    public Kont unbindKontFromAvtoOut(Kont kont) {
        return unbindKontFromAvtoOut(kont, null, null);
    }

    private void bind(Kont kont, KontStatus status, KontStatus prevStatus) {
        bindKont(kont, status, prevStatus);
    }

    private void unbind(Kont kont, KontStatusHistory status, KontStatus prevStatus) {
//        bindKont(kont, KontStatus.CANCEL);
        if(status.getStatus() == KontStatus.YARD && status.getYard().isEmpty() ){
            bindKontToYard(kont, status.getYard(), status.getYard().getSector(), prevStatus, null);
        } else {
            bindKont(kont, status.getStatus(), prevStatus);
        }
    }
}
