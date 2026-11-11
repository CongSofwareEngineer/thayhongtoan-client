'use client'

import '@blocknote/core/fonts/inter.css'
import '@blocknote/mantine/style.css'

import { useEffect } from 'react'
import { en, vi } from '@blocknote/core/locales'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'

import useLanguage from '@/hooks/useLanguage'
import { parseBlogContent } from '@/utils/blogContent'
import { LANGUAGE_SUPPORT } from '@/zustand/language'

export type MyBlogProps = {
  initialContent?: string
  onChange: (content: string) => void
  className?: string
}

const Editor = ({ initialContent, onChange, className = '' }: MyBlogProps) => {
  const { lang } = useLanguage()

  const editor = useCreateBlockNote({
    initialContent: parseBlogContent(initialContent) ?? undefined,
    dictionary: lang === LANGUAGE_SUPPORT.EN ? en : vi,
  })

  // Legacy posts are stored as plain text/HTML: convert them to blocks once when the editor mounts
  useEffect(() => {
    if (!initialContent || parseBlogContent(initialContent)) return

    const run = async () => {
      const blocks = await editor.tryParseHTMLToBlocks(
        initialContent
          .split('\n\n')
          .map((paragraph) => `<p>${paragraph.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</p>`)
          .join('')
      )

      editor.replaceBlocks(editor.document, blocks)
    }

    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  return (
    <div className={`overflow-hidden rounded-box border border-base-300 bg-base-100 py-3 ${className}`}>
      <BlockNoteView editor={editor} theme='light' onChange={() => onChange(JSON.stringify(editor.document))} />
    </div>
  )
}

export default Editor
