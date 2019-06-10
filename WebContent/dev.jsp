<%@page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>DBWGR</title>
    <link rel="stylesheet" type="text/css"  href="./ext/src/ux/css/ItemSelector.css" />

    <!-- <x-compile> -->
    <!-- <x-bootstrap> -->
    <link rel="stylesheet" href="./bootstrap.css">
    <link rel="stylesheet" href="./resources/css/styles.css">
    <script src="./ext/ext-dev.js"></script>
    <script src="./bootstrap.js"></script>
    <!-- </x-bootstrap> -->
    <script src="./app.js"></script>
    <!-- </x-compile> -->
</head>
<body >
    <div id="loading"><span class="title"></span><span class="logo"></span></div>
    <span id='langProp' style="color: #ffffff;"><s:property value="#session['WW_TRANS_I18N_LOCALE']"/></span>
<%--<div id="header-content"><strong>Портал ОАО «ТрансКонтейнер»</strong></div>--%>
</body>
</html>