import { Metadata } from 'next'
import { InnerPageLayout } from '../_component/InnerPageLayout'

export const metadata: Metadata = {
  title: 'Text to SVG Tutorials - Learn How to Convert Text to Vector Graphics',
  description: 'Step-by-step tutorials on converting text to SVG paths. Learn how to create vector graphics from text with our comprehensive guides.',
  keywords: 'text to svg tutorial, svg conversion guide, vector graphics tutorial, text to vector conversion',
}

export default function TutorialsPage() {
  return (
    <InnerPageLayout
      title="Text to SVG Tutorials"
      description="Learn how to convert text to SVG paths with our comprehensive step-by-step guides."
      keyword="Text to SVG Tutorials"
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
      </div>
    </InnerPageLayout>
  )
} 