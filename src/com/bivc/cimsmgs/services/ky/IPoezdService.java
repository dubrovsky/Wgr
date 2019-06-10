package com.bivc.cimsmgs.services.ky;

import com.bivc.cimsmgs.dto.ky.PoezdBaseDTO;

/**
 * @author p.dzeviarylin
 */
public interface IPoezdService {

    String produceNppr(PoezdBaseDTO added);
}
