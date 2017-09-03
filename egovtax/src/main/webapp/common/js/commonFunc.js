/*
 ************************************************************************************************
 * @Source  : CommonFunc.js
 * @Version : 1.0
 * @Date    : 
 ************************************************************************************************
 * DATE         AUTHOR    DESCRIPTION
 * ----------------------------------------------------------------------------------------------
 
 ************************************************************************************************
*/

//=========================================================================
//==========             입력시 체크루틴              ==========
//=========================================================================
/**
 * @type   : common fuction
 * @access : public
 * @desc   : 입력된 값이 validExpr식에 맞게 정확한지를 체크한다.
 * <pre>
 *     호출하는 스크립트는 다음과 같이 적용한다.
 *	   cfValidate([start_upd_dateEME, in_recpt_noTXT[, tab_obj_id[, tag_obj_id[, tag_obj_id[, ...]);
 *	   cfValidate([form.start_upd_dateEME, form.in_recpt_noTXT[, form.tab_obj_id[, form.tag_obj_id[, form.tag_obj_id[, ...]);
 *
 *	   validExpr 표현식의 항목은 다음과 같으며, 모든 태그에 다음과 같이 표기한다.
 *	   validExpr="오브젝트항목명:필수여부:체크항목ID=값[;체크항목ID=값[;체크항목ID=값[;체크항목ID=값[;]"
 *
 *	   사용할 수 있는 체크항목은 다음과 같으며, 필요한 항목에 대해서만 표현식에 기재하여 사용한다.
 *	   isNumber		: "숫자" 입력 전용이며, 값은 true
 *	   isResNo		: "주민등록번호" 입력 전용이며, 값은 true
 *	   isFrnResNo	: "외국인등록번호" 입력 전용이며, 값은 true
 *	   isBizNo		: "법인등록번호" 입력 전용이며, 값은 true
 *	   isCorpNo		: "사업자등록번호" 입력 전용이며, 값은 true
 *	   isAalpha		: "영문" 입력 전용이며, 값은 true
 *	   isHan		: "한글" 입력 전용이며, 값은 true
 *	   isEqual		: 입력값과 동일비교하기 위한 "문자열-비교값" 입력 전용이며, 반환값은 true(동일)/false(다름)
 *	   isNotEqual	: 입력값과 상반비교하기 위한 "문자열-비교값" 입력 전용이며, 반환값은 true(다름)/false(동일)
 *	   isMoreThan	: 입력값과 차등비교하기 위한 "숫자-비교값" 입력 전용이며, 반환값은 true(크다)/false(작다)
 *	   isLessThan	: 입력값과 차등비교하기 위한 "숫자-비교값" 입력 전용이며, 반환값은 true(작다)/false(크다)
 *	   length		: 입력되어야 할 "값의 길이" 이며, 값은 숫자(0~9)로 표기
 *	   minLength	: 입력되어야 할 "최소값의 길이" 이며, 값은 숫자(0~9)로 표기
 *	   maxLength	: 입력되어야 할 "최대값의 길이" 이며, 값은 숫자(0~9)로 표기
 *	   byteLength	: 입력되어야 할 "바이트 문자열 값의 길이" 이며, 값은 숫자(0~9)로 표기, (한글 문자 입력시 길이 체크)
 *	   minByteLength: 입력되어야 할 "바이트 문자열 취소값의 길이" 이며, 값은 숫자(0~9)로 표기, (한글 문자 입력시 길이 체크)
 *	   maxByteLength: 입력되어야 할 "바이트 문자열 최대값의 길이" 이며, 값은 숫자(0~9)로 표기, (한글 문자 입력시 길이 체크)
 *	   number		: "숫자" 입력 가능/불가 여부 구분이며, 값은 true(입력가능)/false(입력불가)
 *	   alpha		: "영문" 입력 가능/불가 여부 구분이며, 값은 true(입력가능)/false(입력불가)
 *	   hangul		: "한글" 입력 가능/불가 여부 구분이며, 값은 true(입력가능)/false(입력불가)
 *	   space		: "공백" 입력 가능/불가 여부 구분이며, 값은 true(입력가능)/false(입력불가)
 *	   special		: "특수문자" 입력 가능/불가 여부 구분이며, 값은 true(입력가능)/false(입력불가)
 *	   default		: 설정하기 위한 "기본값" 이며, 널(NULL)값 초기화는 "default=" 표현식을 작성한다.
 *
 *	   사용 예)는 다음과 같다.
 *		<OBJECT id="start_upd_dateEME" name="start_upd_dateEME" classid="clsid:E6876E99-7C28-43AD-9088-315DC302C05F" class="inputEMEymd" 
 *				validExpr="수령일자:required:isNumber=true;length=7;byteLength=7;minLength=3;minByteLength=3;maxLength=10;maxByteLength=10;number=true;alpha=true;hangul=false;space=true;special=true;default=" tabindex="2">
 *		<input type="text" id="in_recpt_noTXT" name="in_recpt_noTXT" value="" class="outputTXT" style='width:140px;' maxlength=7 
 *				validExpr="접수번호:required:isNumber=true;length=7;byteLength=7;minLength=3;minByteLength=3;maxlength=10;maxByteLength=10;number=true;alpha=true;hangul=false;space=true;special=true;default=기본값;" tabindex="18" readonly>
 *		주민등록번호		: validExpr="주민등록번호:required:isResNo=true;length=13;"
 *		법인등록번호		: validExpr="법인등록번호:required:isCorpNo=true;length=13;"
 *		외국인등록번호	: validExpr="외국인등록번호:required:isFrnResNo=true;length=13;"
 *		사업자등록번호	: validExpr="사업자등록번호:required:isBizNo=true;length=10;"
 *		고유번호			: validExpr="고유번호:required:isOrgNo=true;length=10;"
 * </pre>
 * @sig    : 
 * @param  : 오브젝트[, 오브젝트[, 오브젝트]
 * @return : true/false
 */
 
//-----------------------------------------------------------------------------
// 체크 표현식 항목 리스트
//-----------------------------------------------------------------------------
var idLength = false;
var idLengthValue = null;
var idMinLength = false;
var idMinLengthValue = null;
var idMaxLength = false;
var idMaxLengthValue = null;
var idByteLength = false;
var idByteLengthValue = null;
var idMinByteLength = false;
var idMinByteLengthValue = null;
var idMaxByteLength = false;
var idMaxByteLengthValue = null;
var idNumber = false;
var idNumberValue = null;
var idAlpha = false;
var idAlphaValue = null;
var idHan = false;
var idHanValue = null;
var idSpace = false;
var idSpaceValue = null;
var idSpecial = false;
var idSpecialValue = null;
var idIsNumber = false;
var idIsNumberValue = null;
var idIsAlpha = false;
var idIsAlphaValue = null;
var idIsHan = false;
var idIsHanValue = null;
var idIsEqual = false;
var idIsEqualValue = null;
var idIsNotEqual = false;
var idIsNotEqualValue = null;
var idIsMoreThan = false;
var idIsMoreThanValue = null;
var idIsLessThan = false;
var idIsLessThanValue = null;
var idIsDate = false;
var idIsDateValue = null;
var idIsInChar = false;
var idIsInCharValue = null;
var idIsResNo = false;
var idIsResNoValue = null;
var idIsFrnResNo = false;
var idIsFrnResNoValue = null;
var idIsBizNo = false;
var idIsBizNoValue = null;
var idIsOrgNo = false;
var idIsOrgNoValue = null;
var idIsCorpNo = false;
var idIsCorpNoValue = null;
var idDefault = false;
var idDefaultValue = "";
var isInMsg = null;
var isOutMsg = null;

function cfValidate(obj)
{
	if (cfIsNull(obj)) {
		return;
	}
	
	var objArr;
	var oElement; 
	var validYN = false;

	if (obj.length == null) {
		objArr = new Array(1);
		objArr[0] = obj;
	}
	else {
		objArr = obj;
	}
	
	isInMsg = new Array(5);
	isOutMsg = new Array(5);
	for(var idxMsg = 0; idxMsg < isInMsg.length; idxMsg++) {
		isInMsg[idxMsg]	 = "";
		isOutMsg[idxMsg] = "";
	}
	
	for (var objArrIdx = 0; objArrIdx < objArr.length; objArrIdx++) {
		oElement = objArr[objArrIdx];
		if (!cfValidateElement(oElement)) {
			return false;
		}
		
		idLength = false;
		idLengthValue = null;
		idMinLength = false;
		idMinLengthValue = null;
		idMaxLength = false;
		idMaxLengthValue = null;
		idByteLength = false;
		idByteLengthValue = null;
		idMinByteLength = false;
		idMinByteLengthValue = null;
		idMaxByteLength = false;
		idMaxByteLengthValue = null;
		idNumber = false;
		idNumberValue = null;
		idAlpha = false;
		idAlphaValue = null;
		idHan = false;
		idHanValue = null;
		idSpace = false;
		idSpaceValue = null;
		idSpecial = false;
		idSpecialValue = null;
		idIsNumber = false;
		idIsNumberValue = null;
		idIsAlpha = false;
		idIsAlphaValue = null;
		idIsHan = false;
		idIsHanValue = null;
		idIsEqual = false;
		idIsEqualValue = null;
		idIsNotEqual = false;
		idIsNotEqualValue = null;
		idIsMoreThan = false;
		idIsMoreThanValue = null;
		idIsLessThan = false;
		idIsLessThanValue = null;
		idIsDate = false;
		idIsDateValue = null;
		idIsInChar = false;
		idIsInCharValue = null;
		idIsResNo = false;
		idIsResNoValue = null;
		idIsFrnResNo = false;
		idIsFrnResNoValue = null;
		idIsBizNo = false;
		idIsBizNoValue = null;
		idIsOrgNo = false;
		idIsOrgNoValue = null;
		idIsCorpNo = false;
		idIsCorpNoValue = null;
		idDefault = false;
		idDefaultValue = "";
		for(var idxMsg = 0; idxMsg < isInMsg.length; idxMsg++) {
			isInMsg[idxMsg]	 = "";
			isOutMsg[idxMsg] = "";
		}
	}
	
	return true;
}

/**
 * @type   : function
 * @access : public
 * @desc   : 스트링의 자릿수를 Byte 단위로 환산하여 알려준다. 영문, 숫자는 1Byte이고 한글은 2Byte이다.(자/모 중에 하나만 있는 글자도 2Byte이다.)
 * @sig    : value
 * @param  : value required 스트링
 * @return : 스트링의 길이
 */
function cfGetByteLength(value)
{
	var byteLength = 0;
	var resetValue = "";

	for (i=0; i < value.length; i++) {
		var ch = value.charAt(i);
		if(idMaxByteLengthValue-1 > byteLength) {
			resetValue += ch;
		}
		
		if(escape(ch).length > 4) {
			byteLength += 2;
		}
		else if(ch == '\n') {
			if(value.charAt(i-1) != '\r') {
				byteLength += 1;
			}
		}
		else if(ch == '<' || ch == '>') {
			byteLength += 4;
		}
		else {
			byteLength += 1;
		}
	}

	if(idDefaultValue == "") {
		idDefaultValue = resetValue;
	}

	return byteLength;
}

function cfGetValidExprElementInfo(oElementList)
{
	var oElement = null;
	var oElementInfo = null;
	var validExprItem = null;
	var validExprValue = null;
	
	oElement = oElementList;
	oElementInfo = oElement.split("=");
	
	for(var i = 0; i < oElementInfo.length; i++) {
		switch(i) {
			case	0:	// 체크항목
				validExprItem = oElementInfo[i].toUpperCase();
				break;
			case	1:	// 값
				validExprValue = oElementInfo[i];
				break;
		}
	}
	
	switch(validExprItem) {
		case 'LENGTH':
			idLength = true;
			idLengthValue = validExprValue;
			break;
		case 'MINLENGTH':
			idMinLength = true;
			idMinLengthValue = validExprValue;
			break;
		case 'MAXLENGTH':
			idMaxLength = true;
			idMaxLengthValue = validExprValue;
			break;
		case 'BYTELENGTH':
			idByteLength = true;
			idByteLengthValue = validExprValue;
			break;
		case 'MINBYTELENGTH':
			idMinByteLength = true;
			idMinByteLengthValue = validExprValue;
			break;
		case 'MAXBYTELENGTH':
			idMaxByteLength = true;
			idMaxByteLengthValue = validExprValue;
			break;
		case 'NUMBER':
			idNumber = true;
			idNumberValue = eval(validExprValue);
			if(idNumberValue == true) {
				isInMsg[0] = "숫자";
			}
			else if(idNumberValue == false) {
				isOutMsg[0] = "숫자";
			}
			break;
		case 'ALPHA':
			idAlpha = true;
			idAlphaValue = eval(validExprValue);
			if(idAlphaValue == true) {
				isInMsg[1] = "영문자";
			}
			else if(idAlphaValue == false) {
				isOutMsg[1] = "영문자";
			}
			break;
		case 'HANGUL':
			idHan = true;
			idHanValue = eval(validExprValue);
			if(idHanValue == true) {
				isInMsg[2] = "한글";
			}
			else if(idHanValue == false) {
				isOutMsg[2] = "한글";
			}
			break;
		case 'SPACE':
			idSpace = true;
			idSpaceValue = eval(validExprValue);
			if(idSpaceValue == true) {
				isInMsg[3] = "공백";
			}
			else if(idSpaceValue == false) {
				isOutMsg[3] = "공백";
			}
			break;
		case 'SPECIAL':
			idSpecial = true;
			idSpecialValue = eval(validExprValue);
			if(idSpecialValue == true) {
				isInMsg[4] = "특수문자";
			}
			else if(idSpecialValue == false) {
				isOutMsg[4] = "특수문자";
			}
			break;
		case 'ISNUMBER':
			idIsNumber = true;
			idIsNumberValue = eval(validExprValue);
			break;
		case 'ISRESNO':
			idIsResNo = true;
			idIsResNoValue = eval(validExprValue);
			break;
		case 'ISFRNRESNO':
			idIsFrnResNo = true;
			idIsFrnResNoValue = eval(validExprValue);
			break;
		case 'ISBIZNO':
			idIsBizNo = true;
			idIsBizNoValue = eval(validExprValue);
			break;
		case 'ISORGNO':
			idIsOrgNo = true;
			idIsOrgNoValue = eval(validExprValue);
			break;
		case 'ISCORPNO':
			idIsCorpNo = true;
			idIsCorpNoValue = eval(validExprValue);
			break;
		case 'ISALPHA':
			idIsAlpha = true;
			idIsAlphaValue = eval(validExprValue);
			break;
		case 'ISHAN':
			idIsHan = true;
			idIsHanValue = eval(validExprValue);
			break;
		case 'ISEQUAL':
			idIsEqual = true;
			idIsEqualValue = validExprValue;
			break;
		case 'ISNOTEQUAL':
			idIsNotEqual = true;
			idIsNotEqualValue = validExprValue;
			break;
		case 'ISMORETHAN':
			idIsMoreThan = true;
			idIsMoreThanValue = validExprValue;
			break;
		case 'ISLESSTHAN':
			idIsLessThan = true;
			idIsLessThanValue = validExprValue;
			break;
		case 'ISDATE':
			idIsDate = true;
			idIsDateValue = validExprValue;
			break;
		case 'ISINCHAR':
			idIsInChar = true;
			idIsInCharValue = validExprValue;
			break;
		case 'DEFAULT':
			idDefault = true;
			idDefaultValue = validExprValue;
			break;
	}
}


