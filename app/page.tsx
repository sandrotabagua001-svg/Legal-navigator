import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0E1A] text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(ellipse, #C9A84C 0%, transparent 70%)' }}
      />
      <nav className="relative z-10 flex items-center
