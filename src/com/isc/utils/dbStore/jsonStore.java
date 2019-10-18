package com.isc.utils.dbStore;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.math.BigDecimal;
import java.sql.Types;

public class jsonStore {
  private ObjectNode nd;
  public jsonStore(stPack st) throws Exception {
    ObjectMapper mapper = new ObjectMapper();
    nd = mapper.createObjectNode();
    ArrayNode an = mapper.createArrayNode();
    nd.set("rows", an);
    for (int i = 0; i < st.getRowCount(); i++) {
      ObjectNode nd_r = mapper.createObjectNode();
      for (int j = 0; j < st.getColumnCount(); j++) {
//        System.out.println(st.getColumnName(j) + ": " + st.info.getType(j));
        switch (st.info.getType(j)) {
          case Types.TINYINT:
          case Types.SMALLINT:
          case Types.INTEGER:
          case Types.BIGINT:
            Number v = (Number)st.getObject(i,j);
            if(v != null) nd_r.put(st.getColumnName(j), v.longValue());
            else nd_r.put(st.getColumnName(j), (Long) null);
            break;
          case Types.NUMERIC:
          case Types.DECIMAL:
              BigDecimal v1 = (BigDecimal)st.getObject(i,j);
              if(v1 != null) nd_r.put(st.getColumnName(j), v1);
              else nd_r.put(st.getColumnName(j), (BigDecimal) null);
            break;
          default:
            nd_r.put(st.getColumnName(j), st.getText(i,j));
            break;
        }
      }
      an.add(nd_r);
    }
    nd.put("total", st.getRowCount());
    nd.put("success", true);
  }

  @Override
  public String toString() {
    return nd.toString();
  }
}
