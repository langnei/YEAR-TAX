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
<%
	String standardCol       =  ifNull((String)request.getParameter("standardCol"));
	String standardtext      =  new String(request.getParameter("standardtext").getBytes("8859_1"), "utf8");
	String col1              =  ifNull((String)request.getParameter("col1"));
	String col2              =  ifNull((String)request.getParameter("col2"));
	String fontname      =  ((String)request.getParameter("fontname"));
	String fontcolor1        =  ifNull((String)request.getParameter("fontcolor1"));
	String fontcolor2        =  ifNull((String)request.getParameter("fontcolor2"));
	String fontcolor3        =  ifNull((String)request.getParameter("fontcolor3"));
	String backcolor1        =  ifNull((String)request.getParameter("backcolor1"));
	String backcolor2        =  ifNull((String)request.getParameter("backcolor2"));
	String backcolor3        =  ifNull((String)request.getParameter("backcolor3"));
	String cellpattern       =  ((String)request.getParameter("cellpattern"));
	String patterncolor1     =  ifNull((String)request.getParameter("patterncolor1"));
	String patterncolor2     =  ifNull((String)request.getParameter("patterncolor2"));
	String patterncolor3     =  ifNull((String)request.getParameter("patterncolor3"));
	String upstyle           =  ((String)request.getParameter("upstyle"));
	String uplinestyle       =  ((String)request.getParameter("uplinestyle"));
	String uplinecolor1      =  ifNull((String)request.getParameter("uplinecolor1"));
	String uplinecolor2      =  ifNull((String)request.getParameter("uplinecolor2"));
	String uplinecolor3      =  ifNull((String)request.getParameter("uplinecolor3"));
	String downwstyle        =  ((String)request.getParameter("downwstyle"));
	String downwlinestyle    =  ((String)request.getParameter("downwlinestyle"));
	String downwlinecolor1   =  ifNull((String)request.getParameter("downwlinecolor1"));
	String downwlinecolor2   =  ifNull((String)request.getParameter("downwlinecolor2"));
	String downwlinecolor3   =  ifNull((String)request.getParameter("downwlinecolor3"));
	String leftstyle         =  ((String)request.getParameter("leftstyle"));
	String leftlinestyle     =  ((String)request.getParameter("leftlinestyle"));
	String leftlinecolor1    =  ifNull((String)request.getParameter("leftlinecolor1"));
	String leftlinecolor2    =  ifNull((String)request.getParameter("leftlinecolor2"));
	String leftlinecolor3    =  ifNull((String)request.getParameter("leftlinecolor3"));
	String rightwstyle       =  ((String)request.getParameter("rightwstyle"));
	String rightwlinestyle   =  ((String)request.getParameter("rightwlinestyle"));
	String rightwlinecolor1  =  ifNull((String)request.getParameter("rightwlinecolor1"));
	String rightwlinecolor2  =  ifNull((String)request.getParameter("rightwlinecolor2"));
	String rightwlinecolor3  =  ifNull((String)request.getParameter("rightwlinecolor3"));
	String labeltxt_1        =  new String(request.getParameter("labeltxt_1").getBytes("8859_1"), "utf8");
	String row1_1            =  ifNull((String)request.getParameter("row1_1"));
	String col1_1            =  ifNull((String)request.getParameter("col1_1"));
	String row2_1            =  ifNull((String)request.getParameter("row2_1"));
	String col2_1            =  ifNull((String)request.getParameter("col2_1"));
	String rowheight_1       =  ifNull((String)request.getParameter("rowheight_1"));
	String merge_1           =  ((String)request.getParameter("merge_1"));
	String horizontal_1      =  ((String)request.getParameter("horizontal_1"));
	String vertical_1        =  ((String)request.getParameter("vertical_1"));
	String backcolor_L1_1    =  ifNull((String)request.getParameter("backcolor_L1_1"));
	String backcolor_L2_1    =  ifNull((String)request.getParameter("backcolor_L2_1"));
	String backcolor_L3_1    =  ifNull((String)request.getParameter("backcolor_L3_1"));
	String labelpattern_1    =  ((String)request.getParameter("labelpattern_1"));
	String patterncolor_L1_1 =  ifNull((String)request.getParameter("patterncolor_L1_1"));
	String patterncolor_L2_1 =  ifNull((String)request.getParameter("patterncolor_L2_1"));
	String patterncolor_L3_1 =  ifNull((String)request.getParameter("patterncolor_L3_1"));
	String labeltxt_2        =   new String(request.getParameter("labeltxt_2").getBytes("8859_1"), "utf8");
	String row1_2            =  ifNull((String)request.getParameter("row1_2"));
	String col1_2            =  ifNull((String)request.getParameter("col1_2"));
	String row2_2            =  ifNull((String)request.getParameter("row2_2"));
	String col2_2            =  ifNull((String)request.getParameter("col2_2"));
	String rowheight_2       =  ifNull((String)request.getParameter("rowheight_2"));
	String merge_2           =  ((String)request.getParameter("merge_2"));
	String horizontal_2      =  ((String)request.getParameter("horizontal_2"));
	String vertical_2        =  ((String)request.getParameter("vertical_2"));
	String backcolor_L1_2    =  ifNull((String)request.getParameter("backcolor_L1_2"));
	String backcolor_L2_2    =  ifNull((String)request.getParameter("backcolor_L2_2"));
	String backcolor_L3_2    =  ifNull((String)request.getParameter("backcolor_L3_2"));
	String labelpattern_2    =  ((String)request.getParameter("labelpattern_2"));
	String patterncolor_L1_2 =  ifNull((String)request.getParameter("patterncolor_L1_2"));
	String patterncolor_L2_2 =  ifNull((String)request.getParameter("patterncolor_L2_2"));
	String patterncolor_L3_2 =  ifNull((String)request.getParameter("patterncolor_L3_2"));
	String merge_L1          =  ((String)request.getParameter("merge_L1"));
	String merge_L2          =  ((String)request.getParameter("merge_L2"));
	String fontname_L1    = request.getParameter("fontname_L1");
	String fontcolor1_L1  = request.getParameter("fontcolor1_L1");
	String fontcolor2_L1  = request.getParameter("fontcolor2_L1");
	String fontcolor3_L1  = request.getParameter("fontcolor3_L1");
	String fontsize_L1    = request.getParameter("fontsize_L1");
	String fontname_L2    = request.getParameter("fontname_L2");
	String fontcolor1_L2  = request.getParameter("fontcolor1_L2");
	String fontcolor2_L2  = request.getParameter("fontcolor2_L2");
	String fontcolor3_L2  = request.getParameter("fontcolor3_L2");
	String fontsize_L2    = request.getParameter("fontsize_L2");

    %>
