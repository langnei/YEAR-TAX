<%@page contentType="text/xml;charset=utf-8"
    pageEncoding="UTF-8"
    import="java.sql.*,java.util.*,org.json.simple.JSONArray,org.json.simple.JSONObject"
 %><%
String rowidx = request.getParameter("ibpage");  //현재가 몇번째 페이지
String onepagerow = request.getParameter("onepagerow"); //한번에 몇건씩 가져올 것인지
String iborderby = request.getParameter("iborderby");
System.out.println("Page:"+rowidx);
if(rowidx==null){
 rowidx="1";
 onepagerow = "0";
}
/***********************  이 부분이 제일 중요 ***************************************/
int startrow,endrow;
startrow = (Integer.parseInt(rowidx)-1) * Integer.parseInt(onepagerow)+1;
endrow = startrow + 49;
/***********************  이 부분이 제일 중요 ***************************************/


Connection conn = null;
PreparedStatement pstmt = null;
ResultSet rs = null;


//String url = "jdbc:oracle:thin:@localhost:1521:orcl";
String url = "jdbc:mariadb://localhost/employees?user=root&password=ksy6242";
String id = "root";
String pwd = "ksy6242";
//String driver = "oracle.jdbc.driver.OracleDriver";
String driver = "org.mariadb.jdbc.Driver";  
String countquery = "SELECT "
					+" COUNT(1) AS CNT"
					+" FROM dept_emp de,employees em,departments dp "
					+" where em.emp_no = de.emp_no "
					+" and  de.dept_no = dp.dept_no";
String query = "";
String rtnJSON = "";
StringBuffer rtnStr = new StringBuffer();

if(iborderby==null||"".equals(iborderby)){
	query = "SELECT "
					+" DE.FROM_DATE,DE.TO_DATE ,EM.EMP_NO , EM.BIRTH_DATE, EM.FIRST_NAME,EM.LAST_NAME, EM.GENDER, EM.HIRE_DATE,DP.DEPT_NO,DP.DEPT_NAME"
					+" FROM dept_emp de,employees em,departments dp "
					+" where em.emp_no = de.emp_no "
					+" and  de.dept_no = dp.dept_no"
					+" Limit ?,50";
	
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
		query = "SELECT "
					+" DE.FROM_DATE,DE.TO_DATE ,EM.EMP_NO , EM.BIRTH_DATE, EM.FIRST_NAME,EM.LAST_NAME, EM.GENDER, EM.HIRE_DATE,DP.DEPT_NO,DP.DEPT_NAME"
					+" FROM dept_emp de,employees em,departments dp "
					+" where em.emp_no = de.emp_no "
					+" and  de.dept_no = dp.dept_no"
					+" ORDER BY "+orderbyStr
					+" Limit ?,50";
	
	
}
try{
	//json 시작
	rtnJSON = "";	
	Class.forName(driver);
	conn = DriverManager.getConnection(url,id,pwd);
	
	int total=0;
	//첫 조회에만 필요함.
	if(startrow==1){	
		
		pstmt = conn.prepareStatement(countquery);
		rs = pstmt.executeQuery();
		//전체 건수
		if(rs.next()){
			total = rs.getInt("CNT");	
			System.out.println("###################################");
		}
		pstmt.clearParameters();
	}
	//실제 데이터 json

	pstmt = conn.prepareStatement(query);
	pstmt.setInt(1, startrow);
//	pstmt.setInt(2, endrow);
	rs = pstmt.executeQuery();
	
	JSONArray j = ResultSet2Json(rs);
	System.out.println("SIZE:"+j.size());

	JSONObject retJson = new JSONObject();
	if(total>0){
		retJson.put("Total",total);
	}

	retJson.put("Data",j);
	rtnJSON = retJson.toJSONString();
	

	
	
}catch(Exception ex){
	ex.printStackTrace();
	String msg = ex.getMessage();
	//오류 발생
	rtnJSON = "{";
	rtnJSON += "Result : {Code:-1, Message:'오류가 발생하였습니다.\n"+msg+"'}";
	rtnJSON += "}";
	
}finally{
	rs.close();
	pstmt.close();
	conn.close();	
	out.println(rtnJSON);
}
%>
<%! 

public JSONArray ResultSet2Json(ResultSet rs){
	JSONArray json = new JSONArray();
	try{
		ResultSetMetaData rsmd = rs.getMetaData();

		while(rs.next()) {
		  int numColumns = rsmd.getColumnCount();
		  JSONObject obj = new JSONObject();

		  for( int i=1; i<numColumns+1; i++) {
		    String column_name = rsmd.getColumnName(i);

		    switch( rsmd.getColumnType( i ) ) {
		      case java.sql.Types.ARRAY:
		        obj.put(column_name, rs.getArray(column_name));     break;
		      case java.sql.Types.BIGINT:
		        obj.put(column_name, rs.getInt(column_name));       break;
		      case java.sql.Types.BOOLEAN:
		        obj.put(column_name, rs.getBoolean(column_name));   break;
		      case java.sql.Types.BLOB:
		        obj.put(column_name, rs.getBlob(column_name));      break;
		      case java.sql.Types.DOUBLE:
		        obj.put(column_name, rs.getDouble(column_name));    break;
		      case java.sql.Types.FLOAT:
		        obj.put(column_name, rs.getFloat(column_name));     break;
		      case java.sql.Types.INTEGER:
		        obj.put(column_name, rs.getInt(column_name));       break;
		      case java.sql.Types.NVARCHAR:
		        obj.put(column_name, rs.getNString(column_name));   break;
		      case java.sql.Types.VARCHAR:
		        obj.put(column_name, rs.getString(column_name));    break;
		      case java.sql.Types.TINYINT:
		        obj.put(column_name, rs.getInt(column_name));       break;
		      case java.sql.Types.SMALLINT:
		        obj.put(column_name, rs.getInt(column_name));       break;
		      case java.sql.Types.DATE:
		        obj.put(column_name, rs.getDate(column_name));      break;
		      case java.sql.Types.TIMESTAMP:
		        obj.put(column_name, rs.getTimestamp(column_name)); break;
		      default:
		        obj.put(column_name, rs.getObject(column_name));    break;
		    }
		  }
		  json.add(obj);
		}
	}catch(Exception EX){
		EX.printStackTrace();
	}
	return json;
}
%>