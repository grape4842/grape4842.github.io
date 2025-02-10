document.addEventListener("scroll", function() {
  var link = document.getElementById("go_top");
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;
  var pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  if ((scrollPosition / pageHeight) > 0.1) {
    link.style.display = "block";
    link.style.opacity = 1; // 스크롤 10% 이상일 때 opacity를 1로 설정
  } else {
    link.style.opacity = 0; // 스크롤 10% 이하일 때 opacity를 0으로 설정
    setTimeout(function() {
      if (link.style.opacity == 0) {
        link.style.display = "none";
      }
    }, 500); // CSS transition 시간과 맞추어 display를 변경
  }
});
