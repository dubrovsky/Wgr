package com.bivc.cimsmgs.doc2doc.orika.config.ky;

import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.AvtoFiles;
import com.bivc.cimsmgs.db.ky.AvtoZayav;
import com.bivc.cimsmgs.db.nsi.Client;
import com.bivc.cimsmgs.dto.PackDocDTO;
import com.bivc.cimsmgs.dto.RouteDTO;
import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import com.bivc.cimsmgs.dto.ky.AvtoDTO;
import com.bivc.cimsmgs.dto.ky2.AvtoFilesViewDTO;
import com.bivc.cimsmgs.dto.ky2.AvtoZayavBaseDTO;
import com.bivc.cimsmgs.dto.ky2.ClientDTO;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;

/**
 * Created by peter on 19.08.2014.
 */
public class KyAvtoConfig extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapRoute(mapperFactory);
        mapPackDoc(mapperFactory);
        mapAvto(mapperFactory);
        mapBaseAvto(mapperFactory);
        mapBaseAvtoZayav(mapperFactory);
        mapClient(mapperFactory);
        mapFile(mapperFactory);
    }

    private void mapRoute(MapperFactory mapperFactory) {
        mapperFactory.classMap(Route.class, RouteDTO.class)
                .field("hid", "hid")
                .register();
    }

    private void mapPackDoc(MapperFactory mapperFactory) {
        mapperFactory.classMap(PackDoc.class, PackDocDTO.class)
                .field("hid", "hid")
                .register();
    }

    private void mapClient(MapperFactory mapperFactory) {
        mapperFactory.classMap(Client.class, ClientDTO.class)
                .fieldAToB("hid", "hid")
                .fieldAToB("sname", "sname")
                .register();
    }

    private void mapBaseAvto(MapperFactory mapperFactory) {
        mapperFactory.classMap(Avto.class, AvtoBaseDTO.class)
                .fieldAToB("konts", "konts")
                .fieldAToB("messCount", "messCount")
//                .fieldAToB("avtoFiles", "avtoFiles")
                .byDefault()
                .register();

    }
    private void mapBaseAvtoZayav(MapperFactory mapperFactory) {
        mapperFactory.classMap(AvtoZayav.class, AvtoZayavBaseDTO.class)
                .fieldAToB("konts", "konts")
                .byDefault()
                .register();

    }

    private void mapAvto(MapperFactory mapperFactory) {
        mapperFactory.classMap(Avto.class, AvtoDTO.class)
//                .fieldAToB("owner", "owner")
                .byDefault()
                .register();

    }

    private void mapFile(MapperFactory mapperFactory) {
        mapperFactory.classMap(AvtoFiles.class, AvtoFilesViewDTO.class)
                .byDefault()
                .register();

    }
}
