package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.ArrayMap;
import com.bivc.cimsmgs.commons.DocType;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.Transformer;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOCase;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.Address;
import javax.mail.Flags;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Part;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.internet.ContentType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeUtility;
import java.io.*;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Blob;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.bivc.cimsmgs.exchange.Utils.normNvagNkonStr;
import static org.apache.commons.lang.StringUtils.isNotBlank;

public class MailRobot extends AbstractTask {

    private static final Pattern multi_prin_nkon_p = Pattern.compile("([a-zA-Z]{4}[ -]?\\d{6}[-]?\\d{1}[ ,;]*?)+");
    private static final Pattern multi_nvag_p = Pattern.compile("(\\d{4}[ -]?\\d{7}[ -]?\\d{1}(?=[ ,;]*?))+");
    private static final int interval = 5;
    private static final String fileInfType= "files";

    private String un;
    private String server;
    private String account;
    private String password;
    private int pop3Port;
    private boolean ssl = false;
    static final private String subject = "GREENRAIL";
    static final private String TRASH = "TRASH";
    final static private Logger log = LoggerFactory.getLogger(MailRobot.class);

    private Transformer<String, String> normTransformer = new Transformer<String, String>() {
        @Override
        public String transform(String input) {
            return normNvagNkonStr(input);
        }
    };

    public MailRobot(String server, int pop3Port, boolean ssl, String account, String password, String un) {
        this.server = server;
        this.account = account;
        this.password = password;
        this.pop3Port = pop3Port;
        this.ssl = ssl;
        this.un = un;
    }

