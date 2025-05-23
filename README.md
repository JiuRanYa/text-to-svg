# Text to SVG 在线转换工具 | Text to SVG Online Converter

## 简介 | Introduction

本项目是一个高质量的在线 SVG 字体生成器，支持将任意文本转换为 SVG 矢量图，适用于网页设计、Logo 制作、激光雕刻等多种场景。

This project is a high-quality online SVG font generator. It allows you to convert any text into SVG vector graphics, suitable for web design, logo creation, laser engraving, and more.

---

## 主要功能 | Features

- 支持 Google Fonts 字体选择与搜索
- 支持字体变体、字号、描边、填充等多种参数
- 实时 SVG 预览与代码导出
- 一键复制 SVG/TSX 代码、下载 SVG/DXF 文件
- 推荐常用 Logo 字体与文本字体
- 收藏本站到书签功能
- 丰富的外部工具推荐与 GitHub 仓库直达

---

## 使用方法 | Usage

1. 克隆本仓库 | Clone this repo

   ```bash
   git clone https://github.com/jiuran-code/text-to-svg.git
   cd text-to-svg
   ```

2. 安装依赖 | Install dependencies

   ```bash
   pnpm install
   ```

3. 启动开发服务器 | Start dev server

   ```bash
   pnpm dev
   # 或 yarn dev / npm run dev
   ```

4. 访问本地 | Visit local

   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

---

## 依赖 | Dependencies

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [@svgr/core](https://react-svgr.com/) (服务端 SVG 转 TSX)
- [makerjs](https://github.com/microsoft/maker.js) (SVG/DXF 生成)
- [opentype.js](https://github.com/opentypejs/opentype.js) (字体解析)
- [lucide-react](https://lucide.dev/) (图标)
- [shadcn/ui](https://ui.shadcn.com/) (UI 组件)
- 其他见 package.json

---

## 开发与部署 | Development & Deploy

- 本项目基于 Next.js 15+ App Router 架构，支持 SSR/SSG。
- 推荐使用 Vercel、Netlify、或自托管部署。
- 生产环境建议配置自己的 Google Fonts API Key。

---

## 致谢 | Thanks

- [google-font-to-svg-path](https://github.com/danmarshall/google-font-to-svg-path)
- [Google Fonts](https://fonts.google.com/)
- [makerjs](https://github.com/microsoft/maker.js)
- [opentype.js](https://github.com/opentypejs/opentype.js)
- [SVGR](https://react-svgr.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [lucide-react](https://lucide.dev/)

---

## License

MIT
