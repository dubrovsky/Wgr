package com.bivc.cimsmgs.exchange;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class TBCReceiverTask extends AbstractTask {

  final static private Logger log = LoggerFactory.getLogger(TBCReceiverTask.class);

  public TBCReceiverTask() {
  }

  public TBCReceiverTask(String name) {
    super(name);
  }

  protected void runTask() throws Exception {
    ExchangeServer server = new ExchangeServer();
    boolean res = server.ReceiveTBC();
    log.info("Result = " + res);
  }

  public static void main(String[] args) {
    try {
      TBCReceiverTask rt = new TBCReceiverTask();
      rt.run();
    }
    catch(Exception ex) {
      log.error(ex.getMessage(), ex);
    }
  }
}
