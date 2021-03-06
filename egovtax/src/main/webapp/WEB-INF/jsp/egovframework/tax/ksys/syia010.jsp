<%@page contentType="text/html;charset=utf-8"%>
<!DOCTYPE html>
<html>
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
  <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
</head>
<script type="text/javascript">
	$(document).ready(function(){
		var sub_active = "${menuSelect}";
		
		if ($('#'+sub_active).length){
			$('#'+sub_active).parent().parent().parent().attr("class","treeview active menu-open");			
			$('#'+sub_active).parent().attr("class","active");
		}
		
    });
</script>

<body class="hold-transition skin-blue sidebar-mini">
 <div class="wrapper">
  <!-- 탑메뉴 S -->
  <jsp:include page="../inc/topmenu.jsp" />
  <!-- 탑메뉴 E -->	
  <!-- Left side column. contains the logo and sidebar -->
  <!-- 왼쪽메뉴 S -->
  <jsp:include page="../inc/sidemenu.jsp" />
  <!-- 왼쪽메뉴 E -->
  <!-- 메인메뉴 S -->
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>통합코드 등록</h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Tables</a></li>
        <li class="active">Data tables</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div id="row">
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
      </div>
      
      <div class="box">
        <form name="frm">
        <div class="box-header">
            <table class="table table-bordered text-center">
            	<tr>
             	<th class="tit">부서</td>
             	<td class="r20">
             	<select id="frm_SearchDepa" name="frm_SearchDepa" style="width:200px;" class="selectbox" >
             		<option value="">전체부서</option>
             		${depaSele};
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
      </div>   
      
      
    </section>
    <!-- /.content -->
    
  </div>
  <!-- /.content-wrapper -->
  <jsp:include page="../inc/footer.jsp" />
  <!-- 하단메뉴 E -->
  <!-- Add the sidebar's background. This div must be placed immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->

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
<!-- Sparkline -->
<script src="../../bower_components/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
<!-- jvectormap -->
<script src="../../plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="../../plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<!-- jQuery Knob Chart -->
<script src="../../bower_components/jquery-knob/dist/jquery.knob.min.js"></script>
<!-- daterangepicker -->
<script src="../../bower_components/moment/min/moment.min.js"></script>
<script src="../../bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
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
<!-- AdminLTE for demo purposes -->
<script src="../../dist/js/demo.js"></script>
</body>