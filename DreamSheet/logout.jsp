<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    session.invalidate();
%>
<script>
	alert("로그아웃 하였습니다.");
	location.href = 'Main.jsp'
</script>