<Excel>
<IBSheetSet>
    <StartRow>5</StartRow><!-- Sheet의 데이터를 표시할 엑셀의 시작 행 위치 -->
</IBSheetSet>
<PageSet>
    <PaperSize>A4</PaperSize><!-- 엑셀의 용지 크기 설정 "A3, A4, B4, B5" -->
    <Orientation>Landscape</Orientation><!-- 엑셀의 용지 방향 설정 : 세로 "Portrait" 가로 "Landscape" -->
    <RowsRepeat Row1='1' Row2='1' /><!-- 엑셀의 반복 행 설정 : 시작 행 Row1 마지막 행 Row2 -->
    <ColsRepeat Col1='0' Col2='0' /><!-- 엑셀의 반복 컬럼 설정 : 시작 컬럼 Col1 마지막 컬럼 Col2 -->
    <DefaultRowHeight>19.5</DefaultRowHeight><!-- 엑셀의 기본 행 높이 설정 -->
    <DefaultFont Name='돋움체'  size='10'  /><!-- 엑셀의 기본 글꼴 설정 : Name 글꼴 Bold 굵기 Italic  기울림 size 글자 크기 UnderLine 밑줄 "None | Single | Double" Strikethrough 취소선 Superscript 속성은 위 첨자 사용 여부 Subscript 속성은 아래 첨자 사용 여부 Color 글자색상 -->
</PageSet>

