'use client'

import { motion } from 'framer-motion'

export default function SoundToggle({
  isOn,
  onToggle,
}: {
  isOn: boolean
  onToggle: () => void
}) {
  return (
    <motion.button
      onClick={onToggle}
      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg cartoon-border hover-bounce"
      style={{
        background: isOn
          ? 'linear-gradient(135deg, #4CAF50, #388E3C)'
          : 'linear-gradient(135deg, #666, #444)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isOn ? 'Mute' : 'Unmute'}
    >
      <motion.span
        key={isOn ? 'on' : 'off'}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {isOn ? '🔊' : '🔇'}
      </motion.span>
    </motion.button>
  )
}
