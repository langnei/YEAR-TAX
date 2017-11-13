/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package egovframework.tax.ksys.web;

import java.util.List;
import java.util.Map;
import java.io.PrintWriter;
import java.util.HashMap;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springmodules.validation.commons.DefaultBeanValidator;

import com.google.gson.Gson;

import egovframework.tax.comm.service.CommCodeService;
import egovframework.tax.comm.service.CommDefaultVO;
import egovframework.tax.comm.service.CommVO;
import egovframework.tax.comm.util.CommCodeUtil;
//import egovframework.ib.util.IBSheetUtil;
import egovframework.tax.comm.web.CommonSessionCookie;
import egovframework.tax.ksys.service.SystemService;
import egovframework.tax.ksys.service.SystemDefaultVO;
import egovframework.tax.ksys.service.SystemVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Class Name : SystemController.java
 * @Description : System Controller Class
 * @Modification Information
 * @
 * @  수정일              수정자                 수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.12.30  AbsKim      최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2015.12.30
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Controller
@SessionAttributes(types = SystemVO.class)
public class SystemController {

	/** EgovsystemService */
	@Resource(name = "systemService")
	private SystemService systemService;
	
	/** EgovsystemService */
	@Resource(name = "commCodeService")
	private CommCodeService commCodeService;
	
	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	/** Validator */
	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;

	/**
	 * 사용자를 조회한다. (pageing)
	 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
	 * @param model
	 * @return "/sample/egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/tax/ksys/syia030.do")
	public String syia030View(@ModelAttribute("searchVO") SystemDefaultVO searchVO, HttpServletRequest req, ModelMap model) throws Exception {
		/** EgovPropertyService.msis.ksys */
		
		// 사업장 받기 (공통)
		String workPlac = (String)CommonSessionCookie.getSessionAttribute(req, "_work_plac");
		
		//데이터 조회
		HashMap map = new HashMap();
		map.put("work_plac", workPlac);
		
		List<?> codeList = commCodeService.depaCodeCombo(map);
		String depaSele = CommCodeUtil.makeCodeSelect(codeList);
		
		model.addAttribute("depaSele", depaSele);
		model.addAttribute("wPlac", workPlac);		
				
		return "/tax/ksys/syia030";
	}
	
	@RequestMapping(value = "/tax/ksys/syia030_Select.do")
	public @ResponseBody ModelMap syia030_Select(@RequestParam Map<String,Object> map) throws Exception {
		
		System.out.println("부서코드="+map.get("frm_SearchDepa"));		
		//데이터 조회
		List data = systemService.syia030_Select(map);
		System.out.println("셀렉트"+data);		
		
		Gson gson = new Gson();

        //JSON 반환 
        return (ModelMap) data; 
	}	

}
