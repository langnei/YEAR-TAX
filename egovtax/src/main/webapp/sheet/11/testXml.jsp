<?xml version='1.0' encoding='UTF-8' standalone='no'?>
<%@page contentType="text/xml;charset=utf-8"    pageEncoding="UTF-8"    import="java.sql.*,java.util.*" %>
<%!
	public String ifNull(String str) throws Exception {
		if(str == null || "".equals(str)){
			return "0";
		}
		return str;
	}
%>
<Excel>
<IBSheetSet>
	<%
		//request.setCharacterEncoding("utf-8");

		int i = Integer.parseInt( ifNull((String)request.getParameter("startrow")) ); 
    	int top = Integer.parseInt( ifNull((String)request.getParameter("top")));
	    int bottom = Integer.parseInt( ifNull((String)request.getParameter("bottom")));
	    int left = Integer.parseInt( ifNull((String)request.getParameter("left")));
	    int right = Integer.parseInt( ifNull((String)request.getParameter("right")));
	    int header = Integer.parseInt( ifNull((String)request.getParameter("header")));
	    int footer = Integer.parseInt( ifNull((String)request.getParameter("footer")));
	    
	    int repeatcol1 = Integer.parseInt( ifNull((String)request.getParameter("repeatcol1")));
	    int repeatcol2 = Integer.parseInt( ifNull((String)request.getParameter("repeatcol2")));
	    int repeatrow1 = Integer.parseInt( ifNull((String)request.getParameter("repeatrow1")));
	    int repeatrow2 = Integer.parseInt( ifNull((String)request.getParameter("repeatrow2")));
	    
	    int rowheight1 = Integer.parseInt( ifNull((String)request.getParameter("rowheight1")));
	    int rowheight2 = Integer.parseInt( ifNull((String)request.getParameter("rowheight2")));
	    int colwidth1 = Integer.parseInt( ifNull((String)request.getParameter("colwidth1")));
	    int colwidth2 = Integer.parseInt( ifNull((String)request.getParameter("colwidth2")));
	    int width = Integer.parseInt( ifNull((String)request.getParameter("width")));
	    int height = Integer.parseInt( ifNull((String)request.getParameter("height")));
    %>
    <StartRow><%=i%></StartRow><!-- Sheet의 데이터를 표시할 엑셀의 시작 행 위치 -->
</IBSheetSet>
<PageSet>
    <PaperSize><%=(String)request.getParameter("papersize") %></PaperSize><!-- 엑셀의 용지 크기 설정 "A3, A4, B4, B5" -->
    <Orientation><%=(String)request.getParameter("paperdir") %></Orientation><!-- 엑셀의 용지 방향 설정 : 세로 "Portrait" 가로 "Landscape" -->
 	<Scaling><!-- 엑셀의 용지 배율 설정 -->
        <Adjust Value='30'>False</Adjust><!--Adjust:축소/확대 배율-->
        <Fit Height='5' Width='5'>True</Fit><!--Fit:자동맞춤-->
    </Scaling>
    <Margins Top='<%=top %>' Header='<%=header %>' Left='<%=left %>' Right='<%=right %>' Bottom='<%=bottom %>' Footer='<%=footer %>'/><!-- 엑셀의 여백 설정 -->
    <RowsRepeat Row1='1' Row2='2' /><!-- 엑셀의 반복 행 설정 : 시작 행 Row1 마지막 행 Row2 -->
    <ColsRepeat Col1='1' Col2='1' /><!-- 엑셀의 반복 컬럼 설정 : 시작 컬럼 Col1 마지막 컬럼 Col2 -->
    <%
    	if(repeatcol1 > 0 && repeatcol2 >0){
    		if(repeatcol1 > repeatcol2){
    			int t = repeatcol1;
    			repeatcol2 = repeatcol1;
    			repeatcol2 = t;
    		}
    %>    
    		<ColsRepeat Col1='<%=repeatcol1 %>'  Col2='<%=repeatcol2 %>' />		
    <%
    	}
    %>
    
    <%
    	if(repeatrow1 > 0 && repeatrow2 >0){
    		if(repeatrow1 > repeatrow2){
    			int t = repeatrow1;
    			repeatrow2 = repeatrow1;
    			repeatrow2 = t;
    		}
    %>    
    		<RowsRepeat Row1='<%=repeatrow1 %>'  Row2='<%=repeatrow2 %>' />		
    <%
    	}
    %>
    <DefaultRowHeight>19.5</DefaultRowHeight><!-- 엑셀의 기본 행 높이 설정 -->
    <DefaultFont Name='<%=(String)request.getParameter("papersize") %>' Bold='<%=(String)request.getParameter("bold") %>' Italic='<%=(String)request.getParameter("italic") %>' size='<%=Integer.parseInt( ifNull((String)request.getParameter("fontsize"))) %>'  /><!-- 엑셀의 기본 글꼴 설정 : Name 글꼴 Bold 굵기 Italic  기울림 size 글자 크기 UnderLine 밑줄 "None | Single | Double" Strikethrough 취소선 Superscript 속성은 위 첨자 사용 여부 Subscript 속성은 아래 첨자 사용 여부 Color 글자색상 -->
