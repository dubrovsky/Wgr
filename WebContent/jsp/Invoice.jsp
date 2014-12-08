<%@page contentType="text/html; charset=utf-8"%><%@taglib prefix="s" uri="/struts-tags"%><%@taglib uri="/WEB-INF/tlds/pd4ml.tld" prefix="pd4ml"%><pd4ml:transform screenWidth="795" pageInsets="0,0,0,0,mm" pageOrientation="landscape">
<pd4ml:usettf from='java:' serif="Times New Roman" sansserif="Arial" monospace="Courier New"/>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title><s:property value="invoice.docType"/></title>
        <style type="text/css">
            div,td,th {font-size: 11px;}
        </style>
    </head>
    <body>
        <div align="center" style="font-weight:bold">
            <s:property value="invoice.docType"/> № <s:property value="invoice.invoice"/> от <s:property value="invoice.dat_inv"/>
        </div>
        <table>
            <tr>
                <td width="200">№ отправки</td>
                <td><s:property value="invoice.numOtpr()"/></td>
            </tr>
            <tr>
                <td width="200">№ контейнера</td>
                <td><s:property value="invoice.numKont()"/></td>
            </tr>
        </table>
        <table width="100%">
            <tr align="left">
                <th width="50%">Продавец</th>
                <th width="50%">Отправитель</th>
            </tr>
            <tr align="left">
                <td>
                    <s:property value="invoice.nsel"/> <br/>
                    <s:property value="invoice.adres_s"/>
                </td>
                <td>
                    <s:property value="invoice.notd"/>  <br/>
                    <s:property value="invoice.adres_o"/>
                </td>
            </tr>
            <tr align="left">
                <th>Покупатель</th>
                <th>Получатель</th>
            </tr>
            <tr align="left">
                <td>
                    <s:property value="invoice.nbuy"/> <br/>
                    <s:property value="invoice.adres_b"/>
                </td>
                <td>
                    <s:property value="invoice.npol"/> <br/>
                    <s:property value="invoice.adres_p"/>
                </td>
            </tr>
        </table>

        <s:if test="%{!invoice.invoiceGruzs.isEmpty}">
            <br/>
            <table width="100%" border="1">
                <tr>
                    <th>Код товара</th>
                    <th>Наименование товара</th>
                    <th>Род упаковки</th>
                    <th>Кол-во упаковок/мест</th>
                    <th>Вес брутто,кг</th>
                    <th>Вес нетто,кг</th>
                    <th>Кол-во единиц</th>
                    <th>Единица измерения</th>
                    <th>Цена</th>
                    <th>Общая стоимость</th>
                </tr>
                <s:iterator value="invoice.invoiceGruzs.entrySet()">
                    <tr>
                        <td><s:property value="value.tnved"/>&nbsp;</td>
                        <td><s:property value="value.nzgr"/>&nbsp;</td>
                        <td><s:property value="value.nzyp"/>&nbsp;</td>
                        <td><s:property value="value.kolm"/>&nbsp;</td>
                        <td><s:property value="value.mbrt"/>&nbsp;</td>
                        <td><s:property value="value.mnet"/>&nbsp;</td>
                        <td><s:property value="value.kole"/>&nbsp;</td>
                        <td><s:property value="value.eizm"/>&nbsp;</td>
                        <td><s:property value="value.cost"/>&nbsp;</td>
                        <td><s:property value="value.itogo"/>&nbsp;</td>
                    </tr>
                </s:iterator>
                <tr>
                    <td>&nbsp;</td>
                    <td>Итого:</td>
                    <td>&nbsp;</td>
                    <td><s:property value="invoice.sumKolm()"/>&nbsp;</td>
                    <td><s:property value="invoice.sumMbrt()"/>&nbsp;</td>
                    <td><s:property value="invoice.sumMnet()"/>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td><s:property value="invoice.sumItogo()"/>&nbsp;</td>
                </tr>
            </table>
            <br/>
            <div>
                Итого общая стоимость по инвойсу:
                <s:property value="invoice.sumItogo2Str()"/>
                <s:property value="invoice.cux"/>
                (<s:property value="invoice.sumItogo()"/>&nbsp;<s:property value="invoice.cux"/>)
            </div>
        </s:if>
    </body>
</html>
</pd4ml:transform>