package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.dto.ky.NsiKyOwnersDTO;

import java.util.Date;

/**
 * Created by dubrovsky on 25.01.2015.
 */
public interface IKontBaseDTO {
    Long getHid();

    void setHid(Long hid);

    String getNkon();

    void setNkon(String nkon);

    Boolean getPoruz();

    void setPoruz(Boolean poruz);

    Byte getSort();

    void setSort(Byte sort);

    Long getMassa_tar();

    void setMassa_tar(Long massa_tar);

    Float getPod_sila();

    void setPod_sila(Float pod_sila);

    String getType();

    void setType(String type);

    String getVid();

    void setVid(String vid);

    String getPrizn_sob();

    void setPrizn_sob(String prizn_sob);

    String getNaim_sob();

    void setNaim_sob(String naim_sob);

    String getGruzotpr();

    void setGruzotpr(String gruzotpr);

    Date getTeh_obsl();

    void setTeh_obsl(Date teh_obsl);

    String getPrim();

    void setPrim(String gruzotpr);

    NsiKyOwnersDTO getOwner();

    void setOwner(NsiKyOwnersDTO owner);

    String getPunkt_otpr();

    void setPunkt_otpr(String punkt_otpr);

    String getPunkt_nazn();

    void setPunkt_nazn(String punkt_nazn);
}
