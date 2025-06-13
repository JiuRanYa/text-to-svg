'use client'

import { usePathname } from 'next/navigation'

export function CanonicalLink() {
  const pathname = usePathname()
  
  // 如果是主路由，不显示 canonical 标签
  if (pathname === '/') {
    return null
  }

  // 生成完整的 canonical URL
  const canonicalUrl = `https://text-to-svg.tool.tokyo${pathname}`
  
  return (
    <link rel="canonical" href={canonicalUrl} />
  )
} 