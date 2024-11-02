
// 아코디언 메뉴를 토글하는 함수
function toggleAccordion() {
    const button = document.querySelector('.font_control.accordion-button');
    const panel = document.getElementById('font_panel');

    // 아코디언 패널의 최대 높이를 설정하여 부드럽게 열리고 닫히도록 함
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null; // 패널 닫기
        button.setAttribute('aria-expanded', 'false'); // aria-expanded 속성 업데이트
        panel.setAttribute('aria-hidden', 'true'); // aria-hidden 속성 업데이트
    } else {
        panel.style.maxHeight = panel.scrollHeight + 'px'; // 패널 열기
        button.setAttribute('aria-expanded', 'true'); // aria-expanded 속성 업데이트
        panel.setAttribute('aria-hidden', 'false'); // 패널을 보임 상태로 설정
    }
}

// 아코디언 버튼 클릭 시 아코디언 메뉴 토글
document.querySelector('.font_control.accordion-button').addEventListener('click', toggleAccordion);

// 키보드 접근성을 위한 함수
function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // 기본 동작을 막음
        toggleAccordion(event); // 아코디언 메뉴를 토글
    }
}

// 이벤트 리스너 추가
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', toggleAccordion);
    button.addEventListener('keypress', handleKeyPress);
});

// 링크 요소 가져오기
let myLink = document.getElementById("go_top");

// 사용자가 페이지를 스크롤할 때 실행되는 함수
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    // 페이지가 10% 이상 스크롤되었는지 확인
    if (document.body.scrollTop > document.documentElement.scrollHeight * 0.1 || 
        document.documentElement.scrollTop > document.documentElement.scrollHeight * 0.1) {
        myLink.style.display = "block";
        myLink.style.opacity = "1"; // 투명도 변경
    } else {
        myLink.style.opacity = "0"; // 투명도 변경
        setTimeout(function() {
            myLink.style.display = "none";
        }, 500); // 전환 효과 시간과 일치시킴
    }
}