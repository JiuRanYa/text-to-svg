import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Text to SVG Converter',
  description: 'Learn about our Text to SVG converter tool and its features for creating vector graphics from text.',
}

export default function AboutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">About</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-lg mb-6">
          Text to SVG Converter is a powerful online tool that helps you convert text into SVG paths.
          Perfect for designers, developers, and anyone who needs to create vector graphics from text.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Convert any Google Font to SVG paths</li>
          <li>Customize text styles and effects</li>
          <li>Export high-quality vector graphics</li>
          <li>Perfect for web design and logo creation</li>
          <li>Free to use, no registration required</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
        <p className="mb-6">
          Our tool provides a simple yet powerful way to create vector graphics from text.
          Whether you're a professional designer or just starting out, our converter makes it easy
          to create beautiful typography for your projects.
        </p>
      </div>
    </div>
  )
} 