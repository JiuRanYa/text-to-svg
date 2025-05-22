import { Input } from "@/core/ui/input";
import { Button } from "@/core/ui/button";
import { Textarea } from "@/core/ui/textarea";
import { Label } from "@/core/ui/label";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* 左侧配置区 */}
      <aside className="w-full max-w-sm bg-muted p-6 flex flex-col gap-4 border-r">
        <h2 className="text-lg font-bold mb-2">配置</h2>
        <div className="flex flex-col gap-2">
          <Label htmlFor="google-font">Google Font</Label>
          <Input id="google-font" placeholder="如：Damion" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="upload-font">上传字体</Label>
          <Input id="upload-font" type="file" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="text">文本</Label>
          <Input id="text" placeholder="请输入要转换的文字" defaultValue="ToolHub" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="size">字号</Label>
          <Input id="size" type="number" defaultValue={100} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="stroke">描边颜色</Label>
          <Input id="stroke" type="color" defaultValue="#000000" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="stroke-width">描边宽度</Label>
          <Input id="stroke-width" type="text" defaultValue="0.25mm" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="fill">填充颜色</Label>
          <Input id="fill" type="color" defaultValue="#000000" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bezier">Bezier 精度</Label>
          <Input id="bezier" type="text" defaultValue="auto" />
        </div>
        <Button className="mt-4">生成 SVG</Button>
      </aside>
      {/* 右侧预览区 */}
      <main className="flex-1 flex flex-col items-center justify-start p-8 gap-6">
        <h2 className="text-lg font-bold mb-2">SVG 预览</h2>
        <div className="w-full flex flex-col items-center gap-4">
          {/* SVG 预览占位 */}
          <div className="bg-white border rounded w-full max-w-xl h-40 flex items-center justify-center">
            <span className="text-gray-400">SVG 预览区</span>
          </div>
          <Label htmlFor="svg-code">SVG 代码</Label>
          <Textarea id="svg-code" className="w-full max-w-xl h-40" readOnly value={"<svg>...</svg>"} />
          <div className="flex gap-2">
            <Button variant="outline">复制代码</Button>
            <Button>下载 SVG</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
