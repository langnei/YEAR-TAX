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
package egovframework.tax.common.service;

import java.util.List;
import java.util.HashMap;
import java.util.Map;


/**
 * @Class Name : EgovSampleService.java
 * @Description : EgovSampleService Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
public interface CommonCodeService {
    /**
	 * 메뉴를 가져온다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    List<?> commCodeList(HashMap map) throws Exception;
    List<?> commCodeCombo(HashMap map) throws Exception;
    List<?> commDetaCombo(HashMap map) throws Exception;    
    List<?> accSaubCombo(HashMap map) throws Exception;  
    List<?> accSaubComboAll(HashMap map) throws Exception;        
    List<?> insaCodeCombo(HashMap map) throws Exception;
    List<?> insaDetaCombo(HashMap map) throws Exception; 
    List<?> insaNameCombo(HashMap map) throws Exception;     
    List<?> depaCodeCombo(HashMap map) throws Exception;
    List<?> depaCodeComboAll(HashMap map) throws Exception;    
    List<?> tongCodeCombo(HashMap map) throws Exception;
    List<?> busiCodeCombo(HashMap map) throws Exception;
    List<?> commMbusCombo(HashMap map) throws Exception;
    List<?> commBusiCombo(HashMap map) throws Exception;
    List<?> commBusiComboNew(HashMap map) throws Exception; // 2016-07-19
    List<?> commBusiComboNew2(HashMap map) throws Exception; // 2016-08-02
    List<?> commWplacCombo(HashMap map) throws Exception; // 2016-10-01    
    List<?> getEmplInfo(CommonVO commVO) throws Exception;
    List<?> getEmplFind(CommonVO commVO) throws Exception;
    List<?> getGrEmplFind(CommonVO commVO) throws Exception;    
    int getEmplCnt(CommonVO commVO) throws Exception;    
    List<?> getAcctFind(CommonVO commVO) throws Exception; 
    List<?> getAcctFindKy(CommonVO commVO) throws Exception;     
    List<?> getAcctSuboFind(CommonVO commVO) throws Exception;  
    List<?> getDepaFind(CommonVO commVO) throws Exception; 
    List<?> getCustFind(CommonVO commVO) throws Exception;    
    List<?> getApprStat(CommonVO commVO) throws Exception; 
    List<?> getDateDiff(CommonVO commVO) throws Exception;
    List<?> getGunmDays(CommonVO commVO) throws Exception;
        
    List<?> getSaupNumb(CommonVO commVO) throws Exception; 
    
    List<?> loginCheck(Map<String,Object> map) throws Exception;  
    List<?> userCheck(HashMap map) throws Exception; // (2016-07-08 김성빈)  
    List<?> userInfo(HashMap map) throws Exception; // (2016-08-16 김성빈)
    
    List<?> selectMenuList(CommonDefaultVO searchVO) throws Exception;  
    
	public void gWareStat_Update(CommonVO commVO); 
	public void kyulFore_Insert(CommonVO commVO);
	
	List<?> getSaubFind(Map<String, Object> map) throws Exception;
	List<?> getYesnFind(Map<String, Object> map) throws Exception;
	
	List<?> getSMenuListS(HashMap map) throws Exception; 
	List<?> getSMenuListM(CommonVO commVO) throws Exception; 
	
	List<?> getSuboFind(Map<String, Object> map) throws Exception;
	
	List<?> getSodkFind(CommonVO commVO) throws Exception; // (2016-06-17 김성빈)
	
	List<?> getCardFind(Map<String, Object> map) throws Exception;
	
	List<?> getAcctSuboFind3(Map<String, Object> map) throws Exception; //(20160628)
	
    List<?> getMemberFind(CommonVO commVO) throws Exception; // (2016-08-02 김성빈) 	
    List<?> getMemberBusiFind(CommonVO commVO) throws Exception; // (2016-08-02 김성빈) 
    
	List<?> getForeAmt(Map<String, Object> map) throws Exception;    
    
}
