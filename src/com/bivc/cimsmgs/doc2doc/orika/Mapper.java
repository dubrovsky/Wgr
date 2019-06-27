package com.bivc.cimsmgs.doc2doc.orika;

import com.bivc.cimsmgs.db.ky.Gruz;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.db.ky.Vagon;
import com.bivc.cimsmgs.dto.ky2.*;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import org.springframework.stereotype.Component;

/**
 * @author p.dzeviarylin
 */
@Component("orikaMapper")
public class Mapper extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory factory) {
        factory.classMap(Poezd.class, PoezdDTO.class)
                .fieldAToB("vagons", "vagons")
                .byDefault()
                .register();

        factory.classMap(Vagon.class, VagonDTO.class)
                .fieldAToB("konts", "konts")
                .fieldAToB("gruzs", "gruzs")
                .byDefault()
                .register();

        factory.classMap(Kont.class, KontDTO.class)
                .fieldAToB("gruzs", "gruzs")
                .byDefault()
                .register();

        factory.classMap(Gruz.class, GruzDTO.class)
                .byDefault()
                .register();

        factory.classMap(Poezd.class, PoezdBindDTO.class)
                .fieldAToB("vagons", "vagons")
                .byDefault()
                .register();

        factory.classMap(Vagon.class, VagonBindDTO.class)
                .fieldAToB("konts", "konts")
                .fieldAToB("gruzs", "gruzs")
                .byDefault()
                .register();

        factory.classMap(Kont.class, KontBindDTO.class)
                .fieldAToB("gruzs", "gruzs")
                .byDefault()
                .register();

        factory.classMap(Gruz.class, GruzBindDTO.class)
                .byDefault()
                .register();
    }
}
