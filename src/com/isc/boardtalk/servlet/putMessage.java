package com.isc.boardtalk.servlet;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.sql.Select;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.isc.boardtalk.BoardTalkConfig;
import com.isc.utils.dbStore.*;
import com.isc.utils.mail.TurnMailMessage;
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
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: vva
 * Date: 17.06.13
 * Time: 11:45
 * To change this template use File | Settings | File Templates.
 */
public class putMessage extends HttpServlet implements Servlet {
  private final Logger log = Logger.getLogger(putMessage.class);


  // putMessage?PACK_DOC_HID=1&DOC_NAME=Z&DOC_HID=1&UN=Q&UNS=t1,t2,t3&CONTENT=йцук&TABLE_NAME=ИМЯ_ТАБЛИЦЫ
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    dbTool dbt = null;

    try {
      String remoteHost = req.getRemoteHost();
      log.debug("remoteHost: " + remoteHost);

      dbt = HibernateUtil.initDbToolNew();
      dbPaketTool dbpt = new dbPaketTool(dbt);

      stPack st = new stPack();
      stPack st01 = new stPack();
      stPack st2 = new stPack();
      stPack stm = new stPack();

      if(BoardTalkConfig.board_info == null) {
        dbt.read(st, "SELECT * FROM BOARDTALK WHERE 1=0", null);
        BoardTalkConfig.board_info = st.info;
      }
      else {
        st.info = BoardTalkConfig.board_info;
      }

      String pack_doc_hid = req.getParameter("PACK_DOC_HID");
      String doc_name = req.getParameter("DOC_NAME");
      String doc_hid = req.getParameter("DOC_HID");
      String un = req.getParameter("UN");
      String nam_klient; // = req.getParameter("NAM_KLIENT");
      String uns = req.getParameter("UNS");
      String content = req.getParameter("CONTENT");
      String table_name = req.getParameter("TABLE_NAME");
      String send_mail = req.getParameter("SEND_MAIL");

      StringBuffer err = new StringBuffer();

      if(pack_doc_hid == null) err.append("Пустой параметр PACK_DOC_HID \n");
      if(doc_name == null) err.append("Пустой параметр DOC_NAME \n");
      if(doc_hid == null) err.append("Пустой параметр DOC_HID \n");
      if(un == null) err.append("Пустой параметр UN \n");
//      if(nam_klient == null) err.append("Пустой параметр NAM_KLIENT \n");
//      if(uns == null) err.append("Пустой параметр UNS \n");
      if(content == null) err.append("Пустой параметр CONTENT \n");
      if(table_name == null) err.append("Пустой параметр TABLE_NAME \n");

      if(err.length() > 0) throw new Exception(err.toString());

      st.setObject(0,"PACK_DOC_HID",  pack_doc_hid);
      st.setObject(0,"DOC_NAME", doc_name);
      st.setObject(0,"DOC_HID", doc_hid);
      st.setObject(0,"UN", un);
      dbt.read(st01, "SELECT NAM_KLIENT FROM USR WHERE UN=?", st, 0,"UN");
      st.setObject(0,"NAM_KLIENT", nam_klient = (String) st01.getObject(0, "NAM_KLIENT"));
      st.setObject(0,"CONTENT",  content);
      st.setObject(0,"DATTR",  new Date());

      sequenceFields sq = new sequenceFields().addSequence("HID", "BOARDTALK_HID");
      dbpt.fillSequence(sq, st);

      dbt.insert(st, BoardTalkConfig.tableBoard);
      dbt.read(st2, "SELECT count(*) AS MESS_COUNT, ? AS HID FROM BOARDTALK WHERE PACK_DOC_HID=? AND DOC_NAME=? AND DOC_HID=?", st, 0, "DOC_HID,PACK_DOC_HID,DOC_NAME,DOC_HID");
      dbt.update("UPDATE " + table_name + " SET MESS_COUNT=? WHERE HID=?", st2, 0, "MESS_COUNT,HID");

      log.debug(st);

      // Рассылка сообщения пользователям
      if(uns != null) {
        String[] unss = uns.split("\\s?,\\s?");
        StringBuffer w1 = new StringBuffer();
        typesAndValues tv = new typesAndValues().add(Types.NUMERIC, st.getObject(0, "HID")).add(Types.CHAR, un);
        for (int i = 0; i < unss.length; i++) {
          if(unss[i].length() > 0) {
            tv.add(Types.CHAR, unss[i]);
            if(i > 0) w1.append(",");
            w1.append("?");
          }
        }

        // Кому
        stPack sttoun = new stPack();
        dbt.read(sttoun, "SELECT ? AS HID_BT,UN AS TO_UN,IFNULL(NAM_KLIENT,UN) AS TO_NAM_KLIENT FROM USR WHERE UN != ? AND UN IN (" + w1 + ")", tv);
        dbt.insert(sttoun, BoardTalkConfig.tableBoardToUn);

        tv.remove(0);
        tv.remove(0);
        uns += "," + un;
        tv.add(Types.CHAR, un);
        w1.append(",?");

        dbt.read(stm, "SELECT UN,IFNULL(NAM_KLIENT,UN) AS NAM_KLIENT,EMAIL FROM USR WHERE UN IN (" + w1 + ") ", tv);


        if(send_mail != null && send_mail.equals("1")) {
          tv = new typesAndValues().add(Types.CHAR, doc_name);
          stPack std = new stPack();
          dbt.read(std, "SELECT DESCR FROM DOC_DIR WHERE NAME = ?", tv);

          StringBuffer subj = new StringBuffer();
          subj.append(std.getObject(0, "DESCR"));
          subj.append(" - ");
          subj.append(nam_klient);
          subj.append("  ##");
          subj.append(un);
          subj.append("##");
          subj.append(pack_doc_hid);
          subj.append("##");
          subj.append(doc_name);
          subj.append("##");
          subj.append(doc_hid);
          subj.append("##");
          subj.append(table_name);
          subj.append("##");
          subj.append(uns);

          StringBuffer rec = new StringBuffer();
          for (int i = 0; i < stm.getRowCount(); i++) {
            String email = stm.getTxt(i,"EMAIL");
            if(email.indexOf('@') != -1) {
              rec.append(email);
              rec.append("\n");
            }
          }
          String cb = content + BoardTalkConfig.breaking + "От: " + "\n" + nam_klient + "\n\nДля: \n" + rec;
          for (int i = 0; i < stm.getRowCount(); i++) {
            String email = stm.getTxt(i,"EMAIL");
            if(email.indexOf('@') != -1) {
              log.debug("to: " + stm.getTxt(i,"EMAIL") + ", subj: " + subj);
              TurnMailMessage tmm = new TurnMailMessage(
                BoardTalkConfig.mlt,subj + "##" + stm.getTxt(i,"UN") + "##" + st.getTxt(0,"HID"), cb, email, nam_klient + " <" + BoardTalkConfig.mailFrom + ">", null
              );
//            BoardTalkConfig.mlt.sendMail(email, subj + "##" + stm.getTxt(i,"UN") + "##" + st.getTxt(0,"HID"), cb, true, null, nam_klient + " <" + BoardTalkConfig.mailFrom + ">", null);
            }
          }
        }
      }

      // Непрочитанные сообщения
      if(uns != null) {
        stPack st3 = new stPack();
        st3.setKeyName("PACK_DOC_HID,DOC_NAME,DOC_HID,UN");
        for (int i = 0; i < stm.getRowCount(); i++) {
          if(!stm.getObject(i,"UN").equals(un)) {
            st3.eraseData();
            st.setObject(0,"UN", stm.getObject(i,"UN"));
            dbt.read(st3, "SELECT * FROM BOARDTALK_NEW_MESS WHERE PACK_DOC_HID=? AND DOC_NAME=? AND DOC_HID=? AND UN=?", st, 0, "PACK_DOC_HID,DOC_NAME,DOC_HID,UN");
            if(st3.getRowCount() == 0) {
              st3.setObject(0,"PACK_DOC_HID",  pack_doc_hid);
              st3.setObject(0,"DOC_NAME", doc_name);
              st3.setObject(0,"DOC_HID", doc_hid);
              st3.setObject(0,"UN", stm.getObject(i,"UN"));
            }
            st3.setObject(0,"DATTR",  st.getObject(0,"DATTR"));
            Object new_count = st3.getObject(0,"NEW_COUNT");
            if(new_count != null) {
              new_count = new Integer(((Number)new_count).intValue() + 1);
            }
            else {
              new_count = new Integer(1);
            }
            st3.setObject(0,"NEW_COUNT",  new_count);
            dbt.save(BoardTalkConfig.tableBoardNewMess, st3, 0, null);
          }
        }
      }


      dbt.commit();

      ObjectMapper mapper = new ObjectMapper();
      ObjectNode nd = mapper.createObjectNode();
      nd.put("success", true);
      nd.put("DATTR", st.getTxt(0,"DATTR"));

      byte[] mb = nd.toString().getBytes(StandardCharsets.UTF_8);
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
