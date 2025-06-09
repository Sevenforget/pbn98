import { posts } from "@/lib/data"
import Header from "@/components/header"
import BlogCard from "@/components/blog-card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">최신 글</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  )
}
