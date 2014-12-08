package com.bivc.cimsmgs.commons;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Properties;

public class MailService {
    private final String to;
    private final String from;
    private final String host;
    private final String username;
    private final String password;
    private final String subject;
    private final MailHelper helper;

    public MailService(String to, String from, String host, String username, String password, String subject, MailHelper helper){
        this.to = to;
        this.from = from;
        this.host = host;
        this.username = username;
        this.password = password;
        this.subject = subject;
        this.helper = helper;
    }

    public boolean send() throws MessagingException, UnsupportedEncodingException {
        // Создание свойств, получение сессии
        Properties props = new Properties();

        // При использовании статического метода Transport.send()
        // необходимо указать через какой хост будет передано сообщение
        props.put("mail.smtp.host", host);
        // Включение debug-режима
//        props.put("mail.debug", "true");
        //Включение авторизации
        props.put("mail.smtp.auth", "true");

        props.put("mail.smtp.connectiontimeout", "30000");
        props.put("mail.smtp.timeout", "30000");
        // Получение сессии
        Session session = Session.getInstance(props);

        try {
            // Получение объекта транспорта для передачи электронного сообщения
            Transport bus = session.getTransport("smtp");

            // Устанавливаем соединение один раз
            // Метод Transport.send() отсоединяется после каждой отправки
            //bus.connect();
            // Обычно для SMTP сервера необходимо указать логин и пароль
//            bus.connect("smtpserver.yourisp.net", username, password);
            bus.connect(host, username, password);

            // Создание объекта сообщения
            Message msg = new MimeMessage(session);

            // Установка атрибутов сообщения
            msg.setFrom(new InternetAddress(from));
            InternetAddress[] address = {new InternetAddress(to)};
            msg.setRecipients(Message.RecipientType.TO, address);
            /*// Парсинг списка адресов разделённых пробелами. Строгий синтаксис
            msg.setRecipients(Message.RecipientType.CC,
                    InternetAddress.parse(to, true));
            // Парсинг списка адресов разделённых пробелами. Более мягкий синтаксис.
            msg.setRecipients(Message.RecipientType.BCC,
                    InternetAddress.parse(to, false));*/

            msg.setSubject(subject);
            msg.setSentDate(new Date());

            helper.setMsgContent(msg);
            msg.saveChanges();
            bus.sendMessage(msg, address);

            /*setMultipartContent(msg);
            msg.saveChanges();
            bus.sendMessage(msg, address);

            setFileAsAttachment(msg, "C:/WINDOWS/CLOUD.GIF");
            msg.saveChanges();
            bus.sendMessage(msg, address);
            setHTMLContent(msg);
            msg.saveChanges();
            bus.sendMessage(msg, address);*/

            bus.close();
        }
        catch (MessagingException mex) {
            // Печать информации обо всех возможных возникших исключениях
            mex.printStackTrace();
            // Получение вложенного исключения
            while (mex.getNextException() != null) {
                // Получение следующего исключения в цепочке
                Exception ex = mex.getNextException();
                ex.printStackTrace();
                if (!(ex instanceof MessagingException)) break;
                else mex = (MessagingException)ex;
            }
            return false;
        }
        return true;
    }


   /* // Прикрепление файла в качестве вложения. Используется JAF FileDataSource.
    public void setOutputStreamAsAttachment(Message msg, ByteArrayOutputStream os)
            throws MessagingException, IOException {

        // Создание и заполнение первой части
        MimeBodyPart p1 = new MimeBodyPart();
        p1.setText(this.msg);

        // Создание второй части
        MimeBodyPart p2 = new MimeBodyPart();

        // Добавление файла во вторую часть
        DataSource ds = new ByteArrayDataSource(os.toByteArray(), attach.type);
        p2.setDataHandler(new DataHandler(ds));
        p2.setFileName(MimeUtility.encodeText(attach.fileName, charSet, null));

        // Создание экземпляра класса Multipart. Добавление частей сообщения в него.
        Multipart mp = new MimeMultipart();
        mp.addBodyPart(p1);
        mp.addBodyPart(p2);

        // Установка экземпляра класса Multipart в качестве контента документа
        msg.setContent(mp);
    }

    // Прикрепление файла в качестве вложения. Используется JAF FileDataSource.
    public static void setFileAsAttachment(Message msg, String filename)
            throws MessagingException {

        // Создание и заполнение первой части
        MimeBodyPart p1 = new MimeBodyPart();
        p1.setText("This is part one of a test multipart e-mail." +
                "The second part is file as an attachment");

        // Создание второй части
        MimeBodyPart p2 = new MimeBodyPart();

        // Добавление файла во вторую часть
        FileDataSource fds = new FileDataSource(filename);
        p2.setDataHandler(new DataHandler(fds));
        p2.setFileName(fds.getName());

        // Создание экземпляра класса Multipart. Добавление частей сообщения в него.
        Multipart mp = new MimeMultipart();
        mp.addBodyPart(p1);
        mp.addBodyPart(p2);

        // Установка экземпляра класса Multipart в качестве контента документа
        msg.setContent(mp);
    }
    */

    /*// Сообщение с типом контента multipart/mixed. Обе части имеют тип контента text/plain.
    public void setMultipartContent(Message msg) throws MessagingException {
        // Создание и заполнение первой части
        MimeBodyPart p1 = new MimeBodyPart();
        p1.setText("This is part one of a test multipart e-mail.");

        // Создание и заполнение второй части
        MimeBodyPart p2 = new MimeBodyPart();
        // Here is how to set a charset on textual content
        p2.setText("This is the second part", "us-ascii");

        // Создание экземпляра класса Multipart. Добавление частей сообщения в него.
        Multipart mp = new MimeMultipart();
        mp.addBodyPart(p1);
        mp.addBodyPart(p2);

        // Установка объекта класса Multipart в качестве контента сообщения
        msg.setContent(mp);
    }*/

    /*// Добавление в первую часть html-контента.
    // Оптправка данных любого другого типа производится аналогичным образом.
    public void setHTMLContent(Message msg) throws MessagingException {

        String html = "<html><head><title>" +
                msg.getSubject() +
                "</title></head><body><h1>" +
                msg.getSubject() +
                "</h1><p>This is a test of sending an HTML e-mail" +
                " through Java.</body></html>";

        // HTMLDataSource является внутренним классом
        msg.setDataHandler(new DataHandler(new HTMLDataSource(html)));
    }*/

    /*
     * Внутренний класс работает аналогично JAF datasource и добавляет HTML в контент сообщения
     *//*
    class HTMLDataSource implements DataSource {
        private String html;

        public HTMLDataSource(String htmlString) {
            html = htmlString;
        }

        // Возвращаем html строку в InputStream.
        // Каждый раз возвращается новый поток
        public InputStream getInputStream() throws IOException {
            if (html == null) throw new IOException("Null HTML");
            return new ByteArrayInputStream(html.getBytes());
        }

        public OutputStream getOutputStream() throws IOException {
            throw new IOException("This DataHandler cannot write HTML");
        }

        public String getContentType() {
            return "text/html";
        }

        public String getName() {
            return "JAF text/html dataSource to send e-mail only";
        }
    }*/
}
