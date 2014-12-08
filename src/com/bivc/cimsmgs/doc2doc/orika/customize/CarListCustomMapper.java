package com.bivc.cimsmgs.doc2doc.orika.customize;

import com.bivc.cimsmgs.db.CimSmgsCarList;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;

/**
 * Created by peter on 07.04.2014.
 */
public class CarListCustomMapper extends CustomMapper<CimSmgsCarList, CimSmgsCarList> {
    @Override
    public void mapAtoB(CimSmgsCarList source, CimSmgsCarList destination, MappingContext context) {
        destination.setSort((byte)0);
    }
}
