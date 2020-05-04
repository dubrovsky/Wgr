package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.DocType;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.ProjProperties;
import com.bivc.cimsmgs.commons.VidOtpr;
import com.bivc.cimsmgs.db.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.FastDateFormat;
import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.activation.DataHandler;
import javax.mail.util.ByteArrayDataSource;
import java.io.*;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.bivc.cimsmgs.commons.Validators.checkKontNumber;
import static com.bivc.cimsmgs.commons.Validators.checkVagNumber;
import static com.bivc.cimsmgs.exchange.Utils.normNvagNkonStr;
import static java.nio.file.StandardOpenOption.READ;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

public class GrCopLoader {

    private static final Logger log = LoggerFactory.getLogger(GrCopLoader.class);
    private static final Pattern multi_prin_nkon_p = Pattern.compile("([a-zA-Z]{4}[ -]?\\d{6}[-]?\\d{1}(?=(\\p{Punct}|\\p{Space}|\\u00A0|\\u2007|\\u202F|\\z)))+");
    private static final Pattern multi_nvag_p = Pattern.compile("((\\d{4}[ -]?)?\\d{7}[ -]?\\d{1}(?=[ ,;]*?))+");
    private static final HashSet<String> extSet = new HashSet<>(3);
    private static final int interval = 14;
    private static final String fileInfType= "files";
    private static final FastDateFormat ldf = FastDateFormat.getInstance("ddMMyyyyHHmmss");

    private static final String ZIP = "ZIP";
    private static final String RAR = "RAR";
    private static final String _7Z = "7Z";
    private static final String LINE_SEPARATOR = System.getProperty("line.separator");
    private static Path tmpDir;

    static {
        extSet.add(ZIP);
        extSet.add(RAR);
        extSet.add(_7Z);

        try {
            tmpDir = Files.createDirectories(Paths.get(System.getProperty("java.io.tmpdir") + FileSystems.getDefault().getSeparator() + GrCopLoader.class.getName() + "_second_"));
        }
        catch (IOException e) {
            log.error(e.getMessage(), e);
        }
        log.debug("TmpDir=" + tmpDir);
    }

    public GrCopLoader() {
    }

