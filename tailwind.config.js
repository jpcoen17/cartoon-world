/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
      colors: {
        cartoon: {
          purple: '#6B35D9',
          'purple-light': '#9B59F0',
          blue: '#2D5BE3',
          yellow: '#FFD700',
          orange: '#FF8C00',
          pink: '#FF6B9D',
          green: '#4CAF50',
          sky: '#87CEEB',
          night: '#0D0B2B',
          'night-mid': '#1A1545',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'float-fast': 'float 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'cloud-move': 'cloudMove 20s linear infinite',
        'cloud-move-slow': 'cloudMove 35s linear infinite',
        'star-twinkle': 'starTwinkle 2s ease-in-out infinite',
        'rocket-fly': 'rocketFly 3s ease-in-out infinite',
        'walk': 'walk 0.5s steps(4) infinite',
        'bubble-pop': 'bubblePop 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255,215,0,0.8), 0 0 80px rgba(255,215,0,0.5)' },
        },
        cloudMove: {
          '0%': { transform: 'translateX(-200px)' },
          '100%': { transform: 'translateX(110vw)' },
        },
        starTwinkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.3, transform: 'scale(0.7)' },
        },
        rocketFly: {
          '0%': { transform: 'translateX(0) translateY(0) rotate(45deg)' },
          '50%': { transform: 'translateX(20px) translateY(-20px) rotate(45deg)' },
          '100%': { transform: 'translateX(0) translateY(0) rotate(45deg)' },
        },
        bubblePop: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '70%': { transform: 'scale(1.2)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      backgroundImage: {
        'night-sky': 'radial-gradient(ellipse at top, #0D0B2B 0%, #1A1545 40%, #2D1B6E 100%)',
        'day-sky': 'linear-gradient(180deg, #87CEEB 0%, #B8E4F9 50%, #E8F4FD 100%)',
        'sunset': 'linear-gradient(180deg, #FF6B35 0%, #F7931E 30%, #FFD700 60%, #87CEEB 100%)',
        'grass': 'linear-gradient(180deg, #4CAF50 0%, #388E3C 100%)',
      },
    },
  },
  plugins: [],
}
