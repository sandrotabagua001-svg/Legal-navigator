import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const geminiMessages = messages.map((m: {role: string, content: string}) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: 'Ты опытный юридический консультант. Отвечай на вопросы по российскому праву чётко и понятно.' }] },
        contents: geminiMessages,
      }),
    }
  )

  const data = await response.json()
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Ошибка'
  return NextResponse.json({ reply })
}
