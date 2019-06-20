package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.PoezdDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author p.dzeviarylin
 */
public class VgCtGr_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(VgCtGr_A.class);

    public String execute() throws Exception {
        if(StringUtils.isEmpty(action)){
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (Action.valueOf(action.toUpperCase())){
                case SAVE:
                    return save();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

    }

    private String save() throws Exception {
        final PoezdDTO dto = defaultDeserializer.setLocale(getLocale()).read(PoezdDTO.class, dataObj);
        Poezd poezd = poezdDAO.findById(dto.getHid(), false);
        poezd.updateVags(dto.getVagons(), mapper);
        poezd = poezdDAO.makePersistent(poezd);
        poezdDAO.flush(); // to get ids
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        mapper.map(poezd, PoezdDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private Mapper mapper;
    @Autowired
    private PoezdDAO poezdDAO;

    private String action;
    private String dataObj;

    public void setAction(String action) {
        this.action = action;
    }

    public void setDataObj(String dataObj) {
        this.dataObj = dataObj;
    }

    enum Action {SAVE}

}
