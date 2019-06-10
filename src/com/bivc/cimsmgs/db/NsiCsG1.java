package com.bivc.cimsmgs.db;


import java.io.Serializable;
import java.util.Date;

public class NsiCsG1 implements Serializable {

	private Long hid;
	private Date dattr;
	private Date locked;
	private String unLock;
	private String trans;
	private String un;
	private Date deleted;
	private Date altered;
	private String g1;
	private String g11;
	private String g12;
	private String g13;
	private String g14;
	private String g15_1;
	private String g16_1;
	private String g16r;
	private String g17_1;
	private String g18_1;
	private String g18r_1;
	private String g19_1;
	private String g19r;
	private String g2;
	private String g3;
	private String g1r;
	private String g110;
	private String g111;
	private String g112;
    private String g_1_5k;
  private String g_2inn;
  private String dop_info;

  public NsiCsG1() {
	}

	public NsiCsG1(Long hid, Date dattr, Date altered) {
		this.hid = hid;
		this.dattr = dattr;
		this.altered = altered;
	}

	public NsiCsG1(Long hid, Date dattr, Date locked, String unLock,
			String trans, String un, Date deleted, Date altered, String g1,
			String g11, String g12, String g13, String g14, String g15,
			String g16, String g16r, String g17, String g18, String g18r,
			String g19, String g19r, String g2, String g3, String g1r,
			String g110, String g111, String g112) {
		this.hid = hid;
		this.dattr = dattr;
		this.locked = locked;
		this.unLock = unLock;
		this.trans = trans;
		this.un = un;
		this.deleted = deleted;
		this.altered = altered;
		this.g1 = g1;
		this.g11 = g11;
		this.g12 = g12;
		this.g13 = g13;
		this.g14 = g14;
		this.setG15_1(g15);
		this.setG16_1(g16);
		this.g16r = g16r;
		this.setG17_1(g17);
		this.setG18_1(g18);
		this.setG18r_1(g18r);
		this.setG19_1(g19);
		this.g19r = g19r;
		this.g2 = g2;
		this.g3 = g3;
		this.g1r = g1r;
		this.g110 = g110;
		this.g111 = g111;
		this.g112 = g112;
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

	public String getG1() {
		return this.g1;
	}

	public void setG1(String g1) {
		this.g1 = g1;
	}

	public String getG11() {
		return this.g11;
	}

	public void setG11(String g11) {
		this.g11 = g11;
	}

	public String getG12() {
		return this.g12;
	}

	public void setG12(String g12) {
		this.g12 = g12;
	}

	public String getG13() {
		return this.g13;
	}

	public void setG13(String g13) {
		this.g13 = g13;
	}

	public String getG14() {
		return this.g14;
	}

	public void setG14(String g14) {
		this.g14 = g14;
	}

	

	public String getG16r() {
		return this.g16r;
	}

	public void setG16r(String g16r) {
		this.g16r = g16r;
	}

	

	public String getG19r() {
		return this.g19r;
	}

	public void setG19r(String g19r) {
		this.g19r = g19r;
	}

	public String getG2() {
		return this.g2;
	}

	public void setG2(String g2) {
		this.g2 = g2;
	}

	public String getG3() {
		return this.g3;
	}

	public void setG3(String g3) {
		this.g3 = g3;
	}

	public String getG1r() {
		return this.g1r;
	}

	public void setG1r(String g1r) {
		this.g1r = g1r;
	}

	public String getG110() {
		return this.g110;
	}

	public void setG110(String g110) {
		this.g110 = g110;
	}

	public String getG111() {
		return this.g111;
	}

	public void setG111(String g111) {
		this.g111 = g111;
	}

	public String getG112() {
		return this.g112;
	}

	public void setG112(String g112) {
		this.g112 = g112;
	}

    public String getDop_info() {
        return dop_info;
    }

    public void setDop_info(String dop_info) {
        this.dop_info = dop_info;
    }

    public NsiCsG1 autoFill(CimSmgs smgs, String who)
  {
    if(who.equals("g1"))
    {
      g1 = smgs.getG1();
      g11 = smgs.getG11_1();
      g12 = smgs.getG12_1();
      g13 = smgs.getG13_1();
      g14 = smgs.getG14();
      setG15_1(smgs.getG15_1());
      setG16_1(smgs.getG16_1());
      g16r = smgs.getG16r();
      setG17_1(smgs.getG17_1());
      setG18_1(smgs.getG18_1());
      setG18r_1(smgs.getG18r_1());
      setG19_1(smgs.getG19_1());
      g19r = smgs.getG19r();
      g2 = smgs.getG2();
      g3 = smgs.getG3();
      g1r = smgs.getG1r();
      g110 = smgs.getG110();
    }
    else {
      g1 = smgs.getG4();
      g11 = smgs.getG41_1();
      g12 = smgs.getG42_1();
      g13 = smgs.getG43_1();
      g14 = smgs.getG44_1();
      setG15_1(smgs.getG45_1());
      setG16_1(smgs.getG46_1());
      g16r = smgs.getG46r();
      setG17_1(smgs.getG47_1());
      setG18_1(smgs.getG48_1());
      setG18r_1(smgs.getG48r());
      setG19_1(smgs.getG49());
      g19r = smgs.getG49r();
      g2 = smgs.getG5();
      g3 = smgs.getG6();
      g1r = smgs.getG4r();
      g110 = smgs.getG410();
    }
    dattr = new Date();
    altered = new Date();
    un = smgs.getUn();
    return this;
  }

public void setG15_1(String g15_1) {
	this.g15_1 = g15_1;
}

public String getG15_1() {
	return g15_1;
}

public void setG16_1(String g16_1) {
	this.g16_1 = g16_1;
}

public String getG16_1() {
	return g16_1;
}

public void setG17_1(String g17_1) {
	this.g17_1 = g17_1;
}

public String getG17_1() {
	return g17_1;
}

public void setG18_1(String g18_1) {
	this.g18_1 = g18_1;
}

public String getG18_1() {
	return g18_1;
}

public void setG18r_1(String g18r_1) {
	this.g18r_1 = g18r_1;
}

public String getG18r_1() {
	return g18r_1;
}

public void setG19_1(String g19_1) {
	this.g19_1 = g19_1;
}

public String getG19_1() {
	return g19_1;
}

    public String getG_1_5k() {
        return g_1_5k;
    }

    public void setG_1_5k(String g_1_5k) {
        this.g_1_5k = g_1_5k;
    }

  public String getG_2inn() {
    return g_2inn;
  }

  public void setG_2inn(String g_2inn) {
    this.g_2inn = g_2inn;
  }
}
