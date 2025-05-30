document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

/**
 * 브라우저 표준 기능(Web Animations API)을 사용하여 아코디언 애니메이션을 제어합니다
 */
const setUpAccordion = () => {
  const details = document.querySelectorAll(".js_details");
    const RUNNING_VALUE = "running"; 
    // 애니메이션 실행 중일 때 부여할 예정인 커스텀 데이터 속성의 값
    const IS_OPENED_CLASS = "is-opened"; 
    // 아이콘 조작용 클래스 이름

    details.forEach((element) => {
      const summary = element.querySelector(".js_summary");
      const content = element.querySelector(".js_content");

      summary.addEventListener("click", (event) => {
            // 디폴트 거동 무효화
        event.preventDefault();

            // 연타 방지용. 애니메이션 중이라면 클릭 이벤트를 받지 않고 리턴한다
        if (element.dataset.animStatus === RUNNING_VALUE) {
          return;
        }

            // details의 open 속성 판정
        if (element.open) {
                // 아코디언을 닫을 때의 처리
                // 아이콘 조작용 클래스를 전환(클래스 제거)
          element.classList.toggle(IS_OPENED_CLASS);

                // 애니메이션 실행
          const closingAnim = content.animate(closingAnimKeyframes(content), animTiming);
                // 애니메이션 실행 중용 값 부여
          element.dataset.animStatus = RUNNING_VALUE;

                // 애니메이션 완료 후에
          closingAnim.onfinish = () => {
                    // open 속성을 제거하다
            element.removeAttribute("open");
                    // 애니메이션 실행 중용 값을 제거하다
            element.dataset.animStatus = "";
          };
        } else {
                // 아코디언을 열 때의 처리
                // open 속성 부여
          element.setAttribute("open", "true");

                // 아이콘 조작용 클래스를 전환(클래스를 부여)
          element.classList.toggle(IS_OPENED_CLASS);

                // 애니메이션 실행
          const openingAnim = content.animate(openingAnimKeyframes(content), animTiming);
                // 애니메이션 실행 중용 값을 넣다
          element.dataset.animStatus = RUNNING_VALUE;

                // 애니메이션 완료 후 애니메이션 실행 중용 값 제거
          openingAnim.onfinish = () => {
            element.dataset.animStatus = "";
          };
        }
      });
    });
  }

/**
 * 애니메이션 시간과 글쓰기
 */
  const animTiming = {
    duration: 400,
    easing: "ease-out"
  };

/**
 * 아코디언을 닫을 때의 키 프레임을 작성합니다.
 * @param content {HTMLElement}
 */
  const closingAnimKeyframes = (content) => [{
    height: content.offsetHeight + 'px', // height: "auto"라고 하면 잘 계산되지 않기 때문에 요소의 높이를 지정한다
    opacity: 1,
  }, {
    height: 0,
    opacity: 0,
  }];

/**
 * 아코디언을 열 때의 키 프레임을 작성합니다.
 * @param content {HTMLElement}
 */
  const openingAnimKeyframes = (content) => [{
    height: 0,
    opacity: 0,
  }, {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }];