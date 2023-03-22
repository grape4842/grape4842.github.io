<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
	<meta charset="utf-8">
	<meta property="og:site_name" content="Dream Sheet">
	<meta name="author" content="2022">
	<meta name="keywords" content="김범철,피아노,악보,Piano,Sheet,Music">
	<meta property="og:type" content="website">
	<meta property="og:image" content="img/DreamSheet.png">
	<meta property="og:title" content="Dream Sheet 악보 사이트">
	<meta property="og:description" content="안녕하세요 다양한 피아노 악보를 만나보세요">
	<meta name="theme-color" content="#33333f">
	<meta name="msapplication-TileImage" content="img/DreamSheet.png">
	<title>
	메인 - Dream Sheet
	</title>
	<link rel="shortcut icon" href="img/PianoF.png">
	<link rel="icon" href="img/PianoF.png">
	<link rel="stylesheet" type="text/css" href="css/DreamSheet.css">
	<link rel="stylesheet" type="text/css" href="css/DreamSheetMainContents.css">
	<link rel="stylesheet" type="text/css" href="css/boardView.css">
	<link rel="apple-touch-icon" href="img/DreamSheet.png">
	
</head>
<body>

	<jsp:include page="header.jsp" /> 

	<div class="list-container">
	  <div class="list-wrapper">
			<div class="loginForm">
				<form action="register2.jsp" method="post">
					<div>
						<h1>Register</h1><br>
						<label for="uid">
							<span>아이디</span>
							<input id="uid" type="text" name="userName" placeholder="ID">
						</label>
						<label for="uid">
							<span>이메일</span>
							<input id="uid" type="text" name="userEmail" placeholder="Email">
						</label>
						<label for="upw">
							<span>비밀번호</span>
							<input id="upw" type="password" placeholder="password" name="password">
							<input type="checkbox" name="" id="showText" title="비밀번호 보이기">
						</label>
					    <input type="submit" name="submitButton" value="회원가입" class="loginGo">
					</div>
				</form>
			</div>
	  </div>
	</div>

	<jsp:include page="footer.jsp" />

</body>
</html>