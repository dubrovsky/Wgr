package com.bivc.cimsmgs.commons;

import com.isc.boardtalk.BoardTalkConfig;
import com.isc.boardtalk.thread.mailCheck;
import com.isc.utils.mail.mailTool;
import com.itextpdf.text.FontFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class InitResources implements ServletContextListener {
    final static private Logger log = LoggerFactory.getLogger(ServletContextListener.class);
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        ServletContext src = servletContextEvent.getServletContext();
        int fonts = FontFactory.registerDirectory(src.getRealPath("fonts"));
        log.info("Loaded " + fonts + " fonts");

        try {
            BoardTalkConfig.mailFrom = src.getInitParameter("boardtalk_mailFrom");
            BoardTalkConfig.mlt = new mailTool(src.getInitParameter("boardtalk_mailProtocol"), src.getInitParameter("boardtalk_mailHost"), src.getInitParameter("boardtalk_mailAccount"), src.getInitParameter("boardtalk_mailPassword"), BoardTalkConfig.mailFrom);
            log.info("BoardTalk mailHost: " + src.getInitParameter("boardtalk_mailHost") + ", mailAccount: " + src.getInitParameter("boardtalk_mailAccount") + ", mailFrom: " + BoardTalkConfig.mailFrom );

            String s;

            s = src.getInitParameter("boardtalk_periodInMinute");
            if(s != null && s.length() > 0) {
                BoardTalkConfig.periodInMinute = Integer.parseInt(s);
            }

            s = src.getInitParameter("boardtalk_runMailCheck");
            if(s != null && s.length() > 0 && s.equalsIgnoreCase("true")) {
                BoardTalkConfig.mCheck = new mailCheck();
            }
        } catch (Exception ex) {
            log.error("ERROR INIT", ex);
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        //To change body of implemented methods use File | Settings | File Templates.
        if(BoardTalkConfig.mCheck != null) try {
            BoardTalkConfig.mCheck.stop();
        } catch (Exception e) {
            log.error("destroy", e);
        }
    }
}
