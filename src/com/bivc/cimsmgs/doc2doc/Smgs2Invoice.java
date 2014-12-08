package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.actions.Doc2Doc_A;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsInvoice;
import com.bivc.cimsmgs.exchange.InvLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;

public class Smgs2Invoice implements Doc2Doc{
    final static private Logger log = LoggerFactory.getLogger(Smgs2Invoice.class);
    @Override
    public void convert(Doc2Doc_A action) throws Exception {
        log.info("convert");
        int docsAmountTo = 0;
        for (Long smgsId : action.getSmgsIds()) {
            CimSmgs smgs = action.getSmgsDAO().findById(smgsId, false);
            for (File file : action.getFileUpload()) {
                InvLoader loader = new InvLoader(new FileInputStream(file));
                CimSmgsInvoice[] invoices = loader.makeInvoices(smgs);
                if (invoices != null) {
                    for (CimSmgsInvoice invoice : invoices) {
                        invoice.setRoute(smgs.getRoute());
                        invoice.setPackDoc(smgs.getPackDoc());
                        action.getInvoiceDAO().makePersistent(invoice);
                        docsAmountTo++;
                    }
                }
            }
        }
    }

    @Override
    public String getResultMsg() {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }
}
