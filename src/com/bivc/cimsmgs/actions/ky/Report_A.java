package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.dao.YardDAO;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.db.ky.Vagon;
import com.bivc.cimsmgs.db.ky.Yard;
import com.bivc.cimsmgs.dto.ky.ListForPoezdDTO;
import com.bivc.cimsmgs.dto.ky.ListForVagonDTO;
import com.bivc.cimsmgs.sql.Select;
import com.isc.utils.dbStore.dbTool;
import com.isc.utils.dbStore.stPack;
import org.hibernate.engine.SessionFactoryImplementor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

//import org.hibernate.engine.spi.SessionFactoryImplementor;
//import org.hibernate.engine.spi.SessionImplementor;
//import org.hibernate.internal.SessionFactoryImpl;

/**
 * Created by p.dzeviarylin on 15.11.2014 12:48.
 */
public class Report_A extends CimSmgsSupport_A {
    final static private Logger log = LoggerFactory.getLogger(Report_A.class);

/*
    public String report1() throws IOException {
        log.info("report1");
        List<Poezd> poezds = poezdDAO.findByNppr(getNppr());
        if(CollectionUtils.isEmpty(poezds)){
            throw new RuntimeException("Poezd not found, nppr: " + getNppr());
        }

        ListForPoezdDTO dto = listForPoezd(poezds.iterator().next(), isInto == 1);

        ByteArrayOutputStream outputStream = ExportReport2Excel.convertReport1(dto, getNppr());
        inputStream = new ByteArrayInputStream(outputStream.toByteArray());
        return "view";
    }
*/

    public String report1() throws Exception {
      log.info("report1");

      dbTool dbt = null;
      stPack st = null;
      try {
        SessionFactoryImplementor sfi = (SessionFactoryImplementor) HibernateUtil.getSessionFactory();
        String schema = sfi.getSettings().getDefaultSchemaName();
        dbt = new dbTool(sfi.getConnectionProvider().getConnection(), schema);
/*
        SessionFactoryImpl sfi = (SessionFactoryImpl) HibernateUtil.getSessionFactory();
        String schema = sfi.getSettings().getDefaultSchemaName();
        dbt = new dbTool(sfi.getConnectionProvider().getConnection(), schema);
*/
        st = new stPack("poezd");

        stPack stw = new stPack();
        stw.setObject(0,"nppr",nppr.toUpperCase());
        stw.info.setType(0, Types.CHAR);
        log.debug(stw.toString());

        dbt.read(st, Select.getSqlFile("poezd/poezd_" + direction), stw, 0, "nppr");

        dbt.readChildData(st, "poezd", "vagon", Select.getSqlFile("poezd/vagon"), stw, "hid_p");
        dbt.readChildData(st, "vagon", "kont", Select.getSqlFile("poezd/kont_" + direction), stw, "hid_v");

        log.debug(st.toString());
        inputStream = new ByteArrayInputStream( new ExportReport1(st, direction).get().toByteArray() );
      }
      catch (Exception ex) {
//        log.error("error", ex);
        throw ex;
      }
      return "view";
    }

    public String report6() throws Exception {
      log.info("report6");

      dbTool dbt = null;
      stPack st = null;
      try {
        SessionFactoryImplementor sfi = (SessionFactoryImplementor) HibernateUtil.getSessionFactory();
        String schema = sfi.getSettings().getDefaultSchemaName();
        dbt = new dbTool(sfi.getConnectionProvider().getConnection(), schema);
  /*
          SessionFactoryImpl sfi = (SessionFactoryImpl) HibernateUtil.getSessionFactory();
          String schema = sfi.getSettings().getDefaultSchemaName();
          dbt = new dbTool(sfi.getConnectionProvider().getConnection(), schema);
  */
        st = new stPack("poezd");

        stPack stw = new stPack();
        stw.setObject(0,"nppr",nppr.toUpperCase());
        stw.info.setType(0, Types.CHAR);
        log.debug(stw.toString());

        dbt.read(st, Select.getSqlFile("poezd/poezd_" + direction), stw, 0, "nppr");

        dbt.readChildData(st, "poezd", "vagon", Select.getSqlFile("poezd/vagon"), stw, "hid_p");
        dbt.readChildData(st, "vagon", "kont", Select.getSqlFile("poezd/kont_peraklad"), stw, "hid_v");
        dbt.readChildData(st, "kont", "plomb", Select.getSqlFile("ky_plomb"), stw, "hid_k");

        log.debug(st.toString());
        inputStream = new ByteArrayInputStream( new ExportReport6(st, direction).get().toByteArray() );
      }
      catch (Exception ex) {
//        log.error("error", ex);
        throw ex;
      }
      return "view";
    }

