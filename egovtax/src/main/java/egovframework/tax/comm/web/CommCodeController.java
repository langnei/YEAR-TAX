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
	public String commIndexView(@RequestParam(value="sysGubn",required=false) String sysGubn, @RequestParam(value="bsgbGubn",required=false) String bsgbGubn, @RequestParam(value="wplaGubn",required=false) String wplaGubn, HttpServletRequest req, ModelMap model) throws Exception {
		/** EgovPropertyService.msis.ksys */
		long now = System.currentTimeMillis();

		SimpleDateFormat sdfNow = new SimpleDateFormat("yyyy/MM/dd");
		String strToday = sdfNow.format(new Date(now));
		
		if(CommonSessionCookie.getSessionAttribute(req, "_empl_numb") == null) {
			model.addAttribute("result", "logout");			
			return "redirect:/tax/login.do";
		}
		
		String wPlac = "";
		if(wplaGubn != null && !wplaGubn.equals("")) {
			wPlac = wplaGubn;
			CommonSessionCookie.setSessionAttribute(req, "_work_plac", wplaGubn);
		} else {
			wPlac = (String)CommonSessionCookie.getSessionAttribute(req, "_work_plac");
		}
		
		String eNumb = (String)CommonSessionCookie.getSessionAttribute(req, "_empl_numb");
		String jkCode = (String)CommonSessionCookie.getSessionAttribute(req, "_empl_jkgb");
		
		if(sysGubn == null || sysGubn.equals("")) {
				sysGubn = "07";
			if(jkCode != null && jkCode.equals("15101")){
				sysGubn = "13"; 
			}
		}
			
		String sysName = "";
		CommDefaultVO searchVO = new CommDefaultVO();
		searchVO.setSysGubn(sysGubn);
		
		System.out.println("sysGubn=="+sysGubn);
		
		if(sysGubn.equals("01")) sysName = "kins"; // 인사관리
		else if(sysGubn.equals("02")) sysName = "kpay"; // 급여관리			
		else if(sysGubn.equals("04")) sysName = "kbac"; // 회계관리			
		else if(sysGubn.equals("05")) sysName = "kmac"; // 예산관리
		else if(sysGubn.equals("06")) sysName = "ktac"; // 세무관리
		else if(sysGubn.equals("07")) sysName = "kgew"; // 공통관리
		else if(sysGubn.equals("12")) sysName = "kmem"; // 회원관리	
		else if(sysGubn.equals("13")) sysName = "keis"; // 경영관리
		else if(sysGubn.equals("11")) sysName = "ksys"; ; // 시스템관리
		searchVO.setSearchKeyword(eNumb);
		CommonSessionCookie.setSessionAttribute(req, "_sys_name", sysName);
		//데이터 조회
		List<?> menuList = commCodeService.selectMenuList(searchVO); 
		System.out.println("메뉴리스트SIZE=="+menuList.size());
		
		StringBuffer menuStr = new StringBuffer();
		menuStr.append("{Data:[");
		String expand = "Expand:0";
		String tImage = "0";
		String mmenuSelect = "<select id=\"mmenu_select\" class=\"selectbox_mmenu\" onChange=\"__mmenuChange()\" >";
		for(int i=0; i<menuList.size(); i++) {
			
			EgovMap resultMap  =  (EgovMap)menuList.get(i);
			
			//System.out.println("i값=="+i);
			
			if(i==0) {
				expand = "Expand:1";
				tImage = "1";
			} else {
				expand = "Expand:0";
				tImage = "0";
			}
			if(resultMap.get("url").equals(" ")) {
				menuStr.append("{Level:"+resultMap.get("level")+",\"TITLE#Image\":"+tImage+","+expand+",TITLE:\""+resultMap.get("title")+"\",POPYN:9}");
				mmenuSelect += "<option style=\"padding: 10px;\" value=\""+resultMap.get("bCode")+"\">"+resultMap.get("title")+"</option>";
			} else {
				menuStr.append("{Level:"+resultMap.get("level")+",\"TITLE#Image\":"+resultMap.get("image")+",URL:\"/mis/"+sysName+"/"+resultMap.get("url")+".do\",TITLE:\""+resultMap.get("title")+"\",POPYN:3}");
			}
			
			if(i < (menuList.size() - 1)) menuStr.append(",");
		}
		menuStr.append("]}");
		model.addAttribute("menuStr", menuStr.toString());
		// 중메뉴 select box
		mmenuSelect += "</select>";
		
		//System.out.println("mmenuSelect=="+mmenuSelect);
		//CommonSessionCookie.setSessionAttribute(req, "_mmenu_select", mmenuSelect);
		
		String acctGubn = "";
		// 
	    HashMap map = new HashMap();
	    map.put("work_plac", wPlac); //사업장
	    map.put("busi_year", strToday.substring(0, 4)); //년도
	    map.put("empl_numb", eNumb); //사번
	    //데이터 조회
		List<?> codeList = commCodeService.commBusiCombo(map);
		System.out.println("코드리스트SIZE=="+codeList.size());
		
		if(bsgbGubn != null && !bsgbGubn.equals("")) {
			acctGubn = bsgbGubn;
			CommonSessionCookie.setSessionAttribute(req, "_acct_gubn", bsgbGubn);
		} else {
			if (CommonSessionCookie.getSessionAttribute(req, "_acct_gubn") != null) {
				acctGubn = (String)CommonSessionCookie.getSessionAttribute(req, "_acct_gubn");
			}
		}
		String cSele = CommCodeUtil.makeCodeSelect(codeList, acctGubn);
		model.addAttribute("bsSel", cSele);
		
		// 사업장
		codeList = commCodeService.commWplacCombo(map);
		cSele = CommCodeUtil.makeCodeSelect(codeList, wPlac);

		model.addAttribute("wplaSel", cSele);
		
		System.out.println("codeList=="+codeList);
		System.out.println("sysName=="+sysName);
		
		return "/tax/"+sysName+"/index";
	}
}
