'use client'

import { motion } from 'framer-motion'

export default function DayNightToggle({
  isDarkMode,
  onToggle,
}: {
  isDarkMode: boolean
  onToggle: () => void
}) {
  return (
    <motion.button
      onClick={onToggle}
      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg cartoon-border hover-bounce"
      style={{
        background: isDarkMode
          ? 'linear-gradient(135deg, #1A1545, #0D0B2B)'
          : 'linear-gradient(135deg, #FFD700, #FF8C00)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isDarkMode ? 'Switch to Day Mode' : 'Switch to Night Mode'}
    >
      <motion.span
        key={isDarkMode ? 'moon' : 'sun'}
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {isDarkMode ? '🌙' : '☀️'}
      </motion.span>
    </motion.button>
  )
}
