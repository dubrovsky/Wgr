<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>An unexpected error has occurred</title>
</head>
<body>
    <h2 style="color: red">An unexpected error has occurred during JSP processing</h2>
    <p>
        Please report this error to your system administrator
        or appropriate technical support personnel.
        Thank you for your cooperation.
    </p>
    <hr/>
    <h3>Error Message:</h3>
    <p>
        <s:property value="%{#parameters.errorMgs}" />
        <%--<s:property value="%{exception.message}"/>--%>
        <%--<s:property value="%{exception}"/>--%>
    </p>
    <%--<hr/>
    <h3>Technical Details</h3>
    <p>
        &lt;%&ndash;<s:property value="%{exceptionStack}"/>&ndash;%&gt;
    </p>--%>
</body>
</html>