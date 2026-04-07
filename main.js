const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/bujOdjMJG/';

const RESULTS = {
    dog: {
        emoji: '🐶',
        label: '강아지상이에요!',
        desc: '눈이 크고 표정이 풍부한 강아지상!\n친근하고 따뜻한 인상으로 사람들이\n자연스럽게 다가오는 매력이 있어요. 🐾\n\n밝은 에너지와 솔직한 감정 표현이 특징입니다.',
    },
    cat: {
        emoji: '🐱',
        label: '고양이상이에요!',
        desc: '시크하고 신비로운 고양이상!\n쿨해 보이지만 알고 보면 매력 넘치는\n독보적인 아우라를 가지고 있어요. 😸\n\n섬세하고 감수성이 풍부한 것이 특징입니다.',
    },
};

let model = null;

// 섹션 전환
const introSection  = document.getElementById('intro');
const testSection   = document.getElementById('test-section');
const resultSection = document.getElementById('result-section');

function show(section) {
    [introSection, testSection, resultSection].forEach(s => s.classList.add('hidden'));
    section.classList.remove('hidden');
    window.scrollTo({ top: 0 });
}

// 모델 로드 (백그라운드)
async function loadModel() {
    model = await tmImage.load(MODEL_URL + 'model.json', MODEL_URL + 'metadata.json');
}
loadModel();

// 시작 버튼
document.getElementById('start-btn').addEventListener('click', () => show(testSection));

// 파일 선택
const fileInput       = document.getElementById('file-input');
const uploadArea      = document.getElementById('upload-area');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const previewImg      = document.getElementById('preview-img');
const analyzeBtn      = document.getElementById('analyze-btn');

function setPreview(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    previewImg.src = url;
    previewImg.classList.remove('hidden');
    uploadPlaceholder.classList.add('hidden');
    analyzeBtn.classList.remove('hidden');
}

document.getElementById('upload-btn').addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', e => setPreview(e.target.files[0]));

// 드래그 앤 드롭
uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
uploadArea.addEventListener('drop', e => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    setPreview(e.dataTransfer.files[0]);
});

// 분석
const loading = document.getElementById('loading');

analyzeBtn.addEventListener('click', async () => {
    analyzeBtn.disabled = true;
    loading.classList.remove('hidden');

    if (!model) await loadModel();

    const predictions = await model.predict(previewImg);
    const dog = predictions.find(p => p.className === 'dog')?.probability ?? 0;
    const cat = predictions.find(p => p.className === 'cat')?.probability ?? 0;

    loading.classList.add('hidden');
    showResult(dog, cat);
});

function showResult(dog, cat) {
    const isDog = dog >= cat;
    const data  = isDog ? RESULTS.dog : RESULTS.cat;
    const dogPct = Math.round(dog * 100);
    const catPct = Math.round(cat * 100);

    document.getElementById('result-emoji').textContent = data.emoji;
    document.getElementById('result-label').textContent = data.label;
    document.getElementById('result-desc').textContent  = data.desc;
    document.getElementById('dog-pct').textContent = dogPct + '%';
    document.getElementById('cat-pct').textContent = catPct + '%';

    show(resultSection);

    // 게이지 애니메이션 (dog 비율 = 왼쪽 채움)
    requestAnimationFrame(() => {
        setTimeout(() => {
            document.getElementById('gauge-fill').style.width = dogPct + '%';
        }, 100);
    });
}

// 다시 테스트
document.getElementById('retry-btn').addEventListener('click', () => {
    fileInput.value = '';
    previewImg.src = '';
    previewImg.classList.add('hidden');
    uploadPlaceholder.classList.remove('hidden');
    analyzeBtn.classList.add('hidden');
    analyzeBtn.disabled = false;
    document.getElementById('gauge-fill').style.width = '0%';
    show(testSection);
});
