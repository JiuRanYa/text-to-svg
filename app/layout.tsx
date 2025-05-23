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
  title: 'Google Font to SVG Path Converter | Online Font Vector Generator',
  description: 'Free online tool to convert Google Fonts to SVG vector paths, supporting font variants, stroke, fill, and other parameters. Perfect for web design, logo creation, and laser cutting.',
  verification: {
    google: '5GH1kG7yjme4OwP09VID_uU9sDBuXFo3H3D9NXrWWa8',
    other: {
      'baidu-site-verification': 'codeva-QJjg9btzMx'
    }
  },
  keywords: [
    'google font to svg',
    'google font to path',
    'font to svg converter',
    'google font vector',
    'font to path converter',
    'svg path generator',
    'font vector generator',
    'google font svg path',
    'font to vector',
    'google font converter'
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
    title: 'Google Font to SVG Path Converter',
    description: 'Free online tool to convert Google Fonts to SVG vector paths, supporting font variants, stroke, fill, and other parameters.',
    url: 'https://text-to-svg.tool.tokyo/',
    siteName: 'Google Font to SVG Path',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Font to SVG Path Converter',
    description: 'Free online tool to convert Google Fonts to SVG vector paths, supporting font variants, stroke, fill, and other parameters.'
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
