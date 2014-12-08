<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
    <title>
        Авторизация
    </title>
    <link rel="stylesheet" href="./resources/css/lstyles.css"/>
</head>

<body>

    <div id="main-block">
        <s:if test="#parameters['login_error'] != null && #session['SPRING_SECURITY_LAST_EXCEPTION'] != null">
            <div class="error">
              Доступ запрещен. <br/>
              Причина: <s:property value="#session['SPRING_SECURITY_LAST_EXCEPTION'].message"/>
            </div>
        </s:if>

        <div>
            <s:a href="Locale.do?lang=ru"><img src="images/rus.png" alt="Русский" title="Русский"></s:a>
            <s:a href="Locale.do?lang=en"><img src="images/eng.png" alt="English" title="English"></s:a>
            <s:a href="Locale.do?lang=zh_CN"><img src="images/chn.png" alt="中国的" title="中国的"></s:a>
            <s:a href="Locale.do?lang=de"><img src="images/de.png" alt="Deutsch" title="Deutsch"></s:a>
        </div>

        <form action="j_spring_security_check" method="post">
            <input name="j_username" id="j_username" type="text" placeholder='<s:text name="username"/>'
                   class="user-input"
                   value="<s:property value="#session['SPRING_SECURITY_LAST_USERNAME']"/>">
            <input name="j_password" id="j_password" type="password" placeholder='<s:text name="password"/>'
                   class="pass-input">
            <input name="submit" type="submit" class="submit orange-color" value="<s:text name="ok"/>">
        </form>
    </div>

    <%--<div id="outPopUp"></div>--%>
</body>
</html>
