package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.PrintDataStampDAO;
import com.bivc.cimsmgs.db.PrintDataStamp;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

public class PrintStamp_A extends CimSmgsSupport_A {
    final static private Logger log = LoggerFactory.getLogger(PrintStamp_A.class);

    @Autowired
    PrintDataStampDAO printDataStampDAO;

    @Autowired
    private Serializer defaultSerializer;

    @Autowired
    private Deserializer defaultDeserializer;

    private String jsonData;
    public String list() throws Exception {
        log.info("list");

        List<PrintDataStamp> stamps = printDataStampDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = printDataStampDAO.countAll(getQuery());
        setJSONData(
                defaultSerializer
                        .setLocale(getLocale())
                        .write(
                                new Response<>(
                                        stamps,
                                        total
                                )
                        )
        );
        return SUCCESS;
    }

    public String persist() throws Exception {

        PrintDataStamp stamp = defaultDeserializer.setLocale(getLocale()).read(PrintDataStamp.class, jsonData);
        stamp.setAltered(new Date());

        if(stamp.getHid()!=null)
        {
            printDataStampDAO.merge(stamp);
        }
        else
        {
            stamp.setDattr(new Date());

            stamp.setUn(getUser().getUsr().getUn());
            stamp.setTrans("");
            printDataStampDAO.makePersistent(stamp);
        }
        setJSONData(
        defaultSerializer
                .setLocale(getLocale())
                .write(new Response<>(stamp)
                )
        );
        return SUCCESS;
    }

    public String del() throws Exception
    {
        printDataStampDAO.makeTransient(printDataStampDAO.findById(getHid(),false));
        return SUCCESS;
    }

    public String getJsonData() {
        return jsonData;
    }

    public void setJsonData(String jsonData) {
        this.jsonData = jsonData;
    }
    public void setPrintDataStampDAO(PrintDataStampDAO printDataStampDAO) {
        this.printDataStampDAO = printDataStampDAO;
    }

    public PrintDataStampDAO getPrintDataStampDAO() {
        return printDataStampDAO;
    }
}
