package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.dto.CimSmgsTrainDateDTO;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

public interface SmgsDAO extends GenericDAO<CimSmgs, Long> {
    public List<CimSmgs> findAll(Integer limit, Integer start, Search search, Usr usr) throws InfrastructureException;

    public Long countAll(Search search, Usr usr);

    public CimSmgs findById1(Long id);

    public CimSmgs findById2(CimSmgs smgs);
    public CimSmgs findById3(Long smgs);

    //  public List findAll4Iftmins(Integer limit, Integer start, Search search, String trans);
//  public Integer countAll4Iftmins(Search search, String trans);
    public void update4FTS(String npoezd, String index_p, String n_ppv, Date dprb, Long hid, Usr user, Byte type);

    public void updateByReady(String kod, Long id, Usr usr);

    public List<Long> findAll4Iftmins1(Byte type, Long routeId, Usr usr, byte docReadyStatus);

    public List<CimSmgs> findAll4FTS(Byte type, Long routeId, Usr usr);

    public Long countAll4Iftmins1(/*Search search,*/ Usr usr, Long id);

    public List<BIftminLog> findIftminText(Long id, String mes_name, String code);

    public List<TbcLog> findTbcText(Long id);

    public List<BIftminLog> findAperakText(Long id, String mes_name, String code);

    public List<CsComnt> findComntText(Long id);

    public List<CimSmgs> findAllRep(Search search, Usr usr);

    public void changeStatus(BigDecimal status, Long hid);

    public void changeTbcStatus(Byte status, Long hid);

    public void changeUserFlag(String flag, Long hid);

//    List<CimSmgs> findAllRep1(Search search, Usr usr);

    public List<CimSmgs> findStat(Integer limit, Integer start, Search search, Usr usr);

    public Long countAllStat(Search search, Usr usr);

    public void changeFtsStatus(Byte ftsStatus, Long hid);

    public void changeBtlcStatus(Byte btlcStatus, Long hid);

    public List<CimSmgs> findDocsByNPoezd(String npoezd, int type, long routeId);

    public Long countDocsByNPoezd(String npoezd, int type, long routeId);

    public Long countAll(PackDoc packDoc);

    public void delete(Long hid);

    public List<CimSmgs> findDocByNPoezd(String npoezd, Byte type, long routeId);

    public List<CimSmgs>findDocsByNPoezdAndDateInterval(String[] npoezds, Search search, Usr usr);

    public List<CimSmgs> findKontVedByNPoezd(String npoezd, Byte type, long routeId);

    public List<Map> findData4SummaryDoc(String npoezd, Byte type, long routeId);

    public Long countAll4Iftmins1(Byte type, Long routeId, Usr usr, byte docReadyStatus);

    public Long countAll4Btlc(Byte type, Long hid, Usr usr, byte docReadyStatus);

    public List<Long> findAll4Btlc(Byte type, Long routeId, Usr usr, byte btlcReadyStatus);

    public Long countAll4Tdg(Byte type, Long hid, Usr usr, byte tdgReadyStatus);

    public List<Long> findAll4Tdg(Byte type, Long hid, Usr usr, byte tdgReadyStatus);

    public void changeTdgStatus(Byte tdg_status, Long aLong);

    public CimSmgs findDocInPackDoc(Long packDocHid, BigDecimal docTypeHid);

    public List<CimSmgs> findByIds(List<Long> ids);

    public List<CimSmgsTrainDateDTO> findTrainDate(Integer limit, Integer start, Search search, Usr usr);

    public List<CimSmgs> findSmgsTrainDate(Integer limit, Integer start, Search search, Usr usr);

}
