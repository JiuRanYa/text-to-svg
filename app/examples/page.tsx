import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Examples - Text to SVG Converter',
  description: 'Explore examples of text to SVG conversions and get inspired for your next project.',
}

export default function ExamplesPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">Examples</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Logo Design</h2>
          <p className="text-muted-foreground">
            See how our tool can be used to create stunning logo designs with custom fonts.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Typography Art</h2>
          <p className="text-muted-foreground">
            Discover creative typography designs made possible with SVG conversion.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Web Graphics</h2>
          <p className="text-muted-foreground">
            Explore how SVG text can enhance your web design projects.
          </p>
        </div>
      </div>
    </div>
  )
} 