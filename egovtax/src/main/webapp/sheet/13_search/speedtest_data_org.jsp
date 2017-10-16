<%@page contentType="text/xml;charset=utf-8"
    pageEncoding="UTF-8"
    import="java.sql.*,java.util.*"
 %>
<%
String cnt = request.getParameter("cnt");

Connection conn = null;
PreparedStatement pstmt = null;
ResultSet rs = null;
String url = "jdbc:oracle:thin:@localhost:1521:xe";
String id = "scott";
String pwd = "tiger";
String driver = "oracle.jdbc.driver.OracleDriver";

String query = "";
query = "SELECT * FROM (SELECT ROWNUM RN,POSTNO,SIDO,SIGUNGU,UBMYNDONG,NVL2(LEE,LEE,' ') AS LEE,ADDRESS FROM POSTNO) WHERE RN <= ?";
StringBuffer rtnStr = new StringBuffer();
try{
	Class.forName(driver);
	conn = DriverManager.getConnection(url,id,pwd);

	//json 시작
	rtnStr.append("{");	
	//실제 데이터 json
	pstmt = conn.prepareStatement(query);
	pstmt.setInt(1,Integer.parseInt(cnt));
	rs = pstmt.executeQuery();
	rtnStr.append("	DATA:[");
	while(rs.next()){
		//SaveName을 이용한 방법
		rtnStr.append("{RN:'"+rs.getString("RN")+"',POSTNO:'"+rs.getString("POSTNO")+"',SIDO:'"+rs.getString("SIDO")+"',SIGUNGU:'"+rs.getString("SIGUNGU")+"' ");
		rtnStr.append(",UBMYNDONG:'"+rs.getString("UBMYNDONG")+"',LEE:'"+rs.getString("LEE")+"'");
		rtnStr.append(",ADDRESS:'"+rs.getString("ADDRESS")+"'},");
	}
	rtnStr.substring(0,rtnStr.length()-1);
	rtnStr.append("]}");		


	

	
	
}catch(Exception ex){
	ex.printStackTrace();
	String msg = ex.getMessage();
	//오류 발생
	rtnStr.append("{");
	rtnStr.append("Result : {Code:-1, Message:'오류가 발생하였습니다.\n"+msg+"'}");
	rtnStr.append("}");
	
}finally{
	try{
		rs.close();
		pstmt.close();
		conn.close();	
	}catch(Exception eee){
	
	}
	out.println(rtnStr+"");
}
%>
