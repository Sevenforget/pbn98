interface TagProps {
  name: string
}

export default function Tag({ name }: TagProps) {
  // 태그별 색상 지정
  const getTagColor = (tag: string) => {
    const colors = {
      디자인: "bg-pink-100 text-pink-800",
      UX: "bg-purple-100 text-purple-800",
      시스템: "bg-indigo-100 text-indigo-800",
      React: "bg-blue-100 text-blue-800",
      JavaScript: "bg-yellow-100 text-yellow-800",
      프론트엔드: "bg-green-100 text-green-800",
      생산성: "bg-orange-100 text-orange-800",
      시간관리: "bg-red-100 text-red-800",
      자기계발: "bg-teal-100 text-teal-800",
      개발: "bg-cyan-100 text-cyan-800",
      습관: "bg-emerald-100 text-emerald-800",
      성장: "bg-lime-100 text-lime-800",
      미니멀리즘: "bg-violet-100 text-violet-800",
      디지털: "bg-fuchsia-100 text-fuchsia-800",
    }

    return colors[tag as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTagColor(name)}`}>{name}</span>
}
