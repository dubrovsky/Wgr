package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.PrintBlankDAO;
import com.bivc.cimsmgs.db.PrintBlank;
import com.bivc.cimsmgs.db.Usr;
import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

public class PrintBlankDAOHib extends GenericHibernateDAO<PrintBlank, Long> implements PrintBlankDAO {

    public List<PrintBlank> findAll(Integer limit, Integer start, String query, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("docDir.hid", new BigDecimal(query)));
        crit.addOrder(Order.asc("page")).addOrder(Order.asc("ncopy"));
        return crit.list();
    }

    /*public List<PrintBlank> findAllDownloaded(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("printBlankTemplRefs", "refs").add(Restrictions.eq("refs.id.hidTempl", query));
        crit.addOrder(Order.asc("dattr"));
        return crit.list();
    }*/

    public int updateBlank(PrintBlank blank) {
        String hqlUpdate = "update PrintBlank pb set pb.name = :newName, pb.page = :newPage, pb.ncopy = :newNcopy, pb.preview = :preview where pb.hid = :hid";
        int updatedEntities = getSession().createQuery( hqlUpdate )
                .setString("newName", blank.getName())
                .setByte("newPage", blank.getPage())
                .setByte("newNcopy", blank.getNcopy())
                .setBoolean("preview", blank.isPreview())
                .setLong("hid", blank.getHid())
                .executeUpdate();

        return updatedEntities;
    }

    /*@Override
    public void saveBlank(PrintBlank blank, File upload) throws SQLException, IOException {
        blank.setData(getSession().getLobHelper().createBlob(new byte[]{0}));
        getSession().save(blank);
        getSession().flush();
        getSession().refresh(blank, LockOptions.UPGRADE); //grabs an Oracle CLOB
        OutputStream pw = blank.getData().setBinaryStream(1);
        InputStream fileIn = new FileInputStream(upload);
        byte[] b  = new byte[new Long(upload.length()).intValue()];
        fileIn.read(b);
        pw.write(b);
        pw.close();
    }*/

    @Override
    public void saveBlank(PrintBlank blank, File file) throws SQLException, IOException {
        FileInputStream inputStream = null;
        try {
            inputStream = new FileInputStream(file);
            Blob blob = Hibernate.getLobCreator(getSession()).createBlob(inputStream, file.length());
            blank.setData(blob);
            getSession().save(blank);
            getSession().flush();
            blob.free();
        } finally {
            if(inputStream != null){
                inputStream.close();
            }
        }
    }
}
