package com.bivc.cimsmgs.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;

/**
 * @author p.dzeviarylin
 */
public class Aviso2CimSmgsDTO {

    private String aviso_num;
    private Date aviso_dat;
    private Date aviso_cod_dat;
    private Integer amount;
    private String npoezd;
    private String g2;
    private String g3;
    private String g11_1;
    private String g12_1;
    private String g13_1;
    private String g1;
    private String g1r;
    private String g15_1;
    private String g16_1;
    private String g16r;
    private String g17_1;
    private String g18_1;
    private String g18r_1;
    private String g19_1;
    private String g19r;
    private String g110;
    private String g5;
    private String g6;
    private String g41_1;
    private String g42_1;
    private String g43_1;
    private String g4;
    private String g4r;
    private String g45_1;
    private String g46_1;
    private String g46r;
    private String g47_1;
    private String g48_1;
    private String g48r;
    private String g49;
    private String g49r;
    private String g410;
    private String g8;
    private String g4prim;
    private String g161;
    private String g171;
    private String g17;
    private String g162;
    private String g162r;
    private String g163;
    private String g163r;
    private String g11;
    private String g12;
    private String g121;
    private String g101;
    private String g101r;
    private String g102;
    private String g102r;
    private String g141;
    private String g142;
    private String g15;
    private String g15r;
    private String g18;
    private String g18r;
    private String g181;
    private String g18B1;
    private String g18B2;
    private String g191;
    private String g192;
    private String g193;
    private String g48;
    private String g2017;
    private String g23;
    private String g23b;
    private BigDecimal g24N;
    private BigDecimal g24T;
    private BigDecimal g24B;
    private String g_24_bcn;
    private String g38;
    private String g26;
    private String g27;
    private String g39;
    private String g2012;
    private Byte g25;
    private Byte g1c;
    private Byte g7c;
    private Byte g9c;
    private Byte g4c;
    private Byte g18c;
    private Byte g13c;
    private Byte g15c;
    private Byte g20c;
    private Byte g21;
    private Byte g22;
    private String g591;
    private String g592;
    private String g593;
    private String g594;
    private String g595;
    private String g596;
    private String g597;
    private String g598;
    private String g60;
    private String g61;
    private String g611;
    private String g612;
    private String g62;
    private String g621;
    private String g622;
    private String g29;
    private String g29r;
    private String g30;
    private String g63;
    private String g64;
    private String g65;
    private String g651;
    private String g652;
    private String ga66;
    private String ga661;
    private String ga662;
    private Date g67;
    private Byte gb661;
    private String gb662;
    private String g68;
    private String g691;
    private String g692;
    private String g693;
    private String g694;
    private String g28;
    private Date g281;

    private Map<Integer, Aviso2CimSmgsDocsDTO> cimSmgsDocses7 = new TreeMap<>();
    private Map<Integer, Aviso2CimSmgsDocsDTO> cimSmgsDocses13 = new TreeMap<>();
    private Map<Integer, Aviso2CimSmgsDocsDTO> cimSmgsDocses136 = new TreeMap<>();
    private Map<Byte, Aviso2CimSmgsPlatelDTO> cimSmgsPlatels = new TreeMap<>();

    public Aviso2CimSmgsDTO() {
    }

    public String getAviso_num() {
        return aviso_num;
    }

    public void setAviso_num(String aviso_num) {
        this.aviso_num = aviso_num;
    }

    public Date getAviso_dat() {
        return aviso_dat;
    }

    public void setAviso_dat(Date aviso_dat) {
        this.aviso_dat = aviso_dat;
    }

    public Date getAviso_cod_dat() {
        return aviso_cod_dat;
    }

