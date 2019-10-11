package com.bivc.cimsmgs.doc2doc.orika;

import com.bivc.cimsmgs.db.ky.Gruz;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Plomb;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import org.springframework.stereotype.Component;

/**
 * @author p.dzeviarylin
 */
@Component("copyGruzOrikaMapper")
public class CopyGruzMapper extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory factory) {

        factory.classMap(Gruz.class, Gruz.class)
                .field("upak", "upak")
                .field("kgvn", "kgvn")
                .field("nzgr", "nzgr")
                .field("places", "places")
                .field("sort", "sort")
                .field("massa", "massa")
                .register();
    }
}
