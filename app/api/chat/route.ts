import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const geminiMessages = messages.map((m: {role: string, content: string}) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { 
            parts: [{ text: 'Ты — AI-ассистент «Юридический навигатор» по миграционному, трудовому, налоговому и гражданскому праву Грузии. Твоя аудитория — русскоязычные экспаты. Отвечай ТОЛЬКО по законодательству Грузии, структурированно, с ссылками на законы.' }] 
          },
          contents: geminiMessages,
        }),
      }
    )

    const data = await response.json()
    
    // Безопасное извлечение текста ответа
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Ошибка: не удалось получить ответ от AI'
    
    return NextResponse.json({ content: reply })
  } catch (error) {
    return NextResponse.json({ content: 'Ошибка сервера при обращении к API' }, { status: 500 })
  }
}