    public static ListForPoezdDTO listForPoezd(Poezd poezd, boolean isInto){
        ListForPoezdDTO poezdDto = new ListForPoezdDTO();
        poezdDto.setVagSum(poezd.getVagons().size());
        int kontSum = 0;
        int numpp = 0;
        for(Vagon vagon: poezd.getVagons()){
            ListForVagonDTO vagonDTO = new ListForVagonDTO();
            vagonDTO.setNumpp(++numpp);
            vagonDTO.setNvag(vagon.getNvag());

            Set<Kont> konts = isInto ? vagon.getKontsInto() : vagon.getKontsOut();// + Set for KontsOut
            if(konts != null && konts.size() > 0){
                int index = 0;
                for(Kont kont: konts){
                    if(index > 0){
                        vagonDTO = new ListForVagonDTO();
                        vagonDTO.setNvag(vagon.getNvag());
//                        vagonDTO.setNvag("");
                    }

                    vagonDTO.setNkon(kont.getNkon());
                    vagonDTO.setPoruz(kont.getPoruz());

                    if(isInto){
                        switch (kont.getStatus()){
                            case AVTO_OUT:
                                vagonDTO.setAvtoOut(kont.getAvtoOut().getNo_avto());
                                break;
                            case POEZD_OUT:
                                vagonDTO.setNpprOut(kont.getPoezdOut().getNppr());
                                vagonDTO.setNvagOut(kont.getVagonOut().getNvag());
                                break;
                            case YARD:
                                vagonDTO.setKySector(kont.getKy_sector());
                                vagonDTO.setKyX(kont.getKy_x());
                                vagonDTO.setKyY(kont.getKy_y());
                                vagonDTO.setKyZ(kont.getKy_z());
                                break;
                        }
                    } else if(kont.getPrevStatus() != null){
                        switch (kont.getPrevStatus()){
                            case POEZD_INTO:
                                vagonDTO.setNpprInto(kont.getPoezdInto().getNppr());
                                vagonDTO.setNvagInto(kont.getVagonInto().getNvag());
                                break;
                            case AVTO_INTO:
                                vagonDTO.setAvtoInto(kont.getAvtoInto().getNo_avto());
                                break;
                            case YARD:
                                vagonDTO.setKySector(kont.getKy_sector());
                                vagonDTO.setKyX(kont.getKy_x());
                                vagonDTO.setKyY(kont.getKy_y());
                                vagonDTO.setKyZ(kont.getKy_z());
                                break;
                        }
                    }

                    poezdDto.getVags().add(vagonDTO);
                    index++;
                    kontSum++;
                }
            } else{
                poezdDto.getVags().add(vagonDTO);
            }
        }
        poezdDto.setKontSum(kontSum);

        return poezdDto;
    }

    public String report2() throws IOException {
        log.info("report2");
        List<Filter> filters = getFilters();

        List<Yard> yards = yardDAO.findAll4Report2(filters, getUser().getUsr(), getLocale());

        ByteArrayOutputStream outputStream = ExportReport2Excel.convertReport2(yards);
        inputStream = new ByteArrayInputStream(outputStream.toByteArray());
        return "view";
    }

    public String report3() throws Exception {
      log.info("report3");

      dbTool dbt = null;
      stPack st = null;
      try {
        SessionFactoryImplementor sfi = (SessionFactoryImplementor) HibernateUtil.getSessionFactory();
        String schema = sfi.getSettings().getDefaultSchemaName();
        dbt = new dbTool(sfi.getConnectionProvider().getConnection(), schema);
        st = new stPack("foot");
        dbt.read(st, Select.getSqlFile("nsi_vag_foot"), null);
        stPack stw = new stPack();
        stw.setObject(0,"dat1",getDat1());
        stw.setObject(0,"dat2",getDat2());
        stw.info.setType(0, Types.DATE);
        stw.info.setType(1, Types.DATE);

        log.debug(stw.toString());

        dbt.readChildData(st, "foot", "ky_vagon", Select.getSqlFile("ky_vagon"), stw, "dat1,dat2,foot");
        dbt.readChildData(st, "ky_vagon", "ky_vagon2", Select.getSqlFile("ky_vagon2"), stw, "nvag,dprb,nvag,dprb");

        log.debug(st.toString());
        inputStream = new ByteArrayInputStream( new ExportReport3(st, stw).get().toByteArray() );

      }
      catch (Exception ex) {
//        addActionError(ex.getMessage());
//        log.error("error", ex);
        throw ex;
      }
//      finally {
//        if (dbt != null) dbt.close();
//      }


//      List<Filter> filters = getFilters();

//      List<Yard> yards = yardDAO.findAll4Report2(filters, getUser().getUsr(), getLocale());

//      ByteArrayOutputStream outputStream = ExportReport2Excel.convertReport2(yards);
//      inputStream = new ByteArrayInputStream(outputStream.toByteArray());
      return "view";
    }

