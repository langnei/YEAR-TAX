
	/**
	작성요령
	폼 - 주의
	1. 들여쓰기 - 4칸
	2. 대괄호 끝에, function시작시점에 맞추기
	3. if도 같은 형태로.....
	**/


    /** Date 구분자 **/
    var DATE_SEPERATOR = "/";
    /** 대표번호 구분자 **/
    var NO_SEPERATOR = "/";
    /** 팝업윈도우 object **/
    var popupWin;

    /*= COMMON CONTROL ===========================================================

            1. 일반적으로 obj tag와 관계없이 사용되는 기능.
            2. Function List
				- OpenWindow(theURL, winName, features)
				: 새창 열기
				- CenterOpenWindow(theURL, winName, features)
				: 화면의중앙으로 가는 새창 열기
				- Popup_Window(theURL,winName,width,height,left,top,scrollbars,toolbar,status,resizable,menubar)
				: 사용자가 지정한 변수에 맞게 새 창 열기
				- Alert(message)
				: 메세지를 알리는 메세지박스 표시
				- AlertConfirm(message)
				: 사용자의 의사결정을 포함하는 메세지박스 표시
				- AlertFocus(element, message)
				: 메세지를 알리는 메세지박스 표시 후 Element에 지정된 obj tag 로 focus
				- ShowErrMessage(message)
				: 서버 프로그램에서 생긴 ERROR 를 보여주는 MESSAGEBOX ALERT

    ============================================================================*/


    /**
      * 새창열기
      * window.open 에서 사용되는 방식으로 features 설정
      * @param theURL    새창의 Url
      * @param winName   새창의 name
      * @param features  새창의 세부 설정
      * @return
      */
    function OpenWindow(theURL,winName,features) {
      var win = window.open(theURL,winName,features);
      win.focus();
    }

    /**
      * 화면중앙에 새창열기 -2004.09.05일 추가
      * window.open 에서 사용되는 방식으로 features 설정
      * @param theURL    새창의 Url
      * @param winName   새창의 name
      * @param features  새창의 세부 설정
      * @return
      */
    function CenterOpenWindow(theURL, winName, width, height, fstate ) {
        var features = "width=" + width ;
        features += ",height=" + height ;

				var state = "";

				if (fstate == "") {
		       state = features + ", left=" + (screen.width-width)/2 + ",top=" + (screen.height-height)/2;
				} else {
		       state = fstate + ", " + features + ", left=" + (screen.width-width)/2 + ",top=" + (screen.height-height)/2;
				}

				popupWin = window.open(theURL,winName,state+",resizable=1 ");

        popupWin.focus();
    }

    /**
	  * 사용자가 지정한 변수에 맞게 팝업창 열기
      * window.open 에서 사용되는 방식으로 features 설정
      * @param theURL    새창의 Url
      * @param winName   새창의 name
      * @param features  새창의 세부 설정
      * @return
	  */
    function Popup_Window(theURL,winName,width,height,left,top,scrollbars,toolbar,status,resizable,menubar)
    {
        var features = "width=" + width ;
        features += ",height=" + height ;
        features += ",left=" + left ;
        features += ",top=" + top ;
        features += ",scrollbars=" + scrollbars ;
        features += ",toolbar=" + toolbar ;
        features += ",status=" + status ;
        features += ",resizable=" + resizable ;
        features += ",menubar=" + menubar ;
        var win = window.open(theURL, winName, features);
        win.focus();
    }

    /**
      * 메세지를 알리는 메세지박스 표시
      * @param message   메세지박스에 보여질 메세지
      * @return
      */
    function Alert(message){
      var iLen = message.length;
        if (iLen >= 1) {
            alert(message);
        }
    }

    /**
      * 사용자의 의사결정을 포함하는 메세지박스 표시
      * @param message   메세지박스에 보여질 메세지
      * @return 1 : 확인,  0 : 취소
     */
	function AlertConfirm(message) {
		if(confirm(message)==1) {
			return 1;
		} else {
			return 0;
		}
	}

    /**
      * 메세지를 알리는 메세지박스 표시 후 Element에 지정된 obj tag 로 focus
      * @param obj   focus 를 가질 Object
      * @param message   메세지박스에 보여질 메세지
      * @return
     */
	function AlertFocus(obj, message ) {
		if ( message != '') Alert( message );
		obj.focus();
		if (obj.type == 'text' && obj.value.length >=1 ) obj.select();
		return ;
	}

    /**
      * 서버 프로그램에서 생긴 ERROR 를 보여주는 MESSAGEBOX ALERT
      * @param message   메세지박스에 보여질 메세지
      * @return
     */
    function ShowErrMessage(message) {
            var iLen = message.length;
            var showMessage;

        if (iLen >= 1) {
            shwoMessage=ReplaceStr(message,"<||>","\n");
            Alert(shwoMessage);
        }
    }

    /*= FORM CONTROL =============================================================

            1. 폼 관련 기본 기능을 처리.
            2. Function List
				- ChkLen(Object, Int)
				: 입력 받은 폼태그(Object)의 문자열의 길이가 특정 길이(Int)와 같은지 여부 체크
					true - 길이가 같음
					false - 길이가 다름
				- ChkLenMoveFocus(Object, Int, Object)
				: 입력 받은 폼태그(Object)의 문자열의 길이가 특정 길이(Int) 이면
					다른 객체(Object)로 포커스를 이동
				- SetFocus(Object)
				: 입력 받은 객체로 포커스 이동
				- ChkLenByByte(Object, int)
				: 입력 필드의 문자 크기를 한정시킬때.. (한글까지 고려하여 계산됨)
					ex) onBlur="return fnLessEqualLen(this, len);"
				- GetLenByByte(String)
				: 입력 필드의 문자 크기를 얻는다.. (한글까지 고려하여 계산됨)
				- disableObject(obj).
				: 대상 Object를 disable 시킨다.
				- EnableObject(obj)
				: 대상 Object를 Enable 시킨다.
				- EnableManyObjects()
				:   입력되어진 변수의 수만큼 EnableObject function 수행.
					입력되어진 Object 들을 모두 enable 시킨다.
					호출예 : EnableManyObjects(haengwon_no, name, center_section_code);
				- DisableManyObjects()
				:   입력되어진 변수의 수만큼 DisableObject function 수행.
				    입력되어진 Object 들을 모두 Disable 시킨다.
					호출예 : DisableManyObjects(haengwon_no, name, center_section_code);


    ============================================================================*/

    /**
      * 입력 받은 폼태그(Object)의 문자열의 길이가 특정 길이(Int)와 같은지 여부 체크
      * @param obj   대상 폼태그(Object)
      * @param len   비교할 길이
      * @return  true : 길이가 같음, false : 길이가 다름
     */
    function ChkLen(obj, len) {
            if (obj.value.length == len) return true;
            return false;
    }

    /**
      * 입력 받은 폼태그(Object)의 문자열의 길이가 특정 길이(Int) 이면
      * 다른 객체(Object)로 포커스를 이동
      * @param obj   대상 폼태그(Object)
      * @param len   비교할 길이
      * @param dest  포커스를 이동할 폼태그(Object)
      * @return
     */
    function ChkLenMoveFocus(obj, len, dest) {
            if (obj.value.length == len)
            SetFocus(dest);
    }

    /**
      * 입력 받은 객체로 포커스 이동
      * @param obj   포커스를 이동할 폼태그(Object)
      * @return
     */
    function SetFocus(obj) {
      obj.focus();
    }

    /**
      * 입력 필드의 문자 크기를 한정시킬때.. (한글까지 고려하여 계산됨)
      * @param obj   대상 폼태그(Object)
      * @param len   비교할 길이
      * @return
     */
    function ChkLenByByte(obj, len) {
            var src    = obj.value;
            var srcLen = GetLenByByte(src);
            if (srcLen <= len) return true;
            var delLen = srcLen - len;
            obj.focus();
            Alert("이 항목은 영문 " + len + "자 (한글은 " + Math.floor(len/2) + "자) 까지만 입력해야 합니다 \n"
                + "입력 내용에서 영문 " + delLen + "자 (한글은 " + Math.ceil(delLen/2) + "자)를 제거하시기 바랍니다");
            return false;
    }

    /**
      * 입력 필드의 문자 크기를 얻는다.. (한글까지 고려하여 계산됨)
      * @param String   문자열
      * @return int 문자열의 길이
     */
    function GetLenByByte(value) {
            var byteLength = 0;
            for (var inx = 0; inx < value.length; inx++) {
                var oneChar = escape(value.charAt(inx));
                if ( oneChar.length == 1 ) {
                        byteLength ++;
                } else if (oneChar.indexOf("%u") != -1) {
                        byteLength += 2;
                } else if (oneChar.indexOf("%") != -1) {
                        byteLength += oneChar.length/3;
                }
            }
            return byteLength;
    }

    /**
      * 대상 Object를 disable 시킨다.
      * @param  obj   대상 폼태그(Object)
      * @return
     */
    function DisableObject(obj) {
        switch( obj.type ) {
            case "checkbox" :
                     obj.disabled = true;
                     break;
            case "text" :
                 obj.readOnly=true;
                     obj.style.backgroundColor = "#E9F8F2";
                     obj.style.color = "#555555";
                 break;
            default:
        }
    }

    /**
      * 대상 Object를 enable 시킨다.
      * @param obj   대상 폼태그(Object)
      * @return
     */
    function EnableObject(obj) {
        switch( obj.type ) {
            case "checkbox" :
                 obj.disabled = false;
                 break;
            case "text" :
                 obj.readOnly=false;
                     obj.style.backgroundColor = "#ffffff";
                     obj.style.color = "#000000";
                 break;
            default:
        }
    }

    /**
     * 입력되어진 변수의 수만큼 DisableObject function 수행.
     * 입력되어진 Object 들을 모두 disable 시킨다.
     * 호출예 : DisableManyObjects(haengwon_no, name, center_section_code);
     * @param obj   대상 폼태그(Object)
     * @param obj   대상 폼태그(Object)
     *  :
     */
    function DisableManyObjects() {
        var obj_receiver;
        obj_receiver = DisableManyObjects.arguments;
        for(i=0; i< obj_receiver.length; i++) {
            if (obj_receiver[i] != "") {
                DisableObject(obj_receiver[i]);
            }
        }
    }

    /**
     * 입력되어진 변수의 수만큼 EnableObject function 수행.
     * 입력되어진 Object 들을 모두 enable 시킨다.
     * 호출예 : EnableManyObjects(haengwon_no, name, center_section_code);
     * @param obj   대상 폼태그(Object)
     * @param obj   대상 폼태그(Object)
     *  :
     */
    function EnableManyObjects() {
        var obj_receiver;
        obj_receiver = EnableManyObjects.arguments;
        for(i=0; i< obj_receiver.length; i++) {
            if (obj_receiver[i] != "") {
                EnableObject(obj_receiver[i]);
            }
        }
    }

    /*= CHECKBOX CONTROL ===========================================================

            1. CHECKBOX 관련 기본 기능을 처리.
            2. Function List
				- TogleCheckAll(Object, Object)
				: checkbox들을 반복하여 선택하거나 해지한다.
				- SetAllCheckboxCancel(Object)
				: checkbox를 모두 해지한다.
				- SetAllCheckboxCheck(Object)
				: checkbox를 모두 선택 표시한다.
				- IsChecked(Object)
				: 리스트에서 하나이상의 체크박스가 선택되었는지 확인한다.
				- IsCheckedOnlyOne(Object)
				: 리스트에서 하나의 체크박스만 선택되었는지 확인한다.

    ============================================================================*/

    /**
      * 처음 obj가 선택되어진 경우 전체 checkObj를 선택하고
      * 해지되어진 경우 모두 해지한다.
      * @param obj   전체를 control하는 CHECKBOX 의 OBJECT
      * @param checkObj 해당 CHECKBOX
      * @return
     */
    function TogleCheckAll(obj, checkObj) {
		if (obj.type == "checkbox") {
			if (!obj.checked) {
					SetAllCheckboxCancel(checkObj);
			} else {
					SetAllCheckboxCheck(checkObj);
			}
		} else if (obj.type == "hidden") {
			if (obj.value == "Y") {
					SetAllCheckboxCancel(checkObj);
					obj.value = "N";
			} else {
					SetAllCheckboxCheck(checkObj);
					obj.value = "Y";
			}
		}
    }


    /**
      * CHECKBOX를 모두 해지한다.
      * @param obj   해당 CHECKBOX 의 OBJECT
      * @return
     */
	function SetAllCheckboxCancel(obj){

		if (obj != null)
		{

			var count = obj.length;
			if(count > 1){
				for(var i=0;i<count;i++){
					obj[i].checked = false;
				}
			}else {
					obj.checked = false;
				}
				return;
		}
	}


    /**
      * CHECKBOX를 모두 선택 표시한다.
      * @param obj   해당 CHECKBOX 의 OBJECT
      * @return
     */
	function SetAllCheckboxCheck(obj){

		if (obj != null)
		{
			var count = obj.length;

			if(count > 1){
				for(var i=0;i<count;i++){
					obj[i].checked = true;
				}
			}else{
				obj.checked = true;
			}
			return;
		}
	}


    /**
      * 리스트에서 하나이상의 체크박스가 선택되었는지 확인한다.
      * @param obj   해당 CHECKBOX 의 OBJECT
      * @return
     */
	function IsChecked(obj){
		var count = obj.length;
		var iChecked = 0;
		if(count > 1){
			for(var i=0;i<count;i++){
				if (obj[i].checked) iChecked++;
			}
		} else {
			if (obj.checked) iChecked++;
		}

		if (iChecked == 0) {
			Alert("선택된 값이 없습니다");
			return false;
		}

		return true;
	}

	function IsCheckedFlag(obj){
		var count = obj.length;
		var iChecked = 0;
		if(count > 1){
			for(var i=0;i<count;i++){
				if (obj[i].checked) iChecked++;
			}
		} else {
			if (obj.checked) iChecked++;
		}

		if (iChecked == 0) {
			return false;
		}

		return true;
	}


    /**
      * 리스트에서 하나의 체크박스만 선택되었는지 확인
      * @param obj   해당 CHECKBOX 의 OBJECT
      * @return
     */
	function IsCheckedOnlyOne(obj){
		var count = obj.length;
		if(count > 1){
			var iChecked = 0;
			for(var i=0;i<count;i++){
				if (obj[i].checked) iChecked++;
			}
			if (iChecked > 1) {
				Alert("하나만 선택하십시오");
				return false;
			}
		}

		return true;
	}

    /*= TEXT INPUT VALUE CONTROL ===========================================================

            1. 문자열 관련 기본 기능을 처리.
            2. Function List
				- IsNull(Object)
				: 입력값이 NULL인지 체크
				- IsEmpty(Object)
				: 입력값이 공백인지 확인하여 리턴
				- RemoveSpaces(Value)
				: 입력값에 포함된 모든 스페이스 문자를 제거 후 리턴
				- IsTrim(Value)
				: 입력값 앞뒤의 스페이스를 제거 후 리턴
				- ReplaceStr(str, find, replace)
				: 문자열에 포함된 모든 변환대상 패턴을 변경하여 리턴
				- ContainsChars(Object)
				: 입력값에 특정 문자(chars)가 있는지 체크. 특정 문자를 허용하지 않으려 할 때 사용
				- ContainsCharsOnly(Object)
				: 입력값이 특정 문자(chars)만으로 되어있는지 체크
				- IsKorean(obj)
				: 입력값이 한국어인지 체크
				- IsAlphabet(Object)
				: 입력값이 알파벳인지 체크
				- IsUpperCase(Object)
				: 입력값이 알파벳 대문자인지 체크
				- IsLowerCase(Object)
				: 입력값이 알파벳 소문자인지 체크
				- IsNumber(Object)
				: 입력된 문자열이 숫자 만을 포함하고 있는지 여부 리턴
				- IsAlphaNum(Object)
				: 입력값이 알파벳,숫자로 되어있는지 체크
				- IsNumDash(Object)
				: 입력값이 숫자,대시(-)로 되어있는지 체크
				- IsNumComma(Object)
				: 입력값이 숫자,콤마(,)로 되어있는지 체크
				- IsNumPeriod(Object)
				: 입력값이 숫자,날짜 구분자(.)로 되어있는지 체크
				- IsMoney(obj)
				: 입력값이 숫자,소숫점(.),숫자구분자(,)로 되어있는지 체크
				- IsEmailAddr(obj)
				: 입력값이 이메일을 구성할 수 있는 문자들로 구성되어 있는지 체크
				- IsNumberMessage(obj)
				: 입력된 문자열이 숫자 만을 포함하고 있는지 여부 리턴

    ============================================================================*/

    /**
     * 입력값이 NULL인지 체크
     * @param obj   Object
     * @return true : Null 또는 공백
     */
    function IsNull(obj) {
            if (obj.value == null || obj.value == "") {
                    return true;
            }
            return false;
    }


    /**
     * 입력값에 스페이스 이외의 의미있는 값이 있는지 체크
     * @param obj   Object
     * @return true : 공백
     */
        function IsEmpty(obj) {
            if (obj.value == null || obj.value.replace(/ /gi,"") == "") {
                return true;
            }
            return false;
        }


    /**
     * 입력값에 포함된 모든 스페이스 문자를 제거 후 리턴
     * @param str   Value
     * @return ret  스페이스가 제거된 문자열
     */
    function RemoveSpaces(str) {
            var ret = "";
            if (str.length == 0) return ret;

            for (var i=0; i<str.length; i++) {
                if (str.charAt(i) != " ") ret += str.charAt(i);
            }
            return ret;
    }


    /**
     * 입력값 앞뒤의 스페이스를 제거 후 리턴
     * @param str Value
     * @return 스페이스가 제거된 문자열
     */
    function IsTrim(str) {
		var retstr = "";
		var ch;
		var lenstr = str.length;

		//문자열 앞부분의 공백 수를 센다.
		var precnt = 0;
		for ( var i=0; i<lenstr; i++ ) {
			ch = str.charAt(i);
			if ( ch == ' ' || ch == '\n' || ch == '\r' ) {
				precnt++;
			}
			else {
				break;
			}
		}
		//문자열 뒷부분의 공백 수를 센다.
		var postcnt = 0;
		for ( var i=lenstr-1; i>=0; i-- ) {
			ch = str.charAt(i);
			if ( ch == ' ' || ch == '\n' || ch == '\r' ) {
				postcnt++;
			}
			else {
				break;
			}
		}

		return (lenstr-postcnt)==0? "" : str.substring(precnt,lenstr-postcnt);
    }


    /**
     * 문자열에 포함된 모든 변환대상 패턴을 변경하여 리턴
     * @param str   문자열
     * @return ret  변경된 문자열
     */
        function ReplaceStr(str, find, replace) {
            var pos = 0;
            pos = str.indexOf(find);

            while(pos != -1) {
                pre_str = str.substring(0, pos);
                post_str = str.substring(pos + find.length, str.length);
                str = pre_str + replace + post_str;
                pos = str.indexOf(find);
            }
            return str;
        }


    /**
     * 입력값에 특정 문자(chars)가 포함되지 않았는지 체크
     * 특정 문자를 허용하지 않으려 할 때 사용
     * ex) if (containsChars(form.name,"!,*&^%$#@~;")) {
     *         Alert("이름 필드에는 특수 문자를 사용할 수 없습니다.");
     *     }
     * @param obj   Object
     * @return true 특정 문자가 없을 경우
     */
    function ContainsChars(obj,chars) {
            for (var inx = 0; inx < obj.value.length; inx++) {
                if (chars.indexOf(obj.value.charAt(inx)) != -1)
                return true;
            }
            return false;
    }

	/**
     * 입력값에 소숫점 체크
     * @param obj   Object
     * @return true 알파벳일 경우
     */
    function Ischars(obj) {
		var chars = ".";
		return ContainsChars(obj,chars);
    }
    
     /**
     * 입력값에 특정 문자(chars)가 포함되지 않았는지 체크(그리드에서 사용하기 위하여 value값으로 체크함)
     * 특정 문자를 허용하지 않으려 할 때 사용
     * ex) if (containsChars(form.name,"!,*&^%$#@~;")) {
     *         Alert("이름 필드에는 특수 문자를 사용할 수 없습니다.");
     *     }
     * @param value
     * @return true 특정 문자가 없을 경우
     */
       function ContainsCharsGrid(param,chars) {
            for (var inx = 0; inx < param.length; inx++) {
                if (chars.indexOf(param.charAt(inx)) != -1)
                return true;
            }
            return false;
    }

	/**
     * 입력값에 소숫점 체크(그리드에서 사용하기 위하여 value값으로 체크함)
     * @param value
     * @return true 알파벳일 경우
     */
    function IsCharsGrid(param) {
		var chars = ".";
		return ContainsCharsGrid(param,chars);
    }

    /**
     * 입력값이 특정 문자(chars)만으로 되어있는지 체크
     * 특정 문자만 허용하려 할 때 사용
     * ex) if (!containsCharsOnly(form.blood,"ABO")) {
     *         Alert("혈액형 필드에는 A,B,O 문자만 사용할 수 있습니다.");
     *     }
     * @param obj   Object
     * @return true 특정 문자가 있을 경우
     */
    function ContainsCharsOnly(obj,chars) {
		for (var inx = 0; inx < obj.value.length; inx++) {
			if (chars.indexOf(obj.value.charAt(inx)) == -1)
			return false;
		}
		return true;
    }


    /**
     * 입력값이 한글인지 체크
     * @param obj   Object
     * @return true 한글인 경우
     */
    function IsKorean(obj) {
		if ((obj.value.length*2) == GetLenByByte(obj.value)) return true;
		return false;
    }


	/**
     * 입력값이 알파벳인지 체크
     * @param obj   Object
     * @return true 알파벳일 경우
     */
    function IsAlphabet(obj) {
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		return ContainsCharsOnly(obj,chars);
    }


	/**
     * 입력값이 알파벳 대문자인지 체크
     * @param obj   Object
     * @return true 알파벳 대문자인 경우
     */
    function IsUpperCase(obj) {
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		return ContainsCharsOnly(obj,chars);
    }


    /**
     * 입력값이 알파벳 소문자인지 체크
     * @param obj   Object
     * @return true 알파벳 소문자인 경우
     */
    function IsLowerCase(obj) {
		var chars = "abcdefghijklmnopqrstuvwxyz";
		return ContainsCharsOnly(obj,chars);
    }


	/**
      * 입력된 문자열이 숫자 만을 포함하고 있는지 여부 리턴
      * @param obj   Object
      * @return true - 숫자만을 포함하고 있는 경우
     */
    function IsNumber(obj) {
		var chars = "0123456789";
		return ContainsCharsOnly(obj,chars);
    }


    /**
     * 입력값이 알파벳,숫자로 되어있는지 체크
     * @param obj   Object
     * @return true 알파벳,숫자로 되어있는 경우
     */
    function IsAlphaNum(obj) {
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		return ContainsCharsOnly(obj,chars);
    }

	/**
     * 입력값이 알파벳,숫자,'_'로 되어있는지 체크 (파일명 체크용)
     * @param obj   Object
     * @return true 알파벳,숫자,'_' 로 되어있는 경우
     */
    function IsFileName(obj) {
		var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_.";
		return ContainsCharsOnly(obj,chars);
    }

	/**
     * 입력값이 숫자,대시(-)로 되어있는지 체크
     * @param obj   Object
     * @return true 숫자,대시(-)로 되어있는 경우
     */
    function IsNumDash(obj) {
		var chars = "-0123456789";
		return ContainsCharsOnly(obj,chars);
    }


	/**
     * 입력값이 숫자,콤마(,)로 되어있는지 체크
     * @param obj   Object
     * @return true 숫자,콤마(,)로 되어있는 경우
     */
    function IsNumComma(obj) {
		var chars = ",0123456789";
		return ContainsCharsOnly(obj,chars);
    }


    /**
     * 입력값이 숫자,날짜 구분자(.)로 되어있는지 체크
     * @param obj   Object
     * @return true 숫자,날짜 구분자(.)로 되어있는 경우
     */
    function IsNumPeriod(obj) {
		var chars = ".0123456789";
		return ContainsCharsOnly(obj,chars);
    }


    /**
     * 입력값이 숫자,소숫점(.),숫자구분자(,)로 되어있는지 체크
     * @param obj   Object
     * @return true 숫자,날짜 구분자(.)로 되어있는 경우
     */
    function IsMoney(obj) {
		var chars = "-.,0123456789";
		return ContainsCharsOnly(obj,chars);
    }


	/**
	 * 이메일 주소의 유효성을 확인한다.
	 * @param obj   Object
	 * @return true : 사용가능한 이메일 주소일 경우
	 */
		function IsValidEmail(obj) {
			if (IsEmpty(obj)) return false;
			if (!IsEmailAddr(obj)) {
				AlertFocus(obj, "잘못된 형식의 이메일 주소입니다");
				return false;
			}
			return true;
		}


    /**
     * 입력값이 이메일을 구성할 수 있는 문자들로 구성되어 있는지 체크
     * 단순한 이메일 입력포맷을 확인한다.
     * @param obj   Object
     * @return true 이메일 구성이 가능한 문자들로 구성되어 있을 경우
     */
    function IsEmailAddr(obj) {
		var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
		return IsValidFormat(obj, format);
    }

	function IsValidFormat( obj, format ) {
		if ( format.test(obj.value) ) {
			return true;
		} else {
			return false;
		}
	}


    /**
      * 입력된 문자열이 숫자 만을 포함하고 있는지 여부 리턴
      * 오류가 있을 경우 메세지를 표시하고 focus 이동
      * @param obj   Object
      * @return true - 숫자만을 포함하고 있는 경우
     */
    function IsNumberMessage(obj) {
		if (!IsNumber(obj)) {
			AlertFocus(obj, '숫자만 입력하십시오');
			return false;
		}
		return true;
    }



    /*= NUMBER CONTROL ===========================================================

            1. 숫자 관련 기본 기능을 처리.
            2. Function List
				- AddComma(Object)
				: 입력값을 콤마가 포함된 문자열로 변환하여 리턴
					12345 를 입력하면 12,345 로 변환하여 리턴
				- RemoveComma(String)
				: 입력값에서 콤마를 없앤다.
				- RemoveDash(String)
				: 입력값에서 구분자(-)를 없앤다.
				- RemovePeriod(String)
				: 입력값에서 날짜 구분자(.) 를 없앤다.
				- ParseInt(str)
				: 문자열을 정수로 변환하여 리턴
				- lpad(str,n,ch)
				: 문자열이 원하는 길이가 안 될때 왼쪽에 문자를 해당길이만큼 끼워넣는 함수
				- ParseInterger(Object)
				: 문자열을 정수로 변환하여 리턴 - kjs
    ============================================================================*/

    /**
      * 입력값을 콤마가 포함된 문자열로 변환하여 리턴
      * @param obj   숫자
      * @return ret  콤마를 추가한 숫자
     */
    function AddComma(obj) {
		var ret;
		if (IsEmpty(obj)) {
			obj.value = "0";
		}

		if (!IsMoney(obj)) {
				AlertFocus(obj, "숫자만 입력하십시오.");
				return;
		}

		//숫자앞에 있는 "0"을 먼저 삭제함. - 2004.9.12
		obj.value = parseInt(RemoveComma(obj.value), 10);

		var numstr = obj.value;
		numstr = RemoveComma(numstr);
		var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
		var arrNumber = numstr.split('.');
		arrNumber[0] += '.';
		do {
				arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
		}

		while (rxSplit.test(arrNumber[0]));
		if (arrNumber.length > 1) {
				ret = arrNumber.join('');
		} else {
				ret = arrNumber[0].split('.')[0];
		}

		obj.value = ret;
    }

    /**
      * 입력값을 콤마가 포함된 문자열로 변환하여 리턴
      * @param str   숫자
      * @return ret  콤마를 추가한 숫자
     */
    function strAddComma(val) {
		var ret;

		//숫자앞에 있는 "0"을 먼저 삭제함. - 2004.9.12
		var numstr = val + "";
		var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
		var arrNumber = numstr.split('.');
		arrNumber[0] += '.';
		do {
				arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
		}
		while (rxSplit.test(arrNumber[0]));

		if (arrNumber.length > 1) {
				ret = arrNumber.join('');
		} else {
				ret = arrNumber[0].split('.')[0];
		}

		return ret;
    }


    /**
     * 입력값에서 콤마를 없앤다.
     * @param str   문자열
     * @return 변경된 문자열
     */
    function RemoveComma(str) {
		return str.replace(/,/gi,"");
    }


    /**
     * 입력값에서 구분자(-)를 없앤다.
     * @param str   문자열
     * @return 변경된 문자열
     */
    function RemoveDash(str) {
		return str.replace(/-/gi,"");
    }


    /**
     * 입력값에서 날짜 구분자(.)를 없앤다.
     * @param str   문자열
     * @return 변경된 문자열
     */
    function RemovePeriod(str) {
		return ReplaceStr(str, '.', '');
    }

	/**
	 * 입력값에서 구분자(-)를 없앤다.
	 * @param str 문자열
	 * @return 변견된 문자열
	*/

	function RemoveDash(str) {
		return  ReplaceStr(str, '-', '');
	}


    /**
     * 문자열을 정수로 변환하여 리턴
     * @param str   문자열
     * @return 정수
     */
    function ParseInt(str) {
		return parseInt(str, 10);
    }


	/**
	 *문자열이 원하는 길이가 안 될때 왼쪽에 문자를 해당길이만큼 끼워넣는 함수.
     * @param str   문자열
     * @param n   길이
     * @param ch  문자열
     * @return
         */
	function lpad(str,n,ch) {
		str = String(str);
		var result = "";
		var len = str.length;
		if ( len < n ) {
			for ( var i=0; i<(n-len); i++ ) {
				result += ch;
			}
			result += str;
		}   else {
			result = str;
		}

		return result;
	}

    /**
     * 문자열을 정수로 변환하여 리턴
     * @param str   문자열
     * @return 정수
     */
    function ParseInterger(obj) {
	    var result = 0;
	    if (IsMoney(obj)) {
		    if (RemoveComma(IsTrim(obj.value)) == "") {
		    	alert("입력한 값을 확인해 주십시오.");
				obj.focus();
		    } else {
		        result = RemoveComma(IsTrim(obj.value));
		    	return parseInt(result, 10);
		    }
		} else {
			alert("입력한 값을 확인해 주십시오.");
			obj.focus();
		}

		return 0;
    }



    /*= DATETIME CONTROL ===========================================================

            1. 일자와 시간 관련 기본 기능을 처리.
            2. Function List
				- IsDate(Object)
				: 입력값을 일자 Format 인지 확인
				- IsDateSixLength ( obj )
				: 입력된 문자열이 6자리 일자로 포맷
				- IsMonth(month)
				: 입력된 문자열이 일자의 월로 변환가능한지 확인
				- IsDay(year, month, day)
				: 입력된 문자열이 일자의 일로 변환가능한지 확인
				- IsDay2(day)
				: 입력된 문자열이 일자의 일로 변환가능한지 확인 (월에 관계없음)
				- GetEndDay(year, month)
				: 해당 년, 월의 마지막 일자를 가져온다
				- AddDateSeperator(Object)
				: 입력값에 일자 형식에 맞추어 DATE_SEPERATOR 를 추가한다.

    ============================================================================*/

    /**
      * 입력된 문자열이 일자 Format 확인
      * @param str   문자열
      * @return true 일자 , false
     */
    function IsDate ( obj ) {
		str = RemoveSpaces(obj.value);
		str = RemoveDash(obj.value);
		if (!IsNumDash(obj)) {
			obj.value = '';
			if ( obj.type == "hidden" ) {
				Alert("날짜는 YYYY/MM/DD의 형식으로 입력하십시오");
			} else {
				AlertFocus(obj, "날짜는 YYYY/MM/DD의 형식으로 입력하십시오");
			}
			return false;
		}

		if (str.length != 8) {
			obj.value = '';
			if ( obj.type == "hidden" ) {
				Alert("날짜는 YYYY/MM/DD의 형식으로 입력하십시오");
			} else {
				AlertFocus(obj, "날짜는 YYYY/MM/DD의 형식으로 입력하십시오");
			}
			return false;
		}

		var year  = str.substring(0,4);
		var month = str.substring(4,6);
		var day   = str.substring(6,8);

		if ( ParseInt( year ) >= 1900  && IsMonth( month ) && IsDay( year,month ,day) ) {
			return true;
		} else {
			obj.value = '';
			if ( obj.type == "hidden" ) {
				Alert("날짜는 YYYY/MM/DD의 형식으로 입력하십시오");
			} else {
				AlertFocus(obj, "날짜는 YYYY/MM/DD의 형식으로 입력하십시오");
			}
			return false;
		}
	}


    /**
      * 입력된 문자열이 6자리 일자 Format 확인
      * @param str   문자열
      * @return true 일자 , false
     */
    function IsDateSixLength ( obj ) {
		str = RemoveSpaces(obj.value);
		str = RemovePeriod(obj.value);
		if (!IsNumPeriod(obj)) {
			AlertFocus(obj, "날짜는 YYMMDD의 형식으로 입력하십시오");
			return false;
		}
		if (str.length != 6) {
			AlertFocus(obj, "날짜는 YYMMDD의 형식으로 입력하십시오");
			return false;
		}

		var year  = str.substring(0,2);
		var month = str.substring(2,4);
		var day   = str.substring(4);

		if ( IsMonth(month) && IsDay2(day) ) {
			return true;
		} else {
			AlertFocus(obj, "날짜는 YYMMDD의 형식으로 입력하십시오");
			return false;
		}
	}


    /**
      * 입력된 문자열이 일자의 월로 변환가능한지 확인
      * @param month   문자열
      * @return true : 가능할 경우
     */
    function IsMonth(month) {
		if (month.length > 2) return false;
		month = ParseInt(month);
		if ((month <= 0) || (month > 12)) return false;
		return true;
    }


    /**
      * 입력된 문자열이 일자의 일로 변환가능한지 확인
      * @param year   년
      * @param month  월
      * @param day    일
      * @return true : 가능할 경우
     */
    function IsDay(year, month, day) {
		if (day.length > 2) return false;
		year  = ParseInt(year, 10);
		month = ParseInt(month, 10);
		day   = ParseInt(day, 10);
		if ((day <= 0) || (day > GetEndDay(year, month))) return false;
		return true;
    }

    /**
      * 입력된 문자열이 일자의 일로 변환가능한지 확인 (월에 관계없음)
      * @param day 문자열
      * @return true : 가능할 경우
     */
    function IsDay2(day) {
		if (day.length > 2) return false;
		day = ParseInt(day, 10);
		if ((day <= 0) || (day > 31)) return false;
		return true;
    }


    /**
      * 해당 년, 월의 마지막 일자를 가져온다
      * @param year   년
      * @param month  월
      * @return 마지막 일자
     */
    function GetEndDay(year,month){
		if ((month==1)||(month==3)||(month==5)||(month==7)||(month==8)||(month==10)||(month==12))
			return 31;
		else {
			if(month==2) {
				if ((year%4==0) && ((year/4)%200!=0))   return 29;
				else    return 28;
			} else {
				return 30;
			}
		}
    }


    /**
     * 입력값이 유효한 일자인지 확인하고
     * 일자 형식에 맞추어 DATE_SEPERATOR 를 추가한다.
     * @param obj   Object
     * @return 구분자가 추가된 일자 형식의 문자열
     */
    function  AddDateSeperator(obj) {
        if (IsEmpty(obj)) return false;
			  if (!IsDate(obj)) {
				return false;
			  }
			  var numstr = RemoveDash(obj.value);
			  alert(numstr);
			  if (numstr.length != 8) {
						obj.value = '';
						if ( obj.type == "hidden" ) {
							Alert("날짜는 YYYYMMDD의 형식으로 입력하십시오");
						} else {
							AlertFocus(obj, "날짜는 YYYYMMDD의 형식으로 입력하십시오");
						}
						return false;
			  }
		  var rxSplit = new RegExp('([0-9][0-9][0-9][0-9])([0-9][0-9])([0-9][0-9])');
		  numstr = numstr.replace(rxSplit, '$1'+DATE_SEPERATOR+'$2'+DATE_SEPERATOR+'$3');
		  obj.value = numstr;
		  return true;
    }


    /**
     * 처음 Object와 두번째 Object 사이의 일자를 반환한다.
     * 이경우에 두번째 Object가 처음 Object 보다 나중 일자이다.
     * @param fromObj   Object
     * @param toObj     Object
     * @return int 두 Object 사이의 일자
     */
    function GetDaysBetween(fromObj, toObj) {
		var numstr1 = RemoveDash(fromObj.value);
		var user_day1 = new Date(numstr1.substr(0,4), ParseInt(numstr1.substr(4,2))-1, ParseInt(numstr1.substr(6)));
		var numstr2 = RemoveDash(toObj.value);
		var user_day2 = new Date(numstr2.substr(0,4), ParseInt(numstr2.substr(4,2))-1, ParseInt(numstr2.substr(6)));
		user_day1 = user_day1.getTime();
		user_day2 = user_day2.getTime();
		var day_gab = Math.floor( (user_day2 - user_day1) / (60*60*24*1000) );
		return day_gab;
    }


    /**
     * 오늘까지 남은 일수를 반환한다. 오늘 이후의 일자에 대해서는 음수값을 반환한다.
     * @param obj   Object
     * @return int 남은 일수
     */
    function GetDaysToToday(obj) {
		var numstr = RemoveDash(obj.value);
		var user_day = new Date(numstr.substr(0,4), ParseInt(numstr.substr(4,2))-1, ParseInt(numstr.substr(6)));
		user_day = user_day.getTime();
		var today = new Date();
		today = today.getTime();
		var day_gab = Math.floor( (today - user_day) / (60*60*24*1000) );
		return day_gab;
    }


    /**
     * 입력된 일자가 오늘 이후의 일자인지 확인한다.
     * @param obj   Object
     * @return true : 오늘 이후의 일자일 경우, false
     */
    function IsAfterToday(obj) {
		if (IsEmpty(obj)) return false;
		if (!IsDate(obj)) {
			return false;
		}
		var day_gab = GetDaysToToday(obj);
		if( day_gab > 0) {
			AlertFocus(obj, "오늘이후의 날짜를 입력하셔야 합니다");
			obj.value = "";
			return false;
		}
		return true;
    }


    /**
     * 처음 Object의 일자가 두번째 Object의 일자보다 빠른지 확인
     * @param obj   Object
     * @return true : 오늘 이후의 일자일 경우, false
     */
    function IsSequentialDate(fromObj, toObj, isToday) {
		if (IsEmpty(fromObj)) return false;
		if (IsEmpty(toObj)) return false;
		if (!IsDate(fromObj)) {
			return false;
		}
		if (!IsDate(toObj)) {
			return false;
		}
		var day_gab = GetDaysBetween(fromObj, toObj);
		if( day_gab < 0) {
			AlertFocus(fromObj, "날짜를 바르게 입력하셔야 합니다");
			return false;
		}
		if ((!isToday)&&(day_gab == 0)) {
			AlertFocus(fromObj, "날짜를 바르게 입력하셔야 합니다");
			return false;
		}
		return true;
    }


    /**
     * 년 or 월 or 일 만큼 증가된 일자를 리턴
     * @param sDate : 일자
     * @param sTyep : 년(Y), 월(M), 일(D)
     * @param sAddnum : 증가값
     * @return : 일자 + sType별 증가값
     */
	function IsDateAdd( sDate, sType, sAddnum ) {
		var newdate = new Date(sDate.getTime());
		var year      = sDate.getFullYear();
		var month     = sDate.getMonth() + 1;

		switch (sType) {
			case "Y" :
				newdate.setFullYear(year+sAddnum);
				break;
			case "M" :
				newdate.setFullYear(year+Math.floor((month+sAddnum)/12));
				newdate.setMonth(((month+sAddnum)%12)-1);
				break;
			case "D" :
				newdate = new Date(sDate.getTime() + sAddnum*24*3600*1000);
				break;
		}

		return newdate;
	}

	/**
	 * 문자열을 날짜로 변환
	 * @param str 날짜(YYYYMMDD)
	 * @return
	 */
	function GetStrToDate( str ) {
		var year, month, day, hour=0, min=0, sec=0;

		year    = str.substring(0,4);
		month = str.substring(4,6)
		day     = str.substring(6,8)

		if ( str.length > 8 ) {
			hour    = str.substring(8,10);
			min     = str.substring(10,12);
			sec     = str.substring(12,14);
		}

		var retdate = new Date(year,(month-1),day,hour,min,sec);
		return retdate;
	}


	/**
	 * 날짜형식을 문자열로 변환.
	 * @param datee
	 * @param formatstr
	 * @return
	 */
	function GetDateFormat( datee, formatstr ) {
		var retstr = formatstr;
		retstr = retstr.replace(/YYYY/i,    lpad(datee.getFullYear(),4,"0"));
		retstr = retstr.replace(/MM/i,      lpad(datee.getMonth()+1,2,"0"));
		retstr = retstr.replace(/DD/i,      lpad(datee.getDate(),2,"0"));
		retstr = retstr.replace(/HH/i,      lpad(datee.getHours(),2,"0"));
		retstr = retstr.replace(/MI/i,      lpad(datee.getMinutes(),2,"0"));
		retstr = retstr.replace(/SS/i,      lpad(datee.getSeconds(),2,"0"));

		return retstr;
	}

	/* 날짜를 문자열로 변환
	 * deprecated - dateFormat()을 사용하세요.
	 * @param datee
	 * @param len
	 * @return
	 */
	function date2str( datee, len ) {
		var str = lpad(datee.getFullYear(),4,"0") + lpad(datee.getMonth()+1,2,"0") + lpad(datee.getDate(),2,"0") + lpad(datee.getHours(),2,"0") + lpad(datee.getMinutes(),2,"0") + lpad(datee.getSeconds(),2,"0") ;

		return str.substring(0,len);
	}


	/* 문자열을 날짜로 변환
	 * @param str
	 * @return
	 */
	function str2date( str ) {
		var year, month, day, hour=0, min=0, sec=0;

		year = parseInt(str.substring(0,4));
		month = str.substring(4,6)
		day = str.substring(6,8)

		if ( str.length > 8 ) {
			hour = parseInt(str.substring(8,10));
			min = parseInt(str.substring(10,12));
			sec = parseInt(str.substring(12,14));
		}
		var retdate = new Date(year,(month-1),day,hour,min,sec);
		return retdate;
	}

	/**
	 * 종료일을 기준으로 지정된 일자를 설정한다.
	 * @param stdtObj
	 * @param endtObj  : 기준일
	 * @param stdt_displayObj
	 * @param endt_displayObj
	 * @param period    : 증가일(9999:전체)
	 * @return
	 */
	function GetApplyPeriod(stdtObj, endtObj, stdt_displayObj, endt_displayObj, period) {
		var edate = GetStrToDate(endtObj.value);
		var sdate = IsDateAdd(edate, "D", (-1)*period);

		stdtObj.value               = GetDateFormat( sdate, "YYYYMMDD" );
		stdt_displayObj.value       = GetDateFormat( sdate, "YYYY/MM/DD" );
		endtObj.value               = GetDateFormat( edate, "YYYYMMDD" );
		endt_displayObj.value       = GetDateFormat( edate, "YYYY/MM/DD" );
	}


	/**
	 * 현재 요일을 리턴
	 * @return
	 * ex) alert('오늘은 ' + getDayOfWeek() + '요일입니다.');
	 */
	function getDayOfWeek() {
		var now = new Date();

		var day = now.getDay(); //일요일=0,월요일=1,...,토요일=6
		var week = new Array('일','월','화','수','목','금','토');

		return week[day];
	}

	/**
	 * 달력 팝업
	 * 날짜와 시간 모두들 입력해야할 때
	 */
	function showDateTimeCalendar(dateField, timeField)
	{
		var wid = (screen.width)/2 - 220/2 ;
		var hei = (screen.height)/2 - 295/2;
  	window.open("/common/popup/popCalendar.jsp?type=datetime&dateField=" + dateField + "&timeField=" + timeField+ "&boardflag=N", "Calendar", "width=220,height=295,status=no,resizable=no,top="+hei+",left="+wid);
	}
	
	/**
	 * 달력 팝업
	 * 날짜와 시간 모두들 입력해야할 때 (시간중에 초 를 제외, 시/분 만 사용 초는 59초로 디폴트)
	 */
	function showDateTimeCalendar2(dateField, timeField)
	{
		var wid = (screen.width)/2 - 220/2 ;
		var hei = (screen.height)/2 - 295/2;
		window.open("/common/popup/popCalendar.jsp?type=datetime&dateField=" + dateField + "&timeField=" + timeField+ "&boardflag=Y", "Calendar", "width=220,height=295,status=no,resizable=no,top="+hei+",left="+wid);
	}

	/* 날짜만 입력해야할 때 */
	function showDateCalendar(dateField)
	{
		var wid = (screen.width)/2 - 220/2 ;
		var hei = (screen.height)/2 - 295/2;
		window.open("/common/popup/popCalendar.jsp?type=date&dateField=" + dateField, "Calendar", "width=200,height=250,status=no,resizable=no,top="+hei+",left="+wid);
	}

		/*= TEXT INPUT VALUE VALIDATION CHECK(사용자번호&사업자번호 등) ========

            1. TEXT 입력 값의 유효성을  확인한다.
            2. Function List
                    - IsValidSaupja(oCorpNo)
                    : 문자열이 올바른 사업자등록번호인지 확인하여 리턴
                    - IsValidBeopin(oBeopinNo)
                    : 문자열이 올바른 법인번호인지 확인하여 리턴
                    - IsValidAccountPassword(obj)
                    : 신규계좌 생성시 입력된 비밀번호의 유효성을 확인한다.
                    - check_no(param1, param2)
                    : 두개의 파라메터를 이용한 외국인등록번호 확인
		============================================================================*/

    /**
     * 문자열이 올바른 사업자등록번호인지 확인하여 리턴
     * @param oCorpNo  문자열
     * @return true : 바른 사업자등록번호일 경우
     */
	function IsValidSaupja(oCorpNo) {
		var chkRule = "137137135";
		var step1, step2, step3, step4, step5, step6, step7;

		if(oCorpNo.length != 10) {
			return false;
		}

		step1 = 0;          // 초기화

		for (i=0; i<7; i++) {
			step1 = step1 + (oCorpNo.substring(i, i+1) * chkRule.substring(i, i+1));
		}

		step2 = step1 % 10;
		step3 = (oCorpNo.substring(7, 8) * chkRule.substring(7, 8))% 10;
		step4 = oCorpNo.substring(8, 9) * chkRule.substring(8, 9);
		step5 = Math.round(step4 / 10 - 0.5);
		step6 = step4 - (step5 * 10);
		step7 = (10 - ((step2 + step3 + step5 + step6) % 10)) % 10;

		if (oCorpNo.substring(9, 10) != step7) {
			return false;
		}

		return true;
	}

    /**
         * 문자열이 올바른 법인번호인지 확인하여 리턴
         * @param obj   Object
         * @return true : 바른 법인번호일 경우
     */
	function IsValidBeopin(oBeopinNo){
		if (IsEmpty(oBeopinNo)) return false;
		var pid = RemoveDash(oBeopinNo.value);
		if(pid.length != 10) {
				return AlertFocus( oBeopinNo, "올바른 법인등록번호가 아닙니다.");
			}
		var pid = removeChar(oBeopinNo.value, "-");
		var number = "0123456789";
		var szChkDgt = "121212121212";
		var pidono = "";
		if (oBeopinNo.value.length < 1) {
			return;
		}
		for (var nCol=0; nCol < pid.length ; nCol++) {
			if (number.indexOf(pid.charAt(nCol)) >= 0) {
					pidono += pid.charAt(nCol);
			}
		}
		var lastpid = pidono.substring(12,13);
		var i = 0;
		var j = 0;
		var nV1 = 0;
		var nV2 = 0;
		var nV3 = 0;
		for( i=0 ; i<12 ; i++) {
			nV1 = pidono.substring(i, i+1) * szChkDgt.charAt(i);
			if(nV1 > 9) {
				nV2 += nV1 % 10;
			} else {
				nV2 += nV1;
			}
		}
		nV3 = nV2 % 10;
		if( nV3 > 0 ) {
			nV3 = 10 - nV3;
		} else {
			nV3 = 0;
		}
		if (lastpid == nV3) {
			oBeopinNo.value= pid.substring(0, 7) + "-" + pid.substring(7, 13);
		} else {
			AlertFocus( oBeopinNo, "올바른 법인등록번호가 아닙니다.");
			return;
		}
	}


	/**
     * 신규계좌 생성시 입력된 비밀번호의 유효성을 확인한다.
     * @param obj   Object
     * @return true : 사용가능한 비밀번호일 경우
     */
	function IsValidAccountPassword(obj) {
		if (IsEmpty(obj)) return;
		if (!IsNumer(obj)) {
			AlertFocus(obj, "숫자만 입력하십시오.");
			return;
		}
		if (numstr.length != 4) {
			AlertFocus(obj, "비밀번호는 4자리입니다.");
			return;
		}
	}


	/**
     * 사용자번호의 유효성을 확인한다.
     * @param strReg1   Object
     * @param strReg2   Object
     * @return true : 사용가능한 사용자번호일 경우
     */
	function chksumID(strReg1,strReg2)
	{
		//숫자로만구성되어 있는지 Test할 정규표현.
		var regExpr = /^[0-9]+$/;

		var li_lastid,li_mod,li_minus,li_last;
		var value0,value1,value2,value3,value4,value5,value6;
		var value7,value8,value9,value10,value11,value12;

		if (regExpr.test(strReg1) &&  regExpr.test(strReg2)) {
			li_lastid    = parseFloat(strReg2.substring(6,7));
			value0  = parseFloat(strReg1.substring(0,1))  * 2;
			value1  = parseFloat(strReg1.substring(1,2))  * 3;
			value2  = parseFloat(strReg1.substring(2,3))  * 4;
			value3  = parseFloat(strReg1.substring(3,4))  * 5;
			value4  = parseFloat(strReg1.substring(4,5))  * 6;
			value5  = parseFloat(strReg1.substring(5,6))  * 7;
			value6  = parseFloat(strReg2.substring(0,1))  * 8;
			value7  = parseFloat(strReg2.substring(1,2))  * 9;
			value8  = parseFloat(strReg2.substring(2,3))  * 2;
			value9  = parseFloat(strReg2.substring(3,4))  * 3;
			value10 = parseFloat(strReg2.substring(4,5))  * 4;
			value11 = parseFloat(strReg2.substring(5,6))  * 5;
			value12 = 0;

			value12 = value0+value1+value2+value3+value4+value5+value6+value7+value8+value9+value10+value11+value12 ;

			li_mod = value12 %11;
			li_minus = 11 - li_mod;
			li_last = li_minus % 10;
			if (li_last != li_lastid){
				return false;
			} else
				return true;
		}
		else
			return false;
	}


	/**
     * 사용자번호의 유효성을 확인한다.( YYMMDD가 맞는지 확인한다.)
     * @param strReg1   Object
     * @return true : 사용가능한 사용자번호일 경우
     */
	function ValidRegNo(strReg1)
	{
		a = new String(strReg1);

		if(a == '') return false;
		if(a.length != 6 ) return false;

		intYear = parseInt(a.substring(0,2) , 10);
		intMonth = parseInt(a.substring(2,4) , 10);
		intDay = parseInt(a.substring(4,6) , 10);

		if(intMonth < 0 || intMonth > 12){
			return false;
		}

		switch(intMonth){
			case 2 :
				if(intDay < 0 || intDay > 29){
					return false;
					breake;
				}
			case 4 :
				if(intDay < 0 || intDay > 30){
					return false;
					breake;
				}
			case 6 :
				if(intDay < 0 || intDay > 30){
					return false;
					breake;
				}
			case 9 :
				if(intDay < 0 || intDay > 30){
					return false;
					breake;
				}
			case 11 :
				if(intDay < 0 || intDay > 30){
					return false;
					breake;
				}
			default :
				if(intDay < 0 || intDay > 31){
					return false;
					breake;
				}
		}

		return true;
	}



	/**
     * 문자열 공백제거 함수.
     */
	function trim(str) {
      var count = str.length;
      var len = count;
      var st = 0;

      while ((st < len) && (str.charAt(st) <= ' ')) {
         st++;
      }
      while ((st < len) && (str.charAt(len - 1) <= ' ')) {
         len--;
      }
      return ((st > 0) || (len < count)) ? str.substring(st, len) : str ;
   }

    /*==TEXT INPUT VALUE FORMAT================================================

            1. TEXT 입력 값의 기준 포맷을 따라 변경한다
            2. Function List
                    - AddSeperatorToAccountNo(Object)
                    : 11자리의 계좌번호를 입력받아 자동으로 '-'를 더하여 리턴(ex)
                    - AddSeperatorToSaupjaNo(Object)
                    : 10자리의 사업자번호를 입력받아 자동으로 '-'를 더하여 리턴(ex)123-45-67890
                    - AddSeperatorToCardNo(Object)
                    : 입력되는 카드번호의 4자리마다 '-'를 더하여 리턴 (ex)1234-5678-9012-3456

    ==============================================================================*/

    /**
     * 11자리의 계좌번호를 입력받아 자동으로 '-'를 더하여 리턴
     * @param obj   Object
     * @return acct 계좌번호
     */
	function AddSeperatorToAccountNo(obj) {
		if (IsEmpty(obj)) return;
		if (!IsNumDash(obj)) {
			AlertFocus(obj, "숫자만 입력하십시오.");
			return;
		}
		var numstr = RemoveDash(obj.value);
		if (numstr.length != 11) {
			AlertFocus(obj, "계좌번호는 11자리입니다");
			return;
		}
		var rxSplit = new RegExp('([0-9][0-9][0-9])([0-9][0-9])([0-9][0-9][0-9][0-9][0-9][0-9])');
		numstr = numstr.replace(rxSplit, '$1-$2-$3');
		obj.value = numstr;
	}


    /**
     * 10자리의 사업자번호를 입력받아 자동으로 '-'를 더하여 리턴
     * @param obj   Object
     * @return acct 사업자번호
     */
	function AddSeperatorToSaupjaNo(obj) {
		if (IsEmpty(obj)) return;
		if (!IsNumDash(obj)) {
			AlertFocus(obj, "숫자만 입력하십시오.");
			return false;
		}
		if (!IsValidSaupja(obj)) {
			return false;
		}
		var numstr = RemoveDash(obj.value);
		var rxSplit = new RegExp('([0-9][0-9][0-9])([0-9][0-9])([0-9][0-9][0-9][0-9][0-9])');
		numstr = numstr.replace(rxSplit, '$1-$2-$3');
		obj.value = numstr;
	}


    /**
     * 10자리 혹은 13자리의 사업자번호,사용자번호를 입력받아 자동으로 '-'를 더하여 리턴
     * @param obj   Object
     * @return acct 사업자번호, 사용자번호
     */
	function AddSeperatorToSilmyungNo(obj) {
		if (IsEmpty(obj)) return;
		var numstr = RemoveDash(obj.value);
		if (numstr.length == 10) {
			AddSeperatorToSaupjaNo(obj);
		} else {
			AlertFocus(obj, "잘못된 형식의 실명번호입니다");
		}
	}


    /*
     * 10자리 혹은 13자리의 사업자번호,사용자번호를 입력받아 자동으로 '-'를 더하여 리턴
     * @param obj1   Object
     * @param obj2   Object
     * @return acct 사업자번호, 사용자번호
     */
	function checkSilmyungNo(obj1, obj2) {
		var obj = obj1.value+obj2.value;
		if (IsEmpty(obj)) return;
		if (obj.length == 10) {
			AddSeperatorToSaupjaNo(obj);
		} else {
			AlertFocus(obj, "잘못된 형식의 실명번호입니다");
		}
	}


    /**
     * 카드번호 입력시 4자리마다 NO_SEPERATOR(-) 추가한다
     * @param obj   Object
     * @return
     */
    function AddSeperatorToCardNo(obj) {
        if (IsEmpty(obj)) return;
            if (!IsNumDash(obj)) {
                obj.value = obj.value.substr(0, obj.value.length-1);
                AlertFocus(obj, "숫자만 입력하십시오.");
                return false;
            }
            var numstr = RemoveDash(obj.value);
            if (numstr.length != 16) {
                AlertFocus(obj, "카드번호는 16자리입니다");
                return;
            }
            var numstr = obj.value;
            var num = numstr;
            var rxSplit = new RegExp('([0-9][0-9][0-9][0-9])([0-9])');

            do {
                numstr = numstr.replace(rxSplit, '$1-$2');
            } while (rxSplit.test(numstr));

        obj.value = numstr;
    }


	/**
	 * 숫자만 입력되었는지 체크한다.
	 * @param obj Object
	 * @return
	 */
	function checkNum(obj) {
		if (IsEmpty(obj)) return;
		if(IsNumber(obj) == false) {
			AlertFocus(obj, "숫자만 입력하십시오.");
			return false;
		}
	}



    /*= 기타 JAVASCRIPT FUNCTION ================================================

            1. 팝업창을 이용한 값
            2. Function List
                    - SearchAddress(form, zip1, zip2, address, addrdetail)
                    : 팝업창을 이용한 우편번호 검색
                    - regform(f)
                    : tag를 사용한 폼체크
    ============================================================================*/

	 /**
	 * 우편번호 검색을 한다.
	 * @param form              폼명
	 * @param zip1              우편번호(앞)필드명
	 * @param zip2              우편번호(뒤)필드명
	 * @param address           우편주소필드명
	 * @param addrdetail    기타주소필드명
	 * @return
	 */
	function SearchAddress(form, zip1, zip2, address, addrdetail) {
		var state = "width=450,height=303,scrollbars=1,toolbar=0,status=0,resizable=0,menubar=0,left="+screen.width/5+",top="+screen.height/4;
		var url = "/include/addr_search.asp?form="+form+"&zip1="+zip1+"&zip2="+zip2+"&address="+address+"&addrdetail="+addrdetail;
		var win = window.open(url,'popupAddress',state);

		win.focus();
	}


	/**
	 * tag를 사용한 폼체크
	 * @param f             this
	 * @return
	 */
	function regform(f) {
		var j = f.elements.length
		var i;
		var re;
		var args;
		var result;

		for (i=0; i<j; i++) {
			if (typeof(f.elements[i].tag) == "undefined") continue;

			args = f.elements[i].tag.split("||", 3);
		if (args[0]=='C') {
				result = eval(args[1]);
			} else if ((args[0]=='M') || ((args[0]=='O')&& (f.elements[i].value.length>0))) {
				re = new RegExp(args[1], "gi");
				result = f.elements[i].value.match(re);
			}

			if (!result) {
				f.elements[i].select();
				alert(args[2]);
				return false;
			}
		}

		return true;
	}


	/**
	 * 상품이미지 이외의 기타 이미지 업로드 팝업창
	 * @param category      "group", "event", "brand", "card"
	 * @param formname      form name
	 * @param txtname           return field name
	 * @return
	 */
	function uploadImage(category, formname, txtname) {
		var state = "width=450,height=250,scrollbars=0,toolbar=0,status=0,resizable=0,menubar=0,left="+(screen.width/5)+",top="+(screen.height/4);
		var url = "/include/image_upload.asp?category="+category+"&formname="+formname+"&txtname="+txtname;
		var win = window.open(url,'ImageUpload',state);
		win.focus();
	}

	/**
	 * CSV파일을 업로드하여 해당그리드에 데이타입력함.
	 * @param map	   : 실행될 맵정보 (com.top.common.cvs.CSVParser에 정의)
	 * @param formname : 데이터가 입력될 document의 form이름
	 * @param gridname : 데이터가 입력될 grid의 이름
	 * package : com.top.common.cvs 퍄키지내에 Parser 메서드 작성필요.(CSVParser에 정의됨.)
	 */
	 function uploadCSVParser(map, formname, gridname) {
	 	var param  = "?map="+map;
	 	param += "&formname="+formname;
	 	param += "&gridname="+gridname;
		var popUrl = "/common/popup/popUploadCSV.jsp"+param;
		var dialog = openModalWin(popUrl, 'excelUploa', '500', '230');
		if(dialog!=null && dialog!="") alert(dialog);
		return;
	}

	/**
	 * 특수문자사용금지
	 * @param field
	 * @return
	 */
	function stringFilter(field) {
		s = field.value;

		filteredValues = " !@#$%^&*()_+|\=-'?><{}[],./＃＆＊＠※☆★○●";
		var i;
		var returnString = "";
		for (i = 0; i < s.length; i++) {
				var c = s.charAt(i);
				if (filteredValues.indexOf(c) == -1) returnString += c;
		}
		field.value = returnString;
	}


	/**
	 * 이메일 @이후의 도메인종류만 select박스로 출력
	 * @param val(해당하는 @이후의 도메인값)
	 * @return
	 */
	function eMailList(val){
		var TempVal;
		var strUrl = "chol.com/dreamwiz.com/empal.com/freechal.com/hanmail.net/hanmir.com/hitel.net/hotmail.com/intizen.com/korea.com/lycos.co.kr/nate.com/naver.com/netian.com/netsgo.com/orgio.net/paran.com/simmani.com/weppy.com/yahoo.co.kr";

		splitMail = strUrl.split("/");
		splitUrl = strUrl.split("/");

		for(var i = 0; i < splitUrl.length; i++){
			if (val==splitUrl[i]){
				TempVal = " selected ";
			}else{
				TempVal = "";
			}
			document.writeln("<option value='"+ splitUrl[i] +"'"+ TempVal +">"+ splitMail[i] +"</option>");
		}
	}


	/**
	 * 이메일 @이후의 도메인종류만 select박스의 옵션 문자열로 리턴
	 * @param val(해당하는 @이후의 도메인값)
	 * @return
	 */
	function return_eMailList(val){
		var TempVal;
		var strUrl = "chol.com/dreamwiz.com/empal.com/freechal.com/hanmail.net/hanmir.com/hitel.net/hotmail.com/intizen.com/korea.com/lycos.co.kr/nate.com/naver.com/netian.com/netsgo.com/orgio.net/paran.com/simmani.com/weppy.com/yahoo.co.kr";
		var rtnVal="";

		splitMail = strUrl.split("/");
		splitUrl = strUrl.split("/");

		for(var i = 0; i < splitUrl.length; i++){
			if (val==splitUrl[i]){
				TempVal = " selected ";
			}else{
				TempVal = "";
			}
			rtnVal = rtnVal + "<option value='"+ splitUrl[i] +"'"+ TempVal +">"+ splitMail[i] +"</option>";
		}
		return rtnVal;
	}



	/**
	 * 이메일 @이후의 도메인 추가 등록하는 팝업창 띄움
	 * @param form(해당하는 @이후의 도메인값)
	 * @return
	 */
	function eMailInsert(form){

		var emailId = form.emailId.value;
		var emailAddr = form.emailAddr.value;
		var emailAddrSelect = form.emailAddrSelect.value;

		if (emailAddrSelect == "etc"){
		document.form1.emailAddr.style.backgroundColor = "";
		document.form1.emailAddr.readOnly = false;
		document.form1.emailAddr.value = "";
		}
		else
		{
		document.form1.emailAddr.style.backgroundColor = "#EFEFEF";
		document.form1.emailAddr.readOnly = true;
		form.emailAddr.value = emailAddrSelect;
		}
		/*
		if (emailAddr == "etc"){
		  popup_window("/include/eMail_insert.asp?emailId="+ emailId,"email",400,220,0,0,"auto");
		}
		*/
	}


	/**
	 * 입력된 값이 지정된 길이만큼 됐을때 지정한 Item으로 Focus 이동
	 * @param num
	 * @param fromform
	 * @param toform
	 * @return
	 */
	function moveFocus(num,fromform,toform){
		var str = fromform.value.length;
		if(str == num)
		   toform.focus();
	}



	function dateAdd( sType, sAddnum, sDate ) {
		return IsDateAdd(sDate,sType.toUpperCase(),sAddnum);
	}


	function dateFormat( datee, formatstr ) {
		return GetDateFormat(datee, formatstr);
	}



	/**
	 * 일 단위로 기간을 적용한다. 기준은 종료일 기준이다.
	 * @param stdt
	 * @param endt
	 * @param stdt_display
	 * @param endt_display
	 * @param period
	 * @return
	 */
	function applyPeriod(stdt,endt,stdt_display,endt_display,period)
	{
		var edate = str2date(endt.value);
		var sdate = dateAdd("d", (-1)*period, edate);
		stdt.value = GetDateFormat( sdate, "YYYYMMDD" );
		stdt_display.value = GetDateFormat( sdate, "YYYY/MM/DD" );
		endt.value = GetDateFormat( edate, "YYYYMMDD" );
		endt_display.value = GetDateFormat( edate, "YYYY/MM/DD" );
	}


	/*
	*년, 일, 시간을 각각 선택하는 <SELECT> 태그에서 년 또는 월을 변경하는 경우.
	* @param syear
	* @param smonth
	* @param sday
	* sample:
	* <select name="year" onchange="monthday(year,month,day);"></select> 년
	* <select name="month" onchange="monthday(year,month,day);"></select> 월
	* <select name="day"></select> 일
	*/
	function monthday(syear,smonth,sday) {
		selectedmonth = smonth.selectedIndex;
		selectedday = sday.selectedIndex;

		var selectedyear = syear.value;

		var lastday;
		switch (selectedmonth) {
			case 0: case 2: case 4: case 6: case 7: case 9: case 11:
				lastday = 31;
				break;
			case 1:
				if (((selectedyear%4 == 0) && (selectedyear%100 != 0)) || (selectedyear%400 == 0))
					lastday=29
				else
					lastday=28
				break;
			default : lastday = 30;
		}
		for ( i = 0; i < sday.length; i++ )
			sday.options[i] = null;

		sday.length = 0;

		for ( i = 0; i < lastday; i++ ) {
			if (selectedday == i){
				sday.options[i] = new Option(lpad(String(i+1),2,'0'), String(i+1), true, true);
			}
			else {
				sday.options[i] = new Option(lpad(String(i+1),2,'0'), String(i+1), false, false);
			}
		}
	}


	/**
	 * 쿠키 설정(name이름의 value 값의 쿠키설정기간이 expiredays인 쿠키를 생성한다)
	 * @param name
	 * @param value
	 * @param expiredays
	 * @return
	 */
	function setCookie( name, value, expiredays ) {
		var todayDate = new Date();
		todayDate.setDate( todayDate.getDate() + expiredays );
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	}


	/**
	 * varname의 쿠키값이 있는지 확인
	 * @param varname
	 * @param expiredays
	 * @return
	 */
	function getCookie(varname) {
		varname += "=";
		startpos = document.cookie.indexOf(varname);
		if (startpos >= 0) {
			startpos += varname.length;
			endpos = document.cookie.indexOf(";", startpos);
			if (endpos == -1) endpos = document.cookie.length;
			return unescape(document.cookie.substring(startpos, endpos));
		}
	}

	/**
	 * autoTab 입력된 글자수를 체크후 해당 길이이면 다음 입력 필드로 이동 한다.
	 * 사용법 : return autoTab(this, 문자수, event);
	 * @param input
	 * @param len
	 * @return
	 */
	function autoTab(input,len, e) {
	  var isNN = (navigator.appName.indexOf("Netscape")!=-1);
	  var keyCode = (isNN) ? e.which : e.keyCode;
	  var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];
	  if(input.value.length >= len && !containsElement(filter,keyCode)) {
	  input.value = input.value.slice(0, len);
	  input.form[(getIndex(input)+1) % input.form.length].focus();
	}
	function containsElement(arr, ele) {
	  var found = false, index = 0;
	  while(!found && index < arr.length)
	  if(arr[index] == ele)
	  found = true;
	  else
	  index++;
	  return found;
	}
	function getIndex(input) {
	  var index = -1, i = 0, found = false;
	  while (i < input.form.length && index == -1)
	    if (input.form[i] == input)index = i;
	    else i++;
	    return index;
	  }
	  return true;
	}

	function showAllElement(){
		CenterOpenWindow("", "allElement", "500","550", "scrollbars=yes");
		for ( var pro in document ){
			document.write("<B> ☞☞☞ "+pro+"<B> :: "+ document[pro] + "<BR>" );
		}
	}

	function handlerNum()
	{
	    e = window.event; //윈도우의 event를 잡는것입니다. 그냥 써주심됩니당.
//	    alert(e.keyCode);
	    //숫자열 0 ~ 9 : 48 ~ 57, 키패드 0 ~ 9 : 96 ~ 105 ,8 : backspace, 46 : delete , .: 190-->키코드값을 구분합니다. 저것들이 숫자랍니다.
	    //shift 키를 막아야 한다...--구상중....
	    if(e.keyCode >= 48 && e.keyCode <= 57
	    		|| e.keyCode >= 96 && e.keyCode <= 105
	    		|| e.keyCode == 8
	    		|| e.keyCode == 46
	    		|| e.keyCode == 190 )
	    {
	        if(e.keyCode == 48 || e.keyCode == 96 || e.keyCode == 190 )//0을 눌렀을경우
	        {
	            if(txtMileage.value == "" ) //아무것도 없는상태에서 0을 눌렀을경우
	                e.returnValue=false; //-->입력되지않는다.
	            else //다른숫자뒤에오는 0은
	                return; //-->입력시킨다.
	        }
	        else //0이 아닌숫자
	            return; //-->입력시킨다.
	    }
	    else //숫자가 아니면 넣을수 없다.
	        e.returnValue=false;
	}

	// Modal Windows Argument Setting
	function popupModal(window, func, message, isclose, myParent, myParentTop) {
		this.window = window;
	 	this.func = func;
	 	this.message = message;
	 	this.isclose = isclose;
	 	this.myParent = myParent;
	 	this.myParentTop = myParentTop;
	}

	// Create Modal Windows Popup
	function callModalDialog(url, dialogArguments, wid, hgt){
	   var myParent = document;
	   var myParentTop = document;
	
	   var dialogArguments = new popupModal('winModal', '', '', false, myParent, myParentTop);
	   var sFeatures = "dialogHeight:"+ hgt +"px;dialogWidth:"+ wid +"px;"
	                 + "center:yes;dialogHide:no;status:no;resizable:no;help:no;";
	   DIALOG_CLOSE = false;
	   return window.showModalDialog(url, dialogArguments, sFeatures);
	}

	// Create Modal Argument
	function openModalWin(url, win, wid, hgt, myParent){
		var myParent = document;
	    var dialogArguments = new popupModal(win, '', '', false, myParent);
	    return callModalDialog(url, dialogArguments, wid, hgt);
	}
	
	function callSearchClick(){
		return;
	}

	// 이미지업로드
	// param field: 해당필드명, type: 0-상품이미지 1-일반이미지 2-이미지덮어씌우기용(게이트 탭문제로 적용), dir: 일반이미지-업로드이미지경로
	// imgty: 이미지동류 0-대표이미지, 1-추가이미지1, 2-추가이미지2
	// jsUploadImg('plan_img_7',1,'ExhibitionPlan','0')
	function jsUploadImg(field, type, dir, imgty, ran){
		today = new Date();
		
		var ran = today.getMilliseconds();
		
		var planDir = ""; //기획전 이미지 디렉토리 별로 관리 - UIUX 2015.02
		if(dir == 'ExhibitionPlan'){
			var toYear = today.getFullYear();
			var toMon = today.getMonth()+1;
			
			if(toMon < 10){
				toMon = "0"+toMon;
			}
			
			planDir = toYear + toMon;
		}
		
		var sampleImg = "sample_sajin.jpg";
		var url = "/common/popup/popUploadImage.jsp?type="+ type +"&dir=" + dir +"&planDir="+ planDir + "&imgty=" + imgty +"&ran="+ran;
		
		if(field && document.getElementById(field) && document.getElementById(field).src.indexOf(sampleImg)<0){
			var img = eval("gForm."+field).value;
			// img=20120312142957
			if(img!=null && img!="") url += "&img=" + img.substring(img.lastIndexOf("/")+1, img.length);
			// url=/common/popup/popUploadImage.jsp?type=1&dir=ExhibitionPlan&imgty=0&img=20120312142957.jpg
		}
		
		var dialog = openModalWin(url, 'upload', '400', '180');
		
		if(dialog!=null && dialog!=""){
			if(field && document.getElementById(field)){
				document.getElementById(field).src = dialog;
				//alert(dialog);
				
				if(eval("gForm."+field)){
					if(dialog.indexOf(sampleImg)>-1) { 
						eval("gForm."+field).value = ""; 
					} else { 
						//alert(dialog.substring(dialog.indexOf('/',10),255));
						eval("gForm."+field).value = dialog.substring(dialog.indexOf('/',10),255); // 실서버 반영시 사용
						//eval("gForm."+field).value = dialog.substring(dialog.indexOf('/',10),255).replace(/\/RT/gi,'');
 					} 
				}
			}
		}
		
		return;
	}

	/*
		Was/WebServer에 이미지를 업로드 한다.
	*/
	function jsLocalUploadImg(field, type, value, imgty) {
		var sampleImg = "sample_sajin.jpg";
		var url = "/common/popup/popLocalUploadImage.jsp?type="+ type +"&value=" + value + "&imgty=" + imgty ;
		if(field && document.getElementById(field) && document.getElementById(field).src.indexOf(sampleImg)<0){
			var img = eval("gForm."+field).value;
			if(img!=null && img!="") url += "&img=" + img.substring(img.lastIndexOf("/")+1, img.length);
		}
		var dialog = openModalWin(url, 'upload', '400', '180');
		if(dialog!=null && dialog!=""){
			if(field && document.getElementById(field)){
				document.getElementById(field).src = dialog;
				if(eval("gForm."+field)){
					if(dialog.indexOf(sampleImg)>-1) eval("gForm."+field).value = "";
					else eval("gForm."+field).value = dialog;// dialog.substring(dialog.indexOf('/',10),255);
				}
			}
		}
		return;
	}


