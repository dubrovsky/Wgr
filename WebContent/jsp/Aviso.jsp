<%@page contentType="text/html; charset=utf-8"%><%@taglib prefix="s" uri="/struts-tags"%><%@taglib uri="/WEB-INF/tlds/pd4ml.tld" prefix="pd4ml"%><pd4ml:transform screenWidth="770" pageInsets="8,9,0,0,mm">
<pd4ml:usettf from='java:' serif="Times New Roman" sansserif="Arial" monospace="Courier New" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="ru">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Aviso</title>
<link href="../css/Aviso.css" rel="stylesheet" type="text/css" />
</head>

<body>
	<img src="../pic/tk-ukrane.gif" class='pic' />
	<div class="div1">Выдано</div>
	<div class="div2">ТрансКонтейнер-Словакия</div>
	<div class="div2a">Отправить по E-Mail</div>
	<div class="div3">№</div>
	<div class="div4">
		<s:property value="smgs.aviso_num" escapeHtml="false" />
	</div>
	<div class="div5">Дата</div>
	<div class="div6">
		<s:property value="smgs.aviso_dat" escapeHtml="false" />
	</div>
	<div class="div7">ГРУЗ</div>
	<div class="div8">
		<s:iterator value="smgs.cimSmgsCarLists.entrySet()" var="car" status="v_st">
        	<s:iterator value="value.cimSmgsKonLists.entrySet()" var="kon" status="k_st">
          		<s:iterator value="value.cimSmgsGruzs.entrySet()" status="g_st">
          			<s:if test="#v_st.first && #k_st.first && #g_st.first">
          				<s:property value="value.nzgr" escapeHtml="false"/>
          				<s:set name="nzgr" value="value.nzgr"/>
          				<s:set name="kgvn" value="value.kgvn"/>
          				<s:set name="ekgvn" value="value.ekgvn"/>
          			</s:if>	 
          		</s:iterator>
          	</s:iterator>
        </s:iterator>
	</div>
	<div class="div9">КОД</div>
	<div class="div10"><s:property value="#kgvn" escapeHtml="false"/></div>
	<div class="div11"><s:property value="#ekgvn" escapeHtml="false"/></div>
	<div class="div12">Оплата тарифа по территории</div>
	<div class="div13">
		<s:iterator value="smgs.cimSmgsPlatels.entrySet()" status="st">
			<s:if test="#st.first">
				<s:property value="value.dorR" escapeHtml="false"/>
			</s:if>
		</s:iterator>
	</div>
	<div class="div14">произведена</div>
	<div class="div15">по маршруту</div>
	<div class="div16">
		<s:iterator value="smgs.cimSmgsDocses13.entrySet()" >
		 	<s:property value="value.marshroot()" escapeHtml="false"/><br/>
		</s:iterator>
	</div>
	<div class="div17">В количестве</div>
	<div class="div18"><s:property value="smgs.amount" escapeHtml="false" /></div>
	<div class="div19">Принадлежность</div>
	<div class="div20">
		<s:iterator value="smgs.cimSmgsCarLists.entrySet()" var="car" status="v_st">
        	<s:iterator value="value.cimSmgsKonLists.entrySet()" var="kon" status="k_st">
        		<s:if test="#v_st.first && #k_st.first">
				 	<s:property value="value.sizeFoot" escapeHtml="false"/>&nbsp;
				 	<s:property value="value.vid" escapeHtml="false"/>&nbsp;
				 	<s:property value="value.kat" escapeHtml="false"/>
			 	</s:if>
			</s:iterator>
		</s:iterator>
	</div>
	<table class="div21">
		<tr class="div21a">
			<td width="10%"></td>
			<td width="80%"></td>
			<td width="10%"></td>
		</tr>
		<tr>
			<th colspan="3">Инструкция по заполнению накладных СМГС</th>
		</tr>
		<tr>
			<td></td>
			<td class="div21b">Графа 4,20: <s:property value="smgs.g18" escapeHtml="false"/></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td class="div21b">
				Графа 5: <s:property value="smgs.g4r" escapeHtml="false"/> &nbsp;
				<s:property value="smgs.g49r" escapeHtml="false"/>
			</td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td class="div21b">
				Графа 6: <s:property value="smgs.g15" escapeHtml="false"/>
			</td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td class="div21b">
				Графа 7: 
				<s:iterator value="smgs.cimSmgsDocses13.entrySet()" >
				 	<s:property value="value.text" escapeHtml="false"/><br/>
				</s:iterator>
			</td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td class="div21b">
				Графа 8: <s:property value="smgs.g12" escapeHtml="false"/>&nbsp;
				<s:property value="smgs.g121" escapeHtml="false"/>&nbsp;
				<s:property value="smgs.g101" escapeHtml="false"/>&nbsp;
				<s:property value="smgs.g101r" escapeHtml="false"/>&nbsp;
				<s:property value="smgs.g102" escapeHtml="false"/>&nbsp;
				<s:property value="smgs.g102r" escapeHtml="false"/>&nbsp;
			</td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td class="div21b">
				Графа 11: <s:property value="#nzgr" escapeHtml="false"/>&nbsp;
				<s:property value="#kgvn" escapeHtml="false"/>&nbsp;
				<s:property value="#ekgvn" escapeHtml="false"/>&nbsp;
			</td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td class="div21b">Графа 91: Платежи за УЗ - см. графу 4,20</td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td class="div21b">
				Графа 1: <s:property value="smgs.g1r" escapeHtml="false"/> &nbsp;
				<s:property value="smgs.g19r" escapeHtml="false"/>
			</td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td class="div21b">
				<s:iterator value="smgs.cimSmgsCarLists.entrySet()" >
		        	<s:iterator value="value.cimSmgsKonLists.entrySet()" >
					 	<s:property value="value.utiN" escapeHtml="false"/>&nbsp;
					</s:iterator>
				</s:iterator>
			</td>
			<td></td>
		</tr>
		<tr>
			<td colspan="3">Коды действительны только на данную перевозку,
				до <s:property value="smgs.aviso_cod_dat" escapeHtml="false"/></td>
		</tr>
		<tr>
			<td colspan="3">Согласованая ставка <s:property value="smgs.aviso_stavka" escapeHtml="false"/></td>
		</tr>
		<tr>
			<td colspan="3">В случае заполнения перевозочных документов,
				отличающихся от данной инструкции ООО "Трансконтейнер Украина" не
				несет ответственности за данню перевозку</td>
		</tr>
		<tr>
			<td colspan="3">Просьба передавать отгрузочную информацию не
				позже 2-х суток со дня отправления груза <br /> по email:
				info@trcont-ua.com, тел. +38 044 569 82 12/13/14</td>
		</tr>
		<tr>
			<td colspan="3">Директор</td>
		</tr>
	</table>
</body>
</html>
</pd4ml:transform>