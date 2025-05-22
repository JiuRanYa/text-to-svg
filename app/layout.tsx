import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/core/ui/sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Text to SVG 在线转换工具 | 高质量 SVG 字体生成器',
  description: '免费在线将文本转换为 SVG 矢量图，支持多种字体和样式，适用于网页设计、Logo 制作等场景。',
  keywords: [
    'text to svg',
    '文本转SVG',
    'SVG生成器',
    '字体SVG',
    '在线工具',
    '矢量字体'
  ],
  authors: [{ name: 'Jiuran' }],
  creator: 'Jiuran',
  openGraph: {
    title: 'Text to SVG 在线转换工具',
    description: '免费在线将文本转换为 SVG 矢量图，支持多种字体和样式。',
    url: 'https://your-domain.com/',
    siteName: 'Text to SVG',
    locale: 'zh_CN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text to SVG 在线转换工具',
    description: '免费在线将文本转换为 SVG 矢量图，支持多种字体和样式。'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
