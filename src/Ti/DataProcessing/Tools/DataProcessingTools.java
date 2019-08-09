package Ti.DataProcessing.Tools;

import Ti.model.MapPogruz;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class DataProcessingTools {


    /**
     * deserialize json string to List<MapPogruz>
     * @param json string
     * @param objectMapper mapper
     * @return List<MapPogruz>
     */
    public static List<MapPogruz> DeserializeMapPeregruz(String json, ObjectMapper objectMapper) {
//        ObjectMapper objectMapper = new ObjectMapper();
        //add this line
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);
        List<MapPogruz> list = null;
        try {
            list = objectMapper.readValue(json, objectMapper.getTypeFactory().constructCollectionType(List.class, MapPogruz.class));
        }
        catch (IOException e) {
            return list;
        }
        for (MapPogruz pogruz : list) {
            if (!pogruz.getZnak().isEmpty()) {
                String znak = pogruz.getZnak().get(0);
                znak = znak.replaceAll("\\[", "");
                znak = znak.replaceAll("\\]", "");

                String[] znaks = znak.split(",");
                for (int i = 0; i < znaks.length; i++) {
                    znaks[i] = znaks[i].trim();
                }
                pogruz.setZnak(Arrays.asList(znaks));
            }
        }
        return list;
    }

    /**
     * parseDateString pasrse date interval from string where dates are separated by ,
     *
     * @param string input ctring
     * @return array[2] with date interval
     */
    public static Date[] parseDateString(String string) {
        Date date[] = new Date[2];

        String[] datstr = string.split(",");
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd:MM:yyyy");
        try {
            switch (datstr.length) {
                case 2: {
                    if (string.charAt(0) != ',')
                        date[0] = simpleDateFormat.parse(datstr[0]);

                    date[1] = simpleDateFormat.parse(datstr[1]);
                }
                break;
                case 1: {
                    date[0] = simpleDateFormat.parse(datstr[0]);
                }
                break;
            }
        }
        catch (ParseException e) {
            e.printStackTrace();
            return date;
        }
        return date;
    }

    public static Long[] stringArrToLongList(String[] input) {
        Long res[] = new Long[input.length];
        for (int i = 0; i < input.length; i++) {
            try {
                res[i] = Long.parseLong(input[i]);
            }
            catch (Exception e) {
                return null;
            }
        }
        return res;
    }
}
