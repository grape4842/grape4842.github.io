let isPlaying = false;
let utterance = null;

function toggleSpeech() {
    const contentReaderButton = document.getElementById('content_reader');
    const mainContent = document.getElementById('main_content');

    if (!isPlaying) {
        // 재생 시작
        contentReaderButton.classList.add('loading');
        const loadingStartTime = Date.now();

        if (!utterance) {
            const visibleText = extractVisibleText(mainContent);
            utterance = new SpeechSynthesisUtterance(visibleText);
            
            const voices = speechSynthesis.getVoices();
            const japaneseVoice = voices.find(voice => voice.lang === 'ja-JP');
            if (japaneseVoice) {
                utterance.voice = japaneseVoice;
            } else {
                console.warn('일본어 음성을 찾을 수 없습니다. 기본 음성을 사용합니다.');
            }

            utterance.onstart = function() {
                const loadingElapsedTime = Date.now() - loadingStartTime;
                const remainingLoadingTime = Math.max(0, 1000 - loadingElapsedTime);

                setTimeout(() => {
                    contentReaderButton.classList.remove('loading');
                    contentReaderButton.classList.add('voice');
                    isPlaying = true;
                }, remainingLoadingTime);
            };

            utterance.onend = function() {
                contentReaderButton.classList.remove('voice');
                isPlaying = false;
                utterance = null;
            };

            utterance.onpause = function() {
                contentReaderButton.classList.remove('voice');
                isPlaying = false;
            };

            utterance.onresume = function() {
                contentReaderButton.classList.add('voice');
                isPlaying = true;
            };
        }

        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    } else {
        // 일시 정지
        speechSynthesis.pause();
        contentReaderButton.classList.remove('voice');
        isPlaying = false;
    }
}

function extractVisibleText(element) {
    let text = '';
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                if (node.parentNode.classList.contains('hidden')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    while (walker.nextNode()) {
        text += walker.currentNode.textContent.trim() + ' ';
    }
    return text.trim();
}

document.addEventListener('DOMContentLoaded', function() {
    const contentReaderButton = document.getElementById('content_reader');
    if (contentReaderButton) {
        contentReaderButton.addEventListener('click', toggleSpeech);
    }

    if ('onvoiceschanged' in speechSynthesis) {
        speechSynthesis.onvoiceschanged = function() {
            const voices = speechSynthesis.getVoices();
            console.log('사용 가능한 음성:', voices);
        };
    }
});