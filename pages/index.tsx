import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface BlogPost {
  id: string
  title: string
  content: string | null
  summary: string | null
  img_url: string | null
  status: string
  keyword: string | null
  slug: string | null
  created_at: string
  updated_at: string
  published_at: string | null
}

interface Props {
  posts: BlogPost[]
  featuredPost: BlogPost | null
}

export default function BlogIndex({ posts, featuredPost }: Props) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.keyword?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <Head>
        <title>EagleRanked Blog - SEO & Content Marketing Insights</title>
        <meta name="description" content="Expert SEO strategies, content marketing insights, and proven tactics to help you dominate search rankings and scale your business." />
        <meta property="og:title" content="EagleRanked Blog - SEO & Content Marketing Insights" />
        <meta property="og:description" content="Expert SEO strategies, content marketing insights, and proven tactics to help you dominate search rankings and scale your business." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blog.eagleranked.com" />
        <link rel="canonical" href="https://blog.eagleranked.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "EagleRanked Blog",
              "description": "Expert SEO strategies and content marketing insights",
              "url": "https://blog.eagleranked.com",
              "publisher": {
                "@type": "Organization",
                "name": "EagleRanked",
                "url": "https://eagleranked.com"
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="https://eagleranked.com" className="text-2xl font-bold text-eagle-blue hover:text-eagle-dark transition-colors">
                EagleRanked
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="https://eagleranked.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
                <Link href="https://eagleranked.com/features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </Link>
                <Link href="https://eagleranked.com/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
                <Link href="https://eagleranked.com/login" className="bg-eagle-blue text-white px-4 py-2 rounded-lg hover:bg-eagle-dark transition-colors">
                  Get Started
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-white py-16 border-b">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              The EagleRanked
              <span className="block text-eagle-blue">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Expert insights, proven strategies, and actionable tactics to help you 
              dominate search rankings and scale your content marketing.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <svg className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eagle-blue focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <div className="bg-yellow-400 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              Featured Article
            </h2>
            
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    {featuredPost.img_url && (
                      <img
                        src={featuredPost.img_url}
                        alt={featuredPost.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="md:w-1/2 p-8">
                    {featuredPost.keyword && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {featuredPost.keyword}
                      </span>
                    )}
                    <h3 className="text-3xl font-bold mt-4 mb-4 text-gray-900 hover:text-eagle-blue transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {featuredPost.summary}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <span>{new Date(featuredPost.published_at!).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                      <span>•</span>
                      <span>{Math.max(1, Math.ceil((featuredPost.content?.length || 0) / 200))} min read</span>
                    </div>
                    <div className="inline-flex items-center text-eagle-blue font-semibold hover:text-eagle-dark transition-colors">
                      Read Article
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* All Posts */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                  {post.img_url && (
                    <div className="relative overflow-hidden">
                      <img
                        src={post.img_url}
                        alt={post.title}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.keyword && (
                      <span className="bg-blue-100 text-eagle-blue px-2 py-1 rounded text-sm font-medium">
                        {post.keyword}
                      </span>
                    )}
                    <h3 className="text-xl font-bold mt-3 mb-3 text-gray-900 hover:text-eagle-blue transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(post.published_at!).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                      <span>{Math.max(1, Math.ceil((post.content?.length || 0) / 200))} min read</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Dominate Search Rankings?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start implementing these strategies with EagleRanked's AI-powered content marketing platform.
            </p>
            <Link href="https://eagleranked.com/signup" className="bg-eagle-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-eagle-dark transition-colors inline-flex items-center">
              Start Your Free Trial
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <Link href="https://eagleranked.com" className="text-2xl font-bold text-eagle-blue mb-4 block">
                  EagleRanked
                </Link>
                <p className="text-gray-600">
                  AI-powered content marketing platform for dominating search rankings.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><Link href="https://eagleranked.com/features" className="hover:text-gray-900">Features</Link></li>
                  <li><Link href="https://eagleranked.com/pricing" className="hover:text-gray-900">Pricing</Link></li>
                  <li><Link href="https://eagleranked.com/integrations" className="hover:text-gray-900">Integrations</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><Link href="/" className="hover:text-gray-900">Blog</Link></li>
                  <li><Link href="https://eagleranked.com/docs" className="hover:text-gray-900">Documentation</Link></li>
                  <li><Link href="https://eagleranked.com/contact" className="hover:text-gray-900">Support</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><Link href="https://eagleranked.com/contact" className="hover:text-gray-900">Contact</Link></li>
                  <li><Link href="https://eagleranked.com/privacy" className="hover:text-gray-900">Privacy</Link></li>
                  <li><Link href="https://eagleranked.com/terms" className="hover:text-gray-900">Terms</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center text-gray-600">
              <p>&copy; 2024 EagleRanked. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: posts } = await supabase
      .from('company_blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(12)

    // Get featured post (most recent)
    const featuredPost = posts && posts.length > 0 ? posts[0] : null
    const remainingPosts = posts ? posts.slice(1) : []

    return {
      props: { 
        posts: remainingPosts || [],
        featuredPost
      },
      revalidate: 3600 // Revalidate every hour
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return {
      props: { 
        posts: [],
        featuredPost: null
      },
      revalidate: 3600
    }
  }
}