package com.isc.boardtalk.servlet;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.sql.Select;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.isc.boardtalk.BoardTalkConfig;
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
public class messageList extends HttpServlet implements Servlet {
  private final Logger log = Logger.getLogger(messageList.class);

  // messageList?PACK_DOC_HID=1&DOC_NAME=Z&DOC_HID=1
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    dbTool dbt = null;

    try {
      String remoteHost = req.getRemoteHost();
      log.debug("remoteHost: " + remoteHost);

      dbt = HibernateUtil.initDbToolNew();

      String pack_doc_hid = req.getParameter("PACK_DOC_HID");
      String doc_name = req.getParameter("DOC_NAME");
      String doc_hid = req.getParameter("DOC_HID");
      String un = req.getParameter("UN");


      StringBuffer err = new StringBuffer();

      if(pack_doc_hid == null) err.append("Пустой параметр PACK_DOC_HID \n");
      if(doc_name == null) err.append("Пустой параметр DOC_NAME \n");
      if(doc_hid == null) err.append("Пустой параметр DOC_HID \n");

      if(err.length() > 0) throw new Exception(err.toString());

      String sskipRow = req.getParameter("start");
      String srowCount = req.getParameter("limit");
      int skipRow = 0;
      int rowCount = 10;
      if(sskipRow != null && sskipRow.length() > 0) skipRow = Integer.parseInt(sskipRow);
      if(srowCount != null && srowCount.length() > 0) rowCount = Integer.parseInt(srowCount);

      stPack st = new stPack();
      stPack st2 = new stPack();
      typesAndValues tv = new typesAndValues().add(Types.NUMERIC, pack_doc_hid).add(Types.CHAR, doc_name).add(Types.NUMERIC, doc_hid);
//      dbt.read(st, "SELECT * FROM BOARDTALK WHERE PACK_DOC_HID=? AND DOC_NAME=? AND DOC_HID=? ORDER BY DATTR desc", tv, skipRow, rowCount);
      dbt.read(st, Select.getSqlFile("boardtalk/message_list"), tv);
      dbt.read(st2, Select.getSqlFile("boardtalk/message_list_count"), tv);

      log.debug(tv);

      
      if(un != null) {
        String clnm3 = "PACK_DOC_HID,DOC_NAME,DOC_HID,UN";
        stPack st3 = new stPack();
        tv.add(Types.CHAR, un);
        st3.initAndImport(clnm3, tv);
//        dbt.update("UPDATE BOARDTALK_NEW_MESS SET NEW_COUNT = 0 WHERE PACK_DOC_HID=? AND DOC_NAME=? AND DOC_HID=? AND UN=?", st3, 0, clnm3);
        dbt.delete(st3, 0, clnm3, BoardTalkConfig.tableBoardNewMess);
      }

      

      dbt.commit();

      jsonStore jst = new jsonStore(st, ((Number)st2.getObject(0,0)).intValue());

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
