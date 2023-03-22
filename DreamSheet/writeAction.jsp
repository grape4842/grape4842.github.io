<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="board.BoardDAO" %> <!-- board의 클래스 가져옴 -->
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.io.File" %>
<%@ page import="java.util.Enumeration" %>
<%@ page import="com.oreilly.servlet.multipart.DefaultFileRenamePolicy"%>
<%@ page import="com.oreilly.servlet.MultipartRequest"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html"; charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		String userID = null;
		if (session.getAttribute("userID") != null) {
			userID = (String) session.getAttribute("userID");
		}
		if (userID == null) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('1')");
			script.println("location.href = 'login2.jsp'");
			script.println("history.back()");
			script.println("</script>");
		} else {
			//데이터를 저장할 경로 정보 확인
			//real path를 알아내기 위해 선언
			ServletContext context = request.getServletContext();
			String realPath = context.getRealPath("src/main/webapp/Dflat/img");
			System.out.println(realPath);
			realPath = "C:\\Users\\김범철\\eclipse-workspace\\test\\src\\main\\webapp\\Dflat\\img";

			//파일을 업로드 할 때, 필요한 정보
			String filename = "";			//	파일 이름
			int maxSize = 1024 * 1024 * 5;	//	5MegaByte크기를 최대 사이즈로 설정
			String fullfilename = "";		//	전체 경로 포함 파일 이름
			MultipartRequest multi = new MultipartRequest(request,realPath,
					maxSize,"UTF-8",
					new DefaultFileRenamePolicy()	//	제약 사항(파일의 이름이 중복 시, 이름을 재정의 하거나) 등을 처리할 때, 필요
				);

			//파일명 가져오기
			Enumeration<?> files=multi.getFileNames();
			String imsifile=(String)files.nextElement();
			filename=multi.getFilesystemName(imsifile);
			
			BoardDAO boardDAO = new BoardDAO();
			int result = boardDAO.write(multi.getParameter("boardTitle"), userID, multi.getParameter("boardContent"), filename);
			if (result == -1) {
				PrintWriter script = response.getWriter();
				script.println("<script>");
				script.println("alert('글쓰기에 실패 했습니다.')");
				script.println("history.back()");
				script.println("</script>");
			} else {
				PrintWriter script = response.getWriter();
				
				script.println("<script>");
				script.println("location.href = 'Main.jsp'");
				script.println("</script>");
			}
		}		
	%>
</body>
</html>