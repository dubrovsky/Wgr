package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.AvtoDAO;
import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.AvtoBindDTO;
import com.bivc.cimsmgs.dto.ky2.PoezdBindDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author p.dzeviarylin
 */
public class BindAvtoAndAvto_A extends CimSmgsSupport_A {

    private static final Logger log = LoggerFactory.getLogger(BindAvtoAndAvto_A.class);

    public String execute() throws Exception {
        if (StringUtils.isEmpty(action)) {
            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (BindAvtoAndAvto_A.Action.valueOf(action.toUpperCase())) {
                case GET_AVTO_AND_AVTO_FOR_BIND:
                    return getAvtoAndAvtoForBind();
                case BIND_AVTO_TO_AVTO:
                    return bindAvtoToAvto();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }

    private String bindAvtoToAvto() throws Exception {
        List<AvtoBindDTO> avtoBindDTOS = defaultDeserializer.read(new ArrayList<AvtoBindDTO>() {}.getClass().getGenericSuperclass(), dataObj);
        AvtoBindDTO avto1BindDTO = avtoBindDTOS.get(0);
        AvtoBindDTO avto2BindDTO = avtoBindDTOS.get(1);
        Avto avto1 = avtoDAO.findById(avto1BindDTO.getHid(), false);
        Avto avto2 = avtoDAO.findById(avto2BindDTO.getHid(), false);
        avto1.bindKonts(avto1BindDTO.getKonts(), mapper, avto2);
        avto1.bindGruzs(avto1BindDTO.getGruzs(), mapper, avto2);
        avto2.bindKonts(avto2BindDTO.getKonts(), mapper, avto1);
        avto2.bindGruzs(avto2BindDTO.getGruzs(), mapper, avto1);
        //        avto1.bindAvtoToAvto(poezd1BindDTO.getVagons(), avto2.getVagons(), mapper);
//        avto2.bindAvtoToAvto(poezd2BindDTO.getVagons(), avto1.getVagons(), mapper);
        avtoDAO.makePersistent(avto1);
        avtoDAO.makePersistent(avto2);

        setJSONData(defaultSerializer.write(new Response<>()));
        return SUCCESS;
    }

    private String getAvtoAndAvtoForBind() throws Exception {
        Avto avto1 = avtoDAO.findById(avto1Hid, false);
        Avto avto2 = avtoDAO.findById(avto2Hid, false);
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        Arrays.asList(
                                                mapper.map(avto1, AvtoBindDTO.class),
                                                mapper.map(avto2, AvtoBindDTO.class)
                                        ),
                                        2L
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
    private AvtoDAO avtoDAO;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.Mapper kyavtoMapper;

    private String action;
    private String dataObj;
    private Long avto1Hid;
    private Long avto2Hid;

    public void setAction(String action) {
        this.action = action;
    }

    public void setDataObj(String dataObj) {
        this.dataObj = dataObj;
    }

    public void setAvto1Hid(Long avto1Hid) {
        this.avto1Hid = avto1Hid;
    }

    public void setAvto2Hid(Long avto2Hid) {
        this.avto2Hid = avto2Hid;
    }

    enum Action {GET_AVTO_AND_AVTO_FOR_BIND, BIND_AVTO_TO_AVTO}
}
