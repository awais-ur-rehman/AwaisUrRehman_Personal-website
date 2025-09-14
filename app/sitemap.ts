import type { MetadataRoute } from 'next'
import { WEBSITE_URL } from '@/lib/constants'
import { BLOG_POSTS } from '@/app/data'

export default function sitemap(): MetadataRoute.Sitemap {
    const base = WEBSITE_URL
    const now = new Date().toISOString()

    return [
        {
            url: `${base}/`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...BLOG_POSTS.map((post) => ({
            url: `${base}${post.link}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        })),
    ]
}


