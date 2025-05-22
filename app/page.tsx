"use client";

import { Input } from "@/core/ui/input";
import { Button } from "@/core/ui/button";
import { Textarea } from "@/core/ui/textarea";
import { Label } from "@/core/ui/label";
import { GoogleFontSelector, GoogleFontItem } from "./_component/GoogleFontSelector";
import { useState, useEffect, useMemo } from "react";
import opentype from "opentype.js";

export default function Home() {
  const [selectedFont, setSelectedFont] = useState<GoogleFontItem | null>(null);
  const [text, setText] = useState("ToolHub");
  const [fontSize, setFontSize] = useState(100);
  const [stroke, setStroke] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState("0.25mm");
  const [fill, setFill] = useState("#000000");
  const [fontUrl, setFontUrl] = useState<string | null>(null);
  const [svgPath, setSvgPath] = useState<string>("");
  const [svgViewBox, setSvgViewBox] = useState<string>("0 0 300 150");
  const [loadingFont, setLoadingFont] = useState(false);

  // 1. 直接用 menu 字段作为字体文件 URL
  useEffect(() => {
    if (!selectedFont || !selectedFont.menu) return;
    setFontUrl(selectedFont.menu);
  }, [selectedFont]);

  // 2. 用 opentype.js 生成 path
  useEffect(() => {
    if (!fontUrl || !text) {
      setSvgPath("");
      return;
    }
    setLoadingFont(true);
    opentype.load(fontUrl, (err, font) => {
      setLoadingFont(false);
      if (err || !font) {
        setSvgPath("");
        return;
      }
      // 生成 path
      const path = font.getPath(text, 0, fontSize, fontSize);
      const { x1, y1, x2, y2 } = path.getBoundingBox();
      setSvgViewBox(`${x1} ${y1} ${x2 - x1} ${y2 - y1}`);
      setSvgPath(path.toPathData());
    });
  }, [fontUrl, text, fontSize]);

  // 3. 生成 SVG 字符串
  const svgString = useMemo(() => {
    if (!svgPath) return "";
    return `<svg width="${fontSize * text.length}" height="${fontSize * 1.5}" viewBox="${svgViewBox}" xmlns="http://www.w3.org/2000/svg">
  <path d="${svgPath}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />
</svg>`;
  }, [svgPath, svgViewBox, fontSize, fill, stroke, strokeWidth, text.length]);

  return (
    <div className="flex min-h-screen">
      {/* 左侧配置区 */}
      <aside className="w-full max-w-sm bg-muted p-6 flex flex-col gap-4 border-r">
        <h2 className="text-lg font-bold mb-2">配置</h2>
        <GoogleFontSelector value={selectedFont?.family || ""} onChange={setSelectedFont} />
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
            {loadingFont ? <span className="text-gray-400">字体加载中...</span> : (
              svgString ? <div dangerouslySetInnerHTML={{ __html: svgString }} /> : <span className="text-gray-400">请输入内容</span>
            )}
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
