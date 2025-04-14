let autoSkipInterval = null;

// 인터벌 시작
function startAutoSkip() {
    if (autoSkipInterval !== null) return;

    autoSkipInterval = setInterval(() => {
        const iframe = document.getElementById('chkframe');
        if (!iframe) return;

        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (!iframeDoc) return;

            const yesImg = iframeDoc.querySelector('img[src="images/yes1.gif"]');
            if (yesImg) {
                iframe.contentWindow.lecture_ok();  // 잠수 방지 스킵
            }
        } catch (e) {
        }
    }, 1000);  // 1초마다 감지
}

// 인터벌 중단
function stopAutoSkip() {
    if (autoSkipInterval !== null) {
        clearInterval(autoSkipInterval);
        autoSkipInterval = null;
    }
}