// 현재 폰트 크기 표시를 업데이트하는 함수
function updateFontSizeDisplay() {
    const content = document.getElementById('main_content');
    const computedStyle = window.getComputedStyle(content);
    const currentSize = parseFloat(computedStyle.fontSize) / parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    document.getElementById('font_size_display').value = currentSize.toFixed(1) + 'rem';

    // 폰트 크기가 최소값인지 확인하고 버튼 상태 업데이트
    updateButtonState(currentSize);
}

// 폰트 크기를 변경하는 함수
function changeFontSize(action, event) {
    event.stopPropagation();
    const content = document.getElementById('main_content');
    let currentSize = parseFloat(window.getComputedStyle(content).fontSize) / parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    let currentLineHeight = parseFloat(window.getComputedStyle(content).lineHeight) / parseFloat(window.getComputedStyle(document.documentElement).fontSize);

    if (action === 'increase') {
        currentSize += 0.1; // 0.1rem 증가
        if (Math.floor(currentSize * 10) % 3 === 0) { // 0.3rem 단위로 증가할 때
            currentLineHeight += 0.1; // 0.1rem 증가
        }
    } else if (action === 'decrease') {
        currentSize -= 0.1; // 0.1rem 감소
        if (Math.floor(currentSize * 10) % 3 === 0) { // 0.3rem 단위로 감소할 때
            currentLineHeight -= 0.1; // 0.1rem 감소
        }
    }

    // 폰트 크기가 0.5rem보다 작아지지 않도록 설정
    if (currentSize < 0.5) {
        currentSize = 0.5;
    }

    // line-height가 특정 폰트에 맞게 선언되어 있지 않은 경우에만 조정
    if (!content.style.lineHeight || parseFloat(content.style.lineHeight) < currentSize * 1.8) {
        // line-height가 font-size * 1.8보다 작을 경우, line-height를 증가
        if (currentLineHeight < currentSize * 1.8) {
            currentLineHeight = currentSize * 1.8;
        }

        // line-height가 font-size * 2.5보다 클 경우, line-height를 감소
        if (currentLineHeight > currentSize * 2.5) {
            currentLineHeight = currentSize * 1.8;
        }

        content.style.lineHeight = currentLineHeight + 'rem';
    }

    content.style.fontSize = currentSize + 'rem';
    updateFontSizeDisplay();
}

// 폰트 크기를 1rem으로 설정하는 함수
function setFontSizeTo1rem(event) {
    event.stopPropagation();
    const content = document.getElementById('main_content');
    content.style.fontSize = '1rem';
    content.style.lineHeight = '1.8rem'; // 폰트 크기의 1.8배로 설정
    updateFontSizeDisplay();
}

// 폰트 크기를 초기화하는 함수
function resetFontSize(event) {
    event.stopPropagation();
    const content = document.getElementById('main_content');
    content.style.fontSize = ''; // 초기값으로 설정
    content.style.lineHeight = ''; // 초기값으로 설정
    updateFontSizeDisplay();
}

// 버튼 상태를 업데이트하는 함수
function updateButtonState(currentSize) {
    const decreaseButton = document.getElementById('decrease_font_button');
    const minFontSizeLabel = document.getElementById('min_font_size_label');
    if (currentSize <= 0.5) {
        decreaseButton.disabled = true; // 버튼 비활성화
        decreaseButton.setAttribute('aria-disabled', 'true'); // 스크린 리더용 속성 추가
        minFontSizeLabel.style.display = 'inline'; // 최소값 레이블 표시
    } else {
        decreaseButton.disabled = false; // 버튼 활성화
        decreaseButton.setAttribute('aria-disabled', 'false'); // 스크린 리더용 속성 제거
        minFontSizeLabel.style.display = 'none'; // 최소값 레이블 숨김
    }
}



// 폰트 스타일을 변경하는 함수
function changeFont(font, event) {
    event.stopPropagation();
    const content = document.getElementById('main_content');
    content.style.fontFamily = font;

    const radios = document.querySelectorAll('.font_family input[type="radio"]');
    radios.forEach(radio => {
        radio.checked = radio.value === font;
    });
}

window.addEventListener('resize', updateFontSizeDisplay);
document.addEventListener('DOMContentLoaded', updateFontSizeDisplay);



// 아코디언 메뉴를 토글하는 함수
function toggleAccordion(event) {
    const button = event.currentTarget; // 클릭된 버튼 요소
    const panel = button.nextElementSibling; // 버튼 다음에 위치한 패널 요소
    const isExpanded = button.getAttribute('aria-expanded') === 'true'; // 버튼의 aria-expanded 속성 값 확인

    if (isExpanded) {
        // 패널이 열려 있을 때
        panel.style.maxHeight = panel.scrollHeight + "px"; // 패널의 최대 높이를 설정
        requestAnimationFrame(() => {
            panel.style.maxHeight = "0"; // 패널을 닫을 때 최대 높이를 0으로 설정
            button.setAttribute('aria-expanded', 'false'); // aria-expanded 속성을 false로 설정
            panel.setAttribute('aria-hidden', 'true'); // 패널을 숨김 상태로 설정
        });
        // max-height 전환이 끝난 후 visibility를 변경
        panel.addEventListener('transitionend', function handleTransitionEnd() {
            panel.style.visibility = 'hidden'; // 패널을 숨김
            panel.removeEventListener('transitionend', handleTransitionEnd);
        });
    } else {
        // 패널이 닫혀 있을 때
        panel.style.visibility = 'visible'; // 패널을 보임
        panel.style.maxHeight = panel.scrollHeight + "px"; // 패널을 열 때 최대 높이를 설정
        requestAnimationFrame(() => {
            panel.style.maxHeight = panel.scrollHeight + "px"; // 패널의 최대 높이를 유지
            button.setAttribute('aria-expanded', 'true'); // aria-expanded 속성을 true로 설정
            panel.setAttribute('aria-hidden', 'false'); // 패널을 보임 상태로 설정
        });
    }
}

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





let isPlaying = false;
let speech = new SpeechSynthesisUtterance();
speech.lang = 'ja-JP';

function toggleSpeech() {
    const contentReaderButton = document.querySelector('#content_reader');
    const mainContent = document.querySelector('#main_content').textContent;

    if (!isPlaying) {
        // 재생 시작
        speech.text = mainContent;
        window.speechSynthesis.speak(speech);
        contentReaderButton.classList.add('voice');
        isPlaying = true;
    } else {
        // 일시 정지
        window.speechSynthesis.pause();
        contentReaderButton.classList.remove('voice');
        isPlaying = false;
    }
}

speech.onend = function() {
    // 재생 종료 시
    const contentReaderButton = document.querySelector('#content_reader');
    contentReaderButton.classList.remove('voice');
    isPlaying = false;
};

document.querySelector('#content_reader').addEventListener('click', toggleSpeech);