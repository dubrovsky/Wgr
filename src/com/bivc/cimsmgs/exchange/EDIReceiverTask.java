package com.bivc.cimsmgs.exchange;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class EDIReceiverTask extends AbstractTask {

    final static private Logger log = LoggerFactory.getLogger(EDIReceiverTask.class);

  public EDIReceiverTask() {
  }

  public EDIReceiverTask(String name) {
    super(name);
  }

  protected void runTask() throws Exception {
    ExchangeServer server = new ExchangeServer();
    boolean res = server.ReceiveEDI();
    log.info("Result = " + res);
  }

  public static void main(String[] args) {
    try {
      EDIReceiverTask rt = new EDIReceiverTask();
      rt.run();
    }
    catch(Exception ex) {
      log.error(ex.getMessage(), ex);
    }
  }
}
