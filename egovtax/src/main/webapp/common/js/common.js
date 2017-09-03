//ibsheet 관련 공통함수


/*
 * 공통 조회 함수
 * paramlist (json object)
 * json 변수명 (유형) : 설명
 * sheet (Array[sheetname1,sheetname2,....]) : 시트 이름 (여러개 인 경우 모두 넣을 것) 
 * url (String): 조회 url
 * append (boolean) : 기존 데이터에 신규데이터를 append할지 여부
 * sync (boolean): sync 여부
 * subparam (String): 조회 조건
 */
function DataSearch(param){
	
	if(param.sheet!=null){
		var opt = {};
		var qstring = "";
		//단일 시트에 대한 조회
		if(typeof(param.sheet)=="string"||param.sheet.length==1){
			//해당 폼에서 조회조건 추출
			if(param.subparam){
				qstring = param.subparam;	
			}
			//조회방식 동기/비동기 여부 (default : 비동기)
			if(param.sync){
				opt["Sync"] = param.sync;
			}
			
			//기존데이터에 append 여부 (default: false)
			if(param.append){
				opt["Append"] = param.append;
			}
			
			
			//시트 조회
			if(typeof(param.sheet)=="string"){
				window[param.sheet].DoSearch(param.url,qstring,opt);
			}else{
				window[param.sheet[0]].DoSearch(param.url,qstring,opt);	
			}
			
		}else{
			//여러개 시트 동시 조회
			//해당 폼에서 조회조건 추출
			if(param.subparam){
				qstring = param.subparam;	
			}
			//시트 조회 
			
			//맨 앞에 시트를 통해 ajax 통신
			var jsonString = window[param.sheet[0]].GetSearchData(param.url,qstring);
			//돌아온 결과를 json 객체로 바꾼다.
			var jsonObj = JSON.parse(jsonString);
			
			//각 시트에 조회된 데이터를 순차적으로 로딩한다.
			for(var i=0;i<param.sheet.length;i++){
				window[param.sheet[i]].LoadSearchData(  jsonObj[param.sheet[i]] );	
			}
		}
	}else if(param.chart!=null){
		
		window[param.chart].DoSearch(param.url,{"Param":param.subparam});
		window[param.chart].Draw();		
	}
}




/*
 * 공통 조회 함수
 * paramlist (json object)
 * json 변수명 (유형) : 설명
 * sheet (Array[sheetname1,sheetname2,....]) : 시트 이름
 * onePageRow(Int) : 한번에 조회해 오는 개수 (default:100)
 * url (String): 조회 url
 * sync (boolean) : sync 여부(default async)
 * subparam (String): 조회 조건
 */
function DataSearchPaging(param){
	var searchCondition = {"Param":""};
	
	var qstring = "";
	//단일 시트에 대한 조회
	
	//해당 폼에서 조회조건 추출
	if(param.subparam){
		searchCondition["Param"]= param.subparam;	
	}
	
	if(param.onePageRow){
		searchCondition["Param"] = searchCondition["Param"]+"&onepagerow="+param.onePageRow; 
	}else{
		searchCondition["Param"] = searchCondition["Param"]+"&onepagerow=100";
	}
	
	if(param.sync){
		searchCondition["Sync"] =param.sync;
	}
	
	
	searchCondition["UseWaitImage"] = 1;
//	searchCondition["PageParam"]="pageIndex";
	
	//시트 조회
	if(typeof(param.sheet)=="string"){
		window[param.sheet].DoSearchPaging(param.url,searchCondition);
	}else{
		window[param.sheet[0]].DoSearchPaging(param.url,searchCondition);
	}
}




/*
 * 공통 조회 함수
 * paramlist (json object)
 * json 변수명 (유형) : 설명
 * sheet (sheetname1) : 시트 이름
 * onePageRow(Int) : 한번에 조회해 오는 개수 (default:100)
 * url (String): 조회 url
 * form (Form Element): 조회 조건
 */
function DirectDown2Excel(param){
	
}






/*
 * 공통 저장 함수
 * paramlist (json object)
 * json 변수명 (유형) : 설명
 * sheet  (Array[sheetname1,sheetname2,....]) : 시트 이름 (여러개 인 경우 모두 넣을 것) 
 * url (String): 조회 url
 * subparam (String): 조회 조건
 * sync (boolean) : sync 여부
 * quest (boolean) : 저장하시겠습니까? 컨펌 여부.
 * col (int or String) : 특정 컬럼 기준 저장
 */
