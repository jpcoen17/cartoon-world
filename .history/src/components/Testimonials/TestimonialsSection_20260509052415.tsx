'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aulia P.',
    role: 'UI Designer',
    avatar: '👧',
    color: '#FF6B9D',
    bg: 'linear-gradient(135deg, #FF6B9D22, #FF9EC422)',
    text: '"This is the most creative website I\'ve ever seen! The animations are so smooth and the characters are adorable."',
    rating: 5,
    idle: 'wave',
  },
  {
    id: 2,
    name: 'Dimas R.',
    role: 'Developer',
    avatar: '👦',
    color: '#6B35D9',
    bg: 'linear-gradient(135deg, #6B35D922, #9B59F022)',
    text: '"Super smooth animations and so much fun! The playground section had me clicking for 20 minutes straight."',
    rating: 5,
    idle: 'bounce',
  },
  {
    id: 3,
    name: 'Nadia K.',
    role: 'Product Manager',
    avatar: '🧑',
    color: '#FFD700',
    bg: 'linear-gradient(135deg, #FFD70022, #FF8C0022)',
    text: '"The characters are so cute and interactive! This is what the web should feel like — fun and alive."',
    rating: 5,
    idle: 'spin',
  },
  {
    id: 4,
    name: 'Rafi M.',
    role: 'Creative Director',
    avatar: '🧒',
    color: '#4CAF50',
    bg: 'linear-gradient(135deg, #4CAF5022, #66BB6A22)',
    text: '"Incredible attention to detail. Every scroll, every hover, every click feels magical. 10/10 experience."',
    rating: 5,
    idle: 'wave',
  },
  {
    id: 5,
    name: 'Siti A.',
    role: 'Illustrator',
    avatar: '👩',
    color: '#2D5BE3',
    bg: 'linear-gradient(135deg, #2D5BE322, #5C8EFF22)',
    text: '"As an illustrator, this blew my mind. The way the 2D world comes to life is pure magic. Love it!"',
    rating: 5,
    idle: 'bounce',
  },
]

function CartoonAvatar({
  avatar,
  color,
  idle,
  isActive,
}: {
  avatar: string
  color: string
  idle: string
  isActive: boolean
}) {
  const animations = {
    wave: { rotate: [0, 15, -5, 15, 0] },
    bounce: { y: [0, -12, 0] },
    spin: { rotate: [0, 360] },
  }

  return (
    <motion.div
      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl relative"
      style={{
        background: `${color}22`,
        border: `3px solid ${color}`,
        boxShadow: `3px 3px 0 #1a1a2e`,
      }}
      animate={isActive ? (animations[idle as keyof typeof animations] || animations.wave) : { scale: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
    >
      {avatar}
      {isActive && (
        <motion.div
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-xs"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  )
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
          className="text-lg"
        >
          ⭐
        </motion.span>
      ))}
    </div>
  )
}

export default function TestimonialsSection({ isDarkMode }: { isDarkMode: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setActiveIndex(i => (i + 1) % TESTIMONIALS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (i: number) => {
    setDirection(i > activeIndex ? 1 : -1)
    setActiveIndex(i)
  }

  const active = TESTIMONIALS[activeIndex]

  return (
    <section
      id="testimonials"
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background: isDarkMode
          ? 'linear-gradient(180deg, #1A1545 0%, #0D0B2B 100%)'
          : 'linear-gradient(180deg, #FFF8E1 0%, #F3E5F5 100%)',
      }}
    >
      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {['💬', '❤️', '⭐', '💫', '🌟', '✨'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{ left: `${(i * 18) % 100}%`, top: `${(i * 23) % 100}%` }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4 + i, delay: i * 0.5, repeat: Infinity }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4 px-5 py-2 rounded-full text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #FF6B9D, #FF9EC4)' }}
          >
            💬 What People Say
          </motion.div>
          <h2
            className="text-4xl md:text-6xl font-bold"
            style={{
              fontFamily: 'Fredoka One, cursive',
              color: isDarkMode ? 'white' : '#1a1a2e',
            }}
          >
            Loved by{' '}
            <span style={{ background: 'linear-gradient(135deg, #FF6B9D, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Everyone ❤️
            </span>
          </h2>
        </motion.div>

        {/* Main testimonial card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative rounded-3xl p-8 md:p-12 mb-8"
            style={{
              background: isDarkMode
                ? 'rgba(255,255,255,0.06)'
                : 'white',
              border: `3px solid ${active.color}`,
              boxShadow: `8px 8px 0 ${active.color}44`,
            }}
          >
            {/* Quote mark */}
            <div
              className="absolute top-6 right-8 text-8xl font-bold leading-none opacity-10"
              style={{ fontFamily: 'Georgia, serif', color: active.color }}
            >
              "
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <CartoonAvatar
                  avatar={active.avatar}
                  color={active.color}
                  idle={active.idle}
                  isActive={true}
                />
                <div className="text-center">
                  <div
                    className="font-bold"
                    style={{ fontFamily: 'Fredoka One, cursive', color: isDarkMode ? 'white' : '#1a1a2e', fontSize: '1.1rem' }}
                  >
                    {active.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ fontFamily: 'Nunito, sans-serif', color: isDarkMode ? 'rgba(255,255,255,0.5)' : '#777' }}
                  >
                    {active.role}
                  </div>
                </div>
                <StarRating count={active.rating} />
              </div>

              {/* Text */}
              <div className="flex-1">
                {/* Speech bubble tail */}
                <div className="relative">
                  <p
                    className="text-lg md:text-xl leading-relaxed mb-4"
                    style={{
                      fontFamily: 'Nunito, sans-serif',
                      color: isDarkMode ? 'rgba(255,255,255,0.85)' : '#333',
                      fontStyle: 'italic',
                      fontWeight: 700,
                    }}
                  >
                    {active.text}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {['Cute Design', 'Smooth Animations', 'Interactive', '5 Stars'].map((tag, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: active.color + '22',
                        color: active.color,
                        border: `1.5px solid ${active.color}`,
                        fontFamily: 'Nunito, sans-serif',
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1, type: 'spring' }}
                    >
                      #{tag.replace(' ', '')}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnail row */}
        <div className="flex justify-center gap-3 flex-wrap">
          {TESTIMONIALS.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => goTo(i)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1 p-2 rounded-2xl transition-all"
              style={{
                background: i === activeIndex ? t.color + '22' : 'transparent',
                border: `2px solid ${i === activeIndex ? t.color : 'transparent'}`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: t.color + '22',
                  border: `2px solid ${t.color}`,
                }}
              >
                {t.avatar}
              </div>
              <span
                className="text-xs font-bold"
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  color: i === activeIndex ? t.color : isDarkMode ? 'rgba(255,255,255,0.4)' : '#999',
                }}
              >
                {t.name.split(' ')[0]}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full"
              style={{
                width: i === activeIndex ? 24 : 8,
                height: 8,
                background: i === activeIndex ? TESTIMONIALS[i].color : isDarkMode ? 'rgba(255,255,255,0.2)' : '#ddd',
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
