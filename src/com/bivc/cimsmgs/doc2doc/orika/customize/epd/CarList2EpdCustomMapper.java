package com.bivc.cimsmgs.doc2doc.orika.customize.epd;

import com.bivc.cimsmgs.db.CimSmgsCarList;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;

/**
 * Created by peter on 29.09.2014.
 */
public class CarList2EpdCustomMapper extends CustomMapper<CimSmgsCarList, CimSmgsCarList> {
    @Override
    public void mapAtoB(CimSmgsCarList source, CimSmgsCarList epd, MappingContext context) {
        if (source.hasKont()) {
            mapperFacade.map(source.findOrCreateKont(), epd.findOrCreateKont());
        }
    }

   /* @Override
    public void mapBtoA(CimSmgsCarList epd, CimSmgsCarList destination, MappingContext context) {
        if (epd.hasKont()) {
            mapperFacade.map(epd.findOrCreateKont(), destination.findOrCreateKont());
        }
    }*/


}
