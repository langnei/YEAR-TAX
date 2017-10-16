<%@page contentType="text/xml;charset=utf-8"
    pageEncoding="UTF-8"
    import="java.sql.*,java.util.*"
 %>
<%

String rowidx = request.getParameter("ibpage");  //현재가 몇번째 페이지
String onepagerow = request.getParameter("onepagerow"); //한번에 몇건씩 가져올 것인지
String iborderby = request.getParameter("iborderby");

if(rowidx==null){
 rowidx="1";
 onepagerow = "0";
}
/***********************  이 부분이 제일 중요 ***************************************/
int startrow,endrow;
startrow = (Integer.parseInt(rowidx)-1) * Integer.parseInt(onepagerow)+1;
endrow = startrow + 99;
/***********************  이 부분이 제일 중요 ***************************************/




Connection conn = null;
PreparedStatement pstmt = null;
ResultSet rs = null;
String url = "jdbc:oracle:thin:@14.36.46.149:11521:hubdb";
String id = "ibleaders";
String pwd = "ib0501";
String driver = "oracle.jdbc.driver.OracleDriver";
  
String countquery = "select count(1) AS CNT from POSTNO";
String query = "";
StringBuffer rtnStr = new StringBuffer();
if(iborderby==null||"".equals(iborderby)){
	query = "SELECT * FROM (SELECT ROWNUM RN,POSTNO,SIDO,SIGUNGU,UBMYNDONG,LEE,ADDRESS FROM POSTNO) WHERE RN BETWEEN ? and ?";
}else{
	String orderbyStr = "";
	String[] colArr = null;
	String[] sortArr = null;
	System.out.println(iborderby);
	String[] ColandSort = iborderby.split("\\^");
	if(ColandSort[0].indexOf("|")>-1){
		colArr = ColandSort[0].split("\\|");
		sortArr = ColandSort[1].split("\\|");
		for(int i=0;i<colArr.length;i++){
			orderbyStr += ","+colArr[i]+ " " +sortArr[i];
		}
	}else{
		System.out.println(ColandSort[0]);
		System.out.println(ColandSort[1]);
		orderbyStr = " "+ColandSort[0]+ " " +ColandSort[1];			
	}

	
	orderbyStr = orderbyStr.substring(1);
	query = "SELECT * FROM (SELECT POSTNO,SIDO,SIGUNGU,UBMYNDONG,LEE,ADDRESS,ROW_NUMBER() over (order by "+orderbyStr+") RN FROM POSTNO) WHERE RN BETWEEN ? and ? ";
	System.out.println(query);
}
try{
	Class.forName(driver);
	conn = DriverManager.getConnection(url,id,pwd);
	pstmt = conn.prepareStatement(countquery);
	rs = pstmt.executeQuery();
	//json 시작
	rtnStr.append("{");	
	
	//전체 건수
	if(rs.next()){
		rtnStr.append("TOTAL:"+rs.getString("CNT")+",");	
	}
	
	//실제 데이터 json
	pstmt.clearParameters();
	pstmt = conn.prepareStatement(query);
	pstmt.setInt(1, startrow);
	pstmt.setInt(2, endrow);
	rs = pstmt.executeQuery();
	
	rtnStr.append("	DATA:[");
	while(rs.next()){
		//SaveName을 이용한 방법
		//System.out.println(rs.getString("RN"));
		rtnStr.append("{RN:'"+rs.getString("RN")+"',POSTNO:'"+rs.getString("POSTNO")+"',SIDO:'"+rs.getString("SIDO")+"',SIGUNGU:'"+NVL(rs.getString("SIGUNGU"))+"' ");
		rtnStr.append(",UBMYNDONG:'"+NVL(rs.getString("UBMYNDONG"))+"',LEE:'"+NVL(rs.getString("LEE"))+"'");
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
	rs.close();
	pstmt.close();
	conn.close();	
	out.println(rtnStr+"");
}
%>
<%! 
public String NVL(String str){
	if("null".equals(str)||str==null){
		return "";
	}
	return str;
}
%>