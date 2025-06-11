'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface InnerPageLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  keyword: string
}

export function InnerPageLayout({ children, title, description, keyword }: InnerPageLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          title={keyword}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {keyword}
        </Link>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground mb-8">{description}</p>
        {children}
      </div>
    </div>
  )
} 