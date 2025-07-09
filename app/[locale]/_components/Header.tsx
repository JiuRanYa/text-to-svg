'use client'
import { usePathname } from '@/core/i18n/navigation'
import { cn } from '@/core/lib/utils'
import { Icons } from '@/core/ui/icons'
import { Button } from '@/core/ui/button'
import { Link } from '@/core/i18n/navigation'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from './LanguageSwitcher'

const navigation = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.tutorials', href: '/tutorials' },
  { name: 'nav.examples', href: '/examples' },
  { name: 'nav.fontSources', href: '/sources' },
  { name: 'nav.sanskritTattoo', href: '/sanskrit-tattoo' },
]

export function Header() {
  const pathname = usePathname()
  const t = useTranslations()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              {/* <Image src="/logo.svg" alt="Logo" width={182.307} height={22.939} className="h-8 w-auto" /> */}
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-foreground/80',
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-foreground/60'
                  )}
                >
                  {t(item.name)}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-2 border-l pl-6">
              <LanguageSwitcher />
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/JiuRanYa/text-to-svg"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.github />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://x.com/JiuRanYa_"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.twitter />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 