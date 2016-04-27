package com.bivc.cimsmgs.exchange.tbc.soap;

import org.apache.axiom.om.OMAbstractFactory;
import org.apache.axiom.om.OMElement;
import org.apache.axiom.om.OMFactory;
import org.apache.axiom.om.OMNamespace;
import org.apache.axiom.om.impl.builder.StAXOMBuilder;
import org.apache.axis2.AxisFault;
import org.apache.axis2.Constants;
import org.apache.axis2.addressing.AddressingConstants;
import org.apache.axis2.client.Options;
import org.apache.axis2.client.ServiceClient;
import org.apache.axis2.context.ConfigurationContext;
import org.apache.axis2.context.ConfigurationContextFactory;
import org.apache.axis2.description.Parameter;
import org.apache.axis2.transport.http.HTTPConstants;
import org.apache.neethi.Policy;
import org.apache.neethi.PolicyEngine;
import org.apache.rampart.RampartMessageData;

import javax.xml.stream.XMLStreamException;
import java.io.File;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.rmi.RemoteException;

public class TBCAcsDocsServiceClient implements AutoCloseable {

  private AscAscDocsServiceStub stub;
  private Options options;
  private ServiceClient client;
  private boolean executed = false;

  public TBCAcsDocsServiceClient(String addr, String user, String passwd) throws AxisFault, XMLStreamException, MalformedURLException {
    try {
      URL repo = TBCAcsDocsServiceClient.class.getClassLoader().getResource("/repository");
      if (repo != null) {
        init(addr, user, passwd, new File(repo.toURI()).getAbsolutePath());
      }
      else {
        throw new AxisFault("Wrong path to repository");
      }
    }
    catch (URISyntaxException ignore) {
    }
  }

  public TBCAcsDocsServiceClient(String addr, String user, String passwd, String repoPath) throws AxisFault, XMLStreamException, MalformedURLException {
    init(addr, user, passwd, repoPath);

  }

  private void init(String addr, String user, String passwd, String repoPath) throws AxisFault, XMLStreamException, MalformedURLException {
    ConfigurationContext myConfigContext = ConfigurationContextFactory.createConfigurationContextFromFileSystem(repoPath);

    stub = new AscAscDocsServiceStub(myConfigContext, addr); //the default implementation should point to the right endpoint
    client = stub._getServiceClient();
    client.getAxisService().applyPolicy(loadPolicy("policy.xml"));
    client.getAxisConfiguration().getTransportOut(new URL(addr).getProtocol()).addParameter(new Parameter(HTTPConstants.OMIT_SOAP_12_ACTION, "true"));

    options = client.getOptions();
    options.setUserName(user);
    options.setPassword(passwd);
    options.setProperty(AddressingConstants.WS_ADDRESSING_VERSION, AddressingConstants.Final.WSA_NAMESPACE);

    client.engageModule("addressing");
    client.engageModule("rampart");
  }

  public String openProc(String envelop) throws RemoteException {
    executed = true;
    AscAscDocsServiceStub.OpenProc openProc = new AscAscDocsServiceStub.OpenProc();
    openProc.setEnvelope(envelop);
    AscAscDocsServiceStub.OpenProcResponse res = stub.openProc(openProc);
    return res.getOpenProcResult();
  }

  public String[] put(String[] envelopes) throws RemoteException {
    executed = true;
    AscAscDocsServiceStub.Put put = new AscAscDocsServiceStub.Put();
    AscAscDocsServiceStub.ArrayOfstring inArray = new AscAscDocsServiceStub.ArrayOfstring();
    inArray.setString(envelopes);
    put.setEnvelopes(inArray);
    AscAscDocsServiceStub.PutResponse res = stub.put(put);
    return res.getPutResult().getString();
  }

  public String get(String envelop) throws RemoteException {
    executed = true;
    AscAscDocsServiceStub.Get get = new AscAscDocsServiceStub.Get();
    get.setEnvelope(envelop);
    AscAscDocsServiceStub.GetResponse res = stub.get(get);
    return res.getGetResult();
  }

  @Override
  public void close() throws Exception {
    if (executed) {
      options.setProperty(RampartMessageData.CANCEL_REQUEST, Constants.VALUE_TRUE);
      client.sendReceive(getDummy());
    }
  }

  private Policy loadPolicy(String name) throws XMLStreamException {
    ClassLoader loader = TBCAcsDocsServiceClient.class.getClassLoader();
    InputStream resource = loader.getResourceAsStream(name);
    StAXOMBuilder builder = new StAXOMBuilder(resource);
    return PolicyEngine.getPolicy(builder.getDocumentElement());
  }

  private OMElement getDummy() {
    OMFactory factory = OMAbstractFactory.getOMFactory();
    OMNamespace ns = factory.createOMNamespace("http://tempuri.org/","ns1");
    OMElement elem = factory.createOMElement("echo", ns);
    OMElement childElem = factory.createOMElement("param0", null);
    childElem.setText("");
    elem.addChild(childElem);
    return elem;
  }

}
