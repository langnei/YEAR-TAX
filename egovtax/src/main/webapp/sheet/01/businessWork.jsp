<%@page contentType="text/xml;charset=utf-8"
    pageEncoding="UTF-8"
    import="java.sql.*,java.util.*"
 %><%
Connection conn = null;
PreparedStatement pstmt = null;
ResultSet rs = null;

String url = "jdbc:mariadb://localhost/test?user=scott&password=tiger";
String id = "scott";
String pwd = "tiger";

String driver = "org.mariadb.jdbc.Driver";  
String query = "";

query = "SELECT * FROM POSTNO";

try{
	//json 시작
	
	Class.forName(driver);
	conn = DriverManager.getConnection(url,id,pwd);
		
	//실제 데이터 json

	pstmt = conn.prepareStatement(query);
	rs = pstmt.executeQuery();
	List li = convertResultSetToList(rs);
	System.out.println("전체 건수:"+li.size());                
	request.setAttribute("SHEETDATA",li);
	
	
	// 4. DirectDown2Excel.jsp 페이지로 forwarding

	String forwardPath = "../jsp/DirectDown2Excel.jsp"; 
	if(!"".equals(forwardPath)){
		RequestDispatcher rd = request.getRequestDispatcher(forwardPath);
		rd.forward(request,response);
	}
		
}catch(Exception ex){
	ex.printStackTrace();

	
}finally{
	rs.close();
	pstmt.close();
	conn.close();	
}
%>
<%! 
public String NVL(String str){
	if("null".equals(str)||str==null){
		return "";
	}
	return str;
}


public List<HashMap<String,Object>> convertResultSetToList(ResultSet rs) throws SQLException {
    ResultSetMetaData md = rs.getMetaData();
    int columns = md.getColumnCount();
    List<HashMap<String,Object>> list = new ArrayList<HashMap<String,Object>>();

    while (rs.next()) {
        HashMap<String,Object> row = new HashMap<String, Object>(columns);
        for(int i=1; i<=columns; ++i) {
            row.put(md.getColumnName(i),rs.getObject(i));
        }
        list.add(row);
    }

    return list;
}
%>