function cfGetSplitInfo(value, separator)
{
	var valueList = null;
	
	if(cfIsNull(value) || cfIsNull(separator)) {
		return null;
	}
	
	valueList = value.split(separator);
	
	return valueList;
}



/**
 * @type   : common fuction
 * @access : public
 * @desc   : 달력을 띄워서 선택한 날짜 정보를 날짜필드명 값으로 설정해 준다.
 *			 달력 이미지 버튼을 클릭하여 호출한다.
 * <pre>
 *     호출하는 스크립트는 다음과 같이 적용한다.
 *	   onclick="cfShowCalendar(start_upd_dateTXT, '1');" - INPUT 태그를 이용한 경우
 *     <a href="javascript:cfShowCalendar(start_upd_dateTXT, '1');">
 *     onclick="cfShowCalendar(start_upd_dateEME, '2');" - 가우스 EMEdit를 이용한 경우
 *     <a href="javascript:cfShowCalendar(start_upd_dateEME, '2');">
 * </pre>
 * @sig    : 
 * @param  : 날짜필드명, 태그사용구분자
 * @return : 선택한 날짜를 날짜필드명의 값에 설정
 * 			 INPUT 태그 - "2003-01-01" 형태로 반환
 * 			 EMEdit태그 - "20030101" 형태로 반환
 */
var oYyyyMmDd;
/**
 * @type   : common fuction
 * @access : public
 * @desc   : 창작연월일 입력을 위해 달력을 띄워서 선택한 날짜 정보를 스트링값으로 리턴 해 준다.
 * <pre>
 *     호출하는 스크립트는 다음과 같이 적용한다.
 *	   cfGetCopyWriterDate('오늘로 부터 1년되는 창작연월일');
 * </pre>
 * @sig    : 
 * @param  : 해당 없음.
 * @return : 선택한 날짜를 스트링 값으로 반환.(20030101)/("")
 */
function cfGetCopyWriterDate(copyWriterDate)
{
	var result = window.showModalDialog("../../../common/html/calender.htm?paraDummy="+cfGetElapse(),"" , "dialogWidth:183px; dialogHeight:268px; status:no; scroll:no");
	
	if((result != "") && (result != "undefined") && (result != null)) {
		var startYear = copyWriterDate.substring(0,4);
		var startMonth= copyWriterDate.substring(4,6);
		var startDay  = copyWriterDate.substring(6,8);
		var endYear	  = result.substring(0,4);
		var endMonth  = result.substring(4,6);
		var endDay    = result.substring(6,8);
	
		startDt = new Date(eval(startYear), eval(startMonth)-1, eval(startDay));
		endDt   = new Date(eval(endYear), eval(endMonth)-1, eval(endDay));
		
		diff = (endDt.getTime() - startDt.getTime()) / (24*60*60*1000);

		if(Math.ceil(diff) <= 0) {
			alert('본 프로그램의 창작연월일은 1년이 경과 하였습니다.');
			return "";
		}
		else if(Math.ceil(diff) <= 2) {
			alert('온라인 등록이 불가능합니다. 담당자에게 문의하세요.');
			return "";
		}
		else if((3 <= Math.ceil(diff)) && (Math.ceil(diff) <= 12)) {
			alert('신청후 12시간 이후부터 '+ (Math.ceil(diff)-2) +'일 이내로 공동저작자 서명+등록세 및 수수료를 납부를 하세요');
			return result;
		}
		else if(Math.ceil(diff) >= 13) {
			alert('신청후 12시간 이후부터 10일 이내로 공동저작자 서명+등록세 및 수수료를 납부를 하세요');
			return result;
		}
	}
	else {
		return "";
	}
}

function cfSetDateFormat(oYmd, useTag)
{
	return	oYmd.substring(0,4) + useTag + oYmd.substring(4,6)+ useTag + oYmd.substring(6,8);
}

/**
 * @type   : common function
 * @access : public
 * @desc   : 여러개의 태크 readyonly,disable/enable 처리함수
             table,div,fieldset내의 control을 한꺼번에 처리
 * <pre>
 *     cf_ChangeEnableAll(ObjectItem,Status)
 * </pre>
 * @param  : ObjectItem=form의 control name이 아닌 id명
             Status=true/false
 * @example: cf_ChangeEnableOne(form01.ID24,true)
 * @return : ObjectItem이 disable/enable처리됨
 */
function cf_ChangeEnableAll(ParentObject,Status) {
	switch (ParentObject.tagName) {
		case 'TABLE':
			for (i in ParentObject.all) cf_ChangeEnableOne(ParentObject.all[i],Status);
			break;
		case 'DIV':
			for (i in ParentObject.children) cf_ChangeEnableOne(ParentObject.children[i],Status);
			break;
		case 'FIELDSET':
			for (i in ParentObject.children) cf_ChangeEnableOne(ParentObject.children[i],Status);
			break;
		default:
			cf_ChangeEnableOne(ParentObject,Status);
	}
}

//-----------------------------------------------------------------------------
// DESCRIPTION: 주민등록번호를 체크한다.(6자리-7자리)-외국인등록번호, 법인번호와 동일
// INPUT DATA	: '9901261456638'
// RETURN VALUE	: 일치-true, 실패-false
//-----------------------------------------------------------------------------
function cfRegNoCheck(sRegNo) {
	var iReg = new Array();
	var iSum = 0;
	var iMod = 0;

	if(sRegNo == "" || sRegNo == " ")  return true;	// Null은 체크 않음
	
	if(sRegNo.length != 13) {						// 처음은 자리수부터 Check 한다.
		return false;
	}
	
	iReg[0]  = parseInt(sRegNo.substring(0,1),  10) * 2;
	iReg[1]  = parseInt(sRegNo.substring(1,2),  10) * 3;
	iReg[2]  = parseInt(sRegNo.substring(2,3),  10) * 4;
	iReg[3]  = parseInt(sRegNo.substring(3,4),  10) * 5;
	iReg[4]  = parseInt(sRegNo.substring(4,5),  10) * 6;
	iReg[5]  = parseInt(sRegNo.substring(5,6),  10) * 7;
	iReg[6]  = parseInt(sRegNo.substring(6,7),  10) * 8;
	iReg[7]  = parseInt(sRegNo.substring(7,8),  10) * 9;
	iReg[8]  = parseInt(sRegNo.substring(8,9),  10) * 2;
	iReg[9]  = parseInt(sRegNo.substring(9,10), 10) * 3;
	iReg[10] = parseInt(sRegNo.substring(10,11),10) * 4;
	iReg[11] = parseInt(sRegNo.substring(11,12),10) * 5;
	iReg[12] = parseInt(sRegNo.substring(12,13),10) ;
	
	for(var i=0; i < sRegNo.length - 1; i++) {
		iSum += iReg[i];
	}
	
	iMod = 11 - (iSum  %  11);
	iMod = iMod % 10;
	
	if(iMod == iReg[12]) {
		return true;								// 주민 등록번호 OK
	}
	else {
		return false;								// 주민 등록 번호 오류
	}
}

//-----------------------------------------------------------------------------
// DESCRIPTION: 사업자번호를 체크한다.(3자리-2자리-5자리)-고유번호와 동일
// INPUT DATA	: '1234567890'
// RETURN VALUE	: 일치-true, 실패-false
//-----------------------------------------------------------------------------
function cfBizNoCheck(sBusiNo) {
	var iBusi = new Array();
	var iSum  = 0;
	var iMod  = 0;
	var iMod_a = 0;
	var iMod_b = 0;
	var iMod_c = 0;

	if(sBusiNo == "" || sBusiNo == " ") return true;// Null은 체크 않음

	if(sBusiNo.length != 10) {						// 처음은 자리수부터 Check 한다.
		return false;
	}

	iBusi[0]  = parseInt(sBusiNo.substring(0,1),  10);
	iBusi[1]  = parseInt(sBusiNo.substring(1,2),  10) * 3;
	iBusi[2]  = parseInt(sBusiNo.substring(2,3),  10) * 7;
	iBusi[3]  = parseInt(sBusiNo.substring(3,4),  10);
	iBusi[4]  = parseInt(sBusiNo.substring(4,5),  10) * 3;
	iBusi[5]  = parseInt(sBusiNo.substring(5,6),  10) * 7;
	iBusi[6]  = parseInt(sBusiNo.substring(6,7),  10);
	iBusi[7]  = parseInt(sBusiNo.substring(7,8),  10) * 3;
	iBusi[8]  = parseInt(sBusiNo.substring(8,9),  10) * 5;
	iBusi[9]  = parseInt(sBusiNo.substring(9,10), 10);

	// 8 자리수 까지 SUM
	for(var i=0; i < sBusiNo.length - 2; i++) {
		iSum += iBusi[i];
	}

	iMod_a = iSum  %  10;							// 10으로 나눈 나머지 a
													// 9번째 자리 는
	iMod_b = parseInt((iBusi[8] / 10),10);  		// 몫     b
	iMod_c = iBusi[8] % 10;                 		// 나머지 c
	iMod   = 10 -  ((iMod_a + iMod_b + iMod_c) % 10);
	iMod   = iMod % 10;

	if(iMod == iBusi[9]) {
		return true;								// 사업자 번호 OK
	}
	else {
		return false;								// 사업자 번호 오류
	}
}

//-----------------------------------------------------------------------------
// DESCRIPTION: 법인번호를 체크한다.(6자리-7자리)
// INPUT DATA	: '1234567890123'
// RETURN VALUE	: 일치-true, 실패-false
//-----------------------------------------------------------------------------
function cfCorpNoCheck(sCorpNo) {
	var iCorp = new Array();
	var iSum = 0;
	var iMod = 0;
	
	if(sCorpNo == "" || sCorpNo == " ") return true;// Null은 체크 않음
	
	if(sCorpNo.length != 13) {						// 처음은 자리수부터 Check 한다.
		return false;
	}
	
	iCorp[0]  = parseInt(sCorpNo.substring(0,1),  10) * 1;
	iCorp[1]  = parseInt(sCorpNo.substring(1,2),  10) * 2;
	iCorp[2]  = parseInt(sCorpNo.substring(2,3),  10) * 1;
	iCorp[3]  = parseInt(sCorpNo.substring(3,4),  10) * 2;
	iCorp[4]  = parseInt(sCorpNo.substring(4,5),  10) * 1;
	iCorp[5]  = parseInt(sCorpNo.substring(5,6),  10) * 2;
	iCorp[6]  = parseInt(sCorpNo.substring(6,7),  10) * 1;
	iCorp[7]  = parseInt(sCorpNo.substring(7,8),  10) * 2;
	iCorp[8]  = parseInt(sCorpNo.substring(8,9),  10) * 1;
	iCorp[9]  = parseInt(sCorpNo.substring(9,10), 10) * 2;
	iCorp[10] = parseInt(sCorpNo.substring(10,11),10) * 1;
	iCorp[11] = parseInt(sCorpNo.substring(11,12),10) * 2;
	iCorp[12] = parseInt(sCorpNo.substring(12,13),10) ;
	
	for(var i=0; i < sCorpNo.length - 1; i++) {
		iSum += iCorp[i];
	}
	iMod = 10 - (iSum  %  10);
	iMod = iMod % 10;
	
	if(iMod == iCorp[12]) {   
		return true;								// 법인 번호 OK
	} 
	else {  
		return false;								// 법인 번호 오류
	}
}


/**
 * @type   : common fuction
 * @access : public
 * @desc   : 1970년 1월 1일 0시 0초 이후의 시간을 초(Millisecond)로 환산한다.
 *           페이지를 refresh하기 위한 DUMMY 파라메터의 값으로 사용됨.
 * <pre>
 *     parent.FRAME.location.href="/test.jsp?paraDummy=" + cfGetElapse();
 * </pre>
 * 위의 예에서 paraVirtual은 그냥 써준다.
 * @sig    : 
 * @param  : 해당사항 없음.
 * @return : Elapsed Millisecond time
 */
function cfGetElapse()
{
	var now = new Date();
	return now.getTime();
}


/**
 * @type   : common function
 * @access : public
 * @desc   : 공통메세지에 정의된 메세지를 alert box로 보여준 후 리턴한다. cfGetMsg 참조. 
 * <pre>
 *     cfAlertMsg(MSG_COM_ERR_001, ["대상목적명"]);
 * </pre>
 * @sig    : msgId[, paramArray]
 * @param  : msgId required common.js의 공통 메세지 영역에 선언된 메세지 ID 
 * @param  : paramArray optional 메세지에서 '@' 문자와 치환될 데이터 Array. Array의 index와 메세지 내의 '@' 문자의 순서가 일치한다.
             치환될 데이터는 [] 사이에 콤마를 구분자로 하여 기술하면 Array 로 인식된다. 
 * @return : 치환된 메세지 스트링
 */
function cfAlertMsg(msgId, paramArray) {
	if (cfIsNull(msgId)) {
		alert("존재하지 않는 메시지입니다.");
		return null;
	}

	var msg = new coMessage().getMsg(msgId, paramArray);
	alert(msg+"\t\t");
	return msg;
}

//-----------------------------------------------------------------------------
// DESCRIPTION: 쿠키(Cookie)를 생성한다.
//-----------------------------------------------------------------------------
function cf_Make_Cook(name,value,expires,path,domain,secure)
{
	document.cookie = name + "=" + escape (value) +
		((expires == null)	? "" : ("; expires=" +expires.toGMTString())) +
		((path	  == null)	? "" : ("; path=" + path)) +
		((domain  == null)	? "" : ("; domain=" + domain)) +
		((secure  == true)	? "; secure" : "");
	return true;
}

