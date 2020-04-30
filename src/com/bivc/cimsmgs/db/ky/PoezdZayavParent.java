package com.bivc.cimsmgs.db.ky;

import com.bivc.cimsmgs.db.nsi.Client;

import java.util.Set;
import java.util.TreeMap;

import static org.apache.commons.lang3.StringUtils.isNotBlank;

public interface PoezdZayavParent {
    Client getClient();

    String getGruzotpr();

    Set<Vagon> getVagons();

    @SuppressWarnings("UnusedReturnValue")
    Vagon addVagon(Vagon vagon);

    default TreeMap<String, Kont> getAllKont() {
        TreeMap<String, Kont> res = new TreeMap<>();
        for (Vagon vag : getVagons()) {
            for (Kont kont : vag.getKonts()) {
                String nkon = kont.getNkon();
                if (isNotBlank(nkon))
                res.put(nkon, kont);
            }
        }
        return res;
    }
}
