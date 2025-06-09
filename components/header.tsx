import Link from "next/link"

export default function Header() {
  return (
    <header className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/soft-geometric-pattern.png')",
          filter: "brightness(0.7)",
        }}
      />
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 text-center">
        <Link href="/">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Mindful Blog
            </span>
          </h1>
        </Link>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">창의적인 생각과 유용한 정보를 공유하는 공간</p>
      </div>
    </header>
  )
}
