document.addEventListener("DOMContentLoaded", function () {
    const decreaseFontButton = document.getElementById("decrease_font_button");
    const increaseFontButton = document.getElementById("increase_font_button");
    const resetFontButton = document.getElementById("reset_font_button");
    const setFont1remButton = document.getElementById("set_font_1rem_button");
    const fontSizeDisplay = document.getElementById("font_size_display");
    const fontSizeMinAlert = document.getElementById("font_size_min_alert");
    const minFontSize = 0.5;
    let defaultFontSize;

    function setFontSize(size) {
        document.querySelectorAll("main *").forEach((el) => {
            el.style.fontSize = size + "rem";
        });
        fontSizeDisplay.value = size + "rem";

        // 폰트 사이즈가 최소값 이하일 경우 decrease 버튼 disabled
        if (size <= minFontSize) {
            decreaseFontButton.disabled = true;
        } else {
            decreaseFontButton.disabled = false;
        }
    }

    function getFontSize() {
        return parseFloat(window.getComputedStyle(document.querySelector("main *")).fontSize) / 16;
    }

    function determineDefaultFontSize() {
        const width = window.innerWidth;
        if (width >= 1400) {
            return 1.4;
        } else if (width >= 700) {
            return 1.3;
        } else {
            return 1.0;
        }
    }

    defaultFontSize = determineDefaultFontSize();

    decreaseFontButton.addEventListener("click", function () {
        let currentSize = getFontSize();
        if (currentSize > minFontSize) {
            setFontSize(currentSize - 0.1);
            fontSizeMinAlert.classList.remove("min_fonted");
        }
        if (currentSize - 0.1 <= minFontSize) {
            fontSizeMinAlert.classList.add("min_fonted");
        }
    });

    increaseFontButton.addEventListener("click", function () {
        let currentSize = getFontSize();
        setFontSize(currentSize + 0.1);
        fontSizeMinAlert.classList.remove("min_fonted");
    });

    resetFontButton.addEventListener("click", function () {
        setFontSize(defaultFontSize);
        fontSizeMinAlert.classList.remove("min_fonted");
    });

    setFont1remButton.addEventListener("click", function () {
        setFontSize(1);
        fontSizeMinAlert.classList.remove("min_fonted");
    });

    // 초기 설정
    setFontSize(defaultFontSize);
    fontSizeMinAlert.classList.remove("min_fonted");


    // 폰트 스타일 변경 로직 (기존 코드)
    const fontForm = document.getElementById('font-form');
    const contentText = document.querySelector('.content_text');

    fontForm.addEventListener('change', (event) => {
        const selectedFont = event.target.value;
        contentText.classList.remove('biz-udpgothic', 'biz-udpmincho');
        contentText.classList.add(selectedFont.toLowerCase().replace(/-/g, '-'));
    });
});