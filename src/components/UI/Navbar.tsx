'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'

const navLinks = [
  { label: 'About', href: '#story' },
  { label: 'Features', href: '#features' },
  { label: 'Playground', href: '#playground' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Navbar({ isDarkMode }: { isDarkMode: boolean }) {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95])
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{}}
    >
      <motion.div
        className="absolute inset-0 backdrop-blur-md rounded-b-2xl"
        style={{
          opacity: bgOpacity,
          background: isDarkMode
            ? 'rgba(13,11,43,0.95)'
            : 'rgba(255,255,255,0.95)',
        }}
      />

      <div className="relative max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-3xl">🌍</span>
          <span
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'Fredoka One, cursive' }}
          >
            <span className="text-cartoon-yellow">Cartoon</span>{' '}
            <span className={isDarkMode ? 'text-white' : 'text-cartoon-purple'}>World</span>
          </span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className={`font-bold text-sm tracking-wide transition-colors ${
                isDarkMode ? 'text-white/80 hover:text-cartoon-yellow' : 'text-gray-700 hover:text-cartoon-purple'
              }`}
              whileHover={{ y: -2 }}
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              {link.label}
            </motion.button>
          ))}
        </div>

        {/* CTA button */}
        <motion.button
          onClick={() => scrollTo('#playground')}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white relative overflow-hidden shine-effect"
          style={{
            background: 'linear-gradient(135deg, #6B35D9, #FF6B9D)',
            border: '2px solid rgba(255,255,255,0.3)',
            fontFamily: 'Fredoka One, cursive',
            letterSpacing: '0.5px',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎮 Play Now!
        </motion.button>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? '✕' : '☰'}
        </motion.button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mt-4 rounded-2xl p-4 flex flex-col gap-3"
          style={{ background: isDarkMode ? 'rgba(13,11,43,0.98)' : 'rgba(255,255,255,0.98)' }}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className={`text-left font-bold py-2 px-4 rounded-xl ${
                isDarkMode ? 'text-white hover:bg-cartoon-purple/30' : 'text-gray-700 hover:bg-cartoon-purple/10'
              }`}
            >
              {link.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
