package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.dao.FieldsCommentsDAO;
import com.bivc.cimsmgs.dao.FieldsCommentsDAOAware;
import com.bivc.cimsmgs.dao.FieldsDirDAO;
import com.bivc.cimsmgs.dao.FieldsDirDAOAware;
import com.bivc.cimsmgs.db.FieldsComments;
import com.bivc.cimsmgs.db.FieldsDir;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class Fields_A extends CimSmgsSupport_A implements FieldsCommentsDAOAware, FieldsDirDAOAware {
    final static private Logger log = LoggerFactory.getLogger(Fields_A.class);

    public String listComments() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        log.info("listComments");
        List<FieldsComments> list = fieldsCommentsDAO.findAll(getLimit(), getStart(), getSearch());
        Long total = fieldsCommentsDAO.countAll(getSearch());
        setJSONData(Constants.convert2JSON_FieldCommentsList(list, total));

        return SUCCESS;
    }

    public String saveComments(){
        log.info("saveComments");
        fieldsCommentsDAO.makePersistent(fieldComments);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String deleteComments() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        log.info("deleteComments");

        FieldsComments fieldsComments = fieldsCommentsDAO.findById(getHid(), false);
        fieldsCommentsDAO.makeTransient(fieldsComments);

        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String listFields() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        log.info("listFields");
        List<FieldsDir> list = fieldsDirDAO.findFieldsByDocId(getSearch());
        setJSONData(Constants.convert2JSON_FieldsList(list));

        return SUCCESS;
    }

    private FieldsCommentsDAO fieldsCommentsDAO;
    private FieldsDirDAO fieldsDirDAO;
    private FieldsComments fieldComments;


    @Override
    public void setFieldsCommentsDAO(FieldsCommentsDAO dao) {
        fieldsCommentsDAO = dao;
    }

    @Override
    public void setFieldsDirDAO(FieldsDirDAO dao) {
        fieldsDirDAO = dao;
    }

    public FieldsComments getFieldComments() {
        return fieldComments;
    }

    public void setFieldComments(FieldsComments fieldComments) {
        this.fieldComments = fieldComments;
    }
}
