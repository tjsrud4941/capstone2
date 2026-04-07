const INFO = [
  { icon: '📍', label: '위치', value: '대한민국' },
  { icon: '🎓', label: '전공', value: '컴퓨터공학' },
  { icon: '💼', label: '관심분야', value: 'Frontend · AI · UX' },
  { icon: '✉️', label: '이메일', value: 'ssin7393@gmail.com' },
]

export default function About() {
  return (
    <section id="about" className="section section-white">
      <div className="section-inner">
        <h2 className="section-title">About Me</h2>
        <p className="section-sub">저에 대해 소개합니다</p>

        <div className="about-grid">
          <div className="about-text">
            <p>
              사용자 경험을 최우선으로 생각하며, 새로운 기술을 탐구하고
              실제 서비스에 적용하는 것을 즐기는 개발자입니다.
            </p>
            <p>
              특히 AI와 웹 기술을 결합해 사람들의 일상에 실질적인 편리함을
              제공하는 서비스를 만드는 것에 큰 관심을 갖고 있습니다.
            </p>
            <p>
              팀과의 협업을 통해 더 나은 결과물을 만들어내는 것을 좋아하며,
              코드 품질과 사용자 경험 모두를 중요하게 생각합니다.
            </p>
          </div>

          <div className="about-info">
            {INFO.map(({ icon, label, value }) => (
              <div key={label} className="info-item">
                <span className="info-icon">{icon}</span>
                <div>
                  <p className="info-label">{label}</p>
                  <p className="info-value">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
