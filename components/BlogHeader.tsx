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
    <header className="bg-neo-white neo-border border-t-0 border-l-0 border-r-0 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="https://eagleranked.com/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-neo-blue neo-border flex items-center justify-center">
              <div className="w-6 h-6 bg-neo-white"></div>
            </div>
            <span className="text-xl font-black text-neo-black font-neo">EagleRanked</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-neo-black hover:text-neo-blue font-black text-lg transition-colors font-neo"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://eagleranked.com/login"
              className="px-6 py-2 bg-neo-white text-neo-black neo-button hover:bg-neo-gray"
            >
              LOGIN
            </a>
            <a
              href="https://eagleranked.com/signup"
              className="px-6 py-2 bg-neo-black text-neo-white neo-button hover:bg-gray-800"
            >
              LET'S GO!
            </a>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-neo-black p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}