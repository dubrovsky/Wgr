package com.bivc.cimsmgs.doc2doc.orika.customize.epd;

import com.bivc.cimsmgs.db.CimSmgsCarList;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;

/**
 * Created by peter on 10.10.2014.
 */
public class Epd2CarListCustomMapper extends CustomMapper<CimSmgsCarList, CimSmgsCarList> {

    @Override
      public void mapAtoB(CimSmgsCarList epd, CimSmgsCarList destination, MappingContext context) {
        if (epd.hasKont()) {
            mapperFacade.map(epd.findOrCreateKont(), destination.findOrCreateKont());
        }
    }

}
