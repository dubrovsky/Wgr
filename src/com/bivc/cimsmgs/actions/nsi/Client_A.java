package com.bivc.cimsmgs.actions.nsi;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.JsonUtils;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.NsiCarrierDAO;
import com.bivc.cimsmgs.dao.NsiCarrierDAOAware;
import com.bivc.cimsmgs.dao.NsiClientDAO;
import com.bivc.cimsmgs.dao.NsiClientDAOAware;
import com.bivc.cimsmgs.db.nsi.Carrier;
import com.bivc.cimsmgs.db.nsi.Client;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class Client_A extends CimSmgsSupport_A implements NsiClientDAOAware {
    final static private Logger log = LoggerFactory.getLogger(Client_A.class);

    public String list() {
        log.info("list");
        List<Client> clients = dao.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = dao.countAll(getQuery(), getUser().getUsr());
        setJSONData(Constants.convert2JSON_NsiClients(clients, total));
        return SUCCESS;
    }

    public String save() throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
        log.info("save");
        client.prepare4save();
        dao.makePersistent(client);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String delete() {
        log.info("delete");
        Client origin = dao.findById(client.getHid(), false);
        dao.makeTransient(origin);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    private NsiClientDAO dao;
    private Client client;


    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    @Override
    public void setNsiClientDAO(NsiClientDAO dao) {
        this.dao = dao;
    }
}
