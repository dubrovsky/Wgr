<%@page contentType="text/html; charset=utf-8" %><%@taglib prefix="s" uri="/struts-tags" %><%@taglib uri="/WEB-INF/tlds/pd4ml.tld" prefix="pd4ml" %><pd4ml:transform screenWidth="794" pageInsets="0,0,0,0,mm">
<pd4ml:usettf from='java:' serif="Times New Roman" sansserif="Arial" monospace="Courier New"/>
<pd4ml:parameters>
    <%--<pd4ml:parameter key="pd4ml.print.dialog.popup" value="true"/>--%>
    <pd4ml:parameter key="pd4ml.absolute.address.space" value="document"/>
</pd4ml:parameters>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <link rel="stylesheet" type="text/css" href="../css/Gu29k.css">
    <title>Gu29k</title>
</head>
<body style="margin: 0">
    <img src="../../doc/ГУ-29К(РЖД)/gu29k-96dpi.jpg">
    <%--<s:if test="print.page1">
        <div style="position:relative; float:left;width:200mm;height:285mm;">--%>
            <div class="d0">
                <s:property value="smgs.guInf"/>
            </div>
            <div class="d01">
                <s:property value="smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].ownerKod"/>
            </div>
            <div class="d02">
                <s:property value="smgs.cimSmgsCarLists[0].rod"/>
            </div>
            <div class="d03">
                <s:property value="smgs.perevozchik"/>
            </div>
            <div class="d1">
                <s:property value="smgs.g694"/>
            </div>
            <div class="d2">
                <s:property value="smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].utiN"/>
            </div>
            <div class="d3">
                <s:property value="smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].vid"/>
            </div>
            <div class="d4">
                <s:property value="smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].utiType" escapeHtml="false"/>
            </div>
            <div class="d41">
                <s:property value="smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].specKon" escapeHtml="false"/>
            </div>


            <div class="d5">
                <s:property value="smgs.cimSmgsCarLists[0].nvag"/>
            </div>
            <div class="d6">
                <s:property value="smgs.cimSmgsCarLists[0].grPod"/>
            </div>
            <div class="d7">
                <s:property value="smgs.cimSmgsCarLists[0].kolOs"/>
            </div>
            <div class="d8">
                <s:property value="smgs.cimSmgsCarLists[0].taraVag"/>
            </div>
            <div class="d81">
                <s:property value="smgs.cimSmgsCarLists[0].massGross"/>
            </div>
            <div class="d82">
                <s:property value="smgs.cimSmgsCarLists[0].speed"/>
            </div>
<div class="d9">
                <s:property value="smgs.g162r" escapeHtml="false"/><br/>
                <s:property value="smgs.g163r" escapeHtml="false"/>
</div>
            <div class="d10">
                <s:property value="smgs.g692"/>
            </div>
<div class="d11">
                <s:property value="smgs.g101r" escapeHtml="false"/><br/>
                <s:property value="smgs.g102r" escapeHtml="false"/>
</div>
<div class="d12">
                <s:property value="smgs.g121"/>
</div>
            <div class="d13">
                <s:property value="smgs.g1r" escapeHtml="false"/>
            </div>
            <div class="d14">
                <s:property value="smgs.g2" escapeHtml="false"/>
</div>
<div class="d15">
                <s:property value="smgs.g4r" escapeHtml="false"/>
</div>
            <div class="d16">
                <s:property value="smgs.g5" escapeHtml="false"/>
  </div>
<div class="d17">
                <s:property value="smgs.g19r" escapeHtml="false"/>
</div>
<div class="d18">
                <s:property value="smgs.g49r" escapeHtml="false"/>
</div>
            <div class="d19">
                <s:property value="smgs.cimSmgsPlatels[0].platR"/>
            </div>
            <div class="d191">
                <s:property value="smgs.cimSmgsPlatels[0].kplat"/>
            </div>
            <s:if test="smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].pogrKon == 1">
                <div class="d192">
                    -------------
                </div>
            </s:if>
            <s:if test="smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].pogrKon == 2">
                <div class="d193">
                    ----------------
                </div>
            </s:if>
<div class="d194">
                <s:if test="smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].cimSmgsGruzs[0] != null">
                    <s:property value="smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].cimSmgsGruzs[0].kgvn4GuDisp()"
                                escapeHtml="false"/>
                </s:if>
  </div>
            <div class="d20">
                <table width="100%">
                    <s:iterator value="smgs.cimSmgsCarLists.entrySet()" var="car">
                        <s:iterator value="value.cimSmgsKonLists.entrySet()" var="kon" status="rowstatus1">
                            <s:iterator value="value.cimSmgsGruzs.entrySet()" status="rowstatus">
                                <tr>
                                    <td width="44">
                                        <%--<s:if test="%{#rowstatus.first}">
                                            <s:property value="smgs.g14SmgsDisp1()" escapeHtml="false"/>
                                        </s:if>--%>
                                        <s:property value="value.places" escapeHtml="false"/>
                                    </td>
                                    <td width="57">
                                        <s:property value="value.upak" escapeHtml="false"/>
                                    </td>
                                    <td width="475">
                                        <s:property value="value.nzgr" escapeHtml="false"/>
                                        <s:if test="%{!#rowstatus.first && value.kgvn != null}">
                                            ГНГ <s:property value="value.kgvn" escapeHtml="false"/>
                                        </s:if>

                                        <s:property value="value.enzgr" escapeHtml="false"/>
                                        <s:if test="value.kgvn != null">
                                            ЕТ СНГ
                                        </s:if>
                                        <s:property value="value.ekgvn" escapeHtml="false"/>
                                    </td>
                                    <td width="98">&nbsp;</td>
                                </tr>
                            </s:iterator>
                        </s:iterator>
                    </s:iterator>
                </table>
            </div>
            <div class="d20a">
                <s:property value="smgs.g11_primDisp()" escapeHtml="false"/>