function DataSave(param){
	var qstring = "";
	var opt = {}; //default 값
	//단일 시트에 대한 저장
	if(typeof(param.sheet)=="string"||param.sheet.length==1){
		var _sheet;
		
		if(typeof(param.sheet)=="string"){
			_sheet = param.sheet;
		}else{
			_sheet = param.sheet[0];
		}
		
		if(param.sync){
			opt["Sync"] = param.sync;
		}
		
		if(!param.quest){
			opt["Quest"] = param.quest;
		}
		
		
		//해당 폼에서 조회조건 추출
		if(param.subparam){
			qstring = param.subparam;	
		}
		//IBSheet 각 컬럼에 대한 SAVENAME 전달
		qstring +=  "&"+_sheet+"_SAVENAME="+IBS_ConcatSaveName(window[_sheet]);
	
		//시트 저장
		opt["Param"] = qstring;
		opt["Mode"] = 2;
		opt["Delim"]= "‡";
		
		window[_sheet].DoSave(param.url,opt);
		
	}else{
		//여러개 시트 동시 저장
		//해당 폼내용 추출
		if(param.subparam){
			qstring = param.subparam;	
		}
		
		
		//각시트의 수정된 내용과 각컬럼의 SaveName을 담는다.
		for(var i=0;i<param.sheet.length;i++){
			var tempStr = "";
			
			tempStr =  window[param.sheet[i]].GetSaveString({"Prefix":param.sheet[i]+"_","Mode":2,"Delim":"‡"});
			
			//오류 확인
			if(tempStr==""&&window[param.sheet[i]].IsDataModified()){
				return;
			}
			if(qstring!=""){
				qstring += "&"+tempStr;
			}else{
				qstring = tempStr;
			}
			
			
			//IBSheet 각 컬럼에 대한 SAVENAME 전달
			qstring +=  "&"+param.sheet[i]+"_SAVENAME="+IBS_ConcatSaveName(window[param.sheet[i]]);
		}
		qstring += "&MULTISAVE=true";
		
		
		if(!param.quest){
			if(confirm(  window[param.sheet[0]].Lang.Text.SYS_SaveConfirm   )){
				//맨 앞에 시트를 통해 ajax 통신
				var jsonString = window[param.sheet[0]].GetSaveData(param.url,qstring);
				
				//저장 성공/실패 여부를 각 시트에 동일하게 반영한다.
				for(var i=0;i<param.sheet.length;i++){
					window[param.sheet[i]].LoadSaveData( jsonString );	
				}
			}
		}else{
			//맨 앞에 시트를 통해 ajax 통신
			var jsonString = window[param.sheet[0]].GetSaveData(param.url,qstring);
			
			//저장 성공/실패 여부를 각 시트에 동일하게 반영한다.
			for(var i=0;i<param.sheet.length;i++){
				window[param.sheet[i]].LoadSaveData( jsonString );	
			}
		}
		
		
	}
}

/*
 * 공통 저장후 이벤트
 */
function saveFinish(code,msg){
	if(msg!=""){
		alert(msg);
	}
}

/* 
* 테마 바꾸기
*/
var themaCode = "GM2";
var themaValue = "Main2";

/*
case "Main": 
	mySheet.SetTheme('GM', 'Main');
case "Main2":      
	mySheet.SetTheme('GM2', 'Main2');
case "Main3":
	mySheet.SetTheme('GM3', 'Main3');
case "Blue":      
	mySheet.SetTheme('BL', 'Blue');
case "Brown":      
	mySheet.SetTheme('BN', 'Brown');
case "Gray":      
	mySheet.SetTheme('GY', 'Gray');
case "Green":      
	mySheet.SetTheme('GN', 'Green');
case "Navy":      
	mySheet.SetTheme('NB', 'Navy');
case "Orange":      
	mySheet.SetTheme('OR', 'Orange');
case "Purple":      
	mySheet.SetTheme('PP', 'Purple');
case "Yellow":      
	mySheet.SetTheme('YL', 'Yellow');
case "YellowGreen":      
	mySheet.SetTheme('YGN', 'YellowGreen');
case "LightBrown":      
	mySheet.SetTheme('LBN', 'LightBrown');
case "LightGray":      
	mySheet.SetTheme('LGY', 'LightGray');
case "LightGreen":      
	mySheet.SetTheme('LGN', 'LightGreen');
case "LightPurple":      
	mySheet.SetTheme('LPP', 'LightPurple');
case "LightSky":      
	mySheet.SetTheme('LS', 'LightSky');
case "LightRed":      
	mySheet.SetTheme('LR', 'LightRed');
*/
