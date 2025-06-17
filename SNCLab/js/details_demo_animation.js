document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

const setUpAccordion = () => {
  const details = document.querySelectorAll(".js_details");
  const RUNNING_VALUE = "running";
  const IS_OPENED_CLASS = "is-opened";

  details.forEach((element) => {
    const summary = element.querySelector(".js_summary");
    const content = element.querySelector(".js_content");

    summary.addEventListener("click", (event) => {
      event.preventDefault();

      if (element.dataset.animStatus === RUNNING_VALUE) {
        return;
      }

      if (element.open) {
        // 아코디언을 닫을 때의 처리
        // 아이콘 조작용 클래스 전환 (클래스 제거)
        element.classList.toggle(IS_OPENED_CLASS);

        // 핵심 변경: 애니메이션 시작 전에 open 속성을 제거하여 details의 기본 동작을 먼저 막는다.
        // 이렇게 하면 애니메이션이 height:0으로 진행되는 동안 콘텐츠가 다시 튀어나오지 않는다.
        element.removeAttribute("open");

        // 애니메이션 실행
        const closingAnim = content.animate(closingAnimKeyframes(content), animTiming);
        element.dataset.animStatus = RUNNING_VALUE;

        closingAnim.onfinish = () => {
          // 애니메이션 완료 후에는 dataset 상태만 초기화한다.
          // open 속성은 이미 제거되었으므로 다시 제거할 필요 없다.
          element.dataset.animStatus = "";
        };
      } else {
        // 아코디언을 열 때의 처리
        // open 속성 부여
        element.setAttribute("open", "true");

        // 아이콘 조작용 클래스를 전환 (클래스를 부여)
        element.classList.toggle(IS_OPENED_CLASS);

        // 애니메이션 실행
        const openingAnim = content.animate(openingAnimKeyframes(content), animTiming);
        element.dataset.animStatus = RUNNING_VALUE;

        openingAnim.onfinish = () => {
          element.dataset.animStatus = "";
        };
      }
    });
  });
}

const animTiming = {
  duration: 400,
  easing: "ease" // 또는 "ease-in-out"으로 변경하여 더 부드러운 느낌을 시도해 볼 수 있습니다.
};

const closingAnimKeyframes = (content) => [{
  height: content.offsetHeight + 'px',
  opacity: 1,
}, {
  height: 0,
  opacity: 0,
}];

const openingAnimKeyframes = (content) => [{
  height: 0,
  opacity: 0,
}, {
  height: content.offsetHeight + 'px',
  opacity: 1,
}];