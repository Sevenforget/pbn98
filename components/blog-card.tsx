import Link from "next/link"
import type { Post } from "@/lib/data"
import Tag from "./tag"

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
      <Link href={`/posts/${post.id}`} className="block h-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-500 dark:text-gray-400">{post.date}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{post.readTime} 읽기</div>
          </div>
          <h2 className="text-xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{post.author}</div>
            <div className="flex flex-wrap gap-2 justify-end">
              {post.tags && post.tags.slice(0, 2).map((tag) => <Tag key={tag} name={tag} />)}
              {post.tags && post.tags.length > 2 && (
                <span className="text-sm text-gray-500 dark:text-gray-400">+{post.tags.length - 2}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
