package com.bivc.cimsmgs.dto.ky2;

/**
 * @author p.dzeviarylin
 */
public class PoezdImportDTO {

    private String dattr;
    private String n_poezd;
    private String n_packet;
    private String ved_nomer;
    private String count_nvag;
    private String sto_f;
    private String stn;

    public PoezdImportDTO(String dattr, String n_poezd, String n_packet, String ved_nomer, String count_nvag, String sto_f, String stn) {
        this.dattr = dattr;
        this.n_poezd = n_poezd;
        this.n_packet = n_packet;
        this.ved_nomer = ved_nomer;
        this.count_nvag = count_nvag;
        this.sto_f = sto_f;
        this.stn = stn;
    }

    public String getDattr() {
        return dattr;
    }

    public void setDattr(String dattr) {
        this.dattr = dattr;
    }

    public String getN_poezd() {
        return n_poezd;
    }

    public void setN_poezd(String n_poezd) {
        this.n_poezd = n_poezd;
    }

    public String getN_packet() {
        return n_packet;
    }

    public void setN_packet(String n_packet) {
        this.n_packet = n_packet;
    }

    public String getVed_nomer() {
        return ved_nomer;
    }

    public void setVed_nomer(String ved_nomer) {
        this.ved_nomer = ved_nomer;
    }

    public String getCount_nvag() {
        return count_nvag;
    }

    public void setCount_nvag(String count_nvag) {
        this.count_nvag = count_nvag;
    }

    public String getSto_f() {
        return sto_f;
    }

    public void setSto_f(String sto_f) {
        this.sto_f = sto_f;
    }

    public String getStn() {
        return stn;
    }

    public void setStn(String stn) {
        this.stn = stn;
    }
}
