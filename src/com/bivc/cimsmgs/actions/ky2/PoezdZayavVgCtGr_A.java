package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.NsiClientDAO;
import com.bivc.cimsmgs.dao.PoezdZayavDAO;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.PoezdZayav;
import com.bivc.cimsmgs.db.ky.Vagon;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.PoezdZayavDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.bivc.cimsmgs.sql.Select;
import com.isc.utils.dbStore.dbTool;
import com.isc.utils.dbStore.stPack;
import com.isc.utils.dbStore.typesAndValues;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Types;
import java.util.Set;

/**
 * @author p.dzeviarylin
 */
public class PoezdZayavVgCtGr_A extends CimSmgsSupport_A {
    private static final Logger log = LoggerFactory.getLogger(PoezdVgCtGr_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (PoezdVgCtGr_A.Action.valueOf(action.toUpperCase())) {
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
        PoezdZayav zayav = poezdZayavDAO.findById(getHid(), false);
        initLoadingUnloadingKont(zayav);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        mapper.map(zayav, PoezdZayavDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    private String save() throws Exception {
        final PoezdZayavDTO dto = defaultDeserializer.setLocale(getLocale()).read(PoezdZayavDTO.class, dataObj);
        PoezdZayav zayav = poezdZayavDAO.findById(dto.getHid(), false);
        zayav.updateVags(dto.getVagons(), mapper, clientDAO);
        zayav = poezdZayavDAO.makePersistent(zayav);
        poezdZayavDAO.flush(); // to get ids
        initLoadingUnloadingKont(zayav);

        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        mapper.map(zayav, PoezdZayavDTO.class)
                                )
                        )
        );
        return SUCCESS;
    }

    private void initLoadingUnloadingKont(PoezdZayav poezdZayav) throws Exception {

        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack();
        StringBuffer query = new StringBuffer();

        typesAndValues tv = new typesAndValues();

        tv.add(Types.NUMERIC, getHid());
        query.append(" AND z.HID=?");

        if(poezdZayav.getDirection() == 1) {
            dbt.read(st, Select.getSqlFile("ky/zajav/poezd_unloading_kont") + query, tv);
        }
        else if(poezdZayav.getDirection() == 2) {
            dbt.read(st, Select.getSqlFile("ky/zajav/poezd_loading_kont") + query, tv);
        }

        Set<Vagon> vagons = poezdZayav.getVagons();

        for(int i = 0; i < st.getRowCount(); ++i) {
            if(vagons != null) {
                for (Vagon vagon : vagons) {
                    Set<Kont> konts = vagon.getKonts();
                    if(konts != null) {
                        for (Kont kont: konts) {
                            if(kont.getHid() == ((Number) st.getObject(i, "HID")).longValue()) {
                                if(poezdZayav.getDirection() == 1) {
                                    kont.setIsUnloading((byte) 1);
                                }
                                else if(poezdZayav.getDirection() == 2) {
                                    kont.setIsLoading((byte) 1);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private Mapper mapper;
    @Autowired
    private PoezdZayavDAO poezdZayavDAO;
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
