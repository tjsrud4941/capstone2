const PROJECTS = [
  {
    title: 'AI PersonalStylist',
    emoji: '✦',
    desc: 'GPT-4o Vision을 활용한 AI 패션 스타일 컨설팅 서비스. 사진과 신체 정보를 입력하면 체형 분석, 추천 스타일, 색상 팔레트 등 맞춤 보고서를 제공합니다.',
    tags: ['React', 'TypeScript', 'Cloudflare Pages', 'OpenAI API'],
    github: 'https://github.com/ssin7393/capstone2',
    live: null,
    status: '개발 중',
  },
  {
    title: 'Capstone Project',
    emoji: '🚀',
    desc: '팀 프로젝트로 진행 중인 졸업 캡스톤 디자인 프로젝트입니다. 실생활 문제를 해결하는 웹 애플리케이션을 기획·설계·개발하고 있습니다.',
    tags: ['React', 'TypeScript', 'Node.js', 'GitHub'],
    github: 'https://github.com/ssin7393/capstone2',
    live: null,
    status: '진행 중',
  },
  {
    title: 'Portfolio Website',
    emoji: '🎨',
    desc: '현재 보고 계신 개인 포트폴리오 사이트입니다. React + Vite로 구현하고 Cloudflare Pages로 자동 배포하며, D1을 활용한 댓글·문의 기능을 포함합니다.',
    tags: ['React', 'Vite', 'Cloudflare D1', 'Pages Functions'],
    github: 'https://github.com/ssin7393/capstone2',
    live: null,
    status: '완료',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section section-white">
      <div className="section-inner">
        <h2 className="section-title">Projects</h2>
        <p className="section-sub">진행한 프로젝트들</p>

        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <div key={p.title} className="project-card">
              <div className="project-top">
                <span className="project-emoji">{p.emoji}</span>
                <span className={`project-status status-${p.status === '완료' ? 'done' : 'wip'}`}>
                  {p.status}
                </span>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span key={t} className="project-tag">{t}</span>
                ))}
              </div>
              <div className="project-links">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    GitHub →
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-link">
                    Live →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
