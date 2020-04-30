package com.bivc.cimsmgs.doc2doc.orika;

import com.bivc.cimsmgs.db.ky.*;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import org.springframework.stereotype.Component;

/**
 * @author p.dzeviarylin
 */
@Component("copyKontOrikaMapper")
public class CopyKontMapper extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory factory) {

        factory.classMap(Plomb.class, Plomb.class)
                .field("kpl", "kpl")
                .field("znak", "znak")
                .field("station", "station")
                .field("sort", "sort")
                .register();

        factory.classMap(Gruz.class, Gruz.class)
                .field("upak", "upak")
                .field("kgvn", "kgvn")
                .field("nzgr", "nzgr")
                .field("places", "places")
                .field("sort", "sort")
                .field("massa", "massa")
                .register();

        factory.classMap(Kont.class, Kont.class)
                .field("massa_tar", "massa_tar")
                .field("massa_brutto", "massa_brutto")
                .field("massa_brutto_all", "massa_brutto_all")
                .field("pod_sila", "pod_sila")
                .field("type", "type")
                .field("vid", "vid")
                .field("prizn_sob", "prizn_sob")
                .field("naim_sob", "naim_sob")
                .field("gruzotpr", "gruzotpr")
                .field("teh_obsl", "teh_obsl")
                .field("nkon", "nkon")
                .field("notp", "notp")
                .field("dprb", "dprb")
                .field("poruz", "poruz")
                .field("sort", "sort")
                .field("zayav_in", "zayav_in")
                .field("zayav_out", "zayav_out")
                .field("isZayav", "isZayav")
                .register();
    }
}
