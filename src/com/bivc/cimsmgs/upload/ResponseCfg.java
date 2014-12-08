package com.bivc.cimsmgs.upload;

import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class ResponseCfg {
    private HttpServletResponse response;
    private HttpServletRequest request;
    private final String fileFullName;

    public ResponseCfg(HttpServletResponse response, HttpServletRequest request, String fileFullName) throws UnsupportedEncodingException {
        this.response = response;
        this.request = request;
        this.fileFullName =  fileFullName;
        response.setHeader("Content-Disposition", " attachment;filename=\"" + getEncodedFileName() + "\"");
        response.setContentType("application/octet-stream");
        response.setHeader("Expires", "0");
        response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
        response.setHeader("Pragma", "public");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    public ResponseCfg(HttpServletResponse response, HttpServletRequest request, String fileFullName, String contentType) throws UnsupportedEncodingException {
        this.response = response;
        this.request = request;
        this.fileFullName =  fileFullName;
        response.setHeader("Content-Disposition", " attachment;filename=\"" + getEncodedFileName() + "\"");
        response.setContentType(contentType);
        response.setHeader("Expires", "0");
        response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
        response.setHeader("Pragma", "public");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private String getEncodedFileName() throws UnsupportedEncodingException {
        String user_agent = request.getHeader("user-agent");
        boolean isIE = user_agent.contains("MSIE");
        if (isIE) {
            return URLEncoder.encode(fileFullName, "utf-8");
        } else {
            return MimeUtility.encodeWord(fileFullName);
        }
    }



    public HttpServletResponse getResponse() {
        return response;
    }

}
