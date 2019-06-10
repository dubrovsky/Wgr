package com.bivc.cimsmgs.exchange;

import java.text.SimpleDateFormat;

public class DateFormat {
  static private final String[] masks = {
    "d.MM.yyyy",
    "d.MM.yyyy HH:ss",
    "'{d '''yyyy-MM-dd'''}'",
    "'{t '''HH:mm:ss'''}'",
    "'{ts '''yyyy-MM-dd HH:mm:ss'''}'" };

  static final public SimpleDateFormat dateFormater = new SimpleDateFormat("d.MM.yyyy");
  static final public SimpleDateFormat dateFormaterDay = new SimpleDateFormat("d");
  static final public SimpleDateFormat dateFormaterMonth = new SimpleDateFormat("M");
  static final public SimpleDateFormat dateFormaterPrint = new SimpleDateFormat("dd/MM/yyyy");
  static final public SimpleDateFormat dateFormaterPrintFull = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
  static final public SimpleDateFormat dateTimeFormater = new SimpleDateFormat("d.MM.yyyy HH:mm:ss");
  static final public SimpleDateFormat DBDateFormat = new SimpleDateFormat("'{d '''yyyy-MM-dd'''}'");
  static final public SimpleDateFormat DBTimeFormat = new SimpleDateFormat("'{t '''HH:mm:ss'''}'");
  static final public SimpleDateFormat DBDateTimeFormat = new SimpleDateFormat("'{ts '''yyyy-MM-dd HH:mm:ss'''}'");

  public DateFormat() {
  }
}