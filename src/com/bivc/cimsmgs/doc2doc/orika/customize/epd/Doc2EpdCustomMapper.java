package com.bivc.cimsmgs.doc2doc.orika.customize.epd;

import com.bivc.cimsmgs.db.CimSmgs;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;

/**
 * Created by peter on 29.09.2014.
 */
public class Doc2EpdCustomMapper extends CustomMapper<CimSmgs, CimSmgs> {

    @Override
    public void mapAtoB(CimSmgs source, CimSmgs epd, MappingContext context) {
        if (epd.getHid() == null) {
            addEpd(source, epd);
        }

        if (source.hasVag()) {
            mapperFacade.map(source.findOrCreateVag(), epd.findOrCreateVag());
        }
    }

    private void addEpd(CimSmgs source, CimSmgs destination) {
        destination.setType(CimSmgs.EPD_DOC_TYPE);
        destination.setDocType1(CimSmgs.EPD_DOC_TYPE_HID);
        if(!destination.hasRoute() && source.hasRoute()) {
            destination.setRoute(source.getRoute());
        }
        if(!destination.hasPackDoc() && source.hasPackDoc()) {
            destination.setPackDoc(source.getPackDoc());
        }

    }

    /*@Override
    public void mapBtoA(CimSmgs epd, CimSmgs destination, MappingContext context) {
        if(epd.hasVag()){
            mapperFacade.map(epd.findOrCreateVag(), destination.findOrCreateVag());
        }
    }*/

}
