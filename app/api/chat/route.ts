import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    system: 'Ты опытный юридический консультант. Отвечай на вопросы по российскому праву чётко и понятно. Всегда рекомендуй обратиться к профессиональному юристу для конкретных дел.',
    messages: messages,
  })

  const reply = response.content[0].type === 'text' ? response.content[0].text : ''
  return NextResponse.json({ reply })
}
