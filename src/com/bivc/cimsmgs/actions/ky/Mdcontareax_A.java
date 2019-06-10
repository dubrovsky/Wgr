package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import org.apache.log4j.Logger;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;

public class Mdcontareax_A extends CimSmgsSupport_A
{
    private static final Logger log = Logger.getLogger(Mdcontareax_A.class);

    public String execute() throws Exception
    {
        String template = "/mdcontareax.xml";

        ByteArrayOutputStream oos = new ByteArrayOutputStream();
        InputStream ffis = null;
        if (Mdcontareax_A.class.getResource(template) != null) {
//            ffis = new FileInputStream(Mdcontareax_A.class.getResource(template).getFile());
          ffis = Mdcontareax_A.class.getResourceAsStream(template);
          byte[] buf = new byte[4096];
          int i = ffis.read(buf);
            while (i  > 0) {
                oos.write(buf, 0, i);
                i = ffis.read(buf);
            }
            ffis.close();
            setJSONData(oos.toString("utf-16"));
        }
        return SUCCESS;
    }

}
