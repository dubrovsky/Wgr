package com.bivc.cimsmgs.doc2doc.orika.epd;

import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsInvoice;
import ma.glasnost.orika.Mapper;

/**
 * Created by peter on 01.10.2014.
 */
public class EpdInvoiceUpdateConfig extends EpdInvoiceAbstractConfig {

    public EpdInvoiceUpdateConfig(Mapper<CimSmgsInvoice, CimSmgs> invoiceMapper) {
        super(invoiceMapper);
        init();
    }
}
