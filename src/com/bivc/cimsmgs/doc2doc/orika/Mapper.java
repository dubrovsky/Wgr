package com.bivc.cimsmgs.doc2doc.orika;

import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.db.nsi.Client;
import com.bivc.cimsmgs.dto.PackDocDTO;
import com.bivc.cimsmgs.dto.RouteDTO;
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
                .fieldAToB("client.hid", "clientHid")
                .fieldAToB("client.sname", "gruzotpr")
                .fieldAToB("route.hid", "routeHid")
                .byDefault()
                .register();

        factory.classMap(PoezdZayav.class, PoezdZayavDTO.class)
                .fieldAToB("vagons", "vagons")
                .fieldAToB("client.hid", "clientHid")
                .fieldAToB("client.sname", "gruzotpr")
                .fieldAToB("route.hid", "routeHid")
                .byDefault()
                .register();

        factory.classMap(PoezdZayav.class, PoezdZayavBaseDTO.class)
                .fieldAToB("client.sname", "gruzotpr")
                .byDefault()
                .register();

        factory.classMap(Avto.class, AvtoDTO.class)
                .fieldAToB("client.hid", "clientHid")
                .fieldAToB("client.sname", "client")
                .fieldAToB("route.hid", "routeHid")
                .byDefault()
                .register();

        factory.classMap(AvtoZayav.class, AvtoZayavDTO.class)
                .fieldAToB("client.hid", "clientHid")
                .fieldAToB("client.sname", "client")
                .byDefault()
                .register();

        factory.classMap(Vagon.class, VagonDTO.class)
                .fieldAToB("konts", "konts")
                .fieldAToB("gruzs", "gruzs")
                .byDefault()
                .register();

        factory.classMap(Kont.class, KontDTO.class)
                .fieldAToB("gruzs", "gruzs")
                .fieldAToB("plombs", "plombs")
                .fieldAToB("client.hid", "clientHid")
                .fieldAToB("client.sname", "gruzotpr")
                .fieldAToB("routeHid", "routeHid")
//                .fieldAToB("vagon.poezd.route.hid", "routeHid")
                .byDefault()
                .register();

        factory.classMap(Kont.class, KontBindViewDTO.class)
                .fieldAToB("client.sname", "gruzotpr")
                .byDefault()
                .register();

        factory.classMap(Gruz.class, GruzDTO.class)
                .fieldAToB("client.hid", "clientHid")
                .fieldAToB("client.sname", "gruzotpr")
                .fieldAToB("routeHid", "routeHid")
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

        factory.classMap(Yard.class, YardDTO.class)
                .fieldAToB("sector", "sector")
                .fieldAToB("konts", "konts")
                .fieldAToB("messCount", "messCount")
                .byDefault()
                .register();

        factory.classMap(Gruz.class, GruzBindDTO.class)
                .byDefault()
                .register();

        factory.classMap(Yard.class, YardBindDTO.class)
                .fieldAToB("konts", "konts")
                .byDefault()
                .register();

        factory.classMap(YardSector.class, YardSectorDTO.class)
                .fieldAToB("yardSectorGroups", "yardSectorGroups")
                .fieldAToB("route.hid", "routeHid")
                .byDefault()
                .register();

        factory.classMap(Route.class, RouteDTO.class)
                .field("hid", "hid")
                .register();

        factory.classMap(PackDoc.class, PackDocDTO.class)
                .field("hid", "hid")
                .register();

        factory.classMap(Client.class, ClientDTO.class)
                .field("hid", "hid")
                .field("sname", "sname")
                .register();
        factory.classMap(KontGruzHistory.class, KontGruzHistoryFilterDTO.class)
                .fieldAToB("poezd.hid", "poezdHid")
                .fieldAToB("avto.hid", "avtoHid")
                .fieldAToB("poezd.npprm", "npprm")
                .fieldAToB("kont.hid", "kontHid")
                .byDefault()
                .register();
    }
}
