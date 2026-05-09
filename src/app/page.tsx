'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from '@/components/UI/LoadingScreen'
import CustomCursor from '@/components/Cursor/CustomCursor'
import Navbar from '@/components/UI/Navbar'
import HeroSection from '@/components/Hero/HeroSection'
import ScrollStory from '@/components/ScrollStory/ScrollStory'
import FeaturesSection from '@/components/Features/FeaturesSection'
import PlaygroundSection from '@/components/Playground/PlaygroundSection'
import TestimonialsSection from '@/components/Testimonials/TestimonialsSection'
import FooterSection from '@/components/Footer/FooterSection'
import SoundToggle from '@/components/UI/SoundToggle'
import DayNightToggle from '@/components/UI/DayNightToggle'
import SmoothScroll from '@/components/UI/SmoothScroll'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isSoundOn, setIsSoundOn] = useState(false)
  const [siteEntered, setSiteEntered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3200)
    return () => clearTimeout(timer)
  }, [])

  const handleEnterSite = () => {
    setSiteEntered(true)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <SmoothScroll>
      <main className={`relative min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <CustomCursor />
        <Navbar isDarkMode={isDarkMode} />
        
        {/* Floating controls */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <DayNightToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
          <SoundToggle isOn={isSoundOn} onToggle={() => setIsSoundOn(!isSoundOn)} />
        </div>

        <HeroSection onEnter={handleEnterSite} siteEntered={siteEntered} isDarkMode={isDarkMode} />
        <ScrollStory isDarkMode={isDarkMode} />
        <FeaturesSection isDarkMode={isDarkMode} />
        <PlaygroundSection isDarkMode={isDarkMode} />
        <TestimonialsSection isDarkMode={isDarkMode} />
        <FooterSection isDarkMode={isDarkMode} />
      </main>
    </SmoothScroll>
  )
}
