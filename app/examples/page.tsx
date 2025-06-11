import { Metadata } from 'next'
import { InnerPageLayout } from '../_component/InnerPageLayout'

export const metadata: Metadata = {
  title: 'Text to SVG Examples - Vector Graphics Conversion Showcase',
  description: 'Explore our collection of text to SVG conversion examples. See how to create stunning vector graphics from text with real-world examples and use cases.',
}

export default function ExamplesPage() {
  return (
    <InnerPageLayout
      title="Text to SVG Examples"
      description="Explore our collection of text to SVG conversion examples and get inspired for your next project."
      keyword="ttf to svg, text, svg path"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Logo Design Examples</h2>
          <p className="text-muted-foreground mb-4">
            Discover how our tool can transform text into professional logo designs. Perfect for branding and identity projects.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modern minimalist logos</li>
            <li>Typography-based branding</li>
            <li>Custom lettering designs</li>
            <li>Logo animation preparation</li>
          </ul>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Typography Art</h2>
          <p className="text-muted-foreground mb-4">
            Explore creative typography designs made possible with SVG conversion. Perfect for artistic and decorative projects.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Decorative text effects</li>
            <li>Custom font combinations</li>
            <li>Text-based illustrations</li>
            <li>Artistic typography layouts</li>
          </ul>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Web Graphics</h2>
          <p className="text-muted-foreground mb-4">
            See how SVG text can enhance your web design projects with scalable and responsive graphics.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Responsive headings</li>
            <li>Animated text elements</li>
            <li>Interactive typography</li>
            <li>Web icon creation</li>
          </ul>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Print Design</h2>
          <p className="text-muted-foreground mb-4">
            Learn how to create high-quality vector text for print materials and physical products.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Print-ready typography</li>
            <li>Product packaging text</li>
            <li>Signage and displays</li>
            <li>Merchandise printing</li>
          </ul>
        </div>
      </div>
    </InnerPageLayout>
  )
} 