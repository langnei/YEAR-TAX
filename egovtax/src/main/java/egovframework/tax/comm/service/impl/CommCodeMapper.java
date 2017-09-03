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
package egovframework.tax.comm.service.impl;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;
import egovframework.tax.comm.service.CommVO;
import egovframework.tax.comm.service.CommDefaultVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

/**
 * @Class Name : SampleDAO.java
 * @Description : Sample DAO Class
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

@Mapper("commCodeMapper")
public interface CommCodeMapper{

    //로그인 정보를 확인한다.
    public List<?> loginCheck(Map map) throws Exception;
    //메뉴목록을 조회한다.
    public List<?> selectMenuList(CommDefaultVO searchVO) throws Exception;
    //사업리스트를 가져온다.(combo)
    public List<?> commBusiCombo(HashMap map) throws Exception;  
    //개인에 대한 사업장을 가져온다.
    public List<?> commWplacCombo(HashMap map) throws Exception;
  	
}
