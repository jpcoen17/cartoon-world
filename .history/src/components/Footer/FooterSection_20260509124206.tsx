'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { CartoonBoy, CartoonRocket } from '@/components/UI/CartoonAssets'

const ANIMATED_STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: ((i * 53 + 17) % 97) + 1,
  y: ((i * 31 + 7) % 58) + 1,
  delay: (i % 6) * 0.5,
  size: 2 + (i % 3),
}))

export default function FooterSection({ isDarkMode }: { isDarkMode: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [rocketLaunched, setRocketLaunched] = useState(false)
  const [waveCount, setWaveCount] = useState(0)

  const handleWave = () => {
    setWaveCount(c => c + 1)
  }

  const handleLaunchRocket = () => {
    setRocketLaunched(true)
    setTimeout(() => setRocketLaunched(false), 3000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      id="footer"
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: '70vh' }}
    >
      {/* Sunset gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: isDarkMode
            ? 'linear-gradient(180deg, #0D0B2B 0%, #1A0A2E 30%, #2D1B0E 60%, #1A1545 100%)'
            : 'linear-gradient(180deg, #FF6B35 0%, #F7931E 25%, #FFD700 55%, #87CEEB 80%, #B8E4F9 100%)',
        }}
      />

      {/* Animated stars */}
      <div className="absolute inset-0 pointer-events-none">
        {ANIMATED_STARS.map(star => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: [0, 1, 0.5, 1], scale: [0.5, 1.2, 0.8, 1] } : {}}
            transition={{ duration: 2, delay: star.delay, repeat: Infinity, repeatType: 'reverse' }}
          />
        ))}
      </div>

      {/* Sun / Moon */}
      <motion.div
        className="absolute right-12 md:right-24"
        style={{ top: '8%' }}
        initial={{ y: -100, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <motion.div
          className="w-20 h-20 md:w-28 md:h-28 rounded-full"
          style={{
            background: isDarkMode
              ? 'radial-gradient(circle at 35% 35%, #FFF9C4, #FFD700)'
              : 'radial-gradient(circle at 35% 35%, #FFEB3B, #FF6B35)',
            boxShadow: isDarkMode
              ? '0 0 40px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.3)'
              : '0 0 60px rgba(255,107,53,0.7), 0 0 120px rgba(255,215,0,0.4)',
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Rays */}
        {!isDarkMode && Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 origin-left"
            style={{
              width: 40,
              height: 3,
              background: 'rgba(255,215,0,0.5)',
              borderRadius: 4,
              transform: `rotate(${i * 45}deg) translateX(50px)`,
            }}
            animate={{ scaleX: [0.5, 1.2, 0.5], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }}
          />
        ))}
      </motion.div>

      {/* Flying rocket */}
      <motion.div
        className="absolute w-14 md:w-20 z-20"
        initial={{ x: '-20%', y: '60%', rotate: 45 }}
        animate={
          inView
            ? rocketLaunched
              ? { x: '120%', y: '-30%', rotate: 45, transition: { duration: 2, ease: 'easeIn' } }
              : { x: ['-10%', '0%', '-5%'], y: ['65%', '55%', '60%'], rotate: 45 }
            : { x: '-20%', y: '60%' }
        }
        transition={rocketLaunched ? {} : { duration: 4, repeat: Infinity }}
      >
        <CartoonRocket />
      </motion.div>

      {/* Ground / hill */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full" style={{ height: 180 }}>
          <path
            d="M0,100 Q200,40 400,100 Q600,160 800,100 Q1000,40 1200,80 Q1350,100 1440,80 L1440,200 L0,200 Z"
            fill={isDarkMode ? '#1A1545' : '#4CAF50'}
          />
          <path
            d="M0,120 Q250,70 500,120 Q750,170 1000,110 Q1200,70 1440,100 L1440,200 L0,200 Z"
            fill={isDarkMode ? '#0D0B2B' : '#388E3C'}
          />
        </svg>

        {/* Ground decorations */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-around items-end px-4">
          {['🌲', '🌳', '🏠', '🌲', '🌳', '🌲'].map((item, i) => (
            <motion.span
              key={i}
              className="text-3xl md:text-4xl"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-20 pb-48 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <h2
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            style={{
              fontFamily: 'Fredoka One, cursive',
              textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
            }}
          >
            Thanks for{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FF6B9D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Visiting!
            </span>
          </h2>
          <p
            className="text-white/80 text-lg md:text-xl mb-8"
            style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700 }}
          >
            See you again in the next adventure! 🚀
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={scrollToTop}
              className="px-8 py-3.5 rounded-full font-bold text-gray-900 flex items-center gap-2 shine-effect btn-press"
              style={{
                fontFamily: 'Fredoka One, cursive',
                background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
                border: '3px solid #1a1a2e',
                boxShadow: '5px 5px 0 #1a1a2e',
                fontSize: '1.05rem',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔝 Go to Top
            </motion.button>

            <motion.button
              onClick={handleLaunchRocket}
              className="px-8 py-3.5 rounded-full font-bold text-white flex items-center gap-2 btn-press"
              style={{
                fontFamily: 'Fredoka One, cursive',
                background: 'linear-gradient(135deg, #E74C3C, #C0392B)',
                border: '3px solid #1a1a2e',
                boxShadow: '5px 5px 0 #1a1a2e',
                fontSize: '1.05rem',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Launch Rocket!
            </motion.button>
          </div>
        </motion.div>

        {/* Waving character */}
        <motion.div
          className="relative mt-10 w-28 md:w-36 cursor-pointer"
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 0.6, type: 'spring' }}
          onClick={handleWave}
          title="Click to wave!"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <CartoonBoy style={{ filter: 'drop-shadow(3px 3px 0 rgba(0,0,0,0.3))' }} />
          </motion.div>

          {/* Wave speech bubble */}
          {waveCount > 0 && (
            <motion.div
              key={waveCount}
              className="absolute -top-10 -right-8 px-3 py-1 rounded-xl text-sm font-bold"
              style={{
                background: 'white',
                border: '2px solid #1a1a2e',
                boxShadow: '2px 2px 0 #1a1a2e',
                color: '#1a1a2e',
                fontFamily: 'Nunito, sans-serif',
                whiteSpace: 'nowrap',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              {['👋 Bye bye!', '🌟 See ya!', '❤️ Thanks!', '✨ Come back!'][waveCount % 4]}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 py-4 px-6 text-center z-20"
        style={{
          background: isDarkMode ? 'rgba(13,11,43,0.9)' : 'rgba(30,60,30,0.9)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            <span
              className="font-bold text-white"
              style={{ fontFamily: 'Fredoka One, cursive' }}
            >
              Cartoon World
            </span>
          </div>

          <p
            className="text-white/60 text-sm"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            © 2026 Cartoon World. All rights reserved. Made by Muhammad Iklil
          </p>

          <div className="flex gap-4 text-white/60 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>
            <motion.a href="#" whileHover={{ color: '#FFD700', y: -2 }} className="transition-colors">
              Privacy
            </motion.a>
            <motion.a href="#" whileHover={{ color: '#FFD700', y: -2 }} className="transition-colors">
              Terms
            </motion.a>
            <motion.a href="#" whileHover={{ color: '#FFD700', y: -2 }} className="transition-colors">
              Contact
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  )
}
