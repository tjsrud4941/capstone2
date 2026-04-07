interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: '요청 형식이 올바르지 않습니다.' }, 400);
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return json({ error: '이름, 이메일, 메시지를 모두 입력해주세요.' }, 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return json({ error: '올바른 이메일 형식으로 입력해주세요.' }, 400);
  }

  if (message.length > 1000) {
    return json({ error: '메시지는 1000자 이하로 입력해주세요.' }, 400);
  }

  try {
    await env.DB.prepare(
      'INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, ?)'
    )
      .bind(name, email, message, new Date().toISOString())
      .run();
    return json({ success: true });
  } catch (err) {
    console.error(err);
    return json({ error: '메시지 저장에 실패했습니다.' }, 500);
  }
};

function json(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
