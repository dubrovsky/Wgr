package com.bivc.cimsmgs.commons;

import com.itextpdf.text.FontFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class InitResources implements ServletContextListener {
    final static private Logger log = LoggerFactory.getLogger(ServletContextListener.class);
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        int fonts = FontFactory.registerDirectory(servletContextEvent.getServletContext().getRealPath("fonts"));
        log.info("Loaded " + fonts + " fonts");
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
