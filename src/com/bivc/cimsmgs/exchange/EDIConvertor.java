package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.db.BIftminLog;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.hibernate.HibernateException;
import org.hibernate.Session;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.regex.Pattern;

public abstract class EDIConvertor extends Convertor {

  protected static final String pl = "\\+";
  protected static final String dd = ":";
  protected static final String rd = "#@#";
  protected static final String ed = "\\{!\\}";
  protected static final String nl = "'\r\n";
  protected static final String ms = "?";
  protected static final SimpleDateFormat dunb  = new SimpleDateFormat("yyMMddHHmm");
  protected static final SimpleDateFormat df203 = new SimpleDateFormat("yyyyMMddHHmm");
  protected static final SimpleDateFormat df204 = new SimpleDateFormat("yyyyMMddHHmmss");
  protected static final SimpleDateFormat dg16   = new SimpleDateFormat("MM-dd-HH");
  protected static final Pattern prin_p = Pattern.compile("^[a-zA-Z]{4}");
  protected static final Pattern nkon_p = Pattern.compile("[0-9]{7,9}$");
  protected static final Pattern prinnkon_p = Pattern.compile("^[a-zA-Z]{4}[0-9]{7,9}$");
  protected static final Pattern UNH = Pattern.compile("UNH\\+.{1,14}\\+.{1,6}(:|\\+)");

  protected static final BigDecimal TWO = new BigDecimal(2);
  protected static final BigDecimal THREE = new BigDecimal(3);

  protected EdiDir ediDir;
  protected String recipient = "IRC.RW.BY";

  public EDIConvertor() {
  }

  public EDIConvertor(String script, EdiDir ediDir) throws Exception {
    this.ediDir = ediDir;
    readCfg(script);
  }

  private void readCfg(String script) throws Exception {
    SAXReader reader = new SAXReader(true);
    Document document = reader.read(script);

    String s = document.valueOf("/script/action[@name='send' and @direction='" + ediDir.getDirName() + "']/@recipient");
    if (StringUtils.isNotBlank(s))
      recipient = s;

    List list = document.selectNodes("/script/action[@name='send' and @direction='" + ediDir.getDirName() + "']");
    for (Object aList : list) {
      Element el = (Element) aList;
      sTr = getTransport(el.selectSingleNode("transport"));
    }

    list = document.selectNodes("/script/action[@name='receive' and @direction='" + ediDir.getDirName() + "']");
    for (Object aList : list) {
      Element el = (Element) aList;
      rTr = getTransport(el.selectSingleNode("transport"));
    }

  }

  abstract void sendIftmin(Long csId) throws Exception;

  abstract void sendInvoice(Long cs_hid) throws Exception;

  abstract void receive() throws Exception;

  protected void saveLog(Session session, long id, String mesName, String text, Long hid_src) throws HibernateException {
    BIftminLog bean = new BIftminLog();
    bean.setId(String.valueOf(id));
    bean.setText(text);
    bean.setSrc("CIMSMGS");
    bean.setMes_name(mesName);
    bean.setHid_src(hid_src);
    bean.setCod_dir(ediDir.getDirName());
    bean.setDir("O");
    session.save(bean);
  }

  public enum EdiDir {

    BCH("bch", "status", (byte)24, (byte)38, "") {
    },

    BTLC("btlc", "btlc_status", (byte)41, (byte)43, "2") {
    },

    DB("db", "db_status", (byte)41, (byte)43, "2") {
    };

    private String dirName;
    private String statusCol;
    private Byte goodStatus;
    private Byte badStatus;
    private String suffix;

    private EdiDir(String dirName, String statusCol, Byte g_status, Byte b_status, String suffix) {
      this.dirName = dirName;
      this.statusCol = statusCol;
      this.goodStatus = g_status;
      this.badStatus = b_status;
      this.suffix = suffix;
    }

    String getDirName() {
      return this.dirName;
    }

    String getStatusCol() {
      return statusCol;
    }

    Byte getGoodStatus() {
      return goodStatus;
    }

    Byte getBadStatus() {
      return badStatus;
    }

    String getSuffix() {
      return suffix;
    }
  }
}