//-----------------------------------------------------------------------------
// DESCRIPTION: 쿠키(Cookie)의 값을 설정한다.
//-----------------------------------------------------------------------------
function cf_InSetCookie(name,value,expires,path,domain,secure)
{
	var bucket = "B"+(name.charCodeAt(0)%20);		//20개의 버킷에 각각 나누어서 넣음.
	var curr_bucket_val = cf_InGetCookie(bucket);
	var find_flag = "F";
	var set_buf = "";
	
	if(curr_bucket_val != null) {
		var spval1 = new Array();					// [aaa=1@b=2]와 같은 형태를 spval1[0]="aaa=1",spval1[1]="b=2"로 나누어 담는 변수
		var spval2 = new Array();					// [aaa=1]과 같은 형태를 spval[0]="aaa",spval2[1]="1"로 분할
		
		spval1 = curr_bucket_val.split("@");
		for(i=0;i<spval1.length;i++) {
			spval2 = spval1[i].split("=");
			if(spval2[0] == name) {
				if(i==0) {
					set_buf += spval2[0]+"="+value;
				}
				else {
					set_buf += "@"+ spval2[0]+"="+value;
				}
				find_flag = "T";
			} 
			else {
				if(i==0) {
					set_buf += spval2[0]+"="+spval2[1];
				}
				else {
					set_buf += "@"+ spval2[0]+"="+spval2[1];
				}
			}
		}
		if(find_flag == "F") {
			set_buf += "@"+name+"="+value;
		}
		cf_Make_Cook(bucket,set_buf,expires,path,domain,secure);
	}
	else {
		value = name + "=" + value;
		cf_Make_Cook(bucket,value,expires,path,domain,secure);
	}
	return true;
}

//-----------------------------------------------------------------------------
// DESCRIPTION: 쿠키(Cookie)를 설정한다.
//				Cookie에 name으로 변수를 설정하여 value를 저장한다.
// Argument : name - Cookie Name, Value - Cookie Value
//-----------------------------------------------------------------------------
function cf_SetCookie (name, value, save)
{
	var argv	= cf_SetCookie.arguments;
	var argc	= cf_SetCookie.arguments.length;
	var expires	= (argc > 2) ? argv[2] : null;
	var path	= "/";
	var domain	= (argc > 4) ? argv[4] : null;
	var secure	= (argc > 5) ? argv[5] : false;
	var expires	= new Date();
	 
	if(save == 'T' ) {
		expires.setTime (expires.getTime() + 24 * 60 * 60 * 1 * 1000);	// 1일간 저장 
	}
	else {
    	expires = null;
    }
	
	cf_InSetCookie(name,value,expires,path,domain,secure);
	
	return true;
}

//-----------------------------------------------------------------------------
// DESCRIPTION: 쿠키(Cookie)의 값(value)을 체크한다.
//-----------------------------------------------------------------------------
function cf_GetCookieVal( offset )
{
	var endstr = document.cookie.indexOf( ";", offset );
	if( endstr == -1 ) {
		endstr = document.cookie.length;
	}
	return unescape( document.cookie.substring( offset, endstr ) );
}

//-----------------------------------------------------------------------------
// DESCRIPTION: 쿠키(Cookie)에서 name에 해당하는 값(value)을 가져온다.
// Argument	:	name - Cookie Name
// Return Value:Success - Cookie value, Fail - Null
//-----------------------------------------------------------------------------
function cf_InGetCookie (name) 
{
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	
	while(i < clen) {
		var j = i + alen;
	
		if(document.cookie.substring(i, j) == arg) {
			return cf_GetCookieVal(j);
		}
	
		i = document.cookie.indexOf(" ", i) + 1;
		if(i == 0) {
			break;
		}
	}
	
	return null;	
}

//-----------------------------------------------------------------------------
// DESCRIPTION: 이름에 해당하는 쿠키(Cookie)의 값을 가져온다.
//-----------------------------------------------------------------------------
function cf_GetCookie (name) 
{
	var bucket="B"+(name.charCodeAt(0)%20);			// 20개의 버킷에 각각 나누어서 넣음.
	var curr_bucket_val = cf_InGetCookie(bucket);
	
	if(curr_bucket_val != null) {
		var spval1 = new Array();					// [aaa=1@b=2]와 같은 형태를 spval1[0]="aaa=1",spval1[1]="b=2"로 나누어 담는 변수
		var spval2 = new Array();					// [aaa=1]과 같은 형태를 spval[0]="aaa",spval2[1]="1"로 분할
		
		spval1 = curr_bucket_val.split("@");
		for(i=0;i<spval1.length;i++) {
			spval2 = spval1[i].split("=");
			if(spval2[0] == name) {
				return spval2[1];
			}
		}
	}
	return null;
}

//-----------------------------------------------------------------------------
// DESCRIPTION: 로그아웃시, 쿠키(Cookie)를 삭제한다.
//-----------------------------------------------------------------------------
function cf_Logout() 
{
	var to_date = new Date();
	to_date.setDate(to_date.getDate() - 1);

	cf_SetCookie("START_URL","", to_date);				//접속URL
}



/**
 * @type   : common function
 * @access : public
 * @desc   : 현재일자을 기준으로 오차에 해당하는 특정 날짜 년, 월, 일을 가져온다. 
 * <pre>
 *     cfGetDateInfo(년, 월, 일);
 *     다음은 현재일자가 2000.01.01 인 경우, 하루 전 날짜를 가져오고 싶은 경우 다음과 같이 사용한다.
 *     cfGetDateInfo(0, 0, -1);	 
 * </pre>
 * @sig    : years, months, days
 * @param  : years  required 현재 '년도'를 기준으로 한 오차(+,-)
 * @param  : months required 현재 '월'을 기준으로 한 오차(+,-)
 * @param  : days   required 현재 '일자'를 기준으로 한 오차(+,-)
 * @return : 생성된 년월일 스트링
 */
function cfGetDateInfo(years, months, days) {
    var today = new Date();
    var newday = null;

    if (years == null)    years    = 0;
    if (months == null)   months   = 0;
    if (days  == null)    days     = 0;
    
	newday = new Date(today.getFullYear() + years, 
	                today.getMonth() + months + 1, 
	                today.getDate() + days
	               );
	               
	var yyyy = newday.getFullYear();
    var mm   = (newday.getMonth() < 10) ? "0"+newday.getMonth() : newday.getMonth();
    var dd   = (newday.getDate()  < 10) ? "0"+newday.getDate() : newday.getDate();

	return yyyy+""+mm+""+dd;
}

/**
 * @type   : common function
 * @access : public
 * @desc   : 현재일자을 기준으로 오차에 해당하는 특정 날짜 년, 월, 일을 가져온다. 
 * <pre>
 *     cfGetDateInfo(현재일자, 년, 월, 일);
 *     다음은 현재일자가 2000.01.01 인 경우, 하루 전 날짜를 가져오고 싶은 경우 다음과 같이 사용한다.
 *     cfGetDateInfo(0, 0, -1);	 
 * </pre>
 * @sig    : years, months, days
 * @param  : years  required 현재 '년도'를 기준으로 한 오차(+,-)
 * @param  : months required 현재 '월'을 기준으로 한 오차(+,-)
 * @param  : days   required 현재 '일자'를 기준으로 한 오차(+,-)
 * @return : 생성된 년월일 스트링
 */
function cfGetSvrDateInfo(initDt, years, months, days) {
	var year  = initDt.substr(0,4);	// 년
	var month = initDt.substr(4,2);	// 월
	var day   = initDt.substr(6,2);	// 일

	var today = new Date(eval(year), eval(month)-1, eval(day));
    var newday = null;

    if (years == null)    years    = 0;
    if (months == null)   months   = 0;
    if (days  == null)    days     = 0;

	newday = new Date(today.getFullYear() + years, 
	                today.getMonth() + months + 1, 
	                today.getDate() + days
	               );
	               
	var yyyy = newday.getFullYear();
    var mm   = (newday.getMonth() < 10) ? "0"+newday.getMonth() : newday.getMonth();
    var dd   = (newday.getDate()  < 10) ? "0"+newday.getDate() : newday.getDate();

	return yyyy+""+mm+""+dd;
}

/**
 * @type   : prototype_function
 * @access : public
 * @desc   : 자바스크립트의 내장 객체인 String 객체에 trim 메소드를 추가한다. trim 메소드는 스트링의 앞과 뒤에 
 *           있는 white space 를 제거한다.
 * <pre>
 *     var str = " abcde "
 *     str = str.trim();	
 * </pre>
 * 위의 예에서 str는 "abede"가 된다.
 * @return : trimed String.
  */
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * @type   : function
 * @access : public
 * @desc   : 값이 null 이거나 white space 문자로만 이루어진 경우 true를 리턴한다.
 * <pre>
 *     cfIsNull("  ");
 * </pre>
 * 위와같이 사용했을 경우 true를 리턴한다.
 * @sig    : value
 * @param  : value required 입력값
 * @return : boolean. null(혹은 white space) 여부
 */

function cfIsNull(value) {

	if ((typeof(value) != "undefined") && (value != "undefined") && (typeof(value) == "string" && (value) == "") ) {
		return true;
	}
	
	return false;
}


///////////////////////////// coMessage /////////////////////////////
/**
 * @type   : object
 * @access : private
 * @desc   : 메세지를 관리하는 객체이다.
 */
function coMessage() {
	// method
	this.getMsg = coMessage_getMsg;
}

/**
 * @type   : method
 * @access : public
 * @object : coMessage
 * @desc   : 공통메세지에 정의된 메세지를 치환하여 알려준다.
 * @sig    : message[, paramArray]
 * @param  : message    required common.js의 공통 메세지 영역에 선언된 메세지 ID
 * @param  : paramArray optional 메세지에서 '@' 문자와 치환될 스트링 Array. (Array의 index와
 *           메세지 내의 '@' 문자의 순서가 일치한다.)
 * @return : 치환된 메세지 스트링
 */
function coMessage_getMsg(message, paramArray) {
	if (cfIsNull(message)) {
		return null;
	}
	
	var index = 0;
	var re = /@/g;
	var count = 0;

	if (paramArray == null) {
		return message;
	}
		
	while ( (index = message.indexOf("@", index)) != -1) {
		if (paramArray[count] == null) {
			paramArray[count] = "";
		}

		message = message.substr(0, index) + String(paramArray[count]) + 
		          message.substring(index + 1);
		
		index = index + String(paramArray[count++]).length;
	}

	return message;
}
/**
 * @type   : function
 * @access : public
 * @desc   : 한글과 그외문자에 대한 길이를 리턴한다.
 * <pre>
 *     cfByteLength("111강");
 * </pre>
 * 위와같이 사용했을 경우 true를 리턴한다.
 * @sig    : bstr
 * @param  : bstr required 입력값
 * @return : 길이값
 */
function cfByteLength(bstr)   
{
	len = bstr.length;
	for (ii=0; ii<bstr.length; ii++) {
		xx = bstr.substr(ii,1).charCodeAt(0);
		if (xx > 127) { len++; }
	}
	return len;
}

//  email_id 체크
function checkemail (args) { 
	var emailStr = args;
    var emailPat=/^(.+)@(.+)$/ 
	var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]" 
	var validChars="\[^\\s" + specialChars + "\]" 
	var quotedUser="(\"[^\"]*\")" 
	var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/ 
	var atom=validChars + '+' 
	var word="(" + atom + "|" + quotedUser + ")" 
	var userPat=new RegExp("^" + word + "(\\." + word + ")*$") 
	var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$") 
	var matchArray=emailStr.match(emailPat) 
		
	

	if (matchArray==null) { 
        return false 
	} 
	var user=matchArray[1] 
	var domain=matchArray[2] 

	if (user.match(userPat)==null) { 
	    return false
	}

	var IPArray=domain.match(ipDomainPat)
	if (IPArray!=null) {
		for (var i=1;i<=4;i++) {
			if (IPArray[i]>255) { 
				return false 
			} 
		} 
	 return true 
	} 
	
	var domainArray=domain.match(domainPat)
	if (domainArray==null) {
	    return false 
	}

	var atomPat=new RegExp(atom,"g") 
	var domArr=domain.match(atomPat) 
	var len=domArr.length 
	if (domArr[domArr.length-1].length<2 || domArr[domArr.length-1].length>3) { 
	   return false
	} 

	if (len<2) { 
	   return false
	} 

	return true; 
}

// input 박스에서 스페이스바 입력불가
// 사용법 <input type="txt" name="Title" onKeyDown="return onCheckNull()">
function onCheckNull(){
	if (event.keyCode == 32){
		return false;
	}else{
		return true;
	}
}

////////////////////////////////////////////////////////////////////////
// 신규 주민번호 체크로직 시작
// 사용법
// checkFgnNo('외국인번호13자리');
// checkJuminNo('주민번호13자리');
// checkBusiNo('사업자번호10자리');
//재외국인 번호 체크
function checkFgnNo(fgnno) {
	var sum=0;
	var odd=0;

	buf = new Array(13);

	for(i=0; i<13; i++) { 
		buf[i]=parseInt(fgnno.charAt(i)); 
	}
	
	odd = buf[7]*10 + buf[8];

	if(odd%2 != 0) { return false; }

	if( (buf[11]!=6) && (buf[11]!=7) && (buf[11]!=8) && (buf[11]!=9) ) {
		return false;
	}

	multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
	for(i=0, sum=0; i<12; i++) { 
		sum += (buf[i] *= multipliers[i]); 
	}
	sum = 11 - (sum%11);
	if(sum >= 10) { 
		sum -= 10; 
	}
	sum += 2;
	
	if(sum >= 10) { sum -= 10; }
	if(sum != buf[12]) { return false }

	return true;
}

// 주민번호 체크
function checkJuminNo(juminno) {
	if(juminno=="" || juminno==null || juminno.length!=13) {
		alert("주민등록번호를 입력해주세요.");
		return false;
	}
	var jumin1 = juminno.substr(0,6);
	var jumin2 = juminno.substr(6,7);
	var yy = jumin1.substr(0,2); // 년도
	var mm = jumin1.substr(2,2); // 월
	var dd = jumin1.substr(4,2); // 일
	var genda = jumin2.substr(0,1); // 성별
	var msg, ss, cc;

	// 숫자가 아닌 것을 입력한 경우
	if (!isNumeric(jumin1)) {
		alert("주민등록번호 앞자리를 숫자로 입력하세요.");
		return false;
	}
	// 길이가 6이 아닌 경우
	if (jumin1.length != 6) {
		alert("주민등록번호 앞자리를 다시 입력하세요.");
		return false;
	}
	// 첫번째 자료에서 연월일(YYMMDD) 형식 중 기본 구성 검사
	if (yy < "00" || yy > "99" ||
		mm < "01" || mm > "12" ||
		dd < "01" || dd > "31") {
		alert("주민등록번호 앞자리를 다시 입력하세요.");
		return false;
	}
	// 숫자가 아닌 것을 입력한 경우
	if (!isNumeric(jumin2)) {
		alert("주민등록번호 뒷자리를 숫자로 입력하세요.");
		return false;
	}
	// 길이가 7이 아닌 경우
	if (jumin2.length != 7) {
		alert("주민등록번호 뒷자리를 다시 입력하세요.");
		return false;
	}
	// 성별부분이 1 ~ 4 가 아닌 경우
	if (genda < "1" || genda > "4") {
		alert("주민등록번호 뒷자리를 다시 입력하세요.");
		return false;
	}
	// 연도 계산 - 1 또는 2: 1900년대, 3 또는 4: 2000년대
	cc = (genda == "1" || genda == "2") ? "19" : "20";
	// 첫번째 자료에서 연월일(YYMMDD) 형식 중 날짜 형식 검사
	if (isYYYYMMDD(parseInt(cc+yy), parseInt(mm), parseInt(dd)) == false) {
		alert("주민등록번호 앞자리를 다시 입력하세요.");
		return false;
	}
	// Check Digit 검사
	if (!isSSN(jumin1, jumin2)) {
		alert("입력한 주민등록번호를 검토한 후, 다시 입력하세요.");
		return false;
	}

	return true;
}

