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
package egovframework.tax.ksys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.tax.ksys.service.SystemService;
import egovframework.tax.comm.service.CommCodeService;
import egovframework.tax.ksys.service.SystemDefaultVO;
import egovframework.tax.ksys.service.SystemVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

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

@Service("systemService")
public class SystemServiceImpl implements SystemService {

	private static final Logger LOGGER = LoggerFactory.getLogger(SystemServiceImpl.class);

	/** SampleDAO */
	// TODO ibatis 사용
	@Resource(name="systemServiceMapper")
	private SystemServiceMapper systemServiceMapper;
	// TODO mybatis 사용

    /** ID Generation */
    @Resource(name="egovIdGnrService")
    private EgovIdGnrService egovIdGnrService;
	
	/**
	 * syia030 사용자를 가져온다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<?> syia030_Select(Map<String, Object> map) throws Exception {
		return systemServiceMapper.syia030Select(map);
	}
}
