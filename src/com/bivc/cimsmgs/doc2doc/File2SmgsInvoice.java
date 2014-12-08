package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.actions.Doc2Doc_A;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.exchange.InvLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.util.List;

public class File2SmgsInvoice implements Doc2Doc{
    final static private Logger log = LoggerFactory.getLogger(File2SmgsInvoice.class);
    @Override
    public void convert(Doc2Doc_A action) throws Exception {
        log.info("convert");
        for (File file : action.getFileUpload()) {
            InvLoader loader = new InvLoader(new FileInputStream(file));
            List<PackDoc> list = loader.makeInvoices_Smgs(action.getSearch().getRouteId(), action.getUser().getUsr().getGroup().getName());
            for (PackDoc pd : list) {
                action.getPackDocDAO().makePersistent(pd);
            }
        }
    }

    @Override
    public String getResultMsg() {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }
}
