import '@blocknote/core/fonts/inter.css'
import '@blocknote/core/style.css'

import { ServerBlockNoteEditor } from '@blocknote/server-util'
import { getDocument } from '@blocknote/server-util/dom'

import { parseBlogContent } from '@/utils/blogContent'

// One shared jsdom document for every export: @blocknote/server-util needs a DOM and installs no globals
let serverEditor: ServerBlockNoteEditor | null = null

const getServerEditor = () => {
  if (!serverEditor) {
    serverEditor = ServerBlockNoteEditor.create(undefined, getDocument())
  }

  return serverEditor
}

// Render the markdown-lite subset used by legacy/demo posts (paragraphs + **bold**)
const renderLegacyContent = (content: string) =>
  content.split('\n\n').map((block, index) => (
    <p key={index} className='mb-4 leading-relaxed text-base-content/80'>
      {block.split(/(\*\*[^*]+\*\*)/g).map((part, partIndex) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={partIndex} className='font-bold text-base-content'>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={partIndex}>{part}</span>
        )
      )}
    </p>
  ))

// Server Component: renders stored BlockNote blocks to static HTML (good for SEO) with the same markup as the editor
const BlogContent = async ({ content }: { content?: string | null }) => {
  if (!content) {
    return null
  }

  const blocks = parseBlogContent(content)

  if (!blocks) {
    return <div className='text-base'>{renderLegacyContent(content)}</div>
  }

  const html = await getServerEditor().blocksToFullHTML(blocks)

  return (
    <div className='bn-root bn-container' data-color-scheme='light'>
      <div dangerouslySetInnerHTML={{ __html: html }} className='ProseMirror bn-editor bn-default-styles !px-0' />
    </div>
  )
}

export default BlogContent
