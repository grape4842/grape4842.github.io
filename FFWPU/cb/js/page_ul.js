const totalPages = 30; // 총 페이지 수를 설정합니다.
let maxVisiblePages; // 현재 뷰포트 크기에 따라 보여질 최대 페이지 수를 저장하는 변수입니다.
let currentPage = 1; // 현재 페이지를 저장하는 변수입니다. 처음에는 1로 설정됩니다.

// 각 버튼과 페이지 번호 컨테이너를 변수에 저장합니다.
const firstButton = document.getElementById('first_page');
const prevButton = document.getElementById('prev_page');
const nextButton = document.getElementById('next_page');
const lastButton = document.getElementById('last_page');
const pageNumbersContainer = document.getElementById('page_ul');

// 각 버튼에 클릭 이벤트 리스너를 추가합니다.
firstButton.addEventListener('click', () => setPage(1)); // 첫 페이지로 이동
prevButton.addEventListener('click', () => setPage(currentPage - 1)); // 이전 페이지로 이동
nextButton.addEventListener('click', () => setPage(currentPage + 1)); // 다음 페이지로 이동
lastButton.addEventListener('click', () => setPage(totalPages)); // 마지막 페이지로 이동

// 페이지를 설정하는 함수입니다. 페이지 범위를 벗어나면 아무 작업도 하지 않습니다.
function setPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPagination(); // 페이지네이션 UI를 다시 렌더링합니다.
}

// 뷰포트 크기에 따라 최대 보여질 페이지 수를 업데이트하는 함수입니다.
function updateMaxVisiblePages() {
    const viewportWidth = window.innerWidth; // 현재 뷰포트의 너비를 가져옵니다.

    if (viewportWidth < 330) {
        maxVisiblePages = 5; // 뷰포트 너비가 330px 미만일 때 최대 5개의 페이지를 표시합니다.
    } else if (viewportWidth < 390) {
        maxVisiblePages = 6; // 뷰포트 너비가 330px 이상 390px 미만일 때 최대 6개의 페이지를 표시합니다.
    } else if (viewportWidth < 700) {
        maxVisiblePages = 7; // 뷰포트 너비가 390px 이상 700px 미만일 때 최대 7개의 페이지를 표시합니다.
    } else {
        maxVisiblePages = 12; // 뷰포트 너비가 700px 이상일 때 최대 12개의 페이지를 표시합니다.
    }
}

// 페이지네이션 UI를 렌더링하는 함수입니다.
function renderPagination() {
    updateMaxVisiblePages(); // 현재 뷰포트 크기에 따라 최대 보여질 페이지 수를 업데이트합니다.
    pageNumbersContainer.innerHTML = ''; // 페이지 번호 컨테이너를 비웁니다.

    // 페이지 번호를 계산합니다.
    const half = Math.floor((maxVisiblePages - 4) / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    // 시작 페이지 번호가 1보다 작으면 조정합니다.
    if (start < 1) {
        start = 1;
        end = start + maxVisiblePages - 5;
    }

    // 끝 페이지 번호가 총 페이지 수보다 크면 조정합니다.
    if (end > totalPages) {
        end = totalPages;
        start = end - maxVisiblePages + 5;
        if (start < 1) start = 1;
    }

    // 페이지 번호를 생성하고 컨테이너에 추가합니다.
    for (let i = start; i <= end; i++) {
        const pageItem = document.createElement('li');
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.className = (i === currentPage) ? 'current' : '';
        pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            setPage(i); // 페이지 번호를 클릭하면 해당 페이지로 이동합니다.
        });
        pageItem.appendChild(pageLink);
        pageNumbersContainer.appendChild(pageItem);
    }

    // 각 버튼의 상태를 업데이트합니다.
    firstButton.disabled = currentPage === 1;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    lastButton.disabled = currentPage === totalPages;
}

// 뷰포트 크기가 변경될 때마다 페이지네이션 UI를 다시 렌더링합니다.
window.addEventListener('resize', renderPagination);

// DOM이 완전히 로드되면 페이지네이션 UI를 렌더링합니다.
document.addEventListener('DOMContentLoaded', renderPagination);