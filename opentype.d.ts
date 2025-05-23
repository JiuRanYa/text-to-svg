declare module 'opentype.js' {
  export interface Path {
    commands: Array<{
      type: string;
      x: number;
      y: number;
      x1?: number;
      y1?: number;
      x2?: number;
      y2?: number;
    }>;
  }

  export interface Font {
    familyName: string;
    styleName: string;
    unitsPerEm: number;
    ascender: number;
    descender: number;
    names: {
      fontFamily: { en: string };
      fontSubfamily: { en: string };
      fullName: { en: string };
      postScriptName: { en: string };
    };
    createdTimestamp: number;
    tables: Record<string, any>;
    supported: boolean;
    getPath(text: string, x?: number, y?: number, fontSize?: number, options?: {
      kerning?: boolean;
      features?: Record<string, boolean>;
      language?: string;
      script?: string;
    }): Path;
  }

  export function load(url: string, callback: (error: Error | null, font: Font | null) => void): void;
  export function parse(buffer: ArrayBuffer): Font;
} 