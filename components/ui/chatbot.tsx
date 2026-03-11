'use client'
import { useEffect, useRef, useState } from 'react'
import { Send, X, Bot, UserRound } from 'lucide-react'

type Source = { id: string; title: string; url?: string | null }
type ChatMsg = {
  role: 'user' | 'assistant'
  content: string
  sources?: Source[]
}

function Suggested({ onPick }: { onPick: (q: string) => void }) {
  const items = [
    'What did Awais build for UBL and HBL?',
    'Tell me about OculaCare',
    "What's Awais's tech stack?",
  ]
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {items.map((t) => (
        <button
          key={t}
          onClick={() => onPick(t)}
          className="rounded-full border border-zinc-200 px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          {t}
        </button>
      ))}
    </div>
  )
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function applyInlineMarkdown(s: string) {
  let html = escapeHtml(s)
  // bold **text**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // links [text](https://...)
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    (_m, text, href) =>
      `<a href="${href}" target="_blank" rel="noopener noreferrer" class="underline text-zinc-600 dark:text-zinc-300">${text}</a>`,
  )
  return html
}

function isListLine(line: string): boolean {
  const t = line.trim()
  return (
    t.startsWith('- ') ||
    t.startsWith('* ') ||
    t.startsWith('• ') ||
    /^\d+[.)]\s/.test(t)
  )
}

function cleanListItem(line: string): string {
  return line
    .replace(/^[\s]*[-*•]\s?/, '')
    .replace(/^\d+[.)]\s?/, '')
    .trim()
}

function MessageContent({ content }: { content: string }) {
  const blocks = content.split('\n\n')

  return (
    <div className="space-y-2">
      {blocks.map((block, bi) => {
        const lines = block.split('\n').filter((l) => l.trim())

        // Group consecutive lines into segments: paragraph or list
        const segments: { type: 'p' | 'list'; lines: string[] }[] = []
        for (const line of lines) {
          const isList = isListLine(line)
          const last = segments[segments.length - 1]
          if (last && ((isList && last.type === 'list') || (!isList && last.type === 'p'))) {
            last.lines.push(line)
          } else {
            segments.push({ type: isList ? 'list' : 'p', lines: [line] })
          }
        }

        return (
          <div key={bi} className="space-y-1.5">
            {segments.map((seg, si) => {
              if (seg.type === 'list') {
                return (
                  <ul key={si} className="ml-4 list-disc space-y-0.5">
                    {seg.lines.map((l, li) => {
                      const cleaned = cleanListItem(l)
                      if (!cleaned) return null
                      return (
                        <li
                          key={li}
                          className="leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: applyInlineMarkdown(cleaned),
                          }}
                        />
                      )
                    })}
                  </ul>
                )
              }
              return (
                <p
                  key={si}
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: applyInlineMarkdown(seg.lines.join(' ').trim()),
                  }}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

function Message({ msg }: { msg: ChatMsg }) {
  const isUser = msg.role === 'user'

  return (
    <div className={isUser ? 'flex-1 text-right' : 'flex-1 text-left'}>
      <div
        className={
          isUser
            ? 'inline-flex max-w-[85%] flex-col items-end rounded-2xl bg-zinc-900 px-4 py-3 text-left text-sm text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900'
            : 'inline-flex max-w-[85%] flex-col items-start rounded-2xl bg-zinc-100 px-4 py-3 text-left text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
        }
      >
        <MessageContent content={msg.content} />
        {!!msg.sources?.length && (
          <div className="mt-2 flex flex-wrap gap-1">
            {msg.sources.map((s) => (
              <a
                key={s.id}
                href={s.url || '#'}
                target={s.url ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="rounded-md bg-zinc-200 px-1.5 py-0.5 text-[10px] text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100"
              >
                {s.id} {s.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    {
      role: 'assistant',
      content:
        "Hi! Ask me about Awais's work, projects, or how to get in touch.",
    },
  ])
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, open])

  async function send() {
    const text = input.trim()
    if (!text) return
    setMsgs((m) => [...m, { role: 'user', content: text }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      const answer = (data?.message as string) || 'Sorry, I could not answer.'
      const sources = (data?.sources || []) as Source[]
      setMsgs((m) => [...m, { role: 'assistant', content: answer, sources }])
    } catch {
      setMsgs((m) => [
        ...m,
        { role: 'assistant', content: 'Error contacting assistant.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-zinc-50 shadow-lg ring-1 ring-zinc-800 transition-colors hover:bg-zinc-950 dark:bg-zinc-50 dark:text-zinc-900 dark:ring-zinc-200 dark:hover:bg-zinc-100"
      >
        {open ? (
          <>
            <X className="h-4 w-4" /> Close
          </>
        ) : (
          <>
            <Bot className="h-4 w-4" /> Ask Awais
          </>
        )}
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 z-40 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl bg-white/80 ring-1 ring-zinc-200 backdrop-blur-xl dark:bg-zinc-900/70 dark:ring-zinc-800">
          <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 bg-gradient-to-r from-zinc-50/70 to-transparent px-3 py-2 text-sm dark:border-zinc-800 dark:from-zinc-800/50">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <span className="font-medium">Awais Assistant</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 pb-4 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className="mb-3 flex items-start gap-2 px-1">
                {m.role === 'assistant' ? (
                  <div className="mt-0.5 shrink-0 rounded-full bg-zinc-900 p-1.5 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                ) : (
                  <div className="mt-0.5 shrink-0 rounded-full bg-zinc-200 p-1.5 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-100">
                    <UserRound className="h-3.5 w-3.5" />
                  </div>
                )}
                <Message msg={m} />
              </div>
            ))}
            {loading && (
              <div className="mb-2 ml-8 inline-flex items-center gap-2 rounded-2xl bg-zinc-100 px-3 py-2 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                <span className="inline-flex gap-1">
                  <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-200ms]" />
                  <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-100ms]" />
                  <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                </span>
                typing...
              </div>
            )}
            {msgs.length <= 1 && <Suggested onPick={(q) => setInput(q)} />}
            <div ref={endRef} />
          </div>

          <div className="flex shrink-0 items-center gap-2 border-t border-zinc-200 p-2 dark:border-zinc-800">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask about skills, projects, experience..."
              className="flex-1 rounded-md border border-zinc-200 bg-white px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
            />
            <button
              onClick={send}
              disabled={loading}
              className="inline-flex items-center gap-1 rounded-md bg-zinc-900 px-3 py-2 text-sm text-zinc-50 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
