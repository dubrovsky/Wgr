package com.bivc.cimsmgs.exchange;

import ch.qos.logback.classic.Logger;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.Route;
import com.bivc.typeexchange.Row;
import com.bivc.typeexchange.Table;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.engine.SessionImplementor;
import org.hibernate.jdbc.Batcher;
import org.slf4j.LoggerFactory;
import sun.misc.BASE64Encoder;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class DocUnloader extends Convertor {

  private static final Charset Encoding = StandardCharsets.UTF_8;
  private static final SimpleDateFormat dateTimeFormater = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");
//  private static final SimpleDateFormat CustomDateFormater = new SimpleDateFormat("yyyy-MM-dd");
  private static Logger log = (Logger)LoggerFactory.getLogger(DocUnloader.class);
//  private static Pattern tpPattern = Pattern.compile("[0-9]{8}");
//  private static Pattern prin_p = Pattern.compile("^[a-zA-Z]{4}");
//  private static Pattern nkon_p = Pattern.compile("[0-9]{7,9}$");

  public DocUnloader(String script) {
    try {
      SAXReader reader = new SAXReader(true);
      Document document = reader.read(script);

      @SuppressWarnings("unchecked")
      List<Element> list = document.selectNodes("/script/action[@name='send' and @direction='gr']");
      for (Element el : list) {
        sTr = getTransport(el.selectSingleNode("transport"));
      }

    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
    }
  }

  public DocUnloader() {
  }

  public Long[] sendXML(String npoezd, Route route, Byte type) throws Exception {
    ArrayList<Long> res = new ArrayList<>();
    HibernateUtil.beginTransaction();

    try {
      Session session = HibernateUtil.getSession();
      @SuppressWarnings("unchecked")
      List<Long> hidList = session.createQuery("SELECT cs.hid FROM CimSmgs AS cs WHERE cs.npoezd=:p AND cs.route=:r AND cs.type=:t AND (cs.kind<>1 or cs.kind is null)")
              .setString("p", npoezd)
              .setParameter("r", route)
              .setByte("t", type)
              .list();
      for (Long csId : hidList) {
        String text = getText(csId);

        sTr.put("wgr2gr" + csId + ".xml", text);

        Query q = session.createQuery("UPDATE CimSmgs cs SET cs.ftsStatus='49' WHERE cs.hid=:id");
        q.setLong("id", csId);
        q.executeUpdate();

        sTr.flush();
        res.add(csId);
      }

      HibernateUtil.commitTransaction();
    }
    catch (Exception ex) {
      HibernateUtil.rollbackTransaction();
      throw ex;
    }
    return res.toArray(new Long[0]);
  }

  public void sendXML(Long csHid) throws Exception {
    HibernateUtil.beginTransaction();

    try {
      String text = getText(csHid);

      sTr.put("wgr2gr" + csHid + ".xml", text);

      sTr.flush();

      HibernateUtil.commitTransaction();
    }
    catch (Exception ex) {
      HibernateUtil.rollbackTransaction();
      throw ex;
    }
  }

  public String getTextEncoded(Long csHid) throws Exception {
    String text = getText(csHid);
    BASE64Encoder enc = new BASE64Encoder();
    return enc.encode(text.getBytes(Encoding));
  }

  public String getText(Long csHid) throws Exception {
    String res;
    String hidStr = String.valueOf(csHid);

    Table tab1 = processRequest("SELECT * FROM CIM_SMGS WHERE hid=" + hidStr);
    if (tab1.rowCount() > 0) {
      String hidPack = tab1.getElementAt(0, "hid_pack");
      Document doc = DocumentHelper.createDocument();
      doc.setXMLEncoding(Encoding.name());
      Element docRoot = doc.addElement("doc");
      tab1.removeColumn(new String[] {"IFTMIN_ID", "IFTMIN_OUT", "IFTMIN_IN"});
      addTable2Document(docRoot, tab1, "cim_smgs");

      Table tab2 = processRequest("SELECT * FROM CIM_SMGS_DOCS WHERE hid_cs=" + hidStr);
      addTable2Document(docRoot, tab2, "cim_smgs_docs");

      Table tab8 = processRequest("SELECT * FROM CIM_SMGS_PLATEL WHERE hid_cs=" + hidStr);
      addTable2Document(docRoot, tab8, "cim_smgs_platel");

      Table tab11 = processRequest("SELECT * FROM CIM_SMGS_PEREVOZ WHERE hid_cs=" + hidStr);
      addTable2Document(docRoot, tab11, "cim_smgs_perevoz");

      Table tab3 = processRequest("SELECT * FROM CIM_SMGS_CAR_LIST WHERE hid_cs=" + hidStr);
      addTable2Document(docRoot, tab3, "cim_smgs_car_list");

      Table tab4 = processRequest("SELECT * FROM CIM_SMGS_KON_LIST WHERE " + makeHidStr(tab3, "hid_car"));
      addTable2Document(docRoot, tab4, "cim_smgs_kon_list");

      Table tab5 = processRequest("SELECT * FROM CIM_SMGS_GRUZ WHERE " + makeHidStr(tab3, "hid_car") + " OR " + makeHidStr(tab4, "hid_kon"));
      addTable2Document(docRoot, tab5, "cim_smgs_gruz");

      Table tab6 = processRequest("SELECT * FROM CIM_SMGS_PLOMB WHERE hid_cs=" + hidStr + " OR " + makeHidStr(tab3, "hid_car") + " OR " + makeHidStr(tab4, "hid_kon"));
      addTable2Document(docRoot, tab6, "cim_smgs_plomb");

      Table tab9 = processRequest("SELECT * FROM CIM_SMGS_INVOICE WHERE hid_pack=" + hidPack);
      tab6.removeColumn(new String[] {"INVOIC_ID", "INVOIC_OUT", "INVOIC_IN"});
      addTable2Document(docRoot, tab9, "cs_invoice");

      if (tab9.rowCount() > 0) {
        Table tab10 = processRequest("SELECT * FROM CIM_SMGS_INVOICE_GRUZ WHERE " + makeHidStr(tab9, "hid_csinv"));
        addTable2Document(docRoot, tab10, "cs_invoice_gruz");
      }

      res = doc.asXML();
    }
    else {
      throw new Exception("Документ не найден ");
    }

    return res;
  }

  private Table processRequest(String query) {
//    if(log.isDebugEnabled()) log.debug("query = " + query);
    Session session;
    String[] fields = null;
    String[] fieldTypes = null;
    String[] row;
    ArrayList<Row> rows = new ArrayList<>();

    try {
      session = HibernateUtil.getSession();
//      @SuppressWarnings("deprecation")
//      Statement stm = session.connection().createStatement();
//      ResultSet results = stm.executeQuery(query);
      Batcher batcher = ((SessionImplementor) session).getBatcher();
      PreparedStatement pst = batcher.prepareSelectStatement(query);
      ResultSet results = pst.executeQuery();

      ResultSetMetaData md = results.getMetaData();
      int resSize = md.getColumnCount();

      fields = new String[resSize];
      fieldTypes = new String[resSize];

      for(int i = 0; i < resSize; i++)  {
        fields[i] = md.getColumnName(i + 1);
        fieldTypes[i] = md.getColumnTypeName(i + 1);

        int sizeType = 0;
        int scaleType = 0;
        if(!fieldTypes[i].equals("CLOB") && !fieldTypes[i].endsWith("TEXT") && !fieldTypes[i].endsWith("BLOB")) {
          sizeType = md.getPrecision(i + 1);
          scaleType = md.getScale(i + 1);
          if(sizeType == 0)
            sizeType = 20;
        }

        if(fieldTypes[i].startsWith("DATE") || fieldTypes[i].equals("TIMESTAMP")) {
          fieldTypes[i] = "T";
        }
        else if(fieldTypes[i].equals("NUMBER") || fieldTypes[i].equals("DECIMAL") || fieldTypes[i].equals("INTEGER") ||
                fieldTypes[i].endsWith("INT") || fieldTypes[i].endsWith("INT UNSIGNED") ||
                fieldTypes[i].endsWith("DECIMAL UNSIGNED") || fieldTypes[i].endsWith("DOUBLE")) {
// Исправить рассчет длины дробной части
          fieldTypes[i] = "N(" + (Math.min(sizeType, 20)) + (scaleType > 0 ? "," + (Math.min(scaleType, 5)) : "") + ")";
        }
        else if(fieldTypes[i].startsWith("VARCHAR") || fieldTypes[i].equals("CHAR")) {
          if(sizeType > 250) {
            fieldTypes[i] = "M(" + sizeType + ")";
          }
          else {
            fieldTypes[i] = "C(" + sizeType + ")";
          }
        }
        else if(fieldTypes[i].startsWith("LONG")) {
          fieldTypes[i] = "M";
        }
        else if(fieldTypes[i].startsWith("CLOB")) {
          fieldTypes[i] = "M";
        }
      }

      while(results.next()) {
        row = new String[resSize];
        for(int i = 0; i < resSize; i++) {
          Object ob;
          if(fieldTypes[i].equals("T")) {
            ob = results.getTimestamp(i + 1);
          }
          else {
            ob = results.getObject(i + 1);
          }

          if (ob == null || ob.equals("")) {
            row[i] = "";
          }
          else if (fieldTypes[i].equals("T")) {
            row[i] = dateTimeFormater.format(ob);
          }
          else if (ob instanceof java.sql.Clob) {
            StringBuilder str = new StringBuilder();
            Reader clobReader = results.getCharacterStream(i + 1);
            if (clobReader != null) {
              BufferedReader bufferedClobReader = new BufferedReader(clobReader);
              try {
                char[] c = new char[1];
                while ( ( bufferedClobReader.read(c)) != -1)
                  str.append(c);
                bufferedClobReader.close();
              }
              catch (IOException e) {
                throw new SQLException(e.toString());
              }
            }
            row[i] = str.toString();
          }
          else {
            row[i] = ob.toString();
          }
        }

        rows.add(new Row(row));
      }
      results.close();
//      stm.close();
      batcher.closeStatement(pst);
    }
    catch(Exception e) {
      log.error(e.getMessage(), e);
    }

    return new Table(fields, fieldTypes, rows.toArray(new Row[0]));
  }

  private Element addTable2Document(Element docRoot, Table tab, String tableName) {
    String[] colNamesg = tab.getColumnNames();
    for (int i = 0; i < tab.rowCount(); i++) {
      Element tabElement = docRoot.addElement(tableName);
      for (int j = 0; j < tab.columnCount(); j++) {
        tabElement.addElement(colNamesg[j].toLowerCase()).addText(tab.getElementAt(i, j));
      }
    }
    return docRoot;
  }

  private String makeHidStr(Table tab, String name) {
    String res = "0=1";
    StringBuilder buf = new StringBuilder();
    for (int i = 0; i < tab.rowCount(); i++) {
      String hidStr = tab.getElementAt(i, "HID");
      if (StringUtils.isNotBlank(hidStr)) {
        buf.append(hidStr.trim()).append(",");
      }
    }
    if (buf.length() > 0) {
      res = name + " IN (" + buf.substring(0, buf.length() - 1) + ")";
    }
    return res;
  }

}
