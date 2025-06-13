import { Metadata } from 'next'
import { InnerPageLayout } from '../_components/InnerPageLayout'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Karma Sanskrit Tattoo Design - Convert Sanskrit Text to SVG for Tattoos',
  description: 'Create beautiful Sanskrit tattoo designs with our SVG converter. Convert Karma and other Sanskrit text to vector graphics perfect for tattoo artwork.',
}

export default function SanskritTattooPage() {
  return (
    <InnerPageLayout
      title="Karma Sanskrit Tattoo Design"
      description="Create meaningful Sanskrit tattoo designs with our professional SVG converter. Perfect for creating precise, scalable tattoo artwork."
      keyword="Karma Sanskrit Tattoo"
    >
      <div className="grid gap-8">
        {/* Introduction Section */}
        <section className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Understanding Sanskrit Tattoo Design</h2>
          <p className="text-muted-foreground mb-4">
            Sanskrit tattoos have become increasingly popular for their deep spiritual meaning and aesthetic beauty. 
            Our SVG converter helps you create precise, scalable Sanskrit text perfect for tattoo designs.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-3">Why Choose Sanskrit?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Rich spiritual and cultural heritage</li>
                <li>Beautiful, flowing script</li>
                <li>Deep symbolic meanings</li>
                <li>Timeless aesthetic appeal</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Benefits of SVG Format</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Perfect clarity at any size</li>
                <li>Easy to modify and adjust</li>
                <li>Compatible with design software</li>
                <li>Ideal for tattoo stencils</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Popular Sanskrit Symbols */}
        <section className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Popular Sanskrit Tattoo Designs</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Karma (कर्म)</h3>
              <p className="mb-3">Meaning: Action, work, or deed</p>
              <p className="text-muted-foreground">
                The concept of Karma represents the spiritual principle of cause and effect, 
                where intent and actions influence the future.
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Om (ॐ)</h3>
              <p className="mb-3">Meaning: Sacred sound and symbol</p>
              <p className="text-muted-foreground">
                The most sacred symbol in Hinduism, representing the universe and the ultimate reality.
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Namaste (नमस्ते)</h3>
              <p className="mb-3">Meaning: I bow to you</p>
              <p className="text-muted-foreground">
                A respectful greeting that acknowledges the divine spark within each person.
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Shanti (शांति)</h3>
              <p className="mb-3">Meaning: Peace</p>
              <p className="text-muted-foreground">
                Represents inner peace, tranquility, and harmony in life.
              </p>
            </div>
          </div>
        </section>

        {/* Design Process */}
        <section className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Creating Your Sanskrit Tattoo Design</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-medium mb-2">Choose Your Sanskrit Text</h3>
                <p className="text-muted-foreground">
                  Select meaningful Sanskrit words or phrases that resonate with your personal journey.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-medium mb-2">Convert to SVG</h3>
                <p className="text-muted-foreground">
                  Use our tool to convert your chosen text into high-quality SVG format.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-medium mb-2">Customize Design</h3>
                <p className="text-muted-foreground">
                  Adjust size, style, and effects to create your perfect tattoo design.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-medium mb-2">Export and Share</h3>
                <p className="text-muted-foreground">
                  Download your design and share it with your tattoo artist.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Related Resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/tutorials" className="block p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
              <h3 className="text-lg font-medium mb-2">Tutorials</h3>
              <p className="text-muted-foreground">
                Learn how to create the perfect Sanskrit tattoo design with our step-by-step guides.
              </p>
            </Link>
            <Link href="/examples" className="block p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
              <h3 className="text-lg font-medium mb-2">Examples</h3>
              <p className="text-muted-foreground">
                Explore our collection of Sanskrit tattoo design examples for inspiration.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </InnerPageLayout>
  )
} 