import { Metadata } from 'next'
import { InnerPageLayout } from '../_component/InnerPageLayout'

export const metadata: Metadata = {
  title: 'About Text to SVG Converter - Vector Graphics Tool',
  description: 'Learn about our Text to SVG converter tool, its features, and how it helps designers and developers create vector graphics from text.',
  keywords: 'text to svg converter, vector graphics tool, svg path generator, text to vector converter',
}

export default function AboutPage() {
  return (
    <InnerPageLayout
      title="About Text to SVG Converter"
      description="Learn about our powerful tool for converting text to SVG paths and creating vector graphics."
      keyword="About Online Text to SVG Converter"
    >
      <div className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="text-lg mb-6">
          Text to SVG Converter is dedicated to providing designers and developers with the best tools
          for creating vector graphics from text. Our mission is to make vector graphics creation
          accessible to everyone, from beginners to professionals.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Convert any Google Font to SVG paths</li>
          <li>Customize text styles and effects</li>
          <li>Export high-quality vector graphics</li>
          <li>Perfect for web design and logo creation</li>
          <li>Free to use, no registration required</li>
          <li>Instant preview and real-time updates</li>
          <li>Multiple export formats and options</li>
          <li>Responsive and mobile-friendly interface</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Use Cases</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h3 className="text-xl font-semibold mb-3">Web Design</h3>
            <p className="text-muted-foreground">
              Create scalable text elements for websites and web applications.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="text-xl font-semibold mb-3">Logo Design</h3>
            <p className="text-muted-foreground">
              Design professional logos with custom typography and effects.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="text-xl font-semibold mb-3">Print Design</h3>
            <p className="text-muted-foreground">
              Generate high-quality vector text for print materials and products.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="text-xl font-semibold mb-3">Digital Art</h3>
            <p className="text-muted-foreground">
              Create artistic typography and text-based illustrations.
            </p>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  )
} 