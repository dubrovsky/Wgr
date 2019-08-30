package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author p.dzeviarylin
 */
public class Ping_A extends CimSmgsSupport_A {

    public String execute() throws Exception {
        setJSONData(
                defaultSerializer
                        .write(
                                new Response<>()
                        )
        );
        return SUCCESS;
    }

    @Autowired
    private Serializer defaultSerializer;
}
