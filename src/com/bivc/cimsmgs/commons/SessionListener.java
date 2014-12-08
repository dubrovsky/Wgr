package com.bivc.cimsmgs.commons;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.io.File;





public class SessionListener implements HttpSessionListener {



	    public void sessionCreated(HttpSessionEvent event) {
	        synchronized (this) {
	        }
                setSessionId(event.getSession().getId());
                pdfPath = event.getSession().getServletContext().getRealPath("/pdf");
                fontsPath = event.getSession().getServletContext().getRealPath("/fonts");
	        System.out.println("Session Created: " + event.getSession().getId());
                File dir = new File(event.getSession().getServletContext().getRealPath("/pdf")+ File.separator+getSessionId());
                dir.mkdir();

	    }

	    public void sessionDestroyed(HttpSessionEvent event) {
	        synchronized (this) {
	        }

                System.out.println("Session Closed: " + event.getSession().getId());
                File dir = new File(event.getSession().getServletContext().getRealPath("/pdf")+ File.separator+getSessionId());
                String[] children = dir.list();
                if(children!=null){
                  for(int i = 0; i < children.length; i++)
                  {
                    System.out.println("Deleted: " + children[i]);
                    (new File(event.getSession().getServletContext().getRealPath("/pdf") + File.separator + getSessionId() + File.separator +
                              children[i])).delete();
                  }
                }
                dir.delete();

	    }



  private static String sessionId="";
  private static String pdfPath="";
  private static String fontsPath="";

  public static String getSessionId()
  {
    return sessionId;
  }

  public static String getFontsPath()
  {
    return fontsPath;
  }

  public static String getPdfPath()
  {
    return pdfPath;
  }

  public static void setSessionId(String ses)
  {
   sessionId = ses;
  }

  public static void setFontsPath(String fPath)
  {
    fontsPath = fPath;
  }

  public static void setPdfPath(String pdfP)
  {
    pdfPath = pdfP;
  }

}
