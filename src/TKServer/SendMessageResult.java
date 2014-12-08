/**
 * SendMessageResult.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package TKServer;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class SendMessageResult  implements java.io.Serializable {
    private int errCode;

    private java.lang.String errDescription;

    public SendMessageResult() {
    }

    public SendMessageResult(
           int errCode,
           java.lang.String errDescription) {
           this.errCode = errCode;
           this.errDescription = errDescription;
    }


    /**
     * Gets the errCode value for this SendMessageResult.
     *
     * @return errCode
     */
    public int getErrCode() {
        return errCode;
    }


    /**
     * Sets the errCode value for this SendMessageResult.
     *
     * @param errCode
     */
    public void setErrCode(int errCode) {
        this.errCode = errCode;
    }


    /**
     * Gets the errDescription value for this SendMessageResult.
     *
     * @return errDescription
     */
    public java.lang.String getErrDescription() {
        return errDescription;
    }


    /**
     * Sets the errDescription value for this SendMessageResult.
     *
     * @param errDescription
     */
    public void setErrDescription(java.lang.String errDescription) {
        this.errDescription = errDescription;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof SendMessageResult)) return false;
        SendMessageResult other = (SendMessageResult) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true &&
            this.errCode == other.getErrCode() &&
            ((this.errDescription==null && other.getErrDescription()==null) ||
             (this.errDescription!=null &&
              this.errDescription.equals(other.getErrDescription())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        _hashCode += getErrCode();
        if (getErrDescription() != null) {
            _hashCode += getErrDescription().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(SendMessageResult.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("urn:TKServer", "SendMessageResult"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("errCode");
        elemField.setXmlName(new javax.xml.namespace.QName("", "errCode"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("errDescription");
        elemField.setXmlName(new javax.xml.namespace.QName("", "errDescription"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType,
           java.lang.Class _javaType,
           javax.xml.namespace.QName _xmlType) {
        return
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType,
           java.lang.Class _javaType,
           javax.xml.namespace.QName _xmlType) {
        return
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

  public String toString() {
    return new ToStringBuilder(this)
        .append("errCode", errCode)
        .append("errDescription", errDescription)
        .toString();
  }

}
