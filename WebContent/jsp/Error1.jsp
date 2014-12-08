<%@ page contentType="text/html; charset=UTF-8" %>
<%--
  String task = request.getParameter("task");
  if(task != null && ("create".equals(task) || "edit".equals(task) || "copy".equals(task))){
    response.sendRedirect("jsp/Error.jsp");
  }
  else{
    response.setStatus(response.SC_INTERNAL_SERVER_ERROR);
    response.setContentType("text/json-comment-filtered");
    response.setCharacterEncoding("UTF-8");
    response.getWriter().print("{exception: 'Internal error in framework'}");
    response.getWriter().flush();
    response.getWriter().close();
  }

--%>

<%
  response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
  response.setContentType("text/html");
  response.setCharacterEncoding("UTF-8");
  response.getWriter().print("{success: false, exception: 'Internal error in framework'}");
  response.getWriter().flush();
  response.getWriter().close();
%>
