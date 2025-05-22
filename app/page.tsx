"use client";

import { Input } from "@/core/ui/input";
import { Button } from "@/core/ui/button";
import { Textarea } from "@/core/ui/textarea";
import { Label } from "@/core/ui/label";
import { GoogleFontSelector } from "./_component/GoogleFontSelector";
import { useState, useEffect, useMemo } from "react";

export default function Home() {
  const [selectedFont, setSelectedFont] = useState("");
  const [text, setText] = useState("ToolHub");
  const [fontSize, setFontSize] = useState(100);
  const [stroke, setStroke] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState("0.25mm");
  const [fill, setFill] = useState("#000000");

  // 动态注入 Google Font
  useEffect(() => {
    if (!selectedFont) return;
    const fontName = selectedFont.replace(/ /g, "+");
    const linkId = "google-font-link";
    let link = document.getElementById(linkId) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css?family=${fontName}:400,700&display=swap`;
    return () => {
      if (link) link.remove();
    };
  }, [selectedFont]);

  // 生成SVG字符串
  const svgString = useMemo(() => {
    const fontFamily = selectedFont ? `'${selectedFont}', sans-serif` : 'sans-serif';
    const width = text.length * fontSize * 0.7 + 40;
    const height = fontSize * 1.5;
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <text x="50%" y="50%" font-family="${fontFamily}" font-size="${fontSize}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;
  }, [selectedFont, text, fontSize, stroke, strokeWidth, fill]);

  return (
    <div className="flex min-h-screen">
      {/* 左侧配置区 */}
      <aside className="w-full max-w-sm bg-muted p-6 flex flex-col gap-4 border-r">
        <h2 className="text-lg font-bold mb-2">配置</h2>
        <GoogleFontSelector value={selectedFont} onChange={setSelectedFont} />
        <div className="flex flex-col gap-2">
          <Label htmlFor="text">文本</Label>
          <Input id="text" value={text} onChange={e => setText(e.target.value)} placeholder="请输入要转换的文字" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="size">字号</Label>
          <Input id="size" type="number" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="stroke">描边颜色</Label>
          <Input id="stroke" type="color" value={stroke} onChange={e => setStroke(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="stroke-width">描边宽度</Label>
          <Input id="stroke-width" type="text" value={strokeWidth} onChange={e => setStrokeWidth(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="fill">填充颜色</Label>
          <Input id="fill" type="color" value={fill} onChange={e => setFill(e.target.value)} />
        </div>
      </aside>
      {/* 右侧预览区 */}
      <main className="flex-1 flex flex-col items-center justify-start p-8 gap-6">
        <h2 className="text-lg font-bold mb-2">SVG 预览</h2>
        <div className="w-full flex flex-col items-center gap-4">
          {/* SVG 预览 */}
          <div className="bg-white border rounded w-full max-w-xl h-40 flex items-center justify-center overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: svgString }} />
          </div>
          <Label htmlFor="svg-code">SVG 代码</Label>
          <Textarea id="svg-code" className="w-full max-w-xl h-40" readOnly value={svgString} />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {navigator.clipboard.writeText(svgString)}}>复制代码</Button>
            <Button onClick={() => {
              const blob = new Blob([svgString], { type: 'image/svg+xml' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'text.svg';
              a.click();
              URL.revokeObjectURL(url);
            }}>下载 SVG</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
