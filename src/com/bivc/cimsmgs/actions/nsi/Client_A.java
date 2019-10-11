package com.bivc.cimsmgs.actions.nsi;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.JsonUtils;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.Project;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.RouteDoc;
import com.bivc.cimsmgs.db.nsi.Carrier;
import com.bivc.cimsmgs.db.nsi.Client;
import com.bivc.cimsmgs.db.nsi.ClientGroups;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.ky2.ClientDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.axis.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class Client_A extends CimSmgsSupport_A implements ProjectDAOAware{
    final static private Logger log = LoggerFactory.getLogger(Client_A.class);

    public String execute() throws Exception {
        if(StringUtils.isEmpty(action)){
            setAction(LIST);
//            throw new RuntimeException("Empty action parameter");
        }

        try {
            switch (Client_A.Action.valueOf(action.toUpperCase())){
                case SAVE:
                    return save();
                case DELETE:
                    return delete();
                case LIST:
                    return list();
                default:
                    throw new RuntimeException("Unknown action");
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

    }

    public String list() throws Exception {
        log.info("list");
        List<Client> clients = clientDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr(), getRouteId());
        Long total = clientDAO.countAll(getQuery(), getUser().getUsr(), getRouteId());
//        setJSONData(Constants.convert2JSON_NsiClients(clients, total));
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        defaultMapper.copyList(clients, ClientDTO.class),
                                        total
                                )
                        )
        );

        return SUCCESS;
    }

    public String save() throws Exception {
        log.info("save");
        if (StringUtils.isEmpty(jsonRequest)) {
            throw new RuntimeException("Empty JSON request string");
        }

        ClientDTO dto = defaultDeserializer.setLocale(getLocale()).read(ClientDTO.class, jsonRequest);

        Client client;
        if(dto.getHid() == null){
            client = add(dto);
        } else {
            client = update(dto);
        }

        client.getClientGroups().clear();
        clientDAO.makePersistent(client);
        clientDAO.flush();

        for(ClientGroups clientGroups: client.buildGroups(dto)) { // save user groups
            clientGroupsDAO.makePersistent(clientGroups);
        }

        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    private Client update(ClientDTO dto) {
        Client updated = clientDAO.getById(dto.getHid(), false);
        mapper.map(dto, updated);
        if(updated.getHidRoute() == null)
            updated.setHidRoute(getHidRoute());
//        updated.setSector(yardSectorDAO.getById(dto.getSector().getHid(), false));
        log.debug("Updated the information of a Client entry to: {}", updated);

        return updated;
    }

    /*private YardSector add(YardSectorDTO dto) {
        YardSector added = defaultMapper.copy(dto, YardSector.class);
        yardSectorDAO.makePersistent(added);
        log.debug("Added a YardSector entry with information: {}", added);
        return added;
    }*/

    private Client add(ClientDTO dto) {
        Client added = mapper.map(dto, Client.class);
        added.prepare4save();
        added.setTrans(getUser().getUsr().getGroup().getName());
        added.setHidRoute(getHidRoute());

        log.debug("Added a Client entry with information: {}", added);
        return added;
    }

    private Long getHidRoute() {
        Long routeHid = null;
        List<Project> projects = projectDAO.findAll(getUser().getUsr());
        for(Project project: projects) {
            for (Route route1 : project.getRoutes()) {
                for (RouteDoc routeDoc1 : route1.getRouteDocs()) {
                    if ("kontyard2".equals(routeDoc1.getDocDir().getName())) {
                        return route1.getHid();
                    }
                }
            }
        }
        return routeHid;
    }

    public String delete() {
        log.info("delete");
        Client origin = clientDAO.findById(getHid(), false);
        clientDAO.makeTransient(origin);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }
    enum Action { LIST, SAVE, EDIT, DELETE}

    @Autowired
    private NsiClientDAO clientDAO;
    @Autowired
    private Deserializer defaultDeserializer;
    @Autowired
    private Serializer defaultSerializer;
    @Autowired
    private Mapper defaultMapper;
    @Autowired
    private ClientGroupsDAO clientGroupsDAO;
    @Autowired
    private com.bivc.cimsmgs.doc2doc.orika.CopyClientMapper mapper;
    private String action;
    private String jsonRequest;
    private ProjectDAO projectDAO;
    private long routeId;

    public void setAction(String action) {
        this.action = action;
    }

    public void setProjectDAO(ProjectDAO dao) {
        this.projectDAO = dao;
    }

    public void setJsonRequest(String jsonRequest) {
        this.jsonRequest = jsonRequest;
    }

    public long getRouteId() {
        return routeId;
    }

    public void setRouteId(long routeId) {
        this.routeId = routeId;
    }


//    @Override
//    public void setNsiClientDAO(NsiClientDAO dao) {
//        this.dao = dao;
//    }
}
