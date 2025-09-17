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
  slug: string
  summary: string
  content: string
  img_url?: string
  published_at: string
  keyword?: string
  status: string
  author_name?: string
  meta_description?: string
}

interface Props {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogPost({ post, relatedPosts }: Props) {
  const publishedDate = new Date(post.published_at)
  const readingTime = Math.ceil(post.content.length / 1000) // Rough estimate

  return (
    <>
      <Head>
        <title>{post.title} | EagleRanked Blog</title>
        <meta name="description" content={post.meta_description || post.summary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://blog.eagleranked.com/blog/${post.slug}`} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={`${post.title} | EagleRanked Blog`} />
        <meta property="og:description" content={post.meta_description || post.summary} />
        <meta property="og:url" content={`https://blog.eagleranked.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="EagleRanked Blog" />
        <meta property="article:published_time" content={post.published_at} />
        {post.img_url && <meta property="og:image" content={post.img_url} />}
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | EagleRanked Blog`} />
        <meta name="twitter:description" content={post.meta_description || post.summary} />
        {post.img_url && <meta name="twitter:image" content={post.img_url} />}
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": post.title,
              "description": post.meta_description || post.summary,
              "author": {
                "@type": "Person",
                "name": post.author_name || "EagleRanked Team"
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
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="font-bold text-2xl text-gray-900">
                EagleRanked Blog
              </Link>
              <div className="flex space-x-6">
                <Link href="https://eagleranked.com" className="text-gray-600 hover:text-blue-600 font-medium">
                  Main Site
                </Link>
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  All Posts
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Article Header */}
        <article className="bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-8">
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  ← Back to Blog
                </Link>
              </nav>

              {/* Article Meta */}
              <div className="mb-8">
                {post.keyword && (
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {post.keyword}
                  </span>
                )}
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {post.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {post.summary}
                </p>

                <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
                  <div className="flex items-center">
                    <span>By {post.author_name || 'EagleRanked Team'}</span>
                  </div>
                  <div className="flex items-center">
                    <time dateTime={post.published_at}>
                      {publishedDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
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
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="leading-relaxed"
                />
              </div>

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">Ready to boost your SEO?</h3>
                  <p className="text-gray-600 mb-4">
                    Get expert help with your content marketing strategy and SEO optimization.
                  </p>
                  <Link 
                    href="https://eagleranked.com/contact"
                    className="inline-block bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Started Today
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                        {relatedPost.img_url && (
                          <img 
                            src={relatedPost.img_url} 
                            alt={relatedPost.title}
                            className="w-full h-32 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <h3 className="font-bold mb-2 hover:text-blue-600 line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {relatedPost.summary}
                          </p>
                          <div className="mt-3 text-xs text-gray-500">
                            {new Date(relatedPost.published_at).toLocaleDateString()}
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
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center space-x-8 mb-4">
                <Link href="/" className="hover:text-blue-400">Blog Home</Link>
                <Link href="https://eagleranked.com" className="hover:text-blue-400">Main Site</Link>
                <Link href="https://eagleranked.com/contact" className="hover:text-blue-400">Contact</Link>
              </div>
              <p className="text-gray-400 text-sm">
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

    // Get related posts (same keyword or recent posts)
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