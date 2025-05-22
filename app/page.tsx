"use client";

import { Input } from "@/core/ui/input";
import { Button } from "@/core/ui/button";
import { Textarea } from "@/core/ui/textarea";
import { Label } from "@/core/ui/label";
import { GoogleFontSelector, GoogleFontItem } from "./_component/GoogleFontSelector";
import { useState, useEffect, useMemo, useCallback } from "react";
import opentype from "opentype.js";
import makerjs from "makerjs";
import { Switch } from "@/core/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/ui/select";
import debounce from "lodash/debounce";

type FillRule = 'nonzero' | 'evenodd';

export default function Home() {
  const [selectedFont, setSelectedFont] = useState<GoogleFontItem | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>("regular");
  const [text, setText] = useState("ToolHub");
  const [fontSize, setFontSize] = useState(100);
  const [stroke, setStroke] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState("0.25mm");
  const [fill, setFill] = useState("#000000");
  const [svgPath, setSvgPath] = useState<string>("");
  const [loadingFont, setLoadingFont] = useState(false);
  const [currentFont, setCurrentFont] = useState<opentype.Font | null>(null);
  
  // 新增配置项
  const [union, setUnion] = useState(true);
  const [filled, setFilled] = useState(true);
  const [kerning, setKerning] = useState(true);
  const [separate, setSeparate] = useState(false);
  const [bezierAccuracy, setBezierAccuracy] = useState(0.5);
  const [fillRule, setFillRule] = useState<FillRule>("nonzero");
  const [dxfUnits, setDxfUnits] = useState("mm");

  // 使用 useMemo 缓存字体加载
  const fontUrl = useMemo(() => {
    if (!selectedFont) return null;
    if (selectedVariant && selectedFont.files && selectedFont.files[selectedVariant]) {
      return selectedFont.files[selectedVariant];
    }
    return selectedFont.menu;
  }, [selectedFont, selectedVariant]);

  // 使用 useCallback 和 debounce 优化字体加载
  const loadFont = useCallback(
    (url: string) => {
      opentype.load(url, (err: Error | null, font: opentype.Font | null) => {
        if (!err && font) {
          setCurrentFont(font);
        } else {
          setCurrentFont(null);
        }
      });
    },
    []
  );

  // 只在字体 URL 变化时加载字体
  useEffect(() => {
    if (!fontUrl) return;
    loadFont(fontUrl);
  }, [fontUrl, loadFont]);

  // 使用 useCallback 和 debounce 优化 SVG 生成
  const generateSvg = useCallback(
    debounce(() => {
      if (!currentFont || !text) {
        setSvgPath("");
        return;
      }
      
      try {
        // 使用 makerjs 生成文本模型
        const textModel = new makerjs.models.Text(
          currentFont,
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
        
        // 保存 DXF 数据到 data 属性
        const svgElement = document.createElement('div');
        svgElement.innerHTML = svg;
        svgElement.setAttribute('data-dxf', dxf);
        
        setSvgPath(svg);
      } catch (error) {
        console.error('Error generating SVG:', error);
        setSvgPath("");
      }
    }, 200),
    [currentFont, text, fontSize, union, filled, kerning, separate, bezierAccuracy, fill, stroke, strokeWidth, fillRule, dxfUnits]
  );

  // 监听所有可能影响 SVG 生成的参数变化
  useEffect(() => {
    if (!loadingFont) {
      generateSvg();
    }
  }, [generateSvg, loadingFont]);

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

  // 当 selectedFont 变化时，自动切换到 regular 变体
  useEffect(() => {
    if (!selectedFont) return;
    if (selectedFont.variants && selectedFont.variants.includes("regular")) {
      setSelectedVariant("regular");
    } else if (selectedFont.variants && selectedFont.variants.length > 0) {
      setSelectedVariant(selectedFont.variants[0]);
    }
  }, [selectedFont]);

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
                {selectedFont.variants?.map((variant: string) => (
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
