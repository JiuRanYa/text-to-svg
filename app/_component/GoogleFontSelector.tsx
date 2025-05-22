"use client";
import { useMemo } from "react";
import { Label } from "@/core/ui/label";
import { Input } from "@/core/ui/input";

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
      .sort((a, b) => a.family.localeCompare(b.family));
  }, [fontList, searchTerm]);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="google-font">Google Font</Label>
      <select
        id="google-font"
        value={value}
        onChange={(e) => {
          const font = fontList.find((f) => f.family === e.target.value) || null;
          onChange(font);
        }}
        disabled={isLoading}
        className="w-full p-2 border rounded-md"
        style={{ fontFamily: value }}
      >
        <option value="">{isLoading ? "加载中..." : "请选择字体"}</option>
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
  );
}
