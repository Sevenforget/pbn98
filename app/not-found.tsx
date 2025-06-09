import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link href="/" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        홈으로 돌아가기
      </Link>
    </div>
  )
}
