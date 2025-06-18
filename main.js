// 내비게이션 클릭 시 부드러운 스크롤 이동
const navLinks = document.querySelectorAll('#navbar a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').replace('#', '');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 스크롤 시 현재 섹션 활성화 표시
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('main section');
  let scrollPos = window.scrollY || document.documentElement.scrollTop;
  let offset = 80;
  sections.forEach(section => {
    if (section.offsetTop - offset <= scrollPos && section.offsetTop + section.offsetHeight - offset > scrollPos) {
      document.querySelectorAll('#navbar a').forEach(a => a.classList.remove('active'));
      const activeLink = document.querySelector(`#navbar a[href="#${section.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
});

// 다국어 토글 기능
const langToggle = document.getElementById('lang-toggle');
let lang = localStorage.getItem('lang') || 'ko';
const content = {
  ko: {
    introTitle: '안녕하세요, 김태윤입니다!',
    introDesc: '주요 경력, 관심 분야, 한 줄 소개 등 간단한 자기소개가 들어갑니다.',
    skillsTitle: '기술 스택',
    contactTitle: '연락처 및 외부 링크',
    nav: ['자기소개', '기술 스택', '연락처'],
    langBtn: 'ENGLISH',
  },
  en: {
    introTitle: "Hello, I'm Taeyoon Kim!",
    introDesc: 'A brief self-introduction, main experience, interests, and a one-liner.',
    skillsTitle: 'Skills',
    contactTitle: 'Contact & Links',
    nav: ['Intro', 'Skills', 'Contact'],
    langBtn: '한국어',
  }
};
function setLanguage(langKey) {
  document.querySelector('#intro h1').textContent = content[langKey].introTitle;
  document.querySelector('#intro p').textContent = content[langKey].introDesc;
  document.querySelector('#skills h2').textContent = content[langKey].skillsTitle;
  document.querySelector('#contact h2').textContent = content[langKey].contactTitle;
  const navLinks = document.querySelectorAll('#navbar a');
  navLinks.forEach((a, i) => a.textContent = content[langKey].nav[i]);
  langToggle.textContent = content[langKey].langBtn;
}
langToggle.addEventListener('click', () => {
  lang = lang === 'ko' ? 'en' : 'ko';
  localStorage.setItem('lang', lang);
  setLanguage(lang);
});
// 초기 언어 설정
setLanguage(lang);

// 섹션 진입 시 페이드인 애니메이션
const sections = document.querySelectorAll('main section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.2 });
sections.forEach(section => {
  section.classList.add('fade-init');
  observer.observe(section);
}); 