    public String report4() throws Exception {
      log.info("report4");

      dbTool dbt = null;
      stPack st = null;
      try {
        SessionFactoryImplementor sfi = (SessionFactoryImplementor) HibernateUtil.getSessionFactory();
        String schema = sfi.getSettings().getDefaultSchemaName();
        dbt = new dbTool(sfi.getConnectionProvider().getConnection(), schema);
        st = new stPack("koleya");
        stPack stw = new stPack();
        stw.setObject(0,"koleya",koleya);
        stw.info.setType(0, Types.NUMERIC);
        dbt.read(st, Select.getSqlFile("koleya_line"), stw, 0, "koleya");
//        stw = new stPack();
//        stw.setObject(0,"dat1",getDat1());
//        stw.setObject(0,"dat2",getDat2());
//        stw.info.setType(0, Types.DATE);
//        stw.info.setType(1, Types.DATE);

//        log.debug(stw.toString());

        dbt.readChildData(st, "koleya", "ky_vagon", Select.getSqlFile("ky_vagon_shkol"), stw, "koleya,line");
//        dbt.readChildData(st, "ky_vagon", "ky_vagon2", Select.getSqlFile("ky_vagon2"), stw, "nvag,dprb,nvag,dprb");

        log.debug(st.toString());
        inputStream = new ByteArrayInputStream( new ExportReport4(st, koleya).get().toByteArray() );

      }
      catch (Exception ex) {
//        log.error("error", ex);
        throw ex;
      }
      return "view";
    }

    public String report5() throws Exception {
      log.info("report5");

      // SELECT k.* FROM ky_poezd p, ky_kont k WHERE p.direction=1 AND p.koleya=1 AND p.hid=k.hid_poezd_into

      dbTool dbt = null;
      stPack st = null;
      try {
        SessionFactoryImplementor sfi = (SessionFactoryImplementor) HibernateUtil.getSessionFactory();
        String schema = sfi.getSettings().getDefaultSchemaName();
        dbt = new dbTool(sfi.getConnectionProvider().getConnection(), schema);
        st = new stPack("owner");

        stPack stw = new stPack("filtr");
        stw.setObject(0,"koleya",koleya);
        stw.info.setType(0, Types.NUMERIC);

        dbt.read(st, Select.getSqlFile("owner_kont_prib"), stw, 0, "koleya");
//        stw = new stPack();
//        stw.setObject(0,"dat1",getDat1());
//        stw.setObject(0,"dat2",getDat2());
//        stw.info.setType(0, Types.DATE);
//        stw.info.setType(1, Types.DATE);

//        log.debug(stw.toString());

        dbt.readChildData(st, "owner", "kont_owner", Select.getSqlFile("ky_vag_kont_prib"), stw, "koleya,hid_owner,line,dprb");
        dbt.readChildData(st, "kont_owner", "ky_plomb", Select.getSqlFile("ky_plomb"), null, "hid");

        log.debug(st.toString());
        inputStream = new ByteArrayInputStream( new ExportReport5(st, koleya).get().toByteArray() );

      }
      catch (Exception ex) {
//        log.error("error", ex);
        throw ex;
      }
      return "view";
    }

    private List<Filter> getFilters() {
        List<Filter> filters = new ArrayList<Filter>();
        if(sectorHid != null){
            filters.add(new Filter("sector", sectorHid.toString()));
        }
        if(x != null){
            filters.add(new Filter("x", x.toString()));
        }
        if(y != null){
            filters.add(new Filter("y", y.toString()));
        }
        if(z != null){
            filters.add(new Filter("z", z.toString()));
        }
        return filters;
    }

    private PoezdDAO poezdDAO;
    private YardDAO yardDAO;

    private InputStream inputStream;
    private String nppr = "";
    private int isInto;

    private Integer sectorHid;
    private Long x;
    private Long y;
    private Long z;

    private Date dat1;
    private Date dat2;

    private int direction;
    private int koleya;

    public int getKoleya() {
      return koleya;
    }

    public void setKoleya(int koleya) {
      this.koleya = koleya;
    }

    public int getDirection() {
      return direction;
    }

    public void setDirection(int direction) {
      this.direction = direction;
    }

    public Date getDat1() {
      return dat1;
    }

    public void setDat1(Date dat1) {
      this.dat1 = dat1;
    }

    public Date getDat2() {
      return dat2;
    }

    public void setDat2(Date dat2) {
      this.dat2 = dat2;
    }

    public Report_A setPoezdDAO(PoezdDAO poezdDAO) {
        this.poezdDAO = poezdDAO;
        return this;
    }

    public InputStream getInputStream() {
        return inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    public String getNppr() {
        return nppr;
    }

    public void setNppr(String nppr) {
        this.nppr = nppr;
    }

    public void setInto(int isInto) {
        this.isInto = isInto;
    }

    public int getInto() {
        return this.isInto;
    }

    public Integer getSectorHid() {
        return sectorHid;
    }

    public void setSectorHid(Integer sectorHid) {
        this.sectorHid = sectorHid;
    }

    public Long getX() {
        return x;
    }

    public void setX(Long x) {
        this.x = x;
    }

    public Long getY() {
        return y;
    }

    public void setY(Long y) {
        this.y = y;
    }

    public Long getZ() {
        return z;
    }

    public void setZ(Long z) {
        this.z = z;
    }

    public Report_A setYardDAO(YardDAO yardDAO) {
        this.yardDAO = yardDAO;
        return this;
    }
}