    public GrCop load(GrCop grCop, Route route, Usr usr, DocType docType) {
        log.debug("{}", grCop);

        GrCop misList = new GrCop(grCop.onlyNew, grCop.npoezd);
        Session dbSession = HibernateUtil.getSession();
        TreeMap<String, String> cmdMap = ProjProperties.getMap("ARCH_PATH");
        Date dattr = new Date();

        for (FileItem item : grCop.fileList) {
            try {
                boolean isKont;
                ArrayList<String> kontList;
                ArrayList<String> vagList;
                Path tmpMailDir = null;
                Path arcFile = null;
                Path workDir = null;

                String name = item.getName();
                String fileExt = "";
                int k = name.lastIndexOf(".");
                if (k >= 0)
                    fileExt = name.substring(k + 1).toUpperCase();

                kontList = findAllParam(name, multi_prin_nkon_p, true);
                if (kontList.size() > 0) {
                    isKont = true;
                    vagList = new ArrayList<>(1);  // пустышка для контейнорной отправки
                    vagList.add("");
                }
                else {
                    isKont = false;
                    vagList = findAllParam(name, multi_nvag_p, false);
                    if (vagList.size() == 0) {
                        log.error("Filename {} does not match the mask. Add to missed", name);
                        misList.addFileItem(item);
                        continue;
                    }
                }

                PackDoc pd;
                CimSmgs cs = null;
                if (!grCop.onlyNew) {
                    String sss = isKont ? "UPPER(k.utiN)" : "c.nvag";
                    @SuppressWarnings("unchecked")
                    List<CimSmgs> list = dbSession.createQuery("SELECT a FROM CimSmgs AS a JOIN a.cimSmgsCarLists c" + (isKont ? " JOIN c.cimSmgsKonLists k" : "") +
                            " WHERE a.arch IS NULL AND REPLACE(REPLACE(" + sss + ", '-', ''), ' ', '') in (:list)" +
                            " AND a.dattr > TIMESTAMPADD(DAY, -" + interval + ", NOW())" +
                            " AND a.type = " + docType.getType() +
                            " AND a.route = :r" +
                            " ORDER BY a.altered DESC")
                            .setParameterList("list", isKont ? kontList : vagList)
                            .setParameter("r", route)
                            .list();

                    if (list.size() > 0) {
                        if (list.size() == 1) {
                            cs = list.get(0);
                        }
                        else {
                            for (CimSmgs c : list) {
                                if (isNotBlank(c.getG1r())) {
                                    cs = c;
                                    break;
                                }
                            }
                            if (cs == null) {
                                cs = list.get(0);
                            }
                        }
                    }
                }

                if (cs != null) {
                    String logStr = isKont ? "NKON=" + StringUtils.join(kontList, ", ") : "NVAG=" + StringUtils.join(vagList, ", ");
                    log.debug(logStr + " found in SMGS [HID=" + cs.getHid() + "]");
                    cs.setDattr(dattr);
                    dbSession.update(cs);
                    pd = cs.getPackDoc();
                }
                else {
                    cs = new CimSmgs();
                    cs.setUn(usr.getUn());
                    cs.setTrans(usr.getGroup().getName());
                    cs.setType(docType.getType());
                    cs.setDocType1(docType.getDocType1());
                    cs.setRoute(route);
                    cs.setNpoezd(grCop.npoezd);
                    if (isKont) {
                        cs.setG25(VidOtpr.KONT.getG25());
                    }

                    pd = new PackDoc();
                    pd.setUsrGroupsDir(usr.getGroup());
                    pd.setRoute(route);
                    pd.addCimSmgsItem(cs);

                    byte carSort = 1;
                    CimSmgsCarList firstCar = null;
                    for (String nvag : vagList) {
                        CimSmgsCarList csc = new CimSmgsCarList();
                        csc.setSort(carSort);
                        csc.setNvag(nvag);
                        cs.addCimSmgsCarListItem(csc);
                        if (carSort == 1)
                            firstCar = csc;
                        carSort++;
                    }

                    byte kontSort = 1;
                    for (String nkon : kontList) {
                        CimSmgsKonList csk = new CimSmgsKonList();
                        csk.setSort(kontSort);
                        csk.setUtiN(nkon);
                        firstCar.addCimSmgsKonListItem(csk);
                    }

                    dbSession.save(pd);
                    log.debug("New SMGS [HID=" + cs.getHid() + "]");
                }

                ArrayList<DataHandler> dhList = new ArrayList<>();
                ArrayList<Path> tempFileList = new ArrayList<>();

                if (extSet.contains(fileExt)) {
                    tmpMailDir = Files.createTempDirectory(this.getClass().getSimpleName() + "_");
                    arcFile = tmpMailDir.resolve(item.fileName);
                    Files.copy(item.file.toPath(), arcFile);
                    workDir = Files.createTempDirectory(tmpMailDir, "tmp_");
                    String arcFileName = arcFile.toFile().getAbsolutePath();
                    String workDirName = workDir.toFile().getAbsolutePath();

                    ProcessBuilder pr = null;
                    switch (fileExt) {
                        case RAR:
                            pr = new ProcessBuilder(cmdMap.get(RAR), "e", "-or", arcFileName, workDirName);
                            break;
                        case ZIP:
                        case _7Z:
                            pr = new ProcessBuilder(cmdMap.get(_7Z), "e", "-aou", "-o" + workDirName, "-bd", arcFileName);
                            break;
                    }
                    if (pr != null) {
                        pr.redirectErrorStream(true);
                        Process p = pr.start();

                        StringBuilder s = new StringBuilder();
                        BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream(), StandardCharsets.UTF_8));
                        String line;
                        while ((line = r.readLine()) != null) {
                            s.append(line).append(LINE_SEPARATOR);
                        }
                        log.debug(s.toString());

                        p.waitFor();
                    }
                    else {
                        log.warn("CMD not defined for " + fileExt);
                    }

                    try (DirectoryStream<Path> dir = Files.newDirectoryStream(workDir)) {
                        for (Path f : dir) {
                            if (!Files.isDirectory(f)) {
                                // если использовать FileDataSource, то Hibernate блокирует файл
                                try (InputStream is = Files.newInputStream(f, READ)) {
                                    ByteArrayDataSource ds = new ByteArrayDataSource(is, Files.probeContentType(f));
                                    ds.setName(f.getFileName().toString());
                                    dhList.add(new DataHandler(ds));
                                }
                            }
                            tempFileList.add(f);
                        }
                    }
                    catch (DirectoryIteratorException x) {
                        log.error(x.getMessage(), x);
                    }
                }
                else {
                    // если использовать FileDataSource, то Hibernate блокирует файл
                    try (InputStream is = Files.newInputStream(item.file.toPath(), READ)) {
                        ByteArrayDataSource ds = new ByteArrayDataSource(is, item.contentType);
                        ds.setName(item.fileName);
                        dhList.add(new DataHandler(ds));
                    }
                }

                // insert into DB
                for (DataHandler dh : dhList) {
                    Set<CimSmgsFileInf> infSet = pd.getCimSmgsFileInfs();
                    CimSmgsFileInf inf = null;
                    String logStr = null;
                    for (CimSmgsFileInf i : infSet) {
                        if (fileInfType.equals(i.getType())) {
                            inf = i;
                            logStr = "Found";
                            break;
                        }
                    }

                    if (inf == null) {
                        inf = new CimSmgsFileInf();
                        inf.setRoute(route);
                        inf.setType(fileInfType);
                        inf.setTrans(pd.getUsrGroupsDir().getName());
                        inf.setDattr(dattr);
                        inf.setUn(usr.getUn());
                        pd.addFileInfItem(inf);
                        logStr = "New";
                    }
                    log.debug(logStr);

                    CimSmgsFile csf = new CimSmgsFile();
                    csf.setFileName(dh.getName());
                    csf.setContentType(dh.getContentType());
                    csf.setUn(usr.getUn());
                    csf.setDat(dattr);
                    inf.addFileItem(csf);

                    try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
                        dh.writeTo(out);
                        byte[] buf = out.toByteArray();
                        Blob blob = Hibernate.getLobCreator(dbSession).createBlob(buf);
                        csf.setLength(BigDecimal.valueOf(buf.length));
                        csf.setFiles(blob);
                        dbSession.flush();
                        blob.free();
                    }
                    catch (SQLException e) {
                        log.error(e.getMessage(), e);
                    }
                }

