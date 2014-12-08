package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.OutputStreamWriters;
import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.FileDAO;
import com.bivc.cimsmgs.db.CimSmgsFile;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.LockOptions;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.io.*;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

public class FileDAOHib extends GenericHibernateDAO<CimSmgsFile, Long> implements FileDAO {
    public List<CimSmgsFile> findAll(Integer limit, Integer start, Search search, Usr usr) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("cimSmgsFileInf", "fileInf").add(Restrictions.eq("fileInf.type", search.getDocType()));
        crit.createAlias("fileInf.packDoc", "pack").add(Restrictions.eq("pack.hid", search.getPackId()));
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
//		crit.addOrder(Order.desc("dattr"));  jetb

        return crit.list();
    }

    public Long countAll(Search search, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("cimSmgsFileInf", "fileInf").add(Restrictions.eq("fileInf.type", search.getDocType()));
        crit.createAlias("fileInf.packDoc", "pack").add(Restrictions.eq("pack.hid", search.getPackId()));
        crit.setProjection(Projections.rowCount());

        return (Long) crit.uniqueResult();
    }

    public void save(CimSmgsFile scan, File file) throws SQLException, IOException {
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
    }

    public void save(CimSmgsFile scan, OutputStreamWriters file) throws SQLException, IOException {
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

    }
}
