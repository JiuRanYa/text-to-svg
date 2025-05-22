import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      'indent': ['error', 2, {
        'SwitchCase': 1,
        'ignoredNodes': ['TemplateLiteral']
      }],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never']
    }
  }
]

export default eslintConfig