    public void setAviso_cod_dat(Date aviso_cod_dat) {
        this.aviso_cod_dat = aviso_cod_dat;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getNpoezd() {
        return npoezd;
    }

    public void setNpoezd(String npoezd) {
        this.npoezd = npoezd;
    }

    public String getG2() {
        return g2;
    }

    public void setG2(String g2) {
        this.g2 = g2;
    }

    public String getG3() {
        return g3;
    }

    public void setG3(String g3) {
        this.g3 = g3;
    }

    public String getG11_1() {
        return g11_1;
    }

    public void setG11_1(String g11_1) {
        this.g11_1 = g11_1;
    }

    public String getG12_1() {
        return g12_1;
    }

    public void setG12_1(String g12_1) {
        this.g12_1 = g12_1;
    }

    public String getG13_1() {
        return g13_1;
    }

    public void setG13_1(String g13_1) {
        this.g13_1 = g13_1;
    }

    public String getG1() {
        return g1;
    }

    public void setG1(String g1) {
        this.g1 = g1;
    }

    public String getG1r() {
        return g1r;
    }

    public void setG1r(String g1r) {
        this.g1r = g1r;
    }

    public String getG15_1() {
        return g15_1;
    }

    public void setG15_1(String g15_1) {
        this.g15_1 = g15_1;
    }

    public String getG16_1() {
        return g16_1;
    }

    public void setG16_1(String g16_1) {
        this.g16_1 = g16_1;
    }

    public String getG16r() {
        return g16r;
    }

    public void setG16r(String g16r) {
        this.g16r = g16r;
    }

    public String getG17_1() {
        return g17_1;
    }

    public void setG17_1(String g17_1) {
        this.g17_1 = g17_1;
    }

    public String getG18_1() {
        return g18_1;
    }

    public void setG18_1(String g18_1) {
        this.g18_1 = g18_1;
    }

    public String getG18r_1() {
        return g18r_1;
    }

    public void setG18r_1(String g18r_1) {
        this.g18r_1 = g18r_1;
    }

    public String getG19_1() {
        return g19_1;
    }

    public void setG19_1(String g19_1) {
        this.g19_1 = g19_1;
    }

    public String getG19r() {
        return g19r;
    }

    public void setG19r(String g19r) {
        this.g19r = g19r;
    }

    public String getG110() {
        return g110;
    }

    public void setG110(String g110) {
        this.g110 = g110;
    }

    public String getG5() {
        return g5;
    }

    public void setG5(String g5) {
        this.g5 = g5;
    }

    public String getG6() {
        return g6;
    }

    public void setG6(String g6) {
        this.g6 = g6;
    }

    public String getG41_1() {
        return g41_1;
    }

    public void setG41_1(String g41_1) {
        this.g41_1 = g41_1;
    }

    public String getG42_1() {
        return g42_1;
    }

    public void setG42_1(String g42_1) {
        this.g42_1 = g42_1;
    }

    public String getG43_1() {
        return g43_1;
    }

    public void setG43_1(String g43_1) {
        this.g43_1 = g43_1;
    }

    public String getG4() {
        return g4;
    }

    public void setG4(String g4) {
        this.g4 = g4;
    }

    public String getG4r() {
        return g4r;
    }

    public void setG4r(String g4r) {
        this.g4r = g4r;
    }

    public String getG45_1() {
        return g45_1;
    }

    public void setG45_1(String g45_1) {
        this.g45_1 = g45_1;
    }

    public String getG46_1() {
        return g46_1;
    }

    public void setG46_1(String g46_1) {
        this.g46_1 = g46_1;
    }

    public String getG46r() {
        return g46r;
    }

    public void setG46r(String g46r) {
        this.g46r = g46r;
    }

    public String getG47_1() {
        return g47_1;
    }

    public void setG47_1(String g47_1) {
        this.g47_1 = g47_1;
    }

    public String getG48_1() {
        return g48_1;
    }

    public void setG48_1(String g48_1) {
        this.g48_1 = g48_1;
    }

    public String getG48r() {
        return g48r;
    }

    public void setG48r(String g48r) {
        this.g48r = g48r;
    }

    public String getG49() {
        return g49;
    }

    public void setG49(String g49) {
        this.g49 = g49;
    }

    public String getG49r() {
        return g49r;
    }

    public void setG49r(String g49r) {
        this.g49r = g49r;
    }

    public String getG410() {
        return g410;
    }

    public void setG410(String g410) {
        this.g410 = g410;
    }

    public String getG8() {
        return g8;
    }

    public void setG8(String g8) {
        this.g8 = g8;
    }

    public String getG4prim() {
        return g4prim;
    }

    public void setG4prim(String g4prim) {
        this.g4prim = g4prim;
    }

    public String getG161() {
        return g161;
    }

    public void setG161(String g161) {
        this.g161 = g161;
    }

    public String getG171() {
        return g171;
    }

    public void setG171(String g171) {
        this.g171 = g171;
    }

    public String getG17() {
        return g17;
    }

    public void setG17(String g17) {
        this.g17 = g17;
    }

    public String getG162() {
        return g162;
    }

    public void setG162(String g162) {
        this.g162 = g162;
    }

    public String getG162r() {
        return g162r;
    }

    public void setG162r(String g162r) {
        this.g162r = g162r;
    }

    public String getG163() {
        return g163;
    }

    public void setG163(String g163) {
        this.g163 = g163;
    }

    public String getG163r() {
        return g163r;
    }

    public void setG163r(String g163r) {
        this.g163r = g163r;
    }

    public String getG11() {
        return g11;
    }

    public void setG11(String g11) {
        this.g11 = g11;
    }

    public String getG12() {
        return g12;
    }

    public void setG12(String g12) {
        this.g12 = g12;
    }

    public String getG121() {
        return g121;
    }

    public void setG121(String g121) {
        this.g121 = g121;
    }

    public String getG101() {
        return g101;
    }

    public void setG101(String g101) {
        this.g101 = g101;
    }

    public String getG101r() {
        return g101r;
    }

    public void setG101r(String g101r) {
        this.g101r = g101r;
    }

    public String getG102() {
        return g102;
    }

    public void setG102(String g102) {
        this.g102 = g102;
    }

    public String getG102r() {
        return g102r;
    }

    public void setG102r(String g102r) {
        this.g102r = g102r;
    }

    public String getG141() {
        return g141;
    }

    public void setG141(String g141) {
        this.g141 = g141;
    }

    public String getG142() {
        return g142;
    }

    public void setG142(String g142) {
        this.g142 = g142;
    }

    public String getG15() {
        return g15;
    }

    public void setG15(String g15) {
        this.g15 = g15;
    }

    public String getG15r() {
        return g15r;
    }

    public void setG15r(String g15r) {
        this.g15r = g15r;
    }

    public String getG18() {
        return g18;
    }

    public void setG18(String g18) {
        this.g18 = g18;
    }

    public String getG18r() {
        return g18r;
    }

    public void setG18r(String g18r) {
        this.g18r = g18r;
    }

    public String getG181() {
        return g181;
    }

    public void setG181(String g181) {
        this.g181 = g181;
    }

    public String getG18B1() {
        return g18B1;
    }

    public void setG18B1(String g18B1) {
        this.g18B1 = g18B1;
    }

    public String getG18B2() {
        return g18B2;
    }

    public void setG18B2(String g18B2) {
        this.g18B2 = g18B2;
    }

    public String getG191() {
        return g191;
    }

    public void setG191(String g191) {
        this.g191 = g191;
    }

    public String getG192() {
        return g192;
    }

    public void setG192(String g192) {
        this.g192 = g192;
    }

    public String getG193() {
        return g193;
    }

    public void setG193(String g193) {
        this.g193 = g193;
    }

    public String getG48() {
        return g48;
    }

    public void setG48(String g48) {
        this.g48 = g48;
    }

    public String getG2017() {
        return g2017;
    }

    public void setG2017(String g2017) {
        this.g2017 = g2017;
    }

    public String getG23() {
        return g23;
    }

    public void setG23(String g23) {
        this.g23 = g23;
    }

    public String getG23b() {
        return g23b;
    }

    public void setG23b(String g23b) {
        this.g23b = g23b;
    }

    public BigDecimal getG24N() {
        return g24N;
    }

    public void setG24N(BigDecimal g24N) {
        this.g24N = g24N;
    }

    public BigDecimal getG24T() {
        return g24T;
    }

    public void setG24T(BigDecimal g24T) {
        this.g24T = g24T;
    }

    public BigDecimal getG24B() {
        return g24B;
    }

    public void setG24B(BigDecimal g24B) {
        this.g24B = g24B;
    }

    public String getG_24_bcn() {
        return g_24_bcn;
    }

    public void setG_24_bcn(String g_24_bcn) {
        this.g_24_bcn = g_24_bcn;
    }

    public String getG38() {
        return g38;
    }

    public void setG38(String g38) {
        this.g38 = g38;
    }

    public String getG26() {
        return g26;
    }

    public void setG26(String g26) {
        this.g26 = g26;
    }

    public String getG27() {
        return g27;
    }

    public void setG27(String g27) {
        this.g27 = g27;
    }

    public String getG39() {
        return g39;
    }

    public void setG39(String g39) {
        this.g39 = g39;
    }

    public String getG2012() {
        return g2012;
    }

    public void setG2012(String g2012) {
        this.g2012 = g2012;
    }

    public Byte getG25() {
        return g25;
    }

    public void setG25(Byte g25) {
        this.g25 = g25;
    }

    public Byte getG1c() {
        return g1c;
    }

    public void setG1c(Byte g1c) {
        this.g1c = g1c;
    }

    public Byte getG7c() {
        return g7c;
    }

    public void setG7c(Byte g7c) {
        this.g7c = g7c;
    }

    public Byte getG9c() {
        return g9c;
    }

    public void setG9c(Byte g9c) {
        this.g9c = g9c;
    }

    public Byte getG4c() {
        return g4c;
    }

    public void setG4c(Byte g4c) {
        this.g4c = g4c;
    }

    public Byte getG18c() {
        return g18c;
    }

    public void setG18c(Byte g18c) {
        this.g18c = g18c;
    }

    public Byte getG13c() {
        return g13c;
    }

    public void setG13c(Byte g13c) {
        this.g13c = g13c;
    }

    public Byte getG15c() {
        return g15c;
    }

    public void setG15c(Byte g15c) {
        this.g15c = g15c;
    }

    public Byte getG20c() {
        return g20c;
    }

    public void setG20c(Byte g20c) {
        this.g20c = g20c;
    }

    public Byte getG21() {
        return g21;
    }

    public void setG21(Byte g21) {
        this.g21 = g21;
    }

    public Byte getG22() {
        return g22;
    }

    public void setG22(Byte g22) {
        this.g22 = g22;
    }

    public String getG591() {
        return g591;
    }

    public void setG591(String g591) {
        this.g591 = g591;
    }

    public String getG592() {
        return g592;
    }

    public void setG592(String g592) {
        this.g592 = g592;
    }

    public String getG593() {
        return g593;
    }

    public void setG593(String g593) {
        this.g593 = g593;
    }

    public String getG594() {
        return g594;
    }

    public void setG594(String g594) {
        this.g594 = g594;
    }

    public String getG595() {
        return g595;
    }

    public void setG595(String g595) {
        this.g595 = g595;
    }

    public String getG596() {
        return g596;
    }

    public void setG596(String g596) {
        this.g596 = g596;
    }

    public String getG597() {
        return g597;
    }

    public void setG597(String g597) {
        this.g597 = g597;
    }

    public String getG598() {
        return g598;
    }

    public void setG598(String g598) {
        this.g598 = g598;
    }

    public String getG60() {
        return g60;
    }

    public void setG60(String g60) {
        this.g60 = g60;
    }

    public String getG61() {
        return g61;
    }

    public void setG61(String g61) {
        this.g61 = g61;
    }

    public String getG611() {
        return g611;
    }

    public void setG611(String g611) {
        this.g611 = g611;
    }

    public String getG612() {
        return g612;
    }

    public void setG612(String g612) {
        this.g612 = g612;
    }

    public String getG62() {
        return g62;
    }

    public void setG62(String g62) {
        this.g62 = g62;
    }

    public String getG621() {
        return g621;
    }

    public void setG621(String g621) {
        this.g621 = g621;
    }

    public String getG622() {
        return g622;
    }

    public void setG622(String g622) {
        this.g622 = g622;
    }

    public String getG29() {
        return g29;
    }

    public void setG29(String g29) {
        this.g29 = g29;
    }

    public String getG29r() {
        return g29r;
    }

    public void setG29r(String g29r) {
        this.g29r = g29r;
    }

    public String getG30() {
        return g30;
    }

    public void setG30(String g30) {
        this.g30 = g30;
    }

    public String getG63() {
        return g63;
    }

    public void setG63(String g63) {
        this.g63 = g63;
    }

    public String getG64() {
        return g64;
    }

    public void setG64(String g64) {
        this.g64 = g64;
    }

    public String getG65() {
        return g65;
    }

    public void setG65(String g65) {
        this.g65 = g65;
    }

    public String getG651() {
        return g651;
    }

    public void setG651(String g651) {
        this.g651 = g651;
    }

    public String getG652() {
        return g652;
    }

    public void setG652(String g652) {
        this.g652 = g652;
    }

    public String getGa66() {
        return ga66;
    }

    public void setGa66(String ga66) {
        this.ga66 = ga66;
    }

    public String getGa661() {
        return ga661;
    }

    public void setGa661(String ga661) {
        this.ga661 = ga661;
    }

    public String getGa662() {
        return ga662;
    }

    public void setGa662(String ga662) {
        this.ga662 = ga662;
    }

    public Date getG67() {
        return g67;
    }

    public void setG67(Date g67) {
        this.g67 = g67;
    }

    public Byte getGb661() {
        return gb661;
    }

    public void setGb661(Byte gb661) {
        this.gb661 = gb661;
    }

    public String getGb662() {
        return gb662;
    }

    public void setGb662(String gb662) {
        this.gb662 = gb662;
    }

    public String getG68() {
        return g68;
    }

    public void setG68(String g68) {
        this.g68 = g68;
    }

    public String getG691() {
        return g691;
    }

    public void setG691(String g691) {
        this.g691 = g691;
    }

    public String getG692() {
        return g692;
    }

    public void setG692(String g692) {
        this.g692 = g692;
    }

    public String getG693() {
        return g693;
    }

    public void setG693(String g693) {
        this.g693 = g693;
    }

    public String getG694() {
        return g694;
    }

    public void setG694(String g694) {
        this.g694 = g694;
    }

    public String getG28() {
        return g28;
    }

    public void setG28(String g28) {
        this.g28 = g28;
    }

    public Date getG281() {
        return g281;
    }

    public void setG281(Date g281) {
        this.g281 = g281;
    }

    public Map<Integer, Aviso2CimSmgsDocsDTO> getCimSmgsDocses7() {
        return cimSmgsDocses7;
    }

    public void setCimSmgsDocses7(Map<Integer, Aviso2CimSmgsDocsDTO> cimSmgsDocses7) {
        this.cimSmgsDocses7 = cimSmgsDocses7;
    }

    public Map<Integer, Aviso2CimSmgsDocsDTO> getCimSmgsDocses13() {
        return cimSmgsDocses13;
    }

    public void setCimSmgsDocses13(Map<Integer, Aviso2CimSmgsDocsDTO> cimSmgsDocses13) {
        this.cimSmgsDocses13 = cimSmgsDocses13;
    }

    public Map<Integer, Aviso2CimSmgsDocsDTO> getCimSmgsDocses136() {
        return cimSmgsDocses136;
    }

    public void setCimSmgsDocses136(Map<Integer, Aviso2CimSmgsDocsDTO> cimSmgsDocses136) {
        this.cimSmgsDocses136 = cimSmgsDocses136;
    }

    public Map<Byte, Aviso2CimSmgsPlatelDTO> getCimSmgsPlatels() {
        return cimSmgsPlatels;
    }

    public void setCimSmgsPlatels(Map<Byte, Aviso2CimSmgsPlatelDTO> cimSmgsPlatels) {
        this.cimSmgsPlatels = cimSmgsPlatels;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Aviso2CimSmgsDTO that = (Aviso2CimSmgsDTO) o;
        return Objects.equals(aviso_num, that.aviso_num) &&
                Objects.equals(aviso_dat, that.aviso_dat) &&
                Objects.equals(aviso_cod_dat, that.aviso_cod_dat) &&
                Objects.equals(amount, that.amount) &&
                Objects.equals(npoezd, that.npoezd) &&
                Objects.equals(g2, that.g2) &&
                Objects.equals(g3, that.g3) &&
                Objects.equals(g11_1, that.g11_1) &&
                Objects.equals(g12_1, that.g12_1) &&
                Objects.equals(g13_1, that.g13_1) &&
                Objects.equals(g1, that.g1) &&
                Objects.equals(g1r, that.g1r) &&
                Objects.equals(g15_1, that.g15_1) &&
                Objects.equals(g16_1, that.g16_1) &&
                Objects.equals(g16r, that.g16r) &&
                Objects.equals(g17_1, that.g17_1) &&
                Objects.equals(g18_1, that.g18_1) &&
                Objects.equals(g18r_1, that.g18r_1) &&
                Objects.equals(g19_1, that.g19_1) &&
                Objects.equals(g19r, that.g19r) &&
                Objects.equals(g110, that.g110) &&
                Objects.equals(g5, that.g5) &&
                Objects.equals(g6, that.g6) &&
                Objects.equals(g41_1, that.g41_1) &&
                Objects.equals(g42_1, that.g42_1) &&
                Objects.equals(g43_1, that.g43_1) &&
                Objects.equals(g4, that.g4) &&
                Objects.equals(g4r, that.g4r) &&
                Objects.equals(g45_1, that.g45_1) &&
                Objects.equals(g46_1, that.g46_1) &&
                Objects.equals(g46r, that.g46r) &&
                Objects.equals(g47_1, that.g47_1) &&
                Objects.equals(g48_1, that.g48_1) &&
                Objects.equals(g48r, that.g48r) &&
                Objects.equals(g49, that.g49) &&
                Objects.equals(g49r, that.g49r) &&
                Objects.equals(g410, that.g410) &&
                Objects.equals(g8, that.g8) &&
                Objects.equals(g4prim, that.g4prim) &&
                Objects.equals(g161, that.g161) &&
                Objects.equals(g171, that.g171) &&
                Objects.equals(g17, that.g17) &&
                Objects.equals(g162, that.g162) &&
                Objects.equals(g162r, that.g162r) &&
                Objects.equals(g163, that.g163) &&
                Objects.equals(g163r, that.g163r) &&
                Objects.equals(g11, that.g11) &&
                Objects.equals(g12, that.g12) &&
                Objects.equals(g121, that.g121) &&
                Objects.equals(g101, that.g101) &&
                Objects.equals(g101r, that.g101r) &&
                Objects.equals(g102, that.g102) &&
                Objects.equals(g102r, that.g102r) &&
                Objects.equals(g141, that.g141) &&
                Objects.equals(g142, that.g142) &&
                Objects.equals(g15, that.g15) &&
                Objects.equals(g15r, that.g15r) &&
                Objects.equals(g18, that.g18) &&
                Objects.equals(g18r, that.g18r) &&
                Objects.equals(g181, that.g181) &&
                Objects.equals(g18B1, that.g18B1) &&
                Objects.equals(g18B2, that.g18B2) &&
                Objects.equals(g191, that.g191) &&
                Objects.equals(g192, that.g192) &&
                Objects.equals(g193, that.g193) &&
                Objects.equals(g48, that.g48) &&
                Objects.equals(g2017, that.g2017) &&
                Objects.equals(g23, that.g23) &&
                Objects.equals(g23b, that.g23b) &&
                Objects.equals(g24N, that.g24N) &&
                Objects.equals(g24T, that.g24T) &&
                Objects.equals(g24B, that.g24B) &&
                Objects.equals(g_24_bcn, that.g_24_bcn) &&
                Objects.equals(g38, that.g38) &&
                Objects.equals(g26, that.g26) &&
                Objects.equals(g27, that.g27) &&
                Objects.equals(g39, that.g39) &&
                Objects.equals(g2012, that.g2012) &&
                Objects.equals(g25, that.g25) &&
                Objects.equals(g1c, that.g1c) &&
                Objects.equals(g7c, that.g7c) &&
                Objects.equals(g9c, that.g9c) &&
                Objects.equals(g4c, that.g4c) &&
                Objects.equals(g18c, that.g18c) &&
                Objects.equals(g13c, that.g13c) &&
                Objects.equals(g15c, that.g15c) &&
                Objects.equals(g20c, that.g20c) &&
                Objects.equals(g21, that.g21) &&
                Objects.equals(g22, that.g22) &&
                Objects.equals(g591, that.g591) &&
                Objects.equals(g592, that.g592) &&
                Objects.equals(g593, that.g593) &&
                Objects.equals(g594, that.g594) &&
                Objects.equals(g595, that.g595) &&
                Objects.equals(g596, that.g596) &&
                Objects.equals(g597, that.g597) &&
                Objects.equals(g598, that.g598) &&
                Objects.equals(g60, that.g60) &&
                Objects.equals(g61, that.g61) &&
                Objects.equals(g611, that.g611) &&
                Objects.equals(g612, that.g612) &&
                Objects.equals(g62, that.g62) &&
                Objects.equals(g621, that.g621) &&
                Objects.equals(g622, that.g622) &&
                Objects.equals(g29, that.g29) &&
                Objects.equals(g29r, that.g29r) &&
                Objects.equals(g30, that.g30) &&
                Objects.equals(g63, that.g63) &&
                Objects.equals(g64, that.g64) &&
                Objects.equals(g65, that.g65) &&
                Objects.equals(g651, that.g651) &&
                Objects.equals(g652, that.g652) &&
                Objects.equals(ga66, that.ga66) &&
                Objects.equals(ga661, that.ga661) &&
                Objects.equals(ga662, that.ga662) &&
                Objects.equals(g67, that.g67) &&
                Objects.equals(gb661, that.gb661) &&
                Objects.equals(gb662, that.gb662) &&
                Objects.equals(g68, that.g68) &&
                Objects.equals(g691, that.g691) &&
                Objects.equals(g692, that.g692) &&
                Objects.equals(g693, that.g693) &&
                Objects.equals(g694, that.g694) &&
                Objects.equals(g28, that.g28) &&
                Objects.equals(g281, that.g281);
    }

    @Override
    public int hashCode() {
        return Objects.hash(aviso_num, aviso_dat, aviso_cod_dat, amount, npoezd, g2, g3, g11_1, g12_1, g13_1, g1, g1r, g15_1, g16_1, g16r, g17_1, g18_1, g18r_1, g19_1, g19r, g110, g5, g6, g41_1, g42_1, g43_1, g4, g4r, g45_1, g46_1, g46r, g47_1, g48_1, g48r, g49, g49r, g410, g8, g4prim, g161, g171, g17, g162, g162r, g163, g163r, g11, g12, g121, g101, g101r, g102, g102r, g141, g142, g15, g15r, g18, g18r, g181, g18B1, g18B2, g191, g192, g193, g48, g2017, g23, g23b, g24N, g24T, g24B, g_24_bcn, g38, g26, g27, g39, g2012, g25, g1c, g7c, g9c, g4c, g18c, g13c, g15c, g20c, g21, g22, g591, g592, g593, g594, g595, g596, g597, g598, g60, g61, g611, g612, g62, g621, g622, g29, g29r, g30, g63, g64, g65, g651, g652, ga66, ga661, ga662, g67, gb661, gb662, g68, g691, g692, g693, g694, g28, g281);
    }

    @Override
    public String toString() {
        return "Aviso2CimSmgsDTO{" +
                "aviso_num='" + aviso_num + '\'' +
                ", aviso_dat=" + aviso_dat +
                ", aviso_cod_dat=" + aviso_cod_dat +
                ", amount=" + amount +
                ", npoezd='" + npoezd + '\'' +
                ", g2='" + g2 + '\'' +
                ", g3='" + g3 + '\'' +
                ", g11_1='" + g11_1 + '\'' +
                ", g12_1='" + g12_1 + '\'' +
                ", g13_1='" + g13_1 + '\'' +
                ", g1='" + g1 + '\'' +
                ", g1r='" + g1r + '\'' +
                ", g15_1='" + g15_1 + '\'' +
                ", g16_1='" + g16_1 + '\'' +
                ", g16r='" + g16r + '\'' +
                ", g17_1='" + g17_1 + '\'' +
                ", g18_1='" + g18_1 + '\'' +
                ", g18r_1='" + g18r_1 + '\'' +
                ", g19_1='" + g19_1 + '\'' +
                ", g19r='" + g19r + '\'' +
                ", g110='" + g110 + '\'' +
                ", g5='" + g5 + '\'' +
                ", g6='" + g6 + '\'' +
                ", g41_1='" + g41_1 + '\'' +
                ", g42_1='" + g42_1 + '\'' +
                ", g43_1='" + g43_1 + '\'' +
                ", g4='" + g4 + '\'' +
                ", g4r='" + g4r + '\'' +
                ", g45_1='" + g45_1 + '\'' +
                ", g46_1='" + g46_1 + '\'' +
                ", g46r='" + g46r + '\'' +
                ", g47_1='" + g47_1 + '\'' +
                ", g48_1='" + g48_1 + '\'' +
                ", g48r='" + g48r + '\'' +
                ", g49='" + g49 + '\'' +
                ", g49r='" + g49r + '\'' +
                ", g410='" + g410 + '\'' +
                ", g8='" + g8 + '\'' +
                ", g4prim='" + g4prim + '\'' +
                ", g161='" + g161 + '\'' +
                ", g171='" + g171 + '\'' +
                ", g17='" + g17 + '\'' +
                ", g162='" + g162 + '\'' +
                ", g162r='" + g162r + '\'' +
                ", g163='" + g163 + '\'' +
                ", g163r='" + g163r + '\'' +
                ", g11='" + g11 + '\'' +
                ", g12='" + g12 + '\'' +
                ", g121='" + g121 + '\'' +
                ", g101='" + g101 + '\'' +
                ", g101r='" + g101r + '\'' +
                ", g102='" + g102 + '\'' +
                ", g102r='" + g102r + '\'' +
                ", g141='" + g141 + '\'' +
                ", g142='" + g142 + '\'' +
                ", g15='" + g15 + '\'' +
                ", g15r='" + g15r + '\'' +
                ", g18='" + g18 + '\'' +
                ", g18r='" + g18r + '\'' +
                ", g181='" + g181 + '\'' +
                ", g18B1='" + g18B1 + '\'' +
                ", g18B2='" + g18B2 + '\'' +
                ", g191='" + g191 + '\'' +
                ", g192='" + g192 + '\'' +
                ", g193='" + g193 + '\'' +
                ", g48='" + g48 + '\'' +
                ", g2017='" + g2017 + '\'' +
                ", g23='" + g23 + '\'' +
                ", g23b='" + g23b + '\'' +
                ", g24N=" + g24N +
                ", g24T=" + g24T +
                ", g24B=" + g24B +
                ", g_24_bcn='" + g_24_bcn + '\'' +
                ", g38='" + g38 + '\'' +
                ", g26='" + g26 + '\'' +
                ", g27='" + g27 + '\'' +
                ", g39='" + g39 + '\'' +
                ", g2012='" + g2012 + '\'' +
                ", g25=" + g25 +
                ", g1c=" + g1c +
                ", g7c=" + g7c +
                ", g9c=" + g9c +
                ", g4c=" + g4c +
                ", g18c=" + g18c +
                ", g13c=" + g13c +
                ", g15c=" + g15c +
                ", g20c=" + g20c +
                ", g21=" + g21 +
                ", g22=" + g22 +
                ", g591='" + g591 + '\'' +
                ", g592='" + g592 + '\'' +
                ", g593='" + g593 + '\'' +
                ", g594='" + g594 + '\'' +
                ", g595='" + g595 + '\'' +
                ", g596='" + g596 + '\'' +
                ", g597='" + g597 + '\'' +
                ", g598='" + g598 + '\'' +
                ", g60='" + g60 + '\'' +
                ", g61='" + g61 + '\'' +
                ", g611='" + g611 + '\'' +
                ", g612='" + g612 + '\'' +
                ", g62='" + g62 + '\'' +
                ", g621='" + g621 + '\'' +
                ", g622='" + g622 + '\'' +
                ", g29='" + g29 + '\'' +
                ", g29r='" + g29r + '\'' +
                ", g30='" + g30 + '\'' +
                ", g63='" + g63 + '\'' +
                ", g64='" + g64 + '\'' +
                ", g65='" + g65 + '\'' +
                ", g651='" + g651 + '\'' +
                ", g652='" + g652 + '\'' +
                ", ga66='" + ga66 + '\'' +
                ", ga661='" + ga661 + '\'' +
                ", ga662='" + ga662 + '\'' +
                ", g67=" + g67 +
                ", gb661=" + gb661 +
                ", gb662='" + gb662 + '\'' +
                ", g68='" + g68 + '\'' +
                ", g691='" + g691 + '\'' +
                ", g692='" + g692 + '\'' +
                ", g693='" + g693 + '\'' +
                ", g694='" + g694 + '\'' +
                ", g28='" + g28 + '\'' +
                ", g281=" + g281 +
                '}';
    }
}
