package com.bivc.cimsmgs.exchange.tbc.xml;

import java.io.IOException;
import java.io.OutputStream;
import javax.xml.parsers.ParserConfigurationException;

import com.bivc.cimsmgs.exchange.tbc.xml.Canonic11;
import org.apache.log4j.Logger;
import org.apache.xml.security.c14n.CanonicalizationException;
import org.apache.xml.security.c14n.InvalidCanonicalizerException;
import org.apache.xml.security.signature.XMLSignatureInput;
import org.apache.xml.security.transforms.Transform;
import org.apache.xml.security.transforms.TransformSpi;
import org.apache.xml.security.transforms.TransformationException;
import org.xml.sax.SAXException;

public class Transform11 extends TransformSpi {

  static public final String implementedTransformURI = "urn:xml-dsig:transformation:v1.1";
  static private Logger log = Logger.getLogger(Transform11.class);

  protected String engineGetURI() {
    return implementedTransformURI;
  }

  protected XMLSignatureInput enginePerformTransform(XMLSignatureInput input, OutputStream os, Transform _transformObject) throws
      IOException, CanonicalizationException, InvalidCanonicalizerException,
      TransformationException, ParserConfigurationException, SAXException {

    log.debug("Input=" + input + ", Os=" + os + ", TransformObject=" + _transformObject);
//    log.debug(Utils.debug(input.getSubNode()));

    Canonic11 c11 = new Canonic11();
    if (os != null)
      c11.setWriter(os);
    byte[] result = null;
    result = c11.engineCanonicalizeSubTree(input.getSubNode());
    XMLSignatureInput output = new XMLSignatureInput(result);
    if (os != null) {
      output.setOutputStream(os);
    }
    return output;

//    Canonicalizer20010315OmitComments c14n = new Canonicalizer20010315OmitComments();
//    if (os != null) {
//        c14n.setWriter(os);
//    }
//    byte[] result = null;
//    result = c14n.engineCanonicalize(input);
//    XMLSignatureInput output = new XMLSignatureInput(result);
//    if (os != null) {
//       output.setOutputStream(os);
//    }
//    return output;
  }

  protected XMLSignatureInput enginePerformTransform(XMLSignatureInput input, Transform _transformObject) throws
      IOException, CanonicalizationException, InvalidCanonicalizerException,
      TransformationException, ParserConfigurationException, SAXException {

    log.debug("Input=" + input + ", TransformObject=" + _transformObject);
    return enginePerformTransform(input, null, _transformObject);
  }

}
