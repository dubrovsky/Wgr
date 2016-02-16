package com.bivc.cimsmgs.doc2doc.orika;

import com.bivc.cimsmgs.db.CimSmgsInvoice;
import com.bivc.cimsmgs.db.CimSmgsInvoiceGruz;
import ma.glasnost.orika.Mapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import ma.glasnost.orika.impl.DefaultMapperFactory;
import ma.glasnost.orika.metadata.ClassMapBuilder;

/**
 * Created by p.dzeviarylin on 14.12.2014 16:05.
 */
public class InvoiceConfigMapper extends ConfigurableMapper {
    private Mapper<CimSmgsInvoice, CimSmgsInvoice> invoiceMapper;
    private Mapper<CimSmgsInvoiceGruz, CimSmgsInvoiceGruz> invoiceGruzMapper;
    private String[] invoiceExcludes;

    public InvoiceConfigMapper() {
        super(false);
    }

    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapInvoiceGruz(mapperFactory);

        mapInvoice(mapperFactory);

    }

    protected void mapInvoiceGruz(MapperFactory mapperFactory) {
        mapperFactory.classMap(CimSmgsInvoiceGruz.class, CimSmgsInvoiceGruz.class)
                .exclude("hid")
                .exclude("invoice")
                .constructorB()
                .byDefault()
                .customize(invoiceGruzMapper)
                .register();
    }

    protected void mapInvoice(MapperFactory mapperFactory) {
        ClassMapBuilder<CimSmgsInvoice, CimSmgsInvoice> classMapBuilder = mapperFactory.classMap(CimSmgsInvoice.class, CimSmgsInvoice.class)
                .exclude("hid")
                .exclude("un")
                .exclude("un_lock")
                .exclude("trans")
                .exclude("dattr")
                .exclude("locked")
                .exclude("route")
                .exclude("packDoc")
                .exclude("altered")
                .exclude("status")
                .exclude("docType1")
                .exclude("statuses")
                .exclude("iftminLogs")
                .exclude("iftminLogsBtlc");

        addExcludes(classMapBuilder, invoiceExcludes);

        classMapBuilder
                .byDefault()
                .constructorB()
                .customize(invoiceMapper)
                .register();


    }

    private void addExcludes(ClassMapBuilder classMapBuilder, String[] excludes) {
        if(excludes != null) {
            for (String exclude : excludes) {
                classMapBuilder.exclude(exclude);
            }
        }
    }

    public void setInvoiceMapper(Mapper<CimSmgsInvoice, CimSmgsInvoice> invoiceMapper) {
        this.invoiceMapper = invoiceMapper;
    }

    public void setInvoiceGruzMapper(Mapper<CimSmgsInvoiceGruz, CimSmgsInvoiceGruz> invoiceGruzMapper) {
        this.invoiceGruzMapper = invoiceGruzMapper;
    }

    public void setInvoiceExcludes(String[] invoiceExcludes) {
        this.invoiceExcludes = invoiceExcludes;
    }
}
