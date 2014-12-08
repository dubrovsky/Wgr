package com.bivc.cimsmgs.exchange;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
    ArrayList list = new ArrayList();
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
    return (String[]) list.toArray(new String[list.size()]);
  }

}
