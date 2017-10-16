<%@page contentType="text/html;charset=utf-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<!--<meta name="viewport" content="width=1024, user-scalable=no">-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
<title>IBSheet7-Product</title>
<link rel="stylesheet" href="../common/css/style.css"/>
<script src="../common/js/public.js" type="text/javascript"></script>
<script src="./sheet/ibsheetinfo.js" type="text/javascript"></script>
<script src="./sheet/ibsheet.js" type="text/javascript"></script>
<script type="text/javascript">

	
	
	var data = {Data:[
{Level:0,"TITLE#Image":1,TITLE:"기본기능"},
{Level:1,"TITLE#Image":2,URL:"01/transaction.html",TITLE:"트랜젝션관리"},
{Level:1,"TITLE#Image":2,URL:"01/datatype.html", TITLE:"데이터타입/포멧"},
{Level:1,"TITLE#Image":2,URL:"01/multiline.html", TITLE:"다중라인레코드"},
{Level:0,"TITLE#Image":0,Expand:0,TITLE:"헤더(Header) 기능",FontColor:"#232323"},
{Level:1,"TITLE#Image":2,URL:"02/header.html", TITLE:"헤더일반기능 "},
{Level:1,"TITLE#Image":2,URL:"02/filter.html", TITLE:"필터(Filter) "},
{Level:0,"TITLE#Image":0,Expand:0,TITLE:"숫자 연산 기능",FontColor:"#232323"},
{Level:1,"TITLE#Image":2,URL:"03/sum.html", TITLE:"합계/소계"},
{Level:1,"TITLE#Image":2,URL:"03/pivot.html", TITLE:"피벗/크로스테이블"},
{Level:1,"TITLE#Image":2,URL:"03/group.html", TITLE:"그룹기능"},
{Level:0,"TITLE#Image":0,Expand:0,TITLE:"행열 기능",FontColor:"#232323"},
{Level:1,"TITLE#Image":2,URL:"04/edit.html", TITLE:"편집기능"},
{Level:1,"TITLE#Image":2,URL:"04/hidden.html", TITLE:"숨김기능"},
{Level:0,"TITLE#Image":0,Expand:0,TITLE:"머지(Merge) 기능",FontColor:"#232323"},
{Level:1,"TITLE#Image":2,URL:"05/merge.html", TITLE:"기본기능"},
{Level:0,"TITLE#Image":0,Expand:0,TITLE:"테마 기능",FontColor:"#232323"},
{Level:1,"TITLE#Image":2,URL:"06/Theme.html", TITLE:"기본기능"},
{Level:0,"TITLE#Image":0,Expand:0,TITLE:"트리(Tree)기능",FontColor:"#232323"},
{Level:1,"TITLE#Image":2,URL:"07/tree.html", TITLE:"트리 일반"},
{Level:1,"TITLE#Image":2,URL:"07/append_tree.html", TITLE:"동적확장 트리"},
{Level:1,"TITLE#Image":2,URL:"07/tree_subsum.html", TITLE:"트리소계"},
{Level:0,"TITLE#Image":0,Expand:0,TITLE:"저장",FontColor:"#232323"},
{Level:1,"TITLE#Image":2,URL:"08/save.html", TITLE:"저장동작방식"},
{Level:1,"TITLE#Image":2,URL:"08/multisave.html", TITLE:"동시저장"},
{Level:0,"TITLE#Image":0,Expand:0,TITLE:"이벤트(Event)",FontColor:"#232323"},
{Level:1,"TITLE#Image":2,URL:"09/event.html", TITLE:"다양한 이벤트"},
{Level:0,"TITLE#Image":0,Expand:0,TITLE:"import/export 기능",FontColor:"#232323"},
{Level:1,"TITLE#Image":2,URL:"11/excel.html", TITLE:"엑셀 연동"},
{Level:1,"TITLE#Image":2,URL:"11/excelReport1.html", TITLE:"엑셀리포트 "},
{Level:1,"TITLE#Image":2,URL:"11/excelReport2.html", TITLE:"엑셀리포트(패턴)"},
{Level:1,"TITLE#Image":2,URL:"11/text.html", TITLE:"텍스트 다운"},
{Level:1,"TITLE#Image":2,URL:"11/pdf.html", TITLE:"pdf 다운"},
{Level:0,"TITLE#Image":0,Expand:0,TITLE:"데이터 조회",FontColor:"#232323"},
{Level:1,"TITLE#Image":2,URL:"13_search/pagingsearch.html", TITLE:"페이징조회 "},
{Level:1,"TITLE#Image":2,URL:"13_search/lazyload.html", TITLE:"LazyLoad조회 "},
{Level:1,"TITLE#Image":2,URL:"13_search/serverpaging.html", TITLE:"대용량 조회"},
//{Level:1,"TITLE#Image":2,URL:"13_search/speedtest_employees.html", TITLE:"조회속도"},
{Level:1,"TITLE#Image":2,URL:"14_DataMove/cell_move.html", TITLE:"셀단위 데이터 이동"},
{Level:1,"TITLE#Image":2,URL:"14_DataMove/tree_move.html", TITLE:"트리 데이터 이동"},
{Level:0,"TITLE#Image":0,Expand:0,TITLE:"기타 기능",FontColor:"#232323"},
{Level:1,"TITLE#Image":2,URL:"12/wizard.html", TITLE:"위자드"}
]};

	$(document).ready(function(){
		
		
		
	createIBSheet2(document.getElementById("ibsheet1"),"mySheet","100%","500px");
	
	mySheet.SetTheme("LGY2","LightGray2");
	var ibdata = {};
	ibdata.Cfg = {SizeMode:sizeNoVScroll};
	ibdata.HeaderMode = {};
	ibdata.Cols = [
		{Header:"타이틀",Type:"Text",SaveName:"TITLE",TreeCol:1,Edit:0,ImgWidth:18,ImgHeight:18},
		{Header:"URL",Type:"Text",SaveName:"URL",Hidden:1}
	];
	IBS_InitSheet(mySheet,ibdata);
	mySheet.SetExtendLastCol(1);
	mySheet.SetRowHidden(0,1);
	mySheet.SetWaitImageVisible(0);
	mySheet.SetFocusAfterProcess(0);
//	mySheet.SetImageList(0,"./image/folder_close.gif");
//	mySheet.SetImageList(1,"./image/folder_open.gif");
//	mySheet.SetImageList(2,"./image/file.gif");
	
	mySheet.SetImageList(0,"./image/folder.gif");
	mySheet.SetImageList(1,"./image/folderopen.gif");
	mySheet.SetImageList(2,"./image/leaf.gif");
	
	mySheet.LoadSearchData(data);
	
//	resizeWork();
	
	
	
	
});
//$(window).bind( 'resize', resizeWork);	
//
//function resizeWork(){
//	var p = $("#navigation	").position();
//	var wh = $(window).height();
//	var hh = wh-p.top;
//	$("#navigation").css("height", hh);
//	$("#content").height(hh);	
//}


