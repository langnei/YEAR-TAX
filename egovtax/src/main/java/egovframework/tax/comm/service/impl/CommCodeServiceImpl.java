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
import java.util.Map;
import java.util.HashMap;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.tax.comm.service.CommCodeService;
import egovframework.tax.comm.service.CommVO;
import egovframework.tax.comm.service.CommDefaultVO;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

import javax.servlet.http.HttpServletRequest;

/**
 * @Class Name : EgovSampleServiceImpl.java
 * @Description : Sample Business Implement Class
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

@Service("commCodeService")
public class CommCodeServiceImpl implements CommCodeService {

	private static final Logger LOGGER = LoggerFactory.getLogger(CommCodeServiceImpl.class);

	/** SampleDAO */
	// TODO ibatis 사용
	@Resource(name="commCodeMapper")
	private CommCodeMapper commCodeMapper;
	// TODO mybatis 사용

    /** ID Generation */
    @Resource(name="egovIdGnrService")
    private EgovIdGnrService egovIdGnrService;

    /**
	 * 로그인 정보를 확인한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List<?> loginCheck(Map<String,Object> map) throws Exception {
        return commCodeMapper.loginCheck(map);
    }    
    /**
	 * 메뉴목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */    
    public List<?> selectMenuList(CommDefaultVO searchVO) throws Exception {
        return commCodeMapper.selectMenuList(searchVO);
    }     
    /**
	 * 메뉴목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */    
    public List<?> selectSubMenuList(CommDefaultVO searchsubVO) throws Exception {
        return commCodeMapper.selectSubMenuList(searchsubVO);
    }        
    /**
	 * 사업구분을 가져와 combo 환경에 맞춰준다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */        
    public List<?> commBusiCombo(HashMap map) throws Exception {
        return commCodeMapper.commBusiCombo(map);
    }
    /**
	 * 개인에 대한 사업장을 가져온다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List<?> commWplacCombo(HashMap map) throws Exception {
        return commCodeMapper.commWplacCombo(map);
    }        
    
    /**
	 * 개인에 대한 사업장을 가져온다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List<?> depaCodeCombo(HashMap map) throws Exception {
        return commCodeMapper.depaCodeCombo(map);
    }           
    
}
