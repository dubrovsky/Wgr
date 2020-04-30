package com.isc.boardtalk.thread;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.isc.boardtalk.BoardTalkConfig;
import com.isc.utils.dbStore.*;
import com.isc.utils.mail.TurnMailMessage;
import com.isc.utils.mail.storeMessage;
import org.apache.log4j.Logger;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import java.sql.Types;
import java.util.Date;

/**
 * Created by vva on 02.10.14.
 */
public class mailCheck {
  private static final Logger log = Logger.getLogger(mailCheck.class);
  private long sleep = 1000 * 60 * BoardTalkConfig.periodInMinute;
  private Thread checkProcess = null;

  public mailCheck() throws Exception {
    checkProcess = new Thread(new CheckProcess());
    checkProcess.start();
    log.debug("isAlive: " + checkProcess.isAlive());
  }

  public void stop() throws Exception {
    stop_p = true;
    int i = 0;
    checkProcess.interrupt();
    Thread.sleep(100);
    while(checkProcess.isAlive() && i < 10) {
      Thread.sleep(2000);
      i++;
    }
    checkProcess.join();
    log.debug("isAlive: " + checkProcess.isAlive());
  }

  private static boolean stop_p = false;

  public void check(boolean manual) {
    storeMessage stm = null;
    dbTool dbt = null;

    try {
      stm = BoardTalkConfig.mlt.getNewMail();
        log.debug("messageCount: " + stm.getMessageCount());
      if(stm.getMessageCount() > 0) {
        dbt = HibernateUtil.initDbToolNew();
        dbPaketTool dbpt = new dbPaketTool(dbt);
        stPack st = new stPack();
        stPack st01 = new stPack();
        if(BoardTalkConfig.board_info == null) {
          dbt.read(st, "SELECT * FROM BOARDTALK WHERE 1=0", null);
          BoardTalkConfig.board_info = st.info;
        }
        else {
          st.info = BoardTalkConfig.board_info;
        }

        for (int ii = 0; ii < stm.getMessageCount(); ii++) {
          try {
            st.eraseData();
            String b = stm.getBodyText(ii);
//            Date d = new Date();
            Message m = stm.getMessage(ii);

            String subj = m.getSubject();
            String t[] = subj.split("##");
            log.debug(subj);

            b = b.split(BoardTalkConfig.breaking_pattern)[0];
            log.debug("BodyText: \n" + b);

            if(t.length < 9) {
              log.warn("Wrong subject mail");
            }
            else if (subj.startsWith("Undeliverable:")) {
              log.warn("Undeliverable: EMAILID = " + t[3]);
            }
            else {

              st.setObject(0,"UN", t[7]);
              st.setObject(0,"PACK_DOC_HID",  t[2]);
              st.setObject(0,"DOC_NAME", t[3]);
              st.setObject(0,"DOC_HID", t[4]);
              String table_name = t[5];
              String uns = t[6];
              String nam_klient;
              dbt.read(st01, "SELECT IFNULL(NAM_KLIENT,UN) AS NAM_KLIENT FROM USR WHERE UN=?", st, 0,"UN");
              st.setObject(0,"NAM_KLIENT", nam_klient = (String) st01.getObject(0, "NAM_KLIENT"));
              st.setObject(0,"CONTENT",  b);
              st.setObject(0,"DATTR",  new Date());

              sequenceFields sq = new sequenceFields().addSequence("HID", "BOARDTALK_HID");
              dbpt.fillSequence(sq, st);

              st.setObject(0,"TO_UN",   t[1]);
              st01.eraseData();
              dbt.read(st01, "SELECT IFNULL(NAM_KLIENT,UN) AS NAM_KLIENT FROM USR WHERE UN=?", st, 0,"TO_UN");
              st.setObject(0,"TO_NAM_KLIENT",   st01.getObject(0, "NAM_KLIENT"));
              st.setObject(0,"PHID",   t[8]);

              if(b == null || b.trim().length() == 0) {
                if(t.length < 6) log.warn("Empty mail message");
              }
              else {
                dbt.insert(st, BoardTalkConfig.tableBoard);
                stPack st2 = new stPack();
                dbt.read(st2, "SELECT count(*) AS MESS_COUNT, ? AS HID FROM BOARDTALK WHERE PACK_DOC_HID=? AND DOC_NAME=? AND DOC_HID=?", st, 0, "DOC_HID,PACK_DOC_HID,DOC_NAME,DOC_HID");
                dbt.update("UPDATE " + table_name + " SET MESS_COUNT=? WHERE HID=?", st2, 0, "MESS_COUNT,HID");

                log.debug(st);

                  // Рассылка сообщения пользователям
                  if(uns != null) {
                      String[] unss = uns.split("\\s?,\\s?");
                      StringBuffer w1 = new StringBuffer();
                      typesAndValues tv = new typesAndValues().add(Types.NUMERIC, st.getObject(0, "HID")).add(Types.CHAR, t[7]);
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

                      stPack stmm = new stPack();
                      dbt.read(stmm, "SELECT UN,IFNULL(NAM_KLIENT,UN) AS NAM_KLIENT,EMAIL FROM USR WHERE UN IN (" + w1 + ")", tv);

                      tv = new typesAndValues().add(Types.CHAR, t[3]);
                      stPack std = new stPack();
                      dbt.read(std, "SELECT DESCR FROM DOC_DIR WHERE NAME = ?", tv);

                      StringBuffer subj2 = new StringBuffer();
                      subj2.append(std.getObject(0, "DESCR"));
                      subj2.append(" - ");
                      subj2.append(nam_klient);
                      subj2.append("  ##");
                      subj2.append(t[7]); // un
                      subj2.append("##");
                      subj2.append(t[2]); // pack_doc_hid
                      subj2.append("##");
                      subj2.append(t[3]); // doc_name
                      subj2.append("##");
                      subj2.append(t[4]); // doc_hid
                      subj2.append("##");
                      subj2.append(table_name);
                      subj2.append("##");
                      subj2.append(uns);

                      StringBuffer rec = new StringBuffer();
                      for (int i = 0; i < stmm.getRowCount(); i++) {
                          String email = stmm.getTxt(i,"EMAIL");
                          if(email.indexOf('@') != -1) {
                              rec.append(email);
                              rec.append("\n");
                          }
                      }
                      String cb = b + BoardTalkConfig.breaking + "От: " + "\n" + nam_klient + "\n\nДля: \n" + rec;
                      for (int i = 0; i < stmm.getRowCount(); i++) {
                          String email = stmm.getTxt(i,"EMAIL");
                          if(email.indexOf('@') != -1) {
                              log.debug("to: " + stmm.getTxt(i,"EMAIL") + ", subj: " + subj);
                              try {
                                  TurnMailMessage tmm = new TurnMailMessage(
                                    BoardTalkConfig.mlt,subj2 + "##" + stmm.getTxt(i,"UN") + "##" + st.getTxt(0,"HID"), cb, email, nam_klient + " <" + BoardTalkConfig.mailFrom + ">", null
                                  );
                              }
                              catch (Exception ex2) {
                                  log.error("error", ex2);
                              }
//            BoardTalkConfig.mlt.sendMail(email, subj + "##" + stmm.getTxt(i,"UN") + "##" + st.getTxt(0,"HID"), cb, true, null, nam_klient + " <" + BoardTalkConfig.mailFrom + ">", null);
                          }
                      }

                      // Непрочитанные сообщения
                      stPack st3 = new stPack();
                      st3.setKeyName("PACK_DOC_HID,DOC_NAME,DOC_HID,UN");
                      for (int i = 0; i < stmm.getRowCount(); i++) {
                          if(!stmm.getObject(i,"UN").equals(t[7])) {
                              st3.eraseData();
                              st.setObject(0,"UN", stmm.getObject(i,"UN"));
                              dbt.read(st3, "SELECT * FROM BOARDTALK_NEW_MESS WHERE PACK_DOC_HID=? AND DOC_NAME=? AND DOC_HID=? AND UN=?", st, 0, "PACK_DOC_HID,DOC_NAME,DOC_HID,UN");
                              if(st3.getRowCount() == 0) {
                                  st3.setObject(0,"PACK_DOC_HID",  t[2]);
                                  st3.setObject(0,"DOC_NAME", t[3]);
                                  st3.setObject(0,"DOC_HID", t[4]);
                                  st3.setObject(0,"UN", stmm.getObject(i,"UN"));
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

              }

            }

          } catch (Exception ex1) {
            log.error("error", ex1);
          } finally {
            // Удаление письма
            stm.delMessage(ii);
          }
        }
      }
    }
    catch (Exception ex) {
      log.error("Error", ex);
    } finally {
      if (stm != null) stm.close();
      if (dbt != null) dbt.close();
    }

  }

  private int run_i = 0;
  private class CheckProcess implements Runnable {

    public void run() {
      try {
        log.info("checkPeriod process RUN");
        while (!stop_p) {
          try {

            check(false);

          }
          catch (Exception ex) {
            log.error("Error", ex);
          }

          if(run_i < 60) {
            run_i ++;
          }
          else {
            log.debug("run .. ");
            run_i = 0;
          }

          try {
            Thread.sleep(sleep);
          } catch (Exception exxx) {}

        }
        log.info("checkPeriod process STOP");
      } catch (Exception e) {
        log.error("Error checkPeriod, process STOP", e);
      }
    }
  }
}
