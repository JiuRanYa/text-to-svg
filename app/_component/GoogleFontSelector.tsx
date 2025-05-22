"use client";
import { useEffect, useState, useMemo } from "react";
import { Label } from "@/core/ui/label";
import { Input } from "@/core/ui/input";

const GOOGLE_FONTS_API_KEY = "AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc";

export interface GoogleFontItem {
  family: string;
  menu: string;
  variants?: string[];
  files?: Record<string, string>;
}

interface GoogleFontSelectorProps {
  value: string;
  onChange: (font: GoogleFontItem | null) => void;
}

export function GoogleFontSelector({ value, onChange }: GoogleFontSelectorProps) {
  const [fontList, setFontList] = useState<GoogleFontItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFontList(data.items || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
        className="w-full p-2 border rounded-md bg-background"
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
