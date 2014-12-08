package com.bivc.cimsmgs.db;

public class NsiDor implements java.io.Serializable {

	private String kod;
	private NsiCountries nsiCountries;
	private String strana;
	private String sokrNam;
	private String sokrNamEu;
//	private Set<NsiStCis> nsiStCises = new HashSet<NsiStCis>(0);
//	private Set<NsiStEu> nsiStEus = new HashSet<NsiStEu>(0);

	public NsiDor() {
	}

	public NsiDor(String kod) {
		this.kod = kod;
	}

	public NsiDor(String kod, NsiCountries nsiCountries, String strana,
			String sokrNam, String sokrNamEu/*, Set<NsiStCis> nsiStCises,
			Set<NsiStEu> nsiStEus*/) {
		this.kod = kod;
		this.nsiCountries = nsiCountries;
		this.strana = strana;
		this.sokrNam = sokrNam;
		this.sokrNamEu = sokrNamEu;
//		this.nsiStCises = nsiStCises;
//		this.nsiStEus = nsiStEus;
	}

	public String getKod() {
		return this.kod;
	}

	public void setKod(String kod) {
		this.kod = kod;
	}

	public NsiCountries getNsiCountries() {
		return this.nsiCountries;
	}

	public void setNsiCountries(NsiCountries nsiCountries) {
		this.nsiCountries = nsiCountries;
	}

	public String getStrana() {
		return this.strana;
	}

	public void setStrana(String strana) {
		this.strana = strana;
	}

	public String getSokrNam() {
		return this.sokrNam;
	}

	public void setSokrNam(String sokrNam) {
		this.sokrNam = sokrNam;
	}

	public String getSokrNamEu() {
		return this.sokrNamEu;
	}

	public void setSokrNamEu(String sokrNamEu) {
		this.sokrNamEu = sokrNamEu;
	}

//	public Set<NsiStCis> getNsiStCises() {
//		return this.nsiStCises;
//	}
//
//	public void setNsiStCises(Set<NsiStCis> nsiStCises) {
//		this.nsiStCises = nsiStCises;
//	}
//
//	public Set<NsiStEu> getNsiStEus() {
//		return this.nsiStEus;
//	}
//
//	public void setNsiStEus(Set<NsiStEu> nsiStEus) {
//		this.nsiStEus = nsiStEus;
//	}

}
