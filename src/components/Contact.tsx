import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json() as { success?: boolean; error?: string }
      if (data.success) {
        setMsg({ type: 'ok', text: '메시지가 전달되었습니다. 감사합니다!' })
        setForm({ name: '', email: '', message: '' })
      } else {
        setMsg({ type: 'err', text: data.error ?? '오류가 발생했습니다.' })
      }
    } catch {
      setMsg({ type: 'err', text: '네트워크 오류가 발생했습니다.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section section-white">
      <div className="section-inner">
        <h2 className="section-title">Contact</h2>
        <p className="section-sub">궁금하신 점이나 제안이 있으시면 편하게 연락해주세요</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-row">
            <div className="form-group">
              <label className="form-label">이름</label>
              <input
                className="form-input"
                placeholder="홍길동"
                value={form.name}
                onChange={set('name')}
                maxLength={50}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">이메일</label>
              <input
                className="form-input"
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={set('email')}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">메시지</label>
            <textarea
              className="form-textarea"
              placeholder="전하고 싶은 내용을 자유롭게 적어주세요"
              value={form.message}
              onChange={set('message')}
              rows={6}
              maxLength={1000}
              required
            />
          </div>

          {msg && (
            <p className={msg.type === 'ok' ? 'form-success' : 'form-error'}>
              {msg.text}
            </p>
          )}

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? '전송 중...' : '메시지 보내기'}
          </button>
        </form>
      </div>
    </section>
  )
}
