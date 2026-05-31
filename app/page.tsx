import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Legal Navigator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Ваш AI-помощник по правовым вопросам
          </p>
          <Link
            href="/chat"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Начать консультацию
          </Link>
        </div>
      </div>
    </main>
  )
}
