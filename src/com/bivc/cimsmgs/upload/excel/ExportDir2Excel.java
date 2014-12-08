package com.bivc.cimsmgs.upload.excel;

import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.dao.hibernate.*;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.db.nsi.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;

import java.util.List;

public class ExportDir2Excel extends Export2Excel{
    private final short ALIGN_CENTER = CellStyle.ALIGN_CENTER;
    private final short VERTICAL_TOP = CellStyle.VERTICAL_TOP;
    private final short BORDER_NONE = CellStyle.BORDER_NONE;
    private final short BORDER_MEDIUM = CellStyle.BORDER_MEDIUM;

    private Sheet sheet;
    private Row row;
    private short rowIndx;
    private Font font;
    private final String fileName;

    public ExportDir2Excel(String excelFormat, String fileName) {
        super(excelFormat);

        this.fileName = fileName;
        sheet = getWb().createSheet();
        font = getWb().createFont();
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        rowIndx = 0;
    }

   /* public ExportDir2Excel(String fileName) {
        super();

        this.fileName = fileName;
        sheet = getWb().createSheet();
        font = getWb().createFont();
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        rowIndx = 0;
    }*/

    private void createCell(Row row, int column, String value, short halign, short valign, Font font, short tborder, short rborder, short bborder, short lborder) {
        Cell cell = row.createCell(column);
        cell.setCellValue(value);
        CellStyle cellStyle = getWb().createCellStyle();
        cellStyle.setAlignment(halign);
        cellStyle.setVerticalAlignment(valign);
        cellStyle.setFont(font);
        cellStyle.setBorderTop(tborder);
        cellStyle.setBorderRight(rborder);
        cellStyle.setBorderBottom(bborder);
        cellStyle.setBorderLeft(lborder);
        cell.setCellStyle(cellStyle);
    }

    private void createTitle(int frow, int lrow, int fcol, int lcol) {
        row = sheet.createRow(rowIndx);
        createCell(row, 0, fileName.toUpperCase(), ALIGN_CENTER, VERTICAL_TOP, font, BORDER_NONE, BORDER_NONE, BORDER_NONE, BORDER_NONE);
        sheet.addMergedRegion(new CellRangeAddress(
                frow, //first row (0-based)
                lrow, //last row  (0-based)
                fcol, //first column (0-based)
                lcol  //last column  (0-based)
        ));
    }

    private void createHeader(String[] values){
        row = sheet.createRow(++rowIndx);
        for (int i = 0; i < values.length; i++) {
            createCell(row, i, values[i], ALIGN_CENTER, VERTICAL_TOP, font, BORDER_MEDIUM, BORDER_MEDIUM, BORDER_MEDIUM, BORDER_MEDIUM);
        }
    }

    public void nsiSta() {
        NsiStaDAO dao = new NsiStaDAOHib();
        List<Sta> stas = dao.findAll();

        // title
        createTitle(0,0,0,6);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Станция(рус)","Станция(кит)","Станция(англ)","Код","Жел. дор","Код адм.","Страна"});
        // end table header

        // data
        for(Sta sta: stas){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(sta.getStaName());
            row.createCell(1).setCellValue(sta.getStaNameCh());
            row.createCell(2).setCellValue(sta.getStaNameEn());
            row.createCell(3).setCellValue(sta.getStaNo());
            Road road = sta.getRoad();
            if (road != null) {
                row.createCell(4).setCellValue(road.getRoadName());
            } else {
                row.createCell(4).setCellValue("");
            }
            Management manag = sta.getManagement();
            if (manag != null) {
                row.createCell(5).setCellValue(manag.getManagNo());
                Countrys country = manag.getCountrys();
                if (country != null) {
                    row.createCell(6).setCellValue(country.getCountryName());
                } else {
                    row.createCell(6).setCellValue("");
                }
            } else {
                row.createCell(5).setCellValue("");
            }
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
        sheet.autoSizeColumn(2);
        sheet.autoSizeColumn(3);
        sheet.autoSizeColumn(4);
        sheet.autoSizeColumn(5);
        sheet.autoSizeColumn(6);
    }

    public void nsiCountries() {
        NsiCountriesDAO dao = new NsiCountriesDAOHib();
        List<NsiCountries> countries = dao.findAll();

        // title
        createTitle(0,0,0,2);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Код","Страна","Дорога"});
        // end table header

        // data
        for(NsiCountries country: countries){
            row = sheet.createRow(++rowIndx);
//            row.createCell(0).setCellValue(country.getKod());
            row.createCell(0).setCellValue(country.getAbc2());
            row.createCell(1).setCellValue(country.getNaim());
            if(country.getNsiDors().size() > 0){
                row.createCell(2).setCellValue(country.getNsiDors().iterator().next().getSokrNam());
            } else {
                row.createCell(2).setCellValue("");
            }
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
        sheet.autoSizeColumn(2);
    }

    public void nsiGng() {
        NsiSmgsGngDAO dao = new NsiSmgsGngDAOHib();
        List<CargoGng> gngs = dao.findAll();

        // title
        createTitle(0,0,0,1);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Код","Наименование"});
        // end table header

        // data
        for(CargoGng gng: gngs){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(gng.getCargo_group());
            row.createCell(1).setCellValue(gng.getCargo_fullname());
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
    }

    public void nsiEtsng() {
        NsiSmgsEtsngcodeDAO dao = new NsiSmgsEtsngcodeDAOHib();
        List<Cargo> etsngs = dao.findAll();

        // title
        createTitle(0,0,0,1);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Код","Наименование"});
        // end table header

        // data
        for(Cargo etsng: etsngs){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(etsng.getCargo());
            row.createCell(1).setCellValue(etsng.getCargo_fullname());
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
    }

    public void nsiCurrency() {
        NsiCurrencyDAO dao = new NsiCurrencyDAOHib();
        List<NsiCurrency> сurrencys = dao.findAll();

        // title
        createTitle(0,0,0,1);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Код","Описание"});
        // end table header

        // data
        for(NsiCurrency сurrency: сurrencys){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(сurrency.getAbv3());
            row.createCell(1).setCellValue(сurrency.getName());
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);

    }

    public void nsiTnved() {
        NsiTnvedDAO dao = new NsiTnvedDAOHib();
        List<NsiTnved4> tnveds = dao.findAll();

        // title
        createTitle(0,0,0,1);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Код","Описание"});
        // end table header

        // data
        for(NsiTnved4 tnved: tnveds){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(tnved.getKod());
            row.createCell(1).setCellValue(tnved.getNaim());
//            cs.setWrapText(true);
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
    }

    public void nsiDeliv() {
        NsiDelivDAO dao = new NsiDelivDAOHib();
        List<NsiDeliv> delivs = dao.findAll();

        // title
        createTitle(0,0,0,1);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Код","Описание"});
        // end table header

        // data
        for(NsiDeliv deliv: delivs){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(deliv.getKod());
            row.createCell(1).setCellValue(deliv.getDnameR());
//            cs.setWrapText(true);
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
    }

    public void nsiUpak() {
        NsiUpakDAO dao = new NsiUpakDAOHib();
        List<NsiUpak> upaks = dao.findAll();

        // title
        createTitle(0,0,0,1);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Код","Описание"});
        // end table header

        // data
        for(NsiUpak upak: upaks){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(upak.getKodOon());
            row.createCell(1).setCellValue(upak.getNzypRu());
//            cs.setWrapText(true);
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
    }

    public void nsiOtpr() {
        NsiSmgsG1DAO dao = new NsiSmgsG1DAOHib();
        List<NsiCsG1> otprs = dao.findAll();

        // title
        createTitle(0,0,0,7);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Наименование","Страна, код", "Страна, наименование","Город","Адрес","код ТГНЛ","код ОКПО","код ИНН"});
        // end table header

        // data
        for(NsiCsG1 otpr: otprs){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(otpr.getG1r());
            row.createCell(1).setCellValue(otpr.getG_1_5k());
            row.createCell(2).setCellValue(otpr.getG16r());
            row.createCell(3).setCellValue(otpr.getG18r_1());
            row.createCell(4).setCellValue(otpr.getG19r());
            row.createCell(5).setCellValue(otpr.getG2());
            row.createCell(6).setCellValue(otpr.getG3());
            row.createCell(7).setCellValue(otpr.getG_2inn());
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
        sheet.autoSizeColumn(2);
        sheet.autoSizeColumn(3);
        sheet.autoSizeColumn(4);
        sheet.autoSizeColumn(5);
        sheet.autoSizeColumn(6);
        sheet.autoSizeColumn(7);
    }

    public void nsiPlat() {
        NsiPlatelDAO dao = new NsiPlatelDAOHib();
        List<NsiPlatel> plats = dao.findAll();

        // title
        createTitle(0,0,0,5);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Код адм.","Наименование", "Способ оплаты","Код плат","Подкод кода","Подкод подкода"});
        // end table header

        // data
        for(NsiPlatel plat: plats){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(plat.getDorR());
            row.createCell(1).setCellValue(plat.getPlatR());
            row.createCell(2).setCellValue(plat.getPrimR());
            row.createCell(3).setCellValue(plat.getKplat());
            row.createCell(4).setCellValue(plat.getKplat1());
            row.createCell(5).setCellValue(plat.getKplat2());
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
        sheet.autoSizeColumn(2);
        sheet.autoSizeColumn(3);
        sheet.autoSizeColumn(4);
        sheet.autoSizeColumn(5);
    }

    public void nsiManagement() {
        ManagementDAO dao = new ManagementDAOHib();
        List<Management> manags = dao.findAll();

        // title
        createTitle(0,0,0,2);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Код","Наименование","Страна"});
        // end table header

        // data
        for(Management manag: manags){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(manag.getManagNo());
            row.createCell(1).setCellValue(manag.getManagName());
            Countrys country = manag.getCountrys();
            if (country != null) {
                row.createCell(2).setCellValue(country.getCountryName());
            } else {
                row.createCell(2).setCellValue("");
            }
//            cs.setWrapText(true);
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
        sheet.autoSizeColumn(2);
    }

    public void nsiCountriesGd() {
        RoadDAO dao = new RoadDAOHib();
        List<Road> roads = dao.findAll();

        // title
        createTitle(0,0,0,3);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Код дороги","Код адм.","Жел. дор.","Страна"});
        // end table header

        // data
        for(Road road: roads){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(road.getRoadNo());
            Management manag = road.getManagement();
            if (manag != null) {
                row.createCell(1).setCellValue(manag.getManagNo());
                Countrys country = manag.getCountrys();
                if (country != null) {
                    row.createCell(3).setCellValue(country.getCountryName());
                } else{
                    row.createCell(3).setCellValue("");
                }
            } else {
                row.createCell(1).setCellValue("");
                row.createCell(3).setCellValue("");
            }
            row.createCell(2).setCellValue(road.getRoadName());
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
        sheet.autoSizeColumn(2);
        sheet.autoSizeColumn(3);
    }

    public void nsiDocG23() {
        NsiSmgsFieldsOptDAO dao = new NsiSmgsFieldsOptDAOHib();
        List<NsiFieldsOpt> fields = dao.findAll();

        // title
        createTitle(0,0,0,4);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"код UN/EDIFACT","таможенный код", "Наименование(рус)","Наименование(кит)","Наименование(др)"});
        // end table header

        // data
        for(NsiFieldsOpt field: fields){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(field.getNsiFNn());
            row.createCell(1).setCellValue(field.getNsiFNcas());
            row.createCell(2).setCellValue(field.getNsiFDesc());
            row.createCell(3).setCellValue(field.getNsiFDsc3());
            row.createCell(4).setCellValue(field.getNsiFDsc2());
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
        sheet.autoSizeColumn(2);
        sheet.autoSizeColumn(3);
        sheet.autoSizeColumn(4);
    }

    public void nsiVeterin() {
        VeterinDAO dao = new VeterinDAOHib();
        List<Veterin> veterins = dao.findAll();

        // title
        createTitle(0,0,0,1);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Код","Наименование"});
        // end table header

        // data
        for(Veterin veterin: veterins){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(veterin.getKgvn());
            row.createCell(1).setCellValue(veterin.getNzgr());
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
    }

    public void nsiKarantin() {
        KarantinDAO dao = new KarantinDAOHib();
        List<Karantin> karantins = dao.findAll();

        // title
        createTitle(0,0,0,1);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Код","Наименование"});
        // end table header

        // data
        for(Karantin karantin: karantins){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(karantin.getKgvn());
            row.createCell(1).setCellValue(karantin.getNzgr());
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
    }

    public void nsiDangCode() {
        DangCodeDAO dao = new DangCodeDAOHib();
        List<DangCode> dangCodes = dao.findAll();

        // title
        createTitle(0,0,0,1);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Код","Наименование"});
        // end table header

        // data
        for(DangCode dangCode: dangCodes){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(dangCode.getCode());
            row.createCell(1).setCellValue(dangCode.getDescr());
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
    }

    public void cargoGng() {
        CargoGngDAO dao = new CargoGngDAOHib();
        List<CargoGng> cargoGngs = dao.findAll();

        // title
        createTitle(0,0,0,1);
        // end title

        // empty row
        sheet.createRow(++rowIndx);

        // table header
        createHeader(new String[]{"Код","Наименование"});
        // end table header

        // data
        for(CargoGng cargoGng: cargoGngs){
            row = sheet.createRow(++rowIndx);
            row.createCell(0).setCellValue(cargoGng.getCargo_group());
            row.createCell(1).setCellValue(cargoGng.getCargo_fullname());
        }
        // end data
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
    }

    public String getFileName() {
        return fileName;
    }

    /*private ByteArrayOutputStream buildOutputStream() throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        wb.write(baos);
        baos.close();
        return baos;
    }*/

    /*public InputStream excel2InputStream(boolean ziped) throws IOException {
        if(ziped){
            OutputStream baos = new OutputStream();
            ZipOutputStream zs = wb.write(new ZipOutputStream());
            ZipOutputStream zs = new ZipOutputStream(outputStream);
            return null;
        } else {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            wb.write(baos);
            baos.close();
            return new ByteArrayInputStream(baos.toByteArray());
        }
    }*/

}