</PageSet>
    <%
    	if(colwidth1 > 0 && colwidth2 >0){
    		if(colwidth1 > colwidth2){
    			int t = colwidth1;
    			colwidth2 = colwidth1;
    			colwidth2 = t;
    		}
    %>    
    		<ColumnWidth Col1='<%=colwidth1 %>'  Col2='<%=colwidth2 %>' ><%=width %></ColumnWidth>
    <%
    	}
    %>
    
    <%
    	if(rowheight1 > 0 && rowheight2 >0){
    		if(rowheight1 > rowheight2){
    			int t = rowheight1;
    			rowheight2 = rowheight1;
    			rowheight2 = t;
    		}
    %>    
    		<RowHeight Row1='<%=rowheight1 %>'  Row2='<%=rowheight2 %>' ><%=height %></RowHeight>
    <%
    	}
    %>

<CustomHeader>
    <LeftSection>
        <Font Name='궁서체' Size='13' /><!-- Strikethrough='True' Superscript='False' Subscript='False' 지원안함 -->
          System.out.println(new String(request.getParameter("headerleft").getBytes("8859_1"), "utf8"));
        <InputText><![CDATA[<%=new String(request.getParameter("headerleft").getBytes("8859_1"), "utf8")%>]]></InputText>
    </LeftSection>
    <CenterSection>
        <Font Name='굴림체' Size='10'/> 
        <InputText><![CDATA[<%=new String(request.getParameter("headercenter").getBytes("8859_1"), "utf8")%>]]></InputText>
    </CenterSection>
    <RightSection>
        <Font Name='맑은 고딕' Size='11'/>
        <InputText><![CDATA[<%=new String(request.getParameter("headerright").getBytes("8859_1"), "utf8")%>]]></InputText>
    </RightSection>
</CustomHeader>
<CustomFooter>
    <LeftSection>
        <Font Name='궁서체' Size='11'  /><!-- Strikethrough='True' Superscript='False' Subscript='False' 지원안함 -->
        <InputText><![CDATA[<%=new String(request.getParameter("footerleft").getBytes("8859_1"), "utf8")%>]]></InputText>
    </LeftSection>
    <CenterSection>
        <Font Name='굴림체' Size='10'/> 
        <InputText><![CDATA[<%=new String(request.getParameter("footercenter").getBytes("8859_1"), "utf8")%>]]></InputText>
    </CenterSection>
    <RightSection>
        <Font Name='맑은 고딕' Size='11'/>
        <InputText><![CDATA[<%=new String(request.getParameter("footerright").getBytes("8859_1"), "utf8")%>]]></InputText>
    </RightSection>
</CustomFooter>
</Excel>