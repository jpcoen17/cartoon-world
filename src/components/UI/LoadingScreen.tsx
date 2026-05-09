'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

// Fixed seeds so SSR and client match exactly
const STAR_DATA = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: ((i * 37 + 11) % 97) + 1.5,
  y: ((i * 53 + 7) % 95) + 1.5,
  delay: (i % 5) * 0.4,
  size: (i % 3) + 1.5,
}))

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Entering Cartoon World...')

  const texts = [
    'Painting the sky... ☁️',
    'Waking up characters... 🌟',
    'Loading magic... ✨',
    'Almost there... 🚀',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 15
        return Math.min(next, 100)
      })
    }, 200)

    let textIndex = 0
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length
      setLoadingText(texts[textIndex])
    }, 700)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  const stars = STAR_DATA

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Star field */}
      <div className="absolute inset-0">
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, delay: star.delay, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Moon */}
      <motion.div
        className="absolute top-10 right-16 text-8xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🌕
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Spinning planet/logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="relative"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cartoon-purple to-cartoon-blue border-4 border-white shadow-2xl flex items-center justify-center text-5xl">
            🌍
          </div>
          {/* Orbit ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-400 opacity-50 scale-125" />
          {/* Orbiting star */}
          <motion.div
            className="absolute text-xl"
            style={{ top: '-8px', left: '50%' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            ⭐
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1
            className="text-5xl md:text-7xl text-white mb-2"
            style={{ fontFamily: 'Fredoka One, cursive' }}
          >
            Cartoon World
          </h1>
          <p className="text-cartoon-yellow text-lg font-bold tracking-widest uppercase">
            Loading Your Adventure
          </p>
        </motion.div>

        {/* Loading bar */}
        <div className="w-72 md:w-96">
          <div className="flex justify-between mb-2">
            <span className="text-white text-sm font-bold">{loadingText}</span>
            <span className="text-cartoon-yellow font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-cartoon-night-mid rounded-full h-4 border-2 border-cartoon-purple overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #6B35D9, #FFD700, #FF6B9D)',
                width: `${progress}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Floating emojis */}
        <div className="flex gap-6">
          {['🌟', '🎮', '🦄', '🎪', '🌈'].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-3xl"
              animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
