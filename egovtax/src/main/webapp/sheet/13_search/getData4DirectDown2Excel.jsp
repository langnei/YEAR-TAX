<%@page contentType="text/xml;charset=utf-8"
    pageEncoding="UTF-8"
 %><%
try{
String forwardPath = "../jsp/DirectDown2Excel.jsp"; 
if(!"".equals(forwardPath)){
RequestDispatcher rd = request.getRequestDispatcher(forwardPath);
rd.forward(request,response);
}
}catch(Exception ex){
	ex.printStackTrace();
}

%>