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

