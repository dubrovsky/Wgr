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
            nd_r.put(st.getColumnName(j), (Long) ((Number)st.getObject(i,j)).longValue());
            break;
          case Types.NUMERIC:
          case Types.DECIMAL:
            nd_r.put(st.getColumnName(j), (BigDecimal) st.getObject(i,j));
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
