'use client'
import { useMemo } from 'react'
import { Label } from '@/core/ui/label'

export interface GoogleFontItem {
  family: string;
  menu: string;
  variants?: string[];
  files?: Record<string, string>;
}

export interface GoogleFontSelectorProps {
  value: string;
  onChange: (font: GoogleFontItem | null) => void;
  fontList: GoogleFontItem[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
}

export function GoogleFontSelector({ value, onChange, fontList, isLoading, searchTerm, setSearchTerm }: GoogleFontSelectorProps) {
  const filteredFonts = useMemo(() => {
    return fontList
      .filter(font => 
        font.family.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.family.localeCompare(b.family))
  }, [fontList, searchTerm])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Label htmlFor="google-font">
          Google Font
        </Label>
        <span className="text-xs text-gray-500">
          (View all on {' '}
          <a
            href="https://fonts.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline"
          >
            Google Font
          </a>
          ）
        </span>
      </div>
      <select
        id="google-font"
        value={value}
        onChange={(e) => {
          const font = fontList.find((f) => f.family === e.target.value) || null
          onChange(font)
        }}
        disabled={isLoading}
        className="w-full p-2 border rounded-md text-sm"
        style={{ fontFamily: value }}
      >
        <option value="">{isLoading ? '加载中...' : '请选择字体'}</option>
        {filteredFonts.map((font) => (
          <option 
            key={font.family} 
            value={font.family}
            style={{ fontFamily: font.family }}
          >
            {font.family}
          </option>
        ))}
      </select>
    </div>
  )
}
