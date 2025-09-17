import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { createClient } from '@supabase/supabase-js'

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
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-eagle-blue hover:text-eagle-dark transition-colors">
                EagleRanked Blog
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  ← Back to Blog
                </Link>
                <Link href="https://eagleranked.com" className="bg-eagle-blue text-white px-4 py-2 rounded-lg hover:bg-eagle-dark transition-colors">
                  Main Site
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Article */}
        <article className="bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              {/* Article Meta */}
              <div className="mb-8">
                {post.keyword && (
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
                    {post.keyword}
                  </span>
                )}
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                
                {post.summary && (
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {post.summary}
                  </p>
                )}

                <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-8">
                  <div className="flex items-center">
                    <span>By EagleRanked Team</span>
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
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {post.img_url && (
                <div className="mb-12">
                  <img 
                    src={post.img_url} 
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {post.content ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="leading-relaxed"
                  />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">Content coming soon...</p>
                  </div>
                )}
              </div>

              {/* Article CTA */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="bg-gradient-to-r from-eagle-blue to-blue-600 rounded-xl p-8 text-white text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Scale Your Content Marketing?</h3>
                  <p className="text-blue-100 mb-6 text-lg">
                    Get expert help implementing these strategies with EagleRanked's AI-powered platform.
                  </p>
                  <Link 
                    href="https://eagleranked.com/signup"
                    className="inline-block bg-white text-eagle-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Start Your Free Trial
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <article className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                        {relatedPost.img_url && (
                          <img 
                            src={relatedPost.img_url} 
                            alt={relatedPost.title}
                            className="w-full h-32 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <h3 className="font-bold mb-2 hover:text-eagle-blue line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          {relatedPost.summary && (
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                              {relatedPost.summary}
                            </p>
                          )}
                          <div className="text-xs text-gray-500">
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

        {/* Footer */}
        <footer className="bg-white border-t py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center space-x-8 mb-6">
                <Link href="/" className="text-gray-600 hover:text-eagle-blue">Blog Home</Link>
                <Link href="https://eagleranked.com" className="text-gray-600 hover:text-eagle-blue">Main Site</Link>
                <Link href="https://eagleranked.com/contact" className="text-gray-600 hover:text-eagle-blue">Contact</Link>
              </div>
              <p className="text-gray-500 text-sm">
                &copy; 2024 EagleRanked. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
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