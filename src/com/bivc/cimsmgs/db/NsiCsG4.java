package com.bivc.cimsmgs.db;

import java.util.Date;

public class NsiCsG4 implements java.io.Serializable {

	private Long hid;
	private Date dattr;
	private Date locked;
	private String unLock;
	private String trans;
	private String un;
	private Date deleted;
	private Date altered;
	private String g4;
	private String g41;
	private String g42;
	private String g43;
	private String g44;
	private String g45;
	private String g46;
	private String g46r;
	private String g47;
	private String g48;
	private String g48r;
	private String g49;
	private String g49r;
	private String g5;
	private String g6;
	private String g4r;
	private String g410;
	private String g411;
	private String g412;
	private String dop_info;

	public NsiCsG4() {
	}

	public NsiCsG4(Long hid, Date dattr, Date altered) {
		this.hid = hid;
		this.dattr = dattr;
		this.altered = altered;
	}

	public NsiCsG4(Long hid, Date dattr, Date locked, String unLock,
			String trans, String un, Date deleted, Date altered, String g4,
			String g41, String g42, String g43, String g44, String g45,
			String g46, String g46r, String g47, String g48, String g48r,
			String g49, String g49r, String g5, String g6, String g4r,
			String g410, String g411, String g412) {
		this.hid = hid;
		this.dattr = dattr;
		this.locked = locked;
		this.unLock = unLock;
		this.trans = trans;
		this.un = un;
		this.deleted = deleted;
		this.altered = altered;
		this.g4 = g4;
		this.g41 = g41;
		this.g42 = g42;
		this.g43 = g43;
		this.g44 = g44;
		this.g45 = g45;
		this.g46 = g46;
		this.g46r = g46r;
		this.g47 = g47;
		this.g48 = g48;
		this.g48r = g48r;
		this.g49 = g49;
		this.g49r = g49r;
		this.g5 = g5;
		this.g6 = g6;
		this.g4r = g4r;
		this.g410 = g410;
		this.g411 = g411;
		this.g412 = g412;
	}

	public Long getHid() {
		return this.hid;
	}

	public void setHid(Long hid) {
		this.hid = hid;
	}

	public Date getDattr() {
		return this.dattr;
	}

	public void setDattr(Date dattr) {
		this.dattr = dattr;
	}

	public Date getLocked() {
		return this.locked;
	}

	public void setLocked(Date locked) {
		this.locked = locked;
	}

	public String getUnLock() {
		return this.unLock;
	}

	public void setUnLock(String unLock) {
		this.unLock = unLock;
	}

	public String getTrans() {
		return this.trans;
	}

	public void setTrans(String trans) {
		this.trans = trans;
	}

	public String getUn() {
		return this.un;
	}

	public void setUn(String un) {
		this.un = un;
	}

	public Date getDeleted() {
		return this.deleted;
	}

	public void setDeleted(Date deleted) {
		this.deleted = deleted;
	}

	public Date getAltered() {
		return this.altered;
	}

	public void setAltered(Date altered) {
		this.altered = altered;
	}

	public String getG4() {
		return this.g4;
	}

	public void setG4(String g4) {
		this.g4 = g4;
	}

	public String getG41() {
		return this.g41;
	}

	public void setG41(String g41) {
		this.g41 = g41;
	}

	public String getG42() {
		return this.g42;
	}

	public void setG42(String g42) {
		this.g42 = g42;
	}

	public String getG43() {
		return this.g43;
	}

	public void setG43(String g43) {
		this.g43 = g43;
	}

	public String getG44() {
		return this.g44;
	}

	public void setG44(String g44) {
		this.g44 = g44;
	}

	public String getG45() {
		return this.g45;
	}

	public void setG45(String g45) {
		this.g45 = g45;
	}

	public String getG46() {
		return this.g46;
	}

	public void setG46(String g46) {
		this.g46 = g46;
	}

	public String getG46r() {
		return this.g46r;
	}

	public void setG46r(String g46r) {
		this.g46r = g46r;
	}

	public String getG47() {
		return this.g47;
	}

	public void setG47(String g47) {
		this.g47 = g47;
	}

	public String getG48() {
		return this.g48;
	}

	public void setG48(String g48) {
		this.g48 = g48;
	}

	public String getG48r() {
		return this.g48r;
	}

	public void setG48r(String g48r) {
		this.g48r = g48r;
	}

	public String getG49() {
		return this.g49;
	}

	public void setG49(String g49) {
		this.g49 = g49;
	}

	public String getG49r() {
		return this.g49r;
	}

	public void setG49r(String g49r) {
		this.g49r = g49r;
	}

	public String getG5() {
		return this.g5;
	}

	public void setG5(String g5) {
		this.g5 = g5;
	}

	public String getG6() {
		return this.g6;
	}

	public void setG6(String g6) {
		this.g6 = g6;
	}

	public String getG4r() {
		return this.g4r;
	}

	public void setG4r(String g4r) {
		this.g4r = g4r;
	}

	public String getG410() {
		return this.g410;
	}

	public void setG410(String g410) {
		this.g410 = g410;
	}

	public String getG411() {
		return this.g411;
	}

	public void setG411(String g411) {
		this.g411 = g411;
	}

	public String getG412() {
		return this.g412;
	}

	public void setG412(String g412) {
		this.g412 = g412;
	}

	public String getDop_info() {
		return dop_info;
	}

	public void setDop_info(String dop_info) {
		this.dop_info = dop_info;
	}
}
