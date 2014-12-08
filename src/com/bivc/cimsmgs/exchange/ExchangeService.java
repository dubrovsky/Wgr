package com.bivc.cimsmgs.exchange;

import org.apache.axis.MessageContext;
import org.apache.log4j.Logger;
import org.apache.log4j.NDC;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

public class ExchangeService {

  private String remoteIp;
  static private int counter = 0;
  protected int instanceNumber = 0;

  static private Logger log = Logger.getLogger(ExchangeService.class);

  public ExchangeService() {
    instanceNumber = ++counter;
    NDC.remove();  // Удаляем старый идентификатор, если он был, из текущего потока и всех мертвых потоков
    NDC.push(Integer.toString(instanceNumber));
    MessageContext context = MessageContext.getCurrentContext();
    remoteIp = "local";
    String sslID = "";
    if (context != null) {
      HttpServletRequest req = (HttpServletRequest) context.getProperty(org.apache.axis.transport.http.HTTPConstants.MC_HTTP_SERVLETREQUEST);
      remoteIp = req.getRemoteAddr();
      sslID = (String) req.getAttribute("javax.servlet.request.ssl_session");
    }
    log.info("Start instance = " + instanceNumber + ", ip = " + remoteIp + ", SSL=" + sslID);
  }

  public boolean Peregruz (
        String   nkon,     /* Номер контейнера */
        Integer  tara,     /* Масса тары контейнера (кг)*/
        String   tip_razm, /* Типоразмер контейнера */
        String   nvag,     /* Номер узкого вагона */
        String   smgs,     /* Номер перевозочного документа */
        String   nhvg,     /* Номер широкого вагона */
        Integer  gr_pod,   /* Грузоподъемность широкого вагона (т) */
        Integer  kol_os,   /* Количество осей широкого вагона */
        Integer  tara_vag, /* Масса тары широкого вагона */
        Date     dprb,     /* Дата прибытия  на ст.перегруза */
        Date     dprv,     /* Дата перегруза */
        String   kstp,     /* Код станции перегруза */
        String[] plomb     /* Пломбы */ ) {

    return true;
  }

  public boolean Otprav (
        String nkon,       /* Номер контейнера */
        String nppr,       /* Номер поезда */
        Date   dpro,       /* Дата отправления */
        String ksto        /* Код стации отправления */ ) {

      return true;
    }

  public TKServer.SendMessageResult sendMessage(String xmlString, int status) throws java.rmi.RemoteException {
    log.debug("xmlString=" + xmlString + ", status=" + status);

    FTSConvertor conv = new FTSConvertor();
    int res = conv.receive(xmlString, status);

    return new TKServer.SendMessageResult(res, "");
  }

  public static void main(String[] argv) {

  }
}