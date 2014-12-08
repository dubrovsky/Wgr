package com.bivc.cimsmgs.converters;

import com.opensymphony.xwork2.conversion.TypeConversionException;
import org.apache.struts2.util.StrutsTypeConverter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

public class DateTypeConverter extends StrutsTypeConverter {
    final private String format4 = "dd.MM.yy HH:mm:ss";
    final private String format2 = "dd.MM.yy HH:mm";
    final private String format3 = "dd.MM.yy HH";
    final private String format1 = "dd.MM.yy";
    final private String format11 = "MM/dd/yy";
    final private String format12 = "yyyy-MM-dd";

    final private SimpleDateFormat sdf1 = new SimpleDateFormat(format1);
    final private SimpleDateFormat sdf11 = new SimpleDateFormat(format11);
    final private SimpleDateFormat sdf12 = new SimpleDateFormat(format12);
    final private SimpleDateFormat sdf2 = new SimpleDateFormat(format2);
    final private SimpleDateFormat sdf3 = new SimpleDateFormat(format3);
    final private SimpleDateFormat sdf4 = new SimpleDateFormat(format4);
    final private SimpleDateFormat arr[] = {sdf1, sdf2, sdf3, sdf4, sdf11, sdf12};

    @SuppressWarnings("rawtypes")
    public Object convertFromString(Map map, String[] stringArray, Class _class) throws TypeConversionException {
        String date = stringArray[0];
        Date check = null;
        if (date == null || date.trim().length() == 0)
            return check;

        date = date.trim();
        for (int i = 0; i < arr.length; i++) {
            try {
                check = arr[i].parse(date);
                String sdat = arr[i].format(check);
                if (date.equals(sdat))
                    break;
            } catch (ParseException ignore) {
            }
        }
        if (check == null)
            throw new TypeConversionException();
        return check;
    }

    @SuppressWarnings("rawtypes")
    public String convertToString(Map map, Object object) throws TypeConversionException {
        return (object != null) ? sdf1.format((Date) object) : null;
    }


}
