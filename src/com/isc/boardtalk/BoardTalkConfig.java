package com.isc.boardtalk;

import com.isc.boardtalk.thread.mailCheck;
import com.isc.utils.dbStore.infoDbStore;
import com.isc.utils.mail.mailTool;

public class BoardTalkConfig {
    public static mailCheck mCheck = null;
    public static int periodInMinute = 1;
    public static String breaking = "\n-- \n";
    public static String breaking_pattern = "[\n\r]{1}-- [\n\r]{1}";
    public static mailTool mlt = null;
    public static String mailFrom = null;
    public static infoDbStore board_info = null;
    public static infoDbStore board_to_un_info = null;
    public final static String tableBoard = "BOARDTALK";
    public final static String tableBoardNewMess = "BOARDTALK_NEW_MESS";
    public final static String tableBoardToUn = "BOARDTALK_TO_UN";

}
