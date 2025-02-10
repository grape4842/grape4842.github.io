document.addEventListener("DOMContentLoaded", function () {
    const decreaseFontButton = document.getElementById("decrease_font_button");
    const increaseFontButton = document.getElementById("increase_font_button");
    const resetFontButton = document.getElementById("reset_font_button");
    const fontSizeDisplay = document.getElementById("font_size_display");
    const fontSizeMinAlert = document.getElementById("font_size_min_alert");
    const minFontSize = 0.5; // 최소 폰트 크기
    let defaultFontSize;

    function setFontSize(size) {
        document.querySelectorAll("main *").forEach((el) => {
            el.style.fontSize = size + "rem";
        });
        fontSizeDisplay.value = size + "rem";
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
            return 1.0; // 기본 폰트 크기
        }
    }

    defaultFontSize = determineDefaultFontSize();

    decreaseFontButton.addEventListener("click", function () {
        let currentSize = getFontSize();
        if (currentSize > minFontSize) {
            setFontSize(currentSize - 0.1);
            fontSizeMinAlert.classList.remove("min_fonted");
            decreaseFontButton.removeAttribute("aria-disabled");
        }
        if (currentSize - 0.1 <= minFontSize) {
            decreaseFontButton.setAttribute("aria-disabled", "true");
            fontSizeMinAlert.classList.add("min_fonted");
        }
    });

    increaseFontButton.addEventListener("click", function () {
        let currentSize = getFontSize();
        setFontSize(currentSize + 0.1);
        decreaseFontButton.removeAttribute("aria-disabled");
        fontSizeMinAlert.classList.remove("min_fonted");
    });

    resetFontButton.addEventListener("click", function () {
        setFontSize(defaultFontSize);
        decreaseFontButton.removeAttribute("aria-disabled");
        fontSizeMinAlert.classList.remove("min_fonted");
    });

    // 초기 설정
    setFontSize(defaultFontSize);
    fontSizeMinAlert.classList.remove("min_fonted");
});
