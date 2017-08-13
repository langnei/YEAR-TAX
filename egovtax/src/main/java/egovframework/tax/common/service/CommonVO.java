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

/**  
 * @Class Name : SampleVO.java
 * @Description : SampleVO Class
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
public class CommonVO extends CommonDefaultVO {
	
    private static final long serialVersionUID = 1L;
    
    /** 아이디 */
    private String id;
    
    /** 이름 */
    private String name;
    
    /** 내용 */
    private String description;
    
    /** 사용여부 */
    private String useYn;
    
    /** 등록자 */
    private String regUser;
    
    /** 사번 */
    private String empl_numb;
    
    /** 성명 */
    private String empl_name;
    
    /** 구분 */
    private String empl_gubn; 
    
    /** 사업장 */
    private String work_plac;     
    
	/** 시작일자 */
    private String fday;
    
    /** 종료일자 */
    private String eday;
    
    /** 순번 */
    private int empl_sort;    
    
    /** 그룹웨어변수 */
    private String gw_str1;
    private String gw_str2;
    private String gw_str3;
    private String gw_str4;    

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }

    public String getRegUser() {
        return regUser;
    }

    public void setRegUser(String regUser) {
        this.regUser = regUser;
    }

	public String getEmpl_numb() {
		return empl_numb;
	}

	public void setEmpl_numb(String empl_numb) {
		this.empl_numb = empl_numb;
	}

	public String getEmpl_name() {
		return empl_name;
	}

	public void setEmpl_name(String empl_name) {
		this.empl_name = empl_name;
	}

	public String getFday() {
		return fday;
	}

	public void setFday(String fday) {
		this.fday = fday;
	}

	public String getEday() {
		return eday;
	}

	public void setEday(String eday) {
		this.eday = eday;
	}

	public String getGw_str1() {
		return gw_str1;
	}

	public void setGw_str1(String gw_str1) {
		this.gw_str1 = gw_str1;
	}

	public String getGw_str2() {
		return gw_str2;
	}

	public void setGw_str2(String gw_str2) {
		this.gw_str2 = gw_str2;
	}

	public String getGw_str3() {
		return gw_str3;
	}

	public void setGw_str3(String gw_str3) {
		this.gw_str3 = gw_str3;
	}

	public String getGw_str4() {
		return gw_str4;
	}

	public void setGw_str4(String gw_str4) {
		this.gw_str4 = gw_str4;
	}

	public String getEmpl_gubn() {
		return empl_gubn;
	}

	public void setEmpl_gubn(String empl_gubn) {
		this.empl_gubn = empl_gubn;
	}
    public String getWork_plac() {
		return work_plac;
	}

	public void setWork_plac(String work_plac) {
		this.work_plac = work_plac;
	}

	public int getEmpl_sort() {
		return empl_sort;
	}

	public void setEmpl_sort(int empl_sort) {
		this.empl_sort = empl_sort;
	}
	
	
}
