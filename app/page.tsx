"use client";

import { Input } from "@/core/ui/input";
import { Button } from "@/core/ui/button";
import { Textarea } from "@/core/ui/textarea";
import { Label } from "@/core/ui/label";
import { GoogleFontSelector, GoogleFontItem } from "./_component/GoogleFontSelector";
import { useState, useEffect, useMemo } from "react";
import opentype from "opentype.js";
import makerjs from "makerjs";
import { Switch } from "@/core/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/ui/select";

type FillRule = 'nonzero' | 'evenodd';

export default function Home() {
  const [selectedFont, setSelectedFont] = useState<GoogleFontItem | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [text, setText] = useState("ToolHub");
  const [fontSize, setFontSize] = useState(100);
  const [stroke, setStroke] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState("0.25mm");
  const [fill, setFill] = useState("#000000");
  const [fontUrl, setFontUrl] = useState<string | null>(null);
  const [svgPath, setSvgPath] = useState<string>("");
  const [svgViewBox, setSvgViewBox] = useState<string>("0 0 300 150");
  const [loadingFont, setLoadingFont] = useState(false);
  
  // 新增配置项
  const [union, setUnion] = useState(true);
  const [filled, setFilled] = useState(true);
  const [kerning, setKerning] = useState(true);
  const [separate, setSeparate] = useState(false);
  const [bezierAccuracy, setBezierAccuracy] = useState(0.5);
  const [fillRule, setFillRule] = useState<FillRule>("nonzero");
  const [dxfUnits, setDxfUnits] = useState("mm");

  // 1. 直接用 menu 字段作为字体文件 URL
  useEffect(() => {
    if (!selectedFont || !selectedFont.menu) return;
    setFontUrl(selectedFont.menu);
  }, [selectedFont]);

  // 2. 用 makerjs 生成 SVG
  useEffect(() => {
    if (!fontUrl || !text) {
      setSvgPath("");
      return;
    }
    setLoadingFont(true);
    opentype.load(fontUrl, (err: Error | null, font: opentype.Font | null) => {
      setLoadingFont(false);
      if (err || !font) {
        setSvgPath("");
        return;
      }

      // 使用 makerjs 生成文本模型
      const textModel = new makerjs.models.Text(
        font,
        text,
        fontSize,
        union,
        false,
        bezierAccuracy,
        { kerning }
      );

      if (separate) {
        for (const i in textModel.models) {
          textModel.models[i].layer = i;
        }
      }

      // 生成 SVG
      const svg = makerjs.exporter.toSVG(textModel, {
        fill: filled ? fill : undefined,
        stroke: stroke,
        strokeWidth: strokeWidth,
        fillRule: fillRule,
        scalingStroke: true,
      });

      // 生成 DXF
      const dxf = makerjs.exporter.toDXF(textModel, { 
        units: dxfUnits,
        usePOLYLINE: true 
      });

      setSvgPath(svg);
      // 保存 DXF 数据到 data 属性
      const svgElement = document.createElement('div');
      svgElement.innerHTML = svg;
      svgElement.setAttribute('data-dxf', dxf);
      setSvgViewBox(svgElement.getAttribute('viewBox') || "0 0 300 150");
    });
  }, [fontUrl, text, fontSize, union, filled, kerning, separate, bezierAccuracy, fill, stroke, strokeWidth, fillRule]);

  // 3. 生成 SVG 字符串
  const svgString = useMemo(() => {
    if (!svgPath) return "";
    return svgPath;
  }, [svgPath]);

  const downloadDxf = () => {
    const svgElement = document.createElement('div');
    svgElement.innerHTML = svgPath;
    const dxfData = svgElement.getAttribute('data-dxf');
    if (!dxfData) return;

    const blob = new Blob([dxfData], { type: 'application/dxf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${text}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen">
      {/* 左侧配置区 */}
      <aside className="w-full max-w-sm bg-muted p-6 flex flex-col gap-4 border-r">
        <h2 className="text-lg font-bold mb-2">配置</h2>
        <GoogleFontSelector value={selectedFont?.family || ""} onChange={setSelectedFont} />
        
        {selectedFont && (
          <div className="flex flex-col gap-2">
            <Label>字体变体</Label>
            <Select value={selectedVariant} onValueChange={setSelectedVariant}>
              <SelectTrigger>
                <SelectValue placeholder="选择字体变体" />
              </SelectTrigger>
              <SelectContent>
                {selectedFont.variants?.map((variant) => (
                  <SelectItem key={variant} value={variant}>
                    {variant}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="text">文本</Label>
          <Input id="text" value={text} onChange={e => setText(e.target.value)} placeholder="请输入要转换的文字" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="size">字号</Label>
          <Input id="size" type="number" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="union">合并路径</Label>
          <Switch id="union" checked={union} onCheckedChange={setUnion} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="filled">填充</Label>
          <Switch id="filled" checked={filled} onCheckedChange={setFilled} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="kerning">字距调整</Label>
          <Switch id="kerning" checked={kerning} onCheckedChange={setKerning} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="separate">分离路径</Label>
          <Switch id="separate" checked={separate} onCheckedChange={setSeparate} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="bezier-accuracy">贝塞尔曲线精度</Label>
          <Input 
            id="bezier-accuracy" 
            type="number" 
            step="0.1"
            min="0.1"
            max="1"
            value={bezierAccuracy} 
            onChange={e => setBezierAccuracy(Number(e.target.value))} 
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="fill-rule">填充规则</Label>
          <Select value={fillRule} onValueChange={(value: FillRule) => setFillRule(value)}>
            <SelectTrigger>
              <SelectValue placeholder="选择填充规则" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nonzero">nonzero</SelectItem>
              <SelectItem value="evenodd">evenodd</SelectItem>
            </SelectContent>
          </Select>
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

        <div className="flex flex-col gap-2">
          <Label htmlFor="dxf-units">DXF 单位</Label>
          <Select value={dxfUnits} onValueChange={setDxfUnits}>
            <SelectTrigger>
              <SelectValue placeholder="选择单位" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(makerjs.unitType).map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            <Button variant="outline" onClick={downloadDxf}>下载 DXF</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