<CustomHeader>
    <RightSection>
        <Font Name='맑은 고딕' Size='11'/>
        <InputText><![CDATA[아이비리더스]]></InputText>
    </RightSection>
</CustomHeader>
<CustomFooter>
    <CenterSection>
        <Font Name='굴림체' Size='10'/> 
        <InputText><![CDATA[&P / &N]]></InputText>
    </CenterSection>
</CustomFooter>
<DataPattern>
	<Standard SheetCol="<%=standardCol%>" Word="<%=standardtext%>">
		<Range Col1="<%=col1%>" Col2="<%=col2%>" >
			<CellFormat>
				<Font Name="<%=fontname%>" Color="<%=fontcolor1%>,<%=fontcolor2%>,<%=fontcolor3%>"/>
				<Interior Pattern="<%=cellpattern%>" PatternColor="<%=patterncolor1%>,<%=patterncolor2%>,<%=patterncolor3%>" BackColor="<%=backcolor1%>,<%=backcolor2%>,<%=backcolor3%>" />
				<Alignment Horizontal="Center" Vertical="Center"/>
			</CellFormat>
			<BorderStyle>
				<TopEdge Style="<%=upstyle%>" Weight="<%=uplinestyle%>" Color="<%=uplinecolor1%>,<%=uplinecolor2%>,<%=uplinecolor3%>" />
				<BottomEdge Style="<%=downwstyle%>" Weight="<%=downwlinestyle%>" Color="<%=downwlinecolor1%>,<%=downwlinecolor2%>,<%=downwlinecolor3%>" />
				<LeftEdge Style="<%=leftstyle%>" Weight="<%=leftlinestyle%>" Color="<%=leftlinecolor1%>,<%=leftlinecolor2%>,<%=leftlinecolor3%>" />
				<RightEdge Style="<%=rightwstyle%>" Weight="<%=rightwlinestyle%>" Color="<%=rightwlinecolor1%>,<%=rightwlinecolor2%>,<%=rightwlinecolor3%>" />
			</BorderStyle>
		</Range>
	</Standard>
</DataPattern>
<Label>
	<Range Row1='<%=row1_1%>' Col1='<%=col1_1%>' Row2='<%=row2_1%>' Col2='<%=col2_1%>' RowHeight='<%=rowheight_1%>'>
		<CellFormat>
			<Merge><%=merge_L1%></Merge>
			<Font Name='<%=fontname_L1%>'   Size='<%=fontsize_L1%>'   Color= '<%=fontcolor1_L1%>,<%=fontcolor2_L1%>,<%=fontcolor3_L1%>'  />
			<Interior BackColor='<%=backcolor_L1_1%>,<%=backcolor_L2_1%>,<%=backcolor_L3_1%>' Pattern='<%=labelpattern_1%>' PatternColor='<%=patterncolor_L1_1%>,<%=patterncolor_L2_1%>,<%=patterncolor_L3_1%>' />
			<Alignment Horizontal='<%=horizontal_1%>' Vertical='<%=vertical_1%>'/>
		</CellFormat>
		<InputText><%=labeltxt_1%></InputText>
	</Range>
	<Range Row1='<%=row1_2%>' Col1='<%=col1_2%>' Row2='<%=row2_2%>' Col2='<%=col2_2%>' RowHeight='<%=rowheight_2%>'>
		<CellFormat>
			<Merge><%=merge_L2%></Merge>
			<Font Name='<%=fontname_L2%>'   Size='<%=fontsize_L2%>'   Color= '<%=fontcolor1_L2%>,<%=fontcolor2_L2%>,<%=fontcolor3_L2%>'  />
			<Interior BackColor='<%=backcolor_L1_2%>,<%=backcolor_L2_2%>,<%=backcolor_L3_2%>' Pattern='<%=labelpattern_2%>' PatternColor='<%=patterncolor_L1_2%>,<%=patterncolor_L2_2%>,<%=patterncolor_L3_2%>' />
			<Alignment Horizontal='<%=horizontal_2%>' Vertical='<%=vertical_2%>'/>
		</CellFormat>
		<InputText><%=labeltxt_2%></InputText>
	</Range>
</Label>
</Excel>
