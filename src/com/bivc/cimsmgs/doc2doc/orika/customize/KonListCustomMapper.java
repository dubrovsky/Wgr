package com.bivc.cimsmgs.doc2doc.orika.customize;

import com.bivc.cimsmgs.db.CimSmgsKonList;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;

/**
 * Created by peter on 07.04.2014.
 */
public class KonListCustomMapper extends CustomMapper<CimSmgsKonList, CimSmgsKonList> {
    @Override
    public void mapAtoB(CimSmgsKonList source, CimSmgsKonList destination, MappingContext context) {
        destination.setSort((byte)0);
    }
}
