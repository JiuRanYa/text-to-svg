import { useState, useCallback } from 'react'
import { Button } from '@/core/ui/button'
import { toast } from 'sonner'
import opentype from 'opentype.js'
import { X } from 'lucide-react'

interface CustomFontUploaderProps {
  onFontLoaded: (font: opentype.Font, fileName: string) => void
  onFontRemoved: () => void
  currentFileName?: string
}

export function CustomFontUploader({ onFontLoaded, onFontRemoved, currentFileName }: CustomFontUploaderProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.name.match(/\.(ttf|otf)$/i)) {
      toast.error('Please upload a valid font file (.ttf or .otf)')
      return
    }

    setIsLoading(true)
    try {
      const arrayBuffer = await file.arrayBuffer()
      const font = opentype.parse(arrayBuffer)
      onFontLoaded(font, file.name)
      toast.success('Font loaded successfully')
    } catch (error) {
      console.error('Error loading font:', error)
      toast.error('Failed to load font')
    } finally {
      setIsLoading(false)
    }
  }, [onFontLoaded])

  if (currentFileName) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="flex-1 justify-start"
          disabled={isLoading}
        >
          <span className="truncate">{currentFileName}</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onFontRemoved}
          className="h-9 w-9"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="outline"
      disabled={isLoading}
      className="w-full"
      onClick={() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.ttf,.otf'
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0]
          if (file) {
            handleFileUpload(file)
          }
        }
        input.click()
      }}
    >
      {isLoading ? 'Loading...' : 'Upload Custom Font'}
    </Button>
  )
} 