/*= 파라미터 관련된 JAVASCRIPT FUNCTION ================================================

        1. 파라미터로 넘어온 값을 선언해주는 함수
        2. Function List
                - setSelectBox(options, value)
                : selectBox값 동일하게 만들기
                - setRadioBox(options,value)
                : radio값 동일하게 만들기
============================================================================*/

	 /**
	 * selectBox의 option값을 value값과 동일하게 만들기
	 * 사용법 : setSelectBox(form.select.options,'value')
	 * @param options 	- selectBox object
	 * @param value 	- 선택되어진 value값
	 * @return
	 */
	function setSelectBox(options, value) {
		if (value != "" ) {
			for(i=0; i<options.length;i++){
				if (options[i].value == value) {
					options[i].selected = true;
					return;
				}
			}
		}
	}

	 /**
	 * radio버튼의 value값을 선택된  value값과 동일하게 만들기
	 * 사용법 : setRadioBox(form.radio,'value')
	 * @param options 	- radio object
	 * @param value 	- 선택되어진 value값
	 * @return
	 */
	function setRadioBox(options,value) {
	    if (options.length > 1) {
	        for (var inx = 0; inx < options.length; inx++) {
	          if (options[inx].value == value) {
					options[inx].checked = true;
					return;
			  }
	        }
	    }
	 }

	/***********
	 * 그리드에 해당하는 키값이 존재하는지를 체크함.
	 * isAlert : 알림창 표시여부.
	 * grid : 그리드명
	 * chkIdx : 체크할 컬럼번호
	 * chkValue : 체크할값
	 * isAlert : 알림창여부.
	 **/
	function dupCheck(grid, chkIdx, chkValue, isAlert) {
		for(i=0; i<grid.Rows; i++){
			if(chkValue==grid.TextMatrix(i, chkIdx)){
				if(isAlert) alert("중복된 데이터가 존재합니다.");
				return true;
			}
		}
		return false;
	}

	/**
	 * number: NULL이거나 '0'이면 true
	 * char: NULL이거나 ''이면 true
	 */
	function nullCheck(grid, chkIdx, chkType, isAlert) {
		for(i=0; i<grid.Rows; i++){
			if(chkType=="number"){
				if(grid.TextMatrix(i, chkIdx)==null || grid.TextMatrix(i, chkIdx)==0){
					if(isAlert) alert("필수입력항목입니다.");
					return true;
				}
			} else if(chkType=="char"){
				if(grid.TextMatrix(i, chkIdx)==null || grid.TextMatrix(i, chkIdx)==""){
					if(isAlert) alert("필수입력항목입니다.");
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 날짜 형식 체크
	 * char: NULL이거나 ''이면 true
	 */
	function validation_datecheck(obj, obj2){		
		var msg = "검색일을 입력해 주세요.";		
		
		if(IsNull(obj)){
	    	alert(msg);
	    	obj.focus();
	    	return false;
	    }
	    
	    if(IsNull(obj2)){
	    	alert(msg);
	    	obj2.focus();
	    	return false;
	    }
		    
	    //month 테이블
		var mt=new Array(31,29,31,30,31,30,31,31,30,31,30,31);
	
		//오늘 데이트 객체
		var now=new Date();
	
		var Y=now.getYear(); //년
		var M=now.getMonth()+1; //월
		var D=now.getDate(); //일
	
		var lim=new Array(12,31); //월,일 한계범위설정
		var lim_=new Array('월일','일자'); //월일 표기 스트링
		var lim__=new Array(4,2); //월,일의 유효길이
	
		var a=new Array(); //정수화 포맷을 담을 배열
		var tmp=obj.value; // /로 나누어 배열로 담는다.
		for(var i=0; i<tmp.length; i++){
			tmp = tmp.replace("-", "");
		}
		if(tmp.length!=8){ //배열의 길이가 유효한지 확인.
			alert('날짜 형식이 올바르지 않습니다.');
			obj.value="";
			obj.focus();
			return false;
		}else {
			var year =parseInt(tmp.substring(0,4), 10); //년도를 정수화하여 담는다.
			a[0] =parseInt(tmp.substring(4,6), 10); //월
			a[1] =parseInt(tmp.substring(6,8), 10); //일
			
			//윤년 체크
			var daynum = cday(year);
			if(a[0] == '02'){		
				if(daynum < a[1]){
					alert(daynum+'일이 마지막 일 입니다.');	
					obj.value=year+tmp.substring(4,6)+daynum;		
					obj.focus();
					return false;
				}
			}
							
			for(var i in a){ //배열의 길이만큼 루프를 돈다.
				if(a[i]<0||a[i]>lim[i]){ //일,월별 유효성 체크
				
					alert(lim_[i]+'를 제대로 입력해 주세요');
					obj.value="";
					obj.focus();
					return false;
				}
			}
	
			if(mt[a[0]-1]<a[1]){ //월별 요일의 범위체크
				alert(" (a[0]-1) >>>" +  (a[0]-1));
				alert('일자의 범위가 틀립니다.');	
				obj.value="";		
				obj.focus();
				return false;
			}
			
		}	
			
		
		var a1=new Array(); //정수화 포맷을 담을 배열
		var tmp2=obj2.value; // /로 나누어 배열로 담는다.
		for(var i=0; i<tmp2.length; i++){
			tmp2 = tmp2.replace("-", "");
		}
		if(tmp2.length!=8){ //배열의 길이가 유효한지 확인.
			alert('날짜 형식이 올바르지 않습니다.');
			obj2.value="";		
			obj2.focus();
			return false;
		}else {
			var year2 =parseInt(tmp2.substring(0,4), 10); //년도를 정수화하여 담는다.
			a1[0] =parseInt(tmp2.substring(4,6), 10); //월
			a1[1] =parseInt(tmp2.substring(6,8), 10); //일
			
			//윤년 체크
			var daynum2 = cday(year2);
			if(a[0] == '02'){			
				if(daynum2 < a1[1]){
					alert(daynum2+'일이 마지막 일 입니다.');	
					obj2.value=year2+tmp2.substring(4,6)+daynum2;		
					obj2.focus();
					return false;
				}
			}
							
			for(var i in a1){ //배열의 길이만큼 루프를 돈다.
				if(a1[i]<0||a1[i]>lim[i]){ //일,월별 유효성 체크
				
					alert(lim_[i]+'를 제대로 입력해 주세요');
					obj2.value="";
					obj2.focus();
					return false;
				}
			}
	
			if(mt[a1[0]-1]<a1[1]){ //월별 요일의 범위체크
				alert('일자의 범위가 틀립니다.');	
				obj2.value="";		
				obj2.focus();
				return false;
			}
		}
		
		if(obj.value > obj2.value){
			alert('검색 시작일이 종료일보다 큽니다.');	
			//obj.value="";
			return false;
		}
		
		return true;	
		
	}

	//2년 윤년처리
	function cday(year)
	{
		//2월달일때 윤년 처리
		if ((year % 4) == 0) { //윤년
			if ((year % 100) == 0) { //평년
				if ((year % 400) == 0) { //윤년
					daynum = 29;
				}
				else {//평년
					daynum = 28;
				}
			}
			else { //윤년
				daynum = 29;
			}
		}
		else {//평년
			daynum = 28;
		}
		return daynum;
	} 
	
	/**
	 * Message 레이어 이동관련 함수.
	 */
	function fnStartMove(){
		oDiv.adjustX=event.clientX - oDiv.offsetLeft; 
		oDiv.adjustY=event.clientY - oDiv.offsetTop; 
		oDiv.moving=true; 
	} 
	function fnStopMove(){ 
		oDiv.moving=false; 
	} 
	function fnMove(){ 
	    if(oDiv.moving==true){ 
	        if(event.clientX - oDiv.adjustX>0){ 
	        	oDiv.style.left=event.clientX - oDiv.adjustX; 
	        }  
	        if(event.clientY - oDiv.adjustY>0){ 
	        	oDiv.style.top=event.clientY - oDiv.adjustY; 
	        } 
	    } 
	} 
	function fnUpdate(){ 
		iOffset=parseInt(oOffset.value); 
	} 
	
	// Message 확인팝업. 
	function msgPopup(){
		var ul = document.URL.split("comm=")
		
		//메일페이지 일 경우
		if(ul[1] == "mng.adminMain"){
			document.location.href = '/partner/UrgentMsgFrame.jsp';
		
		//프레임이 있는 페이지 경우
		}else{
			parent.document.location.href = '/partner/UrgentMsgFrame.jsp';
		}
		return;
	}
	
	/**
	 * Message 레이어처리.
	 */
	function ghsMessageProc(msg){
		try{
			// 생성할 DIV객체를 생성함.
			var Layer = document.createElement("div");
			var close = "<br/> <a align='right' href='javascript:msgPopup();'>바로가기</a> | <a align='right' href='javascript:msgClose();'>닫기[X]</a>";
			
			// DIV객체에 Attribute 값을 설정
			Layer.setAttribute("id","oDiv");
			Layer.style.cssText = "cursor: move; background-color:#FFCC00; position: absolute; top: 50; left: 40%; height: 75; width: 200; border: 1 solid; padding: 10px; text-align: center; font-size: 12px;";
			Layer.setAttribute("onmouseout" , function(){ fnStopMove(); });
			Layer.setAttribute("onmouseup"  , function(){ fnStopMove(); });
			Layer.setAttribute("onmousemove", function(){ fnMove();     });
			Layer.setAttribute("onmousedown", function(){ fnStartMove() });
			Layer.innerHTML = msg + close;
			
			// Body 내용에 DIV를 추가함.
			document.body.appendChild(Layer);
			
		}catch(e){
			// alert("레이어를 생성하는중 에러가 발생했습니다. : " + e);
		}
	}
	
	/**
	 * 메세지 표시를 위한 타이머를 설정한다.
	 * 'net.js'가 설정되어있지 않은 경우는 임포트시킴.
	 */
	var ghsGapTimer = null;
	var ghsMsgTimer = null;
	var runMsgs = true;
	
	// Message 레이어를 닫음.
	function msgClose(){
		oDiv.style.display = "none";
		runMsgs = false;
		return;
	}
	
	
	/**
	 * 프론트 JSP Generation 서버변수선언 : 공통으로 사용함. 
	 */

	// 개인 로컬에서 사용	
	var genServerHost   = "http://localhost:8080";	// front
	var genServerDomain = "http://localhost:8080";	
	var genAdminHost 	= "http://localhost:8080";		// back
	var getMobileServerHost =   "http://127.0.0.1:8080";   //mobile front
	var getMobileServerDomain = "http://127.0.0.1:8080";   //mobile front


	// 테스트 서버에서 사용
//	var genServerHost   = "http://10.10.26.114:7004,http://10.10.26.114:7004,http://10.10.26.114:7004";
//	var genServerDomain = "http://10.10.26.114:7004";
//	var genAdminHost 	= "http://10.10.26.114:7008,http://10.10.26.114:7008,http://10.10.26.114:7008";
//  var getMobileServerHost   = "http://10.10.26.114:7006";   //mobile front
//	var getMobileServerDomain = "http://10.10.26.114:7006";   //mobile front

	
	// 201번 테스트 서버에서 사용
//	var genServerHost = "http://112.108.7.201:9084";
//	var genServerDomain = "http://direct.homeplus.co.kr";
//	var genAdminHost 	= "http://112.108.7.201:9082";
//  var getMobileServerHost   = "http://10.10.26.114:7006";   //mobile front
//	var getMobileServerDomain = "http://10.10.26.114:7006"; 
	
	// 실서버 사용
//	var genServerHost = "http://112.108.7.197:7002,http://112.108.7.198:7002,http://112.108.7.199:7002,http://112.108.7.200:7002";
//	var genServerDomain = "http://direct.homeplus.co.kr";
//	var genAdminHost 	= "http://112.108.7.11:7003,http://112.108.7.197:7003";
//   var getMobileServerHost =   "http://112.108.7.197:7006,http://112.108.7.198:7006,http://112.108.7.199:7006,http://112.108.7.200:7006";   //mobile front
//	var getMobileServerDomain = "http://mdirect.homeplus.co.kr";   //mobile front
	
	/*
	function window:onload(){ 
		var msgFrame = "";
		try{ 
			if(parent.frames.length>0){
				msgFrame = parent.frames[1].name;
			}
			
			//박기홍 추가
			// 상태창에 title 표시
			top.document.title = "MIS - "+document.title;
			document.body.focus();
		}catch(e){ }
		
	}
	*/
	
	/**
	 * EnterKey event function (jsEnterCheck(호출함수, enter 중복방지))
	 * suomi 2010-09-10
	 */
	function jsEnterCheck(jsFunction, overlapOff){
		var e = window.event;
		try{ 
			if( e.keyCode == 13 ) {
				if(overlapOff) {
					if(eval(jsFunction) == false) return false;
					else return true;
				}else{
					alert("조회중입니다.\n확인을 선택 후 잠시만 기다려주세요.");
					return false;
				} 
			}
			return false;
		}catch(e){ }
	}
	
	
	/**
	 * Document내에 있는 INPUT TYPE이 button인 모든 Elements를 활성/비활성 시킨다.
	 * 사용법	: 버튼 비활성화 -> docBtnCtrl(true); , 버튼 활성화 -> docBtnCtrl(false); 
	 * created : 2011.08.24  HIPPIE
	 *     
	 * @param flag : 활성화/비활성화 여부
	 * 
	 **/
	function docBtnCtrl(flag){
		var elObj = document.getElementsByTagName("INPUT");
		var pNode = "";
		for(var i = 0; i <elObj.length; i++){
			pNode = elObj[i]; 
			if(pNode.type == "button"){
				pNode.disabled  = flag;
			}
		}
	}

	
	/*  스크립트 Nvl처리 */
	function fnNvlInt(val , str) {
		val = ReplaceStr( ReplaceStr(val,',','') ,'원','');

		if(val == undefined || val == null || val == '' || val == 'null'){
			return parseInt(str, 10);
		}else{ 
			return parseInt(val, 10);
		}
	}
	
	function jsnumberchk(){
		ev = window.event;
		alert(ev);
		if((ev.keyCode>=48 && ev.keyCode<=57)){
			 return true;
		}else{
			 ev.returnValue=false;
		}
	}
	
	// 숫자인지 체크
	function checkLetter(obj, opt, rtnyn) {
	    var src_chars = obj.value;
	    var com_chars = "";
	    
	    if( opt == "1") 
	    {
	        com_chars = "0123456789";
	        
	        if (!ContainsCharsCheck(src_chars, com_chars)) {
	            alert("숫자만 입력 가능합니다.");
	            
	            obj.value = ContainsOnlyChars(src_chars, com_chars);
	        } else {
	            obj.value = src_chars;
	        }
	    } else if( opt == "2") {
	        com_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	        
	        if (!ContainsCharsCheck(src_chars, com_chars)) {
	            alert("영문과 숫자만 입력 가능합니다.");
	            
	            obj.value = ContainsOnlyChars(src_chars, com_chars);
	        } else {
	            obj.value = src_chars;
	        }
	    }else if( opt == "3") {
	        com_chars = "0123456789.";
	        
	        if (!ContainsCharsCheck(src_chars, com_chars)) {
	            alert("숫자만 입력 가능합니다.");
	            
	            obj.value = ContainsOnlyChars(src_chars, com_chars);
	        } else {
	            obj.value = src_chars;
	        }
	    }
	    
	    if( rtnyn == "Y") {
	        return obj.focus();
	    }
	}
	
	/**
	 *  str과 chars로 들어온 값을 비교해서 chars에해당하지 않는것은 자르고 chars에 해당하는 것만 리턴한다.
	 */
	function ContainsOnlyChars(str, chars) {
	    var rtnstr = "";
	    
	    for (var inx = 0; inx < str.length; inx++) {
	       if (chars.indexOf(str.charAt(inx)) == -1) {
	           return rtnstr;
	       } else {
	               rtnstr += str.charAt(inx);
	       }
	    }
	    
	       return rtnstr;
	}
	
	/**
	 * 입력값이 특정 문자(chars)만으로 되어있는지 체크
	 * 특정 문자만 허용하려 할 때 사용
	 * ex) if (!ContainsCharsCheck(form.blood,"ABO")) {
	 *         Alert("혈액형 필드에는 A,B,O 문자만 사용할 수 있습니다.");
	 *     }
	 * @param obj   Object
	 * @return true 특정 문자가 있을 경우
	 */
	function ContainsCharsCheck(str, chars) {
	    for (var inx = 0; inx < str.length; inx++) {
	       if (chars.indexOf(str.charAt(inx)) == -1)
	           return false;
	    }
	    return true;
	}
	
	// flag 변수의 문자가 obj의 값에  num개 만큼 있으면 true, 아니면 false
	// ex) dashCount(gForm.objName, '-', 2) gForm.objName의 문자중에서 '-'가 2개이면 true, 아니면 false
	function dashCount(obj, flag, num){
		var count = 0;
		for (var inx = 0; inx < obj.value.length; inx++) {
			if (flag.indexOf(obj.value.charAt(inx)) != -1){
				count++;	
			}
		}
		
		if(count == num){
			return true;
		}else{
			return false;
		}		
	}
//-->

	var callBack 	= null;

	var ZipPop = {
		popShow : function(method, url) {
			callBack = method;
	 		CenterOpenWindow(url, "zipcode", "430" ,"529", "scrollbars=yes,status=yes"); 
		}, 
		callBackFunction : function (callParams){
			callBack.call(this, callParams);
		}
	}
		
	function ZipCode(zipnum1, zipnum2, sido_txt, gugun_txt, dong_txt, addr_txt, gunmul_no, gunmul_nm) {
		this.zipnum1 	= zipnum1;
		this.zipnum2 	= zipnum2;
		this.sido_txt 	= sido_txt;
		this.gugun_txt 	= gugun_txt;
		this.dong_txt 	= dong_txt;
		this.addr_txt 	= addr_txt;
		this.gunmul_no = gunmul_no;
		this.gunmul_nm = gunmul_nm;
	}
	
	/* 
	 * 날짜유효성 확인
	 * by최종현 2014.01.07
	 * parameter - YYYY/MM/DD형식만 허용
	 */
	function validationDate(parameter) {
		var originalParamter;
		var targetParameter;

		var dateArray = parameter.split("/");
		
		if (parameter === "") {
			return true;
		}
		
		if (dateArray.length !== 3) {
			return false;
		}

		var date = new Date();
		date.setFullYear(parseInt(dateArray[0], 10), parseInt(dateArray[1], 10)-1, parseInt(dateArray[2], 10));

		originalParamter = parameter.split("-").join("");
		targetParameter = date.getFullYear() + "" + ((date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) : (date.getMonth()+1)) + "" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());

//		alert(typeof originalParamter +" / "+originalParamter + "\n" + typeof targetParameter + " / " + targetParameter);
		return (originalParamter === targetParameter);
	}

document.write("<script type='text/javascript' src='/common/scripts/CommonAction.js'><"+"/script>");

/**
 * 공통코드조회해서 option list 반환
 * select tag 내부에 innerHTML로 들어감 
 */
function jsCommonCombobox(upcode_cd, all, selected) {
	var ret="";
	$.ajax({
		url: '/app.promotion.automail.Automail.ghs',
		dataType: "json",
		data : "comm=mng.promotion.automail.combo&upcode_cd="+upcode_cd,
		async : false,
		success: function(result) {
			if(all){
				ret += '<option value="" selected>전체</option>';
			}
			$.each(result, function(index,data) {
				if(data.code_cd==selected){
					ret += '<option value="'+data.code_cd+'" selected>'+data.code_nm+'</option>';
				} else {
					ret += '<option value="'+data.code_cd+'">'+data.code_nm+'</option>';
				}
			});
		}
	});
	return ret;

}

/**
 * 자동메일 템플릿 리스트 조회
 * <select> 내부에 innerHTML로 들어감 
 */
function jsTemplateCombobox(all, selected) {
	var ret="";
	$.ajax({
		url: '/app.promotion.automail.Automail.ghs',
		dataType: "json",
		data : "comm=mng.promotion.automail.templatelist",
		async : false,
		success: function(result) {
			if(all){
				ret += '<option value="" selected>전체</option>';
			}
			if(result.length>0){
				$.each(result, function(index,data) {
					if(data.template_no==selected){
						ret += '<option value="'+data.template_no+'" selected>'+data.template_name+'</option>';
					} else {
						ret += '<option value="'+data.template_no+'">'+data.template_name+'</option>';
					}
				});
			} else {
				ret += '<option value="">등록된템플릿없음</option>';
			}
			
		}
	});
	return ret;

}

// form validator
// parameter : form element
// input의 필수여부만 확인함
// 이메일, 영문only, 길이 추가해야함
//
// required 속성이 true인것 조사하여 alt값을 alert으로 띄운다.
// 필수항목은 반드시 alt에 항목명을 지정해야한다.
//
// 2014. 11.07 김명섭
function jsCheckFormValidate(form){
	var tags = form.all.tags("input");
	for(var i=0; i<tags.length; i++){
		if(!jsCheckRequired(tags[i])) 	return false;
		if(!jsCheckAlpha(tags[i])) 		return false;
		if(!jsCheckNumonly(tags[i])) 	return false;
		if(!jsCheckAlphaNumeric(tags[i])) return false;
		if(!jsCheckMinLength(tags[i])) 	return false;
		if(!jsCheckEmail(tags[i])) 		return false;
	}
	return true;
}

function jsCheckRequired(ele){
	if (ele.required) {
		var str = ele.value;
		//트림
		str = str.replace(/^\s+|\s+$/gm,'');
		if(str==""){
			var msg = ele.alt+"(은)는 필수입니다.";
			alert(msg);
			return false;
		}
	}
	return true;
}

function jsCheckAlpha(ele){
	return true;
}

function jsCheckNumonly(ele){
	// numonly 속성이 있어야함
	if (ele.numonly) {
		var charsAllowed="0123456789";
		var val=ele.value;
		var allowed;
	    for(var i=0;i<val.length;i++){       
	        allowed=false;
	        for(var j=0;j<charsAllowed.length;j++){
	            if( val.charAt(i)==charsAllowed.charAt(j) ){ allowed=true; }
	        }
	        if(allowed==false){ 
	        	var msg = ele.alt+"(은)는 숫자만 입력할 수 있습니다.";
				alert(msg);
				return false;
	        }
	    }
	}
    return true;
}

function jsCheckAlphaNumeric(ele){
	return true;
}

function jsCheckMinLength(ele){
	return true;
}

function jsCheckEmail(ele){
	return true;
}

/* jQuery DatePicker */
function showDatepicker(dateField) {
	
	var transDate = "";			// 입력 필드의 value

	$( "*[name=" + dateField + "]" ).datepicker({
          //altFormat: 'yy/mm/dd',
          dateFormat: 'yy/mm/dd',
          changeYear: true,
          changeMonth: true,
          showButtonPanel: true,
          showMonthAfterYear: true,
          beforeShow: function() {
        	  
        	  transDate = $( "*[name=" + dateField + "]" ).val();				// 선택 된 날짜 값
        	  
        	  if ( transDate.length == 8 ) {									// 입력 필드의 value가 8자리 (20150101)의 형식의 경우 , 해당값에 - 를 붙여준다
        		  reDate = transDate.substring(0 , 4) + "/" + transDate.substring(4 , 6) + "/" + transDate.substring(6 , 8);
        		  $( "*[name=" + dateField + "]" ).val(reDate);
        	  }

              setTimeout(function() {
            	$("#ui-datepicker-div").before("<iframe src='about:blank' id='ui-datepicker-div-bg-iframe' frameborder='0' scrolling='no' style='filter:alpha(opacity=0); position:absolute; "
					+ "left: " 		+ $("#ui-datepicker-div").css("left") + ";"
                    + "top: " 		+ $("#ui-datepicker-div").css("top") + ";"
                    + "width: " 	+ $("#ui-datepicker-div").outerWidth(true) + "px;"
                    + "height: " 	+ $("#ui-datepicker-div").outerHeight(true) + "px;'></iframe>");
          		}, 50);
          },
          onClose: function() {
              $("#ui-datepicker-div-bg-iframe").remove();
          }
    });
    
    $("*[name=" + dateField + "]").focus();
    
}