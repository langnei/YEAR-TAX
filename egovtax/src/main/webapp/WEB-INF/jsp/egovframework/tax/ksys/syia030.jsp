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
  <link rel="stylesheet" href="../../common/jqwidgets/styles/jqx.base.css" type="text/css" />
  <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.3.min.js"></script>

  
<style>
.thCenter {
	text-align: center;
	vertical-align: middle !important;
}
</style>  
</head>
<script type="text/javascript">
	$(document).ready(function(){
		var sub_active = "${menuSelect}";
		
		if ($('#'+sub_active).length){
			$('#'+sub_active).parent().parent().parent().attr("class","treeview active menu-open");			
			$('#'+sub_active).parent().attr("class","active");
			var title = $('#'+sub_active).text();
			var maintitle = $("#spantitle").text();
			$("#title").text(title);
			$("#maintitle").text(maintitle);
			$("#subtitle").text(title);
		} 		
        
        $("#jqxgrid").jqxGrid(
        {   
            columns: [                    
			  { text:    '삭제', datafield:  'sDelete', width:  50, columntype: 'checkbox' },
              { text:  '사원번호', datafield: 'emplNumb', width: 100, columntype: 'textbox' },
              { text:   '사원명', datafield: 'emplName', width: 150, cellsalign: 'right' },
              { text: '사용자ID', datafield: 'logiName', width: 100, columntype: 'textbox' },
              { text:  '비밀번호', datafield: 'passName', width: 100, columntype: 'textbox' },
              { text:  '근무여부', datafield: 'holdPres', width: 100, columntype: 'checkbox' },
              { text:  '부서코드', datafield: 'depaCode', width: 100, columntype: 'textbox' },
              { text:   '부서명', datafield: 'depaName', width: 100, columntype: 'textbox' }
            ]
        });	
        
        
        
        
		function doAction( url, obj ){
	        var source =
	        {
	        	datatype: "json",
	        	datafields: [
	                         { name: 'emplNumb' },
	                         { name: 'emplName' },
	                         { name: 'logiName' },
	                         { name: 'passName' },
	                         { name: 'holdPres' },
	                         { name: 'depaCode' },
	                         { name: 'depaName' }
	                     ],
	        	url: url,
	            data: obj        	
	        };
	        
	        var dataAdapter = new $.jqx.dataAdapter(source, {
	            loadComplete: function (data) { },
	            loadError: function (xhr, status, error) { }
	        });
	        
	    	var jqxwidth = $("#jqxbody").width();
	    	var jqxheight = $(window).height()-330;
	    	
	        $("#jqxgrid").jqxGrid(
	        {   
	        	width : jqxwidth,
	        	height : jqxheight,
	        	editable: true,
	        	sortable: true,   
	        	editmode: 'dblclick',
	        	source : dataAdapter
	        });       
		}
        
        
		$(".box-body > :button").on("click", function(){
			var formvalue = $("#frm").serializeArray();
			var searchObj = null;
			var successObj = null;
			
			if ( formvalue ) {
				searchObj = {};
		        jQuery.each(formvalue, function() {
		        	searchObj[this.name] = this.value;
		        });		
			}
			
			var buttonid = $(this).attr("id");
			
			switch(buttonid){
				case "refresh":
					break;
				case "plus":
					break;
				case "search":
			        var url = "/tax/ksys/syia030_Select.do";
			        doAction( url, searchObj );
			       	break;
				case "success":
					var url = "/tax/ksys/syia030_Save.do";	
					
				    var rows = $('#jqxgrid').jqxGrid('getrows');
				    var result = "";
				    for(var i = 0; i < rows.length; i++)
				    {
				        var row = rows[i];
				        result += row.EMPL_NUMB + " " + row.EMPL_NAME + " " + "\n";        
				    }
				    var state = $("#jqxgrid").jqxGrid('savestate');
				    var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
				    var data = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
				    var rows = $('#jqxgrid').jqxGrid('getrows');
				    //alert(data);
				    //alert(data.EMPL_NUMB + " " + data.EMPL_NAME);

				    
					doAction( url, rows );
					break;				
			}			
		});     
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
      <h1 id="title"></h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li id="maintitle"><a href="#"></a></li>
        <li class="active" id="subtitle"></li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div id="row">
      <div class="col-xs-13">
      <form id="frm">       
        <div class="box">       
          <div class="box-body">
              <button type="button" class="btn btn-default" id="refresh" data-toggle="modal" data-target="#modal-default">
              <i class="fa fa-refresh"></i> 초기화 </button>
              <button type="button" class="btn btn-info" id="plus" data-toggle="modal" data-target="#modal-info">
              <i class="fa fa-plus"></i> 입력 </button>
              <button type="button" class="btn btn-danger" id="search" data-toggle="modal" data-target="#modal-danger">
              <i class="fa fa-search"></i> 조회 </button>
              <button type="button" class="btn btn-success" id="success" data-toggle="modal" data-target="#modal-success">
              <i class="fa fa-floppy-o"></i> 저장 </button>
          </div>        
        </div>
        <div class="box">  
          <div class="box-body table-responsive no-padding">
            <table class="table table-bordered">
            	<tr>
             	<th class="thCenter">부서</th>
             	<th>
             	<select class="form-control" id="frm_SearchDepa" name="frm_SearchDepa" style="width:300px;" class="selectbox" >
             		<option value="">전체부서</option>
             		${depaSele}
             	</select>
             	</th>	
             	<th class="thCenter">사원번호</th>
             	<th>
	             	<div class="col-xs-4">
	                  <input type="text" class="form-control" placeholder="사번" id="frm_SearchEmpl" name="frm_SearchEmpl" value="">
	                </div>
	                <div class="input-group">
	                	<div class="input-group-btn">
	                  		<button type="button" class="btn btn-danger">검색</button>
	                	</div>	                
	                  	<input type="text" class="form-control" placeholder="성명" id="frm_SearchName" name="frm_SearchName" value="">            
	                </div>
             	</th>			
            	</tr>
            	<input type="hidden" id="frm_wPlac" name="frm_wPlac" value="${wPlac}">
            </table>
	      </div>
	   </div>
       <div class="box">  
	    <div class="box-body" id="jqxbody">
	        <div id="jqxgrid"></div>
	    </div>
       </div>
	 </form>
	 </div>   
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

<script type="text/javascript" src="../../common/jqwidgets/jqxcore.js"></script>
<script type="text/javascript" src="../../common/jqwidgets/jqxdata.js"></script>
<script type="text/javascript" src="../../common/jqwidgets/jqxbuttons.js"></script>
<script type="text/javascript" src="../../common/jqwidgets/jqxscrollbar.js"></script>
<script type="text/javascript" src="../../common/jqwidgets/jqxmenu.js"></script>
<script type="text/javascript" src="../../common/jqwidgets/jqxlistbox.js"></script>
<script type="text/javascript" src="../../common/jqwidgets/jqxdropdownlist.js"></script>
<script type="text/javascript" src="../../common/jqwidgets/jqxcheckbox.js"></script>
<script type="text/javascript" src="../../common/jqwidgets/jqxgrid.js"></script>
<script type="text/javascript" src="../../common/jqwidgets/jqxgrid.storage.js"></script>
<script type="text/javascript" src="../../common/jqwidgets/jqxgrid.edit.js"></script>
<script type="text/javascript" src="../../common/jqwidgets/jqxgrid.selection.js"></script> 
<script type="text/javascript" src="../../common/jqwidgets/jqxgrid.columnsresize.js"></script> 
<script type="text/javascript" src="../../common/jqwidgets/jqxgrid.filter.js"></script> 
<script type="text/javascript" src="../../common/jqwidgets/jqxgrid.sort.js"></script> 
<script type="text/javascript" src="../../common/jqwidgets/jqxgrid.pager.js"></script> 
<script type="text/javascript" src="../../common/jqwidgets/jqxgrid.grouping.js"></script> 

</body>