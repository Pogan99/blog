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
      </Head>
      
      <div className="min-h-screen bg-neo-white font-neo">
        <BlogHeader />

        {/* Hero Section */}
        <section className="bg-neo-white py-16 border-b-neo border-neo-black">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="bg-neo-yellow neo-border neo-shadow p-8 mb-8 inline-block transform -rotate-2">
              <h1 className="text-5xl md:text-6xl font-black text-neo-black mb-6 transform rotate-1 font-neo">
                The EagleRanked
                <span className="block text-neo-blue">BLOG</span>
              </h1>
            </div>
            
            <div className="bg-neo-white neo-border neo-shadow p-6 max-w-4xl mx-auto mb-8 transform rotate-1">
              <p className="text-xl text-neo-black font-black leading-relaxed font-neo">
                EXPERT INSIGHTS, PROVEN STRATEGIES, AND ACTIONABLE TACTICS TO HELP YOU 
                DOMINATE SEARCH RANKINGS AND SCALE YOUR CONTENT MARKETING.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto">
              <div className="bg-neo-pink neo-border neo-shadow p-4 transform -rotate-1">
                <input
                  type="text"
                  placeholder="SEARCH ARTICLES..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 neo-border border-neo-black font-black text-neo-black placeholder-gray-600 uppercase tracking-wide font-neo bg-neo-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-neo-yellow neo-border neo-shadow p-4 mb-8 inline-block transform rotate-2">
              <h2 className="text-3xl font-black flex items-center gap-3 font-neo">
                <span className="bg-neo-green p-2">⭐</span>
                FEATURED ARTICLE
              </h2>
            </div>
            
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="neo-card cursor-pointer transform hover:rotate-1 transition-transform">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    {featuredPost.img_url && (
                      <img
                        src={featuredPost.img_url}
                        alt={featuredPost.title}
                        className="w-full h-64 md:h-full object-cover border-r-neo border-neo-black"
                      />
                    )}
                  </div>
                  <div className="md:w-1/2 p-8">
                    {featuredPost.keyword && (
                      <div className="bg-neo-green neo-border neo-shadow px-3 py-1 inline-block mb-4 transform -rotate-1">
                        <span className="font-black text-neo-black uppercase text-sm font-neo">
                          {featuredPost.keyword}
                        </span>
                      </div>
                    )}
                    <h3 className="text-3xl font-black mb-4 text-neo-black hover:text-neo-blue transition-colors font-neo">
                      {featuredPost.title}
                    </h3>
                    <p className="text-neo-black font-black text-lg mb-6 leading-relaxed font-neo">
                      {featuredPost.summary}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-neo-black mb-6 font-black font-neo">
                      <span>{new Date(featuredPost.published_at!).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                      <span>•</span>
                      <span>{Math.max(1, Math.ceil((featuredPost.content?.length || 0) / 200))} MIN READ</span>
                    </div>
                    <div className="bg-neo-pink neo-border neo-shadow px-6 py-3 inline-block transform rotate-1">
                      <span className="text-neo-white font-black uppercase font-neo">
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
          <div className="bg-neo-blue neo-border neo-shadow p-4 mb-8 inline-block transform -rotate-1">
            <h2 className="text-3xl font-black text-neo-white font-neo">LATEST ARTICLES</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article 
                  className="neo-card cursor-pointer transform transition-all duration-200"
                  style={{transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`}}
                >
                  {post.img_url && (
                    <div className="relative overflow-hidden">
                      <img
                        src={post.img_url}
                        alt={post.title}
                        className="w-full h-48 object-cover border-b-neo border-neo-black"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.keyword && (
                      <div className="bg-neo-blue neo-border border-2 border-neo-black px-2 py-1 inline-block mb-3 transform rotate-1">
                        <span className="text-neo-white font-black text-sm uppercase font-neo">
                          {post.keyword}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-black mt-3 mb-3 text-neo-black hover:text-neo-blue transition-colors line-clamp-2 font-neo">
                      {post.title}
                    </h3>
                    <p className="text-neo-black font-black mb-4 line-clamp-3 leading-relaxed font-neo">
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between text-sm text-neo-black font-black font-neo">
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
              <div className="bg-neo-gray neo-border neo-shadow p-8 max-w-md mx-auto transform rotate-2">
                <div className="text-neo-black mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-neo-black mb-2 font-neo">NO ARTICLES FOUND</h3>
                <p className="text-neo-black font-black font-neo">TRY ADJUSTING YOUR SEARCH TERMS</p>
              </div>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-neo-black py-16 border-t-neo border-neo-pink">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="bg-neo-pink neo-border border-neo-white neo-shadow p-8 max-w-4xl mx-auto mb-8 transform -rotate-2">
              <h2 className="text-3xl font-black text-neo-white mb-4 font-neo">
                READY TO DOMINATE SEARCH RANKINGS?
              </h2>
              <p className="text-xl text-neo-white font-black mb-8 font-neo">
                START IMPLEMENTING THESE STRATEGIES WITH EAGLERANKED'S AI-POWERED CONTENT MARKETING PLATFORM.
              </p>
              <a 
                href="https://eagleranked.com/signup" 
                className="bg-neo-yellow neo-border neo-shadow px-8 py-4 font-black text-neo-black hover:bg-yellow-300 transition-colors inline-block uppercase font-neo neo-hover"
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

    const featuredPost = posts && posts.length > 0 ? posts[0] : null
    const remainingPosts = posts ? posts.slice(1) : []

    return {
      props: { 
        posts: remainingPosts || [],
        featuredPost
      },
      revalidate: 3600
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