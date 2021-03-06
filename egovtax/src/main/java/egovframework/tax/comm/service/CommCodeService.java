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
package egovframework.tax.comm.service;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import egovframework.tax.comm.service.CommDefaultVO;


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
public interface CommCodeService {
    /**
	 * 메뉴를 가져온다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	
	/**로그인처리*/
    List<?> loginCheck(Map<String,Object> map) throws Exception;    
    /**메뉴조회*/
    List<?> selectMenuList(CommDefaultVO searchVO) throws Exception;
    /**하위메뉴조회*/
    List<?> selectSubMenuList(CommDefaultVO searchsubVO) throws Exception;
    /**사업구분 콤보환경*/
    List<?> commBusiCombo(HashMap<?, ?> map) throws Exception;
    /**개인에 대한 사업장을 가져온다.*/
    List<?> commWplacCombo(HashMap<?, ?> map) throws Exception;
   
    List<?> depaCodeCombo(HashMap<?, ?> map) throws Exception;
}