// 사업자등록번호 체크
function checkBusiNo(vencod) {
	var sum = 0;
	var getlist =new Array(10);
	var chkvalue =new Array("1","3","7","1","3","7","1","3","5");
	
	for(var i=0; i<10; i++) { 
		getlist[i] = vencod.substring(i, i+1); 	
	}
	for(var i=0; i<9; i++) { 
		sum += getlist[i]*chkvalue[i]; 
	}
	sum = sum + parseInt((getlist[8]*5)/10);
	sidliy = sum % 10;
	sidchk = 0;

	if(sidliy != 0) { 
		sidchk = 10 - sidliy; 
	}else { 
		sidchk = 0; 
	}
	
	if(sidchk != getlist[9]) { return false; }

	return true;
}

function isYYYYMMDD(y, m, d) {
	switch (m) {
		case 2: // 2월의 경우
			if (d > 29) return false;
			if (d == 29) {
				// 2월 29의 경우 당해가 윤년인지를 확인
				if ((y % 4 != 0) || (y % 100 == 0) && (y % 400 != 0))
				return false;
			}
			break;
		case 4: // 작은 달의 경우
		case 6:
		case 9:
		case 11:
			if (d == 31) return false;
	}

	// 큰 달의 경우
	return true;
}

function isNumeric(s) {
	for (i=0; i<s.length; i++) {
		c = s.substr(i, 1);
		if (c < "0" || c > "9") return false;
	}
	return true;
}

function isLeapYear(y) {
	if (y < 100)
		y = y + 1900;
	if ( (y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0) ) {
		return true;
	} else {
		return false;
	}
}

function getNumberOfDate(yy, mm) {
	month = new Array(29,31,28,31,30,31,30,31,31,30,31,30,31);
	if (mm == 2 && isLeapYear(yy)) mm = 0;

	return month[mm];
}

function isSSN(s1, s2) {
	n = 2;
	sum = 0;
	
	for (i=0; i<s1.length; i++)
		sum += parseInt(s1.substr(i, 1)) * n++;

	for (i=0; i<s2.length-1; i++) {
		sum += parseInt(s2.substr(i, 1)) * n++;

		if (n == 10) n = 2;
	}

	c = 11 - sum % 11;
	
	if (c == 11) c = 1;
	if (c == 10) c = 0;
	
	if (c != parseInt(s2.substr(6, 1))) return false;
	else return true;
}

