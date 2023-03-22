<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="board.BoardDAO" %> <!-- board�� Ŭ���� ������ -->
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
			//�����͸� ������ ��� ���� Ȯ��
			//real path�� �˾Ƴ��� ���� ����
			ServletContext context = request.getServletContext();
			String realPath = context.getRealPath("src/main/webapp/Dflat/img");
			System.out.println(realPath);
			realPath = "C:\\Users\\���ö\\eclipse-workspace\\test\\src\\main\\webapp\\Dflat\\img";

			//������ ���ε� �� ��, �ʿ��� ����
			String filename = "";			//	���� �̸�
			int maxSize = 1024 * 1024 * 5;	//	5MegaByteũ�⸦ �ִ� ������� ����
			String fullfilename = "";		//	��ü ��� ���� ���� �̸�
			MultipartRequest multi = new MultipartRequest(request,realPath,
					maxSize,"UTF-8",
					new DefaultFileRenamePolicy()	//	���� ����(������ �̸��� �ߺ� ��, �̸��� ������ �ϰų�) ���� ó���� ��, �ʿ�
				);

			//���ϸ� ��������
			Enumeration<?> files=multi.getFileNames();
			String imsifile=(String)files.nextElement();
			filename=multi.getFilesystemName(imsifile);
			
			BoardDAO boardDAO = new BoardDAO();
			int result = boardDAO.write(multi.getParameter("boardTitle"), userID, multi.getParameter("boardContent"), filename);
			if (result == -1) {
				PrintWriter script = response.getWriter();
				script.println("<script>");
				script.println("alert('�۾��⿡ ���� �߽��ϴ�.')");
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