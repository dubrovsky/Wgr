package com.bivc.cimsmgs.commons;

import org.apache.commons.configuration.HierarchicalINIConfiguration;
import org.apache.commons.configuration.SubnodeConfiguration;
import org.apache.commons.configuration.reloading.FileChangedReloadingStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URL;
import java.util.Iterator;
import java.util.Properties;
import java.util.TreeMap;

public class ProjProperties {

    private static final Logger log = LoggerFactory.getLogger(ProjProperties.class);

    static private HierarchicalINIConfiguration conf;

    static {
        try {
//          URL file = ProjProperties.class.getResource("/").toURI().resolve("be.properties").toURL();
          URL file = ProjProperties.class.getResource("/wgr.properties");
          conf = new HierarchicalINIConfiguration(file);
          FileChangedReloadingStrategy rs = new FileChangedReloadingStrategy();
          rs.setRefreshDelay(30000);
          conf.setReloadingStrategy(rs);
        }
        catch (Exception e) {
          log.error(e.getMessage(), e);
        }
    }

    public static Properties getProperties(String section)  {
        Properties prop = new Properties();
        try {
            SubnodeConfiguration sbn = conf.getSection(section);
            Iterator<String> it = sbn.getKeys();
            if (!it.hasNext()) return null;
            while (it.hasNext()) {
                String key = it.next();
                prop.setProperty(key, sbn.getString(key));
            }
            log.trace("Properties for section " + section + " - " + prop);
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
        }
        return prop;
    }

    public static TreeMap<String, String> getMap(String section)  {
        TreeMap<String, String> prop = new TreeMap<>();
        try {
            SubnodeConfiguration sbn = conf.getSection(section);
            Iterator<String> it = sbn.getKeys();
            if (!it.hasNext()) return null;
            while (it.hasNext()) {
                String key = it.next();
                prop.put(key, sbn.getString(key));
            }
            log.trace("Properties for section " + section + " - " + prop);
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
        }
        return prop;
    }

    public static String getProperty(String key)  {
        String res = null;
        try {
            res = (String)conf.getProperty(key);
            log.trace(key + " - " + res);
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
        }
        return res;
    }

}
