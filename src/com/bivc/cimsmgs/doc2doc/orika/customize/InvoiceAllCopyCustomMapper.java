package com.bivc.cimsmgs.doc2doc.orika.customize;

import com.bivc.cimsmgs.db.CimSmgsInvoice;
import com.bivc.cimsmgs.db.CimSmgsInvoiceGruz;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;

import java.util.TreeMap;

/**
 * Created by p.dzeviarylin on 14.12.2014 16:02.
 */
public class InvoiceAllCopyCustomMapper extends CustomMapper<CimSmgsInvoice, CimSmgsInvoice> {
    @Override
    public void mapAtoB(CimSmgsInvoice invoiceSource, CimSmgsInvoice invoiceDestination, MappingContext context) {
        invoiceDestination.setInvoiceGruzs(new TreeMap<Long, CimSmgsInvoiceGruz>(invoiceDestination.getInvoiceGruzs()));
    }
}
