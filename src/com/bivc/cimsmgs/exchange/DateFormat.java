package com.bivc.cimsmgs.exchange;

import org.apache.commons.lang3.time.FastDateFormat;

import java.text.SimpleDateFormat;
import java.util.Locale;

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

  static final public FastDateFormat sdf10 = FastDateFormat.getInstance("dd.MM.yy");
  static final public FastDateFormat sdf11 = FastDateFormat.getInstance("dd.MM.yyyy");
  static final public FastDateFormat sdf12 = FastDateFormat.getInstance("dd.MM.yyyy HH");
  static final public FastDateFormat sdf13 = FastDateFormat.getInstance("dd.MM.yyyy HH:mm");
  static final public FastDateFormat sdf14 = FastDateFormat.getInstance("dd.MM.yyyy HH:mm:ss");
  static final public FastDateFormat sdf20 = FastDateFormat.getInstance("dd-MM-yy");
  static final public FastDateFormat sdf21 = FastDateFormat.getInstance("dd-MM-yyyy");
  static final public FastDateFormat sdf22 = FastDateFormat.getInstance("dd-MM-yyyy HH");
  static final public FastDateFormat sdf23 = FastDateFormat.getInstance("dd-MM-yyyy HH:mm");
  static final public FastDateFormat sdf24 = FastDateFormat.getInstance("dd-MM-yyyy HH:mm:ss");
  static final public FastDateFormat sdf30 = FastDateFormat.getInstance("dd/MM/yy");
  static final public FastDateFormat sdf31 = FastDateFormat.getInstance("dd/MM/yyyy");
  static final public FastDateFormat sdf32 = FastDateFormat.getInstance("dd/MM/yyyy HH");
  static final public FastDateFormat sdf33 = FastDateFormat.getInstance("dd/MM/yyyy HH:mm");
  static final public FastDateFormat sdf34 = FastDateFormat.getInstance("dd/MM/yyyy HH:mm:ss");
  static final public FastDateFormat sdf44 = FastDateFormat.getInstance("yyyy-MM-dd'T'HH:mm:ss");
  static final public FastDateFormat cdf   = FastDateFormat.getInstance("yyyy-MM-dd");
  static final public FastDateFormat sdf51 = FastDateFormat.getInstance("dd-MMM-yy", Locale.ENGLISH);

  public DateFormat() {
  }
}