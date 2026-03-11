import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import type { KnowledgeBase } from '@/lib/rag'
import { buildTfIdfIndex, retrieveTopK } from '@/lib/rag'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
    }

    const kbPath = path.join(process.cwd(), 'public', 'knowledge.json')
    const raw = await readFile(kbPath, 'utf8')
    const kb = JSON.parse(raw) as KnowledgeBase

    const index = buildTfIdfIndex(kb.chunks)
    const top = retrieveTopK(index, message, 4)

    const context = top
      .map((t, idx) => `[#${idx + 1}] ${t.chunk.title}\n${t.chunk.content}`)
      .join('\n\n')

    const system = `You are a helpful assistant for Awais Ur Rehman (full-stack engineer). Use concise bullet points where appropriate. Support basic markdown: **bold**, [links](url). Always cite sources as [#n]. If unsure, say so.`

    const groqKey = process.env.GROQ_API_KEY
    if (!groqKey) {
      // Fallback: build a structured response from retrieved context
      const parts = top.map((t) => {
        const content = t.chunk.content.length > 300
          ? t.chunk.content.slice(0, 300) + '...'
          : t.chunk.content
        return `**${t.chunk.title}**\n${content}`
      })
      const fallback = parts.join('\n\n')
      const sources = top.map((t, idx) => ({
        id: `#${idx + 1}`,
        title: t.chunk.title,
        url: t.chunk.url || null,
      }))
      return NextResponse.json({ message: fallback, sources })
    }

    const model = 'llama-3.3-70b-versatile'
    const userPrompt = `Question: ${message}\n\nContext:\n${context}`

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: userPrompt },
        ],
      }),
    })

    if (!groqRes.ok) {
      const err = await groqRes.text()
      return NextResponse.json({ error: 'Groq error', detail: err }, { status: 500 })
    }
    const data = await groqRes.json()
    const content = data?.choices?.[0]?.message?.content || 'Sorry, no answer.'

    const sources = top.map((t, idx) => ({
      id: `#${idx + 1}`,
      title: t.chunk.title,
      url: t.chunk.url || null,
    }))

    return NextResponse.json({ message: content, sources })
  } catch (e: any) {
    return NextResponse.json({ error: 'Unexpected error', detail: e?.message }, { status: 500 })
  }
}


