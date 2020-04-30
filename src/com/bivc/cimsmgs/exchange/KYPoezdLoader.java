package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.exchange.xls2kypoezd.KYPoezdReaderFactory;
import com.bivc.cimsmgs.exchange.xls2kypoezd.Reader;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.math.BigDecimal;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.apache.commons.lang3.StringUtils.isNotBlank;

public class KYPoezdLoader {
    private static final Pattern PRINNKON_P = Pattern.compile("^[a-zA-Z]{4}[0-9]{7,9}$");
    private static final Logger log = LoggerFactory.getLogger(KYPoezdLoader.class);

    public Map<String, List<?>> load(File file, PoezdZayavParent poezd, boolean update) throws Exception {
        log.debug(poezd.getClass().getSimpleName() + ", " + update);
        Map<String, List<?>> res = new HashMap<>(2);
        ArrayList<Kont> kontList = new ArrayList<>();
        TreeMap<String, Vagon> vagMap = new TreeMap<>();

        short vagSort = 0;
        int konSort = 0;

        try (Workbook wb = WorkbookFactory.create(file)) {
            Sheet sheet = wb.getSheetAt(0);

            Reader r = KYPoezdReaderFactory.getReader(sheet);

            TreeMap<String, Vagon> oldVagMap = new TreeMap<>();
            for (Vagon vag : poezd.getVagons()) {
                oldVagMap.put(vag.getNvag(), vag);
            }
            TreeMap<String, Kont> oldKontMap = poezd.getAllKont();

            for (int j = r.start(); j <= sheet.getLastRowNum() + 1; j++) {
                if (r.skip(j))
                    continue;

                String nvag = r.getNvag(j);
                String nkon = r.getNkon(j);
                log.debug("Row=" + j + " NKON=" + nkon + " NVAG=" + nvag);
                Matcher m = PRINNKON_P.matcher(nkon);
                boolean isKont = m.matches();

                Vagon oldVag = oldVagMap.get(nvag);
                Vagon vag = null;
                if (update && oldVag == null) {
                    log.debug("Vagon not found for updating - skip");
                }
                else {
                    vag = vagMap.get(nvag);
                    if (vag == null) {
                        if (oldVag == null) {
                            vag = new Vagon();
                            vag.setNvag(nvag);
                            vag.setSort(vagSort++);
                            if (isKont)
                                vag.setOtpravka(Otpravka.CONT);

                            poezd.addVagon(vag);
                            konSort = 0;
                        }
                        else {
                            vag = oldVag;
                        }
                        vagMap.put(nvag, vag);

                        String sobstv = r.getSobstvVag(j);
                        if (isNotBlank(sobstv))
                            vag.setSobstv(sobstv);

                        BigDecimal taraVag = r.getTaraVag(j);
                        if (taraVag != null)
                            vag.setMasTar(taraVag);

                        BigDecimal podSilaVag = r.getPodSilaVag(j);
                        if (podSilaVag != null)
                            vag.setPodSila(podSilaVag);

                        Integer kolOs = r.getKolOs(j);
                        if (kolOs != null)
                            vag.setKolOs(kolOs);
                    }
                }

                if (isKont) {
                    Kont oldKont;
                    if (update) {
                        oldKont = oldKontMap.get(nkon);
                        if (oldKont == null) {
                            log.debug("Kont not found for updating - skip");
                            continue;
                        }
                    }
                    else {
                        oldKont = vag.findKont(nkon);
                    }
                    Kont kont;
                    if (oldKont == null) {
                        kont = new Kont();
                        kont.setSort(konSort++);
                        kont.setNkon(nkon);
                        if (poezd instanceof PoezdZayav) {
                            kont.setIsZayav((byte) 1);
                        }
                        kont.setGruzotpr(poezd.getGruzotpr());
                        kont.setClient(poezd.getClient());

                        vag.addKont(kont);
                    }
                    else {
                        kont = oldKont;
                    }
                    kontList.add(kont);

                    String notp = r.getNotp(j);
                    if (isNotBlank(notp))
                        kont.setNotp(notp);

                    String typeKont = r.getTypeKont(j);
                    if (isNotBlank(typeKont))
                        kont.setType(typeKont);

                    String vidKont = r.getVidKont(j);
                    if (isNotBlank(vidKont))
                        kont.setVid(vidKont);

                    BigDecimal podSilaKont = r.getPodSilaKont(j);
                    if (podSilaKont != null)
                        kont.setPod_sila(podSilaKont);

                    String primKont = r.getPrimKont(j);
                    if (isNotBlank(primKont))
                        kont.setPrim(primKont);

                    BigDecimal tara = r.getTaraKont(j);
                    if (tara != null)
                        kont.setMassa_tar(tara);

                    BigDecimal mbrt = r.getBruttoKont(j);
                    if (mbrt != null)
                        kont.setMassa_brutto(mbrt);

                    kont.setMassa_brutto_all(r.getBruttoAllKont(j, kont.getMassa_tar(), kont.getMassa_brutto()));

                    kont.removePlomby();
                    int plombSort = 0;
                    String plStr = r.getPlombZnak(j);
                    if (isNotBlank(plStr)) {
                        String[] znakAr = plStr.split(",|;/");
                        for (String znak : znakAr) {
                            Plomb plomb = new Plomb();
                            plomb.setZnak(znak.trim());
                            plomb.setKpl((short) 1);
                            plomb.setSort(plombSort++);
                            kont.addPlomb(plomb);
                        }
                    }

                    String kgvn = r.getKgvn(j);
                    String nzgr = r.getNzgr(j);
                    if (isNotBlank(kgvn) || isNotBlank(nzgr)) {
                        kont.removeGruzy();
                        Gruz gruz = new Gruz();
                        gruz.setSort(0);
                        gruz.setKgvn(kgvn);
                        gruz.setNzgr(nzgr);
                        gruz.setMassa(kont.getMassa_brutto());
                        kont.addGruz(gruz);
                    }
                }

                r.endRow();
            }
        }

        res.put("konts", kontList);
        res.put("vags", new ArrayList<>(vagMap.values()));
        return res;
    }
}
