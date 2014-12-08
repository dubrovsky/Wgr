package com.bivc.cimsmgs.doc2doc.orika.epd;

import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsInvoice;
import ma.glasnost.orika.Filter;
import ma.glasnost.orika.Mapper;
import ma.glasnost.orika.MapperFactory;

/**
 * Created by peter on 03.10.2014.
 */
public class EpdInvoiceAddConfig extends EpdInvoiceAbstractConfig {
    private Filter<Object, Object> destinationNotEmptyFilter;

    public EpdInvoiceAddConfig(
            Mapper<CimSmgsInvoice, CimSmgs> invoiceMapper,
            Filter<Object, Object> destinationNotEmptyFilter) {

        super(invoiceMapper);
        this.destinationNotEmptyFilter = destinationNotEmptyFilter;
        init();
    }

    protected void mapNotEmptyFilter(MapperFactory mapperFactory) {
        mapperFactory.registerFilter(destinationNotEmptyFilter);
    }

    @Override
    protected void configure(MapperFactory mapperFactory) {
        super.configure(mapperFactory);
        mapNotEmptyFilter(mapperFactory);
    }
}
