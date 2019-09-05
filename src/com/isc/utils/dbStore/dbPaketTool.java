package com.isc.utils.dbStore;

import java.util.Iterator;
import java.util.TreeMap;
import java.util.Vector;

public class dbPaketTool {

  private dbTool dbt;

  public dbPaketTool(dbTool dbt) {
    this.dbt = dbt;
  }

  public void fillRownum(String packName, String aColumn, stPack st) throws Exception {
    if (st.getInfo().packName.equals(packName)) {
      for (int r = 0; r < st.getRowCount(); r++) {
        st.setObject(r, aColumn, r);
      }
    } else {
      for(int i = 0; i < st.getRowCount(); i++) {
        modelDbForm f = st.getForm(i);
        TreeMap<String, modelDbPack> p = f.getPacks();
        Iterator it = p.keySet().iterator();

        while(it.hasNext()) {
          stPack pk = (stPack) p.get(it.next());
          fillRownum(packName, aColumn, pk);
        }
      }
    }
    return;
  }

  public void fill_Rownum(String packName, String aColumn, stPack st, int rr) throws Exception {
    if (st.getInfo().packName.equals(packName)) {
      for (int r = 0; r < st.getRowCount(); r++) {
        st.setObject(r, aColumn, rr);
      }
    } else {
      for(int i = 0; i < st.getRowCount(); i++) {
        modelDbForm f = st.getForm(i);
        TreeMap<String, modelDbPack> p = f.getPacks();
        Iterator it = p.keySet().iterator();

        while(it.hasNext()) {
          stPack pk = (stPack) p.get(it.next());
          fill_Rownum(packName, aColumn, pk, i);
        }
      }
    }
    return;
  }

  public int[] save(String packName, String tbName, Vector keyName, String[][] fillParentKey, modelDbPack st, sequenceFields sequences) throws Exception {
    int[] ret = new int[]{0, 0, 0};

    if (st.getInfo().packName.equals(packName)) {
      st.getInfo().keyName = keyName;
      fillParentKey(fillParentKey, st);
      fillSequence(sequences, st);

      int[] ret2 = dbt.save(tbName, st, -1, null);
      ret[0] += ret2[0];
      ret[1] += ret2[1];
      ret[2] += ret2[2];
    } else {
      for(int i = 0; i < st.getRowCount(); i++) {
        modelDbForm f = st.getForm(i);
        TreeMap<String, modelDbPack> p = f.getPacks();
        Iterator it = p.keySet().iterator();

        while(it.hasNext()) {
          modelDbPack pk = p.get(it.next());
          save(packName, tbName, keyName, fillParentKey, pk, sequences);
        }
      }
    }
    return ret;
  }

  public void fillNewPaket(String parentPackName, String newPackName, String[][] fillParentKey, modelDbPack st) throws Exception {
    if (st.getInfo().packName.equals(parentPackName)) {
      for (int i = 0; i < st.getRowCount(); i++) {
        stPack st_new = new stPack(newPackName);
        st.setPack(i, st_new);
        for (int j = 0; fillParentKey != null && j < fillParentKey.length; j++) {
          st_new.setObject(0, fillParentKey[j][1], st.getObject(i, fillParentKey[j][0]));
        }
      }
    } else {
      for(int i = 0; i < st.getRowCount(); ++i) {
        modelDbForm f = st.getForm(i);
        TreeMap<String, modelDbPack> p = f.getPacks();
        Iterator it = p.keySet().iterator();

        while(it.hasNext()) {
          modelDbPack pk = p.get(it.next());
          fillNewPaket(parentPackName, newPackName, fillParentKey, pk);
        }
      }
    }
    return;
  }

  private void fillSequence(sequenceFields sequences, modelDbPack st) throws Exception {
    for (int i = 0; i < st.getRowCount(); i++) {
      for (int j = 0;sequences != null && j < sequences.getSequenceCount(); j++) {
        stPack st_seq = new stPack();
        dbt.read(st_seq, "select NextVal('" + sequences.getSequenceName(j) + "') AS NV", null);
        ((stPack)st).setObject(i, sequences.getColumnName(j), st_seq.getObject(0, 0));
      }
    }
  }

  private void fillParentKey(String[][] fillParentKey, modelDbPack st) throws Exception {
    stForm prnt = (stForm) st.getParent();
    for (int i = 0; i < st.getRowCount(); i++) {
      for (int j = 0; fillParentKey != null && j < fillParentKey.length; j++) {
        ((stPack)st).setObject(i, fillParentKey[j][1], prnt.getObject(fillParentKey[j][0]));
      }
    }
  }

}