</div>
            <div class="d21">
                <s:property value="smgs.g24N"/>
</div>
            <div class="d22">
                <s:property value="smgs.g24T"/>
            </div>
            <div class="d23">
                <s:property value="smgs.g24B"/>
            </div>
            <div class="d231">
                <s:property value="smgs.tarifShema"/>
            </div>
            <div class="d232">
                <s:property value="smgs.tarifVOtpr"/>
            </div>
            <div class="d233">
                <s:property value="smgs.platezhKm"/>
            </div>
            <div class="d234">
                <s:property value="smgs.platezhRub"/>
            </div>
            <div class="d235">
                <s:property value="smgs.platezhKop"/>
            </div>
            <div class="d236">
                <s:property value="smgs.provozPlata"/>
            </div>
            <div class="d237">
                <s:property value="smgs.sborCennost1"/>
            </div>
             <div class="d237_1">
                <s:property value="smgs.sborCennost11"/>
            </div>
            <div class="d238">
                <s:property value="smgs.sborCennost2"/>
            </div>
            <div class="d238_1">
                <s:property value="smgs.sborCennost21"/>
            </div>
            <div class="d238_2">
                <s:property value="smgs.sborCennost22"/>
            </div>
            <div class="d239">
                <s:property value="smgs.otprItogo"/>
            </div>
            <div class="d24">
                <s:property value="smgs.g14SmgsDisp()" escapeHtml="false"/>
            </div>
            <div class="d25">
                <s:property value="smgs.g24NPropis()" escapeHtml="false"/>
            </div>
            <div class="d251">
                <s:property value="smgs.g27" escapeHtml="false"/>
            </div>
            <div class="d252">
                <s:property value="smgs.zpuInfo" escapeHtml="false"/>
            </div>
            <div class="d253">
                <s:property value="smgs.trueInfo" escapeHtml="false"/>
            </div>
            <div class="d254">
                <s:property value="smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].zajavNo" escapeHtml="false"/>
            </div>
            <div class="d255">
                <s:property value="smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].vvoz" escapeHtml="false"/>
            </div>
            <div class="d256">
                <s:property value="smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].pogruzka" escapeHtml="false"/>
            </div>
<div class="d257">
                <s:property value="smgs.vizaNo" escapeHtml="false"/>
  </div>
<div class="d258">
                <s:property value="smgs.perevozSign" escapeHtml="false"/>
  </div>
<div class="d259">
                <s:property value="smgs.perevozDate" escapeHtml="false"/>
</div>

            <div class="d26">
            <s:property value="smgs.plat" escapeHtml="false"/>    
                <%--<s:property value="smgs.cimSmgsPlatels[0].platR" escapeHtml="false"/>
                <s:property value="smgs.cimSmgsPlatels[0].kplat"/>--%>
                    
            </div>
            <div class="d26_1">
            <s:property value="smgs.plat1" escapeHtml="false"/>    
               
                    
            </div>
            <%--<div class="d27">
                <table width="100%">
                    <s:iterator value="smgs.cimSmgsPlombs.entrySet()">
                        <tr>
                            <td width="92"><s:property value="value.type"/></td>
                            <td width="79"><s:property value="value.znak"/></td>
                        </tr>
                    </s:iterator>
            </table>
</div>--%>

<div class="d27">
<s:iterator value="smgs.cimSmgsPlombs.entrySet()" status="inx">
<s:if test="%{#inx.index == 0}">
                <table width="100%">
                    
                        <tr>
                            <td width="86"><s:property value="value.type"/></td>
                            <td width="85"><s:property value="value.znak"/></td>
                        </tr>
                    
                </table>
      </s:if>
    </s:iterator>
</div>


<div class="d27_1">
<s:iterator value="smgs.cimSmgsPlombs.entrySet()"  status="inx">
<s:if test="%{#inx.index == 1}">
                <table width="100%">
                    
                        <tr>
                            <td width="86"><s:property value="value.type"/></td>
                            <td width="85"><s:property value="value.znak"/></td>
                        </tr>
                    
</table>
</s:if>
</s:iterator>
</div>

<div class="d27_2">
<s:iterator value="smgs.cimSmgsPlombs.entrySet()"  status="inx">
<s:if test="%{#inx.index == 2}">
                <table width="100%">
                    
                        <tr>
                            <td width="86"><s:property value="value.type"/></td>
                            <td width="85"><s:property value="value.znak"/></td>
                        </tr>
                    
</table>
</s:if>
</s:iterator>
</div>

<div class="d27_3">
<s:iterator value="smgs.cimSmgsPlombs.entrySet()"  status="inx">
<s:if test="%{#inx.index == 3}">
                <table width="100%">
                    
                        <tr>
                            <td width="86"><s:property value="value.type"/></td>
                            <td width="85"><s:property value="value.znak"/></td>
                        </tr>
                    
</table>
</s:if>
</s:iterator>
</div>



        <%--</div>
    </s:if>
    <s:if test="print.page1Back">
        <s:if test="print.page1">
            <pd4ml:page.break/>
        </s:if>
        <div style="position:relative; float:left; clear:left;width:200mm;height:285mm;">
            <div class="d28">
                <s:property value="smgs.tehUslG12"/>
            </div>
  <div class="d29">
                <s:property value="smgs.grOtpFio"/>
            </div>
            <div class="d30">
                <s:property value="smgs.g9Disp4PrintGu29k()" escapeHtml="false" />
            </div>
        </div>
    </s:if>--%>
</body>
</html>
</pd4ml:transform>
