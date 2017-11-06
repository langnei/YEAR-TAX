<%@page contentType="text/html;charset=utf-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<!--<meta name="viewport" content="width=1024, user-scalable=no">-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
<title>학교안전공제회MIS</title>
<link rel="stylesheet" href="/common/css/style.css"/>
<script type="text/javascript" src="/common/js/public.js"></script>
<script type="text/javascript" src="/common/js/commonFunc.js" charset='utf-8'></script>
<script type="text/javascript" src='/common/js/ibleaders.js' charset='utf-8'></script>
<script src="/sheet/sheet/ibsheetinfo.js" type="text/javascript"></script>
<script src="/sheet/sheet/ibsheet.js" type="text/javascript"></script>
</head>
<script type="text/javascript">
	var data = ${menuStr};	
	
	$(document).ready(function(){

		createIBSheet2(document.getElementById("ibsheet1"),"mySheet","236px","500px");
		
		mySheet.SetTheme("LGY2","LightGray2");
		var ibdata = {};
		ibdata.Cfg = {SizeMode:sizeNoVScroll};
		ibdata.HeaderMode = {};
		ibdata.Cols = [
			{Header:"타이틀",Type:"Text",SaveName:"TITLE",TreeCol:1,Width:190,Edit:0,ImgWidth:18,ImgHeight:18},			
			{Header:"URL",Type:"Text",SaveName:"URL",Hidden:1},
			{Header:"이미지",Type:"Image",SaveName:"POPYN",Width:18,Align:"Center"}
		];
		
		IBS_InitSheet(mySheet,ibdata);
		
		mySheet.SetExtendLastCol(1);
		mySheet.SetRowHidden(0,1);
		mySheet.SetWaitImageVisible(0);
		mySheet.SetFocusAfterProcess(0);
		
		mySheet.SetImageList(0,"/image/folder.gif");
		mySheet.SetImageList(1,"/image/folderopen.gif");
		mySheet.SetImageList(2,"/image/leaf.gif");
		mySheet.SetImageList(3,"/image/popup.gif");

		mySheet.LoadSearchData(data);
			
	});

	function mySheet_OnSelectCell(or,oc,nr,nc){
		if(or>0){
			mySheet.SetCellFontBold(or,oc,0);
		}
		mySheet.SetCellFontBold(nr,nc,1);
	
		if(or == -1) {
			document.getElementById("i_content").src = "/firstPage.jsp";
		} else {
			if(nc == 0 && mySheet.GetCellValue(nr,"URL")!=""){
				document.getElementById("i_content").src = mySheet.GetCellValue(nr,"URL");
			} else if(nc == 2 && mySheet.GetCellValue(nr,"URL")!=""){
				__fncMenuPopup(mySheet.GetCellValue(mySheet.MouseRow(),"URL"));
			}
		}
	}
	
	function mySheet_OnClick(r,c,v){

		if(mySheet.IsHaveChild(r)){
			mySheet.SetRowExpanded(r,  !(mySheet.GetRowExpanded(r)));
		}
	}
		 
	function mySheet_OnAfterExpand(Row, Expand) { 
		
		mySheet.SetCellImage(Row, "TITLE",Expand==0?1:0  );	
	}
	
	function mySheet_OnSearchEnd(code,msg){
		mySheet.SelectCell(1,"TITLE");

		mySheet.SetColProperty(1,"TITLE",{Width:210});
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

<body scroll="no" style="overflow: hidden">
	<jsp:include page="/topmenu.jsp" />
	
	<div class="layout_middle">	

		<div class="bg_sub" id="navigation">
			<div class="btn_show_close_left"><a href="#" onClick="leftMenuToggle();" ><img id="left_open_close" src="/image/btn_close_left.gif" /></a></div>
			<div id="leftmenu">
		
			<div class="btn_remote_assist">
				<a href="http://helpu.kr/msis" target="_blank" ><img src="/image/remote_assist.gif" /></a>
			</div>
			
			<div class="btn_open_close">
				<a href="#" onclick="doAction('fold')"><img src="/image/btn_open.gif" /></a><a href="#" onclick="doAction('expand')"><img src="/image/btn_close.gif" /></a>
			</div>
		
			<div class="depth2_box" id="menu_id">
				<div class="depth2">
					<p>공통관리</p>
					<!--slidetree-->
				</div>
			<!--depth2-->
			</div><!--2depth-->		
		
			<div class="treemenu" id="ibsheet1" ></div>
			</div><!--//leftmenu-->	
	 	</div>
		<!--//navigation-->
	
		<div id="content">
			<iframe frameborder=0 src="" width="100%" height="100%" name="i_content" id="i_content"  scrolling="auto" ></iframe>
		</div>
		
	</div>
</body>
</html>