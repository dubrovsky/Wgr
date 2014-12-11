package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import com.bivc.transport.MailTransport;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.InputSource;

import javax.mail.*;
import javax.mail.Flags.Flag;
import javax.mail.internet.ContentType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeUtility;
import java.io.*;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class TBCConvertor extends Convertor implements Comparator<Message> {

  final static private Logger log = LoggerFactory.getLogger(TBCConvertor.class);
  final static private Logger tlog = LoggerFactory.getLogger(MailTransport.class);

  private static String sender = "000";
  private static final String encoding = "utf-8";
  private static final String folder = "TBC_Failed";
  private static final String TRASH = "TRASH";
  private static final String PROCESSED = "PROCESSED";
  private static final DecimalFormat pnf = new DecimalFormat("000000000");
  private static final SimpleDateFormat df3 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

  private String pop3Server;
  private String pop3Account;
  private String pop3Password;
  private int pop3Port = 0;
  private boolean pop3Ssl;
  private boolean pop3Auth;

  private static TreeMap<String, String> subjs = new TreeMap<String, String>();

  static {
    subjs.put("VMIITDEX CFM", "3");
    subjs.put("VMIITDEX CFMВ", "4");
    subjs.put("VMIITDEX NOTCFMD", "5");
  }

  public TBCConvertor() {
  }

  public TBCConvertor(String script) {
    try {
      SAXReader reader = new SAXReader(true);
      Document document = reader.read(script);

      String s = document.valueOf("/script/action/@sender");
      if (StringUtils.isNotBlank(s))
        sender = s;

      List list = document.selectNodes("/script/action[@name='send' and @direction='tbc']");
      for (Iterator it = list.iterator(); it.hasNext(); ) {
        Element el = (Element) it.next();
        sTr = getTransport(el.selectSingleNode("transport"));
      }

      list = document.selectNodes("/script/action[@name='receive' and @direction='tbc']");
      if (list.size() > 0) {
        Element el = (Element) list.get(0);
        Node n = el.selectSingleNode("transport");

        pop3Server = n.valueOf("server/@host");
        tlog.debug("server=" + pop3Server);

        pop3Account = n.valueOf("server/@account");
        tlog.debug("account=" + pop3Account);

        pop3Password = n.valueOf("server/@password");
        tlog.debug("password=" + pop3Password);

        pop3Auth = pop3Account != null && pop3Account.trim().length() > 0;
        tlog.debug("auth=" + pop3Auth);

        String portStr = n.valueOf("server/@port");
        try {
          pop3Port = Integer.parseInt(portStr);
        } catch (Exception ex) {
          tlog.warn("Property \"port\" incorrect or not specified. Use default.");
        }
        tlog.debug("port=" + pop3Port);

        String sslStr = n.valueOf("server/@ssl");
        pop3Ssl = "true".equalsIgnoreCase(sslStr);
        tlog.debug("ssl=" + pop3Ssl);
      }

    } catch (Exception ex) {
      log.error(ex.getMessage(), ex);
    }
  }

  public String[] sendPackage(Long pdId, boolean file) throws Exception {
    Session session = null;
    Transaction tx = null;
    long messageId = -1;
    String text = null;
    String packageName = null;

    try {
//      session = HibernateUtil.getSessionFactory().openSession();
//      tx = session.beginTransaction();
      session = HibernateUtil.getSession();

      PackDoc pd = (PackDoc) session.get(PackDoc.class, pdId);
      if (pd != null) {
        CimSmgs cs = null;
        for (CimSmgs ccc : pd.getCimSmgses()) {
          Byte type = ccc.getType();
          if (type != null && (type == 1 || type == 2)) {
            cs = ccc;
            break;
          }
        }
        if (cs != null) {
          log.debug("Found document with HID=" + cs.getHid() + " and TYPE=" + cs.getType());
          packageName = cs.getTbcNomer();
          if (StringUtils.isBlank(packageName)) {
            messageId = prepareMessageId(session);
            String st_code = pd.getRoute().getTbc_st_code();
            if (StringUtils.isBlank(st_code)) {
              throw new Exception("Не задан идентификатор входной станции для маршрута " + pd.getRoute().getName());
            }
            packageName = sender + pnf.format(messageId) + "." + st_code;
          }

          //        Date curDate = new Date();
          text = getText(pd, packageName);
          log.debug(packageName + System.getProperty("line.separator") + text);

          TbcLog tl = new TbcLog();
          tl.setHid_src(pd.getHid());
          tl.setIn_out((byte) 2);
          tl.setXml(text);
          tl.setTbc_nomer(packageName);
          session.save(tl);

          if (messageId > 0) {
            String query = "UPDATE CimSmgs cs SET cs.tbcNomer=:a" + (!file ? ", cs.tbcStatus=1" : "") + " WHERE cs.hid=:id";
            Query q = session.createQuery(query);
            q.setString("a", packageName);
            q.setLong("id", cs.getHid());
            q.executeUpdate();
          }

          if (!file) {
            sTr.put(packageName, text);
            sTr.flush();
          }

          //        tx.commit();
        } else {
          throw new Exception("Перевозочный документ не найден (pd = " + pdId + ")");
        }
      }
    } catch (Exception e) {
      log.error(e.getMessage(), e);
//      tx.rollback();
//      session.clear();
      throw e;
    }
//    finally {
//      if (session != null) {
//        session.close();
//      }
//    }
    return new String[]{text, packageName};
  }

  protected String getText(PackDoc pd, String messageId) throws Exception {
    Document doc = DocumentHelper.createDocument();
    doc.setXMLEncoding(encoding);

    Element root = doc.addElement("Package")
      .addAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance")
      .addAttribute("xsi:noNamespaceSchemaLocation", "http://rail.ctm.ru/shema/Package.xsd")
      .addAttribute("InitialPackageName", format(messageId));

    CimSmgs cs = (CimSmgs) pd.getCimSmgses().iterator().next();

    if (!pd.getCsInvoices().isEmpty()) {
      Element inv = root.addElement("INVOICEPRIM");

      Iterator invIt = pd.getCsInvoices().iterator();
      while (invIt.hasNext()) {
        CimSmgsInvoice invOb = (CimSmgsInvoice) invIt.next();
        Element invItem = inv.addElement("INVOICEPRIM_ITEM");
        invItem.addElement("INVOICEDATE").addText(format(invOb.getDat_inv()));
        invItem.addElement("INVOICENO").addText(format(invOb.getInvoice()));
        invItem.addElement("CONTRACTNO").addText(format(invOb.getN_dog()));
        invItem.addElement("CONTRACTDATE").addText(format(invOb.getDat_dog()));
        invItem.addElement("GF2").addText(format(invOb.getNotd()));
        invItem.addElement("GF3").addText(format(invOb.getAdres_o()));
        invItem.addElement("_GF2").addText(format(invOb.getNpol()));
        invItem.addElement("_GF3").addText(format(invOb.getAdres_p()));
        invItem.addElement("G022").addText(format(invOb.getNsel()));
        invItem.addElement("G023").addText(format(invOb.getAdres_s()));
        invItem.addElement("G092").addText(format(invOb.getNbuy()));
        invItem.addElement("G093").addText(format(invOb.getAdres_b()));

        String abvCux = invOb.getCux();
        String kodCux = null;
        if (StringUtils.isNotBlank(abvCux)) {
          Query q = HibernateUtil.getSession().createQuery("select kod from NsiCurrency where deleted is null and abv3=:a");
          q.setString("a", abvCux);
          @SuppressWarnings("unchecked")
          Iterator<String> it = q.iterate();
          if (it.hasNext()) {
            kodCux = it.next();
            log.debug("Found CUX CODE = " + kodCux + " for " + abvCux);
          }
        }

        invItem.addElement("G221").addText(format(kodCux));
        invItem.addElement("VALABBR").addText(format(abvCux));
        Element goods = invItem.addElement("INVOICEDOP");

        byte n = 1;
        for (CimSmgsInvoiceGruz invGruzOb : invOb.getInvoiceGruzs().values()) {
          Element goodsItem = goods.addElement("INVOICEDOP_ITEM");
          goodsItem.addElement("G32").addText(format(n++));
          goodsItem.addElement("G311").addText(format(invGruzOb.getKolm()));
          goodsItem.addElement("G312").addText(format(invGruzOb.getNzgr()));
          goodsItem.addElement("G33").addText(format(invGruzOb.getTnved()));
          goodsItem.addElement("G35").addText(format(invGruzOb.getMbrt()));
          goodsItem.addElement("G38").addText(format(invGruzOb.getMnet()));
          goodsItem.addElement("PACKAGECODE").addText(format(invGruzOb.getNzyp()));
          goodsItem.addElement("PRICE").addText(format(invGruzOb.getItogo()));
          goodsItem.addElement("UNIT").addText(format(invGruzOb.getCus_edizm()));
          goodsItem.addElement("UNITPRICE").addText(format(invGruzOb.getCost()));
          goodsItem.addElement("RECORDTYPE").addText("1");
        }

        invItem.addElement("BRUTTOTOTAL").addText(invOb.calcMbrt());
        invItem.addElement("MESTTOTAL").addText(invOb.calcKolm());
        invItem.addElement("NETTOTOTAL").addText(invOb.calcMnet());
        invItem.addElement("TOTAL").addText(invOb.calcItogoStr());

        Element consignee = invItem.addElement("CONSIGNEE");
        consignee.addElement("COUNTRY").addText(format(invOb.getCountry_p()));
        consignee.addElement("REGION");
        consignee.addElement("ZIPCODE").addText(format(invOb.getZip_p()));
        consignee.addElement("CITY").addText(format(invOb.getCity_p()));
        consignee.addElement("STREETHOUSE").addText(format(invOb.getAdres_p()));

        Element consignor = invItem.addElement("CONSIGNOR");
        consignor.addElement("COUNTRY").addText(format(invOb.getCountry_o()));
        consignor.addElement("REGION");
        consignor.addElement("ZIPCODE").addText(format(invOb.getZip_o()));
        consignor.addElement("CITY").addText(format(invOb.getCity_o()));
        consignor.addElement("STREETHOUSE").addText(format(invOb.getAdres_o()));
      }
    }

    CimSmgsCarList csc = null;
    Collection<CimSmgsCarList> carCol = cs.getCimSmgsCarLists().values();
    if (!carCol.isEmpty()) {
      csc = carCol.iterator().next();
    }

    CimSmgsKonList csk = null;
    Collection<CimSmgsKonList> konCol = csc.getCimSmgsKonLists().values();
    if (!konCol.isEmpty()) {
      csk = konCol.iterator().next();
    }

    Element smgs = root.addElement("SMGS");

    Element smgsItem = smgs.addElement("SMGS_ITEM");
    smgsItem.addElement("CODECL").addText(format(cs.getG3()));
    smgsItem.addElement("DOC_N").addText(format(cs.getG694()));

    smgsItem.addElement("G1_1").addText(format(cs.getG1r()));
    smgsItem.addElement("G1_2").addText(format(format(cs.getG16r()) + format(cs.getG19r()) + " " + format(cs.getG18r_1()) + " " + format(cs.getG17_1())));
    smgsItem.addElement("G1_3").addText(format(cs.getG2()));

    smgsItem.addElement("G14_N"); /*итого количество мест*/
    smgsItem.addElement("G15_N").addText(format(cs.getG24B()));
    smgsItem.addElement("G16").addText(format(cs.getG14()));
    if (csk != null) {
      smgsItem.addElement("G18").addText(format(csk.getVid()) + "/" + format(csk.getKat()));
      smgsItem.addElement("G19").addText(format(csk.getUtiN()));
    }
    smgsItem.addElement("G2").addText(format(cs.getG2()));
    smgsItem.addElement("G20").addText(format(cs.getG181()));
    smgsItem.addElement("G21").addText(format(cs.getG25()));

    String g23 = "";
    for (CimSmgsDocs csd : cs.getCimSmgsDocses9().values()) {
      g23 += format(csd.getText()) + "\r\n";
    }
    smgsItem.addElement("G23").addText(format(g23));

    smgsItem.addElement("G24").addText(format(cs.getG27()));
    String diro = cs.getG171();
    if (StringUtils.isBlank(diro)) {
      diro = cs.getG691();
    }
    smgsItem.addElement("G25_1").addText(format(diro));
    String ksto = cs.getG17();
    if (StringUtils.isBlank(ksto)) {
      ksto = cs.getG692();
    }
    smgsItem.addElement("G25_2").addText(format(ksto));
    smgsItem.addElement("G25_3").addText(format(cs.getG12()));
    smgsItem.addElement("G25_4").addText(format(cs.getG121()));
    smgsItem.addElement("G26").addText(format(cs.getG26()));

    if (csc != null) {
      smgsItem.addElement("G27").addText(format(csc.getNvag()));
      smgsItem.addElement("G28").addText(format(csc.getGrPod()));
      smgsItem.addElement("G29").addText(format(csc.getKolOs()));
    }
    smgsItem.addElement("G3").addText(format(cs.getG162r()));
    smgsItem.addElement("G3_1").addText(format(cs.getG17()));
    if (csc != null) {
      smgsItem.addElement("G30").addText(format(csc.getTaraVag()));
    }

    String g4 = "";
    for (CimSmgsDocs csd : cs.getCimSmgsDocses7().values()) {
      g4 += format(csd.getText()) + "\r\n";
    }
    smgsItem.addElement("G4").addText(format(g4));

    String g45 = "";
    for (CimSmgsPlomb cspl : cs.getCimSmgsPlombs().values()) {
      g45 += format(cspl.getZnak()) + "\r\n";
    }
    smgsItem.addElement("G45").addText(format(g45));

    smgsItem.addElement("G5_1").addText(format(cs.getG4r()));
    smgsItem.addElement("G5_2").addText(format(format(cs.getG46r()) + format(cs.getG49r()) + " " + format(cs.getG48r()) + " " + format(cs.getG47_1())));
    smgsItem.addElement("G5_3").addText(format(cs.getG5()));

    for (CimSmgsPlatel csp : cs.getCimSmgsPlatels().values()) {
      smgsItem.addElement("EXPEDITORNAME ").addText(format(csp.getPlatR()));
    }

    smgsItem.addElement("G6").addText(format(cs.getG15r()));

//  Не актуально, уточнить алгоритм заполнения
//    String rqrStr = "";
//    for (CimSmgsDocs csdOb : cs.getCimSmgsDocses13().values()) {
//      String code = csdOb.getCode();
//      int idx = -1;
//      if (code != null) {
//        String[] codeAr = code.split("[,;]");
//        Arrays.sort(codeAr);
//        idx = Arrays.binarySearch(codeAr, "6"); // сначала ищем с кодом "6"
//        if (idx < 0)
//          idx = Arrays.binarySearch(codeAr, "1"); // если нет, то с кодом "1"
//        if ( idx >= 0 ) {
//          rqrStr = csdOb.getText();
//          break;
//        }
//      }
//    }
//    smgsItem.addElement("G7").addText(format(rqrStr));

    smgsItem.addElement("G8_1").addText(StringUtils.trim(format(cs.getG102r()) + " " + format(cs.getG101r())));
    smgsItem.addElement("G8_2").addText(format(cs.getG12()));
    smgsItem.addElement("G8_3").addText(format(cs.getG121()));

    Element goods = smgsItem.addElement("SMGS_CARGO");
    if (csk != null) {
      for (CimSmgsGruz csg : csk.getCimSmgsGruzs().values()) {
        Element goodsItem = goods.addElement("SMGS_CARGO_ITEM");
        goodsItem.addElement("CODE").addText(format(csg.getKgvn()));
        goodsItem.addElement("G10").addText(format(csg.getUpak()));
        goodsItem.addElement("G11").addText(format(csg.getNzgr()));
        goodsItem.addElement("KGUSER").addText(formatN(csg.getMassa()));
        goodsItem.addElement("MEST").addText(formatN(csg.getPlaces()));
      }
    }

    Element osz = smgsItem.addElement("SMGS_OSZAYAV");
    for (CimSmgsPlatel csp : cs.getCimSmgsPlatels().values()) {
      Element oszItem = osz.addElement("SMGS_OSZAYAV_ITEM");
      oszItem.addElement("CODE").addText(format(csp.getKplat()));
      oszItem.addElement("OPLATAPO").addText(format(csp.getDorR()));
      oszItem.addElement("THRU").addText(format(csp.getPlatR()));
      oszItem.addElement("THRUWHAT").addText(formatN(csp.getPrimR()));
    }

    Element plomb = smgsItem.addElement("SMGS_PLOMB45");
    for (CimSmgsPlomb cspl : cs.getCimSmgsPlombs().values()) {
      int kpl = 1;
      try {
        kpl = cspl.getKpl();
      } catch (Exception xx) {
      }
      for (int i = 0; i < kpl; i++) {
        Element plombItem = plomb.addElement("SMGS_PLOMB45_ITEM");
        plombItem.addElement("NOMER").addText(format(cspl.getZnak()));
      }
    }

    Element docs = smgsItem.addElement("SMGS_PRILDOC");
    for (CimSmgsDocs csd : cs.getCimSmgsDocses13().values()) {
      Element docsItem = docs.addElement("SMGS_PRILDOC_ITEM");
      docsItem.addElement("NAME").addText(format(csd.getText()));
      docsItem.addElement("NUMBER").addText(format(csd.getNdoc()));
      Date dat = csd.getDat();
      String datStr = dat != null ? df3.format(dat) : "";
      docsItem.addElement("TIMESTAMP").addText(datStr);
    }

//    уточнить алгоритм заполнения
    Element border = smgsItem.addElement("SMGS_STATIONS");
    for (CimSmgsDocs csd : cs.getCimSmgsDocses9().values()) {
      Element borderItem = border.addElement("SMGS_PRILDOC_ITEM");
      borderItem.addElement("G07").addText(format(csd.getText()));
      borderItem.addElement("G07NAME").addText(format(csd.getText2()));
      borderItem.addElement("NO").addText(format(csd.getSort()));
    }

    Element vag = smgsItem.addElement("SMGS_VAGONS");
    Element vagItem = vag.addElement("SMGS_VAGONS_ITEM");
    vagItem.addElement("AXES").addText(format(csc.getKolOs()));
    vagItem.addElement("FORCE").addText(format(csc.getGrPod()));
    vagItem.addElement("VAGON").addText(format(csc.getNvag()));
    vagItem.addElement("WAGONWEGHT").addText(format(csc.getTaraVag()));


//    String text = doc.asXML();
    OutputFormat format = new OutputFormat("  ", true, encoding);
    format.setExpandEmptyElements(false);
    StringWriter out = new StringWriter();
    XMLWriter writer = new XMLWriter(out, format);
    writer.write(doc);
    String text = out.toString();
    return text;
  }

  public void receive() throws Exception {
    Session session = null;
    Transaction tx = null;


    try {
      session = HibernateUtil.getSession();

      Properties props = System.getProperties(); //new Properties();
      props.put("mail.pop3.connectiontimeout", "30000");
      props.put("mail.pop3.timeout", "30000");
      props.put(pop3Ssl ? "mail.pop3s.connectiontimeout" : "mail.pop3.connectiontimeout", "30000");
      props.put(pop3Ssl ? "mail.pop3s.timeout" : "mail.pop3.timeout", "30000");
      javax.mail.Session ms = javax.mail.Session.getDefaultInstance(props, null);
      Store store = ms.getStore(pop3Ssl ? "pop3s" : "pop3");
      store.connect(pop3Server, pop3Port != 0 ? pop3Port : 110, pop3Account, pop3Password);
      Folder mf = store.getFolder("INBOX");
      mf.open(Folder.READ_WRITE);
      Message msgs[] = mf.getMessages();
      int n = msgs.length;
      log.debug("Found " + n + " message(s)");
      Arrays.sort(msgs, this);

      for (int i = 0; i < n; i++) {
        ArrayList<String[]> list = new ArrayList<String[]>();
        String info = "";
        try {
          Message msg = msgs[i];
          String subj = msg.getSubject();
          if (subj == null)
            subj = "";
          if (subj.startsWith("=?"))
            subj = MimeUtility.decodeWord(subj);
          String from = decodeAddr(msg.getFrom());
          info = String.format("Process incoming message [%d] from %s about '%s' created %4$td-%4$tm-%4$tY %4$tH:%4$tM:%4$tS.%4$tL",
            i, from, subj, msg.getSentDate());
          if (!subjs.containsKey(subj)) {
            log.info(info + " - skipped");
            save2file(msg, TRASH);
            msg.setFlag(Flag.DELETED, true);
            log.debug("Delete message from server");
            continue;
          }
          log.info(info);

          String text = null;
          if (msg.isMimeType("text/plain")) {
            save2file(msg, TRASH);
            msg.setFlag(Flag.DELETED, true);
            log.warn("Message content type is \"text/plain\" - Mail skipped and deleted from server");
          } else if (msg.isMimeType("multipart/*")) {
            Multipart parts = (Multipart) msg.getContent();
            for (int j = 0; j < parts.getCount(); j++) {
              Part part = parts.getBodyPart(j);
              if (Message.ATTACHMENT.equalsIgnoreCase(part.getDisposition())) {
                String fileName = part.getFileName();
                if (fileName != null) {
                  fileName = MimeUtility.decodeText(fileName);
                }
                log.debug("Found attachment with filename=" + fileName);
                if (part.isMimeType("application/xml") || part.isMimeType("text/xml") || part.isMimeType("text/*")) {
                  list.add(new String[]{fileName, read(part.getInputStream(), part.getContentType()), subjs.get(subj)});
                } else {
                  log.warn("Part is " + part.getContentType() + " " + part.getDisposition() + " - skipped");
                }
              } else {
                log.warn("Part is " + part.getContentType() + " " + part.getDisposition() + " - skipped");
              }
            }
          } else {
            save2file(msg, TRASH);
            msg.setFlag(Flag.DELETED, true);
            log.warn("Message content type is \"" + msg.getContentType() + "\" - Mail skipped and deleted from server");
          }

          /**** Processiong ****/
          save2file(msg, PROCESSED);
          for (String[] ent : list) {
            TbcLog res = null;
            String name = ent[0];
            String message = ent[1];
            Byte status = Byte.valueOf(ent[2]);
            try {
              res = ProcessMessage(name, message);
              if (res.getTbc_status() != null) {
                status = res.getTbc_status();
              }
              tx = session.beginTransaction();
              Query q = session.createQuery("select hid_src from TbcLog where substr(tbc_nomer, 4, 9)=:a and in_out=2 order by hid desc");
              q.setString("a", StringUtils.substring(name, 3, 12));
              @SuppressWarnings("unchecked")
              Iterator<Long> it = q.iterate();
              if (it.hasNext()) {
                Long hidSrc = it.next();
                log.debug("Found hid_src=" + hidSrc);
                res.setHid_src(hidSrc);
                session.createQuery("UPDATE CimSmgs SET tbcStatus=" + status + " WHERE hid_pack=" + hidSrc).executeUpdate();
              }
              session.save(res);
              session.flush();
              tx.commit();
            } catch (ParseException pex) {
              log.error(pex.getMessage());
              saveFailed(name + "\r\n" + message, folder, encoding);
            } catch (HibernateException ex) {
              log.error(ex.getMessage());
              saveFailed(name + "\r\n" + message, folder, encoding);
              tx.rollback();
              session.clear();
            } catch (Exception ioex) {
              log.error(ioex.getMessage(), ioex);
            } finally {
              if (res != null) log.debug(new ToStringBuilder(res).append(res).toString());
            }
          }
          /**** Processiong ****/

          msg.setFlag(Flag.DELETED, true);
          log.debug("Message deleted");
        } catch (Exception e) {
          log.error(e.getMessage(), e);
        }
      }

      mf.close(true);
      store.close();
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      tx.rollback();
      session.clear();
    } /*finally {
      if (session != null) {
        session.close();
      }
    }*/

  }

  public void receive(String message, String name, String un, String trans, Route route, UsrGroupsDir usrgrdir) throws Exception {
    Session session = null;
    TbcLog res = null;

    try {
      session = HibernateUtil.getSession();

      save2file(message, name, PROCESSED);
      Byte status = null;

      res = ProcessMessage(name, message);
      if (res.getTbc_status() != null) {
        status = res.getTbc_status();
      } else {
        status = 3;
      }
      HibernateUtil.beginTransaction();
      Query q = session.createQuery("select hid_src from TbcLog where substr(tbc_nomer, 4, 9)=:a and in_out=2 order by hid desc");
      q.setString("a", StringUtils.substring(name, 3, 12));
      @SuppressWarnings("unchecked")
      Iterator<Long> it = q.iterate();
      if (it.hasNext()) {
        Long hidSrc = it.next();
        log.debug("Found hid_src=" + hidSrc);
        res.setHid_src(hidSrc);
        session.createQuery("UPDATE CimSmgs SET tbcStatus=" + status + " WHERE hid_pack=" + hidSrc).executeUpdate();
      }
      session.save(res);
      session.flush();
      HibernateUtil.commitTransaction();
    } catch (ParseException pex) {
      log.error(pex.getMessage());
      saveFailed(name + "\r\n" + message, folder, encoding);
    } catch (HibernateException ex) {
      log.error(ex.getMessage());
      saveFailed(name + "\r\n" + message, folder, encoding);
      HibernateUtil.rollbackTransaction();
      session.clear();
    } catch (Exception ioex) {
      log.error(ioex.getMessage(), ioex);
    } finally {
      if (res != null) log.debug(new ToStringBuilder(res).append(res).toString());
    }

  }

  private TbcLog ProcessMessage(String tbc_nomer, String message) throws ParseException {
    TbcLog tl = new TbcLog();
    tl.setIn_out((byte) 1);
    tl.setXml(message);
    tl.setTbc_nomer(tbc_nomer);

    if (message.indexOf("Confirmation for:") > 0) {
      tl.setText(message);
      tl.setTbc_status((byte) 2);
    } else {
      try {
        if (!message.startsWith("<")) {
          message = "<" + StringUtils.substringAfter(message, "<");
        }
        SAXReader reader = new SAXReader(false);
        Document document = reader.read(new StringReader(message));

        try {
          tl.setType(Integer.valueOf(document.valueOf("/Requests/Request/Type")));
        } catch (Exception xx) {
        }
        try {
          tl.setStatus(Integer.valueOf(document.valueOf("/Requests/Request/Status")));
        } catch (Exception xx) {
        }
        tl.setText(document.valueOf("/Requests/Request/Text"));

      } catch (Exception e) {
        log.error(e.getClass().getName() + " : " + e.getMessage());
        throw new ParseException(e.getMessage(), 0);
      }
    }

    return tl;
  }

  public void receiveXML(String xmlStr, String un, String trans, Route route, UsrGroupsDir usrgrdir) throws Exception {
    Session session = null;
    try {
      InputSource source = new InputSource(new StringReader(xmlStr));
      String encoding = getEncoding(xmlStr);
      source.setEncoding(encoding);

      SAXReader reader = new SAXReader(false);
      Document document = reader.read(source);

      Date d = new Date();

      CimSmgs cs = new CimSmgs();
      cs.setType((byte) 2);
      cs.setDocType1(new BigDecimal(1));
      cs.setDattr(d);
      cs.setUn(un);
      cs.setTrans(trans);
      cs.setRoute(route);

      Node smgsNode = document.selectSingleNode("/Package/SMGS/SMGS_ITEM");
      cs.setG63(smgsNode.valueOf("CODECL"));
      cs.setG694(smgsNode.valueOf("DOC_N"));

      cs.setG1r(smgsNode.valueOf("G1_1"));
      cs.setG2(smgsNode.valueOf("G1_3"));

      cs.setG24B(parceBD(smgsNode.valueOf("G15_N")));
      cs.setG14(smgsNode.valueOf("G16"));

      Node smgsVagon = smgsNode.selectSingleNode("SMGS_VAGONS");
      if (smgsVagon != null) {
        List smgsVagonItem = smgsVagon.selectNodes("SMGS_VAGONS_ITEM");
        if (smgsVagonItem != null) {
          Iterator<Node> it = smgsVagonItem.iterator();
          if (it != null) {
            for (int i = 0; it.hasNext(); i++) {
              Node nodeItem = it.next();
              CimSmgsCarList cs_vagon = new CimSmgsCarList();
              cs.getCimSmgsCarLists().put(new Byte((byte) i), cs_vagon);
              cs_vagon.setCimSmgs(cs);
              cs_vagon.setSort(new Byte((byte) i));
              cs_vagon.setKolOs(parceB(nodeItem.valueOf("AXES")));
              cs_vagon.setGrPod(parceBD(nodeItem.valueOf("FORCE")));
              cs_vagon.setNvag(nodeItem.valueOf("VAGON"));
              cs_vagon.setTaraVag(parceBD(nodeItem.valueOf("WAGONWEGHT")));
            }
          }
        }
      }

      CimSmgsCarList cs_carlist = new CimSmgsCarList();
      if (cs.getCimSmgsCarLists().size() == 0) {
        cs.getCimSmgsCarLists().put(new Byte((byte) 0), cs_carlist);
        cs_carlist.setCimSmgs(cs);
        cs_carlist.setSort(new Byte((byte) 0));
      } else {
        cs_carlist = cs.getCimSmgsCarLists().get(new Byte((byte) 0));
      }

      CimSmgsKonList cs_kontlist = new CimSmgsKonList();
      cs_carlist.getCimSmgsKonLists().put(new Byte((byte) 0), cs_kontlist);
      cs_kontlist.setCimSmgsCarList(cs_carlist);
      cs_kontlist.setSort(new Byte((byte) 0));

      String[] vid_kat = format(smgsNode.valueOf("G18")).split("/+");
      if (vid_kat.length >= 2) {
        cs_kontlist.setVid(vid_kat[0]);
        cs_kontlist.setKat(vid_kat[1]);
      }
      cs_kontlist.setUtiN(smgsNode.valueOf("G19"));

      cs.setG2(smgsNode.valueOf("G2"));
      cs.setG181(smgsNode.valueOf("G20"));
      cs.setG25(parceB(smgsNode.valueOf("G21")));

      String[] G23_ = format(smgsNode.valueOf("G23")).split("[\r\n]+");
      for (int i = 0; i < G23_.length; i++) {
        CimSmgsDocs cs_docs9 = new CimSmgsDocs();
        cs.getCimSmgsDocses9().put(new Byte((byte) i), cs_docs9);
        cs_docs9.setCimSmgs(cs);
        cs_docs9.setSort(new Byte((byte) i));
        cs_docs9.setFieldNum("9");
        cs_docs9.setText(G23_[i]);
      }

      cs.setG27(smgsNode.valueOf("G24"));

      cs.setG171(smgsNode.valueOf("G25_1"));
      cs.setG691(smgsNode.valueOf("G25_1"));

      cs.setG17(smgsNode.valueOf("G25_2"));
      cs.setG692(smgsNode.valueOf("G25_2"));
      cs.setG12(smgsNode.valueOf("G25_3"));
      cs.setG121(smgsNode.valueOf("G25_4"));
      cs.setG26(smgsNode.valueOf("G26"));

      cs_carlist.setNvag(smgsNode.valueOf("G27"));
      cs_carlist.setGrPod(parceBD(smgsNode.valueOf("G28")));
      cs_carlist.setKolOs(parceB(smgsNode.valueOf("G29")));
      cs.setG162r(smgsNode.valueOf("G3"));
      cs.setG17(smgsNode.valueOf("G3_1"));
      cs_carlist.setTaraVag(parceBD(smgsNode.valueOf("G30")));

      String[] G4_ = format(smgsNode.valueOf("G4")).split("[\r\n]+");
      for (int i = 0; i < G4_.length; i++) {
        CimSmgsDocs cs_docs7 = new CimSmgsDocs();
        cs.getCimSmgsDocses7().put(new Byte((byte) i), cs_docs7);
        cs_docs7.setCimSmgs(cs);
        cs_docs7.setSort(new Byte((byte) i));
        cs_docs7.setFieldNum("7");
        cs_docs7.setText(G4_[i]);
      }

      String[] G45_ = format(smgsNode.valueOf("G45")).split("[\r\n]+");
      for (int i = 0; i < G45_.length; i++) {
        CimSmgsPlomb cs_plomb = new CimSmgsPlomb();
        cs.getCimSmgsPlombs().put(new Byte((byte) i), cs_plomb);
        cs_plomb.setCimSmgs(cs);
        cs_plomb.setSort(new Byte((byte) i));
        cs_plomb.setZnak(G45_[i]);
      }

      cs.setG4r(smgsNode.valueOf("G5_1"));
      cs.setG5(smgsNode.valueOf("G5_3"));

      List expiditor = smgsNode.selectNodes("EXPEDITORNAME");
      if (expiditor != null) {
        Iterator<Node> it = expiditor.iterator();
        if (it != null) {
          for (int i = 0; it.hasNext(); i++) {
            Node nodeItem = it.next();
            CimSmgsPlatel cs_expiditor = new CimSmgsPlatel();
            cs.getCimSmgsPlatels().put(new Byte((byte) i), cs_expiditor);
            cs_expiditor.setCimSmgs(cs);
            cs_expiditor.setSort(new Byte((byte) i));
            cs_expiditor.setPlatR(nodeItem.getText());
          }
        }
      }

      cs.setG15r(smgsNode.valueOf("G6"));

      cs.setG12(smgsNode.valueOf("G8_2"));
      cs.setG121(smgsNode.valueOf("G8_3"));

      Node smgsCargo = smgsNode.selectSingleNode("SMGS_CARGO");
      if (smgsCargo != null) {
        List smgsCargoItem = smgsCargo.selectNodes("SMGS_CARGO_ITEM");
        if (smgsCargoItem != null) {
          Iterator<Node> it = smgsCargoItem.iterator();
          if (it != null) {
            for (int i = 0; it.hasNext(); i++) {
              Node nodeItem = it.next();
              CimSmgsGruz cs_gruz = new CimSmgsGruz();
              cs_kontlist.getCimSmgsGruzs().put(i, cs_gruz);
              cs_gruz.setCimSmgsKonList(cs_kontlist);
              cs_gruz.setSort(i);
              cs_gruz.setKgvn(nodeItem.valueOf("CODE"));
              cs_gruz.setUpak(nodeItem.valueOf("G10"));
              cs_gruz.setNzgr(nodeItem.valueOf("G11"));
              cs_gruz.setMassa(parceBD(nodeItem.valueOf("KGUSER")));
              cs_gruz.setPlaces(parceI(nodeItem.valueOf("MEST")));
            }
          }
        }
      }

      Node smgsOszajav = smgsNode.selectSingleNode("SMGS_OSZAYAV");
      if (smgsOszajav != null) {
        List smgsOszajavItem = smgsOszajav.selectNodes("SMGS_OSZAYAV_ITEM");
        if (smgsOszajavItem != null) {
          Iterator<Node> it = smgsOszajavItem.iterator();
          if (it != null) {
            for (int i = 0; it.hasNext(); i++) {
              Node nodeItem = it.next();
              CimSmgsPlatel cs_platel = new CimSmgsPlatel();
              cs.getCimSmgsPlatels().put(new Byte((byte) i), cs_platel);
              cs_platel.setCimSmgs(cs);
              cs_platel.setSort(new Byte((byte) i));
              cs_platel.setKplat(nodeItem.valueOf("CODE"));
              cs_platel.setDorR(nodeItem.valueOf("OPLATAPO"));
              cs_platel.setPlatR(nodeItem.valueOf("THRU"));
              cs_platel.setPrimR(nodeItem.valueOf("THRUWHAT"));
            }
          }
        }
      }

      Node smgsPlomb = smgsNode.selectSingleNode("SMGS_PLOMB45");
      if (smgsPlomb != null) {
        List smgsPlombItem = smgsPlomb.selectNodes("SMGS_PLOMB45_ITEM");
        if (smgsPlombItem != null) {
          Iterator<Node> it = smgsPlombItem.iterator();
          if (it != null) {
            for (int i = 0; it.hasNext(); i++) {
              Node nodeItem = it.next();
              CimSmgsPlomb cs_plomb = new CimSmgsPlomb();
              cs.getCimSmgsPlombs().put(new Byte((byte) i), cs_plomb);
              cs_plomb.setCimSmgs(cs);
              cs_plomb.setSort(new Byte((byte) i));
              cs_plomb.setKpl(new Short((short) 1));
              cs_plomb.setZnak(nodeItem.valueOf("NOMER"));
            }
          }
        }
      }

      Node smgsPrildoc = smgsNode.selectSingleNode("SMGS_PRILDOC");
      if (smgsPrildoc != null) {
        List smgsPrildocItem = smgsPrildoc.selectNodes("SMGS_PRILDOC_ITEM");
        if (smgsPrildocItem != null) {
          Iterator<Node> it = smgsPrildocItem.iterator();
          if (it != null) {
            for (int i = 0; it.hasNext(); i++) {
              Node nodeItem = it.next();
              CimSmgsDocs cs_docs = new CimSmgsDocs();
              cs.getCimSmgsDocses13().put(new Byte((byte) i), cs_docs);
              cs_docs.setCimSmgs(cs);
              cs_docs.setSort(new Byte((byte) i));
              cs_docs.setFieldNum("13");
              cs_docs.setText(nodeItem.valueOf("NAME"));
              cs_docs.setNdoc(nodeItem.valueOf("NUMBER"));
              cs_docs.setDat(parceD(nodeItem.valueOf("TIMESTAMP")));
            }
          }
        }
      }

      Node smgsStation = smgsNode.selectSingleNode("SMGS_STATIONS");
      if (smgsStation != null) {
        List smgsStationItem = smgsStation.selectNodes("SMGS_PRILDOC_ITEM");
        if (smgsStationItem != null) {
          Iterator<Node> it = smgsStationItem.iterator();
          if (it != null) {
            for (int i = 0; it.hasNext(); i++) {
              Node nodeItem = it.next();
              CimSmgsDocs cs_docs = new CimSmgsDocs();
              cs.getCimSmgsDocses9().put(new Byte((byte) i), cs_docs);
              cs_docs.setCimSmgs(cs);
              cs_docs.setSort(new Byte((byte) i));
              cs_docs.setFieldNum("9");
              cs_docs.setText(nodeItem.valueOf("G07"));
              cs_docs.setText2(nodeItem.valueOf("G07NAME"));
              cs_docs.setSort(parceB(nodeItem.valueOf("NO")));
            }
          }
        }
      }

      /* ************************ */

      ArrayList<CimSmgsInvoice> invList = new ArrayList<CimSmgsInvoice>();
      List<Node> invNodeList = document.selectNodes("/Package/INVOICEPRIM/INVOICEPRIM_ITEM");
      for (Node invNode : invNodeList) {
        CimSmgsInvoice inv = new CimSmgsInvoice();
        inv.setRoute(route);
        inv.setDat_inv(parceD(invNode.valueOf("INVOICEDATE")));
        inv.setInvoice(invNode.valueOf("INVOICENO"));
        inv.setN_dog(invNode.valueOf("CONTRACTNO"));
        inv.setDat_dog(parceD(invNode.valueOf("CONTRACTDATE")));
        inv.setNotd(invNode.valueOf("GF2"));
        inv.setAdres_o(invNode.valueOf("GF3"));
        inv.setNpol(invNode.valueOf("_GF2"));
        inv.setAdres_p(invNode.valueOf("_GF3"));
        inv.setNsel(invNode.valueOf("G022"));
        inv.setAdres_s(invNode.valueOf("G023"));
        inv.setNbuy(invNode.valueOf("G092"));
        inv.setAdres_b(invNode.valueOf("G093"));

        Node goods = invNode.selectSingleNode("INVOICEDOP");
        if (goods != null) {
          List goodsItem = goods.selectNodes("INVOICEDOP_ITEM");
          if (goodsItem != null) {
            Iterator<Node> it = goodsItem.iterator();
            if (it != null) {
              for (int i = 0; it.hasNext(); i++) {
                Node nodeItem = it.next();
                CimSmgsInvoiceGruz inv_gruz = new CimSmgsInvoiceGruz();
                inv.getInvoiceGruzs().put(new Long(i), inv_gruz);
                inv_gruz.setInvoice(inv);
                inv_gruz.setKolm(parceBD(nodeItem.valueOf("G311")));
                inv_gruz.setNzgr(nodeItem.valueOf("G312"));
                inv_gruz.setTnved(nodeItem.valueOf("G33"));
                inv_gruz.setMbrt(parceBD(nodeItem.valueOf("G35")));
                inv_gruz.setMnet(parceBD(nodeItem.valueOf("G38")));
                inv_gruz.setNzyp(nodeItem.valueOf("PACKAGECODE"));
                inv_gruz.setItogo(nodeItem.valueOf("PRICE"));
                inv_gruz.setCus_edizm(nodeItem.valueOf("UNIT"));
                inv_gruz.setCost(nodeItem.valueOf("UNITPRICE"));
              }
            }
          }
        }

        Node consignee = invNode.selectSingleNode("CONSIGNEE");
        if(consignee != null) {
          inv.setCountry_p(consignee.valueOf("COUNTRY"));
          inv.setZip_p(consignee.valueOf("ZIPCODE"));
          inv.setCity_p(consignee.valueOf("CITY"));
          inv.setAdres_p(consignee.valueOf("STREETHOUSE"));
        }

        Node consignor = invNode.selectSingleNode("CONSIGNOR");
        if(consignor != null) {
          inv.setCountry_o(consignor.valueOf("COUNTRY"));
          inv.setZip_o(consignor.valueOf("ZIPCODE"));
          inv.setCity_o(consignor.valueOf("CITY"));
          inv.setAdres_o(consignor.valueOf("STREETHOUSE"));
        }

        invList.add(inv);
      }

      /* ******************************************** */

      PackDoc pd = new PackDoc();
      pd.setRoute(route);
      pd.setUsrGroupsDir(usrgrdir);
      pd.addCimSmgsItem(cs);
      for (CimSmgsInvoice inv : invList) {
        pd.addInvoiceItem(inv);
      }

      session = HibernateUtil.getSession();
      HibernateUtil.beginTransaction();
      session.save(pd);
      HibernateUtil.commitTransaction();

      save2file(xmlStr, "", PROCESSED);
    }
//    catch (ParseException pex) {
//      log.error(pex.getMessage());
//      saveFailed(xmlStr, folder, encoding);
//    }
    catch (HibernateException ex) {
      log.error(ex.getMessage());
      saveFailed(xmlStr, folder, encoding);
      HibernateUtil.rollbackTransaction();
      session.clear();
    } catch (Exception ioex) {
      log.error(ioex.getMessage(), ioex);
    }

  }

  private BigDecimal parceBD(String val) {
    return (val != null && val.length() > 0 ? new BigDecimal(val) : null);
  }

  private Integer parceI(String val) {
    return (val != null && val.length() > 0 ? new Integer(val) : null);
  }

  private Byte parceB(String val) {
    return (val != null && val.length() > 0 ? new Byte(val) : null);
  }

  private static String getEncoding(String text) {
    String result = null;

    String xml = text.trim();

    if (xml.startsWith("<?xml")) {
      int end = xml.indexOf("?>");
      String sub = xml.substring(0, end);
      StringTokenizer tokens = new StringTokenizer(sub, " =\"\'");

      while (tokens.hasMoreTokens()) {
        String token = tokens.nextToken();

        if ("encoding".equals(token)) {
          if (tokens.hasMoreTokens()) {
            result = tokens.nextToken();
          }

          break;
        }
      }
    }

    return result;
  }

  public int compare(Message o1, Message o2) {
    try {
      return o1.getSentDate().compareTo(o2.getSentDate());
    } catch (MessagingException ex) {
      log.error(ex.getMessage(), ex);
      return 0;
    }
  }

  private String decodeAddr(Address[] addr) {
    String res = "";
    if (addr != null) {
      for (int k = 0; k < addr.length; k++) {
        InternetAddress a = (InternetAddress) addr[k];
        if (a.getPersonal() != null)
          res += ", " + a.getPersonal() + "<" + a.getAddress() + ">";
        else
          res += ", " + a.getAddress();
      }
      if (res.length() > 0)
        res = res.substring(2);
    }

    return res;
  }

  private void save2file(Message msg, String folder) throws MessagingException, IOException, URISyntaxException {
    String tmpPath = new File(new URI(this.getClass().getResource("/").toString())).getAbsolutePath();
    File tmpDir = new File(tmpPath, folder);
    if (!tmpDir.exists()) {
      log.debug("Create " + folder + " dir: " + tmpDir.getAbsolutePath());
      tmpDir.mkdirs();
    }
    File file = File.createTempFile(new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + "_", ".eml", tmpDir);
    log.debug("Output file = " + file.getName());
    BufferedOutputStream os = new BufferedOutputStream(new FileOutputStream(file));
    msg.writeTo(os);
    os.close();
  }

  private void save2file(String msg, String name, String folder) throws MessagingException, IOException, URISyntaxException {
    String tmpPath = new File(new URI(this.getClass().getResource("/").toString())).getAbsolutePath();
    File tmpDir = new File(tmpPath, folder);
    if (!tmpDir.exists()) {
      log.debug("Create " + folder + " dir: " + tmpDir.getAbsolutePath());
      tmpDir.mkdirs();
    }
    File file = File.createTempFile(new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + "_" + name, "", tmpDir);
    log.debug("Output file = " + file.getName());
    OutputStream os = (new FileOutputStream(file));
    os.write(msg.getBytes(encoding));
    os.close();
  }

  private String read(InputStream is, String type) throws IOException {
    String res = "";

    ByteArrayOutputStream out = new ByteArrayOutputStream();
    InputStream in;
    if (is instanceof BufferedInputStream)
      in = is;
    else
      in = new BufferedInputStream(is);

    int i;
    while ((i = in.read()) != -1) {
      out.write(i);
    }

    String charset = null;
    try {
      ContentType ct = new ContentType(type);
      charset = ct.getParameter("charset");
    } catch (javax.mail.internet.ParseException pex) {
      // ignore parse error
    }
    if (charset == null)
      charset = MimeUtility.getDefaultJavaCharset();

    res = out.toString(charset);
    return res;
  }
}
