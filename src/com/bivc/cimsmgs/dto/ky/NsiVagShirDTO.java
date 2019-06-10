package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.util.Date;

/**
 * @author p.dzeviarylin
 */

@JsonInclude(JsonInclude.Include.NON_NULL)
public class NsiVagShirDTO {
    private Long hid;
    private String nvag;
    private String typeNo;
    private String yearB;
    private String factoryB;
    private String modelvag;
    private Integer dlvag;
    private Long tara;
    private Long gp;
    private String okpoOwn;
    private String nown;
    private String okpoArend;
    private String narend;
    private NsiKyOwnersDTO owner;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date datePlanrem;
    private String prim;
    private String groupvag;
    private String owntypen;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dparkIn;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dparkOut;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dateBVag;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dProbegV;
    private Integer ostProbeg;

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getNvag() {
        return nvag;
    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public String getTypeNo() {
        return typeNo;
    }

    public void setTypeNo(String typeNo) {
        this.typeNo = typeNo;
    }

    public String getYearB() {
        return yearB;
    }

    public void setYearB(String yearB) {
        this.yearB = yearB;
    }

    public String getFactoryB() {
        return factoryB;
    }

    public void setFactoryB(String factoryB) {
        this.factoryB = factoryB;
    }

    public String getModelvag() {
        return modelvag;
    }

    public void setModelvag(String modelvag) {
        this.modelvag = modelvag;
    }

    public Integer getDlvag() {
        return dlvag;
    }

    public void setDlvag(Integer dlvag) {
        this.dlvag = dlvag;
    }

    public Long getTara() {
        return tara;
    }

    public void setTara(Long tara) {
        this.tara = tara;
    }

    public Long getGp() {
        return gp;
    }

    public void setGp(Long gp) {
        this.gp = gp;
    }

    public String getOkpoOwn() {
        return okpoOwn;
    }

    public void setOkpoOwn(String okpoOwn) {
        this.okpoOwn = okpoOwn;
    }

    public String getNown() {
        return nown;
    }

    public void setNown(String nown) {
        this.nown = nown;
    }

    public String getOkpoArend() {
        return okpoArend;
    }

    public void setOkpoArend(String okpoArend) {
        this.okpoArend = okpoArend;
    }

    public String getNarend() {
        return narend;
    }

    public void setNarend(String narend) {
        this.narend = narend;
    }

    public Date getDatePlanrem() {
        return datePlanrem;
    }

    public void setDatePlanrem(Date datePlanrem) {
        this.datePlanrem = datePlanrem;
    }

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public String getGroupvag() {
        return groupvag;
    }

    public void setGroupvag(String groupvag) {
        this.groupvag = groupvag;
    }

    public String getOwntypen() {
        return owntypen;
    }

    public void setOwntypen(String owntypen) {
        this.owntypen = owntypen;
    }

    public Date getDparkIn() {
        return dparkIn;
    }

    public void setDparkIn(Date dparkIn) {
        this.dparkIn = dparkIn;
    }

    public Date getDparkOut() {
        return dparkOut;
    }

    public void setDparkOut(Date dparkOut) {
        this.dparkOut = dparkOut;
    }

    public Date getDateBVag() {
        return dateBVag;
    }

    public void setDateBVag(Date dateBVag) {
        this.dateBVag = dateBVag;
    }

    public Date getdProbegV() {
        return dProbegV;
    }

    public void setdProbegV(Date dProbegV) {
        this.dProbegV = dProbegV;
    }

    public Integer getOstProbeg() {
        return ostProbeg;
    }

    public void setOstProbeg(Integer ostProbeg) {
        this.ostProbeg = ostProbeg;
    }

    public NsiKyOwnersDTO getOwner() {
        return owner;
    }

    public void setOwner(NsiKyOwnersDTO owner) {
        this.owner = owner;
    }
}
