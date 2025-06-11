import { Metadata } from 'next'
import { InnerPageLayout } from '../_component/InnerPageLayout'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Font Sources - Free and Premium Font Resources for SVG Conversion',
  description: 'Discover the best font resources for SVG conversion. Explore free and premium font collections from Google Fonts, Adobe Fonts, and other trusted sources. Perfect for creating vector graphics and SVG designs.',
  keywords: 'font sources, free fonts, premium fonts, google fonts, adobe fonts, font resources, svg fonts, vector fonts, web fonts, commercial fonts',
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
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Google Fonts</h3>
              <p className="mb-3">The largest collection of free, open-source fonts</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Over 1,500 font families</li>
                <li>Open source and free for commercial use</li>
                <li>Regular updates and new additions</li>
                <li>Perfect for web and print</li>
              </ul>
              <Link 
                href="https://fonts.google.com" 
                target="_blank" 
                className="mt-4 inline-block text-primary hover:underline"
              >
                Visit Google Fonts →
              </Link>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Font Squirrel</h3>
              <p className="mb-3">Curated collection of free commercial fonts</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>100% free for commercial use</li>
                <li>Hand-picked quality fonts</li>
                <li>Web font generator</li>
                <li>Font identification tool</li>
              </ul>
              <Link 
                href="https://www.fontsquirrel.com" 
                target="_blank" 
                className="mt-4 inline-block text-primary hover:underline"
              >
                Visit Font Squirrel →
              </Link>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">DaFont</h3>
              <p className="mb-3">Extensive collection of free fonts</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Over 100,000 fonts</li>
                <li>Various categories and styles</li>
                <li>User-submitted content</li>
                <li>Regular updates</li>
              </ul>
              <Link 
                href="https://www.dafont.com" 
                target="_blank" 
                className="mt-4 inline-block text-primary hover:underline"
              >
                Visit DaFont →
              </Link>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Open Font Library</h3>
              <p className="mb-3">Open source font collection</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Free and open source</li>
                <li>Community-driven</li>
                <li>Multiple languages support</li>
                <li>Web font formats</li>
              </ul>
              <Link 
                href="https://fontlibrary.org" 
                target="_blank" 
                className="mt-4 inline-block text-primary hover:underline"
              >
                Visit Open Font Library →
              </Link>
            </div>
          </div>
        </section>

        {/* Premium Font Sources */}
        <section className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Premium Font Resources</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Adobe Fonts</h3>
              <p className="mb-3">Professional font service by Adobe</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Over 20,000 fonts</li>
                <li>Included with Creative Cloud</li>
                <li>High-quality typefaces</li>
                <li>Commercial licensing</li>
              </ul>
              <Link 
                href="https://fonts.adobe.com" 
                target="_blank" 
                className="mt-4 inline-block text-primary hover:underline"
              >
                Visit Adobe Fonts →
              </Link>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">MyFonts</h3>
              <p className="mb-3">World's largest font marketplace</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Over 130,000 fonts</li>
                <li>Professional typefaces</li>
                <li>Commercial licenses</li>
                <li>Font identification</li>
              </ul>
              <Link 
                href="https://www.myfonts.com" 
                target="_blank" 
                className="mt-4 inline-block text-primary hover:underline"
              >
                Visit MyFonts →
              </Link>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Creative Market</h3>
              <p className="mb-3">Creative assets marketplace</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Premium font collections</li>
                <li>Unique typefaces</li>
                <li>Commercial licenses</li>
                <li>Regular deals and discounts</li>
              </ul>
              <Link 
                href="https://creativemarket.com/fonts" 
                target="_blank" 
                className="mt-4 inline-block text-primary hover:underline"
              >
                Visit Creative Market →
              </Link>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Typekit</h3>
              <p className="mb-3">Professional font service</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>High-quality fonts</li>
                <li>Web font optimization</li>
                <li>Commercial licensing</li>
                <li>Adobe integration</li>
              </ul>
              <Link 
                href="https://typekit.com" 
                target="_blank" 
                className="mt-4 inline-block text-primary hover:underline"
              >
                Visit Typekit →
              </Link>
            </div>
          </div>
        </section>

        {/* Specialized Font Sources */}
        <section className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Specialized Font Resources</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">FontSpace</h3>
              <p className="mb-3">Free fonts for personal use</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Personal use fonts</li>
                <li>Commercial licenses available</li>
                <li>User ratings and reviews</li>
                <li>Font preview tool</li>
              </ul>
              <Link 
                href="https://www.fontspace.com" 
                target="_blank" 
                className="mt-4 inline-block text-primary hover:underline"
              >
                Visit FontSpace →
              </Link>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">1001 Fonts</h3>
              <p className="mb-3">Free font collection</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Free for personal use</li>
                <li>Commercial licenses available</li>
                <li>Regular updates</li>
                <li>Font categories</li>
              </ul>
              <Link 
                href="https://www.1001fonts.com" 
                target="_blank" 
                className="mt-4 inline-block text-primary hover:underline"
              >
                Visit 1001 Fonts →
              </Link>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Font Bundles</h3>
              <p className="mb-3">Premium font bundles</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Curated font collections</li>
                <li>Commercial licenses</li>
                <li>Regular deals</li>
                <li>Design resources</li>
              </ul>
              <Link 
                href="https://fontbundles.net" 
                target="_blank" 
                className="mt-4 inline-block text-primary hover:underline"
              >
                Visit Font Bundles →
              </Link>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Behance Fonts</h3>
              <p className="mb-3">Creative community fonts</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Designer submissions</li>
                <li>Unique typefaces</li>
                <li>Commercial options</li>
                <li>Creative inspiration</li>
              </ul>
              <Link 
                href="https://www.behance.net/search/fonts" 
                target="_blank" 
                className="mt-4 inline-block text-primary hover:underline"
              >
                Visit Behance Fonts →
              </Link>
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
      </div>
    </InnerPageLayout>
  )
} 