import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tutorials - Text to SVG Converter',
  description: 'Learn how to use our Text to SVG converter with step-by-step tutorials and guides.',
}

export default function TutorialsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">Tutorials</h1>
      <div className="grid gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p className="text-muted-foreground">
            Learn the basics of converting text to SVG paths with our easy-to-follow guide.
          </p>
        </div>
        {/* Add more tutorial sections as needed */}
      </div>
    </div>
  )
} 