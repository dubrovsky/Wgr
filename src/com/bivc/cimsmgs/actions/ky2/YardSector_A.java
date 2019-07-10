package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.YardDAO;
import com.bivc.cimsmgs.dao.YardSectorDAO;
import com.bivc.cimsmgs.db.ky.Yard;
import com.bivc.cimsmgs.db.ky.YardSector;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky.YardSectorDTO;
import com.bivc.cimsmgs.exceptions.BusinessException;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by peter on 10.02.14.
 */
public class YardSector_A extends CimSmgsSupport_A {
    final static private Logger log = LoggerFactory.getLogger(YardSector_A.class);

    public String list() throws Exception {
        log.debug("Rendering YardSector list.");

        List<YardSector> list = yardSectorDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = yardSectorDAO.countAll(getQuery(), getUser().getUsr());

        log.debug("Found {} YardSector entries.", total);

        setJSONData(yardSectorToListSerializer.setLocale(getLocale()).write(new Response<>(list, total)));

        return SUCCESS;
    }

    public String save() throws Exception {
        if (dto == null)
            throw new BusinessException("Пустой набор данных");

        log.debug("Saving a YardSector entry with information: {}", dto);

        YardSector yardSector;
        if(dto.getHid() == null){
            yardSector = add(dto);
        } else {
            yardSector = update(dto);
        }

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;
    }

    private YardSector update(YardSectorDTO dto) {
        YardSector updated = yardSectorDAO.getById(dto.getHid(), false);
        defaultMapper.copy(dto, updated);
        log.debug("Updated the information of a YardSector entry to: {}", updated);

        return updated;
    }

    private YardSector add(YardSectorDTO dto) {
        YardSector added = defaultMapper.copy(dto, YardSector.class);
        yardSectorDAO.makePersistent(added);
        log.debug("Added a YardSector entry with information: {}", added);
        return added;
    }

    public String delete() throws Exception {
        log.debug("Deleting a Yard entry with id: {}", dto.getHid());
        YardSector deletedYardSector = yardSectorDAO.findById(dto.getHid(), false);

        log.debug("Checking if a YardSector with id: {} has Yards with Kont entity bound", deletedYardSector.getHid());
        for(Yard deletedYard : deletedYardSector.getYards()){
            log.debug("Found Yard with id: {} in YardSector with id: {}", deletedYard.getHid(), deletedYardSector.getHid());
            if(deletedYard.getKont() != null) {
//                log.debug("Yard with id: {} in YardSector with id: {} has Kont entity bound. Unbinding Kont entity with id: {}", deletedYard.getHid(), deletedYardSector.getHid(), deletedYard.getKont().getHid());
//                deletedYard.getKont().unbindYard();
                throw new RuntimeException("Нельзя удалять место на контейнерной площадке, т.к. на этом месте находится контейнер - " + deletedYard.getKont().getNkon());
            }
            yardDAO.makeTransient(deletedYard);
            log.info("Deleted Yard entry with information: {}", deletedYard);
        }
        yardSectorDAO.makeTransient(deletedYardSector);
        log.info("Deleted YardSector entry with information: {}", deletedYardSector);

        setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
        return SUCCESS;

    }

    @Autowired
    private YardSectorDAO yardSectorDAO;
    @Autowired
    private YardDAO yardDAO;
    private YardSectorDTO dto;
    @Autowired
    private Serializer yardSectorToListSerializer;
    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private Mapper defaultMapper;

    public YardSectorDTO getNsi() {
        return dto;
    }

    public void setNsi(YardSectorDTO dto) {
        this.dto = dto;
    }

}
