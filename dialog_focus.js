document.addEventListener('DOMContentLoaded', () => {

	const dialogs = document.querySelectorAll('dialog');
	const openButtons = document.querySelectorAll('[data-modal-open]');
	
	let lastActiveElement; // 다이얼로그를 열기 전 초점을 저장할 변수

	// 다이얼로그를 제외한 모든 body의 직계 자식 요소를 비활성화/활성화하는 함수
	const toggleInertForBackground = (dialogToExclude, activate) => {
		const bodyChildren = document.body.children;
		for (const child of bodyChildren) {
			// dialog 요소가 아닌 경우에만 inert 속성을 적용
			if (child !== dialogToExclude) {
				child.inert = activate;
			}
		}
	};

	// 다이얼로그 열기 함수
	const openDialog = (dialog) => {
		lastActiveElement = document.activeElement; // 초점 위치 저장
		
		toggleInertForBackground(dialog, true); // dialog를 제외한 모든 요소 비활성화
		
		dialog.showModal(); // dialog 열기
		
		// 다이얼로그가 열린 후 첫 번째 초점 가능 요소로 초점 이동
		const firstFocusableEl = dialog.querySelector('button, [href], input, select, textarea');
		if (firstFocusableEl) {
			firstFocusableEl.focus();
		}
	};

	// 다이얼로그 닫기 함수
	const closeDialog = (dialog) => {
		dialog.close(); // dialog 닫기
		
		toggleInertForBackground(dialog, false); // 배경 요소 재활성화
		
		if (lastActiveElement) {
			lastActiveElement.focus();
		}
	};

	// 모든 열기 버튼에 이벤트 리스너 추가
	openButtons.forEach(button => {
		button.addEventListener('click', () => {
			// 클릭한 버튼의 다음 형제 요소인 dialog를 찾음
			const dialog = button.nextElementSibling;
			if (dialog && dialog.tagName.toLowerCase() === 'dialog') {
				openDialog(dialog);
			}
		});
	});

	// 모든 dialog 요소에 닫기 이벤트 리스너 추가 (form method="dialog" 버튼용)
	dialogs.forEach(dialog => {
		dialog.addEventListener('close', () => {
			closeDialog(dialog);
		});
	});
});