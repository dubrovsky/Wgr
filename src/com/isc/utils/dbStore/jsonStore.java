package com.isc.utils.dbStore;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.math.BigDecimal;
import java.sql.Types;
import java.text.SimpleDateFormat;

public class jsonStore {
  private ObjectNode nd;
  private ObjectMapper mapper = new ObjectMapper();

  private String dtFormat = "dd.MM.yyyy HH:mm";
  public jsonStore(stPack st) throws Exception {
    makeJSON(st, st.getRowCount(), dtFormat);
  }

  public jsonStore(stPack st, int total) throws Exception {
    makeJSON(st, total, dtFormat);
  }

  public jsonStore(stPack st, int total, String dateFormat) throws Exception {
    makeJSON(st, total, dateFormat);
  }

  public jsonStore(stPack st, int total, boolean supportsBoolean) throws Exception {
    this.supportsBoolean = supportsBoolean;
    makeJSON(st, total, dtFormat);
  }


  private SimpleDateFormat dtf;
  private void makeJSON(stPack st, int total, String dateFormat) throws Exception {
    this.nd = mapper.createObjectNode();
    this.dtf = new SimpleDateFormat(dateFormat);
    this.nd.set("rows", makeRowsJSON(st));
    this.nd.put("total", total);
    this.nd.put("success", true);
  }

  private boolean supportsBoolean = false;

  private ArrayNode makeRowsJSON(stPack st) throws Exception {
    ArrayNode an = mapper.createArrayNode();
//    nd.set("rows", an);
    for (int i = 0; i < st.getRowCount(); i++) {
      ObjectNode nd_r = mapper.createObjectNode();
      for (int j = 0; j < st.getColumnCount(); j++) {
//        System.out.println(st.getColumnName(j) + ": " + st.info.getType(j));
        switch (st.info.getType(j)) {
          case Types.TINYINT:
          case Types.SMALLINT:
          case Types.INTEGER:
          case Types.BIGINT:
            if(supportsBoolean && st.info.getPrecision(j) == 1) {
              Number v = (Number)st.getObject(i,j);
              if(v != null) nd_r.put(st.getColumnName(j), new Boolean(v.intValue() > 0));
              else nd_r.put(st.getColumnName(j), (Boolean) null);
            }
            else {
              Number v = (Number)st.getObject(i,j);
              if(v != null) nd_r.put(st.getColumnName(j), v.longValue());
              else nd_r.put(st.getColumnName(j), (Long) null);
            }
            break;
          case Types.NUMERIC:
          case Types.DECIMAL:
            BigDecimal v1 = (BigDecimal)st.getObject(i,j);
            if(v1 != null) nd_r.put(st.getColumnName(j), v1);
            else nd_r.put(st.getColumnName(j), (BigDecimal) null);
            break;
          case Types.DATE:
          case Types.TIMESTAMP:
            Object value = st.getObject(i,j);
            if(value == null) {
              nd_r.put(st.getColumnName(j), (String) null);
            }
            else if (value instanceof String) {
              nd_r.put(st.getColumnName(j), (String) value);
            }
            else {
              nd_r.put(st.getColumnName(j), dtf.format(value));
            }
            break;
          default:
            nd_r.put(st.getColumnName(j), st.getText(i,j));
            break;
        }
      }
      stPack stp = (stPack) st.getPack0(i);
      if(stp != null) {
        nd_r.set(stp.getInfo().packName, makeRowsJSON(stp));
        nd_r.put("total", stp.getRowCount());
      }

      an.add(nd_r);
    }
//    nd.put("total", total);
//    nd.put("success", true);
    return an;
  }

  @Override
  public String toString() {
    return this.nd.toString();
  }
}
