package com.bivc.cimsmgs.db;

// Generated 12.07.2012 14:46:29 by Hibernate Tools 3.4.0.CR1

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.Date;

/**
 * PrintData generated by hbm2java
 */
@JsonIgnoreProperties({"printTemplates"})
public class PrintData implements Serializable {

	private Long hid;
	private PrintTemplates printTemplates;
	private String name;
	private String descr;
	private Byte fontSize;
	private boolean print;
	private Date dattr;
	private String un;
	private String trans;
	private Date altered;
    private Long prnTempl_hid;
    private float llx;
    private float lly;
    private float urx;
    private float ury;
    private boolean bold;
    private boolean uppercase;
    private String fontFamily;
    private Byte leading;
    private Integer sort;
    private Byte page;

    public Byte getPage() {
        return page;
    }

    public void setPage(Byte page) {
        this.page = page;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Byte getLeading() {
        return leading;
    }

    public void setLeading(Byte leading) {
        this.leading = leading;
    }

    public String getFontFamily() {
        return fontFamily;
    }

    public void setFontFamily(String fontFamily) {
        this.fontFamily = fontFamily;
    }

    public boolean isUppercase() {
        return uppercase;
    }

    public void setUppercase(boolean uppercase) {
        this.uppercase = uppercase;
    }

    public boolean isBold() {
        return bold;
    }

    public void setBold(boolean bold) {
        this.bold = bold;
    }

    public float getUry() {
        return ury;
    }

    public void setUry(float ury) {
        this.ury = ury;
    }

    public float getUrx() {
        return urx;
    }

    public void setUrx(float urx) {
        this.urx = urx;
    }

    public float getLly() {
        return lly;
    }

    public void setLly(float lly) {
        this.lly = lly;
    }

    public float getLlx() {
        return llx;
    }

    public void setLlx(float llx) {
        this.llx = llx;
    }

    public PrintData() {
	}

    public PrintData(Long hid, PrintTemplates printTemplates, String name, float llx, float lly, boolean print, Date dattr, String un, String trans,
                     Date altered, float urx, float ury) {
        this.hid = hid;
        this.printTemplates = printTemplates;
        this.name = name;
        this.llx = llx;
        this.lly = lly;
        this.print = print;
        this.dattr = dattr;
        this.un = un;
        this.trans = trans;
        this.altered = altered;
        this.urx = urx;
        this.ury = ury;
    }

    public PrintData(Long hid, PrintTemplates printTemplates, String name, String descr, float llx, float lly, Byte fontSize, boolean print, Date dattr,
                     String un, String trans, Date altered, float urx, float ury, Boolean bold, Boolean uppercase) {
        this.hid = hid;
        this.printTemplates = printTemplates;
        this.name = name;
        this.descr = descr;
        this.llx = llx;
        this.lly = lly;
        this.fontSize = fontSize;
        this.print = print;
        this.dattr = dattr;
        this.un = un;
        this.trans = trans;
        this.altered = altered;
        this.urx = urx;
        this.ury = ury;
        this.bold = bold;
        this.uppercase = uppercase;
    }

    public Long getPrnTempl_hid(){
        return printTemplates != null ? printTemplates.getHid() : null;
    }

    public void setPrnTempl_hid(Long prnTempl_hid){
        this.prnTempl_hid = prnTempl_hid;
    }

	public Long getHid() {
		return this.hid;
	}

	public void setHid(Long hid) {
		this.hid = hid;
	}

	public PrintTemplates getPrintTemplates() {
		return this.printTemplates;
	}

	public void setPrintTemplates(PrintTemplates printTemplates) {
		this.printTemplates = printTemplates;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescr() {
		return this.descr;
	}

	public void setDescr(String descr) {
		this.descr = descr;
	}

	public Byte getFontSize() {
		return this.fontSize;
	}

	public void setFontSize(Byte fontSize) {
		this.fontSize = fontSize;
	}

	public boolean isPrint() {
		return this.print;
	}

	public void setPrint(boolean print) {
		this.print = print;
	}

	public Date getDattr() {
		return this.dattr;
	}

	public void setDattr(Date dattr) {
		this.dattr = dattr;
	}

	public String getUn() {
		return this.un;
	}

	public void setUn(String un) {
		this.un = un;
	}

	public String getTrans() {
		return this.trans;
	}

	public void setTrans(String trans) {
		this.trans = trans;
	}

	public Date getAltered() {
		return this.altered;
	}

	public void setAltered(Date altered) {
		this.altered = altered;
	}


    public boolean printThisColumn() {
        return print;
    }
}
