import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CategorySection from './components/CategorySection'
import BenefitsSection from './components/BenefitsSection'
import TestimonialsSection from './components/TestimonialsSection'
import TechnologySection from './components/TechnologySection'
import CtaSection from './components/CtaSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import StarField from './components/StarField'

function App() {
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative bg-primary text-white min-h-screen">
      <StarField />
      <Navbar scrollY={scrollY} />
      
      <main>
        <HeroSection />
        <CategorySection />
        <BenefitsSection />
        <TestimonialsSection />
        <TechnologySection />
        <CtaSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  )
}

export default App