<%@page contentType="text/html;charset=utf-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
<title>IBSheet7-Product</title>
<link rel="stylesheet" href="../common/css/style.css"/>
<script src="../common/js/public.js" type="text/javascript"></script>

<script type="text/javascript">
	$(function() {
		$("#tree").treeview({
			collapsed: true,
			animated: "fast",
			control:"#sidetreecontrol",
			persist: "location",
			unique: true
		});
	})
	



			

</script>

	
</head>

<body scroll="no" style="overflow: hidden">

	<jsp:include page="../topmenu.jsp" />
    
	<!--<div id="container">-->	
		<div id="navigation" class="bg_sub">
        
            <div id="leftmenu">
            
              <jsp:include page="../leftmenu.jsp" />
              <div class="depth2_box"  id="menu_id">
                <div class="depth2">
                
                		<h2>Sheet</h2>
                        <div id="sidetree">
                        
                                <div id="sidetreecontrol"  class="function"><a href="?#">+ 접기</a>  <a href="?#">- 풀기</a></div>
                                
                                <ul id="tree">
                                    <li><a><strong>기본기능</strong></a>
                                        <ul>
                                            <li><a href="01/transaction.html" target="i_content">트랜젝션관리 </a></li>
                                            <li><a href="01/datatype.html" target="i_content">데이터타입/포멧</a></li>
                                            <li><a href="01/multiline.html" target="i_content">다중라인레코드</a></li>
                                        </ul>
                                    </li>
                                    <li><a><strong>헤더(Header) 기능</strong></a>
                                        <ul>
                                            <li><a href="02/header.html" target="i_content">헤더일반기능 </a></li>
                                            <li><a href="02/filter.html" target="i_content">필터(Filter) </a></li>
                                        </ul>
                                    </li>
                                    <li><a><strong>숫자 연산 기능</strong></a>
                                        <ul>
                                            <li><a href="03/sum.html" target="i_content">합계/소계</a></li>
                                            <li><a href="03/pivot.html" target="i_content">피벗/크로스테이블</a></li>
                                            <li><a href="03/group.html" target="i_content">그룹기능</a></li>
                                        </ul>
                                    </li>
                                    <li><a><strong>행열 기능</strong></a>
                                        <ul>
                                            <li><a href="04/edit.html" target="i_content">편집기능</a></li>
                                            <li><a href="04/hidden.html" target="i_content">숨김기능</a></li>
                                        </ul>
                                    </li>
                                    <li><a><strong>머지(Merge) 기능</strong></a>
                                        <ul>
                                        	<li><a href="05/merge.html" target="i_content">기본기능</a></li>
                                        </ul>
                                    </li>
                                    <li><a><strong>테마 기능</strong></a>
                                        <ul>
                                        	<li><a href="06/Theme.html" target="i_content">기본기능</a></li>
                                        </ul>
                                    </li>
                                    <li><a><strong>트리(Tree)기능</strong></a>
                                        <ul>
                                        	<li><a href="07/tree.html" target="i_content">트리 일반</a></li>
                                        	<li><a href="07/append_tree.html" target="i_content">동적확장 트리</a></li>
                                        	<li><a href="07/tree_subsum.html" target="i_content">트리소계</a></li>
                                        </ul>
                                    </li>
                                    
                                    <li><a><strong>저장</strong></a>
                                        <ul>
                                            <li><a href="08/save.html" target="i_content">저장동작방식</a></li>
                                            <li><a href="08/multisave.html" target="i_content">동시저장</a></li>
                                        </ul>
                                    </li>
                                    <li><a><strong>이벤트(Event)</strong></a>
                                        <ul>
                                        	<li><a href="09/event.html" target="i_content">다양한 이벤트</a></li>
                                        </ul>
                                    </li>
                                    <li><a><strong>import/export 기능</strong></a>
                                        <ul>
                                        	<li><a href="11/excel.html" target="i_content">엑셀 연동</a></li>
                                        	<!--
                                        	<li><a href="11/excelReport1.html" target="i_content">엑셀리포트 </a></li>
                                        	<li><a href="11/excelReport2.html" target="i_content">엑셀리포트(패턴)</a></li>
                                        	-->
                                        	<li><a href="11/text.html" target="i_content">텍스트 다운</a></li>
                                        	<li><a href="11/pdf.html" target="i_content">pdf 다운</a></li>
                                        </ul>
                                    </li>
                                    <li><a><strong>데이터 조회</strong></a>
                                        <ul>
			                                    <li><a href="13_search/pagingsearch.html" target="i_content">페이징조회 </a></li>
                                          <li><a href="13_search/lazyload.html" target="i_content">LazyLoad조회 </a></li>
                                          <li><a href="13_search/serverpaging.html" target="i_content">대용량 조회</a></li>
                                          <li><a href="13_search/speedtest_employees.html" target="i_content">조회속도</a></li>
                                    	</ul>
                                    </li>
                                    <li><a><strong>데이터 이동</strong></a>
                                        <ul>
                                        	<li><a href="14_DataMove/cell_move.html" target="i_content">셀단위 데이터 이동</a></li>
			                                    <li><a href="14_DataMove/tree_move.html" target="i_content">트리 데이터 이동</a></li>
                                    	</ul>
                                    </li>
                                    
                                     <li><a><strong>기타 기능</strong></a>
                                        <ul>
                                        
                                        
                                        		<li><a href="12/wizard.html" target="i_content">위자드</a></li>
                                        		<!--
                                        	<li><a href="12/form.html" target="i_content">HTML Form</a></li>
                                        	<li><a href="12/.html" target="i_content">다중 선택 콤보</a></li>
                                        	<li><a href="12/.html" target="i_content">ContextMenu</a></li>
                                        	<li><a href="12/.html" target="i_content">Drag & Drop</a></li>
                                        	<li><a href="12/.html" target="i_content">기타 응용(PMS)</a></li>
                                        	-->
                                        </ul>
                                    </li>
                                </ul>
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
            	<iframe frameborder=0 src="01/transaction.html" width="100%" height="100%" name="i_content" id="i_content"  scrolling="auto" ></iframe>
             </div>
             
		<!--content-->
	<!--</div>-->


</body>
</html>








