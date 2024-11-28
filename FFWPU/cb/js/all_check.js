document.addEventListener('DOMContentLoaded', function() {
    const agreeAllCheckbox = document.getElementById('all_check');
    const agreeCheckboxes = document.querySelectorAll('.check_terms');

    // 모두 동의 체크박스를 클릭할 때의 이벤트 핸들러
    agreeAllCheckbox.addEventListener('change', function() {
        agreeCheckboxes.forEach(function(checkbox) {
            checkbox.checked = agreeAllCheckbox.checked;
        });
    });

    // 개별 체크박스를 클릭할 때의 이벤트 핸들러
    agreeCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            // 모든 개별 체크박스가 선택된 상태인지 확인
            const allChecked = Array.from(agreeCheckboxes).every(function(checkbox) {
                return checkbox.checked;
            });

            // 모두 동의 체크박스 상태를 갱신
            agreeAllCheckbox.checked = allChecked;
        });
    });
});
