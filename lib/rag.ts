export type KnowledgeChunk = {
    id: string
    title: string
    content: string
    url?: string
}

export type KnowledgeBase = {
    chunks: KnowledgeChunk[]
}

const STOPWORDS = new Set(
    [
        'a', 'an', 'and', 'the', 'to', 'of', 'in', 'on', 'for', 'with', 'is', 'are', 'as', 'by', 'at', 'from', 'or', 'that', 'this', 'it', 'be', 'was', 'were', 'will', 'can', 'your', 'you', 'we', 'our', 'about'
    ],
)

export function tokenize(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((t) => t && !STOPWORDS.has(t))
}

export function buildTfIdfIndex(chunks: KnowledgeChunk[]) {
    const docsTokens = chunks.map((c) => tokenize(c.title + ' ' + c.content))
    const docFreq = new Map<string, number>()

    for (const tokens of docsTokens) {
        const seen = new Set<string>()
        for (const token of tokens) {
            if (!seen.has(token)) {
                seen.add(token)
                docFreq.set(token, (docFreq.get(token) || 0) + 1)
            }
        }
    }

    const N = chunks.length

    const docVectors = docsTokens.map((tokens) => {
        const tf = new Map<string, number>()
        for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1)
        const vector = new Map<string, number>()
        for (const [t, f] of tf) {
            const idf = Math.log((N + 1) / (1 + (docFreq.get(t) || 0))) + 1
            vector.set(t, f * idf)
        }
        return vector
    })

    return { docVectors, docFreq, N, chunks }
}

function cosineSim(a: Map<string, number>, b: Map<string, number>): number {
    let dot = 0
    let normA = 0
    let normB = 0
    for (const [, v] of a) normA += v * v
    for (const [, v] of b) normB += v * v
    const keys = new Set([...a.keys(), ...b.keys()])
    for (const k of keys) {
        const va = a.get(k) || 0
        const vb = b.get(k) || 0
        dot += va * vb
    }
    const denom = Math.sqrt(normA) * Math.sqrt(normB)
    return denom === 0 ? 0 : dot / denom
}

export function retrieveTopK(index: ReturnType<typeof buildTfIdfIndex>, query: string, k = 5) {
    const qTokens = tokenize(query)
    const tf = new Map<string, number>()
    for (const t of qTokens) tf.set(t, (tf.get(t) || 0) + 1)
    const qVec = new Map<string, number>()
    for (const [t, f] of tf) {
        const idf = Math.log((index.N + 1) / (1 + (index.docFreq.get(t) || 0))) + 1
        qVec.set(t, f * idf)
    }
    const scored = index.docVectors.map((vec, i) => ({ i, score: cosineSim(vec, qVec) }))
    scored.sort((a, b) => b.score - a.score)
    return scored.slice(0, k).map(({ i, score }) => ({ score, chunk: index.chunks[i] }))
}


