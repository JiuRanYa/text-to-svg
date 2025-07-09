import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://text-to-svg.tool.tokyo'

  return {
    // 允许所有爬虫访问
    rules: {
      userAgent: '*',
      allow: '/',
      // 禁止爬虫访问的路径
      disallow: [
        '/api/', // API路径
        '/admin/', // 管理后台路径
        '/_next/', // Next.js内部路径
        '/_vercel/', // Vercel内部路径
        '/static/images/', // 静态资源路径
      ],
    },
    // 添加站点地图
    sitemap: `${baseUrl}/sitemap.xml`,
    // 添加主机名
    host: baseUrl,
  }
} 