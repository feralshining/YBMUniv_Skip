let autoSkipInterval = null;
let iframe = null;
let iframeDoc = null;

// 인터벌 시작
function startAutoSkip() {
    if (autoSkipInterval !== null) {
        console.log('%c⏳ 이미 자동 스킵이 실행 중입니다.', 'color: blue;');
        return;
    }

    autoSkipInterval = setInterval(() => {
        // iframe 객체를 다시 매번 최신 상태로 확인
        iframe = document.getElementById('chkframe');
        if (!iframe) return; // iframe이 없으면 종료

        try {
            iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (!iframeDoc) return; // iframe 문서가 없으면 종료

            const yesImg = iframeDoc.querySelector('img[src="images/yes1.gif"]');
            if (yesImg) {
                // yesImg가 있을 경우만 실행
                console.log('%c😴 [잠수 방지] - 감지 완료!', 'color: green; font-weight: bold;');
                iframe.contentWindow.lecture_ok();  // 잠수 방지 스킵
                console.log('%c🎬 재생 재개 완료! - Made By feralshining', 'color: orange; font-weight: bold;');

                // 감지 후 인터벌 중단 및 객체 초기화
                stopAutoSkip();
                resetIframeObjects();

                // 1초 뒤에 다시 감지 시작
                setTimeout(() => {
                    console.log('%c🔄 자동 스킵 재시작 중...', 'color: teal; font-weight: bold;');
                    startAutoSkip();
                }, 1000);
            } else {
                // yesImg가 없으면 감지하지 않음 (로그도 출력 안함)
                console.log('%c⚠️ [잠수 방지] - 감지 안됨', 'color: gray; font-weight: bold;');
            }
        } catch (e) {
            console.warn('%c⚠️ iframe 접근 불가:', 'color: red; font-weight: bold;', e);
        }
    }, 1000);

    console.log('%c✅ 자동 스킵 감지 시작됨!', 'color: purple; font-weight: bold;');
}

// 인터벌 중단
function stopAutoSkip() {
    if (autoSkipInterval !== null) {
        clearInterval(autoSkipInterval);
        autoSkipInterval = null;
        console.log('%c🛑 자동 스킵 감지 중단됨.', 'color: crimson; font-weight: bold;');
    } 
    else {
        console.log('%c⚠️ 실행 중인 자동 스킵이 없습니다.', 'color: gray;');
    }
}

// iframe 관련 객체 초기화
function resetIframeObjects() {
    iframe = null;
    iframeDoc = null;
    console.log('%c🔄 iframe 객체 초기화 완료!', 'color: blue; font-weight: bold;');
}
