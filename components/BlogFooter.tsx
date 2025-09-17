import React from 'react'
import Link from 'next/link'

export default function BlogFooter() {
  const currentYear = new Date().getFullYear()
  
  const footerSections = [
    {
      title: 'PRODUCT',
      links: [
        { label: 'FEATURES', href: 'https://eagleranked.com/features' },
        { label: 'PRICING', href: 'https://eagleranked.com/#pricing' },
        { label: 'INTEGRATIONS', href: 'https://eagleranked.com/integrations' }
      ]
    },
    {
      title: 'RESOURCES',
      links: [
        { label: 'DOCUMENTATION', href: 'https://eagleranked.com/docs' },
        { label: 'BLOG', href: '/' }
      ]
    },
    {
      title: 'COMPANY',
      links: [
        { label: 'CONTACT', href: 'https://eagleranked.com/contact' },
        { label: 'AFFILIATE PROGRAM', href: 'https://eagleranked.com/affiliate' }
      ]
    }
  ]

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="bg-neo-pure-black relative overflow-hidden">
      {/* Floating Elements - No rotation for professional look */}
      <div className="absolute top-8 right-8 bg-neo-neon-green neo-border neo-shadow p-4 hidden lg:block">
        <svg className="w-6 h-6 text-neo-pure-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Section - Exact match to main site */}
          <div className="lg:col-span-2">
            <div className="bg-neo-pure-white neo-border neo-shadow p-6 mb-8">
              <Link href="https://eagleranked.com/" className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-neo-electric-blue neo-border flex items-center justify-center">
                  <img 
                    src="https://eagleranked.b-cdn.net/eagleranked-assets/logoeaglerank.png" 
                    alt="EagleRanked Eagle Logo" 
                    className="w-8 h-8 filter brightness-0 invert"
                  />
                </div>
                <span className="neo-subheadline text-neo-pure-black font-black">EAGLERANKED</span>
              </Link>
              <p className="neo-text text-neo-pure-black font-bold leading-tight">
                GROW YOUR ORGANIC TRAFFIC WITH SEO-OPTIMIZED CONTENT ON AUTOPILOT
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="mailto:hello@eagleranked.com" 
                className="bg-neo-hot-pink neo-border p-4 hover:scale-110 transition-transform"
              >
                <svg className="w-6 h-6 text-neo-pure-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Links - No rotation for professional look */}
          {footerSections.map((section, sectionIndex) => (
            <div key={section.title}>
              <div className="bg-neo-cyber-yellow neo-border neo-shadow p-4 mb-6">
                <h3 className="neo-text-bold text-neo-pure-black font-black">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="text-neo-pure-white font-bold hover:text-neo-neon-green transition-colors uppercase tracking-wide text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section - Exact match to main site */}
        <div className="bg-neo-pure-white neo-border neo-shadow p-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <p className="text-neo-pure-black font-black text-sm uppercase tracking-wider">
              © {currentYear} EAGLERANKED. ALL RIGHTS RESERVED.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                <a 
                  href="https://eagleranked.com/privacy" 
                  className="text-neo-pure-black font-bold hover:text-neo-electric-blue transition-colors text-sm uppercase"
                >
                  PRIVACY POLICY
                </a>
                <a 
                  href="https://eagleranked.com/terms" 
                  className="text-neo-pure-black font-bold hover:text-neo-electric-blue transition-colors text-sm uppercase"
                >
                  TERMS OF SERVICE
                </a>
                <a 
                  href="https://eagleranked.com/cookies" 
                  className="text-neo-pure-black font-bold hover:text-neo-electric-blue transition-colors text-sm uppercase"
                >
                  COOKIE POLICY
                </a>
              </div>
              
              <button 
                onClick={scrollToTop}
                className="bg-neo-hot-pink neo-border p-3 hover:scale-110 transition-transform"
              >
                <svg className="w-5 h-5 text-neo-pure-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}