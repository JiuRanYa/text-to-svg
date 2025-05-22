'use client'

import { Input } from '@/core/ui/input'
import { Button } from '@/core/ui/button'
import { Textarea } from '@/core/ui/textarea'
import { Label } from '@/core/ui/label'
import { GoogleFontSelector, GoogleFontItem } from './_component/GoogleFontSelector'
import { useState, useEffect, useMemo, useCallback } from 'react'
import opentype from 'opentype.js'
import makerjs from 'makerjs'
import { Switch } from '@/core/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/core/ui/select'
import debounce from 'lodash/debounce'
import { toast } from 'sonner'

type FillRule = 'nonzero' | 'evenodd';

export default function Home() {
  const [selectedFont, setSelectedFont] = useState<GoogleFontItem | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<string>('regular')
  const [text, setText] = useState('ToolHub')
  const [fontSize, setFontSize] = useState(50)
  const [stroke, setStroke] = useState('#000000')
  const [strokeWidth, setStrokeWidth] = useState('0.25mm')
  const [fill, setFill] = useState('#000000')
  const [svgPath, setSvgPath] = useState<string>('')
  const [loadingFont] = useState(false)
  const [currentFont, setCurrentFont] = useState<opentype.Font | null>(null)
  
  // 新增配置项
  const [union, setUnion] = useState(true)
  const [filled, setFilled] = useState(true)
  const [kerning, setKerning] = useState(true)
  const [separate, setSeparate] = useState(false)
  const [bezierAccuracy, setBezierAccuracy] = useState(0.5)
  const [fillRule, setFillRule] = useState<FillRule>('evenodd')
  const [dxfUnits, setDxfUnits] = useState('mm')

  const [fontList, setFontList] = useState<GoogleFontItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const recommendFonts = [
    'Protest Riot',
    'Oooh Baby', 
    'Pacifico', 
    'Sofadi One',
    'Sonsie One',
    'Risque',
    'Romanesco', 
    'Poppins',
  ]

  const recommendTextFonts = [
    'Roboto',
    'Arial',
    'Helvetica',
    'Verdana',
  ]
  // 使用 useMemo 缓存字体加载
  const fontUrl = useMemo(() => {
    if (!selectedFont) return null
    if (selectedVariant && selectedFont.files && selectedFont.files[selectedVariant]) {
      return selectedFont.files[selectedVariant]
    }
    return selectedFont.menu
  }, [selectedFont, selectedVariant])

  // 使用 useCallback 和 debounce 优化字体加载
  const loadFont = useCallback(
    (url: string) => {
      opentype.load(url, (err: Error | null, font: opentype.Font | null) => {
        if (!err && font) {
          setCurrentFont(font)
        } else {
          setCurrentFont(null)
        }
      })
    },
    []
  )

  // 只在字体 URL 变化时加载字体
  useEffect(() => {
    if (!fontUrl) return
    loadFont(fontUrl)
  }, [fontUrl, loadFont])

  // 使用 useCallback 和 debounce 优化 SVG 生成
  const generateSvg = useCallback(
    debounce(() => {
      if (!currentFont || !text) {
        setSvgPath('')
        return
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
        )
        
        if (separate) {
          for (const i in textModel.models) {
            textModel.models[i].layer = i
          }
        }
        
        // 生成 SVG
        const svg = makerjs.exporter.toSVG(textModel, {
          fill: filled ? fill : undefined,
          stroke: stroke,
          strokeWidth: strokeWidth,
          fillRule: fillRule,
          scalingStroke: true,
        })
        
        // 生成 DXF
        const dxf = makerjs.exporter.toDXF(textModel, { 
          units: dxfUnits,
          usePOLYLINE: true 
        })
        
        // 保存 DXF 数据到 data 属性
        const svgElement = document.createElement('div')
        svgElement.innerHTML = svg
        svgElement.setAttribute('data-dxf', dxf)
        
        setSvgPath(svg)
      } catch (error) {
        console.error('Error generating SVG:', error)
        setSvgPath('')
      }
    }, 200),
    [currentFont, text, fontSize, union, filled, kerning, separate, bezierAccuracy, fill, stroke, strokeWidth, fillRule, dxfUnits]
  )

  // 监听所有可能影响 SVG 生成的参数变化
  useEffect(() => {
    if (!loadingFont) {
      generateSvg()
    }
  }, [generateSvg, loadingFont])

  // 3. 生成 SVG 字符串
  const svgString = useMemo(() => {
    if (!svgPath) return ''
    return svgPath
  }, [svgPath])

  const downloadDxf = () => {
    const svgElement = document.createElement('div')
    svgElement.innerHTML = svgPath
    const dxfData = svgElement.getAttribute('data-dxf')
    if (!dxfData) return

    const blob = new Blob([dxfData], { type: 'application/dxf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${text}.dxf`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('DXF 文件下载成功')
  }

  // 当 selectedFont 变化时，自动切换到 regular 变体
  useEffect(() => {
    if (!selectedFont) return
    if (selectedFont.variants && selectedFont.variants.includes('regular')) {
      setSelectedVariant('regular')
    } else if (selectedFont.variants && selectedFont.variants.length > 0) {
      setSelectedVariant(selectedFont.variants[0])
    }
  }, [selectedFont])

  useEffect(() => {
    setIsLoading(true)
    fetch(
      'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc'
    )
      .then((res) => res.json())
      .then((data) => {
        setFontList(data.items || [])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const filteredFonts = useMemo(() => {
    return fontList
      .filter(font => 
        font.family.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.family.localeCompare(b.family))
  }, [fontList, searchTerm])

  return (
    <div className="flex min-h-screen">
      {/* 左侧配置区 */}
      <aside className="w-full max-w-sm bg-muted p-6 flex flex-col gap-4 border-r">
        <h2 className="text-lg font-bold mb-2">配置</h2>
        <GoogleFontSelector 
          value={selectedFont?.family || ''} 
          onChange={setSelectedFont}
          fontList={fontList}
          isLoading={isLoading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        
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

        
        <div className="flex flex-col gap-6 my-2">
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
      <main className="flex-1 flex flex-col items-center justify-start p-8 gap-8">
        {/* 标题行：SVG预览 和 SVG代码 */}
        <div className="w-full max-w-5xl flex flex-row gap-6 mb-1">
          <div className="flex-1 flex items-center">
            <h2 className="text-lg font-bold mb-0">SVG 预览</h2>
          </div>
          <div className="flex-1 flex items-center">
            <h2 className="text-lg font-bold mb-0">SVG 代码</h2>
          </div>
        </div>
        {/* 上区块：SVG预览和代码 */}
        <div className="w-full max-w-5xl flex flex-row gap-6">
          {/* SVG 预览 */}
          <div className="flex-1 bg-white border rounded-lg h-48 flex items-center justify-center overflow-auto shadow-sm">
            {loadingFont ? <span className="text-gray-400">字体加载中...</span> : (
              svgString ? <div dangerouslySetInnerHTML={{ __html: svgString }} /> : <span className="text-gray-400">请输入内容</span>
            )}
          </div>
          {/* SVG 代码 */}
          <div className="flex-1 flex flex-col gap-2">
            <Textarea id="svg-code" className="w-full h-48 rounded" readOnly value={svgString} />
          </div>
        </div>
        {/* 操作按钮 */}
        <div className="w-full max-w-5xl flex flex-row gap-2 justify-end">
          <Button variant="outline" onClick={() => {
            navigator.clipboard.writeText(svgString)
            toast.success('SVG 代码已复制到剪贴板')
          }}>复制代码</Button>
          <Button onClick={() => {
            const blob = new Blob([svgString], { type: 'image/svg+xml' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'text.svg'
            a.click()
            URL.revokeObjectURL(url)
            toast.success('SVG 文件下载成功')
          }}>下载 SVG</Button>
          <Button variant="outline" onClick={downloadDxf}>下载 DXF</Button>
        </div>
        {/* 推荐字体区 */}
        <div className="w-full max-w-5xl mt-6 bg-gray-50 border rounded-lg p-4 shadow-sm">
          <h3 className="text-base font-semibold mb-3">推荐网站 Logo 字体</h3>
          <div className="flex flex-wrap gap-3 mb-6">
            {recommendFonts.map(family => (
              <button
                key={family}
                className={'px-4 py-2 rounded border hover:bg-muted transition font-bold'}
                style={{ fontFamily: family, background: selectedFont?.family === family ? '#e0e7ff' : undefined }}
                onClick={() => {
                  const fontObj = fontList.find(f => f.family === family)
                  if (fontObj) setSelectedFont(fontObj)
                }}
              >
                {family}
              </button>
            ))}
          </div>
          <h3 className="text-base font-semibold mb-3">推荐文本字体</h3>
          <div className="flex flex-wrap gap-3">
            {recommendTextFonts.map(family => (
              <button
                key={family}
                className={'px-4 py-2 rounded border hover:bg-muted transition font-bold'}
                style={{ fontFamily: family, background: selectedFont?.family === family ? '#e0e7ff' : undefined }}
                onClick={() => {
                  const fontObj = fontList.find(f => f.family === family)
                  if (fontObj) setSelectedFont(fontObj)
                }}
              >
                {family}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
