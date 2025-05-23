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
  title: 'Text to SVG Online Converter | High Quality SVG Font Generator',
  description: 'Free online tool to convert text to SVG vector graphics, supporting multiple fonts and styles, perfect for web design, logo creation, and more.',
  verification: {
    google: '5GH1kG7yjme4OwP09VID_uU9sDBuXFo3H3D9NXrWWa8',
    other: {
      'baidu-site-verification': 'codeva-QJjg9btzMx'
    }
  },
  keywords: [
    'text to svg',
    'google font to svg',
    'svg converter',
    'svg generator',
    'font to svg',
    'online tool',
    'vector font'
  ],
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
        type: 'image/png'
      },
    ],
    apple: {
      url: '/favicon.ico',
      sizes: '180x180',
      type: 'image/png'
    },
    other: [
      {
        rel: 'android-chrome',
        url: '/favicon.ico',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        rel: 'android-chrome',
        url: '/favicon.ico',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  authors: [{ name: 'Jiuran' }],
  creator: 'Jiuran',
  openGraph: {
    title: 'Text to SVG Online Converter',
    description: 'Free online tool to convert text to SVG vector graphics, supporting multiple fonts and styles.',
    url: 'https://text-to-svg.tool.tokyo/',
    siteName: 'Text to SVG',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text to SVG Online Converter',
    description: 'Free online tool to convert text to SVG vector graphics, supporting multiple fonts and styles.'
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
