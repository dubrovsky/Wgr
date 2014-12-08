package com.bivc.cimsmgs.doc2doc.orika.customize.epd;

import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsInvoice;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;

/**
 * Created by peter on 01.10.2014.
 */
public class EpdInvoiceCustomMapper extends CustomMapper<CimSmgsInvoice, CimSmgs> {

    @Override
    public void mapAtoB(CimSmgsInvoice invoice, CimSmgs epd, MappingContext context) {
        if (epd.getHid() == null) {
            addEpd(invoice, epd);
        }

        if (invoice.hasKont()) {
            mapperFacade.map(invoice, epd.findOrCreateKont());
        }
    }

    @Override
    public void mapBtoA(CimSmgs epd, CimSmgsInvoice invoice, MappingContext context) {
        if (epd.hasKont()) {
            mapperFacade.map(epd.findOrCreateKont(), invoice);
        }
    }

    private void addEpd(CimSmgsInvoice invoice, CimSmgs cimsmgs) {
        cimsmgs.setType(CimSmgs.EPD_DOC_TYPE);
        cimsmgs.setDocType1(CimSmgs.EPD_DOC_TYPE_HID);
        if(!cimsmgs.hasRoute() && invoice.hasRoute()) {
            cimsmgs.setRoute(invoice.getRoute());
        }
        if(!cimsmgs.hasPackDoc() && invoice.hasPackDoc()) {
            cimsmgs.setPackDoc(invoice.getPackDoc());
        }

    }

}
