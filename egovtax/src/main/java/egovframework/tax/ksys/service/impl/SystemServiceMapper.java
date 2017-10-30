package egovframework.tax.ksys.service.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.tax.ksys.service.SystemDefaultVO;
import egovframework.tax.ksys.service.SystemVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("systemServiceMapper")
public interface SystemServiceMapper {
	
	public List<?> syia030Select(Map map) throws Exception;
	
}
