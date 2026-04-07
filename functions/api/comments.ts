interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { DB } = context.env;
  try {
    const { results } = await DB.prepare(
      'SELECT id, author, content, created_at FROM comments ORDER BY created_at DESC LIMIT 100'
    ).all();
    return json({ comments: results });
  } catch (err) {
    console.error(err);
    return json({ error: '댓글을 불러오지 못했습니다.' }, 500);
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: { author?: string; content?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: '요청 형식이 올바르지 않습니다.' }, 400);
  }

  const author = body.author?.trim();
  const content = body.content?.trim();

  if (!author || !content) {
    return json({ error: '이름과 내용을 모두 입력해주세요.' }, 400);
  }
  if (author.length > 50) {
    return json({ error: '이름은 50자 이하로 입력해주세요.' }, 400);
  }
  if (content.length > 500) {
    return json({ error: '내용은 500자 이하로 입력해주세요.' }, 400);
  }

  try {
    await env.DB.prepare(
      'INSERT INTO comments (author, content, created_at) VALUES (?, ?, ?)'
    )
      .bind(author, content, new Date().toISOString())
      .run();
    return json({ success: true });
  } catch (err) {
    console.error(err);
    return json({ error: '댓글 저장에 실패했습니다.' }, 500);
  }
};

function json(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
