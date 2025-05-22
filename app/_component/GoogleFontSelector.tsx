"use client";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/ui/select";
import { Label } from "@/core/ui/label";

const GOOGLE_FONTS_API_KEY = "AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc";

export interface GoogleFontItem {
  family: string;
  menu: string;
  [key: string]: any;
}

interface GoogleFontSelectorProps {
  value: string;
  onChange: (font: GoogleFontItem | null) => void;
}

export function GoogleFontSelector({ value, onChange }: GoogleFontSelectorProps) {
  const [fontList, setFontList] = useState<GoogleFontItem[]>([]);

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFontList(data.items || []);
      });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="google-font">Google Font</Label>
      <Select
        value={value}
        onValueChange={(family) => {
          const font = fontList.find((f) => f.family === family) || null;
          onChange(font);
        }}
      >
        <SelectTrigger id="google-font">
          <SelectValue placeholder="请选择字体" />
        </SelectTrigger>
        <SelectContent>
          {fontList.map((font) => (
            <SelectItem key={font.family} value={font.family}>
              {font.family}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
