package com.bivc.cimsmgs.doc2doc.orika;

import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.nsi.Client;
import com.bivc.cimsmgs.dto.ky2.ClientDTO;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import org.springframework.stereotype.Component;

/**
 * @author lan
 */
@Component("copyClientOrikaMapper")
public class CopyClientMapper extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory factory) {

        factory.classMap(Client.class, ClientDTO.class)
                .fieldAToB("clientGroups", "clientGroups")
                .byDefault()
                .register();
    }
}
