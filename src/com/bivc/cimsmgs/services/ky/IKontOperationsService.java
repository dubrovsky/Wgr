package com.bivc.cimsmgs.services.ky;

import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.dto.ky.kont.KontOperationsDTO;

/**
 * @author p.dzeviarylin
 */

public interface IKontOperationsService {
    Kont bindKont(Kont kont, KontStatus status, KontStatus prevStatus);

    Kont bindKont(Kont kont, KontStatus status);

//    Kont bindNewKont(Kont kont, KontStatus status);

    Kont bindKontToYard(Kont kont, Yard yard, YardSector sector, KontStatus prevStatus, KontOperationsDTO kontDTO);

    Kont bindKontToYard(Kont kont, Yard yard, YardSector sector);

    Kont unbindKontFromYard(Kont kont, Yard yard, KontStatusHistory status);

    Kont makeYardPalceEmpty(Kont kont, Yard yard);

    Kont bindKontToPoezdOut(Kont kont, Poezd poezd, Vagon vagon, KontOperationsDTO kontDTO);

    Kont unbindKontFromPoezdOut(Kont kont, KontStatusHistory status, KontStatus prevStatus);

    Kont unbindKontFromPoezdOut(Kont kont);

    Kont bindKontToAvtoOut(Kont kont, Avto avto, KontOperationsDTO kontDTO);

    Kont unbindKontFromAvtoOut(Kont kont, KontStatusHistory status, KontStatus prevStatus);

    Kont unbindKontFromAvtoOut(Kont kont);
}
