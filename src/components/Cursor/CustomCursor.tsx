'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const STICKERS = ['⭐', '✨', '🌟', '💫', '🎉', '🌈', '❤️', '🎪']

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const followerX = useSpring(cursorX, { stiffness: 100, damping: 20 })
  const followerY = useSpring(cursorY, { stiffness: 100, damping: 20 })
  const [isHovering, setIsHovering] = useState(false)
  const [stickers, setStickers] = useState<{ id: number; x: number; y: number; emoji: string }[]>([])
  const stickerCounter = useRef(0)
  const lastStickerTime = useRef(0)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Random sticker spawn while moving
      const now = Date.now()
      if (now - lastStickerTime.current > 800 && Math.random() > 0.85) {
        lastStickerTime.current = now
        const id = stickerCounter.current++
        const emoji = STICKERS[Math.floor(Math.random() * STICKERS.length)]
        setStickers(prev => [...prev, { id, x: e.clientX, y: e.clientY, emoji }])
        setTimeout(() => {
          setStickers(prev => prev.filter(s => s.id !== id))
        }, 2000)
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('draggable')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="custom-cursor"
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* Follower ring */}
      <motion.div
        className="custom-cursor-follower"
        style={{ x: followerX, y: followerY }}
        animate={{
          scale: isHovering ? 2 : 1,
          borderColor: isHovering ? '#FF6B9D' : 'rgba(255,215,0,0.5)',
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Floating stickers */}
      {stickers.map(sticker => (
        <motion.div
          key={sticker.id}
          className="emoji-float fixed pointer-events-none z-[99997] select-none"
          style={{ left: sticker.x, top: sticker.y, fontSize: '1.5rem' }}
          initial={{ opacity: 1, y: 0, scale: 0 }}
          animate={{ opacity: 0, y: -120, scale: 1.2, rotate: Math.random() * 40 - 20 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        >
          {sticker.emoji}
        </motion.div>
      ))}
    </>
  )
}
