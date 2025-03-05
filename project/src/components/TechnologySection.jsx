import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'

const technologies = [
  {
    id: 1,
    name: "Three.js",
    description: "3D graphics library for creating immersive web experiences",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
    color: "border-white/30"
  },
  {
    id: 2,
    name: "GSAP",
    description: "Animation library for smooth, high-performance motion",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "border-green-500/40"
  },
  {
    id: 3,
    name: "WebGL",
    description: "JavaScript API for rendering interactive 3D graphics",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opengl/opengl-original.svg",
    color: "border-blue-500/40"
  },
  {
    id: 4,
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    color: "border-cyan-500/40"
  },
  {
    id: 5,
    name: "Lottie",
    description: "Library for rendering Adobe After Effects animations",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg",
    color: "border-purple-500/40"
  }
]

const TechCard = ({ tech, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  const cardRef = useRef(null)
  
  useEffect(() => {
    if (inView && cardRef.current) {
      gsap.from(cardRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power2.out"
      })
    }
  }, [inView, index])
  
  return (
    <div
      ref={ref}
      className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1rem)]"
    >
      <div 
        ref={cardRef}
        className="h-full p-4 rounded-xl bg-dark-100/30 backdrop-blur-sm border hover:border-neon-blue/30 transition-all text-center"
        style={{ borderColor: tech.color.replace('border-', '') }}
      >
        <img 
          src={tech.icon} 
          alt={tech.name} 
          className="w-12 h-12 mx-auto mb-3"
        />
        <h3 className="text-lg font-bold mb-1">{tech.name}</h3>
        <p className="text-sm text-white/70">{tech.description}</p>
      </div>
    </div>
  )
}

const TechnologySection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  return (
    <section id="technology" className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/0 via-neon-purple/5 to-primary/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">Technology Stack</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Built with cutting-edge technologies to deliver a seamless, 
            high-performance experience across all devices.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap gap-6 justify-center">
          {technologies.map((tech, index) => (
            <TechCard key={tech.id} tech={tech} index={index} />
          ))}
        </div>
        
        <div className="mt-16 p-6 rounded-xl bg-dark-100/30 backdrop-blur-sm border border-white/10">
          <h3 className="text-xl font-bold mb-4 text-center">Technical Specifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-neon-blue">Frontend Performance</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Optimized 3D rendering with WebGL acceleration
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Lazy-loading components for faster initial load
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Responsive design with mobile-first approach
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2 text-neon-purple">Backend Capabilities</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced NLP processing for natural conversations
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time data processing and analytics
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  End-to-end encryption for secure communications
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechnologySection