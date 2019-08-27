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

      <s:if test="#request.password_is_change != null">
        <span>
          <h2><s:text name="password_change_ok"/></h2>
          <s:a href="Locale.do"><s:text name="goon"/></s:a>
        </span>
      </s:if>
      <s:else>
        <form action="ChangePw.do" method="post" style="top: 64px; overflow: hidden;">
          <h1 class="form-heading"><s:text name="password_change"/></h1>
          <h2 class="form-heading"><s:property value="user.usr.namKlient"/></h2>

          <s:if test="hasActionErrors()">
            <div class="error">
              <s:actionerror/>
            </div>
          </s:if>

          <label><s:text name="username"/>: </label>
          <div class="login"><s:property value="user.usr.un"/></div>
<%--
          <label><s:text name="password"/>: </label><s:password name="pw0"/>
          <label><s:text name="password_new1"/>: </label><s:password name="pw1"/>
          <label><s:text name="password_new2"/>: </label><s:password name="pw2"/>
--%>
          <input type="password" name="pw0" placeholder='<s:text name="password"/>'/>
          <input type="password"  name="pw1" placeholder='<s:text name="password_new1"/>'/>
          <input type="password"  name="pw2" placeholder='<s:text name="password_new2"/>'/>

          <%--<input name="skip" type="submit" class="btn btn-accent" style="width: 49%;" value='<s:text name="skip"/>'>--%>
          <input name="save" type="submit" class="btn btn-accent" style="width: 49%; float: right;" value='<s:text name="save"/>'>

        </form>
      </s:else>

    </div>
  </div>
</div>
</body>
</html>
