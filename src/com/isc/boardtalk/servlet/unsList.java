package com.isc.boardtalk.servlet;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.sql.Select;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.isc.utils.dbStore.dbTool;
import com.isc.utils.dbStore.jsonStore;
import com.isc.utils.dbStore.stPack;
import com.isc.utils.dbStore.typesAndValues;
import org.apache.log4j.Logger;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.sql.Types;

/**
 * Created with IntelliJ IDEA.
 * User: vva
 * Date: 17.06.13
 * Time: 11:45
 * To change this template use File | Settings | File Templates.
 */
public class unsList extends HttpServlet implements Servlet {
  private final Logger log = Logger.getLogger(unsList.class);

  // unsList?GROUPS_ID=wgr
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    dbTool dbt = null;

    try {
      String remoteHost = req.getRemoteHost();
      log.debug("remoteHost: " + remoteHost);

      dbt = HibernateUtil.initDbToolNew();

      String groups_id = req.getParameter("GROUPS_ID");

      StringBuffer err = new StringBuffer();

      if(groups_id == null) err.append("Пустой параметр GROUPS_ID \n");
      if(err.length() > 0) throw new Exception(err.toString());

      String[] g_id = groups_id.split(",");
      StringBuffer w1 = new StringBuffer();
      StringBuffer nmw1 = new StringBuffer();
      stPack stw1 = new stPack();

      for (int i = 0; i < g_id.length; i++) {
        if(g_id[i].length() > 0) {
          stw1.setObject(0, "W" + i, g_id[i]);
          if(i > 0) {
            w1.append(",");
            nmw1.append(",");
          }
          nmw1.append("W" + i);
          w1.append("?");
        }
      }
      String w01 = w1.toString();
      String nmw01 = nmw1.toString();

      stPack st = new stPack();
      stw1.setPack(0,st);

      dbt.read(st, String.format(Select.getSqlFile("boardtalk/uns_group_list"), w01, w01), stw1, 0, nmw01 + "," + nmw01);
      dbt.readChildData(st, "children", String.format(Select.getSqlFile("boardtalk/uns_list"), w01, w01), -1,
        nmw01 + "," + nmw01 + ",GROUP_ID");

      log.debug(stw1.getForm(0));

      jsonStore jst = new jsonStore(st, st.getRowCount(), true);

      byte[] mb = jst.toString().getBytes(StandardCharsets.UTF_8);
      resp.setCharacterEncoding(StandardCharsets.UTF_8.name());
      resp.setContentType("application/json");
      resp.setContentLength(mb.length);
      ServletOutputStream strim = resp.getOutputStream();
      strim.write(mb);
      strim.flush();

    } catch (Exception ex2) {
      log.error("Error", ex2);

      ObjectMapper mapper = new ObjectMapper();
      ObjectNode nd = mapper.createObjectNode();
      nd.put("success", false);
      nd.put("err", ex2 != null && ex2.getMessage() != null ? ex2.getMessage(): "null");

      byte[] mb = nd.toString().getBytes(StandardCharsets.UTF_8);
      resp.setCharacterEncoding(StandardCharsets.UTF_8.name());
      resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      resp.setContentType("application/json");
      resp.setContentLength(mb.length);
      ServletOutputStream strim = resp.getOutputStream();
      strim.write(mb);
      strim.flush();
    } finally {
      if (dbt != null) dbt.close();
    }
  }

  public void init(ServletConfig arg0) throws ServletException {
    super.init(arg0);
  }

}
