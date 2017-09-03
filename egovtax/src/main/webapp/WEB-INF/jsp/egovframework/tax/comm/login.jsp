<%@page contentType="text/html;charset=utf-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<!--<meta name="viewport" content="width=1024, user-scalable=no">-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
<title>로그인</title>
<jsp:include page="/common/jsp/include_head.jsp" />
</head>
<script language="javascript"> 
	
	$(document).ready(function(){
		
		var result = "${result}";
		if(result == "nodata") alert("아이디나 패스워드를 잘 못 입력하셨습니다.");
		if(result == "logout") alert("로그아웃 처리 되었습니다. 다시 로그인 하세요.");
	});

</script>
<body style="background-image: url(/image/login_top_bg.gif);	background-repeat: repeat-x;">
<div class="login_top" style="background: url(/image/login_top.gif) center top no-repeat;">
</div>
<div class="login_wrap">
	<div class="login_title">
		<img src="/image/login_title.png" />
	</div>
	<div class="login_box" style="background:url(/image/login_center.jpg) no-repeat;"> 
		<div class="login_input">
			<form name="loginForm" action="/tax/loginCheck.do" method="post" onsubmit="return fn_login_user('loginForm')">
		  	<table width="255px;" height="60px" border="0" cellpadding="0" cellspacing="0">
		    	<tr>
		      		<td width="130px" height="60px">
		      			<div style="padding-bottom: 6px;"><input type="text" value="" name="USER_ID" id="input_id" class="normal" style="width:140px;"/></div>
		      			<div><input type="password" value="" name="USER_PASSWORD" id="input_pw" class="normal" style="width:140px;"/></div>
		      		</td>
		      		<td width="88px" style="padding-top: 3px;"><input type="image" src="/image/login_btn.gif" style="cursor: hand;"></td>
		    	</tr>
		  	</table>
		  	</form>
		</div>
	</div>
</div>

</body>
</html>
