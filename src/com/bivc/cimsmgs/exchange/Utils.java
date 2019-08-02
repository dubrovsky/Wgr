package com.bivc.cimsmgs.exchange;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.ArrayList;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.time.FastDateFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.bivc.cimsmgs.exchange.DateFormat.*;

public class Utils {

    final static private Logger log = LoggerFactory.getLogger(Utils.class);

  public static String ss(String s, int pos, int len) {
    String res = "";
    if (s != null) {
      int le = s.length();
      if (le > pos) {
        if (le > pos + len) {
          res = s.substring(pos, pos + len);
        }
        else {
          res = s.substring(pos);
        }
        res = res.trim();
      }
    }
    return res;
  }

  public static String ge(String[] ar, int idx) {
    String res = "";
    if (ar.length > idx)
      res = ar[idx];
    return res;
  }

  public static String format(Object str, int len) {
    return format(str, len, 1);
  }

  public static String format(Object str, int len, int count) {
    String res = "", s;
    if (str != null) {
      if (str instanceof BigDecimal) {
        /* Fix for bug 6480539 */
        if (BigDecimal.ZERO.compareTo((BigDecimal)str) == 0) {
          s = "0";
        }
        else {
          s = ((BigDecimal) str).stripTrailingZeros().toPlainString();
        }
      }
      else {
        s = str.toString().trim();
        s = s.replaceAll("[\r\n]", " ");
        s = s.replaceAll("\\+", "?+").replaceAll(":", "?:").replaceAll("'", "\""); // убираем спецсимволы из текста
      }
      if (s.length() > len*count) s = s.substring(0, len*count);
      while (s.length() > len) {
        res += s.substring(0, len) + ":";
        s = s.substring(len);
      }
      res += s;
    }
    return res;
  }

  public static String[] split(String input, String regex) {
    return input.split(regex);
  }

  public static String[] split(String input, String regex, String meta) {
    if (meta == null || meta.length() == 0)
      return input.split(regex);

    int mLen = meta.length();
    Pattern re = null;
    int fOld = 0;
    int fNew = 0;
    StringBuffer sMatch = new StringBuffer("");
    Matcher match;
    ArrayList<String> list = new ArrayList<>();
    try {
      re = Pattern.compile(regex);
      match = re.matcher(input);
      while (match.find()) {
        int start = match.start();
        int end   = match.end();
        fOld = fNew;
        fNew = end;
        if (input.regionMatches(start - mLen, meta, 0, mLen)) {
          StringBuffer s = new StringBuffer(input.substring(fOld, end));
          sMatch.append(s.deleteCharAt(s.length()-2));
        }
        else {
          sMatch.append(input.substring(fOld, start));
          list.add(sMatch.toString());
          sMatch = new StringBuffer("");
        }
      }
      if (sMatch.length() > 0)
        list.add(sMatch.append(input.substring(fNew)).toString());
      else if (fNew != input.length())
        list.add(input.substring(fNew));
    }
    catch (Exception ex) {
      log.error(ex.toString());
    }
    return list.toArray(new String[list.size()]);
  }

  public static Integer geI(String[] ar, int idx) {
    Integer res = null;
    try {
      res = Integer.valueOf(ge(ar, idx));
    }
    catch (NumberFormatException nfex) {
      log.warn(ge(ar, idx) + " : " + nfex);
    }
    return res;
  }

  public static Long geL(String[] ar, int idx) {
    Long res = null;
    try {
      res = Long.valueOf(ge(ar, idx));
    }
    catch (NumberFormatException nfex) {
      log.warn(ge(ar, idx) + " : " + nfex);
    }
    return res;
  }

  public static Long geLD(String[] ar, int idx) {
    Long res = null;
    BigDecimal dec = geD(ar, idx);
    if ( dec != null)
      res = dec.longValue();
    return res;
  }

  public static BigDecimal geD(String[] ar, int idx) {
    return makeBigDecimal(ge(ar, idx));
  }

  public static BigDecimal geD0(String[] ar, int idx) {
    return makeBigDecimal0(ge(ar, idx));
  }

  public static Date geT(String [] ar, int idx, SimpleDateFormat mask) {
    Date res = null;
    String s = ge(ar, idx);

    if (StringUtils.isBlank(s) || mask == null)
      return null;

    try {
      res = mask.parse(s);
    }
    catch (ParseException ignore) {
    }

    return res;
  }

  public static BigDecimal makeBigDecimal(String str) {
    BigDecimal res = null;
    try {
      res = new BigDecimal(StringUtils.defaultString(str).trim().replace(",", "."));
    }
    catch (Exception ex) {
      log.warn(ex.getMessage() + " for value " + str);
    }
    return res;
  }

  public static BigDecimal makeBigDecimal0(String str) {
    BigDecimal res = makeBigDecimal(str);
    if (res == null)
      res = BigDecimal.ZERO;
    return res;
  }

  public static Short makeShort(String str) {
    Short res = null;
    try {
      res = Short.valueOf(str);
    }
    catch (Exception ex) {
      log.warn(ex.getMessage() + " for value " + str);
    }
    return res;
  }

  public static Byte makeByte(String str) {
    Byte res = null;
    try {
      res = Byte.valueOf(str);
    }
    catch (Exception ex) {
      log.warn(ex.getMessage() + " for value " + str);
    }
    return res;
  }

  static final private FastDateFormat arr[] = {sdf14, sdf13, sdf12, sdf11, sdf10, sdf24, sdf23, sdf22, sdf21, sdf20, sdf34, sdf33, sdf32, sdf31, sdf30, sdf44, cdf, sdf51};

  public static Date makeDate(String str) {
    return makeDate(str, arr);
  }

  public static Date makeDate(String str, FastDateFormat... mask) {
//      logger.debug("Converting to Date from String - " + str);
    Date check = null;
    if (org.apache.commons.lang3.StringUtils.isBlank(str))
      return null;

    str = str.trim();
    for (FastDateFormat anArr : mask) {
      try {
        check = anArr.parse(str);
        String sdat = anArr.format(check);
        if (str.equals(sdat))
          break;
      } catch (Exception ignore) {
      }
    }

    if (check == null)
      log.warn("Not parsable date " + str);

    return check;
  }
  public static String normNvagNkonStr(String str) {
    String res = "";
    if (str != null) {
      res = str.replaceAll(" ", "").replaceAll("-", "");
    }
    return res;
  }
}