function mySheet_OnSelectCell(or,oc,nr,nc){
	if(or>0){
		mySheet.SetCellFontBold(or,oc,0);
	}
	mySheet.SetCellFontBold(nr,nc,1);
	if(mySheet.GetCellValue(nr,"URL")!=""){
			document.getElementById("i_content").src = mySheet.GetCellValue(nr,"URL");
	}
}

function mySheet_OnClick(r,c,v){
	if(mySheet.IsHaveChild(r)){
		mySheet.SetRowExpanded(r  ,  !(mySheet.GetRowExpanded(r)));

		
	}
}
function mySheet_OnAfterExpand(Row, Expand) { 
	
	mySheet.SetCellImage(Row, "TITLE",Expand==0?1:0  );	
}

function mySheet_OnSearchEnd(code,msg){
	mySheet.SelectCell(2,"TITLE");	
}

function doAction(str){
		
	switch(str){
		case 'fold':
		mySheet.ShowTreeLevel(0);
		break;
		case 'expand':
			mySheet.ShowTreeLevel(-1);
		break;	
		
	}	
	
}

</script>

	
</head>

<body scroll="no" style="overflow: hidden">
	<jsp:include page="../topmenu.jsp" />
	
	
	<div id="navigation" class="bg_sub">
		<div id="leftmenu">
		
			<jsp:include page="../leftmenu.jsp" />
			<div class="depth2_box"  id="menu_id">
				<div class="depth2">
					<h2>Sheet</h2>
					<div id="sidetree">
						<div id="sidetreecontrol"  class="function"><a href="#" onclick="doAction('fold')">+ 접기</a>  <a href="#" onclick="doAction('expand')">- 풀기</a></div>
						<div id="ibsheet1"></div>
					</div>
				<!--slidetree-->
				</div>
				<!--depth2-->
			</div>
			<!--2depth-->
		</div>
		<!--//leftmenu-->
	</div>
	<!--//navigation-->
	
	<div id="content">
		<iframe frameborder=0 src="" width="100%" height="100%" name="i_content" id="i_content"  scrolling="auto" ></iframe>
	</div>


</body>
</html>




