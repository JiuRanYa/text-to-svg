import { Metadata } from 'next'
import { InnerPageLayout } from '../_components/InnerPageLayout'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Text to SVG Tutorials - Learn How to Convert Text to Vector Graphics',
  description: 'Step-by-step tutorials on converting text to SVG paths. Learn how to create vector graphics from text with our comprehensive guides.',
}

export default function TutorialsPage() {
  return (
    <InnerPageLayout
      title="Text to SVG Tutorials"
      description="Learn how to convert text to SVG paths with our comprehensive step-by-step guides."
      keyword="How to convert text to SVG"
    >
      <div className="grid gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Getting Started with Text to SVG Conversion</h2>
          <p className="text-muted-foreground mb-4">
            Learn the basics of converting text to SVG paths with our easy-to-follow guide. Perfect for beginners who want to create vector graphics from text.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Understanding SVG path generation</li>
            <li>Choosing the right font for your project</li>
            <li>Customizing text styles and effects</li>
            <li>Exporting and using your SVG files</li>
          </ul>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Advanced SVG Techniques</h2>
          <p className="text-muted-foreground mb-4">
            Take your SVG skills to the next level with advanced techniques and best practices.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Optimizing SVG paths for better performance</li>
            <li>Creating complex text effects</li>
            <li>Working with multiple text layers</li>
            <li>Integrating SVGs into web projects</li>
          </ul>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Alternative Tools Comparison</h2>
          <p className="text-muted-foreground mb-4">
            While there are other tools available for converting text to SVG, our tool offers unique advantages:
          </p>
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Other Tools</h3>
              <p className="mb-2">
                Tools like <Link className="text-blue-500 underline" href="https://danmarshall.github.io/google-font-to-svg-path/" target="_blank" rel="noopener noreferrer">Google Font to SVG Path</Link> provide basic conversion functionality, but they lack:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Advanced text effects and styling</li>
                <li>Multiple export format options</li>
                <li>Responsive design features</li>
                <li>Modern user interface</li>
              </ul>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Our Advantages</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Interactive real-time preview</li>
                <li>Advanced animation capabilities</li>
                <li>Multiple export formats (SVG, DXF, TSX)</li>
                <li>Custom text effects and styling</li>
                <li>Modern, user-friendly interface</li>
                <li>Responsive design for all devices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  )
} 