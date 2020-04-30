package Ti.model.excel;

import java.math.BigDecimal;
import java.util.Date;

public class InvoiceXls extends XlsDefaultModel{

    private String tnved;
    private String nzgr;
    private String nzgrEn;
    private BigDecimal kole;
    private String eizm;
    private BigDecimal mnet;
    private BigDecimal mbrt;
    private BigDecimal itogo;
    private  BigDecimal kolm;
    private String invoiceNum;
    private Date date;

    public InvoiceXls(String tnved, String nzgr, String nzgrEn, BigDecimal kole, String eizm, BigDecimal mnet, BigDecimal mbrt, BigDecimal itogo, BigDecimal kolm, String invoiceNum, Date date) {
        this.tnved = tnved;
        this.nzgr = nzgr;
        this.nzgrEn = nzgrEn;
        this.kole = kole;
        this.eizm = eizm;
        this.mnet = mnet;
        this.mbrt = mbrt;
        this.itogo = itogo;
        this.kolm = kolm;
        this.invoiceNum = invoiceNum;
        this.date = date;
    }

    public InvoiceXls() {
    }

    public String getTnved() {
        return tnved;
    }

    public String getNzgr() {
        return nzgr;
    }

    public String getNzgrEn() {
        return nzgrEn;
    }

    public BigDecimal getKole() {
        return kole;
    }

    public String getEizm() {
        return eizm;
    }

    public BigDecimal getMnet() {
        return mnet;
    }

    public BigDecimal getMbrt() {
        return mbrt;
    }

    public BigDecimal getItogo() {
        return itogo;
    }

    public BigDecimal getKolm() {
        return kolm;
    }

    public String getInvoiceNum() {
        return invoiceNum;
    }

    public Date getDate() {
        return date;
    }

    public void setTnved(String tnved) {
        this.tnved = tnved;
    }

    public void setNzgr(String nzgr) {
        this.nzgr = nzgr;
    }

    public void setNzgrEn(String nzgrEn) {
        this.nzgrEn = nzgrEn;
    }

    public void setKole(BigDecimal kole) {
        this.kole = kole;
    }

    public void setEizm(String eizm) {
        this.eizm = eizm;
    }

    public void setMnet(BigDecimal mnet) {
        this.mnet = mnet;
    }

    public void setMbrt(BigDecimal mbrt) {
        this.mbrt = mbrt;
    }

    public void setItogo(BigDecimal itogo) {
        this.itogo = itogo;
    }

    public void setKolm(BigDecimal kolm) {
        this.kolm = kolm;
    }

    public void setInvoiceNum(String invoiceNum) {
        this.invoiceNum = invoiceNum;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "InvoiceXls{" +
                "tnved='" + tnved + '\'' +
                ", nzgr='" + nzgr + '\'' +
                ", nzgrEn='" + nzgrEn + '\'' +
                ", kole=" + kole +
                ", eizm='" + eizm + '\'' +
                ", mnet=" + mnet +
                ", mbrt=" + mbrt +
                ", itogo=" + itogo +
                ", kolm=" + kolm +
                ", invoiceNum='" + invoiceNum + '\'' +
                ", date=" + date +
                '}';
    }
}
