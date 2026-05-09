'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { CartoonBoy, CartoonCloud, CartoonRocket, Star } from '@/components/UI/CartoonAssets'

const EMOJI_LIST = ['⭐', '✨', '💫', '🌟', '❄️', '🔮', '💜']

// Deterministic values — avoids SSR/client hydration mismatch from Math.random()
const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: ((i * 37 + 11) % 97) + 1,
  delay: (i % 8) * 0.5,
  duration: 3 + (i % 4) * 0.75,
  size: 6 + (i % 6) * 2,
  emoji: EMOJI_LIST[i % EMOJI_LIST.length],
}))

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: ((i * 53 + 7) % 98) + 1,
  y: ((i * 29 + 13) % 68) + 1,
  delay: (i % 6) * 0.5,
  size: 1 + (i % 3),
}))

const CLOUDS = [
  { id: 1, top: '8%', duration: 22, delay: 0, scale: 1.2, opacity: 0.9 },
  { id: 2, top: '18%', duration: 30, delay: 5, scale: 0.8, opacity: 0.7 },
  { id: 3, top: '28%', duration: 18, delay: 10, scale: 1.0, opacity: 0.85 },
  { id: 4, top: '12%', duration: 26, delay: 15, scale: 0.6, opacity: 0.6 },
]

