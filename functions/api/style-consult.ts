interface Env {
  OPENAI_API_KEY: string;
}

interface RequestBody {
  photo: string; // base64 data URL
  height: string;
  weight: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: '요청 형식이 올바르지 않습니다.' }, 400);
  }

  const { photo, height, weight } = body;

  if (!photo || !height || !weight) {
    return jsonResponse({ error: '사진, 키, 몸무게를 모두 입력해주세요.' }, 400);
  }

  if (!env.OPENAI_API_KEY) {
    return jsonResponse({ error: 'API 키가 설정되지 않았습니다.' }, 500);
  }

  // data URL에서 MIME 타입과 base64 데이터 분리
  const matches = photo.match(/^data:([^;]+);base64,(.+)$/);
  if (!matches) {
    return jsonResponse({ error: '이미지 형식이 올바르지 않습니다.' }, 400);
  }
  const [, mimeType, base64Data] = matches;

  const prompt = `당신은 10년 경력의 전문 패션 스타일리스트입니다. 다음 신체 정보와 사진을 바탕으로 맞춤 스타일 컨설팅 보고서를 작성해주세요.

신체 정보:
- 키: ${height}cm
- 몸무게: ${weight}kg

아래 6가지 항목을 포함한 상세한 보고서를 한국어로 작성해주세요:

1. **체형 분석**
사진과 신체 정보를 바탕으로 체형의 특징과 장점을 분석해주세요.

2. **추천 스타일 3가지**
체형에 잘 어울리는 구체적인 패션 스타일을 3가지 추천해주세요.

3. **추천 의류 아이템**
당장 구매하면 좋을 구체적인 의류 아이템을 추천해주세요.

4. **어울리는 색상 팔레트**
피부톤과 체형에 어울리는 색상과 색상 조합을 알려주세요.

5. **피해야 할 스타일**
체형 단점을 보완하기 위해 주의해야 할 스타일을 알려주세요.

6. **실용적인 스타일링 팁**
일상에서 바로 적용할 수 있는 코디 팁을 3가지 알려주세요.

친근하고 전문적인 톤으로 작성해주세요.`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Data}`,
                  detail: 'high',
                },
              },
              {
                type: 'text',
                text: prompt,
              },
            ],
          },
        ],
        max_tokens: 2000,
      }),
    });

    if (!openaiRes.ok) {
      const errBody = await openaiRes.json().catch(() => ({}));
      console.error('OpenAI error:', errBody);
      return jsonResponse({ error: 'AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }, 502);
    }

    const data = await openaiRes.json() as {
      choices: Array<{ message: { content: string } }>;
    };

    const report = data.choices?.[0]?.message?.content;
    if (!report) {
      return jsonResponse({ error: '보고서를 생성하지 못했습니다.' }, 500);
    }

    return jsonResponse({ report });
  } catch (err) {
    console.error('Unexpected error:', err);
    return jsonResponse({ error: '서버 오류가 발생했습니다.' }, 500);
  }
};

function jsonResponse(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
