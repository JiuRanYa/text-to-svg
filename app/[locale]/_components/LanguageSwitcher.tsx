import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/core/i18n/navigation'
import { Button } from '@/core/ui/button'
import { Languages } from 'lucide-react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'zh' : 'en'
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={switchLocale}
      className="w-9 px-0"
    >
      <Languages className="h-4 w-4" />
    </Button>
  )
} 