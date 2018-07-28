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
 * See the License for the specific language governing pertaxsions and
 * limitations under the License.
 */
package egovframework.tax.comm.web;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springmodules.validation.commons.DefaultBeanValidator;

import egovframework.tax.comm.service.CommCodeService;
import egovframework.tax.comm.service.CommVO;
import egovframework.tax.comm.web.CommonSessionCookie;
import egovframework.rte.fdl.property.EgovPropertyService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
@SessionAttributes(types = CommVO.class)
public class CommLoginController {

	/** EgovsystemService */
	@Resource(name = "commCodeService")
	private CommCodeService commCodeService;
	
	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	/** Validator */
	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;
	
	@RequestMapping(value = "/tax/login.do")
	public String openLogin(ModelMap model) throws Exception {
		/** EgovPropertyService.msis.ksys */
		
		long now = System.currentTimeMillis();

		SimpleDateFormat sdfNow = new SimpleDateFormat("yyyyMMdd");
		String strToday = sdfNow.format(new Date(now));
		
		//System.out.println("오늘날짜="+strToday);
		
		model.addAttribute("today", strToday);
		
		return "/tax/comm/login";
	}
	
	/**
	 * 로그인 처리
	 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
	 * @param model
	 * @return "/sample/egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/tax/loginCheck.do")
	public String loginCheck(@RequestParam Map<String,Object> map, HttpServletRequest req, Model model) throws Exception {
		//
		System.out.println("ID=="+map.get("USER_ID"));
		System.out.println("PW=="+map.get("USER_PASSWORD"));
		
		//데이터 조회
		List data = commCodeService.loginCheck(map);
		
		if(data.size() == 0) {
			System.out.println("DATASIZE=="+data.size());
			model.addAttribute("result", "nodata");
			return "/tax/comm/login";
		}
		
		for(int i=0; i < 1; i++) {
			//데이터를 피벗시킴
			Map<String,Object> sData = new HashMap();

			Map<String,Object> result = (Map<String,Object>)data.get(i);
			 
			String  eNumb = (String)result.get("emplNumb"); //사번
			String  eName = (String)result.get("emplName"); //사원명
			String  dCode = (String)result.get("depaCode"); //부서코드
			String  dName = (String)result.get("depaName"); //부서명
			String jkCode = (String)result.get("emplJkgb"); //직급코드
			String duCode = (String)result.get("emplDuty");
			String ibDate = (String)result.get("ipsaDate"); //입사일
			String wkPlac = (String)result.get("workPlac"); //사업장				
			String hdName = (String)result.get("headName"); //대표자 이름
			String grNumb = "";
			if(result.get("grupNumb") != null) grNumb = (String)result.get("grupNumb"); // 그룹
			
			CommonSessionCookie.setSessionAttribute(req, "_empl_numb", eNumb);
			CommonSessionCookie.setSessionAttribute(req, "_empl_name", eName);
			CommonSessionCookie.setSessionAttribute(req, "_depa_code", dCode);
			CommonSessionCookie.setSessionAttribute(req, "_depa_name", dName);
			CommonSessionCookie.setSessionAttribute(req, "_empl_jkgb", jkCode);
			CommonSessionCookie.setSessionAttribute(req, "_empl_duty", duCode);
			CommonSessionCookie.setSessionAttribute(req, "_ibsa_date", ibDate);	
			CommonSessionCookie.setSessionAttribute(req, "_work_plac", wkPlac);	
			CommonSessionCookie.setSessionAttribute(req, "_head_name", hdName);
			CommonSessionCookie.setSessionAttribute(req, "_grup_numb", grNumb);
		}
		/**CommCodeController.java로 전달*/
		return "redirect:/tax/index.do";
	}
	
	/**
	 * 로그아웃 처리
	 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
	 * @param model
	 * @return "/sample/egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/tax/logout.do")
	public String logoutCheck(@RequestParam Map<String,Object> map, HttpServletRequest req, Model model) throws Exception {
		//
		CommonSessionCookie.removeSessionAttribute(req, "_empl_numb");
		CommonSessionCookie.removeSessionAttribute(req, "_empl_name");
		CommonSessionCookie.removeSessionAttribute(req, "_depa_code");
		CommonSessionCookie.removeSessionAttribute(req, "_depa_name");
		CommonSessionCookie.removeSessionAttribute(req, "_empl_jkgb");
		CommonSessionCookie.removeSessionAttribute(req, "_empl_duty");
		CommonSessionCookie.removeSessionAttribute(req, "_ibsa_date");
		CommonSessionCookie.removeSessionAttribute(req, "_work_plac");
		CommonSessionCookie.removeSessionAttribute(req, "_head_name");
		CommonSessionCookie.removeSessionAttribute(req, "_grup_numb");

		return "/tax/comm/logout";
	}	
}
