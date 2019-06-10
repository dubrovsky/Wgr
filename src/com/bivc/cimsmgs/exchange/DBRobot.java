package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.UsrGroupsDir;
import org.apache.commons.io.FileUtils;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.util.Arrays;
import java.util.Comparator;

public class DBRobot {

    private static final org.slf4j.Logger log = LoggerFactory.getLogger(DocLoader.class);

    static public void main(String[] args) {
        try {
            new DBRobot().work(args);
        }
        catch (Exception ex) {
            log.error(ex.getMessage());
        }
    }

    private void work(String[] args) {
        if (args.length != 5) {
            System.out.println("Usage: DBRobot <server.cfg.xml> <user> <group> <route> <path>");
            System.exit(1);
        }

        File[] files;
        File f = new File(args[4]);
        if (f.isFile()) { // если передали файл, то его и запихнем в массив
            files = new File[1];
            files[0] = f;
        }
        else { // иначе получим список всех файлов деректории и запихнем его в массив
            files = f.listFiles(new FileFilter() {
                public boolean accept(File path) {
                    return path.isFile();
                }
            });
        }

        if (files != null && files.length > 0) {
            if (files.length > 1) {
                Arrays.sort(files, new Comparator<File>() {
                    public int compare(File file1, File file2) {
                        String name1 = file1.getName();
                        String name2 = file2.getName();
                        //noinspection ConstantConditions
                        if (name1 == null || name2 == null) {
                            throw new NullPointerException("The filename must not be null");
                        }
                        return name1.compareTo(name2);
                    }
                });
            }

            HibernateUtil.beginTransaction();
            ExchangeServer server = new ExchangeServer();
            Route r = new Route(Long.valueOf(args[3]));
            UsrGroupsDir ugr = new UsrGroupsDir(args[2]);
            for (File item : files) {
                try {
                    String msg = FileUtils.readFileToString(item, "windows-1250");
                    server.receiveIftminText(msg, args[1], args[2], r, ugr);
                    boolean res = item.delete();
                    if (!res) {
                        log.warn("File " + item.getName() + " not deleted");
                    }
                }
                catch (IOException e) {
                    log.error(e.getMessage(), e);
                }
            }
            HibernateUtil.commitTransaction();
        }
    }
}
