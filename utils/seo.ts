import { SITE_CONFIG } from '@/config/site'
import { ROUTES } from '@/constants/routes'

// Turn an internal path (or an already absolute URL) into an absolute URL for structured data
export const absoluteUrl = (path = '/') => (path.startsWith('http') ? path : `${SITE_CONFIG.url}${path.startsWith('/') ? path : `/${path}`}`)

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: SITE_CONFIG.business.streetAddress,
  addressLocality: SITE_CONFIG.business.addressLocality,
  addressRegion: SITE_CONFIG.business.addressRegion,
  postalCode: SITE_CONFIG.business.postalCode,
  addressCountry: SITE_CONFIG.business.addressCountry,
}

// The centre itself: both a school and a local business, so it can win the local pack and the knowledge panel
export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  '@id': `${SITE_CONFIG.url}/#organization`,
  name: SITE_CONFIG.business.name,
  alternateName: SITE_CONFIG.shortName,
  url: SITE_CONFIG.url,
  logo: absoluteUrl(SITE_CONFIG.logo),
  image: absoluteUrl(SITE_CONFIG.thumbnail),
  description: SITE_CONFIG.description,
  telephone: SITE_CONFIG.business.phone,
  email: SITE_CONFIG.business.email,
  priceRange: SITE_CONFIG.business.priceRange,
  openingHours: SITE_CONFIG.business.openingHours,
  address: postalAddress,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE_CONFIG.business.latitude,
    longitude: SITE_CONFIG.business.longitude,
  },
  areaServed: SITE_CONFIG.business.areaServed.map((name) => ({ '@type': 'Place', name })),
  sameAs: [...SITE_CONFIG.business.sameAs],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE_CONFIG.business.phone,
    email: SITE_CONFIG.business.email,
    contactType: 'customer service',
    availableLanguage: ['vi'],
  },
})

// Site-level entity + the search action Google uses for sitelinks search box
export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_CONFIG.url}/#website`,
  url: SITE_CONFIG.url,
  name: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  inLanguage: SITE_CONFIG.lang,
  publisher: { '@id': `${SITE_CONFIG.url}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_CONFIG.url}${ROUTES.blog}?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
})

export type BreadcrumbItem = { name: string; path?: string }

// Breadcrumb trail, always rooted at the home page
export const breadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: SITE_CONFIG.shortName, path: ROUTES.home }, ...items].map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    ...(item.path ? { item: absoluteUrl(item.path) } : {}),
  })),
})

export type ArticleSchemaInput = {
  title: string
  slug: string
  description?: string
  thumbnail?: string
  author?: string
  createdAt?: string
  updatedAt?: string
  tags?: string[]
}

// Blog post markup so posts can show as rich results / be cited by AI answers
export const articleSchema = (post: ArticleSchemaInput) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': absoluteUrl(ROUTES.blogDetail(post.slug)),
  mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(ROUTES.blogDetail(post.slug)) },
  headline: post.title,
  description: post.description,
  image: absoluteUrl(post.thumbnail || SITE_CONFIG.thumbnail),
  datePublished: post.createdAt,
  dateModified: post.updatedAt || post.createdAt,
  inLanguage: SITE_CONFIG.lang,
  keywords: post.tags?.join(', '),
  author: { '@type': 'Person', name: post.author || SITE_CONFIG.business.name },
  publisher: { '@id': `${SITE_CONFIG.url}/#organization` },
})

export type CourseSchemaInput = {
  id: string
  name: string
  description?: string
  image?: string
  price?: number
  ageRange?: string
  duration?: string
}

// Course markup for a class detail page
export const courseSchema = (item: CourseSchemaInput) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  '@id': absoluteUrl(ROUTES.classDetail(item.id)),
  name: item.name,
  description: item.description,
  image: absoluteUrl(item.image || SITE_CONFIG.thumbnail),
  inLanguage: SITE_CONFIG.lang,
  typicalAgeRange: item.ageRange,
  provider: { '@id': `${SITE_CONFIG.url}/#organization` },
  ...(item.price
    ? {
        offers: {
          '@type': 'Offer',
          price: item.price,
          priceCurrency: 'VND',
          category: 'Tuition',
          availability: 'https://schema.org/InStock',
          url: absoluteUrl(ROUTES.classDetail(item.id)),
        },
      }
    : {}),
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'onsite',
    courseWorkload: item.duration,
    location: { '@type': 'Place', name: SITE_CONFIG.business.name, address: postalAddress },
  },
})

// FAQ markup; Google only renders it when the answers are visible on the page
export const faqSchema = (items: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
})
