import { Metadata } from 'next'
import { InnerPageLayout } from '../_component/InnerPageLayout'
import Link from 'next/link'
import { fontSources, otherFontLinks } from './data'

export const metadata: Metadata = {
  title: 'Font Sources - Free and Premium Font Resources',
  description: 'Discover the best font resources for SVG conversion. Explore free and premium font collections from Google Fonts, Adobe Fonts, and other trusted sources.',
}

export default function SourcesPage() {
  return (
    <InnerPageLayout
      title="Font Sources"
      description="Discover the best font resources for your SVG conversion needs. From free to premium, find the perfect fonts for your projects."
      keyword="Font Sources"
    >
      <div className="grid gap-8">
        {/* Free Font Sources */}
        <section className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Free Font Resources</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {fontSources.free.map((source) => (
              <div key={source.name} className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-3">{source.name}</h3>
                <p className="mb-3">{source.description}</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {source.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link 
                  href={source.url} 
                  target="_blank" 
                  className="mt-4 inline-block text-primary hover:underline"
                >
                  Visit {source.name} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Premium Font Sources */}
        <section className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Premium Font Resources</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {fontSources.premium.map((source) => (
              <div key={source.name} className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-3">{source.name}</h3>
                <p className="mb-3">{source.description}</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {source.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link 
                  href={source.url} 
                  target="_blank" 
                  className="mt-4 inline-block text-primary hover:underline"
                >
                  Visit {source.name} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Specialized Font Sources */}
        <section className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Specialized Font Resources</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {fontSources.specialized.map((source) => (
              <div key={source.name} className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-3">{source.name}</h3>
                <p className="mb-3">{source.description}</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {source.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link 
                  href={source.url} 
                  target="_blank" 
                  className="mt-4 inline-block text-primary hover:underline"
                >
                  Visit {source.name} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Related Resources */}
        <section className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Related Resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/tutorials" className="block p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
              <h3 className="text-lg font-medium mb-2">Tutorials</h3>
              <p className="text-muted-foreground">
                Learn how to use different fonts with our SVG converter.
              </p>
            </Link>
            <Link href="/examples" className="block p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
              <h3 className="text-lg font-medium mb-2">Examples</h3>
              <p className="text-muted-foreground">
                See examples of SVG conversions using various fonts.
              </p>
            </Link>
          </div>
        </section>

        <section className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Font Design Tools</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {fontSources.tools.map((source) => (
              <div key={source.name} className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-3">{source.name}</h3>
                <p className="mb-3">{source.description}</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {source.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link 
                  href={source.url} 
                  target="_blank" 
                  className="mt-4 inline-block text-primary hover:underline"
                >
                  Visit {source.name} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Other Font Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {otherFontLinks.map(link => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
            ))}
          </div>
        </section>
      </div>
    </InnerPageLayout>
  )
}