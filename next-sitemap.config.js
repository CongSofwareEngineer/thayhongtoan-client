/** @type {import('next-sitemap').IConfig} */
const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://thayhongtoan.vercel.app'

// Routes that are noindex in their metadata must not appear in the sitemap either
const PRIVATE_PATHS = ['/admin', '/admin/*', '/login', '/manifest.webmanifest', '/api/*', '/opengraph-image', '/twitter-image']

// Conversion pages get the highest priority
const TOP_PRIORITY = ['/', '/class', '/register', '/tuition', '/contact']

// AI crawlers are allowed on the public pages so the centre can be cited in AI answers
const AI_USER_AGENTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended']

// Seed slugs/ids from constants/demoData.ts, used when the backend is unreachable at build time
const readDemoPaths = () => {
  try {
    const source = fs.readFileSync(path.join(__dirname, 'constants', 'demoData.ts'), 'utf8')
    // Read each seed array on its own so blog slugs and class ids do not leak into the wrong path
    const section = (name) => source.split(`export const ${name}`)[1]?.split('\nexport const')[0] || ''
    const blogs = [...section('DEMO_BLOGS').matchAll(/slug: '([^']+)'/g)].map((match) => `/blog/${match[1]}`)
    const classes = [...section('DEMO_CLASSES').matchAll(/_id: '([^']+)'/g)].map((match) => `/class/${match[1]}`)

    return [...new Set([...blogs, ...classes])]
  } catch {
    return []
  }
}

// Published posts + classes from the API, so detail pages are indexable
const readApiPaths = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_APP

  if (!baseUrl) return []

  const fetchJson = async (url) => {
    try {
      const res = await fetch(url)

      if (!res.ok) return []
      const json = await res.json()

      return Array.isArray(json?.data) ? json.data : []
    } catch {
      return []
    }
  }

  const [blogs, classes] = await Promise.all([fetchJson(`${baseUrl}/blog/all?status=published`), fetchJson(`${baseUrl}/class/get-all?page=1&limit=100`)])

  return [
    ...blogs.filter((item) => item?.slug).map((item) => `/blog/${item.slug}`),
    ...classes.filter((item) => item?._id).map((item) => `/class/${item._id}`),
  ]
}

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  exclude: PRIVATE_PATHS,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/login', '/api'] },
      ...AI_USER_AGENTS.map((userAgent) => ({ userAgent, allow: '/', disallow: ['/admin', '/login', '/api'] })),
    ],
    additionalSitemaps: [`${SITE_URL}/sitemap.xml`],
  },
  transform: async (config, url) => ({
    loc: url,
    changefreq: url === '/' ? 'daily' : url.startsWith('/blog/') ? 'monthly' : 'weekly',
    priority: TOP_PRIORITY.includes(url) ? 1.0 : url.startsWith('/blog/') || url.startsWith('/class/') ? 0.8 : 0.7,
    lastmod: new Date().toISOString(),
  }),
  additionalPaths: async (config) => {
    const apiPaths = await readApiPaths()
    const paths = apiPaths.length > 0 ? apiPaths : readDemoPaths()

    return Promise.all([...new Set(paths)].map((loc) => config.transform(config, loc)))
  },
}
