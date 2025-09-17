import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'
import BlogHeader from '../components/BlogHeader'
import BlogFooter from '../components/BlogFooter'

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
      
      <div className="min-h-screen bg-white">
        <BlogHeader />

        {/* Hero Section */}
        <section className="bg-white py-16 border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="bg-yellow-400 border-4 border-black p-8 mb-8 inline-block transform -rotate-2">
              <h1 className="text-5xl md:text-6xl font-black text-black mb-6 transform rotate-1">
                The EagleRanked
                <span className="block text-blue-600">BLOG</span>
              </h1>
            </div>
            
            <div className="bg-white border-4 border-black p-6 max-w-4xl mx-auto mb-8">
              <p className="text-xl text-black font-bold leading-relaxed">
                EXPERT INSIGHTS, PROVEN STRATEGIES, AND ACTIONABLE TACTICS TO HELP YOU 
                DOMINATE SEARCH RANKINGS AND SCALE YOUR CONTENT MARKETING.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <div className="bg-pink-500 border-4 border-black p-4">
                  <input
                    type="text"
                    placeholder="SEARCH ARTICLES..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border-4 border-black font-bold text-black placeholder-gray-600 uppercase tracking-wide"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-yellow-400 border-4 border-black p-4 mb-8 inline-block">
              <h2 className="text-3xl font-black flex items-center gap-3">
                <span className="bg-green-400 p-2">⭐</span>
                FEATURED ARTICLE
              </h2>
            </div>
            
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="bg-white border-4 border-black hover:shadow-[8px_8px_0_0_#000] transition-all duration-200 cursor-pointer">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    {featuredPost.img_url && (
                      <img
                        src={featuredPost.img_url}
                        alt={featuredPost.title}
                        className="w-full h-64 md:h-full object-cover border-r-4 border-black"
                      />
                    )}
                  </div>
                  <div className="md:w-1/2 p-8">
                    {featuredPost.keyword && (
                      <div className="bg-green-400 border-4 border-black px-3 py-1 inline-block mb-4">
                        <span className="font-black text-black uppercase text-sm">
                          {featuredPost.keyword}
                        </span>
                      </div>
                    )}
                    <h3 className="text-3xl font-black mb-4 text-black hover:text-blue-600 transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-black font-bold text-lg mb-6 leading-relaxed">
                      {featuredPost.summary}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-black mb-6 font-bold">
                      <span>{new Date(featuredPost.published_at!).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                      <span>•</span>
                      <span>{Math.max(1, Math.ceil((featuredPost.content?.length || 0) / 200))} MIN READ</span>
                    </div>
                    <div className="bg-pink-500 border-4 border-black px-6 py-3 inline-block">
                      <span className="text-white font-black uppercase">
                        READ ARTICLE →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* All Posts */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-blue-600 border-4 border-black p-4 mb-8 inline-block">
            <h2 className="text-3xl font-black text-white">LATEST ARTICLES</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="bg-white border-4 border-black hover:shadow-[8px_8px_0_0_#000] transition-all duration-200 cursor-pointer">
                  {post.img_url && (
                    <div className="relative overflow-hidden">
                      <img
                        src={post.img_url}
                        alt={post.title}
                        className="w-full h-48 object-cover border-b-4 border-black"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.keyword && (
                      <div className="bg-blue-600 border-2 border-black px-2 py-1 inline-block mb-3">
                        <span className="text-white font-black text-sm uppercase">
                          {post.keyword}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-black mt-3 mb-3 text-black hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-black font-bold mb-4 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between text-sm text-black font-bold">
                      <span>{new Date(post.published_at!).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                      <span>{Math.max(1, Math.ceil((post.content?.length || 0) / 200))} MIN READ</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-200 border-4 border-black p-8 max-w-md mx-auto">
                <div className="text-black mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-black mb-2">NO ARTICLES FOUND</h3>
                <p className="text-black font-bold">TRY ADJUSTING YOUR SEARCH TERMS</p>
              </div>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-black py-16 border-t-4 border-pink-500">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="bg-pink-500 border-4 border-white p-8 max-w-4xl mx-auto mb-8">
              <h2 className="text-3xl font-black text-white mb-4">
                READY TO DOMINATE SEARCH RANKINGS?
              </h2>
              <p className="text-xl text-white font-bold mb-8">
                START IMPLEMENTING THESE STRATEGIES WITH EAGLERANKED'S AI-POWERED CONTENT MARKETING PLATFORM.
              </p>
              <a 
                href="https://eagleranked.com/signup" 
                className="bg-yellow-400 border-4 border-black px-8 py-4 font-black text-black hover:bg-yellow-300 transition-colors inline-block uppercase"
              >
                START YOUR FREE TRIAL →
              </a>
            </div>
          </div>
        </section>

        <BlogFooter />
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