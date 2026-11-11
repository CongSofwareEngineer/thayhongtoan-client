import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import BlogDetailClient from './client'

import BlogContent from '@/components/MyBlog/Content'
import JsonLd from '@/components/JsonLd'
import { BLOG_STATUS } from '@/constants/app'
import { DEMO_BLOGS } from '@/constants/demoData'
import { ROUTES } from '@/constants/routes'
import BlogAPI from '@/services/API/Blog'
import { IBlog } from '@/services/API/Blog/type'
import { getBlogPlainText } from '@/utils/blogContent'
import { articleSchema, breadcrumbSchema } from '@/utils/seo'

// Resolve the post on the server so the HTML Google (and AI crawlers) receive already holds the article
const getPost = async (slug: string): Promise<IBlog | null> => {
  const res = await BlogAPI.getBySlug(slug)

  if (res?.data?.slug) {
    return res.data
  }

  return DEMO_BLOGS.find((item) => item.slug === slug) || null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return { title: 'Bài viết', robots: { index: false, follow: false } }
  }

  const description = post.description || getBlogPlainText(post.content).slice(0, 200)

  return {
    title: post.title,
    description,
    keywords: post.tags,
    alternates: { canonical: ROUTES.blogDetail(slug) },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: ROUTES.blogDetail(slug),
      publishedTime: post.createdAt,
      authors: [post.author || 'Thầy Hồng'],
      tags: post.tags,
      ...(post.thumbnail ? { images: [{ url: post.thumbnail, alt: post.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      ...(post.thumbnail ? { images: [post.thumbnail] } : {}),
    },
    robots: post.status === BLOG_STATUS.DRAFT ? { index: false, follow: false } : undefined,
  }
}

const BlogDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            slug: post.slug,
            description: post.description,
            thumbnail: post.thumbnail,
            author: post.author,
            createdAt: post.createdAt,
            tags: post.tags,
          }),
          breadcrumbSchema([{ name: 'Chia sẻ', path: ROUTES.blog }, { name: post.title }]),
        ]}
      />
      <BlogDetailClient post={post}>
        <BlogContent content={post.content} />
      </BlogDetailClient>
    </>
  )
}

export default BlogDetailPage
