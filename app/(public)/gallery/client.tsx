'use client'
import { useState } from 'react'

import MyImage from '@/components/MyImage'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import { XMarkIcon } from '@/components/Icons/XMark'
import { DEMO_GALLERY } from '@/constants/demoData'
import useLanguage from '@/hooks/useLanguage'

const GalleryScreen = () => {
  const { translate } = useLanguage()
  const [preview, setPreview] = useState<(typeof DEMO_GALLERY)[number] | null>(null)

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: translate('gallery.title') }]}
        description={translate('gallery.subtitle')}
        title={translate('gallery.title')}
      />

      <Section>
        <div className='columns-2 gap-4 md:columns-3 lg:columns-4'>
          {DEMO_GALLERY.map((item, index) => (
            <button
              key={item.src}
              className='group relative mb-4 block w-full overflow-hidden rounded-box bg-base-200'
              type='button'
              onClick={() => setPreview(item)}
            >
              <MyImage
                alt={item.caption}
                className={`!relative !h-auto !w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'
                }`}
                src={item.src}
              />
              <span className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral/80 to-transparent p-3 text-left text-xs font-medium text-neutral-content opacity-0 transition-opacity group-hover:opacity-100'>
                {item.caption}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {preview && (
        <div className='fixed inset-0 z-[1200] flex items-center justify-center bg-neutral/80 p-4'>
          <button
            aria-label={translate('common.close')}
            className='absolute inset-0 w-full cursor-default'
            type='button'
            onClick={() => setPreview(null)}
          />
          <button
            aria-label={translate('common.close')}
            className='btn btn-circle btn-sm absolute right-4 top-4 z-10'
            type='button'
            onClick={() => setPreview(null)}
          >
            <XMarkIcon />
          </button>
          <figure className='relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col gap-3'>
            <MyImage alt={preview.caption} className='!relative !h-auto !w-full rounded-box object-contain' src={preview.src} />
            <figcaption className='text-center text-sm text-neutral-content'>{preview.caption}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}

export default GalleryScreen
