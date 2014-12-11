package com.bivc.cimsmgs.exchange;

import org.apache.commons.lang3.time.DurationFormatUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

abstract class AbstractTask extends TimerTask {

  private Timer timer;
  private int interval;
  private int stop = 0;
  private String name = "";
  private boolean running = false;
  private Date timeStart = null;
  private Date timeStop = null;

    final static private Logger log = LoggerFactory.getLogger(AbstractTask.class);

  public AbstractTask() {
    this.name = getClass().getSimpleName();
  }

  public AbstractTask(String name) {
    this.name = name != null ? name : getClass().getSimpleName();
  }

  public void schedule(int delay, int interval) {
    this.interval = interval;
    timer = new Timer(false);
    timer.schedule(this, delay, interval);
  }
  /* это не работает, т.к поток продолжает выполняться :( */
  public void reschedule(int delay) {
    running = false;
    timer = new Timer(false);
    timer.schedule(this, delay, interval);
  }

  public void run() {
    try {
      running = true;
      timeStop = null;
      timeStart = new Date();
      log.debug("Tic " + getName());

      runTask();

    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
    }
    finally {
      running = false;
      timeStop = new Date();
      log.debug(getName() + " time " + DurationFormatUtils.formatDuration(getRunningTime(), "dd HH:mm:ss.SS"));
      if (stop == 1) {
        log.debug("Timer stoped " + getName());
        timer.cancel();
        stop = 2;
      }
    }
  }

  public void stop() {
    log.debug("Invoke stop " + getName());
//    System.out.println("invoke stop");
    if (!running) {
      timer.cancel();
      stop = 2;
      log.debug("Timer stoped " + getName());
//      System.out.println("Timer stoped");
    }
    else {
      stop = 1;
      log.debug("Stop delayed " + getName());
//      System.out.println("Stop delayed");
    }
  }

  public boolean isStoped() {
    return stop == 2;
  }

  public boolean isRunning() {
    return running;
  }

  abstract protected void runTask() throws Exception ;

  public Timer getTimer() {
    return timer;
  }

  protected String getName() {
    return "<" + name + ">";
  }

  public long getRunningTime() {
    return (running ? new Date().getTime() : timeStop.getTime()) - timeStart.getTime();
  }

}
