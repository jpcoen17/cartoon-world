'use client'

import { motion, useInView, useDragControls } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'

const DRAGGABLE_OBJECTS = [
  { id: 1, emoji: '📦', label: 'Try dragging me!', x: 80, y: 60, color: '#FF8C00', reaction: '🎉 Wheee!' },
  { id: 2, emoji: '🌸', label: 'I float!', x: 260, y: 120, color: '#FF6B9D', reaction: '🌸 Bloop!' },
  { id: 3, emoji: '🐛', label: 'Catch me!', x: 160, y: 200, color: '#4CAF50', reaction: '😱 Gotcha!' },
  { id: 4, emoji: '🍄', label: 'Boo!', x: 340, y: 80, color: '#E74C3C', reaction: '👻 BOO!' },
  { id: 5, emoji: '💎', label: 'Shiny!', x: 420, y: 180, color: '#2D5BE3', reaction: '✨ Sparkle!' },
  { id: 6, emoji: '🌱', label: 'I grow!', x: 50, y: 220, color: '#4CAF50', reaction: '🌿 Growing!' },
]

const EASTER_EGGS = [
  { id: 1, emoji: '🦄', message: 'You found a unicorn! 🦄✨', x: '15%', y: '45%' },
  { id: 2, emoji: '🐉', message: 'A wild dragon appeared! 🔥', x: '75%', y: '30%' },
  { id: 3, emoji: '🍕', message: 'FREE PIZZA! 🍕🎉', x: '45%', y: '70%' },
]

function DraggableItem({ obj, isDarkMode }: { obj: typeof DRAGGABLE_OBJECTS[0]; isDarkMode: boolean }) {
  const [reaction, setReaction] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const handleClick = () => {
    const count = clickCount + 1
    setClickCount(count)
    setReaction(obj.reaction)
    setTimeout(() => setReaction(null), 1500)
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.2}
      initial={{ x: obj.x, y: obj.y }}
      whileDrag={{ scale: 1.2, zIndex: 100 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onClick={handleClick}
      className="absolute flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing select-none"
    >
      {/* Reaction bubble */}
      {reaction && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0 }}
          animate={{ opacity: 1, y: -50, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -top-8 whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold text-white z-50"
          style={{ background: obj.color, border: '2px solid #1a1a2e', boxShadow: '2px 2px 0 #1a1a2e' }}
        >
          {reaction}
        </motion.div>
      )}

      <motion.div
        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl md:text-4xl"
        style={{
          background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'white',
          border: `3px solid ${obj.color}`,
          boxShadow: isDragging ? `6px 6px 0 ${obj.color}` : `4px 4px 0 #1a1a2e`,
        }}
        animate={isDragging ? { rotate: [0, -10, 10, 0] } : { y: [0, -5, 0] }}
        transition={isDragging ? { duration: 0.3 } : { duration: 2 + obj.id * 0.3, repeat: Infinity }}
      >
        {obj.emoji}
      </motion.div>

      <span
        className="text-xs font-bold px-2 py-0.5 rounded-full"
        style={{
          background: obj.color + '33',
          color: isDarkMode ? 'white' : '#1a1a2e',
          border: `1.5px solid ${obj.color}`,
          fontFamily: 'Nunito, sans-serif',
          fontSize: '10px',
        }}
      >
        {clickCount > 2 ? `${clickCount}x clicked!` : obj.label}
      </span>
    </motion.div>
  )
}

function EasterEgg({ egg }: { egg: typeof EASTER_EGGS[0] }) {
  const [found, setFound] = useState(false)
  const [showMsg, setShowMsg] = useState(false)

  const handleClick = () => {
    if (!found) {
      setFound(true)
      setShowMsg(true)
      setTimeout(() => setShowMsg(false), 3000)
    }
  }

  return (
    <div className="absolute" style={{ left: egg.x, top: egg.y }}>
      <motion.div
        onClick={handleClick}
        className="cursor-pointer select-none"
        animate={found ? { rotate: [0, 360], scale: [1, 1.5, 1] } : { opacity: [0.2, 0.5, 0.2], scale: [0.8, 1, 0.8] }}
        transition={{ duration: found ? 0.5 : 2, repeat: found ? 0 : Infinity }}
        title="Click me!"
      >
        <span className="text-2xl md:text-3xl">{found ? egg.emoji : '❓'}</span>
      </motion.div>
      {showMsg && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: -60 }}
          exit={{ opacity: 0 }}
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-2 rounded-xl text-sm font-bold text-white z-50"
          style={{ background: 'linear-gradient(135deg, #6B35D9, #FF6B9D)', border: '2px solid #1a1a2e', boxShadow: '3px 3px 0 #1a1a2e' }}
        >
          {egg.message}
        </motion.div>
      )}
    </div>
  )
}

