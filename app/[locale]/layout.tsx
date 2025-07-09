import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Toaster } from '@/core/ui/sonner'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { routing } from '@/core/i18n/routing'
import { notFound } from 'next/navigation'
import { languages } from '@/core/i18n/config'
import { getTranslations } from 'next-intl/server'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}

export async function generateMetadata({ params }: RootLayoutProps): Promise<Metadata> {
  const resolvedParams = await params
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'metadata' })
  const baseUrl = 'https://text-to-svg.tool.tokyo'
  const path = resolvedParams.locale ? `/${resolvedParams.locale}` : ''
  
  // 始终生成 canonical URL，包括主路由
  const canonicalUrl = `${baseUrl}${path}`
  
  // 生成语言替代链接
  const alternateLanguages = Object.keys(languages).reduce((acc, lang) => {
    acc[lang] = `${baseUrl}/${lang}`
    return acc
  }, {} as Record<string, string>)
  
  return {
    title: t('title'),
    description: t('description'),
    verification: {
      google: '5GH1kG7yjme4OwP09VID_uU9sDBuXFo3H3D9NXrWWa8',
      other: {
        'baidu-site-verification': 'codeva-QJjg9btzMx'
      }
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages
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
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: canonicalUrl,
      siteName: t('ogTitle'),
      locale: languages[resolvedParams.locale].ogLocale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription')
    }
  }
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const {locale} = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  return (
    <html lang={locale}>
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
