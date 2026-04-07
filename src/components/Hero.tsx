export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <p className="hero-greeting">안녕하세요, 저는</p>
        <h1 className="hero-name">신선경</h1>
        <p className="hero-title">Frontend Developer &amp; AI Builder</p>
        <p className="hero-desc">
          React와 AI 기술로 사람들의 일상을 더 스마트하게 만드는<br />
          서비스를 만들고 있습니다.
        </p>
        <div className="hero-btns">
          <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
            프로젝트 보기
          </button>
          <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
            연락하기
          </button>
        </div>
      </div>
      <div className="hero-scroll" onClick={() => scrollTo('about')}>
        <span>↓</span>
      </div>
    </section>
  )
}
