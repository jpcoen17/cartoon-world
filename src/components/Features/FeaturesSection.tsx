'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const FEATURES = [
  {
    icon: '🎮',
    title: 'Interactive Animations',
    desc: 'Lovely characters that react to you and share animations!',
    color: '#6B35D9',
    bg: 'linear-gradient(135deg, #6B35D9, #9B59F0)',
    delay: 0,
  },
  {
    icon: '🐱',
    title: 'Cute Characters',
    desc: 'Adorable cartoon friends that come alive on your screen.',
    color: '#FF6B9D',
    bg: 'linear-gradient(135deg, #FF6B9D, #FF9EC4)',
    delay: 0.1,
  },
  {
    icon: '⭐',
    title: 'Playful Experience',
    desc: 'Engaging interactions and micro animations everywhere.',
    color: '#FFD700',
    bg: 'linear-gradient(135deg, #FFD700, #FF8C00)',
    delay: 0.2,
  },
  {
    icon: '🌈',
    title: 'Vibrant Worlds',
    desc: 'Explore colorful environments with rich storytelling.',
    color: '#4CAF50',
    bg: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
    delay: 0.3,
  },
  {
    icon: '🚀',
    title: 'Smooth Transitions',
    desc: 'Cinematic transitions between every section.',
    color: '#2D5BE3',
    bg: 'linear-gradient(135deg, #2D5BE3, #5C8EFF)',
    delay: 0.4,
  },
  {
    icon: '✨',
    title: 'Magic Effects',
    desc: 'Particle effects, glow, and sparkles on every hover.',
    color: '#FF6B35',
    bg: 'linear-gradient(135deg, #FF6B35, #FF9F7A)',
    delay: 0.5,
  },
]

function FeatureCard({ feature, isDarkMode }: { feature: typeof FEATURES[0]; isDarkMode: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotate: -3 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ delay: feature.delay, type: 'spring', stiffness: 200 }}
      whileHover={{
        y: -10,
        rotate: 2,
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      className="relative p-6 rounded-3xl cartoon-card"
      style={{
        background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'white',
        border: `3px solid ${feature.color}`,
        boxShadow: isDarkMode
          ? `6px 6px 0 ${feature.color}44`
          : `6px 6px 0 ${feature.color}`,
      }}
    >
      {/* Top gradient bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
        style={{ background: feature.bg }}
      />

      {/* Icon */}
      <motion.div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
        style={{ background: feature.bg, border: '3px solid #1a1a2e', boxShadow: '3px 3px 0 #1a1a2e' }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, delay: feature.delay, repeat: Infinity }}
      >
        {feature.icon}
      </motion.div>

      {/* Content */}
      <h3
        className="text-xl font-bold mb-2"
        style={{
          fontFamily: 'Fredoka One, cursive',
          color: isDarkMode ? 'white' : '#1a1a2e',
        }}
      >
        {feature.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{
          fontFamily: 'Nunito, sans-serif',
          color: isDarkMode ? 'rgba(255,255,255,0.65)' : '#444',
        }}
      >
        {feature.desc}
      </p>

      {/* Hover sparkles */}
      <motion.div
        className="absolute top-3 right-3 text-lg"
        animate={{ rotate: [0, 360], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 3, delay: feature.delay, repeat: Infinity }}
      >
        ✨
      </motion.div>
    </motion.div>
  )
}

export default function FeaturesSection({ isDarkMode }: { isDarkMode: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="features"
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background: isDarkMode
          ? 'linear-gradient(180deg, #1A1545 0%, #0D0B2B 100%)'
          : 'linear-gradient(180deg, #E3F2FD 0%, #F3E5F5 100%)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: 200 + i * 50,
              height: 200 + i * 50,
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 100}%`,
              background: ['#6B35D9', '#FF6B9D', '#FFD700', '#4CAF50', '#2D5BE3', '#FF6B35', '#9B59F0', '#FF8C00'][i],
            }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4 px-5 py-2 rounded-full text-sm font-bold"
            style={{
              background: 'linear-gradient(135deg, #6B35D9, #9B59F0)',
              color: 'white',
              fontFamily: 'Nunito, sans-serif',
            }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Awesome Features
          </motion.div>
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              fontFamily: 'Fredoka One, cursive',
              color: isDarkMode ? 'white' : '#1a1a2e',
              textShadow: isDarkMode ? '3px 3px 0 rgba(107,53,217,0.5)' : '3px 3px 0 rgba(0,0,0,0.1)',
            }}
          >
            Built for Fun,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FF6B9D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Made for You
            </span>
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{
              fontFamily: 'Nunito, sans-serif',
              color: isDarkMode ? 'rgba(255,255,255,0.65)' : '#555',
            }}
          >
            Everything you love about cartoons, packed into one incredible interactive experience.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(feature => (
            <FeatureCard key={feature.title} feature={feature} isDarkMode={isDarkMode} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => document.querySelector('#playground')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 rounded-full text-lg font-bold text-white shine-effect btn-press"
            style={{
              fontFamily: 'Fredoka One, cursive',
              background: 'linear-gradient(135deg, #6B35D9, #FF6B9D)',
              border: '3px solid #1a1a2e',
              boxShadow: '5px 5px 0 #1a1a2e',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎮 Try the Playground →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
