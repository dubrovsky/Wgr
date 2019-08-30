<%@page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE HTML PUBLIC  "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <title>DBWGR</title>
    <link rel="stylesheet" type="text/css"  href="ext/src/ux/css/ItemSelector.css" />
    <link rel="stylesheet" href="build/production/TK/resources/TK-all.css"/>
    <link rel="stylesheet" type="text/css" href="build/production/TK/resources/css/styles.css">
    <script type="text/javascript" src="build/production/TK/app.js"></script>
</head>
<body>
    <div id="loading"><span class="title"></span><span class="logo"></span></div>
    <span id='langProp' style="color: #ffffff;"><s:property value="#session['WW_TRANS_I18N_LOCALE']"/></span>

    <script type="application/javascript">
        function ping() {
            Ext.Ajax.request({
                url: 'Ping.do',
                success: function (response, options) {
                },
                failure: function (response) {
                }
            });
        }

        setInterval(ping, 900000);
    </script>
</body>
</html>