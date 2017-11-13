<%@page contentType="text/html;charset=utf-8"%>
<%@page import="egovframework.tax.comm.web.CommonSessionCookie"%>
<% 
String _emplNumb = (String)CommonSessionCookie.getSessionAttribute(request, "_empl_numb");
String _emplName = (String)CommonSessionCookie.getSessionAttribute(request, "_empl_name");
%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>AdminLTE 2 | Dashboard</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../../bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="../../bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../../dist/css/AdminLTE.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../../dist/css/skins/_all-skins.min.css">
  <!-- Morris chart -->
  <link rel="stylesheet" href="../../bower_components/morris.js/morris.css">
  <!-- jvectormap -->
  <link rel="stylesheet" href="../../bower_components/jvectormap/jquery-jvectormap.css">
  <!-- Date Picker -->
  <link rel="stylesheet" href="../../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="../../bower_components/bootstrap-daterangepicker/daterangepicker.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="../../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Google Font -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
  <!-- iframe height 100% -->
  <link rel="stylesheet" href="../../common/css/iframe.css">
  <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
  
  <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/ax5ui/ax5ui-grid/master/dist/ax5grid.css">
  <script type="text/javascript" src="https://cdn.rawgit.com/ax5ui/ax5core/master/dist/ax5core.min.js"></script>
  <script type="text/javascript" src="https://cdn.rawgit.com/ax5ui/ax5ui-grid/master/dist/ax5grid.min.js"></script>  
  
</head>  
<script type="text/javascript">
    $(document.body).ready(function () {
        var firstGrid = new ax5.ui.grid();
 
        firstGrid.setConfig({
            target: $('[data-ax5grid="first-grid"]'),
            columns: [
                {key: "a", label: "상태", width: 80},
                {key: "b", label: "삭제", width: 80},
                {key: "c", label: "사원번호", width: 150, sortable: true, align: "center"},
                {key: "d", label: "사원명", width: 150},
                {key: "e", label: "사용자ID", width: 150},
                {key: "f", label: "비밀번호", width: 150},
                {key: "g", label: "근무여부", width: 150},
                {key: "h", label: "부서코드", width: 150},
                {key: "i", label: "부서명", width: 150}
            ]
        });
 
        var gridList = {a: "A", b: "A01", c:"C", d:"D", e:"E", f:"F", g:"G"};
        // 값이 없는 h 는 표현안됨
        firstGrid.setData(gridList);
        // 그리드 데이터 가져오기
        
/*  		$(".box-body > button").click(function(){
			var button = $(this).attr("data-target");
			var queryString = $("form[name=frm]").serialize();
			
			switch(button){
				case "#modal-default":

					break;
				case "#modal-info":
			
					break;			
				case "#modal-danger":
			        $.ajax({
			            method: "POST",
			            data: queryString,
			            url: "/tax/ksys/syia030_Select.do",
			            success: function (res) {
			                firstGrid.setData(res);
			            }
			        });							
				 	break;	
				case "#modal-success":
					
					break;								
			}
		}); */ 		        

    });
</script>
<body class="hold-transition skin-blue sidebar-mini">

	<div class="content-wrapper">
	  <!-- Content Header (Page header) -->
	  <section class="content-header">
	    <h1>
	                사용자 등록
	      <!-- <small>advanced tables</small> --> 
	    </h1>
	    <!--
	    <ol class="breadcrumb">
	      <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
	      <li><a href="#">Tables</a></li>
	      <li class="active">Data tables</li>
	    </ol>  
	    -->
	  </section>
	 
	  <!-- Main content -->
	  <section class="content">
	    <div class="row">
	      <div class="col-xs-12">
	      
	        <div class="box">        
	          <div class="box-body">
	              <button type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-default">
	              <i class="fa fa-refresh"></i> 초기화 </button>
	              <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modal-info">
	              <i class="fa fa-plus"></i> 입력 </button>
	              <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-danger">
	              <i class="fa fa-search"></i> 조회 </button>
	              <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modal-success">
	              <i class="fa fa-floppy-o"></i> 저장 </button>
	          </div>        
	          <!-- /.box-body -->
	        </div>
	        <!-- /.box -->
	        
          <div class="box">
            <form name="frm">
            <div class="box-header">
                <table class="table table-bordered text-center">
                	<tr>
	                	<th class="tit">부서</td>
	                	<td class="r20">
	                	<select id="frm_SearchDepa" name="frm_SearchDepa" style="width:200px;" class="selectbox" >
	                		<option value="">전체부서</option>
	                		${depaSele}
	                	</select>
	                	</td>	
	                	<th class="tit">사원번호</th>
	                	<td class="r20">
	                		<input type="text" id="frm_SearchEmpl" name="frm_SearchEmpl" value="" style="width:100px;text-align:center;" class="inputbox"/>
	                		<input type="text" id="frm_SearchName" name="frm_SearchName" value="" style="width:100px;text-align:left;" class="inputbox"/>
	                		<img style="CURSOR:hand;vertical-align:middle;" src="/image/b_find_d.gif" onClick="__GetCallEmpl('frm_SearchEmpl','frm_SearchName');">
	                	</td>			
                	</tr>
                	<input type="hidden" id="frm_wPlac" name="frm_wPlac" value="${wPlac}">
                </table>
            </div>
            </form>
            <!-- /.box-header -->
            <div class="box-body">
	          <div style="position:relative; height:500px;" id="grid-parent">
				<div data-ax5grid="first-grid" 
					data-ax5grid-config="{}" 
					style="height:100%;">
				</div>
			  </div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->	        
	        
	      </div>
	      <!-- /.col -->
	    </div>
	    <!-- /.row -->
	  </section>
	  <!-- /.content -->
	</div>

<!-- jQuery 3 -->
<script src="../../bower_components/jquery/dist/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="../../bower_components/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<!-- Bootstrap 3.3.7 -->
<script src="../../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- Morris.js charts -->
<script src="../../bower_components/raphael/raphael.min.js"></script>
<script src="../../bower_components/morris.js/morris.min.js"></script>
<!-- Sparkline -->
<script src="../../bower_components/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
<!-- jvectormap -->
<script src="../../plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="../../plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<!-- jQuery Knob Chart -->
<script src="../../bower_components/jquery-knob/dist/jquery.knob.min.js"></script>
<!-- daterangepicker -->
<script src="../../bower_components/moment/min/moment.min.js"></script>
<script src="bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
<!-- datepicker -->
<script src="../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="../../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
<script src="../../bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="../../bower_components/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../../dist/js/adminlte.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="../../dist/js/pages/dashboard.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="../../dist/js/demo.js"></script>
</body>	  