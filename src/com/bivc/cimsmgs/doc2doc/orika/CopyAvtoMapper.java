package com.bivc.cimsmgs.doc2doc.orika;

import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.AvtoZayav;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.db.ky.Vagon;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import org.springframework.stereotype.Component;

/**
 * @author p.dzeviarylin
 */
@Component("copyAvtoOrikaMapper")
public class CopyAvtoMapper extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory factory) {

        factory.classMap(Avto.class, Avto.class)
                .field("route", "route")

                .field("type_avto", "type_avto")
                .field("no_avto", "no_avto")
                .field("no_trail", "no_trail")
                .field("driver_fio", "driver_fio")
                .field("ret_nkon", "ret_nkon")
                .register();

        factory.classMap(Route.class, Route.class)
                .field("hid", "hid")
                .register();

        factory.classMap(AvtoZayav.class, Avto.class)
                .field("route", "route")
                .field("no_avto", "no_avto")
                .field("no_trail", "no_trail")
                .field("driver_fio", "driver_fio")
                .field("direction", "direction")
                .register();

    }
}
