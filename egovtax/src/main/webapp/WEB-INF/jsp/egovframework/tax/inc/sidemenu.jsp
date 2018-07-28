<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
  
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <!-- 프로필 사진 -->
          <img src="../../dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <!-- 프로필 이름 -->
          <p>Alexander Pierce</p>
          <!-- 프로필 상태 -->
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <!-- search form -->
      <!-- 프로필 검색 -->
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
          	  <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
              </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->

      <!-- 사이드바 -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">MAIN NAVIGATION</li>
        <!-- 트리메뉴 -->
        <c:forEach var="result" items="${menuList}" varStatus="status">   
        	<c:set var="bcode" value="${result.bCode}"/> 
	        <li class='treeview'>
		        <a href='#'> 
			        <i class='fa fa-folder'></i><span id="spantitle">${result.title}</span>
			        <span class='pull-right-container'><i class='fa fa-angle-left pull-right'></i></span>
		        </a>
	        	<ul class='treeview-menu'>
	        		<c:forEach var="subresult" items="${menuSubList}" varStatus="status"> 
	        		<c:set var="subbcode" value="${subresult.bCode}"/> 
	        		<c:if test="${bcode == subbcode}">
	        		<li>
	        			<a href="/tax/${sysName}/${subresult.url}.do?acTive=acTive_${status.index}" id="acTive_${status.index}">
	        				<i class='fa fa-file-o'></i>${subresult.title}
	        			</a>
	        		</li>
	        		</c:if>
	        		</c:forEach>
	        	</ul>
	        </li> 
        </c:forEach>
        <!-- 트리메뉴 끝 -->
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>