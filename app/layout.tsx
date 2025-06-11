import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
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
  description: 'Convert Google Fonts to SVG paths with customizable styles, stroke effects, and fill options. Perfect for web design, logo creation, and vector graphics.',
  verification: {
    google: '5GH1kG7yjme4OwP09VID_uU9sDBuXFo3H3D9NXrWWa8',
    other: {
      'baidu-site-verification': 'codeva-QJjg9btzMx'
    }
  },

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
    description: 'Convert Google Fonts to SVG paths with customizable styles, stroke effects, and fill options. Perfect for web design, logo creation, laser cutting, and vector graphics. Free online tool with instant preview.',
    url: 'https://text-to-svg.tool.tokyo/',
    siteName: 'Google Font to SVG Path',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Font to SVG Path Converter',
    description: 'Convert Google Fonts to SVG paths with customizable styles, stroke effects, and fill options. Perfect for web design, logo creation, laser cutting, and vector graphics. Free online tool with instant preview.'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YV1S58F05V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YV1S58F05V');
          `}
        </Script>
        <link rel="canonical" href="https://text-to-svg.tool.tokyo/"></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
