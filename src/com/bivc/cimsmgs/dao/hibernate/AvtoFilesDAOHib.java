package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.OutputStreamWriters;
import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.AvtoFilesDAO;
import com.bivc.cimsmgs.dao.FileDAO;
import com.bivc.cimsmgs.db.CimSmgsFile;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.AvtoFiles;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

public class AvtoFilesDAOHib extends GenericHibernateDAO<AvtoFiles, Long> implements AvtoFilesDAO {

    public List<AvtoFiles> findByAvto(Integer limit, Integer start, Usr usr, Long avtoHid) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("avto", "avto").add(Restrictions.eq("avto.hid", avtoHid));

//        crit.add(Restrictions.eq("deleted", search.getDeleted() != 0));
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
//		crit.addOrder(Order.desc("dattr"));  jetb

        return crit.list();
    }

    public List<AvtoFiles> findByZayav(Integer limit, Integer start, Usr usr, Long zayavHid) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("avtoZayav", "avtoZayav").add(Restrictions.eq("avtoZayav.hid", zayavHid));

//        crit.add(Restrictions.eq("deleted", search.getDeleted() != 0));
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
//		crit.addOrder(Order.desc("dattr"));  jetb

        return crit.list();
    }


    public Long countByAvto(Usr usr, Long avtoHid) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("avto", "avto").add(Restrictions.eq("avto.hid", avtoHid));

//        crit.add(Restrictions.eq("deleted", search.getDeleted() != 0));
        crit.setProjection(Projections.rowCount());

        return (Long) crit.uniqueResult();
    }

    public Long countByZayav(Usr usr, Long zayavHid) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("avtoZayav", "avtoZayav").add(Restrictions.eq("avtoZayav.hid", zayavHid));

//        crit.add(Restrictions.eq("deleted", search.getDeleted() != 0));
        crit.setProjection(Projections.rowCount());

        return (Long) crit.uniqueResult();
    }

    public Long maxNpp(Long routeId, String docType) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("docType", docType));
        crit.add(Restrictions.sqlRestriction("YEAR({alias}.uploaded) = YEAR(CURDATE())"));
        crit.createAlias("avto", "avto").createAlias("avto.route", "route").add(Restrictions.eq("route.hid", routeId));

//        crit.add(Restrictions.eq("deleted", search.getDeleted() != 0));
        crit.setProjection(Projections.max("npp"));

        return (Long) crit.uniqueResult();
    }

    /*public void save(CimSmgsFile scan, File file) throws SQLException, IOException {
        OutputStream pw = null;
        InputStream fileIn = null;
        try {
            scan.setFiles(getSession().getLobHelper().createBlob(new byte[]{0}));
            getSession().save(scan);
            getSession().flush();
            getSession().refresh(scan, LockOptions.UPGRADE); //grabs an Oracle CLOB
            pw = scan.getFiles().setBinaryStream(1);
            fileIn = new FileInputStream(file);
            int value;
            do {
                value = fileIn.read();
                if (value != -1)
                    pw.write(value);
            } while (value != -1);
        } finally {
            if(fileIn != null){
                fileIn.close();
            }
            if (pw != null) {
                pw.flush();
                pw.close();
            }
        }
    }*/

    public void save(AvtoFiles scan, File file) throws SQLException, IOException {
        FileInputStream inputStream = null;
        try {
            inputStream = new FileInputStream(file);
            Blob blob = Hibernate.getLobCreator(getSession()).createBlob(inputStream, file.length());
            scan.setFiles(blob);
            getSession().save(scan);
            getSession().flush();
            blob.free();
        } finally {
             if(inputStream != null){
                 inputStream.close();
             }
        }
    }

    /*public void save(CimSmgsFile scan, OutputStreamWriters file) throws SQLException, IOException {
        ByteArrayOutputStream outByteStream = null;
        OutputStream pw = null;
        try {
            outByteStream = new ByteArrayOutputStream();
            file.writeTo(outByteStream);
            byte[] outArray = outByteStream.toByteArray();
            scan.setLength(BigDecimal.valueOf(outArray.length));
            scan.setFiles(getSession().getLobHelper().createBlob(new byte[]{0}));
            getSession().save(scan);
            getSession().flush();
            getSession().refresh(scan, LockOptions.UPGRADE); //grabs an Oracle CLOB

            pw = scan.getFiles().setBinaryStream(1);
            pw.write(outArray);
        } finally {
            if (outByteStream != null) {
                outByteStream.close();
            }
            if (pw != null) {
                pw.flush();
                pw.close();
            }
        }

    }*/

    public void save(AvtoFiles avtoFiles, byte[] file) throws SQLException, IOException {
        Blob blob = Hibernate.getLobCreator(getSession()).createBlob(file);
        avtoFiles.setFiles(blob);
        getSession().save(avtoFiles);
        getSession().flush();
        blob.free();
    }
}