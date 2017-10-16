<%@page import="egovframework.tax.comm.web.CommonSessionCookie"%>
<% 
String _emplName = (String)CommonSessionCookie.getSessionAttribute(request, "_empl_name");
%>
<%@page contentType="text/html;charset=utf-8"%>
<script type="text/javascript" src="/common/jquery/js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="/common/js/etc.js"></script>
<script type="text/javascript">

	function goMenu(obj) {
		document.menuForm.sysGubn.value = obj;
		document.menuForm.submit();
	}

	function logOut() {

		if(confirm("로그 아웃 하시겠습니까?")) {		
			//window.open('about:blank','_self').close();

			document.menuForm.action = "/tax/logout.do";
			document.menuForm.submit();
		}
	}
	
	function MM_preloadImages() { //v3.0
	  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
	}

	function MM_swapImgRestore() { //v3.0
	  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
	}

	function MM_findObj(n, d) { //v4.01
	  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	  if(!x && d.getElementById) x=d.getElementById(n); return x;
	}

	function MM_swapImage() { //v3.0
	  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
	}
	 	
	var toggle_tcnt = 0;
	function topMenuToggle() { 
		toggle_tcnt++;
		if(toggle_tcnt % 2 == 0) {
			$("#contactArea").animate({height: "69px"}, {queue:false, duration: 1000, easing: 'swing'});
			$(".top_show_close").animate({top: "50px"}, {queue:false, duration: 1000, easing: 'swing'});
			$("#top_open_close").attr("src","/image/btn_close_top.gif");
		} else {
			$("#contactArea").animate({height: "15px"}, {queue:false, duration: 1000, easing: 'swing'});
			$(".top_show_close").animate({top: "0px"}, {queue:false, duration: 1000, easing: 'swing'});				
			$("#top_open_close").attr("src","/image/btn_show_top.gif");
		}
		
	    setTimeout( function() {
	    	i_content.smartsheetsize(1);
	    }, 600); 
		 
	}
	
</script>

<body onload="MM_preloadImages('/image/menu_01_ov.gif','/image/menu_02_ov.gif','/image/menu_03_ov.gif','/image/menu_04_ov.gif','/image/menu_05_ov.gif','/image/menu_06_ov.gif','/image/menu_07_ov.gif','/image/menu_08_ov.gif','/image/menu_09_ov.gif')" >
	<div id="contactArea" class="layout_top">
		<div class="toplogo"><a href="#"><img src="/image/top_logo.png" /></a></div>
		<div class="head">
		  <div id="topmenu_2">
		      <ul>
	             <!-- li ><a href="javascript:goMenu('13')" ><img src="/image/menu_01.gif" id="Image5" onmouseover="MM_swapImage('Image5','','/image/menu_01_ov.gif',1)" onmouseout="MM_swapImgRestore()" /></a></li -->  
	             <li ><a href="javascript:goMenu('07')" ><img src="/image/menu_02.gif" id="Image6" onmouseover="MM_swapImage('Image6','','/image/menu_02_ov.gif',1)" onmouseout="MM_swapImgRestore()" /></a></li>   
	             <li ><a href="javascript:goMenu('04')" ><img src="/image/menu_03.gif" id="Image7" onmouseover="MM_swapImage('Image7','','/image/menu_03_ov.gif',1)" onmouseout="MM_swapImgRestore()" /></a></li>   
	             <li ><a href="javascript:goMenu('06')" ><img src="/image/menu_04.gif" id="Image8" onmouseover="MM_swapImage('Image8','','/image/menu_04_ov.gif',1)" onmouseout="MM_swapImgRestore()" /></a></li>   
				 <li ><a href="javascript:goMenu('05')" ><img src="/image/menu_05.gif" id="Image9" onmouseover="MM_swapImage('Image9','','/image/menu_05_ov.gif',1)" onmouseout="MM_swapImgRestore()" /></a></li>   
	             <li ><a href="javascript:goMenu('01')" ><img src="/image/menu_06.gif" id="Image10" onmouseover="MM_swapImage('Image10','','/image/menu_06_ov.gif',1)" onmouseout="MM_swapImgRestore()" /></a></li>    
	             <!-- li ><a href="javascript:goMenu('12')" ><img src="/image/menu_07.gif" id="Image11" onmouseover="MM_swapImage('Image11','','/image/menu_07_ov.gif',1)" onmouseout="MM_swapImgRestore()" /></a></li -->
	             <li ><a href="javascript:goMenu('02')" ><img src="/image/menu_08.gif" id="Image12" onmouseover="MM_swapImage('Image12','','/image/menu_08_ov.gif',1)" onmouseout="MM_swapImgRestore()" /></a></li>
			     <li ><a href="javascript:goMenu('11')" ><img src="/image/menu_09.gif" id="Image13" onmouseover="MM_swapImage('Image13','','/image/menu_09_ov.gif',1)" onmouseout="MM_swapImgRestore()" /></a></li> 
	             <li ><div class="top_show_close"><a href="#" onClick="topMenuToggle();" ><img id="top_open_close" src="/image/btn_close_top.gif"  /></a></div>	
	             </li> 
		      </ul>                
		 </div>
		</div>
		<div id="subtop_message" >
			<span class="logout"><a href="javascript:logOut()">로그아웃</a></span>
			<!-- span class="login_name"><%=_emplName %>님 로그인 중</span -->
		</div>
	</div>
	
	<form name="menuForm" method="post" action="/tax/index.do" target="_self">
		<input type="hidden" name="sysGubn" value="" />
		<input type="hidden" name="bsgbGubn" value="" />
		<input type="hidden" name="wplaGubn" value="" />
    </form>	
</body>