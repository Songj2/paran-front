import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { question } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: question + '의 내용이 포함된 책 하나를 추천해줘 내용은 줄거리,작가이름, 장르가 될 수 있고, 출판일은 1990년 이후고 책은 한국에 나온걸로 부탁해' }
      ],
      model: 'gpt-3.5-turbo',
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (error: unknown) {
    // API 키 관련 에러
    if ((error as any).response?.status === 401) {
      return NextResponse.json({
        error: 'API 키가 유효하지 않습니다. API 키를 확인해주세요.'
      }, { status: 401 });
    }

    // Rate limit 초과
    if ((error as any).response?.status === 429) {
      return NextResponse.json({
        error: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.'
      }, { status: 429 });
    }

    // 잘못된 요청
    if ((error as any).response?.status === 400) {
      return NextResponse.json({
        error: '잘못된 요청입니다. 입력값을 확인해주세요.'
      }, { status: 400 });
    }

    // 서버 에러
    if ((error as any).response?.status === 500) {
      return NextResponse.json({
        error: 'OpenAI 서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
      }, { status: 500 });
    }

    // 네트워크 에러
    if ((error as any).code === 'ECONNREFUSED' || (error as any).code === 'ECONNRESET') {
      return NextResponse.json({
        error: '네트워크 연결에 문제가 발생했습니다. 인터넷 연결을 확인해주세요.'
      }, { status: 503 });
    }

    // 기타 에러
    return NextResponse.json({
      error: 'OpenAI API 호출 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}
