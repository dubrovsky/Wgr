<%@page contentType="text/html; charset=utf-8" %>
<%@taglib prefix="s" uri="/struts-tags" %>
<%@taglib uri="/WEB-INF/tlds/pd4ml.tld" prefix="pd4ml" %>
<pd4ml:transform screenWidth="794" pageInsets="0,0,0,0,mm">
<pd4ml:usettf from='java:' serif="Times New Roman" sansserif="Arial" monospace="Courier New"/>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ru">
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <link rel="stylesheet" type="text/css" href="../css/SmgsNovoross.css">
  <title>SMGS</title>
</head>
<body>
<%--<img src="../pic/smgsnvr(96dpi).jpg">--%>

<div class="d1">
  <s:property value="smgs.g691"/>
</div>
<div class="d3">
  <s:property value="smgs.g692"/>
</div>
<div class="d8">
  <s:property value="smgs.g2" escapeHtml="false"/>
</div>
<div class="d10_1">
  <s:property value="smgs.g694"/>
</div>
<div class="d10_2">
  <s:property value="smgs.g141"/>
</div>
<div class="d11">
  <s:property value="smgs.g1Disp4Print()" escapeHtml="false"/>
</div>
<div class="d13">
  <s:property value="smgs.g5" escapeHtml="false"/>
</div>
<div class="d14">
  <s:property value="smgs.g4Disp4Print()" escapeHtml="false"/>
</div>
<div class="d17_1">
    <%--<s:property value="smgs.g162" />
      &nbsp;&nbsp;
      <s:property value="smgs.g163" />
      &nbsp;&nbsp; --%>
  <s:property value="smgs.g162r"/>
    <%--&nbsp;&nbsp;
      <s:property value="smgs.g163r" />--%>
</div>
<div class="d19_1">
  <s:property value="smgs.g7Disp4PrintSmgs()" escapeHtml="false"/>
</div>
<div class="d20_1">
  <s:property value="smgs.g26" escapeHtml="false"/>
</div>
<div class="d21_1">
  <s:property value="smgs.g15"/>
  <s:if test="%{smgs.g15 != null && smgs.g15.length() > 0}">
    <br/>
  </s:if>
  <s:property value="smgs.g15r"/>
</div>
<div class="d22_1">
  <s:property value="smgs.g13Disp4PrintSmgs()" escapeHtml="false"/>
</div>
<div class="d23_1">
  <s:property value="smgs.g101"/>
  &nbsp;
  <s:property value="smgs.g102"/>
  <s:if test="%{(smgs.g101 != null && smgs.g101.length() > 0) || (smgs.g102 != null && smgs.g102.length() > 0)}">
    <br/>
  </s:if>
  <s:property value="smgs.g101r"/>
  &nbsp;
  <s:property value="smgs.g102r"/>
  <br/>&nbsp;&nbsp;<s:property value="smgs.g_10_3r"/>
</div>
<div class="d24">
  <s:property value="smgs.g12"/>
</div>
<div class="d25">
  <s:property value="smgs.g121"/>
</div>

<s:iterator value="smgs.cimSmgsCarLists.entrySet()" status="rowstatus">
  <s:if test="%{#rowstatus.index == 0}">
    <div class="d32">
      <s:property value="value.nvag" escapeHtml="false"/>
    </div>
    <div class="d33">
      <s:property value="value.grPod" escapeHtml="false"/>
    </div>
    <div class="d34">
      <s:property value="value.kolOs" escapeHtml="false"/>
    </div>
    <div class="d35">
      <s:property value="value.taraVag" escapeHtml="false"/>
    </div>
  </s:if>
