'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CartoonBoy, CartoonHouse, CartoonCat } from '@/components/UI/CartoonAssets'

// Deterministic star positions (no Math.random at render → no SSR hydration mismatch)
const NIGHT_STARS = Array.from({ length: 40 }, (_, j) => ({
  id: j,
  width: 1 + (j % 3),
  left: ((j * 53 + 11) % 97) + 1,
  top: ((j * 37 + 7) % 57) + 1,
  delay: (j % 5) * 0.4,
}))

const STORY_PANELS = [
  {
    id: 1,
    title: 'It All Started With a Dream',
    text: 'In a magical world where imagination runs free, a young adventurer set out on an incredible journey to discover the wonders of Cartoon World.',
    bg: 'linear-gradient(180deg, #1A237E 0%, #283593 100%)',
    emoji: '🌙',
    scene: 'night',
  },
  {
    id: 2,
    title: 'Through Enchanted Forests',
    text: 'Every path was filled with magical creatures, floating islands, and secrets waiting to be uncovered. The adventure was just beginning!',
    bg: 'linear-gradient(180deg, #1B5E20 0%, #388E3C 60%, #2E7D32 100%)',
    emoji: '🌲',
    scene: 'forest',
  },
  {
    id: 3,
    title: 'Discovering Hidden Wonders',
    text: 'Every scroll reveals something new — glowing crystals, laughing clouds, dancing fireflies, and characters with the warmest smiles.',
    bg: 'linear-gradient(180deg, #4A148C 0%, #6A1B9A 60%, #7B1FA2 100%)',
    emoji: '💎',
    scene: 'crystal',
  },
]

const TOTAL = STORY_PANELS.length

// Each panel is its own component so useTransform is called at the component top-level (Rules of Hooks compliant)
function PanelBackground({
  panel,
  index,
  scrollYProgress,
  bgX,
}: {
  panel: typeof STORY_PANELS[0]
  index: number
  scrollYProgress: any
  bgX: any
}) {
  const start = index / TOTAL
  const end = (index + 1) / TOTAL
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), start + 0.05, end - 0.05, Math.min(1, end + 0.05)],
    [0, 1, 1, 0]
  )

  return (
    <motion.div className="absolute inset-0" style={{ background: panel.bg, opacity }}>
      {panel.scene === 'night' && (
        <div className="absolute inset-0">
          {NIGHT_STARS.map(star => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{ width: star.width, height: star.width, left: `${star.left}%`, top: `${star.top}%` }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, delay: star.delay, repeat: Infinity }}
            />
          ))}
        </div>
      )}
      {panel.scene === 'forest' && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-around items-end">
          {['🌲', '🌳', '🌲', '🌳', '🌲', '🌳', '🌲', '🌳'].map((tree, j) => (
            <motion.span key={j} className="text-5xl md:text-7xl" style={{ x: bgX }}
              animate={{ y: [0, -3, 0] }} transition={{ duration: 2, delay: j * 0.3, repeat: Infinity }}>
              {tree}
            </motion.span>
          ))}
        </div>
      )}
      {panel.scene === 'crystal' && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-around items-end">
          {['💎', '🔮', '💜', '⚡', '💎', '✨', '🔮', '💫'].map((c, j) => (
            <motion.span key={j} className="text-4xl md:text-6xl" style={{ x: bgX }}
              animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }} transition={{ duration: 1.5, delay: j * 0.2, repeat: Infinity }}>
              {c}
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function StoryCard({ panel, index, scrollYProgress }: { panel: typeof STORY_PANELS[0]; index: number; scrollYProgress: any }) {
  const start = index / TOTAL
  const end = (index + 1) / TOTAL
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), start + 0.1, end - 0.1, Math.min(1, end + 0.05)],
    [0, 1, 1, 0]
  )

  return (
    <motion.div style={{ opacity }} className="absolute inset-6 md:inset-8">
      <div className="text-4xl mb-3">{panel.emoji}</div>
      <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Our Story</p>
      <h2 className="text-2xl md:text-3xl text-white font-bold mb-4 leading-tight" style={{ fontFamily: 'Fredoka One, cursive' }}>
        {panel.title}
      </h2>
      <p className="text-white/80 text-sm md:text-base leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
        {panel.text}
      </p>
      <motion.button
        className="mt-4 px-6 py-2 rounded-full text-sm font-bold"
        style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)', color: '#1a1a2e' }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      >
        Read More →
      </motion.button>
    </motion.div>
  )
}

function ProgressDot({ index, scrollYProgress }: { index: number; scrollYProgress: any }) {
  const start = index / TOTAL
  const end = (index + 1) / TOTAL
  const opacity = useTransform(scrollYProgress, [start, (start + end) / 2, end], [0.3, 1, 0.3])
  return <motion.div className="w-2 h-2 rounded-full bg-white" style={{ opacity }} />
}

export default function ScrollStory({ isDarkMode }: { isDarkMode: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const characterX = useTransform(scrollYProgress, [0, 1], ['-10%', '80%'])
  const bgX = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const groundX = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const houseX = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  const catX = useTransform(scrollYProgress, [0, 1], ['15%', '75%'])

  return (
    <section id="story" ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {STORY_PANELS.map((panel, i) => (
          <PanelBackground key={panel.id} panel={panel} index={i} scrollYProgress={scrollYProgress} bgX={bgX} />
        ))}

        {/* Scrolling ground */}
        <motion.div className="absolute bottom-0 left-0 right-0 h-24 md:h-32" style={{ x: groundX }}>
          <svg viewBox="0 0 1600 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,20 Q200,0 400,20 Q600,40 800,20 Q1000,0 1200,20 Q1400,40 1600,20 L1600,100 L0,100 Z" fill="#2E7D32" />
            <path d="M0,30 Q200,10 400,30 Q600,50 800,30 Q1000,10 1200,30 Q1400,50 1600,30 L1600,100 L0,100 Z" fill="#388E3C" />
          </svg>
          {[5, 15, 30, 45, 60, 75, 90].map((pos, i) => (
            <motion.div key={i} className="absolute bottom-8 text-2xl" style={{ left: `${pos}%` }}>
              {['🌸', '🍄', '🌼', '🍀', '🌻', '🌷', '🌾'][i]}
            </motion.div>
          ))}
        </motion.div>

        {/* Walking character */}
        <motion.div className="absolute bottom-16 md:bottom-20 w-20 md:w-32 z-30" style={{ x: characterX }}>
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>
            <CartoonBoy style={{ filter: 'drop-shadow(3px 3px 0 rgba(0,0,0,0.4))' }} />
          </motion.div>
        </motion.div>

        {/* House */}
        <motion.div className="absolute bottom-16 right-10 md:right-32 w-28 md:w-48 z-10" style={{ x: houseX }}>
          <CartoonHouse />
        </motion.div>

        {/* Cat */}
        <motion.div className="absolute bottom-20 z-20 w-16 md:w-24" style={{ x: catX }}>
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
            <CartoonCat />
          </motion.div>
        </motion.div>

        {/* Story text card */}
        <div className="absolute top-24 left-0 right-0 flex justify-center z-40 px-4">
          <motion.div
            className="max-w-xl w-full p-6 md:p-8 rounded-3xl text-center"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', border: '2px solid rgba(255,255,255,0.25)' }}
          >
            {STORY_PANELS.map((panel, i) => (
              <StoryCard key={panel.id} panel={panel} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </motion.div>
        </div>

        {/* Progress dots */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
          {STORY_PANELS.map((_, i) => (
            <ProgressDot key={i} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
