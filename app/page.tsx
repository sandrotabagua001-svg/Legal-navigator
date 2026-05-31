'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: 'assistant',
      content: 'Здравствуйте! Я — ваш юридический навигатор по законодательству Грузии. Задайте вопрос по миграционному, трудовому, налоговому или гражданскому праву.'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content || 'Ошибка при получении ответа' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Произошла ошибка при соединении с сервером.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const suggestions = [
    'Как получить ВНЖ в Грузии?',
    'Налоги для фрилансеров-экспатов',
    'Трудовой договор по грузинскому праву',
  ]

  return (
    <div className="flex flex-col h-screen bg-[#0A0E1A] text-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] flex-shrink-0">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-7 h-7 rounded-sm flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #C9A84C, #8B6914)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <span className="font-serif text-base text-white/80">Legal Navigator</span>
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-xs font-medium">Онлайн</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 justify-center pb-2">
              {suggestions.map((s, i) => (
                <button key={i}
                  onClick={() => { setInput(s); textareaRef.current?.focus() }}
                  className="px-4 py-2 rounded-full text-sm border border-white/[0.08] bg-white/[0.03] text-white/50 hover:text-white/80 hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/5 transition">
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1
                ${m.role === 'user' ? 'bg-white/10 text-white/60' : 'text-[#0A0E1A]'}`}
                style={m.role === 'assistant' ? { background: 'linear-gradient(135deg, #C9A84C, #E8CC80)' } : {}}>
                {m.role === 'user' ? 'Вы' : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                )}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                ${m.role === 'user'
                  ? 'bg-white/[0.07] text-white/90 rounded-tr-sm'
                  : 'border border-white/[0.06] bg-white/[0.03] text-white/80 rounded-tl-sm'}`}>
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 flex-row">
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[#0A0E1A] mt-1"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #E8CC80)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.03] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-white/[0.06] px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end gap-3 p-3 rounded-xl border border-white/[0.08] bg-white/[0.03] focus-within:border-[#C9A84C]/40 transition">
            <textarea
              ref={textareaRef}
              className="flex-1 bg-transparent text-white/90 placeholder-white/25 text-sm resize-none outline-none leading-relaxed max-h-32 min-h-[24px]"
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Задайте юридический вопрос... (Enter — отправить)"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-30"
              style={{
                background: input.trim() && !loading
                  ? 'linear-gradient(135deg, #C9A84C, #E8CC80)'
                  : 'rgba(255,255,255,0.06)'
              }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke={input.trim() && !loading ? '#0A0E1A' : 'white'}
                strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <p className="text-center text-white/20 text-xs mt-3">
            Информация носит ознакомительный характер · Для официальных вопросов обратитесь к юристу
          </p>
        </div>
      </div>
    </div>
  )
}
