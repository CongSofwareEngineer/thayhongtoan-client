'use client'

import '@blocknote/core/fonts/inter.css'
import '@blocknote/mantine/style.css'

import { useEffect } from 'react'
import { en, vi } from '@blocknote/core/locales'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'

import { PATH_IMG } from '@/constants/app'
import useBase64Img from '@/hooks/useBase64Img'
import useLanguage from '@/hooks/useLanguage'
import ClientApi from '@/services/ClientApi'
import { parseBlogContent } from '@/utils/blogContent'
import { detectImg } from '@/utils/functions'
import { showNotificationError } from '@/utils/notification'
import { LANGUAGE_SUPPORT } from '@/zustand/language'

export type MyBlogProps = {
  initialContent?: string
  onChange: (content: string) => void
  pathFile?: PATH_IMG
  className?: string
}

const Editor = ({ initialContent, onChange, pathFile = PATH_IMG.Products, className = '' }: MyBlogProps) => {
  const { lang, translate } = useLanguage()
  const { getBase64 } = useBase64Img(500, 500)

  // Images dropped in the editor go to the same upload endpoint the previous editor used
  const uploadFile = async (file: File) => {
    const fileImg = await getBase64(file)

    if (!fileImg) {
      throw new Error('upload-failed')
    }

    const res = await ClientApi.uploadImg(fileImg, pathFile)
    const publicId = res?.data?.public_id

    if (!publicId) {
      showNotificationError(translate('errors.serverError'))
      throw new Error('upload-failed')
    }

    return detectImg(publicId)
  }

  const editor = useCreateBlockNote({
    initialContent: parseBlogContent(initialContent) ?? undefined,
    dictionary: lang === LANGUAGE_SUPPORT.EN ? en : vi,
    uploadFile,
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
