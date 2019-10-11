package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.KontGruzHistoryDAO;
import com.bivc.cimsmgs.dao.NsiClientDAO;
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

import java.util.List;
import java.util.Map;

import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.POEZD;

/**
 * @author p.dzeviarylin
 */
public class PoezdVgCtGr_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(PoezdVgCtGr_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (Action.valueOf(action.toUpperCase())) {
                case SAVE:
                    return save();
                case EDIT:
                    return edit();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }

    private String edit() throws Exception {
        Poezd poezd = poezdDAO.findById(getHid(), false);
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

    private String save() throws Exception {
        final PoezdDTO dto = defaultDeserializer.setLocale(getLocale()).read(PoezdDTO.class, dataObj);
        Poezd poezd = poezdDAO.findById(dto.getHid(), false);
        final Map<String, List<?>> contGruz4History = poezd.updateVags(dto.getVagons(), mapper, clientDAO);
        poezd = poezdDAO.makePersistent(poezd);
        saveContGruzHistory(contGruz4History, kontGruzHistoryDAO, POEZD);
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
    @Autowired
    private KontGruzHistoryDAO kontGruzHistoryDAO;
    @Autowired
    private NsiClientDAO clientDAO;

    private String action;
    private String dataObj;

    public void setAction(String action) {
        this.action = action;
    }

    public void setDataObj(String dataObj) {
        this.dataObj = dataObj;
    }

    enum Action {SAVE, EDIT}

}
