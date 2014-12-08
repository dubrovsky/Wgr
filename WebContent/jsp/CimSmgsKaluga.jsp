<%@page contentType="text/html; charset=utf-8"%><%@taglib prefix="s" uri="/struts-tags"%><%@taglib uri="/WEB-INF/tlds/pd4ml.tld" prefix="pd4ml"%><pd4ml:transform screenWidth="795" pageInsets="0,0,0,0,mm">
<pd4ml:usettf from='java:' serif="Times New Roman" sansserif="Arial" monospace="Courier New" />
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html lang="ru">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<link rel="stylesheet" type="text/css" href="../css/CimSmgsKaluga.css">
	<title>Оригинал накладной – Frachtbrieforiginal</title>
</head>

<body class="title5">
	<%--<img src="../../doc/cimsmgs/cimcmgs96dpi.jpg"/>--%>
	<div class="d1">
		<s:property value="smgs.g1Disp4Print()" escapeHtml="false"/>
	</div>
    <div class="d2">
   	  <s:property value="smgs.g2"/>
    </div>
    <div class="d3">
    	<s:property value="smgs.g3"/>
    </div>
    <div class="d4">
    	<s:property value="smgs.g12_1"/>
	</div>
    <div class="d5">
    	<s:property value="smgs.g13_1"/>
	</div>
    <div class="d6">
    	<s:property	value="smgs.g101"/>
        <br>
        <s:property value="smgs.g101r"/>
    </div>
    <div class="d7">
    	<s:property value="smgs.g5"/>
	</div>
    <div class="d8">
    	<s:property value="smgs.g6"/>
	</div>
    <div class="d9">
    	<s:property value="smgs.g42_1"/>
	</div>
    <div class="d10">
    	<s:property value="smgs.g43_1"/>
	</div>
    <div class="d11">
    	<s:property	value="smgs.g11"/>
    </div>
	<div class="d12">
    	<s:property	value="smgs.g12"/>
    </div>
	<div class="d13">
    	<s:property	value="smgs.g121"/>
    </div>
  	<div class="d14">
    	<s:property value="smgs.g4Disp4Print()" escapeHtml="false" />
	</div>
  	<div class="d15">
    	<s:property value="smgs.g102"/>
        <br>
        <s:property value="smgs.g102r" />
    </div>
    <div class="d16">
    	<s:property	value="smgs.g141" />
    </div>
    <div class="d17">
    	<s:property value="smgs.g142" />
    </div>
    <div class="d18">
    	<s:property value="smgs.g13Disp4Print()" escapeHtml="false" />
    </div>
    <div class="d19">
    	<s:property value="smgs.g15"/>
        <br/> 
        <s:property value="smgs.g15r" />
    </div>
    <div class="d20">
    	<s:property value="smgs.g7Disp4Print()"	escapeHtml="false" />
    </div>
    <div class="d21">
    	<s:property value="smgs.g9Disp4Print()" escapeHtml="false" />
    </div>
    <div class="d22">
    	<s:property value="smgs.g162"/>
        <br/> 
        <s:property value="smgs.g162r"/>		
    </div>
    <div class="d23">
   	  	<s:property value="smgs.g163"/> 
        <br/> 
        <s:property value="smgs.g163r"/> 
    </div>
    <div class="d24">
    	<s:property value="smgs.g171"/>
        &nbsp;
        <s:property value="smgs.g17"/>		
    </div>
    <div class="d25">
    	<s:property value="smgs.g8"/>
    </div>
    <div class="d26">
    	<s:property value="smgs.g161"/>
    </div>
    <div class="d27">
    	<s:property value="smgs.g18"/> 
        <br/> 
        <s:property value="smgs.g18r"/>
    </div>
    <div class="d28">
    	<s:property value="smgs.g181"/>
    </div>
    <div class="d29">
		<s:property value="smgs.g18B1"/>
        <br/>
        <s:property value="smgs.g18B1a"/>
        <br/>
        <s:property value="smgs.g18B1b"/>
        <br/>
        <s:property value="smgs.g18B1c"/>
        <br/>
        <s:property value="smgs.g18B1d"/>
    </div>
    <div class="d30">
    	<s:property value="smgs.g18B2"/>
    </div>
    <div class="d31">
		<s:iterator value="smgs.cimSmgsCarLists.entrySet()" status="rowstatus">
			<s:if test="%{#rowstatus.index == 0}">
				<s:property	value="value.vag4CimSmgs()" escapeHtml="false"/>	
            </s:if>            
     	</s:iterator>
    </div>
    <div class="d32">
    	<s:property value="smgs.g191"/>
	</div>
  	<div class="d33">
    	<s:property value="smgs.g192"/>
	</div>
  	<div class="d34">
    	<s:property value="smgs.g193"/>
	</div>
  	<div class="d36">
    	<s:property value="smgs.g48"/>
  	</div>
    <div class="d35">
    	<s:iterator value="smgs.cimSmgsCarLists.entrySet()">
			<s:iterator value="value.cimSmgsKonLists.entrySet()" status="rowstatus">
				<s:if test="#rowstatus.first">
					<s:property value="value.kon4CimSmgs()" escapeHtml="false"/> 
                </s:if>
			</s:iterator>
		</s:iterator>
  	</div>
    <div class="d37">
	    <table width="100%">
			<s:iterator value="smgs.cimSmgsCarLists.entrySet()">
				<s:iterator value="value.cimSmgsKonLists.entrySet()" var="kon" status="rowstatus">
					<s:iterator value="value.cimSmgsGruzs.entrySet()" status="rowstatus1">
						<tr valign="top">
							<td width="187">
								<s:if test="#rowstatus.first && #rowstatus1.first && #kon.value.cimSmgsGruzs.size() > 1">
									Сборный груз: Sammelgut:<br/>
				                </s:if>
				                <s:property value="value.gruz4CimSmgs()" escapeHtml="false"/>
							</td>
							<td width="92">
								<s:if test="#rowstatus.first && #rowstatus1.first && #kon.value.cimSmgsGruzs.size() > 1">
									<br/>
				                </s:if>
				                <s:property value="value.mesta4CimSmgs()" escapeHtml="false"/>
							</td>						  
						</tr>
					</s:iterator>
				</s:iterator>
			</s:iterator>
		</table>
    </div>
    <div class="d38">
    	<s:if test="1 == smgs.g21">X</s:if>
  	</div>
    <div class="d39">
   	  <s:if test="1 == smgs.g22">X</s:if>
  	</div>
    <div class="d40">
   	  <s:property value="smgs.g2012"/>
  	</div>
    <div class="d41">
    	<s:property value="smgs.g23Disp()" escapeHtml="false"/>
    </div>
	<div class="d42">
		<s:property value="smgs.g24Disp()" escapeHtml="false"/>
	</div>
  	<div class="d43">
   	  <s:property value="smgs.g38"/>
	</div>
  	<div class="d44">
    	<s:property value="smgs.g26"/>
	</div>
  	<div class="d45">
    	<s:property value="smgs.g27Disp4Print()" escapeHtml="false" />
	</div>
  	<div class="d46">
    	<s:property value="smgs.g23a"/>
    </div>
    <div class="d47">
    	<s:property value="smgs.g39"/>
  	</div>
  	<div class="d48">
    	X
  	</div>
    <div class="d49">
    	<s:property value="smgs.g591"/>
    </div>
    <div class="d50">
    	<s:property value="smgs.g592"/>
    </div>
    <div class="d51">
    	<s:property value="smgs.g593"/>
    </div>
  	<div class="d52">
    	<s:property value="smgs.g594"/>
    </div>
  	<div class="d53">
    	<s:property value="smgs.g595"/>
    </div>
  	<div class="d54">
    	<s:property value="smgs.g596"/>
    </div>
  	<div class="d55">
    	<s:property value="smgs.g597"/>
    </div>
  	<div class="d56">
    	<s:property value="smgs.g598"/>
    </div>
  	<div class="d57">
    	<s:property value="smgs.g60" escapeHtml="false"/>
    </div>
  	<div class="d58">
    	<s:property value="smgs.g61"/>
    </div>
	<div class="d59">
		<s:property value="smgs.g611"/>
	</div>
	<div class="d60">
		<s:property value="smgs.g612"/>
	</div>
	<div class="d61">
		<s:property value="smgs.g62"/>
	</div>
	<div class="d62">
		<s:property value="smgs.g621"/>
	</div>
  	<div class="d63">
    	<s:property value="smgs.g622"/>
    </div>
    <div class="d64">
   	  <s:property value="smgs.g29Disp()" escapeHtml="false"/>
    </div>
    <div class="d65">
    	<s:property value="smgs.g30"/>
    </div>
    <div class="d66">
    	<s:property value="smgs.g63" />
    </div>
    <div class="d67">
    	<s:property value="smgs.g64" />
    </div>
    <div class="d68">
    	<s:property value="smgs.ga66Disp4Print()" escapeHtml="false" />
    </div>
    <div class="d69">
    	<s:property value="smgs.g65Disp()" escapeHtml="false" />
    </div>
    <div class="d70">
    	<s:property value="smgs.g651Disp()" escapeHtml="false" />
    </div>
    <div class="d71">
    	<s:property value="smgs.g67" />
    </div>
    <div class="d72">
    	<s:if test="1 == smgs.gb661">X</s:if>
  	</div>
    <div class="d73">
    	<s:property value="smgs.g68" />
  	</div>
    <div class="d74">
    	<s:property value="smgs.g691" />
  	</div>
    <div class="d75">
    	<s:property value="smgs.g692" />
  	</div>
    <div class="d76">
    	<s:property value="smgs.g693" />
  	</div>
    <div class="d77">
    	<s:property value="smgs.g28Disp4Print()" escapeHtml="false" />
  	</div>
    <div class="d78">
    	<s:property value="smgs.gb662" />
  	</div>
</body>
</html>
</pd4ml:transform>
