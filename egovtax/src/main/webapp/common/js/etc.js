﻿

	function arrangeWidth(sheetobj){
		var lc = sheetobj.LastCol();
		var colArr = new Array();
		var colsum = 0;
		for(var c=0;c<=lc;c++){
			colsum += sheetobj.GetColWidth(c);
		}
		for(var c=0;c<=lc;c++){
			colArr.push(   Math.floor((sheetobj.GetColWidth(c)/colsum)*100)    );
		}
		var totalsum = eval(colArr.join("+"));
		if(totalsum<100){
			colArr[colArr.length-1] = 	colArr[colArr.length-1]+(100-totalsum);
		}
		return colArr.join("|");
		
	}

	var current_page = -1;
	/* page index */
	function makePageIndex(tp){
		try{
			if (document.getElementById("pageindex").firstChild) {
				document.getElementById("pageindex").removeChild(document.getElementById("pageindex").firstChild);
			}
			
			current_page = tp;
			var sr = mySheet.SearchRows(); //전체 조회 건수
			var page = cfg.Page; //페이지당 레코드 수
			var thispage = tp; //현재 페이지
			var pagecnt = 5; //한번에 표시할 페이지 개수
			var lastpage = Math.ceil(sr/page); //마지막 페이지 인덱스
			
			var li = null;
			var tt = null;
			var a = null;
			var ul = document.createElement("ul");
		
			var k=1;
			if(thispage!= 1){
				  li = document.createElement("li");
				  a = document.createElement("a");
					tt =  document.createTextNode("<<");
					addEventHandler(li,"click",pagemove,{methodName:"GoToFirstPage",page:1});
					a.appendChild(tt);
					li.appendChild(a);
					ul.appendChild(li);	
					li = document.createElement("li");
					a = document.createElement("a");
					addEventHandler(li,"click",pagemove,{methodName:"GoToPrevPage",page:tp-1});
					tt =  document.createTextNode("<");
					a.appendChild(tt);
					li.appendChild(a);
					ul.appendChild(li);	
			}
			
			
			var sr = (Math.ceil(tp/pagecnt)*pagecnt)-(pagecnt-1);
			
			for(var i=sr;i<(sr+pagecnt);i++){
				if(i<=lastpage){
					li = document.createElement("li");
					a = document.createElement("a");
					tt =  document.createTextNode(i);
					addEventHandler(li,"click",pagemove,{methodName:"GoToPageNum",page:i});
					if(i==tp)		li.className = "current";
					a.appendChild(tt);
					li.appendChild(a);
					ul.appendChild(li);	
				}	
			}		
			
			if(thispage < lastpage){
					a = document.createElement("a");
				  li = document.createElement("li");
					tt =  document.createTextNode(">");
					addEventHandler(li,"click",pagemove,{methodName:"GoToNextPage",page:tp+1});
					a.appendChild(tt);
					li.appendChild(a);
					ul.appendChild(li);	
					li = document.createElement("li");
					tt =  document.createTextNode(">>");
					a = document.createElement("a");
					addEventHandler(li,"click",pagemove,{methodName:"GoToLastPage",page:lastpage});
					a.appendChild(tt);
					li.appendChild(a);
					ul.appendChild(li);	
			}
			
			ul.className = "pageindex";
			document.getElementById("pageindex").appendChild(ul);
		}catch(ex){
			alert(ex.message);
		}
	}
	
	parent.sizefunc = smartsheetsize; 
	function pagemove(param){
		
		var mn = param.methodName;
		var page = param.page;
		if(mn=="GoToPageNum"){
			eval("mySheet.GoToPageNum("+page+")");	
		}else{
			eval("mySheet."+mn+"()");
		}
		makePageIndex(page);
	}
	
	/*시트높이 자동 조절 */
	function smartsheetsize(sheet,height,fityn){

		if(typeof(AutoResizeOff)!="undefined"&& AutoResizeOff) return;

		var topheight = 0;

		if(opener == undefined) {
			topheight = parseInt($('#contactArea', parent.document).css("height"));
		} else {
			topheight = 0;
		}

		if(topheight == null) topheight = 0;
		var wh = 0;


		wh = $(window).height(); 
		var p = $('div.main_content').position();

		var h = (wh - p.top - pageheightoffset - topheight) - 20 ; //  

		$('div.ib_product').animate({height: h}, {queue:false, duration: 1000, easing: 'swing'});
		if(mySheet.LastCol()<11){
			mySheet.FitColWidth();
		}
			
	}
	
	/*차트높이 자동 조절 */
	function smartchartsize(s){
		
			var topheight = 0;
			if(s==null){topheight =  parseInt($('#contactArea', parent.document).css("height"));}
		  var wh = $(window).height(); 
			var p = $('div.main_content').position();
			var h = (wh - p.top - pageheightoffset + topheight);
			$("div.ib_chart_product").css("height",h+"px");
//			myChart.Draw();
	}
	
	function addEventHandler (obj,evtName,func,param) {
      
      if (obj.addEventListener) {   // all browsers except IE before version 9
          obj.addEventListener (evtName, function(){func(param)} , false );
      } 
      else {
          if (obj.attachEvent) {    // IE before version 9
              obj.attachEvent ("on"+evtName, function(){func(param)});
          }
      }
	}
	
	
	$(document).ready(function(){
		
		try{
			
			if((typeof(AutoResizeOff)!="undefined")){ 
				if(AutoResizeOff){
					return;
				}
			}
			var debounced = null;
			var ul = location.href;

			if(ul.indexOf("/sheet/")>-1){
				debounced = $.debounce( 500, false, smartsheetsize );
				smartsheetsize(1);
			}else if(ul.indexOf("/mis/")>-1){
				smartsheetsize(1);
				debounced = $.debounce( 500, false, smartsheetsize );
				
			}else if(ul.indexOf("/chart/")>-1){
				debounced = $.debounce( 500, false, smartchartsize );
				smartchartsize(1);
			}

			$(window).bind( 'resize', debounced );	

	
	}catch(e){}
//		$("#contactArea").bind( 'resize', debounced );	
	});
	


