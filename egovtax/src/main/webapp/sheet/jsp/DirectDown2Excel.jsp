<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.io.*" %>
<%@ page import="org.apache.poi.ss.usermodel.Workbook" %>
<%@ page import="com.ibleaders.ibsheet7.ibsheet.excel.DirectDown2Excel" %>
<%@ page import="com.ibleaders.ibsheet7.util.Synchronizer" %>
<%@ page import="com.ibleaders.ibsheet7.util.IBPacketParser" %>
<%

//     out.clear();
//     out = pageContext.pushBody();

    DirectDown2Excel ibExcel = new DirectDown2Excel();
	ibExcel.setService(request, response);

    //====================================================================================================
    // [ 사용자 환경 설정 #1 ]
    //====================================================================================================
    // Html 페이지의 엔코딩이 utf-8 로 구성되어 있으면 "ibExcel.setPageEncoding("utf-8");" 로 설정하십시오.
    // 엑셀 문서의 한글이 깨지면 이 값을 공백("")으로 바꿔 보십시오.
    // LoadExcel.jsp 도 동일한 값으로 바꿔 주십시오.
    //====================================================================================================
	ibExcel.setPageEncoding("utf-8");


    //====================================================================================================
    // [ 사용자 환경 설정 #2 ]
    //====================================================================================================
    // 엑셀에 포함될 이미지의 URL 에 가상폴더를 사용할 경우가 조금이라도 있다면 웹루트를 아래 변수에 직접 지정해 주십시오.
    // 엑셀에 포함될 이미지에 가상폴더를 사용하지 않으면 설정하지 마세요.
    //====================================================================================================
	String webRootPath = "D:/";
	ibExcel.setWebRoot(webRootPath);

    //====================================================================================================
    // [ 사용자 환경 설정 #3 ]
    //====================================================================================================
    // 트리 컬럼에서 레벨별로 … 를 덧붙여서 레벨별로 보기 좋게 만듭니다.
    // 만약 … 대신 다른 문자를 사용하기를 원하시면 아래 유니코드 \u2026 (16진수형태) 대신 다른 문자를 입력하십시오.
	// 트리 컬럼이 없으면 설정하지 마세요.
    //====================================================================================================
	ibExcel.setTreeChar("\u2026");

    //====================================================================================================
    // [ 사용자 환경 설정 #4 ]
    //====================================================================================================
    // 기본 폰트 이름과 폰트 크기를 설정합니다.
	// SheetDesign : 0 을 사용하는 경우에만 적용됩니다.
    //====================================================================================================
	ibExcel.setDefaultFontName("맑은고딕");
	ibExcel.setDefaultFontSize((short)10);

	//====================================================================================================
	// [ 사용자 환경 설정 #5 ]
	//====================================================================================================
	// IBSheet의 폰트 이름, 폰트 크기를 사용하지 않고 다음에서 설정한 값으로 강제적으로 적용합니다.
	// SheetDesign : 1, 2 를 사용하는 경우에만 적용됩니다.
	// 사용하지 않으시려면 주석처리 하세요.
	// 
	//ibExcel.setFontName("궁서");
	//ibExcel.setFontSize((short)15);

	//====================================================================================================
	// [ 사용자 환경 설정 #6 ]
	//====================================================================================================
	// 줄바꿈 설정을 다음에서 설정한 값으로 강제적으로 적용합니다.
	// 사용하지 않으시려면 주석처리 하세요.
	// 
	//ibExcel.setWordWrap(false);

    //====================================================================================================
    // [ 사용자 환경 설정 #7 ]
    //====================================================================================================
    // 엑셀 다운로드 시 헤더행의 글자색을 설정하고 싶은 경우에 설정하세요.
    // #3366FF 형태의 웹 컬러로 설정해주세요.
    // 설정을 원하지 않는 경우 주석처리해주세요.
    //====================================================================================================
    //ibExcel.setHeaderFontColor("#FF2233");

    //====================================================================================================
    // [ 사용자 환경 설정 #8 ]
    //====================================================================================================
    // 엑셀 다운로드 시 헤더행의 배경색을 설정하고 싶은 경우에 설정하세요.
    // #3366FF 형태의 웹 컬러로 설정해주세요.
    // 설정을 원하지 않는 경우 주석처리해주세요.
    //====================================================================================================
    //ibExcel.setHeaderBackColor("#4466aa");

    //====================================================================================================
    // [ 사용자 환경 설정 #9 ]
    //====================================================================================================
    // 엑셀 전문의 MarkupTag Delimiter 사용자 정의 시 설정하세요.
    // 설정 값은 IBSheet7 환경설정(ibsheet.cfg)의 MarkupTagDelimiter 설정 값과 동일해야 합니다. 
    //====================================================================================================
    //IBPacketParser.setMarkupTagDelimiter("[s1]","[s2]","[s3]","[s4]");

	try {
		response.reset();
		
        // 서버에서 병행처리를 허용할 최대 동시 작업 갯수를 설정한다.
		Synchronizer.init(5);
		
		// 싱크 처리 객체로 부터 처리권한을 확인한다.
        // 인자를 true로 설정하는 경우 : 싱크 처리 객체에서 자원을 사용가능해질때까지 최대 30초 동안 기다렸다가 자원 사용이 가능해졌을때 권한을 할당 후 true를 반환한다.
		// 인자를 false로 설정하는 경우 : 자원 사용여부를 확인후 즉시 반환. 사용 가능하면 할당 후 true를 반환하고, 사용이 불가능한 경우 false를 반환한다.
		boolean bToken = Synchronizer.use(false);
		
		// 싱크 객체로 부터 권한을 정상 할당 받은 경우에만 엑셀 작업을 진행한다.
		if (bToken) {

			// 파라메터 정보를 얻음
			String data = ibExcel.getData();
	
			// 파라메터 정보를 다시 설정함 (예, 암호화된 파라메터를 복호화 처리를 하여 다시 설정)
			ibExcel.setData(data);
	
			// 엑셀 워크북을 생성
			Workbook workbook = ibExcel.makeDirectExcel();
	
		    out.clear();
		    out = pageContext.pushBody();

			// 다운로드 1. 생성된 엑셀 문서를 바로 다운로드 받음
			ServletOutputStream out2 = response.getOutputStream();
	
	        //POI 3.10 엑셀 암호 기능 구현 버전 사용 시, 아래 "workbook.write(out2);"을 하단 주석처리된 코드로 대체한다.
			workbook.write(out2);
	        //com.ibleaders.ibsheet7.ibsheet.excel.ProtectXLSX.encryptXLSX("d:\\tmp", ibExcel.getWorkbookPassword(), workbook, out2);
	
	        out2.flush();
	        out2.close();
	        
	        /*
	        // 다운로드 2. 생성된 엑셀 문서를 서버에 저장

	        // 다운로드 받을 파일 이름을 얻음
	        String fileName = ibExcel.getDownloadFileName();
	        FileOutputStream out2 = new FileOutputStream (webRootPath + "/" + fileName);
	        workbook.write(out2);
	        out2.close();

	        // 생성된 엑셀 문서를 다운로드 받음 (예, 엑셀문서를 DRM 처리함)
	        File file = new File( webRootPath + "/" + fileName ); 
	        int fileLength = (int)file.length();

	        response.setContentLength(fileLength);

	        if ( file.isFile() ) {
	            FileInputStream fileIn = new FileInputStream(file);
	            ServletOutputStream out3 = response.getOutputStream();
	             
	            byte[] outputByte = new byte[fileLength];

	            while(fileIn.read(outputByte, 0, fileLength) != -1)
	            {
	                out3.write(outputByte, 0, fileLength);
	            }
	            fileIn.close();
	            out3.flush();
	            out3.close();
	        } 
	        */
	        
	        // 엑셀 다운 완료 후 싱크 객체로 할당받은 권한을 반환한다.
	        Synchronizer.release();
		}
		else {
// 		    response.setHeader("Content-Type", "text/html;charset=utf-8");
            out.println("<script>alert('엑셀 다운로드중 에러가 발생하였습니다.[Server Busy]'); </script>");
        }

	} catch (Exception e) {
		out.println("<script>alert('엑셀 다운로드중 에러가 발생하였습니다.'); history.back();</script>");
		
		e.printStackTrace();
	} catch (Error e) {
		out.println("<script>alert('엑셀 다운로드중 에러가 발생하였습니다.'); history.back();</script>");

		e.printStackTrace();
	} finally {
        ibExcel.setDownFinish();
    }

	out.clear();
    out = pageContext.pushBody();
%>