</s:iterator>
<div class="d57">
  <table width="100%">
    <s:iterator value="smgs.cimSmgsCarLists.entrySet()" var="car">
      <s:iterator value="value.cimSmgsKonLists.entrySet()" var="kon" status="rowstatus1">
        <s:iterator value="value.cimSmgsGruzs.entrySet()" status="rowstatus">
          <tr>
            <td width="42">&nbsp;</td>
            <td width="110">
              <s:if test="%{#rowstatus1.first && #rowstatus.first}">
                <s:property value="#kon.value.utiN" escapeHtml="false"/>&nbsp;P <br/>
                <s:property value="#kon.value.sizeFoot" escapeHtml="false"/>
              </s:if>
            </td>
            <td width="82">
              <s:property value="value.upak" escapeHtml="false"/>
            </td>
            <td width="252" class="t-4">
              <s:property value="smgs.g11Disp4Print(#rowstatus.index)" escapeHtml="false"/>
                <%--<s:if test="%{value.kgvn != null && value.kgvn.length() > 0}">
                    ГНГ- <s:property value="value.kgvn" escapeHtml="false" /><br />
                </s:if>
                <s:if test="%{value.nzgrEu != null && value.nzgrEu.length() > 0}">
                    <span class="chinese"><s:property value="value.nzgrEu" escapeHtml="false" /></span><br />
                </s:if>
                <s:if test="%{value.nzgr != null && value.nzgr.length() > 0}">
                    <s:property value="value.nzgr" escapeHtml="false" /><br />
                </s:if>
                <s:if test="%{value.ekgvn != null && value.ekgvn.length() > 0}">
                    ЕТ СНГ- <s:property value="value.ekgvn" escapeHtml="false" /><br />
                </s:if>
                <s:if test="%{value.enzgr != null && value.enzgr.length() > 0}">
                    <s:property value="value.enzgr" escapeHtml="false" /><br />
                </s:if>
                <s:if test="%{value.massa != null}">
                    Масса- <s:property value="value.massa" escapeHtml="false" />
                </s:if>
                <s:if test="%{value.places != null}">
                    Места- <s:property value="value.places" escapeHtml="false" /><br />
                </s:if>--%>
            </td>
            <td width="57">
              <s:if test="%{#rowstatus.first}">
                <s:if test="%{smgs.kontKol != null && smgs.kontKol.length() > 0}">
                  <s:property value="smgs.kontKol" escapeHtml="false"/>
                  <br/>
                </s:if>
                <s:property value="smgs.g14SmgsDisp1()" escapeHtml="false"/>
              </s:if>
            </td>
            <td width="95">
              <s:if test="%{#rowstatus.first}">
                <s:if test="%{smgs.g24N != null}">
                  Н-<s:property value="smgs.g24N" escapeHtml="false"/>
                  <br/>
                </s:if>
                <s:if test="%{smgs.g24T != null}">
                  Т-<s:property value="smgs.g24T" escapeHtml="false"/>
                  <br/>
                </s:if>
                <s:if test="%{smgs.g24B != null}">
                  Б- <s:property value="smgs.g24B" escapeHtml="false"/>
                </s:if>
              </s:if>
            </td>
            <td width="86">
              <s:if test="%{#rowstatus.first}">
                <s:property value="smgs.g38" escapeHtml="false"/>
              </s:if>
            </td>
          </tr>
        </s:iterator>
      </s:iterator>
    </s:iterator>
  </table>
</div>
<div class="d57_a">
  <s:property value="smgs.g11_primDisp()" escapeHtml="false"/>
</div>
<div class="d64_1">
  <s:property value="smgs.g14SmgsDisp()" escapeHtml="false"/>
</div>
<div class="d65_1">
  <s:property value="smgs.g24BDisp4Print()" escapeHtml="false"/>
</div>
<div class="d66_1">
  <s:property value="smgs.g14"/>
</div>
<div class="d69_1">
  <s:iterator value="smgs.cimSmgsCarLists.entrySet()" status="rowstatus">
    <s:iterator value="value.cimSmgsKonLists.entrySet()" status="rowstatus1">
      <s:if test="%{#rowstatus.first && #rowstatus1.first}">
        <s:property value="value.vid" escapeHtml="false"/>
      </s:if>
    </s:iterator>
  </s:iterator>
</div>
<div class="d70_1">
  <s:iterator value="smgs.cimSmgsCarLists.entrySet()" status="rowstatus">
    <s:iterator value="value.cimSmgsKonLists.entrySet()" status="rowstatus1">
      <s:if test="%{#rowstatus.first && #rowstatus1.first}">
        <s:property value="value.kodSob" escapeHtml="false"/>
        &nbsp;&nbsp;
        <s:property value="value.utiN" escapeHtml="false"/>&nbsp;P
      </s:if>
    </s:iterator>
  </s:iterator>
</div>
<div class="d71_1">
  <s:property value="smgs.g18" escapeHtml="false"/>
  <s:if test="%{smgs.g18 != null && smgs.g18.length() > 0}">
    <br>
  </s:if>
  <s:property value="smgs.g18r" escapeHtml="false"/>
</div>
<div class="d79_1">
  X
</div>
<div class="d81">
  <s:if test="%{1 == smgs.gs_22}">X </s:if>
</div>
<div class="d82">
  <s:if test="%{2 == smgs.gs_22}">X </s:if>
</div>
<div class="d84_1">
  <s:property value="smgs.g9Disp4PrintSmgs()" escapeHtml="false"/>
</div>
<div class="d85_1">
  <s:property value="smgs.gs_24"/>
</div>

<div class="d891_2">
  <table width="100%">
    <s:iterator value="smgs.cimSmgsPlombs.entrySet()">
      <tr>
        <td width="56"><s:property value="value.kpl"/>&nbsp;</td>
        <td><s:property value="value.znak"/>&nbsp;</td>
      </tr>
    </s:iterator>
  </table>
</div>


<div class="d90_1"></div>
<div class="d91_1">
  <s:property value="smgs.gs47Disp()"/>
</div>
<div class="d92_1">
  <s:property value="smgs.gs_48"/>
</div>
</body>
</html>
</pd4ml:transform>