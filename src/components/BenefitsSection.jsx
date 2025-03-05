import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'

const benefits = [
  {
    id: 1,
    title: "24/7 AI Support",
    description: "Always available to assist you, anytime and anywhere.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Multilingual Capabilities",
    description: "Communicate in over 50 languages with native-like fluency.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Adaptive Learning",
    description: "Continuously improves based on your interactions and feedback.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Custom AI Solutions",
    description: "Tailor the AI to your specific business needs and workflows.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    )
  },
  {
    id: 5,
    title: "Secure Data Encryption",
    description: "Enterprise-grade security to protect your sensitive information.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  }
]

const BenefitCard = ({ benefit, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  const iconRef = useRef(null)
  
  useEffect(() => {
    if (inView && iconRef.current) {
      gsap.from(iconRef.current, {
        rotate: -10,
        scale: 0.8,
        opacity: 0.5,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      })
    }
  }, [inView])
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
    >
      <div className="h-full p-6 rounded-xl bg-dark-100/30 backdrop-blur-sm border border-white/10 hover:border-neon-blue/30 transition-all">
        <div ref={iconRef} className="mb-4">
          {benefit.icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
        <p className="text-white/70">{benefit.description}</p>
      </div>
    </motion.div>
  )
}

const BenefitsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  return (
    <section id="benefits" className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/0 via-neon-blue/5 to-primary/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">AI-Powered Benefits</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Discover how our advanced AI technology can transform your experience
            with intelligent, adaptive, and secure solutions.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap gap-6 justify-center">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection