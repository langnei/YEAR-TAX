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
  
  <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/ax5ui/ax5ui-grid/master/dist/ax5grid.css">
  <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
  <script type="text/javascript" src="https://cdn.rawgit.com/ax5ui/ax5core/master/dist/ax5core.min.js"></script>
  <script type="text/javascript" src="https://cdn.rawgit.com/ax5ui/ax5ui-grid/master/dist/ax5grid.min.js"></script>
 </head>
 <script type="text/javascript">
    $(document.body).ready(function () {
        //var API_SERVER = "http://api-demo.ax5.io";
        var firstGrid = new ax5.ui.grid();
 
        firstGrid.setConfig({
            target: $('[data-ax5grid="first-grid"]'),
            columns: [
                {key: "a", label: "field A"},
                {key: "b", label: "field B"},
                {key: "c", label: "numbers C"},
                {key: "d", label: "field D"},
                {key: "e", label: "field E"},
                {key: "f", label: "field F"},
                {key: "g", label: "field G"},
                {key: "h", label: "field H"}
            ]
        });
        
        var gridList = [{a: "A", b: "A01", c:"C", d:"D", e:"E", f:"F", g:"G"}];
 
        // {a: "A", b: "A01", c:"C", d:"D", e:"E", f:"F", g:"G"}
        // 값이 없는 h 는 표현안됨
        firstGrid.setData(gridList);
        // 그리드 데이터 가져오기

        $.ajax({
            method: "GET",
            url: "/mis/ksys/syia030_Select.do",
            success: function (res) {
            	//alert(showObj(res));
                firstGrid.setData(res);
            }
        });
    });

   	function doAction(sAction) {
   		switch(sAction) {
   			case "search":      //조회
   				var param = {url:"/mis/ksys/syia030_Select.do"
   					,subparam:FormQueryStringEnc(document.frm)   //폼객체 안에 내용을 QueryString으로 바꾼다.
   					,sheet:"mySheet"};

   				DataSearch( param );
   				
   				break;
   			case "save":
   				var param = {url:"/mis/ksys/syia030_Save.do"
   					,subparam:FormQueryStringEnc(document.frm)
   					,sheet:"mySheet"};
   				DataSave( param );
   				
   				break;
   				
   			case "reload":
   				mySheet.RemoveAll();

   				break;

   			case "insert":
   				mySheet.DataInsert();
   				dataInit();
   				break;				
   				
   		}
   	}
    	
    function showObj(obj) {
    	var str = "";
    	for(key in obj) {
    		str += key+"="+obj[key]+"\n";
    	}

    	alert(str);
    	return;
    }
    
</script>
<body class="hold-transition skin-blue sidebar-mini">
<!-- Content Wrapper. Contains page content -->
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
                  <th>Normal</th>
                  <th>Large <code>.btn-lg</code></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
                </table>
            </div>
            </form>
            <!-- /.box-header -->
            <div class="box-body">
	          <div style="position: relative;height:500px;" id="grid-parent">
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
	<!-- /.content-wrapper -->
<!-- jQuery 3 -->
<script src="../../bower_components/jquery/dist/jquery.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="../../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- FastClick -->
<script src="../../bower_components/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../../dist/js/adminlte.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="../../dist/js/demo.js"></script>
</body>
</html>
