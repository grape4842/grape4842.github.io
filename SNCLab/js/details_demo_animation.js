document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

/**
 * 브라우저 표준 기능(Web Animations API)을 사용하여 아코디언 애니메이션을 제어합니다
 */
const setUpAccordion = () => {
  const details = document.querySelectorAll(".js_details");
  const RUNNING_VALUE = "running";
  const IS_OPENED_CLASS = "is-opened";

  details.forEach((element) => {
    const summary = element.querySelector(".js_summary");
    const content = element.querySelector(".js_content");

    summary.addEventListener("click", (event) => {
      event.preventDefault(); // 디폴트 거동 무효화

      // 연타 방지용: 애니메이션 중이라면 클릭 이벤트를 받지 않고 리턴한다
      if (element.dataset.animStatus === RUNNING_VALUE) {
        return;
      }

      // 그룹 아코디언 처리: 같은 name을 가진 다른 details를 닫는다.
      // 현재 details가 닫히는 상태가 아니고, name 속성이 존재한다면
      if (!element.open && element.hasAttribute('name')) {
        const groupName = element.getAttribute('name'); //
        document.querySelectorAll(`details[name="${groupName}"].js_details[open]`).forEach(otherDetails => {
          // 열려있는 다른 아코디언이 현재 클릭된 아코디언이 아닐 경우
          if (otherDetails !== element) {
            closeAccordion(otherDetails); // 다른 아코디언 닫기
          }
        });
      }


      // details의 open 속성 판정
      if (element.open) {
        // 아코디언을 닫을 때의 처리
        closeAccordion(element);
      } else {
        // 아코디언을 열 때의 처리
        openAccordion(element);
      }
    });
  });
}

/**
 * 아코디언 열기 로직
 * @param {HTMLElement} element - 대상 details 요소
 */
const openAccordion = (element) => {
  const content = element.querySelector(".js_content");
  const IS_OPENED_CLASS = "is-opened";
  const RUNNING_VALUE = "running";

  // open 속성 부여 (애니메이션 시작 전에 부여하여 콘텐츠가 렌더링되도록 함)
  element.setAttribute("open", "true");

  // 아이콘 조작용 클래스를 전환 (클래스를 부여)
  element.classList.add(IS_OPENED_CLASS); // 'toggle' 대신 'add'로 명확화

  // 애니메이션 실행
  const openingAnim = content.animate(openingAnimKeyframes(content), animTiming);
  element.dataset.animStatus = RUNNING_VALUE;

  // 애니메이션 완료 후 애니메이션 실행 중용 값 제거
  openingAnim.onfinish = () => {
    element.dataset.animStatus = "";
    // 열린 후에는 overflow를 visible로 두어 스크롤바 등이 자연스럽게 보이도록 함
    content.style.overflow = ''; // 기본값으로 되돌림 (hidden 제거)
  };

  // 애니메이션이 시작되기 전, 만약 content의 높이가 0이라면 잠시 overflow를 hidden으로 설정하여 깜빡임 방지
  // (필요 시 주석 해제하여 테스트)
  // if (content.offsetHeight === 0) {
  //   content.style.overflow = 'hidden';
  // }
}

/**
 * 아코디언 닫기 로직
 * @param {HTMLElement} element - 대상 details 요소
 */
const closeAccordion = (element) => {
  const content = element.querySelector(".js_content");
  const IS_OPENED_CLASS = "is-opened";
  const RUNNING_VALUE = "running";

  // 아이콘 조작용 클래스를 전환 (클래스 제거)
  element.classList.remove(IS_OPENED_CLASS); // 'toggle' 대신 'remove'로 명확화

  // 애니메이션 실행 전에 overflow를 hidden으로 설정하여 스크롤바 깜빡임 방지
  content.style.overflow = 'hidden';

  // 애니메이션 실행
  const closingAnim = content.animate(closingAnimKeyframes(content), animTiming);
  element.dataset.animStatus = RUNNING_VALUE;

  // 애니메이션 완료 후에
  closingAnim.onfinish = () => {
    // 핵심 변경: open 속성을 제거하여 details의 기본 동작을 막는다.
    // 애니메이션이 끝나고 완전히 숨겨진 후에 open 속성을 제거해야 순간적인 표시를 막을 수 있다.
    element.removeAttribute("open");
    element.dataset.animStatus = "";
    // 닫힌 후에는 overflow를 hidden으로 유지하여 내용이 보이지 않도록 함
    content.style.overflow = 'hidden';
  };
}

/**
 * 애니메이션 시간과 글쓰기
 */
const animTiming = {
  duration: 400,
  easing: "ease-in-out" // "ease-out" 대신 "ease-in-out"으로 변경하여 더 부드러운 느낌을 시도
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