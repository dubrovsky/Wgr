package com.bivc.cimsmgs.commons;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by peter on 07.02.14.
 */
public class DateTimeUtils {
    public static final String RU_DATE_FORMAT = "dd.MM.yy";
    public static final String RU_DATETIME_FORMAT = "dd.MM.yy HH:mm";
    public static final String RU_TIME_FORMAT = "HH:mm";

    public static final String EN_DATE_FORMAT = "MM/dd/yy";
    public static final String EN_DATETIME_FORMAT = "MM/dd/yy h:mm a";
    public static final String EN_TIME_FORMAT = "h:mm a";

    public static final String DE_DATE_FORMAT = "MM/dd/yy";
    public static final String DE_DATETIME_FORMAT = "MM/dd/yy h:mm a";
    public static final String DE_TIME_FORMAT = "h:mm a";

    public static final String ZH_DATE_FORMAT = "yy/MM/dd";
    public static final String ZH_DATETIME_FORMAT = "yy/MM/dd h:mm a";
    public static final String ZH_TIME_FORMAT = "h:mm a";

    public enum Parser {
        ru(new String[]{RU_DATE_FORMAT, RU_DATETIME_FORMAT, RU_TIME_FORMAT}),
        en(new String[]{EN_DATE_FORMAT, EN_DATETIME_FORMAT, EN_TIME_FORMAT}),
        de(new String[]{DE_DATE_FORMAT, DE_DATETIME_FORMAT, DE_TIME_FORMAT}),
        zh(new String[]{ZH_DATE_FORMAT, ZH_DATETIME_FORMAT, ZH_TIME_FORMAT});

        private final String[] formats;

        Parser(String[] formats){
            this.formats = formats;
        }

        public Date parse(String date){
            try {
                return DateUtils.parseDate(date, formats);
            } catch (ParseException ignore) {
                return null;
            }

        /*for (String format: formats) {
            try {
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
                Date date = new SimpleDateFormat(format).parse(string);
                String sdat = simpleDateFormat.format(date);
                if (string.equals(sdat)) {
                    return date;
                }
            } catch (ParseException ignore) {
            }
        }*/

        }
    }

    public enum FormaterDate {
        ru(RU_DATE_FORMAT),
        en(EN_DATE_FORMAT),
        de(DE_DATE_FORMAT),
        zh(ZH_DATE_FORMAT);

        private final String format;

        FormaterDate(String format){
            this.format = format;
        }

        public String format(Date date){
           return DateFormatUtils.format(date, format);
        }
    }

    public enum FormaterDateTime {
        ru(RU_DATETIME_FORMAT),
        en(EN_DATETIME_FORMAT),
        de(DE_DATETIME_FORMAT),
        zh(ZH_DATETIME_FORMAT);

        private final String format;

        FormaterDateTime(String format){
            this.format = format;
        }

        public String format(Date date){
            return DateFormatUtils.format(date, format);
        }

        public String getFormat(){
            return this.format;
        }
    }

    public enum FormaterTime {
        ru(RU_TIME_FORMAT),
        en(EN_TIME_FORMAT),
        de(DE_TIME_FORMAT),
        zh(ZH_TIME_FORMAT);

        private final String format;

        FormaterTime(String format){
            this.format = format;
        }

        public String format(Date date){
            return DateFormatUtils.format(date, format);
        }
    }

    static public Date addTimeToDate(Date date, Date time){
        Calendar date_cal = Calendar.getInstance();
        date_cal.setTime(date);
        Calendar time_cal = Calendar.getInstance();
        time_cal.setTime(time);
        date_cal.add(Calendar.HOUR_OF_DAY, time_cal.get(Calendar.HOUR_OF_DAY));
        date_cal.add(Calendar.MINUTE, time_cal.get(Calendar.MINUTE));
        return date_cal.getTime();
    }
}
