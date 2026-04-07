const SKILL_GROUPS = [
  {
    category: 'Frontend',
    icon: '🖥️',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML / CSS', 'Vite'],
  },
  {
    category: 'Backend & Cloud',
    icon: '☁️',
    skills: ['Node.js', 'Python', 'Cloudflare Pages', 'Cloudflare Workers', 'D1'],
  },
  {
    category: 'AI & API',
    icon: '🤖',
    skills: ['OpenAI API', 'GPT-4o Vision', 'Prompt Engineering'],
  },
  {
    category: 'Tools',
    icon: '🛠️',
    skills: ['Git', 'GitHub', 'Figma', 'VS Code', 'Wrangler'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section section-gray">
      <div className="section-inner">
        <h2 className="section-title">Skills</h2>
        <p className="section-sub">사용하는 기술 스택</p>

        <div className="skills-grid">
          {SKILL_GROUPS.map(({ category, icon, skills }) => (
            <div key={category} className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">{icon}</span>
                <h3>{category}</h3>
              </div>
              <div className="skill-tags">
                {skills.map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
