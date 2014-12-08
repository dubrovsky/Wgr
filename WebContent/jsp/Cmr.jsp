<%@page contentType="text/html; charset=utf-8" %><%@taglib prefix="s" uri="/struts-tags" %><%@taglib uri="/WEB-INF/tlds/pd4ml.tld" prefix="pd4ml" %><pd4ml:transform screenWidth="765" pageFormat="574x818" pageOrientation="portrait" pageInsets="0,0,0,0,points">
<pd4ml:usettf from='java:' serif="Times New Roman" sansserif="Arial" monospace="Courier New"/>
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html lang="ru">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <link rel="stylesheet" type="text/css" href="../css/Cmr.css">
        <title>Cmr</title>
    </head>
    <body>
    <%--<img src="../../doc/cmr/cmr2-96dpi.jpg">--%>

    <div class="d1">
        <s:property value="smgs.g1Disp4PrintCmr()" escapeHtml="false"/>
    </div>
    <div class="d2">
        <s:property value="smgs.g4Disp4PrintCmr()" escapeHtml="false"/>
    </div>
    <div class="d10">
        <s:property value="smgs.g101" escapeHtml="false"/>
    </div>
    <div class="d11">
        <s:property value="smgs.g102" escapeHtml="false"/>
    </div>
    
    <div class="d3">
        <s:property value="smgs.g162" escapeHtml="false"/>
    </div>
    <div class="d12">
        <s:property value="smgs.g163" escapeHtml="false"/>
    </div>
    <div class="d4">
        <s:property value="smgs.g5Disp4PrintCmr()" escapeHtml="false"/>
    </div>
    <div class="d5">
        <s:property value="smgs.g13PrintCmr()" escapeHtml="false"/>
    </div>
    <%--<div class="d6">
        <s:property value="smgs.g15r" escapeHtml="false"/>
    </div>--%>
    <div class="d7">
        <table width="100%">
            <s:iterator value="smgs.cimSmgsCarLists.entrySet()" var="car">
                <s:iterator value="value.cimSmgsKonLists.entrySet()" var="kon" status="rowstatus1">
                    <s:iterator value="value.cimSmgsGruzs.entrySet()" status="rowstatus">
                        <tr>
                            <td width="405">
                           	<s:property value="#kon.value.gruzyPrintCmr()" escapeHtml="false"/>&nbsp;
                            </td>
                            <td width="82">
                                <s:property value="value.kgvn" escapeHtml="false"/>&nbsp;
                            </td>
                            <td width="72">
                                <s:property value="value.g11CmrDisp()" escapeHtml="false"/>&nbsp;
                            </td>
                        </tr>
                    </s:iterator>
                </s:iterator>
            </s:iterator>
            <tr>
           	<td>
            <s:if test="smgs.g11_prim != null">
                	<s:property value="smgs.g11_prim" escapeHtml="false"/>
                    </s:if>
            </td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
    <%--<div class="d8">
        <s:property value="smgs.g6CmrDisp()" escapeHtml="false"/>
    </div>
    <div class="d9">
        <s:property value="smgs.g7CmrDisp()" escapeHtml="false"/>
    </div>--%>
    <div class="d13">
        <s:property value="smgs.g28" escapeHtml="false"/>
    </div>
    <div class="d14">
        <s:property value="smgs.g281" escapeHtml="false"/>
    </div>
    <div class="d15">
        <s:property value="smgs.g4prim" escapeHtml="false"/>
    </div>

    </body>
    </html>
</pd4ml:transform>
