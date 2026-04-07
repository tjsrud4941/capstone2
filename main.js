// 스크롤 시 네비게이션 활성화
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 80) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${current}` ? '#a78bfa' : '';
    });
});

// 스크롤 진입 시 카드 페이드인 애니메이션
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .info-card, .skill-group').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// 제휴 문의 폼 AJAX 전송
const inquiryForm = document.getElementById('inquiry-form');
const successMsg = document.getElementById('success-msg');

if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await fetch(inquiryForm.action, {
            method: 'POST',
            body: new FormData(inquiryForm),
            headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
            inquiryForm.reset();
            inquiryForm.style.display = 'none';
            successMsg.style.display = 'block';
        } else {
            alert('전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    });
}
