package com.bivc.cimsmgs.doc2doc.orika.config.ky;

import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.db.ky.Vagon;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;

/**
 * @author p.dzeviarylin
 */
public class KyPoezdCopyConfig extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapRoute(mapperFactory);
        mapPoezd(mapperFactory);
        mapVagon(mapperFactory);
    }

    private void mapVagon(MapperFactory mapperFactory) {
        mapperFactory
                .classMap(Vagon.class, Vagon.class)
                .field("nvag", "nvag")
                .field("koleya", "koleya")
                .field("kpv", "kpv")
                .field("kolOs", "kolOs")
                .field("masTar", "masTar")
                .field("sobstv", "sobstv")
                .field("bortDate", "bortDate")
                .field("prim", "prim")
                .field("probeg", "probeg")
                .field("podSila", "podSila")
                .field("plan_rem", "plan_rem")
                .field("reviz", "reviz")
                .field("type_no", "type_no")
                .field("dlina", "dlina")
                .field("model", "model")
                .field("line", "line")
                .field("foot", "foot")
                .field("poruz", "poruz")
                .field("defective", "defective")
                .field("owner", "owner")
                .register();
    }

    private void mapPoezd(MapperFactory mapperFactory) {
        mapperFactory
                .classMap(Poezd.class, Poezd.class)
                .field("route", "route")
//                .field("nppr", "nppr")
                .field("koleya", "koleya")
//                .field("npprm", "npprm")
//                .field("punkt_otpr", "punkt_otpr")
//                .field("punkt_nazn", "punkt_nazn")
//                .field("gruzotpr", "gruzotpr")
                .register();
                /*.exclude("hid")
                .exclude("dattr")
                .exclude("un")
                .exclude("altered")
                .exclude("kontsOut")
                .exclude("kontsInto")
                .exclude("vagons")
                .exclude("direction")
                .byDefault()
                .register();*/
    }

    private void mapRoute(MapperFactory mapperFactory) {
        mapperFactory.classMap(Route.class, Route.class)
                .field("hid", "hid")
                .register();
    }
}
