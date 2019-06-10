package com.bivc.cimsmgs.commons;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by peter on 12.02.14.
 */
public class Response<T> {

    private List<T> rows;
    private Long total;
    private boolean success;

    public Response(List<T> rows, Long total){
        this.rows = rows;
        this.total = total;
        success = true;
    }

    public Response(T object){
        rows = new ArrayList<T>();
        rows.add(object);
        total = 1L;
        success = true;
    }

    public Response(){
        this.success = true;
    }

    public Response(boolean success){
        this.success = success;
    }

    public List<T> getRows() {
        return rows;
    }

    public void setRows(List<T> rows) {
        this.rows = rows;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
