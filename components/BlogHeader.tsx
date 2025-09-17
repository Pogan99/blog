import React from 'react'
import Link from 'next/link'

export default function BlogHeader() {
  const menuItems = [
    { label: 'Home', href: 'https://eagleranked.com/' },
    { label: 'Features', href: 'https://eagleranked.com/features' },
    { label: 'Integrations', href: 'https://eagleranked.com/integrations' },
    { label: 'How it works', href: 'https://eagleranked.com/#how-it-works' },
    { label: 'Pricing', href: 'https://eagleranked.com/#pricing' },
    { label: 'Law Office', href: 'https://eagleranked.com/legal' },
  ]

  return (
    <header className="neo-border border-t-0 border-l-0 border-r-0 bg-background z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Exact match to main site */}
          <Link href="https://eagleranked.com/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-neo-electric-blue neo-border flex items-center justify-center">
              <img 
                src="https://eagleranked.b-cdn.net/eagleranked-assets/logoeaglerank.png" 
                alt="EagleRanked Eagle Logo" 
                className="w-6 h-6 filter brightness-0 invert"
              />
            </div>
            <span className="neo-headline text-foreground text-xl font-black">EagleRanked</span>
          </Link>

          {/* Desktop Navigation - Exact match */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-primary font-bold text-lg transition-colors relative group"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons - Exact match */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://eagleranked.com/login"
              className="px-6 py-2 border-4 border-black bg-white text-black font-bold hover:bg-gray-100 transition-colors"
            >
              LOGIN
            </a>
            <a
              href="https://eagleranked.com/signup"
              className="px-6 py-2 border-4 border-black bg-black text-white font-bold hover:bg-gray-800 transition-colors"
            >
              LET'S GO!
            </a>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-black p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}