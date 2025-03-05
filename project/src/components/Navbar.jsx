import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Navbar = ({ scrollY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    setIsScrolled(scrollY > 50)
  }, [scrollY])
  
  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-dark-300/80 backdrop-blur-md' : 'py-4 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
            <span className="text-white font-bold">G</span>
          </div>
          <span className="text-xl font-bold neon-text">Galaxy Chat</span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-white/80 hover:text-white hover:neon-text transition-all">Features</a>
          <a href="#benefits" className="text-white/80 hover:text-white hover:neon-text transition-all">Benefits</a>
          <a href="#testimonials" className="text-white/80 hover:text-white hover:neon-text transition-all">Testimonials</a>
          <a href="#technology" className="text-white/80 hover:text-white hover:neon-text transition-all">Technology</a>
          <a href="#contact" className="text-white/80 hover:text-white hover:neon-text transition-all">Contact</a>
          
          <a href="#try-now" className="neon-button px-4 py-2 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/50 text-white font-medium">
            Try Now
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-dark-200/95 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a href="#features" className="text-white/80 py-2 hover:text-white hover:neon-text transition-all" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#benefits" className="text-white/80 py-2 hover:text-white hover:neon-text transition-all" onClick={() => setIsMenuOpen(false)}>Benefits</a>
            <a href="#testimonials" className="text-white/80 py-2 hover:text-white hover:neon-text transition-all" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
            <a href="#technology" className="text-white/80 py-2 hover:text-white hover:neon-text transition-all" onClick={() => setIsMenuOpen(false)}>Technology</a>
            <a href="#contact" className="text-white/80 py-2 hover:text-white hover:neon-text transition-all" onClick={() => setIsMenuOpen(false)}>Contact</a>
            
            <a href="#try-now" className="neon-button py-2 px-4 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/50 text-white font-medium text-center" onClick={() => setIsMenuOpen(false)}>
              Try Now
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar