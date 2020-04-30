package Ti.model.excel;

import java.util.ArrayList;
import java.util.List;

public class InvoiceXlsContainer extends XlsDefaultModel{

    private String contNum;
    private List<InvoiceXls> invoicesCargo;

    public InvoiceXlsContainer(String contNum, List<InvoiceXls> invoicesCargo) {
        this.contNum = contNum;
        this.invoicesCargo = invoicesCargo;
    }

    public InvoiceXlsContainer() {
        this.invoicesCargo= new ArrayList<>();
    }

    public InvoiceXlsContainer(String contNum) {
        this.contNum = contNum;
        this.invoicesCargo= new ArrayList<>();
    }

    public String getContNum() {
        return contNum;
    }

    public List<InvoiceXls> getInvoicesCargo() {
        return invoicesCargo;
    }

    public void setContNum(String contNum) {
        this.contNum = contNum;
    }

    public void setInvoicesCargo(List<InvoiceXls> invoicesCargo) {
        this.invoicesCargo = invoicesCargo;
    }

    @Override
    public String toString() {
        return "InvoiceXlsContainer{" +
                "contNum='" + contNum + '\'' +
                ", invoicesCargo=" + invoicesCargo +
                '}';
    }
}
