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
    event.stopPropagation(); // 이벤트 전파 중지
    const content = document.getElementById('main_content');
    content.style.fontFamily = font; // 폰트 스타일 변경

    const radios = document.querySelectorAll('.font_family input[type="radio"]');
    radios.forEach(radio => {
        radio.checked = radio.value === font; // 선택된 폰트 라디오 버튼 체크
    });
}

// 폰트 크기 표시를 업데이트하는 함수
function updateFontSizeDisplay() {
    // 폰트 크기 표시 업데이트 로직
}

window.addEventListener('resize', updateFontSizeDisplay); // 창 크기 조정 시 폰트 크기 표시 업데이트
document.addEventListener('DOMContentLoaded', updateFontSizeDisplay); // DOM 로드 완료 시 폰트 크기 표시 업데이트
