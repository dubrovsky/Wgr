package com.bivc.cimsmgs.doc2doc.orika;

import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.db.ky.Vagon;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import org.springframework.stereotype.Component;

/**
 * @author p.dzeviarylin
 */
@Component("copyPoezdOrikaMapper")
public class CopyPoezdMapper extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory factory) {

        factory.classMap(Vagon.class, Vagon.class)
                .field("nvag", "nvag")
                .field("koleya", "koleya")
                .field("line", "line")
                .field("podSila", "podSila")
                .field("kolOs", "kolOs")
                .field("masTar", "masTar")
                .field("sobstv", "sobstv")
                .register();

        factory.classMap(Poezd.class, Poezd.class)
                .field("route", "route")
                .field("nppr", "nppr")
                .field("npprm", "npprm")
                .field("ksto_f", "kstn")
                .field("nsto_f", "nstn")
                .field("admon_f", "admnn")
                .field("kstn", "ksto_f")
                .field("nstn", "nsto_f")
                .field("admnn", "admon_f")
                .field("gruzotpr", "gruzotpr")
                .field("koleya", "koleya")
                .register();

        factory.classMap(Route.class, Route.class)
                .field("hid", "hid")
                .register();
    }
}
