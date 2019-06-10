package com.bivc.cimsmgs.services.ky;

import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.dto.ky.PoezdBaseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;

/**
 * @author p.dzeviarylin
 */

@Service
public class PoezdService implements IPoezdService {
    @Autowired
    private PoezdDAO poezdDAO;

    public enum PoezdPrefix {
        SP,
        SO,
        NP,
        NO
    }

    @Override
    public String produceNppr(PoezdBaseDTO poezd) {
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        Integer npprSuffix;
        switch (poezd.getDirection()){
            case 1:
                if(poezd.getDprb() != null){
                    cal.setTime(poezd.getDprb());
                    year = cal.get(Calendar.YEAR);
                }
                switch (poezd.getKoleya()){
                    case 1:
                        npprSuffix = poezdDAO.findMaxNppr(PoezdPrefix.SP, "dprb", year);
                        return produceNextNppr(npprSuffix, PoezdPrefix.SP.name());
                    case 2:
                        npprSuffix = poezdDAO.findMaxNppr(PoezdPrefix.NP, "dprb", year);
                        return produceNextNppr(npprSuffix, PoezdPrefix.NP.name());
                }
            case 2:
                if(poezd.getDotp() != null){
                    cal.setTime(poezd.getDotp());
                    year = cal.get(Calendar.YEAR);
                }
                switch (poezd.getKoleya()){
                    case 1:
                        npprSuffix = poezdDAO.findMaxNppr(PoezdPrefix.SO, "dotp", year);
                        return produceNextNppr(npprSuffix, PoezdPrefix.SO.name());
                    case 2:
                        npprSuffix = poezdDAO.findMaxNppr(PoezdPrefix.NO, "dotp", year);
                        return produceNextNppr(npprSuffix, PoezdPrefix.NO.name());
                }
            default:
                throw new RuntimeException("Invalid poezr direction");
        }

    }

    private String produceNextNppr(Integer poezdSuffix, String poezdPrefix) {
        if(poezdSuffix == -1){
            return "";
        }
        return poezdPrefix + (poezdSuffix != null ? ++poezdSuffix : 1);
//        return StringUtils.isNotBlank(nppr) ? poezdPrefix + (Long.valueOf(nppr.substring(2)) + 1)  : poezdPrefix + 1;
    }


}