export default function HeroSection({
  onEnter,
  siteEntered,
  isDarkMode,
}: {
  onEnter: () => void
  siteEntered: boolean
  isDarkMode: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, -150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const [showEnterTransition, setShowEnterTransition] = useState(false)
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      setEyePos({ x: dx * 5, y: dy * 5 })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const handleEnter = () => {
    setShowEnterTransition(true)
    setTimeout(() => {
      onEnter()
      setShowEnterTransition(false)
    }, 1000)
  }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: isDarkMode
          ? 'radial-gradient(ellipse at top, #0D0B2B 0%, #1A1545 40%, #2D1B6E 70%, #1A1545 100%)'
          : 'linear-gradient(180deg, #1A237E 0%, #283593 30%, #3949AB 60%, #5C6BC0 100%)',
      }}
    >
      {/* Cinematic enter transition */}
      <AnimatePresence>
        {showEnterTransition && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none">
        {STARS.map(star => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 2 + star.delay, delay: star.delay, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Moon */}
      <motion.div
        className="absolute top-16 right-20 hidden md:block"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ y }}
      >
        <div
          className="w-28 h-28 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #FFF9C4, #FFD700)',
            boxShadow: '0 0 40px rgba(255,215,0,0.5), 0 0 80px rgba(255,215,0,0.2)',
            border: '3px solid rgba(255,215,0,0.3)',
          }}
        />
        <div className="absolute top-4 left-5 w-4 h-4 rounded-full bg-yellow-200/30" />
        <div className="absolute top-8 left-14 w-6 h-6 rounded-full bg-yellow-200/20" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map(p => (
          <motion.div
            key={p.id}
            className="absolute select-none"
            style={{ left: `${p.x}%`, bottom: '-5%', fontSize: p.size }}
            animate={{ y: [0, -1200], opacity: [0, 1, 1, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </div>

      {/* Moving clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {CLOUDS.map(cloud => (
          <motion.div
            key={cloud.id}
            className="absolute"
            style={{ top: cloud.top, width: 220, scale: cloud.scale, opacity: cloud.opacity }}
            animate={{ x: ['-220px', '110vw'] }}
            transition={{ duration: cloud.duration, delay: cloud.delay, repeat: Infinity, ease: 'linear' }}
          >
            <CartoonCloud color="rgba(255,255,255,0.85)" />
          </motion.div>
        ))}
      </div>

      {/* Floating islands / ground */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-48 md:h-64"
        style={{ y: useTransform(scrollY, [0, 600], [0, 80]) }}
      >
        {/* Ground */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 rounded-t-[60%]"
          style={{ background: 'linear-gradient(180deg, #4CAF50 0%, #388E3C 60%, #2E7D32 100%)' }}
        />
        {/* Trees */}
        {[10, 25, 75, 88].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute bottom-20"
            style={{ left: `${pos}%` }}
            animate={{ scaleY: [1, 1.02, 1] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity }}
          >
            <div className="flex flex-col items-center">
              <div
                className="rounded-full"
                style={{
                  width: 40 + i * 8,
                  height: 50 + i * 10,
                  background: `linear-gradient(135deg, #${['66BB6A','43A047','2E7D32','1B5E20'][i]}, #1B5E20)`,
                  border: '3px solid #1a1a2e',
                  boxShadow: '3px 3px 0 #1a1a2e',
                }}
              />
              <div
                style={{
                  width: 10,
                  height: 20,
                  background: '#8B4513',
                  border: '2px solid #1a1a2e',
                }}
              />
            </div>
          </motion.div>
        ))}
        {/* Castle silhouette */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-7xl md:text-9xl opacity-30"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          🏰
        </motion.div>
      </motion.div>

      {/* Main hero content */}
      <motion.div
        className="relative z-20 flex flex-col items-center text-center px-4 pt-16"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 px-5 py-2 rounded-full text-sm font-bold text-white/90 tracking-widest uppercase"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '2px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
          }}
        >
          ✨ Welcome to
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          <h1
            className="text-6xl md:text-8xl lg:text-9xl text-white mb-2 leading-none"
            style={{
              fontFamily: 'Fredoka One, cursive',
              textShadow: '4px 4px 0 #1a1a2e, 8px 8px 0 rgba(107,53,217,0.5)',
            }}
          >
            Cartoon
          </h1>
          <h1
            className="text-6xl md:text-8xl lg:text-9xl leading-none"
            style={{
              fontFamily: 'Fredoka One, cursive',
              background: 'linear-gradient(135deg, #FFD700, #FF8C00, #FF6B9D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(4px 4px 0 #1a1a2e)',
            }}
          >
            World
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-white/80 text-lg md:text-xl mt-4 mb-8 max-w-md font-bold"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          A creative 2D experience that&apos;s fun, interactive and full of surprises! 🌟
        </motion.p>

        {/* Enter button */}
        <motion.button
          onClick={handleEnter}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 300 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-10 py-5 rounded-full text-xl font-bold text-gray-900 uppercase tracking-wider shine-effect btn-press"
          style={{
            fontFamily: 'Fredoka One, cursive',
            background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
            border: '4px solid #1a1a2e',
            boxShadow: '0 0 30px rgba(255,215,0,0.7), 0 0 60px rgba(255,215,0,0.4), 6px 6px 0 #1a1a2e',
            letterSpacing: '1px',
          }}
        >
          <span className="flex items-center gap-3">
            Enter Website
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ▶
            </motion.span>
          </span>
        </motion.button>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex flex-wrap gap-4 mt-10 justify-center"
        >
          {[
            { icon: '🎬', label: 'Video Animation' },
            { icon: '🌊', label: 'Smooth Scroll' },
            { icon: '🖱️', label: 'Interactive' },
            { icon: '😊', label: 'Cute Characters' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white/90 font-bold text-sm"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
              }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            >
              <span>{item.icon}</span>
              <span style={{ fontFamily: 'Nunito, sans-serif' }}>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Character in hero */}
      <motion.div
        className="absolute bottom-28 right-8 md:right-24 w-28 md:w-44 z-30"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 120 }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="idle-bob"
        >
          <CartoonBoy
            style={{
              filter: 'drop-shadow(4px 4px 0 rgba(0,0,0,0.5))',
            }}
          />
          {/* Eye-tracking overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ top: '30%', left: '38%' }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#1a1a2e',
                transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
                transition: 'transform 0.1s ease',
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating rocket */}
      <motion.div
        className="absolute top-24 left-10 md:left-24 w-16 md:w-24 z-10"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <CartoonRocket />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-xs font-bold tracking-widest uppercase">Scroll Down</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <motion.div
            className="w-1.5 h-3 bg-white/50 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 z-20">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z"
            fill={isDarkMode ? '#1A1545' : '#E3F2FD'}
          />
        </svg>
      </div>
    </section>
  )
}
