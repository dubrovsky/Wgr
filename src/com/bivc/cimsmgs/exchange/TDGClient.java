package com.bivc.cimsmgs.exchange;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.StatusLine;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.config.AuthSchemes;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContexts;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.net.ssl.SSLContext;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TDGClient {

  private String url;
  private String pid;

  CloseableHttpClient httpclient;

  static private Logger log = LoggerFactory.getLogger(TDGClient.class);
  static final private String EMPTY_RESPONSE = "Empty response";

  public TDGClient(String url, String user, String pass) {
    this.url = url;

    SSLContext sslcontext = SSLContexts.createSystemDefault();

    SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslcontext, SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);

    CredentialsProvider credsProvider = new BasicCredentialsProvider();
    credsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(user, pass));

//    HttpHost proxy = new HttpHost("10.50.100.200", 3128, "http");

    RequestConfig config = RequestConfig.custom()
//            .setProxy(proxy)
            .setSocketTimeout(60000)
            .setConnectTimeout(60000)
            .setConnectionRequestTimeout(60000)
            .setTargetPreferredAuthSchemes(Arrays.asList(AuthSchemes.BASIC))
            .build();

    httpclient = HttpClients.custom()
            .setDefaultCredentialsProvider(credsProvider)
            .setDefaultRequestConfig(config)
            .setSSLSocketFactory(sslsf)
            .build();
  }

  public String postPackage(String oldPid, String dst) throws Exception {
    log.debug("OldPID = " + oldPid + ", dst = " + dst);
    pid = null;

    HttpPost request = new HttpPost(url + "/mp/packages");

    List<NameValuePair> nvps = new ArrayList<NameValuePair>();
    nvps.add(new BasicNameValuePair("dst", dst));
    if (StringUtils.isNotBlank(oldPid))
      nvps.add(new BasicNameValuePair("pname", oldPid));
    request.setEntity(new UrlEncodedFormEntity(nvps));

    CloseableHttpResponse response = httpclient.execute(request);
    try {
      StatusLine status = response.getStatusLine();
      int code = status.getStatusCode();
      if (code == 200) {
        HttpEntity entity = response.getEntity();
        if (entity != null) {
          pid = EntityUtils.toString(entity).trim();
          log.debug("PID = " + pid);
        }
        else {
          throw new Exception(EMPTY_RESPONSE);
        }
        EntityUtils.consume(entity);
      }
      else {
        throw new Exception(status.toString());
      }
    }
    finally {
      response.close();
    }

    return pid;
  }

  public void postDocument(String type, String text) throws Exception {
    String did;

    log.debug("pid = " + pid + ", type = " + type);
    HttpPost request = new HttpPost(url + "/mp/packages/" + pid + "/documents/");

    List<NameValuePair> nvps = new ArrayList<NameValuePair>();
    nvps.add(new BasicNameValuePair("type", type));
    request.setEntity(new UrlEncodedFormEntity(nvps));

    CloseableHttpResponse response = httpclient.execute(request);
    try {
      StatusLine status = response.getStatusLine();
      int code = status.getStatusCode();
      if (code == 200) {
        HttpEntity entity = response.getEntity();
        if (entity != null) {
          did = EntityUtils.toString(entity).trim();
          log.debug("DID = " + did);
        }
        else {
          throw new Exception(EMPTY_RESPONSE);
        }
        EntityUtils.consume(entity);
      }
      else {
        throw new Exception(status.toString());
      }

    }
    finally {
      response.close();
    }

    request = new HttpPost(url + "/mp/packages/" + pid + "/documents/" + did);

    StringEntity body = new StringEntity(text, ContentType.create("text/xml", TDGConvertor.ENCODING));
    request.setEntity(body);

    response = httpclient.execute(request);
    try {
      StatusLine status = response.getStatusLine();
      int code = status.getStatusCode();
      if (code == 200) {
        log.debug("Sended");
      }
      else {
        throw new Exception(status.toString());
      }

    }
    finally {
      response.close();
    }
  }

  public void postCommit() throws Exception {
    log.debug("PID = " + pid);
    HttpPost request = new HttpPost(url + "/mp/packages/" + pid + "?action=commit");

    CloseableHttpResponse response = httpclient.execute(request);
    try {
      StatusLine status = response.getStatusLine();
      int code = status.getStatusCode();
      if (code >= 200 && code < 300) {
        log.debug("Commited");
      }
      else {
        throw new Exception(status.toString());
      }
    }
    finally {
      response.close();
    }
  }

  public String getPackageList() throws Exception {
    String res = null;
    HttpGet request = new HttpGet(url + "/mp/packages/");

    CloseableHttpResponse response = httpclient.execute(request);
    try {
      StatusLine status = response.getStatusLine();
      int code = status.getStatusCode();
      if (code == 200) {
        HttpEntity entity = response.getEntity();
        if (entity != null) {
          res = EntityUtils.toString(entity, TDGConvertor.ENCODING);
          if (StringUtils.isBlank(res))
            throw new Exception(EMPTY_RESPONSE);
        }
        else {
          throw new Exception(EMPTY_RESPONSE);
        }
        EntityUtils.consume(entity);
      }
      else {
        throw new Exception(status.toString());
      }
    }
    finally {
      response.close();
    }
    return res;
  }

  public String getPIResult(String pid) throws Exception {
    String res = null;
    HttpGet request = new HttpGet(url + "/mp/packages/" + pid + "/documents/DesNotif_PIResult.cfg.xml");

    CloseableHttpResponse response = httpclient.execute(request);
    try {
      StatusLine status = response.getStatusLine();
      int code = status.getStatusCode();
      if (code == 404) {
        return res;
      }
      if (code == 200) {
        HttpEntity entity = response.getEntity();
        if (entity != null) {
          res = EntityUtils.toString(entity, TDGConvertor.ENCODING);
          if (StringUtils.isBlank(res))
            throw new Exception(EMPTY_RESPONSE);
        }
        else {
          throw new Exception(EMPTY_RESPONSE);
        }
        EntityUtils.consume(entity);
      }
      else {
        throw new Exception(status.toString());
      }
    }
    finally {
      response.close();
    }
    return res;
  }

}
