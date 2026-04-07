import { useState, useEffect } from 'react'

interface Comment {
  id: number
  author: string
  content: string
  created_at: string
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [submitMsg, setSubmitMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const fetchComments = async () => {
    setFetchError('')
    try {
      const res = await fetch('/api/comments')
      const data = await res.json() as { comments?: Comment[]; error?: string }
      if (data.comments) setComments(data.comments)
      else setFetchError('댓글을 불러오지 못했습니다.')
    } catch {
      setFetchError('댓글을 불러오지 못했습니다.')
    }
  }

  useEffect(() => { fetchComments() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSubmitMsg(null)
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: author.trim(), content: content.trim() }),
      })
      const data = await res.json() as { success?: boolean; error?: string }
      if (data.success) {
        setSubmitMsg({ type: 'ok', text: '댓글이 등록되었습니다!' })
        setAuthor('')
        setContent('')
        fetchComments()
      } else {
        setSubmitMsg({ type: 'err', text: data.error ?? '오류가 발생했습니다.' })
      }
    } catch {
      setSubmitMsg({ type: 'err', text: '네트워크 오류가 발생했습니다.' })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }

  return (
    <section id="comments" className="section section-gray">
      <div className="section-inner">
        <h2 className="section-title">Comments</h2>
        <p className="section-sub">방명록 — 자유롭게 메시지를 남겨주세요</p>

        {/* 댓글 목록 */}
        <div className="comment-list">
          {fetchError && <p className="form-error">{fetchError}</p>}
          {comments.length === 0 && !fetchError && (
            <p className="comment-empty">아직 댓글이 없어요. 첫 번째로 남겨보세요!</p>
          )}
          {comments.map((c) => (
            <div key={c.id} className="comment-item">
              <div className="comment-meta">
                <span className="comment-author">{c.author}</span>
                <span className="comment-date">{formatDate(c.created_at)}</span>
              </div>
              <p className="comment-content">{c.content}</p>
            </div>
          ))}
        </div>

        {/* 댓글 작성 폼 */}
        <form className="comment-form" onSubmit={handleSubmit}>
          <h3>댓글 남기기</h3>
          <input
            className="form-input"
            placeholder="이름"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={50}
            required
          />
          <textarea
            className="form-textarea"
            placeholder="메시지를 입력하세요 (최대 500자)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={500}
            rows={4}
            required
          />
          {submitMsg && (
            <p className={submitMsg.type === 'ok' ? 'form-success' : 'form-error'}>
              {submitMsg.text}
            </p>
          )}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '등록 중...' : '댓글 등록'}
          </button>
        </form>
      </div>
    </section>
  )
}
