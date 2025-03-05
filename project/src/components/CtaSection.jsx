import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'

const CtaSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  const buttonRef = useRef(null)
  
  useEffect(() => {
    if (inView && buttonRef.current) {
      gsap.to(buttonRef.current, {
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    }
  }, [inView])
  
  return (
    <section id="try-now" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl glass-effect border border-white/10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">Ready to Experience the Future?</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their 
              conversations with our advanced AI technology.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Free 14-day trial, no credit card required</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Unlimited conversations during trial</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Full access to all premium features</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Cancel anytime, hassle-free</span>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <button 
                ref={buttonRef}
                className="neon-button w-full py-4 px-8 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/50 text-white font-bold text-lg mb-4"
              >
                Start Your Free Trial
              </button>
              
              <p className="text-sm text-white/60 text-center">
                No commitment required. Start chatting with our AI in seconds.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CtaSection