import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { createClient } from '@supabase/supabase-js'
import BlogHeader from '../../components/BlogHeader'
import BlogFooter from '../../components/BlogFooter'

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
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogPost({ post, relatedPosts }: Props) {
  const publishedDate = new Date(post.published_at!)
  const readingTime = Math.max(1, Math.ceil((post.content?.length || 0) / 200))

  return (
    <>
      <Head>
        <title>{post.title} | EagleRanked Blog</title>
        <meta name="description" content={post.summary || `Read ${post.title} on EagleRanked Blog`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://blog.eagleranked.com/blog/${post.slug}`} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={`${post.title} | EagleRanked Blog`} />
        <meta property="og:description" content={post.summary || `Read ${post.title} on EagleRanked Blog`} />
        <meta property="og:url" content={`https://blog.eagleranked.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="EagleRanked Blog" />
        <meta property="article:published_time" content={post.published_at!} />
        {post.img_url && <meta property="og:image" content={post.img_url} />}
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | EagleRanked Blog`} />
        <meta name="twitter:description" content={post.summary || `Read ${post.title} on EagleRanked Blog`} />
        {post.img_url && <meta name="twitter:image" content={post.img_url} />}
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": post.title,
              "description": post.summary || post.title,
              "author": {
                "@type": "Organization",
                "name": "EagleRanked Team"
              },
              "publisher": {
                "@type": "Organization",
                "name": "EagleRanked",
                "url": "https://eagleranked.com"
              },
              "datePublished": post.published_at,
              "url": `https://blog.eagleranked.com/blog/${post.slug}`,
              ...(post.img_url && { "image": post.img_url })
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-white">
        <BlogHeader />

        {/* Article */}
        <article className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <div className="mb-8">
                <Link href="/">
                  <div className="bg-pink-500 border-4 border-black px-6 py-3 inline-block hover:bg-pink-400 transition-colors">
                    <span className="text-white font-black uppercase">← BACK TO BLOG</span>
                  </div>
                </Link>
              </div>

              {/* Article Meta */}
              <div className="mb-8">
                {post.keyword && (
                  <div className="bg-green-400 border-4 border-black px-4 py-2 inline-block mb-6 transform -rotate-1">
                    <span className="font-black text-black uppercase">
                      {post.keyword}
                    </span>
                  </div>
                )}
                
                <div className="bg-yellow-400 border-4 border-black p-8 mb-6 transform rotate-1">
                  <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight transform -rotate-1">
                    {post.title}
                  </h1>
                </div>
                
                {post.summary && (
                  <div className="bg-white border-4 border-black p-6 mb-8">
                    <p className="text-xl text-black font-bold leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                )}

                <div className="bg-gray-100 border-4 border-black p-4 mb-8">
                  <div className="flex flex-wrap items-center text-sm text-black font-black gap-4">
                    <div className="flex items-center">
                      <span>BY EAGLERANKED TEAM</span>
                    </div>
                    <div className="flex items-center">
                      <span>•</span>
                    </div>
                    <div className="flex items-center">
                      <time dateTime={post.published_at!}>
                        {publishedDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <div className="flex items-center">
                      <span>•</span>
                    </div>
                    <div className="flex items-center">
                      <span>{readingTime} MIN READ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {post.img_url && (
                <div className="mb-12">
                  <div className="border-4 border-black">
                    <img 
                      src={post.img_url} 
                      alt={post.title}
                      className="w-full h-64 md:h-96 object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {post.content ? (
                  <div className="bg-white border-4 border-black p-8">
                    <div 
                      dangerouslySetInnerHTML={{ __html: post.content }}
                      className="leading-relaxed text-black font-medium"
                    />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-yellow-400 border-4 border-black p-8">
                      <p className="text-black font-black text-lg">CONTENT COMING SOON...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Article CTA */}
              <div className="mt-12 pt-8">
                <div className="bg-gradient-to-r from-blue-600 to-pink-500 border-4 border-black p-8 text-white text-center">
                  <h3 className="text-2xl font-black mb-4">READY TO SCALE YOUR CONTENT MARKETING?</h3>
                  <p className="text-lg font-bold mb-6">
                    GET EXPERT HELP IMPLEMENTING THESE STRATEGIES WITH EAGLERANKED'S AI-POWERED PLATFORM.
                  </p>
                  <a 
                    href="https://eagleranked.com/signup"
                    className="bg-yellow-400 border-4 border-black text-black font-black py-3 px-8 hover:bg-yellow-300 transition-colors inline-block uppercase"
                  >
                    START YOUR FREE TRIAL →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-100 py-16 border-t-4 border-black">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-blue-600 border-4 border-black p-4 mb-8 inline-block">
                  <h2 className="text-3xl font-black text-white text-center">RELATED ARTICLES</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <article className="bg-white border-4 border-black hover:shadow-[8px_8px_0_0_#000] transition-all duration-200 cursor-pointer">
                        {relatedPost.img_url && (
                          <img 
                            src={relatedPost.img_url} 
                            alt={relatedPost.title}
                            className="w-full h-32 object-cover border-b-4 border-black"
                          />
                        )}
                        <div className="p-4">
                          <h3 className="font-black mb-2 hover:text-blue-600 line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          {relatedPost.summary && (
                            <p className="text-sm text-black font-bold line-clamp-2 mb-3">
                              {relatedPost.summary}
                            </p>
                          )}
                          <div className="text-xs text-black font-black">
                            {new Date(relatedPost.published_at!).toLocaleDateString()}
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <BlogFooter />
      </div>
    </>
  )
}

// Generate static paths for all blog posts
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: posts } = await supabase
      .from('company_blog_posts')
      .select('slug')
      .eq('status', 'published')

    const paths = (posts || []).map((post) => ({
      params: { slug: post.slug }
    }))

    return {
      paths,
      fallback: 'blocking' // Enable ISR for new posts
    }
  } catch (error) {
    console.error('Error in getStaticPaths:', error)
    return {
      paths: [],
      fallback: 'blocking'
    }
  }
}

// Get post data for each page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string

    // Get the main post
    const { data: post, error } = await supabase
      .from('company_blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !post) {
      return {
        notFound: true
      }
    }

    // Get related posts (recent posts excluding current)
    const { data: relatedPosts } = await supabase
      .from('company_blog_posts')
      .select('id, title, slug, summary, img_url, published_at')
      .eq('status', 'published')
      .neq('id', post.id)
      .limit(3)
      .order('published_at', { ascending: false })

    return {
      props: {
        post,
        relatedPosts: relatedPosts || []
      },
      revalidate: 3600 // Revalidate every hour
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true
    }
  }
}