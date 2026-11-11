import type { PartialBlock } from '@blocknote/core'

// Blog content is stored as JSON.stringify(editor.document) (BlockNote blocks).
// Older posts (and constants/demoData) are still plain text/markdown-lite strings, so return null for those.
export const parseBlogContent = (content?: string | null): PartialBlock[] | null => {
  if (!content) return null

  try {
    const parsed = JSON.parse(content)

    return Array.isArray(parsed) && parsed.length > 0 ? (parsed as PartialBlock[]) : null
  } catch {
    return null
  }
}

// Flatten BlockNote blocks (or strip HTML/markdown marks) down to readable text
export const getBlogPlainText = (content?: string | null): string => {
  const blocks = parseBlogContent(content)

  if (!blocks) {
    return (content ?? '')
      .replace(/<[^>]*>/g, '')
      .replace(/\*\*/g, '')
      .trim()
  }

  const texts: string[] = []
  const walk = (node: unknown) => {
    if (Array.isArray(node)) {
      node.forEach(walk)

      return
    }

    if (node && typeof node === 'object') {
      const item = node as Record<string, unknown>

      if (item.type === 'text' && typeof item.text === 'string') {
        texts.push(item.text)
      }
      Object.values(item).forEach(walk)
    }
  }

  walk(blocks)

  return texts.join(' ')
}

// Rough reading time in minutes, used when the author leaves the field empty
export const getBlogReadTime = (content?: string | null) =>
  Math.max(1, Math.ceil(getBlogPlainText(content).split(/\s+/).filter(Boolean).length / 200))
