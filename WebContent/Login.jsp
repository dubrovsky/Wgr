<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
    <meta content="text/html; charset=utf-8" http-equiv="content-type">
    <title><s:text name="authorization"/></title>
    <link rel="stylesheet" href="./resources/css/lstyles.css"/>
</head>

<body>

<div class="container">
    <div class="header">
        <div class="logo">
            <a href="./"><img src="images/logo_en.png" alt='<s:text name="home"/>'></a>
        </div>
        <div class="switch-langs">
            <div>
                <s:a href="Locale.do?lang=ru"><img src="images/rus.png" alt="Русский" title="Русский"></s:a>
                <s:a href="Locale.do?lang=pl"><img src="images/pl.png" alt="Polski" title="Polski"></s:a>
                <s:a href="Locale.do?lang=en"><img src="images/eng.png" alt="English" title="English"></s:a>
                <s:a href="Locale.do?lang=de"><img src="images/de.png" alt="Deutsch" title="Deutsch"></s:a>
                <s:a href="Locale.do?lang=zh_CN"><img src="images/chn.png" alt="中国的" title="中国的"></s:a>
            </div>

        </div>
    </div>
    <div class="form">
        <div class="form-wrapper">
            <form action="j_spring_security_check" method="post">
                <h1 class="form-heading"><s:text name="login"/></h1>

                <s:if test="#parameters['login_error'] != null && #session['SPRING_SECURITY_LAST_EXCEPTION'] != null">
                    <div class="error">
                        <s:text name="denied"/>. <br/>
                        <%--<s:set var="loc" value="#session['SPRING_SECURITY_LAST_EXCEPTION'].message"/>--%>
                        <s:text name="reason"/>: <s:text name="%{#session['SPRING_SECURITY_LAST_EXCEPTION'].message}" />
                        <%--<s:text name="reason"/>: <s:property value="#session['SPRING_SECURITY_LAST_EXCEPTION'].message"/>--%>
                    </div>
                </s:if>

                <input name="j_username" id="j_username" type="text" placeholder='<s:text name="username"/>'
                       value="<s:property value="#session['SPRING_SECURITY_LAST_USERNAME']"/>">
                <input name="j_password" id="j_password" type="password" placeholder='<s:text name="password"/>' >

                <input name="submit" type="submit" class="btn btn-accent" value='<s:text name="login"/>'>
            </form>
        </div>
    </div>
</div>
</body>
</html>
