
# [Text to SVG Online Converter](https://text-to-svg.tool.tokyo/)

## Introduction

This project is a high-quality online SVG font generator. It allows you to convert any text into SVG vector graphics, suitable for web design, logo creation, laser engraving, and more.

<img src="https://github.com/JiuRanYa/text-to-svg/blob/main/public/preview.svg" width="200" alt="Preview Animation">

---

## Features

- Google Fonts selection and search
- Support for font variants, size, stroke, fill, and other parameters
- Real-time SVG preview and code export
- One-click copy SVG/TSX code, download SVG/DXF files
- Recommended common Logo fonts and text fonts
- Bookmark functionality
- Rich external tool recommendations and direct GitHub repository links

---


## Stackblitz

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/~/github.com/JiuRanYa/text-to-svg)

## Local Development

1. Clone this repo

   ```bash
   git clone https://github.com/JiuRanYa/text-to-svg.git
   cd text-to-svg
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Start dev server

   ```bash
   pnpm dev
   # or yarn dev / npm run dev
   ```

4. Visit local

   Open your browser and visit [http://localhost:3000](http://localhost:3000)

---

## Dependencies

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [@svgr/core](https://react-svgr.com/) (Server-side SVG to TSX)
- [makerjs](https://github.com/microsoft/maker.js) (SVG/DXF generation)
- [opentype.js](https://github.com/opentypejs/opentype.js) (Font parsing)
- [lucide-react](https://lucide.dev/) (Icons)
- [shadcn/ui](https://ui.shadcn.com/) (UI components)
- See package.json for others

---

## Development & Deploy

- This project is based on Next.js 15+ App Router architecture, supporting SSR/SSG.
- Recommended deployment on Vercel, Netlify, or self-hosted.
- Production environment is recommended to configure your own Google Fonts API Key.

---

## Thanks

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
