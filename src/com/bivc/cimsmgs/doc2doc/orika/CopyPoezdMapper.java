package com.bivc.cimsmgs.doc2doc.orika;

import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.db.nsi.Client;
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
                .field("client", "client")
                .register();

        factory.classMap(Vagon.class, Vagon.class)
                .field("nvag", "nvag")
                .field("koleya", "koleya")
                .field("line", "line")
                .field("podSila", "podSila")
                .field("kolOs", "kolOs")
                .field("masTar", "masTar")
                .field("sobstv", "sobstv")
                .field("sort", "sort")
                .field("otpravka", "otpravka")
                .register();

        factory.classMap(Poezd.class, Poezd.class)
                .field("route", "route")
                .field("client", "client")
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

        factory.classMap(Client.class, Client.class)
                .field("hid", "hid")
                .register();

        factory.classMap(PoezdZayav.class, Poezd.class)
                .field("route", "route")
                .field("client", "client")
                .field("nppr", "nppr")
                .field("npprm", "npprm")
                .field("gruzotpr", "gruzotpr")
                .field("direction", "direction")
                .register();
    }
}
