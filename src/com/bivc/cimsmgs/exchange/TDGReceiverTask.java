package com.bivc.cimsmgs.exchange;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class TDGReceiverTask extends AbstractTask {

  final static private Logger log = LoggerFactory.getLogger(TDGReceiverTask.class);
  private String serverURL;
  private String user;
  private String passwd;

  public TDGReceiverTask(String serverURL, String user, String passwd) {
    this.serverURL = serverURL;
    this.user = user;
    this.passwd = passwd;
  }

  public TDGReceiverTask(String name) {
    super(name);
  }

  protected void runTask() throws Exception {
    try {
      TDGConvertor conv = new TDGConvertor(serverURL, user, passwd);
      conv.receiveStatus();
      log.info("Completed");
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
    }
  }

  public static void main(String[] args) {
    try {
      TDGReceiverTask rt = new TDGReceiverTask("https://portal.trdg.ru", "PortalTK_1", "EkV8zEvV4j");
      rt.run();
    }
    catch(Exception ex) {
      log.error(ex.getMessage(), ex);
    }
  }
}
