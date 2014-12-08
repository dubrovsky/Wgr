package com.bivc.cimsmgs.doc2doc.orika.epd;

import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsInvoice;
import com.bivc.cimsmgs.db.CimSmgsKonList;
import ma.glasnost.orika.Mapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import ma.glasnost.orika.metadata.ClassMapBuilder;

/**
 * Created by peter on 03.10.2014.
 */
public class EpdInvoiceAbstractConfig extends ConfigurableMapper {
    private Mapper<CimSmgsInvoice, CimSmgs> invoiceMapper;

    public EpdInvoiceAbstractConfig(Mapper<CimSmgsInvoice, CimSmgs> invoiceMapper) {
        super(false);
        this.invoiceMapper = invoiceMapper;
    }

    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapInvoice(mapperFactory);

        mapKont(mapperFactory);
    }

    private void mapInvoice(MapperFactory mapperFactory) {
        ClassMapBuilder<CimSmgsInvoice, CimSmgs> classMapBuilder =
                mapperFactory.classMap(CimSmgsInvoice.class, CimSmgs.class)
                        .field("notd", "g1r")
                        .field("adres_o", "g19r")
                        .field("npol", "g4r")
                        .field("adres_p", "g49r")
                ;

        classMapBuilder
                .customize(invoiceMapper)
                .register();
    }

    private void mapKont(MapperFactory mapperFactory) {
        ClassMapBuilder<CimSmgsInvoice, CimSmgsKonList> classMapBuilder =
                mapperFactory.classMap(CimSmgsInvoice.class, CimSmgsKonList.class)
                        .field("utiN", "utiN")
                ;

        classMapBuilder
                .register();
    }

}