    @Override
    protected void runTask() throws Exception {
        Folder folder = null;
        Store store = null;
        org.hibernate.Session dbSession = null;
        org.hibernate.Transaction tx = null;

        try {
            Properties props = System.getProperties();
            props.put(ssl ? "mail.pop3s.connectiontimeout" : "mail.pop3.connectiontimeout", "30000");
            props.put(ssl ? "mail.pop3s.timeout" : "mail.pop3.timeout", "30000");
            Session session = Session.getDefaultInstance(props, null);
            store = session.getStore(ssl ? "pop3s" : "pop3");
            store.connect(server, pop3Port, account, password);
            folder = store.getFolder("INBOX");
            folder.open(Folder.READ_WRITE);
            Message message[] = folder.getMessages();
            int n = message.length;
            log.debug("Found " + n + " message(s)");

            if (n == 0) return;

            ArrayMap<String, Route> groupMap = new ArrayMap<>();
            dbSession = HibernateUtil.getSession();
            tx = dbSession.beginTransaction();
            List<Route> rList = dbSession.createQuery("FROM Route").list();

            for (Route route : rList) {
                Hibernate.initialize(route.getDocs());
                Hibernate.initialize(route.getGroups());
                String mask = route.getEmailMask();
                if (isNotBlank(mask)) {
                    String[] emails = mask.split(",");
                    for (String email : emails) {
                        if (isNotBlank(email)) {
                            groupMap.add(email, route);
                        }
                    }
                }
            }
            tx.commit();

            for (int i = 0; i < n; i++) {
                log.debug("Process message " + (i + 1));
                String info = "";
                String text = null;
                String descr = null;
//                Usr usr = null;
                PackDoc pd;
                boolean fromSubj = false;

                try {
                    Message msg = message[i];
                    String subj = msg.getSubject();
                    if (subj == null) subj = "";
                    Address[] fromArr = msg.getFrom();
                    String from = decodeAddr(fromArr);
                    descr = from + "\r\n" + subj;
                    info = "Process incoming message from " + from + " about '" + subj + "'";
                    log.info(info);

                    boolean isKont = false;
                    List<String> kontList = findAllParam(subj, multi_prin_nkon_p );
                    CollectionUtils.transform(kontList, normTransformer);
                    ArrayList<String> vagList;
                    if (kontList.size() > 0) {
                        isKont = true;
                        fromSubj = true;
                        vagList = new ArrayList<>(1);  // пустышка для контейнорной отправки
                        vagList.add("");
                    }
                    else {
                        vagList = findAllParam(subj, multi_nvag_p);
                        CollectionUtils.transform(vagList, normTransformer);
                        if (vagList.size() > 0) {
                            fromSubj = true;
                        }
                    }
                    if (fromSubj) {
                        log.info("Found in subject");
                    }
                    else {
                        log.warn("Not found in subject");
                    }

//                    Iterator it = dbSession.createQuery("FROM Usr AS u WHERE u.un=:un AND u.locked<>'1'").setString("un", un).iterate();
//                    if (it.hasNext()) {
//                        usr = (Usr) it.next();
//                    }
//                    else {
//                        log.error("User " + un + " not found or locked");
//                        save2file(msg, "Trash");
//                        msg.setFlag(Flags.Flag.DELETED, true);
//                        log.debug("Delete message from server");
//                        continue;
//                    }

                    ArrayList<Route> routes = findRoute(fromArr, groupMap);

                    if (routes.size() == 0) {
                        log.error("Not found route for address " + from);
                        save2file(msg, "Trash");
                        msg.setFlag(Flags.Flag.DELETED, true);
                        log.debug("Delete message from server");
                        continue;
                    }

                    save2file(msg, "PROCESSED");

                    if (msg.isMimeType("multipart/*")) {
                        Multipart parts = (Multipart) msg.getContent();
                        for (int j = 0; j < parts.getCount(); j++) {
                            Part part = parts.getBodyPart(j);
                            if (part.isMimeType("text/*")) {
                                log.debug("Process text part");
                                text = (String) part.getContent();
                                if (text != null) text = text.trim();
                                descr += "\r\n" + text;
                            }
                            if (Message.ATTACHMENT.equalsIgnoreCase(part.getDisposition())) {
                                log.debug("Process attachment part");
                                String fileName = part.getFileName();
                                String contentType = new ContentType(part.getContentType()).getBaseType().toLowerCase();
                                if (fileName != null) {
                                    fileName = MimeUtility.decodeText(fileName);
                                }

                                if (!fromSubj && isNotBlank(fileName)) {
                                    kontList = findAllParam(fileName, multi_prin_nkon_p );
                                    CollectionUtils.transform(kontList, normTransformer);
                                    if (kontList.size() > 0) {
                                        isKont = true;
                                        vagList = new ArrayList<>(1);  // пустышка для контейнорной отправки
                                        vagList.add("");
                                    }
                                    else {
                                        vagList = findAllParam(fileName, multi_nvag_p);
                                        CollectionUtils.transform(vagList, normTransformer);
                                        if (vagList.size() == 0) {
                                            log.error("Not found in attachment name. Attachment skipped");
                                            continue;
                                        }
                                    }
                                }

                                for (Route route : routes) {
                                    dbSession = HibernateUtil.getSession();
                                    tx = dbSession.beginTransaction();

                                    log.debug("Route=" + route.toString());
                                    String trans;
                                    String sss = isKont ? "UPPER(k.utiN)" : "c.nvag";
                                    Iterator it = dbSession.createQuery("SELECT a FROM CimSmgs AS a JOIN a.cimSmgsCarLists c" + (isKont ? " JOIN c.cimSmgsKonLists k" : "") +
                                            " WHERE a.arch IS NULL AND REPLACE(REPLACE(" + sss + ", '-', ''), ' ', '') in (:list)" +
                                            " AND a.dattr > TIMESTAMPADD(DAY, -" + interval + ", NOW())" +
                                            " AND a.route=:r" +
                                            " ORDER BY a.dattr DESC")
                                            .setParameterList("list", isKont ? kontList : vagList)
                                            .setParameter("r", route)
                                            .iterate();
                                    if (it.hasNext()) {
                                        CimSmgs cs = (CimSmgs) it.next();
                                        String logStr = isKont ? "NKON=" + StringUtils.join(kontList, ", ") : "NVAG=" + StringUtils.join(vagList, ", ");
                                        log.debug(logStr + " found in SMGS [HID=" + cs.getHid() + "]");

//                                        cs.setDattr(new Date());
//                                        dbSession.update(cs);
                                        pd = cs.getPackDoc();
                                    }
                                    else {
                                        CimSmgs cs = new CimSmgs();
                                        cs.setUn(un);
                                        DocType t = hasSmgs2(route.getDocs()) ? DocType.SMGS : DocType.CIMSMGS;
                                        cs.setType(t.getType());
                                        cs.setDocType1(t.getDocType1());
                                        cs.setRoute(route);

                                        byte carSort = 0;
                                        CimSmgsCarList firstCar = null;
                                        for (String nvag : vagList) {
                                            CimSmgsCarList csc = new CimSmgsCarList();
                                            csc.setSort(carSort);
                                            csc.setNvag(nvag);
                                            if (carSort == 0)
                                                firstCar = csc;
                                            cs.addCimSmgsCarListItem(csc);
                                            carSort++;
                                        }

                                        byte kontSort = 0;
                                        for (String nkon : kontList) {
                                            CimSmgsKonList csk = new CimSmgsKonList();
                                            csk.setSort(kontSort++);
                                            csk.setUtiN(nkon);
                                            firstCar.addCimSmgsKonListItem(csk);
                                        }

                                        pd = new PackDoc();
                                        pd.setRoute(route);
                                        pd.addCimSmgsItem(cs);
                                        pd.setUsrGroupsDir(route.getGroups().get(0));
                                        cs.setTrans(route.getGroups().get(0).getName());
                                        dbSession.save(pd);
//                                        dbSession.flush();
                                        log.debug("New in SMGS [HID=" + cs.getHid() + "]");
                                    }

                                    Set<CimSmgsFileInf> infSet = pd.getCimSmgsFileInfs();
                                    CimSmgsFileInf inf = null;
                                    String logStr = null;
                                    for (CimSmgsFileInf item :infSet) {
                                        if (fileInfType.equals(item.getType())) {
                                            inf = item;
                                            logStr = "Found";
                                            break;
                                        }
                                    }

                                    if (inf == null) {
                                        inf = new CimSmgsFileInf();
                                        inf.setRoute(route);
                                        inf.setType(fileInfType);
                                        inf.setTrans(pd.getUsrGroupsDir().getName());
                                        inf.setDattr(new Date());
                                        inf.setUn(un);
                                        pd.addFileInfItem(inf);
                                        logStr = "New";
                                    }

                                    CimSmgsFile csf = new CimSmgsFile();
                                    inf.addFileItem(csf);
                                    dbSession.save(inf);
                                    log.debug(logStr + " FILE_INF [HID=" + inf.getHid() + "]");

                                    csf.setFileName(fileName);
                                    csf.setContentType(contentType);
/*
                                    csf.setFiles(dbSession.getLobHelper().createBlob(new byte[] {0}));
                                    dbSession.save(csf);
                                    dbSession.flush();
                                    dbSession.refresh(csf, LockOptions.UPGRADE);
                                    Blob blob = csf.getFiles();
                                    try (OutputStream out = new BufferedOutputStream(blob.setBinaryStream(1)); InputStream is = part.getInputStream()) {
                                        int b;
                                        while ((b = is.read()) != -1) {
                                            out.write(b);
                                        }
                                        log.debug("Save graph object successfuly");
                                    }
*/
                                    try (ByteArrayOutputStream out = new ByteArrayOutputStream(); InputStream is = part.getInputStream()) {
                                        int b;
                                        while ((b = is.read()) != -1) {
                                            out.write(b);
                                        }
                                        byte[] buf = out.toByteArray();
                                        Blob blob = Hibernate.getLobCreator(dbSession).createBlob(buf);
                                        csf.setLength(BigDecimal.valueOf(buf.length));
                                        csf.setFiles(blob);
                                        dbSession.save(csf);
                                        dbSession.flush();
                                        blob.free();
                                    }


                                    tx.commit();
                                }
                            }
                        }
                    }
                    else {
                        log.warn("No Attachment");
                    }

                    msg.setFlag(Flags.Flag.DELETED, true);
                    log.debug("Delete message from server");
                }
                catch (Exception e) {
                    log.error(e.getMessage(), e);
                    try {
                        tx.rollback();
                    }
                    catch (HibernateException ex) {
                        log.error(ex.getMessage(), ex);
                    }
                }
            } // for (int i = 0; i < n; i++)

        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
        }
        finally {
            if (folder != null) {
                try {
                    folder.close(true);
                }
                catch (MessagingException ex1) {
                    log.error(ex1.getMessage(), ex1);
                }
            }
            if (store != null) {
                try {
                    store.close();
                }
                catch (MessagingException ex2) {
                    log.error(ex2.getMessage(), ex2);
                }
            }
            log.debug("Close mail session");
            if(dbSession != null && dbSession.isOpen()) {
                try {
                    dbSession.close();
                }
                catch(HibernateException ex) {
                    log.error(ex.getMessage(), ex);
                }
            }
            log.debug("Close database session");
        }

    }