export default function PlaygroundSection({ isDarkMode }: { isDarkMode: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [clickCount, setClickCount] = useState(0)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([])
  const particleRef = useRef(0)

  const handleBgClick = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const emojis = ['🌟', '✨', '💫', '⭐', '🎉', '🎊', '💥']
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    const id = particleRef.current++
    setParticles(prev => [...prev, { id, x, y, emoji }])
    setClickCount(c => c + 1)
    setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 2000)
  }, [])

  return (
    <section
      id="playground"
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background: isDarkMode
          ? 'linear-gradient(180deg, #0D0B2B 0%, #1A1545 100%)'
          : 'linear-gradient(180deg, #E8F5E9 0%, #FFF8E1 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-6"
        >
          <motion.div
            className="inline-block mb-4 px-5 py-2 rounded-full text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #4CAF50, #66BB6A)' }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎪 Playground Zone
          </motion.div>
          <h2
            className="text-4xl md:text-6xl font-bold mb-2"
            style={{
              fontFamily: 'Fredoka One, cursive',
              color: isDarkMode ? 'white' : '#1a1a2e',
            }}
          >
            Drag, Click &{' '}
            <span style={{ background: 'linear-gradient(135deg, #FFD700, #FF6B9D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Explore!
            </span>
          </h2>
          <p style={{ fontFamily: 'Nunito, sans-serif', color: isDarkMode ? 'rgba(255,255,255,0.65)' : '#555' }}>
            Anything can happen in this playground 😄 — Clicks: <strong>{clickCount}</strong>
          </p>
        </motion.div>

        {/* Playground area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="relative h-80 md:h-96 rounded-3xl overflow-hidden cursor-crosshair"
          style={{
            background: isDarkMode
              ? 'linear-gradient(135deg, rgba(107,53,217,0.2), rgba(45,91,227,0.2))'
              : 'linear-gradient(135deg, #C8E6C9, #FFF9C4)',
            border: `3px solid ${isDarkMode ? 'rgba(255,255,255,0.15)' : '#1a1a2e'}`,
            boxShadow: `6px 6px 0 ${isDarkMode ? 'rgba(107,53,217,0.4)' : '#1a1a2e'}`,
          }}
          onClick={handleBgClick}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, #6B35D9 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          {/* Click particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              className="absolute pointer-events-none text-xl select-none"
              style={{ left: p.x, top: p.y }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.5, 0], y: -80, opacity: [1, 1, 0] }}
              transition={{ duration: 1.5 }}
            >
              {p.emoji}
            </motion.div>
          ))}

          {/* Easter eggs */}
          {EASTER_EGGS.map(egg => <EasterEgg key={egg.id} egg={egg} />)}

          {/* Draggable objects */}
          {DRAGGABLE_OBJECTS.map(obj => (
            <DraggableItem key={obj.id} obj={obj} isDarkMode={isDarkMode} />
          ))}

          {/* Hint label */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
              style={{
                background: 'rgba(255,215,0,0.2)',
                border: '2px solid rgba(255,215,0,0.5)',
                color: isDarkMode ? '#FFD700' : '#FF8C00',
                fontFamily: 'Nunito, sans-serif',
              }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⭐ Find hidden surprises!
            </motion.div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-6 mt-8 flex-wrap"
        >
          {[
            { label: 'Objects to drag', count: DRAGGABLE_OBJECTS.length, icon: '🎯' },
            { label: 'Easter eggs', count: EASTER_EGGS.length, icon: '🥚' },
            { label: 'Your clicks', count: clickCount, icon: '🖱️' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl"
              style={{
                background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'white',
                border: `2px solid ${isDarkMode ? 'rgba(255,255,255,0.15)' : '#e0e0e0'}`,
                boxShadow: isDarkMode ? 'none' : '3px 3px 0 #e0e0e0',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <div className="text-xl font-bold" style={{ fontFamily: 'Fredoka One, cursive', color: isDarkMode ? 'white' : '#1a1a2e' }}>
                  {stat.count}
                </div>
                <div className="text-xs font-bold" style={{ fontFamily: 'Nunito, sans-serif', color: isDarkMode ? 'rgba(255,255,255,0.5)' : '#777' }}>
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
