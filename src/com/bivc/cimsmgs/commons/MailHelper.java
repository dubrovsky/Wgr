package com.bivc.cimsmgs.commons;

import javax.mail.*;
import java.io.UnsupportedEncodingException;

public class MailHelper {
    public String getMytxt() {
        return mytxt;
    }

    private final String mytxt;
    private final String charSet = "utf-8";

    public MailHelper(String mytxt){
        this.mytxt = mytxt;
    }

    // Сообщение, состоящее из одной части с типом контента text/plain.
    public void setMsgContent(Message msg) throws MessagingException, UnsupportedEncodingException {
        // Установка типа контента
        /*String mytxt = "This is a test of sending a " +
                "plain text e-mail through Java.\n" +
                "Here is line 2.";
        msg.setText(mytxt);*/

        // Альтернативный способ
        msg.setContent(mytxt, "text/plain");

    }
}