    private boolean hasSmgs2(List<DocDir> dcs) {
        boolean res = false;
        if (dcs != null) {
            for (DocDir item : dcs) {
                if ("smgs2".equals(item.getName())) {
                    res = true;
                    break;
                }
            }
        }
        return res;
    }

    private String decodeAddr(Address[] addr) {
        String res = "";
        if (addr != null) {
            for (Address anAddr : addr) {
                InternetAddress a = (InternetAddress) anAddr;
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

    private ArrayList<String> findAllParam(String str, Pattern p) {
        ArrayList<String> res = new ArrayList<>();
        Matcher m = p.matcher(str);
        while (m.find()) {
            res.add(m.group().trim());
        }
        return res;
    }

    static protected final SimpleDateFormat df2  = new SimpleDateFormat("yyyyMMddHHmmss");

    private void save2file(Message msg, String folder) throws MessagingException, IOException, URISyntaxException {
        File tmpDir = createDir(folder);
        // Сохраняем полученный файл во временную папку
        File file = File.createTempFile(df2.format(new Date()) + "_", ".eml", tmpDir);
        log.debug("Output file = " + file.getName());
        OutputStream os = new BufferedOutputStream(new FileOutputStream(file));
        msg.writeTo(os);
        os.close();
    }

    private File createDir(String folder) throws URISyntaxException {
        String tmpPath = new File(new URI(getClass().getResource("/").toString())).getAbsolutePath();
        File tmpDir = new File(tmpPath, folder);
        if (!tmpDir.exists()) {
            log.debug("Create " + folder + " dir: " + tmpDir.getAbsolutePath());
            if (!tmpDir.mkdirs())
                log.warn("The dir has not been created");
        }
        return tmpDir;
    }

    private ArrayList<Route> findRoute(Address[] fromArr, ArrayMap<String, Route> groupMap) {
        ArrayList<Route> res = new ArrayList<>();
        for (InternetAddress addr : (InternetAddress[]) fromArr) {
            String str = addr.getAddress();
            for (String mask : groupMap.getMap().keySet()) {
                if (FilenameUtils.wildcardMatch(str, mask, IOCase.SENSITIVE)) {
                    ArrayList<Route> group = groupMap.getArray(mask);
                    log.debug("Found group " + group + " for email + " + str);
                    res.addAll(group);
                }
            }
        }

        return res;
    }

}
