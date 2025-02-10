let fontSize = 1.2; // 초기 폰트 크기 설정
const initialFontSize = 1.2; // 초기 폰트 크기 값 저장
const minFontSize = 0.5; // 폰트 크기의 최소값 설정
const fontSizeDisplay = document.getElementById("font_size_display"); // 현재 폰트 크기를 표시할 입력 창
const decreaseButton = document.getElementById("decrease_font_button"); // 폰트 크기를 줄이는 버튼
const increaseButton = document.getElementById("increase_font_button"); // 폰트 크기를 키우는 버튼
const resetButton = document.getElementById("reset_font_button"); // 폰트 크기를 초기화하는 버튼
const minAlert = document.getElementById("font_size_min_alert"); // 폰트 크기가 최소값일 때 표시할 경고 메시지

function updateFontSize() {
    // 현재 폰트 크기를 입력 창에 표시
    fontSizeDisplay.value = fontSize + "rem";
    // 폰트 크기가 최소값 이하일 때 - 버튼 비활성화 및 경고 메시지 표시
    decreaseButton.setAttribute("aria-disabled", fontSize <= minFontSize ? "true" : "false");
    if (fontSize <= minFontSize) {
        minAlert.classList.add("min_fonted"); // 경고 메시지에 클래스 추가
    } else {
        minAlert.classList.remove("min_fonted"); // 경고 메시지에 클래스 제거
    }
}

decreaseButton.addEventListener("click", function() {
    if (fontSize > minFontSize) {
        fontSize -= 0.1;
        updateFontSize();
    }
});

increaseButton.addEventListener("click", function() {
    fontSize += 0.1;
    updateFontSize();
});

resetButton.addEventListener("click", function() {
    fontSize = initialFontSize;
    updateFontSize();
});

document.getElementById("set_font_1rem_button").addEventListener("click", function() {
    fontSize = 1.0;
    updateFontSize();
});

updateFontSize();
