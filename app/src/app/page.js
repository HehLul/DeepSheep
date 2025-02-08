import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Similar to Index's clean style */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Image 
                src="/sheep-logo.png" 
                alt="DeepSheep Logo" 
                width={32} 
                height={32}
                className="text-blue-500"
              />
              <span className="text-lg font-medium">DeepSheep</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
              <Link href="/features">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/docs">Docs</Link>
            </div>
            <div>
            <Link
            href="/setup"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-black px-8 text-sm font-medium text-white hover:bg-gray-900 transition-colors"
          >
            Get started
          </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean, centered like Index */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center bg-gray-50 rounded-full px-3 py-1 text-sm text-gray-600 mb-8">
            <span className="flex items-center gap-2">
              DeepSheep 1.0 • Public Beta →
            </span>
          </div>
          <h1 className="text-5xl font-medium text-gray-900 mb-6 tracking-tight">
            Launch and Monetize your AI startup <span className="text-gray-400">in minutes</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
          Turn your expertise into a profitable AI webapp powered by DeepSeek. No coding required.
          </p>
          <Link
            href="/setup"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-black px-8 text-sm font-medium text-white hover:bg-gray-900 transition-colors"
          >
            Get started
          </Link>
        </div>
      </section>

      {/* Numbers Section - Clean grid */}
      <section className="py-16 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-medium text-gray-900">7min</div>
              <div className="text-sm text-gray-500 mt-1">Launch Time</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-gray-900">50k</div>
              <div className="text-sm text-gray-500 mt-1">Free Tokens</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-gray-900">$0</div>
              <div className="text-sm text-gray-500 mt-1">Upfront Cost</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-gray-900">100%</div>
              <div className="text-sm text-gray-500 mt-1">Customizable</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Clean steps */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-medium text-gray-900 mb-12 text-center">How it works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-sm font-medium text-blue-600 mb-2">01</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Train Your AI</h3>
              <p className="text-sm text-gray-600">
                Share your expertise and examples. Our platform turns your knowledge into a powerful AI assistant.
              </p>
            </div>
            <div>
              <div className="text-sm font-medium text-blue-600 mb-2">02</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Customize Your SaaS</h3>
              <p className="text-sm text-gray-600">
                Brand your webapp, set your pricing, and make it market-ready.
              </p>
            </div>
            <div>
              <div className="text-sm font-medium text-blue-600 mb-2">03</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Launch & Profit</h3>
              <p className="text-sm text-gray-600">
                Get your unique URL instantly and start acquiring customers. We handle the tech, you handle the growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      {/* <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-medium text-gray-900 mb-12 text-center">Coming Soon</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Multiple AI products', 'Custom domain support', 'Advanced analytics', 'Team collaboration'].map((feature) => (
              <div key={feature} className="p-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-900">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Image 
                src="/sheep-logo.png" 
                alt="DeepSheep Logo" 
                width={24} 
                height={24} 
              />
              <span className="text-sm text-gray-600">
                © 2024 DeepSheep. All rights reserved.
              </span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}