// 신규 주민번호 체크로직 끝
////////////////////////////////////////////////////////////////////////
//----- (2016-06-22 김성빈) 공통 메뉴 팝업
function __fncMenuPopup(ObjUrl){
	
	var w = 1300;
	var h = 800;
	
	//var left = (screen.width) ? (screen.width-w)/2 : 0;
	//var top = (screen.height) ? (screen.height-h)/2 : 0;		
	
	var winHeight = document.body.clientHeight;	// 현재창의 높이
	var winWidth = document.body.clientWidth;	// 현재창의 너비
	var winX = window.screenLeft;	// 현재창의 x좌표
	var winY = window.screenTop;	// 현재창의 y좌표

	var left = winX + (winWidth - w)/2;
	var top = winY + (winHeight - h)/2;		
		
	window.open(ObjUrl, ObjUrl, 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
}

// 사번으로 명 찾기
	function __GetEmplName(CodeObjVal, NameObjVal, ObjGubn) {
		var sEmpl = document.getElementById(CodeObjVal).value;
		var sName = document.getElementById(NameObjVal).value;	
		if(ObjGubn == "2") {
			sEmpl = "";
		} else {
			sName = "";
		}	
		
		if((sEmpl == null || sEmpl == "") && (sName == null || sName == "") ) return false;
		
		var rowCnt = 0;
		$.ajax({
	        type:"POST",
	        url:"/mis/common/getEmplCnt.do",
	        data:"sEmpl="+sEmpl+"&sName="+sName,
	        dataType:"text", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	        async: false,
	        success : function(xsr) {
					//돌아온 결과를 json 객체로 바꾼다.
	        	rowCnt = xsr;
						   			
	        },
	        error : function(xhr, status, error) {
	        	 return false;
	        }
	    });	

		if(rowCnt == 0) {
			return false;
		} else if(rowCnt == 1) {
			$.ajax({
		        type:"POST",
		        url:"/mis/common/getEmplInfo.do",
		        data:"sEmpl="+sEmpl+"&sName="+sName,
		        dataType:"text", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
		        async: false,
		        success : function(xsr) {
						//돌아온 결과를 json 객체로 바꾼다.
						var jsonObj = JSON.parse(xsr);
						
						if(ObjGubn == "2") {
							document.getElementById(CodeObjVal).value = jsonObj.Data[0].emplNumb;
						} else {
							document.getElementById(NameObjVal).value = jsonObj.Data[0].emplName;
						}
						
						doAction("search");
		        },
		        error : function(xhr, status, error) {
		              alert("에러발생");
		        }
		    });	
		} else {
			__GetCallEmpl(CodeObjVal,NameObjVal);
		}
	}
	
	var findCodeVal;
	var findNameVal;
	//----- 사원 정보 찾기
	function __GetCallEmpl(CodeObjVal, NameObjVal){
		findCodeVal = CodeObjVal;
		findNameVal = NameObjVal;
		
		var w = 520;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;		
		
		var sEmpl = "";
		var sName = "";
		
		if(CodeObjVal != "" && CodeObjVal != null)
			sEmpl = document.getElementById(CodeObjVal).value;
		if(NameObjVal != "" && NameObjVal != null)
			sName = document.getElementById(NameObjVal).value;
		
		var getEmplRtn = window.open("/mis/common/FindEmpl.do?sEmpl="+sEmpl+"&sName="+encodeURIComponent(sName), "사원정보찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	
	function ReturnCallEmpl(firstVal, secondVal) {
		if (findCodeVal != null || findNameVal != null){
			if(findCodeVal != "" && findCodeVal != null)
				document.getElementById(findCodeVal).value = firstVal;
			if(findNameVal != "" && findNameVal != null)			
				document.getElementById(findNameVal).value = secondVal;
			
			findCodeVal = null;
			findNameVal = null;
		}
	}
	
	//----- 사원 그룹 정보 찾기
	function __GetCallGrEmpl(CodeObjVal, NameObjVal){
		findCodeVal = CodeObjVal;
		findNameVal = NameObjVal;
		
		var w = 570;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;		
		
		var sEmpl = "";
		var sName = "";
		
		if(CodeObjVal != "" && CodeObjVal != null)
			sEmpl = document.getElementById(CodeObjVal).value;
		if(NameObjVal != "" && NameObjVal != null)
			sName = document.getElementById(NameObjVal).value;
		
		var getEmplRtn = window.open("/mis/common/FindGrEmpl.do?sEmpl="+sEmpl+"&sName="+encodeURIComponent(sName), "사원(그룹)정보찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	
	function ReturnCallGrEmpl(firstVal, secondVal) {
		if (findCodeVal != null || findNameVal != null){
			if(findCodeVal != "" && findCodeVal != null)
				document.getElementById(findCodeVal).value = firstVal;
			if(findNameVal != "" && findNameVal != null)			
				document.getElementById(findNameVal).value = secondVal;
			
			findCodeVal = null;
			findNameVal = null;
		}
	}
	
	//----- 부서 정보 찾기
	function __GetCallDepa(CodeObjVal, NameObjVal){
		findCodeVal = CodeObjVal;
		findNameVal = NameObjVal;
		
		var w = 520;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;		
		
		var sDpcd = "";
		var sDnam = "";
		
		if(CodeObjVal != "" && CodeObjVal != null)
			sDpcd = document.getElementById(CodeObjVal).value;
		if(NameObjVal != "" && NameObjVal != null)
			sDnam = document.getElementById(NameObjVal).value;
		
		var getDepaRtn = window.open("/mis/common/FindDepa.do?sDpcd="+sDpcd+"&sDnam="+encodeURIComponent(sDnam), "부서찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	
	function ReturnCallDepa(firstVal, secondVal) {
		if (findCodeVal != null || findNameVal != null){
			if(findCodeVal != "" && findCodeVal != null)
				document.getElementById(findCodeVal).value = firstVal;
			if(findNameVal != "" && findNameVal != null)			
				document.getElementById(findNameVal).value = secondVal;
			
			findCodeVal = null;
			findNameVal = null;
		}
	}
	
	//----- 거래처 찾기
	function __GetCallCust(CodeObjVal, NameObjVal){
		findCodeVal = CodeObjVal;
		findNameVal = NameObjVal;
		
		var w = 550;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sCucd = "";
		var sCunm = "";
		
		if(CodeObjVal != "" && CodeObjVal != null)
			sCucd = document.getElementById(CodeObjVal).value;
		if(NameObjVal != "" && NameObjVal != null)
			sCunm = document.getElementById(NameObjVal).value;
		
		var getDepaRtn = window.open("/mis/common/FindCust.do?sCucd="+sCucd+"&sCunm="+encodeURIComponent(sCunm), "거래처찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	
	function ReturnCallCust(firstVal, secondVal) {
		if (findCodeVal != null || findNameVal != null){
			if(findCodeVal != "" && findCodeVal != null)
				document.getElementById(findCodeVal).value = firstVal;
			if(findNameVal != "" && findNameVal != null)			
				document.getElementById(findNameVal).value = secondVal;
			
			findCodeVal = null;
			findNameVal = null;
		}
	}
	
	//----- 거래처 찾기
	function __GetCallCust2(CodeObjVal, NameObjVal){
		findCodeVal = CodeObjVal;
		findNameVal = NameObjVal;
		
		var w = 550;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sCucd = "";
		var sCunm = "";
		
		if(CodeObjVal != "" && CodeObjVal != null)
			sCucd = document.getElementById(CodeObjVal).value;
		if(NameObjVal != "" && NameObjVal != null)
			sCunm = document.getElementById(NameObjVal).value;
		
		var getDepaRtn = window.open("/mis/common/FindCust2.do?sCucd="+sCucd+"&sCunm="+encodeURIComponent(sCunm), "거래처찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	
	//----- 계정 찾기
	function __GetCallAcct(CodeObjVal, NameObjVal){
		findCodeVal = CodeObjVal;
		findNameVal = NameObjVal;
		
		var w = 520;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sAccd = "";
		var sAcnm = "";
		
		if(CodeObjVal != "" && CodeObjVal != null)
			sAccd = document.getElementById(CodeObjVal).value;
		if(NameObjVal != "" && NameObjVal != null)
			sAcnm = document.getElementById(NameObjVal).value;
		
		var getDepaRtn = window.open("/mis/common/FindAcct.do?sAccd="+sAccd+"&sAcnm="+encodeURIComponent(sAcnm), "계정과목찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	
	//----- 계정 찾기 (결의서에서)
	function __GetCallAcctKy(CodeObjVal, NameObjVal){
		findCodeVal = CodeObjVal;
		findNameVal = NameObjVal;
		
		var w = 520;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sAccd = "";
		var sAcnm = "";
		
		if(CodeObjVal != "" && CodeObjVal != null)
			sAccd = document.getElementById(CodeObjVal).value;
		if(NameObjVal != "" && NameObjVal != null)
			sAcnm = document.getElementById(NameObjVal).value;
		
		var getDepaRtn = window.open("/mis/common/FindAcctKy.do?sAccd="+sAccd+"&sAcnm="+encodeURIComponent(sAcnm), "계정과목찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	
	//----- 계정 찾기 (회계쪽 사용시)
	function __GetCallAcctAll(CodeObjVal, NameObjVal){
		findCodeVal = CodeObjVal;
		findNameVal = NameObjVal;
		
		var w = 520;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sAccd = "";
		var sAcnm = "";
		
		if(CodeObjVal != "" && CodeObjVal != null)
			sAccd = document.getElementById(CodeObjVal).value;
		if(NameObjVal != "" && NameObjVal != null)
			sAcnm = document.getElementById(NameObjVal).value;
		
		var getDepaRtn = window.open("/mis/common/FindAcctAll.do?sAccd="+sAccd+"&sAcnm="+encodeURIComponent(sAcnm), "계정과목찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	
	function ReturnCallAcct(firstVal, secondVal) {
		if (findCodeVal != null || findNameVal != null){
			if(findCodeVal != "" && findCodeVal != null)
				document.getElementById(findCodeVal).value = firstVal;
			if(findNameVal != "" && findNameVal != null)			
				document.getElementById(findNameVal).value = secondVal;
			
			findCodeVal = null;
			findNameVal = null;
		}
	}
	
	var findGubnVal = ""; // -- 추가 (2016-06-17 김성빈)
	//----- (2016-06-17 김성빈) 기타/사업소득자 찾기
	function __GetCallSodk(CodeObjVal, NameObjVal, SodkGubnVal){
		findCodeVal = CodeObjVal;
		findNameVal = NameObjVal;
		findGubnVal = SodkGubnVal;
		
		var w = 520;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;		
		
		var sEmpl = "";
		var sName = "";
		
		if(CodeObjVal != "" && CodeObjVal != null)
			sEmpl = document.getElementById(CodeObjVal).value;
		if(NameObjVal != "" && NameObjVal != null)
			sName = document.getElementById(NameObjVal).value;
		
		var getEmplRtn = window.open("/mis/common/FindSodk.do?sEmpl="+sEmpl+"&sName="+encodeURIComponent(sName)+"&sGubn="+findGubnVal, "사업/기타소득자 찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	
	function ReturnCallSodk(firstVal, secondVal) {
		if (findCodeVal != null || findNameVal != null){
			if(findCodeVal != "" && findCodeVal != null)
				document.getElementById(findCodeVal).value = firstVal;
			if(findNameVal != "" && findNameVal != null)			
				document.getElementById(findNameVal).value = secondVal;
			
			findCodeVal = null;
			findNameVal = null;
			findGubnVal = null;
		}
	}	
	
	var SheetName = "";
	var SheetRow = 0;
	var SheetCol = 0;
	var SheetNCol = 0;	
	var Sheet2Col = 0;
	var Sheet2Ncol = 0;
	var Sheet3Ncol = 0;
	var Sheet4Ncol = 0;
	var Sheet5NCol = 0;
	
	//----- (2016-06-17 김성빈) 사업기타소득자 찾기
	function __GetCallSodkSheet(SName, Row, Col, NCol, SGubn){
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		findGubnVal = SGubn;
		
		var w = 520;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sAccd = "";
		var sAcnm = "";
				
		var getDepaRtn = window.open("/mis/common/FindSodkSheet.do?sEmpl=&sName=&sGubn="+findGubnVal, "사업/기타소득자 찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);				
	}
	
	function ReturnCallSodkSheet(firstVal, secondVal) {
		if(SheetName != "" && SheetName != null) {	
			eval(SheetName+".SetCellValue("+SheetRow+","+SheetCol+",'"+firstVal+"');");
			
			if(SheetNCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+SheetNCol+",'"+secondVal+"');");
			}
		}
		SheetName = "";
		SheetRow = 0;
		SheetCol = 0;
		SheetNCol = 0;
		findGubnVal = "";
	}
	
	//----- SHEET 계정 찾기
	function __GetCallAcctSheet(SName, Row, Col, NCol){
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		
		var w = 520;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sAccd = "";
		var sAcnm = "";
				
		var getDepaRtn = window.open("/mis/common/FindAcctSheet.do?sAccd="+sAccd+"&sAcnm="+encodeURIComponent(sAcnm), "계정과목찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	
	//----- SHEET 계정 찾기 (결의서에서)
	function __GetCallAcctSheetKy(SName, Row, Col, NCol){
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		
		var w = 520;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sAccd = "";
		var sAcnm = "";
				
		var getDepaRtn = window.open("/mis/common/FindAcctSheetKy.do?sAccd="+sAccd+"&sAcnm="+encodeURIComponent(sAcnm), "계정과목찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	
	//----- SHEET 계정 찾기 (회계 전체선택)
	function __GetCallAcctSheetAll(SName, Row, Col, NCol){
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		
		var w = 520;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sAccd = "";
		var sAcnm = "";
				
		var getDepaRtn = window.open("/mis/common/FindAcctSheetAll.do?sAccd="+sAccd+"&sAcnm="+encodeURIComponent(sAcnm), "계정과목찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}	
	
	function ReturnCallAcctSheet(firstVal, secondVal) {
		if(SheetName != "" && SheetName != null) {	
			eval(SheetName+".SetCellValue("+SheetRow+","+SheetCol+",'"+firstVal+"');");
			
			if(SheetNCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+SheetNCol+",'"+secondVal+"');");
			}
		}
		SheetName = "";
		SheetRow = 0;
		SheetCol = 0;
		SheetNCol = 0;
	}
	
	//----- SHEET 인사정보 찾기
	function __GetCallEmplSheet(SName, Row, Col, NCol){
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		
		var w = 520;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sEmpl = "";
		var sName = "";
				
		var getDepaRtn = window.open("/mis/common/FindEmplSheet.do?sEmpl="+sEmpl+"&sName="+encodeURIComponent(sName), "사원정보찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);				
	}
	
	function ReturnCallEmplSheet(firstVal, secondVal) {
		if(SheetName != "" && SheetName != null) {	
			eval(SheetName+".SetCellValue("+SheetRow+","+SheetCol+",'"+firstVal+"');");
			
			if(SheetNCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+SheetNCol+",'"+secondVal+"');");
			}
		}
		SheetName = "";
		SheetRow = 0;
		SheetCol = 0;
		SheetNCol = 0;
	}
	
	//----- SHEET 인사정보 찾기
	function __GetCallEmplSheet2(SName, Row, Col, NCol, Col2, NCol2, NCol3, NCol4){
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		Sheet2Col = Col2;
		Sheet2NCol = NCol2;
		Sheet3NCol = NCol3;
		Sheet4NCol = NCol4;
		
		var w = 520;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sEmpl = "";
		var sName = "";
				
		var getDepaRtn = window.open("/mis/common/FindEmplSheet2.do?sEmpl="+sEmpl+"&sName="+encodeURIComponent(sName), "사원정보찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);				
	}
	
	function ReturnCallEmplSheet2(firstVal, secondVal, thirdVal, forthVal, fifthVal, sixthVal) {
		if(SheetName != "" && SheetName != null) {	
			eval(SheetName+".SetCellValue("+SheetRow+","+SheetCol+",'"+firstVal+"');");
			
			if(SheetNCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+SheetNCol+",'"+secondVal+"');");
			}
			
			if(Sheet2Col > 0) {			
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet2Col+",'"+thirdVal+"');");
			}
			
			if(Sheet2NCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet2NCol+",'"+forthVal+"');");
			}
			
			if(Sheet3NCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet3NCol+",'"+fifthVal+"');");
			}
			
			if(Sheet4NCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet4NCol+",'"+sixthVal+"');");
			}	
		}
		SheetName = "";
		SheetRow = 0;
		SheetCol = 0;
		SheetNCol = 0;
		Sheet2Col = 0;
		Sheet2NCol = 0;
		Sheet3NCol = 0;
		Sheet4NCol = 0;	
	}
	
	//----- SHEET 인사(그룹)정보 찾기
	function __GetCallGrEmplSheet(SName, Row, Col, NCol, Col2, NCol2, NCol3){
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		Sheet2Col = Col2;
		Sheet2NCol = NCol2;
		Sheet3NCol = NCol3;
		
		var w = 570;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sEmpl = "";
		var sName = "";
				
		var getDepaRtn = window.open("/mis/common/FindGrEmplSheet.do?sEmpl="+sEmpl+"&sName="+encodeURIComponent(sName), "사원(그룹)정보찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);				
	}
	
	function ReturnCallGrEmplSheet(firstVal, secondVal, thirdVal, forthVal, fifthVal) {
		if(SheetName != "" && SheetName != null) {	
			eval(SheetName+".SetCellValue("+SheetRow+","+SheetCol+",'"+firstVal+"');");
			
			if(SheetNCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+SheetNCol+",'"+secondVal+"');");
			}
			
			if(Sheet2Col > 0) {			
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet2Col+",'"+thirdVal+"');");
			}
			
			if(Sheet2NCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet2NCol+",'"+forthVal+"');");
			}
			
			if(Sheet3NCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet3NCol+",'"+fifthVal+"');");
			}			
		}
		SheetName = "";
		SheetRow = 0;
		SheetCol = 0;
		SheetNCol = 0;
		Sheet2Col = 0;
		Sheet2NCol = 0;
		Sheet3NCol = 0;		
	}
	
	//----- SHEET 부서정보 찾기
	function __GetCallDepaSheet(SName, Row, Col, NCol){
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		
		var w = 520;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sDpcd = "";
		var sDnam = "";
				
		var getDepaRtn = window.open("/mis/common/FindDepaSheet.do?sDpcd="+sDpcd+"&sDnam="+encodeURIComponent(sDnam), "부서찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);						
	}
	
	function ReturnCallDepaSheet(firstVal, secondVal) {
		if(SheetName != "" && SheetName != null) {	
			eval(SheetName+".SetCellValue("+SheetRow+","+SheetCol+",'"+firstVal+"');");
			
			if(SheetNCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+SheetNCol+",'"+secondVal+"');");
			}
		}
		SheetName = "";
		SheetRow = 0;
		SheetCol = 0;
		SheetNCol = 0;
	}		
	
	//----- SHEET 거래처정보 찾기
	function __GetCallCustSheet(SName, Row, Col, NCol){
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		
		var w = 550;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sCucd = "";
		var sCunm = "";
				
		var getDepaRtn = window.open("/mis/common/FindCustSheet.do?sCucd="+sCucd+"&sCunm="+encodeURIComponent(sCunm), "거래처찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);								
	}
	
	function ReturnCallCustSheet(firstVal, secondVal) {
		if(SheetName != "" && SheetName != null) {	
			eval(SheetName+".SetCellValue("+SheetRow+","+SheetCol+",'"+firstVal+"');");
			
			if(SheetNCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+SheetNCol+",'"+secondVal+"');");
			}
		}
		SheetName = "";
		SheetRow = 0;
		SheetCol = 0;
		SheetNCol = 0;
	}
	
	//----- SHEET 거래처정보 찾기
	function __GetCallCustSheet2(SName, Row, Col, NCol, BCol, ACol){
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		Sheet2Col = BCol;
		Sheet2Ncol = ACol;
		
		var w = 550;
		var h = 510;
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sCucd = "";
		var sCunm = "";
				
		var getDepaRtn = window.open("/mis/common/FindCustSheet2.do?sCucd="+sCucd+"&sCunm="+encodeURIComponent(sCunm), "거래처찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);								
	}
	
	function ReturnCallCustSheet2(firstVal, secondVal, thirdVal, fourthVal) {
		if(SheetName != "" && SheetName != null) {	
			eval(SheetName+".SetCellValue("+SheetRow+","+SheetCol+",'"+firstVal+"');");
			
			if(SheetNCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+SheetNCol+",'"+secondVal+"');");
			}
			
			if(Sheet2Col > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet2Col+",'"+thirdVal+"');");
			}
			
			if(Sheet2Ncol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet2Ncol+",'"+fourthVal+"');");
			}			
		}
		SheetName = "";
		SheetRow = 0;
		SheetCol = 0;
		SheetNCol = 0;
		Sheet2Col = 0;
		Sheet2Ncol = 0;		
	}
	
	//--- 회원사 찾기 2016-08-02
	function __GetCallMember(CodeObjVal, NameObjVal){
		findCodeVal = CodeObjVal;
		findNameVal = NameObjVal;
		
		var w = 520;
		var h = 510;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;		
		
		var sEmpl = "";
		var sName = "";
		
		if(CodeObjVal != "" && CodeObjVal != null)
			sEmpl = document.getElementById(CodeObjVal).value;
		if(NameObjVal != "" && NameObjVal != null)
			sName = document.getElementById(NameObjVal).value;
		
		var getMembRtn = window.open("/mis/common/FindMember.do?sMbcd="+sEmpl+"&sMbnm="+encodeURIComponent(sName), "회원사정보찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	
	function ReturnCallMember(firstVal, secondVal) {
		if (findCodeVal != null || findNameVal != null){
			if(findCodeVal != "" && findCodeVal != null)
				document.getElementById(findCodeVal).value = firstVal;
			if(findNameVal != "" && findNameVal != null)			
				document.getElementById(findNameVal).value = secondVal;
			
			findCodeVal = null;
			findNameVal = null;
		}
	}
	
	//----- SHEET 회원사 찾기 2016-08-02
	function __GetCallMemberSheet(SName, Row, Col, NCol){
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		
		var w = 550;
		var h = 510;

		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sCucd = "";
		var sCunm = "";
				
		var getMembRtn = window.open("/mis/common/FindMemberSheet.do?sMbcd="+sCucd+"&sMbnm="+encodeURIComponent(sCunm), "회원사찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);								
	}
	
	function ReturnCallMemberSheet(firstVal, secondVal) {
		if(SheetName != "" && SheetName != null) {	
			eval(SheetName+".SetCellValue("+SheetRow+","+SheetCol+",'"+firstVal+"');");
			
			if(SheetNCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+SheetNCol+",'"+secondVal+"');");
			}
		}
		SheetName = "";
		SheetRow = 0;
		SheetCol = 0;
		SheetNCol = 0;
	}
	
	//----- SHEET 회원사 찾기 2016-08-18
	function __GetCallMemberBusiSheet(SName, Row, Col, NCol, BNo){
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		
		var w = 550;
		var h = 510;

		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var sCucd = "";
		var sCunm = "";
				
		var getMembRtn = window.open("/mis/common/FindMemberBusiSheet.do?sMbcd="+sCucd+"&sMbnm="+encodeURIComponent(sCunm)+"&bNumb="+BNo, "회원사찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);								
	}
	
//=================================================================================================
//===== 날짜선택 모달 팝업 열기 =====
var __calendarRtn; // return할 변수, 문자열배열(4) { 연도, 월, 일, 연월일 }
var __objNameHead;
var __objValueProp;
function CallCalendar(){ // 모달팝업 호출 함수
	//__calendarRtn = window.showModalDialog("/common/html/calender.htm","Calendar","dialogwidth:180px;dialogheight:205px;scroll:0;help:0;status:0");
	var left = window.screenX + (window.outerWidth / 2) - (180 / 2);
	var top = window.screenY + (window.outerHeight / 2) - (205 / 2);
	__calendarRtn = window.open("/common/html/calender.htm", "Calendar", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=180, height=205, top=' + top + ', left=' + left);
}

//===== 개체에 날짜선택 모달팝업에서 얻은 값 넣기 =====
//----- 한 개체에 넣기
function __GetCallCalendar(objNameHead, objValueProp){
	__objNameHead = objNameHead;
	__objValueProp = objValueProp;
	CallCalendar();

	if (__calendarRtn!=null && __calendarRtn.length>=4 ){
		eval( "document.getElementById(\""+objNameHead+"\")."+objValueProp+" = __calendarRtn[3];" );
		if(objNameHead == "txt_vaca_eday") fncCalcDay(); // 특수예외처리
		__calendarRtn=null;
	}
}

function getReturnValue(obj) {
	__calendarRtn = obj;
	if (__calendarRtn!=null && __calendarRtn.length>=4 ){
		eval( "document.getElementById(\""+__objNameHead+"\")."+__objValueProp+" = __calendarRtn[3];" );
		if(__objNameHead == "txt_vaca_eday") fncCalcDay(); // 특수예외처리
		__calendarRtn=null;
	}
}

//=================================================================================================

//===== 현재 연/월/일/요일 가져오기 ===== 
var __yyyy, __mm, __dd, __dateOfWeek, __ymd;
__CallGetDate();
function __CallGetDate() {
	var today = new Date();
	__yyyy = (today.getYear()).toString();
	__mm = (today.getMonth()+1).toString();
	__dd = (today.getDate()).toString();
	__dateOfWeek = today.getDay();

	switch ( __yyyy.length ) { 
		case 1 : __yyyy="000"+__yyyy; break; 
		case 2 : __yyyy="00"+__yyyy; break; 
		case 3 : __yyyy="0"+__yyyy; break; 
		case 4 : break; 
		default : __yyyy="9999";
	}
	if ( __mm.length == 1 ) { __mm="0"+__mm; }
	if ( __dd.length == 1 ) { __dd="0"+__dd; }
	__dateOfWeek = __getDayStr(__dateOfWeek);

	__ymd=__yyyy+__mm+__dd;
}

//===== 해당 요일문자
function __getDayStr(day) { // 요일문자 호출
	if ( day<0 || day>6 ) { return null; }
	var x = new Array("일", "월", "화", "수","목", "금", "토");
	return(x[day]);
}
//=================================================================================================


/**
 * @type   : function
 * @access : public
 * @desc   : 서버로 부터 생성된 가우스 내용을 파싱하여 메시지만 Alert창으로 띄워준다.
 * <pre>
 *     cfAlertGauceMsg(ErrorMsg);
 * </pre>
 * 위와같이 사용했을 경우 경고창을 리턴한다.
 * @param  : msg required 입력값
 * @return : 길이값
 */
function cfAlertGauceMsg(msg) 
{
	var msgCode = msg.lastIndexOf("]");	
	alert(msg.substring(msgCode+1)+ "\t\n");
}


//=================================================================================================
//===== 내국인(주민)/외국인등록번호 체크 - 인자 1
function __JuminNoCheck ( no ) {
	// return -1:입력없음, 0:비정상, 1:정상
	if( !no || no.length==0 ){ return -1; } //
	if( !no || no.length<13 ){ return 0; } 
	if ( __JuminNoCheckNative ( no )==1 || __JuminNoCheckForeign ( no )==1 ) { return 1; } else { return 0; }
	return -1;
} 

//===== 내국인-주민등록번호 체크 - 인자 1
function __JuminNoCheckNative ( no ) {
	// return -1:입력없음, 0:비정상, 1:정상
	if( !no || no.length==0 ){ return -1; } //
	if( !no || no.length<13 ){ return 0; } 

	var no1 = no.substring(0,6);
	var no2 = no.substring(6,13);

	var f1 = no1.substring(0,1) ;
	var f2 = no1.substring(1,2) ;
	var f3 = no1.substring(2,3) ;
	var f4 = no1.substring(3,4) ;
	var f5 = no1.substring(4,5) ;
	var f6 = no1.substring(5,6) ;
	var hap = f1*2 + f2*3 + f3*4 + f4*5 + f5*6 + f6*7 ;
	var l1 = no2.substring(0,1) ;
	var l2 = no2.substring(1,2) ;
	var l3 = no2.substring(2,3) ;
	var l4 = no2.substring(3,4) ;
	var l5 = no2.substring(4,5) ;
	var l6 = no2.substring(5,6) ;
	var l7 = no2.substring(6,7) ;

	hap = hap + l1*8 + l2*9 + l3*2 + l4*3 + l5*4 + l6*5 ;
	hap = hap%11 ;
	hap = 11-hap ;
	hap = hap%10 ;

	if (hap !=  l7){ return 0; } 

	return 1;
} 

//===== 외국인등록번호 체크 - 인자 1
function __JuminNoCheckForeign ( no ){
	var birthYear, birthMonth, birthDate, birth;
	
	if ((no.charAt(6) == "5") || (no.charAt(6) == "6")) { birthYear = "19"; }
	else if ((no.charAt(6) == "7") || (no.charAt(6) == "8")) { birthYear = "20"; }
	else if ((no.charAt(6) == "9") || (no.charAt(6) == "0")) { birthYear = "18"; }
	else { return 0; } //  외국인 등록번호 오류 

	birthYear	+= no.substr(0, 2);
	birthMonth	= no.substr(2, 2) - 1;
	birthDate	= no.substr(4, 2);
	birth			= new Date(birthYear, birthMonth, birthDate);
	
	if ( birth.getYear() % 100 != no.substr(0, 2) || birth.getMonth() != birthMonth || birth.getDate() != birthDate) { return 0; } // 생년월일 오류
	
	if ( __JuminNoCheckForeignDetail(no) < 1 ){ return 0; } // 외국인등록번호 오류 
	else { return 1; } // 정상
}

//===== 외국인 등록번호 상세체크 - 인자 1
function __JuminNoCheckForeignDetail ( no ) {
	// return -1:입력없음, 0:비정상, 1:정상
	if( !no || no.length==0 ){ return -1; } //
	if( !no || no.length<13 ){ return 0; } 

	var sum = 0;
	var odd = 0;
	
	buf = new Array(13);
	for (i = 0; i < 13; i++) buf[i] = parseInt(no.charAt(i));

	odd = buf[7]*10 + buf[8];
	if (odd%2 != 0) { return 0; }

	if ((buf[11] != 6)&&(buf[11] != 7)&&(buf[11] != 8)&&(buf[11] != 9)) { return 0; }

	multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
	for (i = 0, sum = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);

	sum=11-(sum%11);
	if (sum>=10) sum-=10;
	sum += 2;
	if (sum>=10) sum-=10;
	if ( sum != buf[12]) { return 0; } else { return 1; }
}

//================================================================================================

//===== 문자열 좌측의 공백 제거 처리 함수 
function __Ltrim(para) {
	while(para.substring(0, 1) == ' ') {
		para = para.substring(1, para.length);
	}
	
	return para;
}

//===== 문자열 우측의 공백 제거 처리 함수 
function __Rtrim(para) {
	while(para.substring(para.length-1, 1) == ' ') {
		para = para.substring(0, para.length-1);
	}
	
	return para;
}
//===== 문자열 좌우측의 공백 제거 처리 함수 
function __Trim(para) {
	return __Ltrim(__Rtrim(para));
}

	function __NumToCommaStr( n, s ) { 
		if ( s < 1 ) { return n; }

		var str = n.toString();
		var size = str.length;
		var rtn = "";
		for ( var i=size; i>0; i-- ) {
			if ( (size-i)%s==0 && (size-i)!=0 ) { rtn=","+rtn; }
			rtn = str.substr(i-1,1) + rtn;
		}
		return rtn;
	}

	//===== 두 날짜문자 '20010101', '20021231' 의 날짜차이를 정수로 반환하는 함수 
	function __DayDiff(d1,d2){ 
		if ( __Trim(d1).length!=8 || __Trim(d2).length!=8 ) { return -1; }
		var date1 = new Date( d1.substring(0,4), d1.substring(4,6), d1.substring(6,8) );
		var date2 = new Date( d2.substring(0,4), d2.substring(4,6), d2.substring(6,8) );
		return Math.ceil((date2 - date1) / 1000 / 24 / 60 / 60); 
	}

//================================================================================================
/*
function fncIsDateRight(date){
	if(date != "" && (date.length < 8 || eval(date.substring(0,4)) <= 0 || (eval(date.substring(4,6)) < 1 || eval(date.substring(4,6)) > 12) || (eval(date.substring(6,8)) < 1 || eval(date.substring(6,8)) > 31))){
		return false;
	}
	return true;
}
*/
function IsDigit(ch) 
{
  return ((ch >= "0") && (ch <= "9"));
}

function IsEmpty(str) 
{   
  return ((str == null) || (str.length == 0));
}

function IsInteger (str) 
{   
  if (IsEmpty(str)) 
    return false;
  
  for (var i = 0; i < str.length; i++)  
  {   
    var ch = str.charAt(i);
    if (!IsDigit(ch)) 
return false;
  }
  return true;
}

//일 체크
function IsDay (str) 
{ 
	if (IsEmpty(str)) 
	return false;
	else
	{ 
		if(!IsInteger(str))
		return false;
		else
		return((parseInt(str) >= 1) && (parseInt(str) <= 31)); 
	}
}
//월체크
function IsMonth (str) {
	if (IsEmpty(str)) {
		return false;
	}else	{ 
		if(!IsInteger(str)){return false;
		}else {return((parseInt(str) >= 1) && (parseInt(str) <= 12)); }
  }
}

//년도 체크
function IsYear (str) 
{ 
	if (IsEmpty(str)) {
		return false;
	}else	{
		if(!IsInteger(str)){		return false;}
		else{		return(str.length == 4); }
	}
}

//날짜 체크

function  fncIsDateRight(date){  

	var year		= date.substring(0,4);
	var month	= date.substring(4,6);
	var day		= date.substring(6,8);

	if (month.substring(0,1)=="0")
	{
		month = month.substring(1,2);
	}
	if (day.substring(0,1)=="0")
	{
		day = day.substring(1,2);
	}


	if (!(IsYear(year) && IsMonth(month) && IsDay(day)))     return false;


	var LastDayAry = new Array();

	if(month == 1) {
		LastDayAry[1] = 31;
	} else if(month == 2) {
		if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
			LastDayAry[2] = 29;
		} else {
			LastDayAry[2] = 28;
		}
	} else if(month == 3){ LastDayAry[3] = 31;
	} else if(month == 4){ LastDayAry[4] = 30;
	} else if(month == 5){ LastDayAry[5] = 31;
	} else if(month == 6){ LastDayAry[6] = 30;
	} else if(month == 7){ LastDayAry[7] = 31;
	} else if(month == 8){ LastDayAry[8] = 31;
	} else if(month == 9){ LastDayAry[9] = 30;
	} else if(month == 10){ LastDayAry[10] = 31;
	} else if(month == 11){ LastDayAry[11] = 30;
	} else if(month == 12){ LastDayAry[12] = 31;
	}

	var intYear = parseInt(year);
	var intMonth = parseInt(month);
	var intDay = parseInt(day);

	if (intDay > LastDayAry[intMonth]) {return false;}
	return true;
	
}

//==================================================================================================
function fncWonUpper(data){

	var tmp_data = String(Math.round(data));
	
	var won = Number(tmp_data.substring(tmp_data.length-1,tmp_data.length));
	
	var won_over = Number(tmp_data.substring(0,tmp_data.length-1));
	
	if(won < 5){
	
		data = Number(String(won_over) + "0");
	
	}else{
	
		data = Number(String(won_over+1) + "0"); 
	
	}
	
	return data;

}

function gs_trim(str) {
	return (str.replace(/^\s+|\s+$/g , ''));
}

function gs_FillBlank(str,len){
	if(str == 'undefined' || str == null || gs_trim(str) == "" ) return "";
	var strLen = gs_trim(str).length;
	if(parseInt(strLen) <= 0 || parseInt(strLen) >= parseInt(len)) return str;
	var str2 = "";
	if(parseInt(strLen) < parseInt(len)){
		for(var i=1;i <= (parseInt(len)-parseInt(strLen)); i++){
			str2 += "0";
		}
	}
	return str2 + str;
}

//-----------------------------------------------------------------------------
// DESCRIPTION: 사업자번호를 체크한다.(3자리-2자리-5자리)-고유번호와 동일
// INPUT DATA	: '1234567890'
// RETURN VALUE	: 일치-true, 실패-false
//-----------------------------------------------------------------------------
function cfBizNoCheck(sBusiNo) {
	var iBusi = new Array();
	var iSum  = 0;
	var iMod  = 0;
	var iMod_a = 0;
	var iMod_b = 0;
	var iMod_c = 0;

	if(sBusiNo == "" || sBusiNo == " ") return true;// Null은 체크 않음

	if(sBusiNo.length != 10) {						// 처음은 자리수부터 Check 한다.
		return false;
	}

	iBusi[0]  = parseInt(sBusiNo.substring(0,1),  10);
	iBusi[1]  = parseInt(sBusiNo.substring(1,2),  10) * 3;
	iBusi[2]  = parseInt(sBusiNo.substring(2,3),  10) * 7;
	iBusi[3]  = parseInt(sBusiNo.substring(3,4),  10);
	iBusi[4]  = parseInt(sBusiNo.substring(4,5),  10) * 3;
	iBusi[5]  = parseInt(sBusiNo.substring(5,6),  10) * 7;
	iBusi[6]  = parseInt(sBusiNo.substring(6,7),  10);
	iBusi[7]  = parseInt(sBusiNo.substring(7,8),  10) * 3;
	iBusi[8]  = parseInt(sBusiNo.substring(8,9),  10) * 5;
	iBusi[9]  = parseInt(sBusiNo.substring(9,10), 10);

	// 8 자리수 까지 SUM
	for(var i=0; i < sBusiNo.length - 2; i++) {
		iSum += iBusi[i];
	}

	iMod_a = iSum  %  10;							// 10으로 나눈 나머지 a
													// 9번째 자리 는
	iMod_b = parseInt((iBusi[8] / 10),10);  		// 몫     b
	iMod_c = iBusi[8] % 10;                 		// 나머지 c
	iMod   = 10 -  ((iMod_a + iMod_b + iMod_c) % 10);
	iMod   = iMod % 10;

	if(iMod == iBusi[9]) {
		return true;								// 사업자 번호 OK
	}
	else {
		return false;								// 사업자 번호 오류
	}
}



//-----------------------------------------------------------------------------
// DESCRIPTION: 필수 입력사항 체크 - 일반 
// INPUT DATA	:  필수체크항목(배열) , 체크항목타입(배열) , 체크항목이름(배열)
// RETURN VALUE	: 만족-true, 불만족-false
//-----------------------------------------------------------------------------

 function cfInputCheck(arrItem , arrType, arrName)
{

	var len	= arrItem.length;
	var len2 = arrType.length;
	var len3 = arrName.length;

	if(len != len2 || len != len3) 
	{
		alert("검사항목수와 검사항목타입수가 일치하지 않습니다!!");
		return;
	}

	var tmpObjValue;
	for(var i=0 ; i < len ; i++)
	{
		tmpObjValue = eval(arrItem[i]+"."+arrType[i]);

		if(tmpObjValue == "" || tmpObjValue == null ) 
		{
			alert(arrName[i]+" 은(는) 필수입력사항입니다!!");
			if(arrType[i].toLowerCase() == "value")
			{
				eval(arrItem[i]).focus();
			}
			else
			{
				eval(arrItem[i]).Focus();
			}
			return;
		}
	}

	return true;
}



//-----------------------------------------------------------------------------
// DESCRIPTION: 필수 입력사항 체크 - gauce grid 입력시
// INPUT DATA	:  필수체크항목(배열) , 체크항목타입(배열) , 체크항목이름(배열)
// RETURN VALUE	: 만족-true, 불만족-false
//-----------------------------------------------------------------------------

 function cfInputCheckGD(dsObj , arrColumn, arrName)
{

	var len	= dsObj.countrow;
	var len2 = arrColumn.length;
	var len3 = arrName.length;

	if(len2 != len3) 
	{
		alert("검사항목수와 검사항목명수가 일치하지 않습니다!!");
		return;
	}

	var tmpValue;
	for(var i=1 ; i <= len ; i++)
	{
		for(var j=0 ; j < len2 ; j++)
		{
			tmpValue = dsObj.NameValue(i , arrColumn[j]);

			if(tmpValue == "") 
			{
				alert(arrName[j]+" 은(는) 필수입력사항입니다!!")
				return;
			}
		}
	}

	return true;
}

/*
* 숫자에 콤마셋팅 
*@Input Param String type number
*@return Param 000,000,000
*/
function setComma(obj1) { 
	var sOrg = obj1 ;
  
    if(isNaN(sOrg) || sOrg.length==0) return "";
  
    var sRetVal     = "";
    var sTmpVal     = "";
    var sFractionVal  = "";
  
    sOrg = sOrg.toString();
    sOrg = sOrg.replace(/,/g,"");
  
    var lLengh = sOrg.search(/\./);
  
    if (lLengh<0) {
        lLengh = sOrg.length;
    } else {
        sFractionVal = sOrg.substr(lLengh);
	}
    lLengh    = lLengh;
    var lRemainder  = lLengh % 3;
  
    if (lRemainder == 0 && lLengh > 0) lRemainder  = 3;
  
    sRetVal = sOrg.substr(0,lRemainder);
  
    while(lRemainder < lLengh) {
       sTmpVal = sTmpVal + "," + sOrg.substr(lRemainder,3);
        lRemainder  += 3;
    }
    sRetVal = sRetVal + sTmpVal + sFractionVal;
    return sRetVal ;
 
  }
  /*
   * 팝업창 닫기
   */

  function win_close()
	{
		window.opener = self;
		self.window.open('','_parent','');
		self.window.close();
	}

//-----------------------------------------------------------------------------
// DESCRIPTION	: 주민등록번호 유효성 체크 (외국인 포함)
// INPUT DATA	: 주민등록번호 xxxxxxxxxxxxx
// RETURN VALUE	: true, false
// WRITER       : 최성호
//-----------------------------------------------------------------------------

 function isIdentifyNo(sID){
   if (sID == null || sID == '') return false; 
   if (sID.length != 13) return false;
   if (isNaN(sID)) return false;  //sID가 숫자가 아닐겨우 return

    if  (sID.charAt(6) <= "4"){          //내국인     
        cBit = 0;
        sCode="234567892345";

        for(i=0;i<12;i++)   {		// 주민등록번호 유효성 체크 계산로직에 의산 연산 시작
            cBit = cBit+parseInt(sID.substring(i,i+1))*parseInt(sCode.substring(i,i+1));
        }    
        cBit=11-(cBit%11);
        cBit=cBit%10;
   
        if(parseInt(sID.substring(12,13))==cBit) {
           return true;
        }else{
          return false;
		}
    }else{                       //외국인
         if   ((sID.charAt(6) == "5") || (sID.charAt(6) == "6")) birthYear = "19";
         else if ((sID.charAt(6) == "7") || (sID.charAt(6) == "8")) birthYear = "20";
         else if ((sID.charAt(6) == "9") || (sID.charAt(6) == "0")) birthYear = "18";
         else  return false;
        
         birthYear  += sID.substr(0, 2);
         birthMonth = sID.substr(2, 2) - 1;
         birthDate   = sID.substr(4, 2);
         birth         = new Date(birthYear, birthMonth, birthDate);
        
         if (birth.getYear() % 100 != sID.substr(0, 2) || birth.getMonth() != birthMonth || birth.getDate() != birthDate) {
              return false;
         }
         if (fgn_no_chksum(sID) == false){
             return false;
         }else{            
             return true;         
		 }
    }
 }
 
 function fgn_no_chksum(reg_no) {
     var sum = 0;
     var odd = 0;
     
     buf = new Array(13);
     for (i = 0; i < 13; i++) buf[i] = parseInt(reg_no.charAt(i));
     odd = buf[7]*10 + buf[8];    
     if (odd%2 != 0)       return false;
     
     if ((buf[11] != 6)&&(buf[11] != 7)&&(buf[11] != 8)&&(buf[11] != 9))  return false;
      
     multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
     for (i = 0, sum = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);
     sum=11-(sum%11);    
     if (sum>=10) sum-=10;
     sum += 2;
     if (sum>=10) sum-=10;
     if ( sum != buf[12]) return false;
     else  return true;
 }
 
 var toggle_cnt = 0;
 function leftMenuToggle() {
	 toggle_cnt++;

	 if(toggle_cnt % 2 == 0) {
			$(parent.document).find("#content").css({marginLeft: "240px"});	
			$(".btn_show_close_left").animate({left: "240px"}, {queue:false, duration: 10, easing: 'swing'});			
			$("#left_open_close").attr("src","/image/btn_close_left.gif");
	 } else { 
			$(parent.document).find("#content").css({marginLeft: "0px"});	
			$(".btn_show_close_left").animate({left: "0px"}, {queue:false, duration: 10, easing: 'swing'});			
			$("#left_open_close").attr("src","/image/btn_show_left.gif");
	 }
	 
}
 
	
 /***********************************************

 함수명 : fn_login_user
 설  명 : 로그인
 인  자 : formname(form 명)
 사용법 : fn_login_user(formname)
 작성일 : 2016.02.14
 수정일		수정자		Version		Function 명
 ______		______		_______		___________
 2016.02.14	abskim		1.0		최초생성

 *************************************************/
 function fn_login_user(formname){
 	theForm = eval("document."+formname); 
 	
 	if (!fn_check_input(formname, "USER_ID", "아이디", "", "", "", "", "")) {theForm.USER_ID.focus(); return false; }  
 	if (!fn_check_input(formname, "USER_PASSWORD", "비밀번호", "", "", "", "", "")) {theForm.USER_PASSWORD.focus(); return false; } 
 	
 	return true;
 } 
 
 /***********************************************

 함수명 : fn_check_input
 설  명 : input text type의 입력검사
 인  자 : form name, 엘리먼트, 숫자문자, 숫자구분, max length, min length, 이메일체크
 사용법 : fn_check_input(formname, elm, msg, StrOrNum, Num_gubun, max_len, min_len, IsEmail)
 작성일 : 2016.02.14
 수정일		수정자		Version		Function 명
 ______		______		_______		___________
 2016.02.14	abskim		1.0		최초생성

 *************************************************/

 function fn_check_input(formname, elm, msg, StrOrNum, Num_gubun, max_len, min_len, IsEmail) {
 	var form = eval("document."+ formname +"."+ elm);
 	var inputStr = form.value;

 	if (!inputStr) {
 		alert(msg +" 항목을 입력하십시오.");
 		form.focus();
 		return false;
 	} else {

 		if (StrOrNum=="Num") {
 			if (!fn_check_num(formname, elm, msg)) { return false; }
 		}
 	}
 	return true;
 } 
 
//금액변환스크립트2
 function amt_conv(as_amt)
 {
     //alert(as_amt);

     var ls_amt = "";
     var ls_han_nm = "";
     ls_han_nm_next = "";
     var ls_han_dan_we = "";
     var ls_han_dan_we_next = "";
     var ls_han_gul = "";
     var ll_len = 0;
     var ls_source = "";
     var ls_source_next = "";
     var ls_source_before = "0";
     var ls_jump_ck = "";
     var ls_jump_ck_temp = "";
     var n = 0;

     ls_dan = new Array(13);

     // 금액단위 선택 배열
     ls_dan[0] = "십";
     ls_dan[1] = "조";
     ls_dan[2] = "천";
     ls_dan[3] = "백";
     ls_dan[4] = "십";
     ls_dan[5] = "억";
     ls_dan[6] = "천";
     ls_dan[7] = "백";
     ls_dan[8] = "십";
     ls_dan[9] = "만";
     ls_dan[10] = "천";
     ls_dan[11] = "백";
     ls_dan[12] = "십";
     ls_dan[13] = "원";

     ls_amt = as_amt;

     // 금액의 총 자릿수 산정..
     ll_len = ls_amt.length ;
     //alert("ll_len = " + ll_len);

     // 입력값을 상위자리부터 한자리씩 변환..
     for(var n = 0; n < ll_len; n ++)
     {
         // 대상 숫자 추출
         ls_source = ls_amt.substring(n, n + 1);
         //alert("ls_source = " + ls_source);

         if(n < ll_len)
         {
             // 다음 숫자 추출
             ls_source_next = ls_amt.substring(n + 1, (n + 1) + 1);
             //alert("ls_source_next = " + ls_source_next);

             // 다음 숫자의 한글단위
             ls_han_dan_we_next = ls_dan[13 - (ll_len - 2) + n];
             //alert("ls_han_dan_we = " + ls_han_dan_we);
         }

         // 변환할 대상숫자의 한글명
         ls_han_nm = han_conv(ls_source);

         if(ls_han_nm == "-1")
         {
             alert("입력값중 " + ls_source + "는 숫자가 아닙니다.");
         }

         // 대상 숫자의 한글단위
         ls_han_dan_we = ls_dan[13 - (ll_len - 1) + n];

         if(ls_source != "0")
             ls_han_gul = ls_han_gul + ls_han_nm + ls_han_dan_we;

         // 변환자리가 십단위이고 다음자리의 수가 0 이면 다음자리의 단위합산 예) 변환자리:일십 다음자리:0억 --> 일십억
         if((ls_source_next == "0") && (ls_han_dan_we == "십"))
         {
             // 1조원이상에 대한 처리 --> 1조원이 1조억원이 되지않도록 처리
             if((ll_len > 12) && ((ll_len - n) == 10))
             {
                 ls_jump_ck_temp = ls_amt.substring((ll_len - 11), ll_len);
                 ls_jump_ck = ls_jump_ck_temp.substring(0, 4);

                 if(ls_jump_ck == "0000")
                     continue;
             }
             else if((ll_len > 8) && ((ll_len - n) == 6))  // 1억원에 대한 처리 --> 1억원이 1억만원이 되지않도록 처리
             {
                 ls_jump_ck_temp = ls_amt.substring((ll_len - 8), ll_len);
                 ls_jump_ck = ls_jump_ck_temp.substring(0, 4);

                 if(ls_jump_ck == "0000")
                     continue;
             }
             ls_han_gul = ls_han_gul + ls_han_dan_we_next;
         }
     }

     return ls_han_gul;
 }

//////////////////////////////////////
 // 숫자금액을 한글금액명으로 표기
 //////////////////////////////////////
 function han_conv(as_amt)
 {
     var ll_number = 0;
     var ls_hangul = "";

     ll_number = eval(as_amt);
     //alert("ll_number = " + ll_number);

     if(ll_number == 1)
         ls_hangul = "일";
     else if(ll_number == 2)
         ls_hangul = "이";
     else if(ll_number == 3)
         ls_hangul = "삼";
     else if(ll_number == 4)
         ls_hangul = "사";
     else if(ll_number == 5)
         ls_hangul = "오";
     else if(ll_number == 6)
         ls_hangul = "육";
     else if(ll_number == 7)
         ls_hangul = "칠";
     else if(ll_number == 8)
         ls_hangul = "팔";
     else if(ll_number == 9)
         ls_hangul = "구";
     else if(ll_number == 0)
         ls_hangul = "0";
     else
     ls_hangul = "-1";
     //alert(ls_hangul);

     return ls_hangul;
 }
 
 	// 숫자 콤마
	//[] <--문자 범위 [^] <--부정 [0-9] <-- 숫자  
	//[0-9] => \d , [^0-9] => \D
	//var rgx1 = /\D/g;   /[^0-9]/g 와 같은 표현
	var rgx1 = /[^0-9-]/g;
	var rgx2 = /(\d+)(\d{3})/; 
	function setNumber(obj){
		
	     var num;
	     num = obj.value;
	     num = num.replace(rgx1,"");
	     
	     while (rgx2.test(num)) {
	    	 num = num.replace(rgx2, '$1' + ',' + '$2');
	      }
	     obj.value =  num;
	}
 
	//----- (2016-06-29 수정) 사업구분 찾기 -- NameObjVal 추가
	function __GetCallSaub(CodeObjVal, NameObjVal){
		findCodeVal = CodeObjVal;
		findNameVal = NameObjVal;

		var w = 700;
		var h = 510;
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;		
		
		var getEmplRtn = window.open("/mis/common/FindSaub.do", "사업구분 찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	//----- (2016-06-29 수정)
	function ReturnCallSaub(firstVal, secondVal) {

		if (findCodeVal != null || findNameVal != null){
			if(findCodeVal != "" && findCodeVal != null)
				document.getElementById(findCodeVal).value = firstVal;
			if(findNameVal != "" && findNameVal != null){			
				document.getElementById(findNameVal).value = secondVal;
			}
			findCodeVal = null;
			findNameVal = null;
		}
		
		textToSheet();
	}	
	
	//----- SHEET 사업 찾기
	function __GetCallSaubSheet(SName, Row, Col, NCol, NCol2, NCol3, NCol4, NCol5, acctkind){
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		Sheet2NCol = NCol2;
		Sheet3NCol = NCol3;
		Sheet4NCol = NCol4;
		Sheet5NCol = NCol5;
		
		
		var w = 700;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var aKind = acctkind;
				
		var getDepaRtn = window.open("/mis/common/FindSaubSheet.do?aKind="+aKind, "사업찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
	}
	
	function __GetCallYesnSheet(firstVal, secondVal, thirdVal) {
		var w = 700;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		
		var wPlac = firstVal;
		var bNumb = secondVal;
		var aKind = thirdVal;
				
		var getDepaRtn = window.open("/mis/common/FindYesnSheet.do?wPlac="+wPlac+"&bNumb="+bNumb+"&aKind="+aKind, "예산찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
	}
	
	//----- 2016-08-17
	function __GetCallSaubAuto(CodeObjVal, NameObjVal, AcctKind){
		findCodeVal = CodeObjVal;
		findNameVal = NameObjVal;

		var w = 700;
		var h = 510;	
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;		
		
		var getEmplRtn = window.open("/mis/common/FindSaubAuto.do?aKind="+AcctKind, "사업구분 찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	
	// 2016-08-17
	function __GetCallYesnAuto(firstVal, secondVal, thirdVal) {
		var w = 700;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		
		var wPlac = firstVal;
		var bNumb = secondVal;
		var aKind = thirdVal;
				
		var getDepaRtn = window.open("/mis/common/FindYesnAuto.do?wPlac="+wPlac+"&bNumb="+bNumb+"&aKind="+aKind, "예산찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
	}
	
	//----- 2017-01-03
	function __GetCallSaubAutoChul(CodeObjVal, NameObjVal, AcctKind){
		findCodeVal = CodeObjVal;
		findNameVal = NameObjVal;

		var w = 700;
		var h = 510;	
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;		
		
		var getEmplRtn = window.open("/mis/common/FindSaubAutoChul.do?aKind="+AcctKind, "사업구분 찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);		
	}
	
	// 2017-01-03
	function __GetCallYesnAutoChul(firstVal, secondVal, thirdVal) {
		var w = 700;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		
		var wPlac = firstVal;
		var bNumb = secondVal;
		var aKind = thirdVal;
				
		var getDepaRtn = window.open("/mis/common/FindYesnAutoChul.do?wPlac="+wPlac+"&bNumb="+bNumb+"&aKind="+aKind, "예산찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
	}
	
	//----- SHEET 예산 찾기
	function __GetCallYesnSheet2(SName, Row, Col, NCol, NCol2, NCol3, NCol4, NCol5, workplac, businumb, acctkind) {
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		Sheet2NCol = NCol2;
		Sheet3NCol = NCol3;
		Sheet4NCol = NCol4;
		Sheet5NCol = NCol5;
		
		var w = 700;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		
		var wPlac = workplac;
		var bNumb = businumb;
		var aKind = acctkind;
				
		var getDepaRtn = window.open("/mis/common/FindYesnSheet.do?wPlac="+wPlac+"&bNumb="+bNumb+"&aKind="+aKind, "예산찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
	}
	
	function ReturnCallYesnSheet(firstVal, secondVal, thirdVal, forthVal, fifthVal, sixthVal) {
		if(SheetName != "" && SheetName != null) {	
			eval(SheetName+".SetCellValue("+SheetRow+","+SheetCol+",'"+firstVal+"');");
			
			if(SheetNCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+SheetNCol+",'"+secondVal+"');");
			}
			
			if(Sheet2NCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet2NCol+",'"+thirdVal+"');");
			}
			
			if(Sheet3NCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet3NCol+",'"+forthVal+"');");
			}
			
			if(Sheet4NCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet4NCol+",'"+fifthVal+"');");
			}
			
			if(Sheet5NCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet5NCol+",'"+sixthVal+"');");
			}		
		}
		
		fnc_amnt(SheetRow);
		
		SheetName = "";
		SheetRow = 0;
		SheetCol = 0;
		SheetNCol = 0;
		Sheet2NCol = 0;
		Sheet3NCol = 0;
		Sheet4NCol = 0;	
		Sheet5NCol = 0;	
	}
	
	// 2016-06-07 중메뉴선택
	function __mmenuChange() {
		var mMenu = document.getElementById("mmenu_select").value;

		var sSel = "";
		$.ajax({
	        type:"POST",
	        url:"/mis/common/getSMenuList.do",
	        data:"mMenu="+mMenu,
	        dataType:"text", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	        async: false,
	        success : function(xsr) {
				//돌아온 결과를 json 객체로 바꾼다.
	        	sSel = xsr;
						   			
	        },
	        error : function(xhr, status, error) {
	        	sSel = "";
	        }
	    });	

		if(sSel != "") {
			document.getElementById("smenu_select").options.length = 0; 
			document.getElementById("smenu_select").innerHTML = sSel; 
		}
	}
	
	// 2016-06-07 소메뉴선택
	function __smenuChange() {
		var sMenu = document.getElementById("smenu_select").value;

		location.href = sMenu; 
	}
	
	// 계정별부속코드찾기 2017-06-08 추가
	function __GetCallAcctSuboSheet(SName, Row, Col, NCol, workPlac, acctCode) {
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		
		var w = 700;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		
		var wPlac = workPlac;
		var aCode = acctCode;
				
		var getDepaRtn = window.open("/mis/common/FindAcctSuboSheet.do?wPlac="+wPlac+"&aCode="+aCode, "계정별부속코드찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
	}
	
	//2017-06-08 추가
	function ReturnCallAcctSuboSheet(firstVal, secondVal, acctVal) {

		if(SheetName != "" && SheetName != null) {	
			eval(SheetName+".SetCellValue("+SheetRow+","+SheetCol+",'"+acctVal+firstVal+"');");
			
			if(SheetNCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+SheetNCol+",'"+secondVal+"');");
			}
				
		}

		SheetName = "";
		SheetRow = 0;
		SheetCol = 0;
		SheetNCol = 0;

	}
	
	// 계정별부속코드찾기 2016-06-08 추가
	function __GetCallSuboSheet(SName, Row, Col, NCol, workPlac, acctCode) {
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		
		var w = 700;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		
		var wPlac = workPlac;
		var aCode = acctCode;
				
		var getDepaRtn = window.open("/mis/common/FindSuboSheet.do?wPlac="+wPlac+"&aCode="+aCode, "계정별부속코드찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
	}
	
	//2016-06-08 추가
	function ReturnCallSuboSheet(firstVal, secondVal) {
		if(SheetName != "" && SheetName != null) {	
			eval(SheetName+".SetCellValue("+SheetRow+","+SheetCol+",'"+firstVal+"');");
			
			if(SheetNCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+SheetNCol+",'"+secondVal+"');");
			}
				
		}

		
		SheetName = "";
		SheetRow = 0;
		SheetCol = 0;
		SheetNCol = 0;

	}
	
	//----- SHEET 사업 찾기 2016-06-10 추가
	function __GetCallSaubSheet2(SName, Row, Col){
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;	
		
		var w = 700;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
				
		var getDepaRtn = window.open("/mis/common/FindSaubSheet2.do?", "사업찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
	}
	
	function ReturnCallSaubSheet(firstVal) {
		if(SheetName != "" && SheetName != null) {	
			eval(SheetName+".SetCellValue("+SheetRow+","+SheetCol+",'"+firstVal+"');");		
		}
		
		
		SheetName = "";
		SheetRow = 0;
		SheetCol = 0;
	}
	
	//2016-06-22 추가
	function __GetCallCardSheet(SName, Row, Col, NCol, NCol2, NCol3, NCol4, NCol5) {
		SheetName = SName;
		SheetRow = Row;
		SheetCol = Col;
		SheetNCol = NCol;
		Sheet2NCol = NCol2;
		Sheet3NCol = NCol3;
		Sheet4NCol = NCol4;
		Sheet5NCol = NCol5;
		
		var w = 1000;
		var h = 600;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표
		
		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		var getDepaRtn = window.open("/mis/common/FindCardSheet.do", "거래내역검색", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
	}
	
	//2016-06-22 추가
	function ReturnCallCardSheet(firstVal, secondVal, thirdVal, forthVal, fifthVal, sixthVal) {
		if(SheetName != "" && SheetName != null) {	
			eval(SheetName+".SetCellValue("+SheetRow+","+SheetCol+",'"+firstVal+"');");
			
			if(SheetNCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+SheetNCol+",'"+secondVal+"');");
			}
			if(Sheet2NCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet2NCol+",'"+thirdVal+"');");
			}
			if(Sheet3NCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet3NCol+",'"+forthVal+"');");
			}
			if(Sheet4NCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet4NCol+",'"+fifthVal+"');");
			}
			if(Sheet5NCol > 0) {
				eval(SheetName+".SetCellValue("+SheetRow+","+Sheet5NCol+",'"+sixthVal+"');");
			}
			
		}
		
		
		SheetName = "";
		SheetRow = 0;
		SheetCol = 0;
		SheetNCol = 0;
		Sheet2NCol = 0;
		Sheet3NCol = 0;
		Sheet4NCol = 0;
		Sheet5NCol = 0;
		
	}
		
	 //----- (2016-06-28) 사업구분 찾기
	 function __GetCallSaubSingle(CodeObjVal, NameObjVal){
	  findCodeVal = CodeObjVal;
	  findNameVal = NameObjVal;
	  
	  var w = 700;
	  var h = 510;
	  
	  //var left = (screen.width) ? (screen.width-w)/2 : 0;
	  //var top = (screen.height) ? (screen.height-h)/2 : 0;  
	  
	  var winHeight = document.body.clientHeight; // 현재창의 높이
	  var winWidth = document.body.clientWidth; // 현재창의 너비
	  var winX = window.screenLeft; // 현재창의 x좌표
	  var winY = window.screenTop; // 현재창의 y좌표

	  var left = winX + (winWidth - w)/2;
	  var top = winY + (winHeight - h)/2;  
	  
	  var getEmplRtn = window.open("/mis/common/FindSaubSingle.do", "사업구분 찾기", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);  
	 }
	 
	 function ReturnCallSaubSingle(firstVal, secondVal) {
		if (findCodeVal != null || findNameVal != null){
			if(findCodeVal != "" && findCodeVal != null)
				document.getElementById(findCodeVal).value = firstVal;
			if(findNameVal != "" && findNameVal != null)			
				document.getElementById(findNameVal).value = secondVal;
			
			findCodeVal = null;
			findNameVal = null;
		}
	}	
	
	// 외화현황 (2017.03)
	function __GetCallForeAmt(firstVal, secondVal) {
		var w = 700;
		var h = 510;
		
		//var left = (screen.width) ? (screen.width-w)/2 : 0;
		//var top = (screen.height) ? (screen.height-h)/2 : 0;		
		
		var winHeight = document.body.clientHeight;	// 현재창의 높이
		var winWidth = document.body.clientWidth;	// 현재창의 너비
		var winX = window.screenLeft;	// 현재창의 x좌표
		var winY = window.screenTop;	// 현재창의 y좌표

		var left = winX + (winWidth - w)/2;
		var top = winY + (winHeight - h)/2;
		
		
		var wPlac = firstVal;
		var aGubn = secondVal;
				
		var getDepaRtn = window.open("/mis/common/FindForeAmt.do?wPlac="+wPlac+"&aGubn="+aGubn, "외화현황", 'toolbar=no, location=no, directories=no, status=0, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
	}
		
	 //년월 팝업 관련 js (2016-07-13)
	 //---------------------------------------------------------------------------------
	 function month_year_select(){
		 var toyear = parseInt($("#month_year").val());
		 var select_year;
		 
		 for(var i=-10; i<=10; i++){
			 select_year += "<option value='"+(toyear+i)+"'>"+(toyear+i)+"</option>";
		 }
		 
		 $("#month_year").html(select_year);
		 $("#month_year").val(toyear);
	 }
 
 	function month_year_move(num){
		var toyear = parseInt($("#month_year").val())+parseInt(num);
		
		var select_year;
		
		for(var i=-10; i<=10; i++){
			select_year += "<option value='"+(toyear+i)+"'>"+(toyear+i)+"</option>";
		}
		
		$("#month_year").html(select_year);
		$("#month_year").val(toyear);
	}

	var month_obj;
	function fn_layer_popup(obj_id){
		
	 	month_obj = obj_id;
		var input_year = $("#"+month_obj).val();
		
		var toyear;
		if(input_year==""){
			var today = new Date();
			toyear = today.getFullYear();			
		}else{
			if(input_year.length>=4){
				toyear = parseInt(input_year.substring(0,4));
			}else{
				toyear = parseInt(input_year);
			}
		}	

		
		var select_year;
		
		for(var i=-10; i<=10; i++){
			select_year += "<option value='"+(toyear+i)+"'>"+(toyear+i)+"</option>";
		}
		
		$("#month_year").html(select_year);
		$("#month_year").val(toyear);
		
		
		var position_obj = $("#"+month_obj).offset();
		
		var _x = position_obj.left; 
		var _y = position_obj.top+$("#"+month_obj).height()+2; 
		var layer = document.getElementById("month_popup_layer"); 
		
		layer.style.left = _x+"px";
		
		if(_y < screen.height-400){
			layer.style.top = _y+"px"; 
		}else{
			layer.style.top = (_y-176)+"px"; 
		}
		
		

		layer.style.visibility="visible"; 
	} 

	// Mozilla, Opera, Webkit 
	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", function () {
			document.removeEventListener("DOMContentLoaded", arguments.callee, false);
			domReady();
		}, false);


	} 

	// Internet Explorer
	else if (document.attachEvent) {
		document.attachEvent("onreadystatechange", function () {
			if (document.readyState === "complete") {
				document.detachEvent("onreadystatechange", arguments.callee);
				domReady();
			}
		});
	}

	//DOM이 모두 로드 되었을 때
	function domReady () {
		$(".main_content").append(
			"<div id='month_popup_layer' style='position:absolute;border:double;top:100px; left:100px; width:240px; height:145px; z-index:1; background-color:white; visibility:hidden;'> "
			+"	<div style='text-align:center; padding:3px; background : linear-gradient( to bottom, #E4E4E4, #DADADA); margin: 2px; border-radius: 10px; border:1px solid gray;'>"
			+"		<span class='ui-icon ui-icon-circle-triangle-w' onclick='month_year_move(-1)' style='cursor:pointer; display: inline-block; float:left;'>이전</span>                    "
			+"		<select id='month_year'  onchange='month_year_select();'>                                                                "
			+"		</select>                                                                               "
			+"		<span class='ui-icon ui-icon-circle-triangle-e' onclick='month_year_move(1)' style='cursor:pointer;  display: inline-block; float:right;'>다음</span>                                                                               "
			+"	</div>			                                                                            "
			+"	<div>                                                                                       "
			+"		<table class='month_pop_table' style='width: 100%; height: 100%; text-align: center;'>  "
			+"			<tr height='35px'>                                                                  "
			+"				<td>1월</td><td>2월</td><td>3월</td><td>4월</td>                                "
			+"			</tr>                                                                               "
			+"			<tr height='35px'>                                                                  "
			+"				<td>5월</td><td>6월</td><td>7월</td><td>8월</td>                                "
			+"			</tr>                                                                               "
			+"			<tr height='35px'>                                                                  "
			+"				<td>9월</td><td>10월</td><td>11월</td><td>12월</td>                              "
			+"			</tr>                                                                               "
			+"		</table>                                                                                "
			+"	</div>                                                                                      "
			+"</div>                                                                                        "
		);
		
		$(".month_pop_table td").click(function(){
			
			var click_month=$(this).html().replace("월", "");
			$("#"+month_obj).val($("#month_year").val() + (click_month<10?"/0":"/")+ click_month);
			
			var layer = document.getElementById("month_popup_layer"); 
			layer.style.visibility="hidden"; 
		});
		
		$('body').click(function (e) {
			if ($('#month_popup_layer').css('visibility') == 'visible') {
		
				var position_obj = $("#"+month_obj).offset();
				
				var _x = position_obj.left;
				var _y = position_obj.top;
				if(_x < e.pageX && _x+$("#"+month_obj).width() > e.pageX 
						&& _y < e.pageY && _y+$("#"+month_obj).height() > e.pageY){
					return;
				}
				
				if (!$('#month_popup_layer').has(e.target).length) {
						$('#month_popup_layer').css('visibility', 'hidden');
				};

			};
		});
		
		$('.month_pop_table tr td').mouseover(function() {
		
			 $(this).css('background','linear-gradient(to bottom, #EDEDED, #E6E6E6)');
			 $(this).css('font-weight', 'bold');
		});
		
		$('.month_pop_table tr td').mouseout(function() {
			
			 $(this).css('background','linear-gradient(to bottom, #E4E4E4, #DADADA)');
			 $(this).css('font-weight', 'normal');
		});
		
	}
	
	// 사업번호 가져오기
	function __getSaupNumb(wPlac, aGubn, yDay) {
			
		var retVal = "||";
		$.ajax({
	           type:"POST",
	           url:"/mis/common/getSaupNumb.do",
	           data:"wPlac="+wPlac+"&aGubn="+aGubn+"&yDay="+yDay,
	           dataType:"text", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	           async: false,
	           success : function(xsr) {
	   				//돌아온 결과를 json 객체로 바꾼다.
	   				
	   				if(xsr == "fail") {
	   					return "||";
	   				}
	   				var jsonObj = JSON.parse(xsr);
	   				
	   				retVal = jsonObj.Data[0].busiNumb + "||" + jsonObj.Data[0].busiName;		
	           },
	           error : function(xhr, status, error) {
	        	   return "||";
	           }
	     });
		
		return retVal;	
	}	
	//--------------------------------------------------------------------------------------------
 