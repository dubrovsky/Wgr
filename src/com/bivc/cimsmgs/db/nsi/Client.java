package com.bivc.cimsmgs.db.nsi;

import java.io.Serializable;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * @author p.dzeviarylin
 */
public class Client implements Serializable {
    private Long hid;
    private String cl_no;
    private String cl_name;
    private Date clientBgn;
    private Date clientEnd;

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getCl_no() {
        return cl_no;
    }

    public void setCl_no(String cl_no) {
        this.cl_no = cl_no;
    }

    public String getCl_name() {
        return cl_name;
    }

    public void setCl_name(String cl_name) {
        this.cl_name = cl_name;
    }

    public Date getClientBgn() {
        return clientBgn;
    }

    public void setClientBgn(Date clientBgn) {
        this.clientBgn = clientBgn;
    }

    public Date getClientEnd() {
        return clientEnd;
    }

    public void setClientEnd(Date clientEnd) {
        this.clientEnd = clientEnd;
    }

    public void prepare4save() {
        setClientBgn(new Date(System.currentTimeMillis() - 1000*60*60*24));
        setClientEnd(new GregorianCalendar(3000,1,1).getTime());
    }
}
