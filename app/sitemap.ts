import { languages } from '@/core/i18n/config'
import { MetadataRoute } from 'next'

type ExtendedSitemapEntry = MetadataRoute.Sitemap[0] & {
  links?: Array<{
    lang: string;
    url: string;
  }>;
};

export default function sitemap(): Array<ExtendedSitemapEntry> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://text-to-svg.tool.tokyo'
  
  // 定义所有路由
  const routes = [
    { path: '', name: 'Home', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/tutorials', name: 'Tutorials', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/examples', name: 'Examples', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/sources', name: 'Sources', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/sanskrit-tattoo', name: 'Sanskrit Tattoo', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/about', name: 'About', priority: 0.8, changeFrequency: 'weekly' as const },
  ]

  const sitemapEntries: Array<ExtendedSitemapEntry> = []

  // 为每个路由生成所有语言版本
  routes.forEach((route) => {
    // 获取当前路由所有语言版本的 URL
    const languageUrls = Object.values(languages).map((lang) => ({
      lang: lang.code,
      url: `${baseUrl}/${lang.code}${route.path}`
    }))

    // 为每个语言版本创建一个 sitemap 条目
    languageUrls.forEach(({ lang, url }) => {
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        // 添加所有其他语言版本的引用
        links: languageUrls
          .filter((l) => l.lang !== lang) // 排除当前语言
          .map((l) => ({
            lang: l.lang,
            url: l.url
          }))
      })
    })
  })

  return sitemapEntries
} 