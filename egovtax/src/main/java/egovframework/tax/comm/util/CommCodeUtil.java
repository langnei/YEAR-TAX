/**
 * 
 * Date 에 대한 Util 클래스 
 * @author 공통서비스 개발팀 이중호
 * @since 2009.02.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.02.01  이중호          최초 생성
 *
 * </pre>
 */

package egovframework.tax.comm.util;


import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.ModelMap;

import egovframework.tax.comm.service.CommCodeService;
import egovframework.tax.comm.service.CommDefaultVO;
import egovframework.tax.comm.web.CommonSessionCookie;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@SuppressWarnings("unchecked")
public class CommCodeUtil {

	/** EgovsystemService */
	@Resource(name = "commCodeService")
	private CommCodeService commCodeService;
	
	
	public static String makeSysNameSelect(String sysGubn){
		
		String sysName = "";
	
		if(sysGubn == null || sysGubn.equals("")) {
			sysGubn = "11";
		}
		
		if(sysGubn.equals("01")) sysName = "kins"; // 인사관리
		else if(sysGubn.equals("02")) sysName = "kpay"; // 급여관리			
		else if(sysGubn.equals("04")) sysName = "kbac"; // 회계관리	
		else if(sysGubn.equals("05")) sysName = "kmac"; // 예산관리
		else if(sysGubn.equals("06")) sysName = "ktac"; // 세무관리
		else if(sysGubn.equals("07")) sysName = "kgew"; // 공통관리
		else if(sysGubn.equals("11")) sysName = "ksys"; // 시스템관리		
		else if(sysGubn.equals("12")) sysName = "kmem"; // 회원관리	
		else if(sysGubn.equals("13")) sysName = "keis"; // 경영관리
		else if(sysGubn.equals("15")) sysName = "ktax"; // 연말정산관리		
		
		return sysName;
	}
	
	// sheet이 combo code 만들기
	public static String[] makeCodeCombo(List<?> codeList)
	{
		String[] code = {"",""};
		
		for(int i=0; i<codeList.size(); i++) {
			EgovMap resultMap  =  (EgovMap)codeList.get(i);
			
			if(code[0].equals("")) code[0] = (String)resultMap.get("commCode");
			else code[0] += "|" + (String)resultMap.get("commCode"); 
			
			if(code[1].equals("")) code[1] = (String)resultMap.get("commName");
			else code[1] += "|" + (String)resultMap.get("commName"); 
		}
		
		return code;
	}
	
	// select 의 option 만들기
	public static String makeCodeSelect(List<?> codeList)
	{
		String code = "";
		
		for(int i=0; i<codeList.size(); i++) {
			EgovMap resultMap  =  (EgovMap)codeList.get(i);
			
			code += "<option style=\"padding: 10px;\" value=\""+(String)resultMap.get("commCode")+"\">"+(String)resultMap.get("commName")+"</option>";
		}
		
		return code;
	}

	// select 의 option 만들기
	public static String makeCodeSelect(List<?> codeList, String selCode)
	{
		String code = "";
		
		for(int i=0; i<codeList.size(); i++) {
			EgovMap resultMap  =  (EgovMap)codeList.get(i);
			if(selCode.equals((String)resultMap.get("commCode")))
				code += "<option style=\"padding: 20px;\" value=\""+(String)resultMap.get("commCode")+"\" selected=\"selected\">"+(String)resultMap.get("commName")+"</option>";
			else 
				code += "<option style=\"padding: 20px;\" value=\""+(String)resultMap.get("commCode")+"\">"+(String)resultMap.get("commName")+"</option>";
		}
		
		return code;
	}
	
	// select 의 option 만들기
	public static String makeNameSelect(List<?> codeList)
	{
		String code = "";
		
		for(int i=0; i<codeList.size(); i++) {
			EgovMap resultMap  =  (EgovMap)codeList.get(i);
			
			code += "<option style=\"padding: 10px;\" value=\""+(String)resultMap.get("commName")+"\">"+(String)resultMap.get("commName")+"</option>";
		}
		
		return code;
	}
	
	// menu select 의 option 만들기
	public static String makeMenuSelect(List<?> codeList, String sysName, String selCode)
	{
		String code = "";
		
		for(int i=0; i<codeList.size(); i++) {
			EgovMap resultMap  =  (EgovMap)codeList.get(i);
			if(selCode.equals((String)resultMap.get("commCode"))) {
				code += "<option style=\"padding: 20px;\" value=\"/mis/"+sysName+"/"+(String)resultMap.get("commCode")+".do\" selected=\"selected\">"+(String)resultMap.get("commName")+"</option>";
			} else {
				if(selCode.equals("") && i == 0) 
					code += "<option style=\"padding: 20px;\" value=\"/mis/"+sysName+"/"+(String)resultMap.get("commCode")+".do\" selected=\"selected\">"+(String)resultMap.get("commName")+"</option>";
				else 
					code += "<option style=\"padding: 20px;\" value=\"/mis/"+sysName+"/"+(String)resultMap.get("commCode")+".do\">"+(String)resultMap.get("commName")+"</option>";
			}
		}
		
		return code;
	}	

}

