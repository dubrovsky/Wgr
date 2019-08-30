package com.bivc.cimsmgs.services.ky2;

import com.isc.utils.dbStore.stPack;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

/**
 * @author p.dzeviarylin
 */
public class ReportService {

    public HSSFWorkbook reportToExcel(stPack st) {

        for (int i = 0; i < st.getRowCount(); i++) {
            // HID;NVAG1;NPPR1;DPRB;NKON;TYPE;VID;GRUZOTPR;KONT_PLOMB;MASSA_TAR;POD_SILA;MASSA_BRUTTO;KONT_POSITION;DOTP;KOLEYA;NVAG2;DRIVER_NM
            st.getTxt(i, "HID");
            st.getObject(i, "HID");
        }
        return null;
    }
}
