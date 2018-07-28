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
package egovframework.tax.comm.web;

import java.io.PrintWriter;
import java.io.StringReader;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;


import org.w3c.dom.Document;
import org.w3c.dom.Element;

import org.w3c.dom.Text;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import org.springmodules.validation.commons.DefaultBeanValidator;

//import egovframework.ib.util.IBSheetUtil;
import egovframework.tax.comm.service.CommCodeService;
import egovframework.tax.comm.service.CommDefaultVO;
import egovframework.tax.comm.service.CommVO;
import egovframework.tax.comm.util.CommCodeUtil;

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
@SessionAttributes(types = CommVO.class)
public class CommCodeController {

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
	 * 대메뉴의 index 페이지 호출.
	 * @param searchVO - 조회할 정보가 담긴 
	 * @param model
	 * @return "/sample/egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/tax/index.do")
	public String commIndexView(@RequestParam(value="sysGubn",required=false, defaultValue="11") String sysGubn, 
			@RequestParam(value="bsgbGubn",required=false) String bsgbGubn, 
			@RequestParam(value="wplaGubn",required=false) String wplaGubn, 
			HttpServletRequest req, ModelMap model) throws Exception {
		
		String wPlac = "";
		String eNumb = "";
		String jkCode = "";
		String sysName = "";
		String acctGubn = "";
		
		/** EgovPropertyService.msis.ksys */
		long now = System.currentTimeMillis();

		SimpleDateFormat sdfNow = new SimpleDateFormat("yyyy/MM/dd");
		String strToday = sdfNow.format(new Date(now));
		
		if(CommonSessionCookie.getSessionAttribute(req, "_empl_numb") == null) {
			model.addAttribute("result", "logout");			
			return "redirect:/tax/login.do";
		}
		
		if(wplaGubn != null && !wplaGubn.equals("")) {
			wPlac = wplaGubn;
			CommonSessionCookie.setSessionAttribute(req, "_work_plac", wplaGubn);
		} else {
			wPlac = (String)CommonSessionCookie.getSessionAttribute(req, "_work_plac");
		}
		
		eNumb = (String)CommonSessionCookie.getSessionAttribute(req, "_empl_numb");
		jkCode = (String)CommonSessionCookie.getSessionAttribute(req, "_empl_jkgb");
		
		sysName = CommCodeUtil.makeSysNameSelect(sysGubn);
			
		CommDefaultVO searchVO = new CommDefaultVO();
		
		searchVO.setSysGubn(sysGubn);
		searchVO.setSearchKeyword(eNumb);
		
		CommonSessionCookie.setSessionAttribute(req, "_sys_name", sysName);
		//데이터 조회

		List<?> menuList = commCodeService.selectMenuList(searchVO);
		List<?> menuSubList = commCodeService.selectSubMenuList(searchVO);
		
		/*
		ObjectMapper mapper = new ObjectMapper();
		String jsonList="";
		jsonList = mapper.writeValueAsString(menuSubList);
		System.out.println("json리스트값==="+jsonList.toString());
		*/

	    HashMap<String, String> map = new HashMap<String, String>();
	    map.put("work_plac", wPlac); //사업장
	    map.put("busi_year", strToday.substring(0,4)); //년도
	    map.put("empl_numb", eNumb); //사번
	    
	    //데이터 조회
		List<?> codeList = commCodeService.commBusiCombo(map);
		
		if(bsgbGubn != null && !bsgbGubn.equals("")) {
			acctGubn = bsgbGubn;
			CommonSessionCookie.setSessionAttribute(req, "_acct_gubn", bsgbGubn);
		} else {
			if (CommonSessionCookie.getSessionAttribute(req, "_acct_gubn") != null) {
				acctGubn = (String)CommonSessionCookie.getSessionAttribute(req, "_acct_gubn");
			}
		}
		String cSele = CommCodeUtil.makeCodeSelect(codeList, acctGubn);
		
		// 사업장
		codeList = commCodeService.commWplacCombo(map);
		cSele = CommCodeUtil.makeCodeSelect(codeList, wPlac);
		
		model.addAttribute("sysName", sysName);
		model.addAttribute("menuList", menuList);		
		model.addAttribute("menuSubList", menuSubList);		
		model.addAttribute("bsSel", cSele);
		model.addAttribute("wplaSel", cSele);
		
		return "/tax/"+sysName+"/index";
	}
}