                // delete temp files and dirs
                if (tmpMailDir != null) {
                    try {
                        for (Path f : tempFileList) {
                            Files.delete(f);
                        }
                        Files.delete(arcFile);
                        Files.delete(workDir);
                        Files.delete(tmpMailDir);
                    }
                    catch (IOException e) {
                        log.error(e.getMessage(), e);
                    }
                }

                if (item.isSecond) {
                    item.file.delete();
                }
            }
            catch (IOException | InterruptedException ex) {
                log.error(ex.getMessage(), ex);
            }
        }

        // keep missed files from auto deleting
        for (FileItem item : misList.fileList) {
            try {
                String id = ldf.format(new Date()) + (long)(Math.random() * 1000000 + 1);
                Path newFile = tmpDir.resolve(id + "_" + item.fileName);
                Files.copy(item.file.toPath(), newFile);
                item.file = newFile.toFile();
                item.isSecond = true;
            }
            catch (IOException e) {
                log.error(e.getMessage(), e);
            }
        }

        return misList;
    }

    protected static ArrayList<String> findAllParam(String str, Pattern p, boolean isKont) {
        ArrayList<String> res = new ArrayList<>();
        Matcher m = p.matcher(str);
        while (m.find()) {
            String group = m.group();
            boolean check = isKont ? checkKontNumber(group) : checkVagNumber(group);
            if (check) {
                res.add(normNvagNkonStr(group));
            }
            else {
                log.warn("Wrong check mark in " + group);
            }
        }
        log.debug("{}", res);
        return res;
    }

    public static class GrCop {
        public boolean onlyNew;
        public String npoezd;
        public List<FileItem> fileList = new ArrayList<>();

        public GrCop(boolean onlyNew, String npoezd) {
            this.onlyNew = onlyNew;
            this.npoezd = npoezd;
        }

        public void addFileItem(FileItem fileItem) {
            fileList.add(fileItem);
        }

        public void deleteSecond() {
            for (FileItem item : fileList) {
                if (item.isSecond) {
                    item.file.delete();
                }
            }
        }

        @Override
        public String toString() {
            return "{onlyNew=" + onlyNew + ", npoezd='" + npoezd + "', fileList=[" + StringUtils.join(fileList, ",\r\n") + "]}";
        }
    }

    public static class FileItem {
        public int id;
        public File file;
        public String fileName;
        public String contentType;
        public String nvagNkon = null;
        public boolean isSecond = false;

        public FileItem(int id, File file, String fileName, String contentType) {
            this.id = id;
            this.file = file;
            this.contentType = contentType;
            this.fileName = fileName;
        }

        public String getName() {
            return isNotBlank(nvagNkon) ? nvagNkon : fileName;
        }

        @Override
        public String toString() {
            return "{id=" + id + ", file=" + file + ", fileName='" + fileName + "', contentType='" + contentType + "', nvagNkon='" + nvagNkon + "'}";
        }
    }

}
