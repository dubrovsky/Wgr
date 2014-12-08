package com.bivc.cimsmgs.db;

// Generated 14.09.2012 11:14:43 by Hibernate Tools 3.4.0.CR1

import java.io.Serializable;

/**
 * PrintBlankTemplRef generated by hbm2java
 */
public class PrintBlankTemplRef implements Serializable {

	private PrintBlankTemplRefId id;
	private PrintBlank printBlank;
	private PrintTemplates printTemplates;
//    private Byte page;
//
//    public Byte getPage() {
//        return page;
//    }
//
//    public void setPage(Byte page) {
//        this.page = page;
//    }

    public PrintBlankTemplRef() {
	}

	public PrintBlankTemplRef(PrintBlankTemplRefId id, PrintBlank printBlank, PrintTemplates printTemplates/*, Byte page*/) {
		this.id = id;
		this.printBlank = printBlank;
		this.printTemplates = printTemplates;
//        this.page = page;
	}

    public PrintBlankTemplRef(PrintBlankTemplRefId id/*, Byte page*/) {
        this.id = id;
//        this.page = page;
    }

	public PrintBlankTemplRefId getId() {
		return this.id;
	}

	public void setId(PrintBlankTemplRefId id) {
		this.id = id;
	}

	public PrintBlank getPrintBlank() {
		return this.printBlank;
	}

	public void setPrintBlank(PrintBlank printBlank) {
		this.printBlank = printBlank;
	}

	public PrintTemplates getPrintTemplates() {
		return this.printTemplates;
	}

	public void setPrintTemplates(PrintTemplates printTemplates) {
		this.printTemplates = printTemplates;
	}

}
