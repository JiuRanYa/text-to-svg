'use client'

import Image from 'next/image'
import { Input } from '@/core/ui/input'
import { Button } from '@/core/ui/button'
import { Textarea } from '@/core/ui/textarea'
import { Label } from '@/core/ui/label'
import { GoogleFontSelector, GoogleFontItem } from './_components/GoogleFontSelector'
import { useState, useEffect, useMemo, useCallback } from 'react'
import opentype from 'opentype.js'
import makerjs from 'makerjs'
import { Switch } from '@/core/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/core/ui/select'
import debounce from 'lodash/debounce'
import { toast } from 'sonner'
import { ScrollArea } from '@/core/ui/scroll-area'
import { CustomFontUploader } from './_components/CustomFontUploader'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/core/ui/sheet'
import { Menu } from 'lucide-react'
import { Header } from './_components/Header'
import { useTranslations } from 'next-intl'

type FillRule = 'nonzero' | 'evenodd';

export default function Home() {
  const t = useTranslations()
  const [selectedFont, setSelectedFont] = useState<GoogleFontItem | null>({
    family: 'Mea Culpa',
    variants: ['regular'],
    files: {
      regular: 'https://fonts.gstatic.com/s/meaculpa/v6/AMOTz4GcuWbEIuza8jsZms0QW3mqyg.ttf'
    },
    menu: 'https://fonts.gstatic.com/s/meaculpa/v6/AMOTz4GcuWbEIuza8jsZms0QW3mqyg.ttf'
  })
  const [selectedVariant, setSelectedVariant] = useState<string>('regular')
  const [text, setText] = useState('Nexus')
  const [fontSize, setFontSize] = useState(50)
  const [stroke, setStroke] = useState('#000000')
  const [strokeWidth, setStrokeWidth] = useState('0.25mm')
  const [fill, setFill] = useState('#000000')
  const [svgPath, setSvgPath] = useState<string>('')
  const [dxfPath, setDxfPath] = useState<string>('')
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

  // 动画相关状态
  const [animationEnabled, setAnimationEnabled] = useState(false)
  const [animationType, setAnimationType] = useState('signature')
  const [animationSpeed, setAnimationSpeed] = useState('normal')
  const [animationPaused, setAnimationPaused] = useState(false)

  // 动画配置
  const animationConfigs = {
    signature: {
      duration: {
        slow: '6s',
        normal: '3s',
        fast: '1.5s'
      },
      css: (speedDuration: string, playState: string, fillColor: string) => `
        .animated-svg path {
          stroke-dasharray: 2400;
          stroke-dashoffset: 2400;
          fill: transparent;
          animation: drawSignature ${speedDuration} linear infinite both;
          animation-play-state: ${playState};
          stroke-width: 2px;
          stroke: ${fillColor};
        }
        @keyframes drawSignature {
          0% { stroke-dashoffset: 2400; }
          10% { fill: transparent; }
          25%, 85% { stroke-dashoffset: 0; fill: ${fillColor}; }
          95%, to { stroke-dashoffset: 2400; fill: transparent; }
        }
      `
    },
    draw: {
      duration: {
        slow: '6s',
        normal: '3s',
        fast: '1.5s'
      },
      css: (speedDuration: string, playState: string, fillColor: string) => `
        .animated-svg path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          stroke: ${fillColor};
          animation: draw ${speedDuration} ease-in-out infinite;
          animation-play-state: ${playState};
        }
        @keyframes draw {
          0% { stroke-dashoffset: 1000; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1000; }
        }
      `
    },
    'fade-in': {
      duration: {
        slow: '6s',
        normal: '3s',
        fast: '1.5s'
      },
      css: (speedDuration: string, playState: string, fillColor: string) => `
        .animated-svg path {
          opacity: 0;
          fill: ${fillColor};
          animation: fadeIn ${speedDuration} ease-in-out infinite;
          animation-play-state: ${playState};
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.8); }
        }
      `
    },
    pulse: {
      duration: {
        slow: '6s',
        normal: '3s',
        fast: '1.5s'
      },
      css: (speedDuration: string, playState: string, fillColor: string) => `
        .animated-svg path {
          fill: ${fillColor};
          animation: pulse ${speedDuration} ease-in-out infinite;
          animation-play-state: ${playState};
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `
    }
  }

  // 生成动画 CSS
  const generateAnimationCSS = (type: string, speed: string, paused: boolean, fillColor: string) => {
    const config = animationConfigs[type as keyof typeof animationConfigs]
    if (!config) return ''
    
    const speedDuration = config.duration[speed as keyof typeof config.duration]
    const playState = paused ? 'paused' : 'running'
    
    return `<style>${config.css(speedDuration, playState, fillColor)}</style>`
  }

  const [fontList, setFontList] = useState<GoogleFontItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const recommendFonts = [
    'Mea Culpa',
    'Lily Script One',
    'Kapakana',
    'Protest Riot',
    'Sonsie One',
    'Pacifico', 
    'Sofadi One',
    'Risque',
    'Oooh Baby', 
  ]

  const recommendTextFonts = [
    'Roboto',
    'Varela Round',
    'Noto Sans Nabataean',
    'Crimson Text',
    'Oxygen',
    'Overpass'
  ]
  const recommendTools = [
    {title: 'Personal Blog', href: 'https://jiuran.fun'},
    {title: 'AI Navigation', href: 'https://nexus.skin'},
  ]
  // 使用 useMemo 缓存字体加载
  const fontUrl = useMemo(() => {
    if (!selectedFont) return null
    if (selectedVariant && selectedFont.files && selectedFont.files[selectedVariant]) {
      return selectedFont.files[selectedVariant]
    }
    return selectedFont.menu
  }, [selectedFont, selectedVariant])

  const [customFont, setCustomFont] = useState<opentype.Font | null>(null)
  const [customFontName, setCustomFontName] = useState<string>('')
  
  // 修改 loadFont 函数以支持自定义字体
  const loadFont = useCallback(
    (url: string | opentype.Font) => {
      if (typeof url === 'string') {
        opentype.load(url, (err: Error | null, font: opentype.Font | null) => {
          if (!err && font) {
            setCurrentFont(font)
          } else {
            setCurrentFont(null)
          }
        })
      } else {
        setCurrentFont(url)
      }
    },
    []
  )

  // 添加自定义字体处理函数
  const handleCustomFontLoaded = useCallback((font: opentype.Font, fileName: string) => {
    setCustomFont(font)
    setCustomFontName(fileName)
    setCurrentFont(font)
  }, [])

  const handleCustomFontRemoved = useCallback(() => {
    setCustomFont(null)
    setCustomFontName('')
    if (fontUrl) {
      loadFont(fontUrl)
    }
  }, [fontUrl, loadFont])

  // 修改 useEffect 以支持自定义字体
  useEffect(() => {
    if (customFont) {
      setCurrentFont(customFont)
    } else if (fontUrl) {
      loadFont(fontUrl)
    }
  }, [fontUrl, customFont, loadFont])

  // 使用 useCallback 和 debounce 优化 SVG 生成
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const generateSvg = useCallback(
    debounce(() => {
      if (!currentFont || !text) {
        setSvgPath('')
        return
      }
      
      try {
        // 使用 makerjs 生成文本模型
        const textModel = new makerjs.models.Text(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          currentFont as any,
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
        
        // 处理动画
        let finalSvg = svg
        if (animationEnabled && svg) {
          const animationCSS = generateAnimationCSS(animationType, animationSpeed, animationPaused, fill)
          finalSvg = svg.replace(
            /<svg([^>]*)>/,
            `<svg$1 class="animated-svg">${animationCSS}`
          )
        }
        
        setSvgPath(finalSvg)
        setDxfPath(dxf)
      } catch (error) {
        console.error('Error generating SVG:', error)
        setSvgPath('')
      }
    }, 200),
    [currentFont, text, fontSize, union, filled, kerning, separate, bezierAccuracy, fill, stroke, strokeWidth, fillRule, dxfUnits, animationEnabled, animationType, animationSpeed, animationPaused]
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
    if (!dxfPath) return
    const blob = new Blob([dxfPath], { type: 'application/dxf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${text}.dxf`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(t('notifications.dxfDownloaded'))
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
      'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBGY1GPOKrkxGQTQV_qoo7oPLiVh5eaC8g'
    )
      .then((res) => res.json())
      .then((data) => {
        setFontList(data.items || [])
      })
      .finally(() => {
        setIsLoading(false)
        loadFont(selectedFont?.files?.regular || '')
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [isOpen, setIsOpen] = useState(false)

  const renderAnimationSettings = () => (
    <div className="border-t pt-4 mt-4 flex flex-col gap-6">
      <h3 className="text-sm font-semibold">{t('animation.title')}</h3>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="animation-enabled">
          <h3>{t('animation.enable')}</h3>
        </Label>
        <Switch 
          id="animation-enabled" 
          checked={animationEnabled} 
          onCheckedChange={setAnimationEnabled} 
        />
      </div>

      {animationEnabled && (
        <>
          <div className="flex flex-col gap-2">
            <Label htmlFor="animation-type">
              <h3>{t('animation.type')}</h3>
            </Label>
            <Select value={animationType} onValueChange={setAnimationType}>
              <SelectTrigger>
                <SelectValue placeholder="Select animation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="signature">{t('animation.types.signature')}</SelectItem>
                <SelectItem value="draw">{t('animation.types.draw')}</SelectItem>
                <SelectItem value="fade-in">{t('animation.types.fadeIn')}</SelectItem>
                <SelectItem value="pulse">{t('animation.types.pulse')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="animation-speed">
              <h3>{t('animation.speed')}</h3>
            </Label>
            <Select value={animationSpeed} onValueChange={setAnimationSpeed}>
              <SelectTrigger>
                <SelectValue placeholder="Select speed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slow">{t('animation.speeds.slow')}</SelectItem>
                <SelectItem value="normal">{t('animation.speeds.normal')}</SelectItem>
                <SelectItem value="fast">{t('animation.speeds.fast')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="animation-paused">
              <h3>{t('animation.pause')}</h3>
            </Label>
            <Switch 
              id="animation-paused" 
              checked={animationPaused} 
              onCheckedChange={setAnimationPaused} 
            />
          </div>
        </>
      )}
    </div>
  )

  const renderSettings = () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-4">
        <Image src="/favicon-32x32.png" alt={t('title')} width={24} height={24} className="rounded-full" />
        <h1 className="text-xl font-bold">
          {t('title')}
        </h1>
      </div>
      <h2 className="text-lg font-bold mb-2">{t('settings.title')}</h2>
      {/* 配置面板内容 */}
      <div className="mb-4">
        <GoogleFontSelector 
          value={selectedFont?.family || ''} 
          onChange={(font) => {
            if (!customFont) {
              setSelectedFont(font)
            } else {
              toast.info(t('notifications.customFontActive'))
            }
          }}
          fontList={fontList}
          isLoading={isLoading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      
      {/* 自定义字体上传组件 */}
      <div className="mb-4">
        <Label className="mb-2 block">
          <h3>
            {t('settings.customFont')}
            <span className="text-xs text-gray-500 ms-2">{t('settings.customFontOptional')}</span>
          </h3>
        </Label>
        <CustomFontUploader 
          onFontLoaded={handleCustomFontLoaded}
          onFontRemoved={handleCustomFontRemoved}
          currentFileName={customFontName}
        />
      </div>
      
      {/* 字体变体选择器 */}
      {selectedFont && !customFont && (
        <div className="flex flex-col gap-2">
          <Label>{t('settings.fontVariant')}</Label>
          <Select value={selectedVariant} onValueChange={setSelectedVariant}>
            <SelectTrigger>
              <SelectValue placeholder="Select font variant" />
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
        <Label htmlFor="text">
          <h3>{t('settings.text')}</h3>
        </Label>
        <Input id="text" value={text} onChange={e => setText(e.target.value)} placeholder={t('settings.textPlaceholder')} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="size">
          <h3>{t('settings.fontSize')}</h3>
        </Label>
        <Input id="size" type="number" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} />
      </div>

      <div className="flex flex-col gap-6 my-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="union">
            <h3>{t('settings.mergePaths')}</h3>
          </Label>
          <Switch id="union" checked={union} onCheckedChange={setUnion} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="filled">
            <h3>{t('settings.fill')}</h3>
          </Label>
          <Switch id="filled" checked={filled} onCheckedChange={setFilled} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="kerning">
            <h3>{t('settings.kerning')}</h3>
          </Label>
          <Switch id="kerning" checked={kerning} onCheckedChange={setKerning} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="separate">
            <h3>{t('settings.separatePaths')}</h3>
          </Label>
          <Switch id="separate" checked={separate} onCheckedChange={setSeparate} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="bezier-accuracy">
          <h3>{t('settings.bezierAccuracy')}</h3>
        </Label>
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
        <Label htmlFor="fill-rule">
          <h3>{t('settings.fillRule')}</h3>
        </Label>
        <Select value={fillRule} onValueChange={(value: FillRule) => setFillRule(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select fill rule" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nonzero">nonzero</SelectItem>
            <SelectItem value="evenodd">evenodd</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="stroke">
          <h3>{t('settings.strokeColor')}</h3>
        </Label>
        <Input id="stroke" type="color" value={stroke} onChange={e => setStroke(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="stroke-width">
          <h3>{t('settings.strokeWidth')}</h3>
        </Label>
        <Input id="stroke-width" type="text" value={strokeWidth} onChange={e => setStrokeWidth(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="fill">
          <h3>{t('settings.fillColor')}</h3>
        </Label>
        <Input id="fill" type="color" value={fill} onChange={e => setFill(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="dxf-units">
          <h3>{t('settings.dxfUnits')}</h3>
        </Label>
        <Select value={dxfUnits} onValueChange={setDxfUnits}>
          <SelectTrigger>
            <SelectValue placeholder="Select unit" />
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

      {renderAnimationSettings()}
    </div>
  )

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* 移动端菜单按钮 */}
      <div className="lg:hidden fixed top-[80px] right-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm p-0">
            <ScrollArea className="h-full p-6">
              <SheetHeader className="mb-6 p-0">
                <SheetTitle>{t('settings.title')}</SheetTitle>
                <SheetDescription>
                  Customize your text to SVG conversion settings here.
                </SheetDescription>
              </SheetHeader>
              {renderSettings()}
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* 桌面端侧边栏 */}
      <aside className="hidden lg:block w-full max-w-sm bg-muted p-0 flex flex-col gap-0 border-r h-screen">
        <ScrollArea className="h-screen p-6">
          {renderSettings()}
        </ScrollArea>
      </aside>

      {/* 右侧预览区 */}
      <main className="flex-1 flex flex-col items-center justify-start gap-4 lg:gap-8">
        <ScrollArea className="h-screen w-full">
          <Header />
          <div className="flex flex-col gap-4 p-4">
            {/* 标题行：SVG预览 和 SVG代码 */}
            <div className="w-full max-w-5xl p-4">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                <div className="flex-1">
                  <h2 className="text-lg font-bold mb-4">{t('preview.title')}</h2>
                  <div className="bg-white border rounded-lg h-60 flex items-center justify-center overflow-auto shadow-sm">
                    {loadingFont ? <span className="text-gray-400">{t('preview.loading')}</span> : (
                      svgString ? <div dangerouslySetInnerHTML={{ __html: svgString }} /> : <span className="text-gray-400">{t('preview.empty')}</span>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold mb-4">{t('preview.code')}</h2>
                  <Textarea id="svg-code" className="w-full h-60 rounded" readOnly value={svgString} />
                </div>
              </div>
            </div>
            {/* 操作按钮 */}
            <div className="w-full max-w-5xl flex flex-row gap-2 justify-end">
              <Button variant="outline" onClick={() => {
                navigator.clipboard.writeText(svgString)
                toast.success(t('notifications.copied'))
              }}>
                {t('actions.copyCode')}
              </Button>
              <Button onClick={() => {
                const blob = new Blob([svgString], { type: 'image/svg+xml' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'text.svg'
                a.click()
                URL.revokeObjectURL(url)
                toast.success(t('notifications.svgDownloaded'))
              }}>
                {t('actions.downloadSvg')}
              </Button>
              <Button onClick={downloadDxf}>
                {t('actions.downloadDxf')}
              </Button>
            </div>
            {/* 推荐字体区 */}
            <div className="w-full max-w-5xl mt-6 bg-gray-50 border rounded-lg p-4 shadow-sm">
              <h2 className="text-base font-semibold mb-3">{t('recommendations.logoFonts')}</h2>
              <div className="flex flex-wrap gap-3 mb-6">
                {recommendFonts.map(family => (
                  <button
                    key={family}
                    className={'px-4 py-2 rounded-lg border hover:bg-muted transition font-bold text-xs'}
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
              <h2 className="text-base font-semibold mb-3">{t('recommendations.textFonts')}</h2>
              <div className="flex flex-wrap gap-3 mb-6">
                {recommendTextFonts.map(family => (
                  <button
                    key={family}
                    className={'px-4 py-2 rounded-lg border hover:bg-muted transition font-bold text-xs'}
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

              <div className="flex flex-col gap-3 max-w-xs">
                {/* 其他工具页脚区 */}
                <h2 className="text-base font-semibold">{t('recommendations.otherTools')}</h2>
                <div className="flex flex-wrap gap-3">
                  {recommendTools.map(tool => (
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={tool.title}
                      className={'px-4 py-2 rounded-lg border hover:bg-muted transition font-bold text-xs'}
                    >
                      {tool.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
