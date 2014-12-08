package com.bivc.cimsmgs.commons;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;
import javax.mail.util.ByteArrayDataSource;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;

public class MailHelperAttach extends MailHelper {
    private final String mimeType;
    private final String fileFullName;
    private final ByteArrayOutputStream os;
    private final String charSet = "utf-8";
    public static final String ZIP = "application/zip";
    public static final String EXCEL = "application/vnd.ms-excel";

    public MailHelperAttach(String mytxt, String mimeType, String fileFullName, ByteArrayOutputStream os){
        super(mytxt);
        this.mimeType = mimeType;
        this.fileFullName = fileFullName;
        this.os = os;
    }

    public void setMsgContent(Message msg) throws MessagingException, UnsupportedEncodingException {
        MimeBodyPart p1 = new MimeBodyPart();
        p1.setText(getMytxt());

        // Создание второй части
        MimeBodyPart p2 = new MimeBodyPart();

        // Добавление файла во вторую часть
        DataSource ds = new ByteArrayDataSource(os.toByteArray(), mimeType);
        p2.setDataHandler(new DataHandler(ds));
        p2.setFileName(MimeUtility.encodeText(fileFullName, charSet, null));

        // Создание экземпляра класса Multipart. Добавление частей сообщения в него.
        Multipart mp = new MimeMultipart();
        mp.addBodyPart(p1);
        mp.addBodyPart(p2);

        // Установка экземпляра класса Multipart в качестве контента документа
        msg.setContent(mp);
    }
}
