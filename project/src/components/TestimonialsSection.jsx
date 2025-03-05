import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechVision Inc.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    text: "Galaxy Chat Bot has revolutionized our customer support. The AI understands complex queries and provides accurate responses 24/7. Our customer satisfaction scores have increased by 45% since implementation."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "Innovate Solutions",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    text: "The multilingual capabilities are impressive. We've expanded to international markets without hiring additional support staff. The AI adapts to our brand voice perfectly and keeps improving over time."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "E-commerce Owner",
    company: "StyleHub",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "As a small business owner, Galaxy Chat Bot has been a game-changer. It handles customer inquiries, processes orders, and even helps with inventory management. It's like having an entire team at a fraction of the cost."
  },
  {
    id: 4,
    name: "David Wilson",
    role: "CTO",
    company: "DataStream",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
    text: "The security features are top-notch. We deal with sensitive financial data, and Galaxy Chat Bot's encryption and compliance standards meet all our requirements. Integration with our existing systems was seamless."
  }
]

const TestimonialCard = ({ testimonial, isActive }) => {
  const cardRef = useRef(null)
  
  useEffect(() => {
    if (isActive && cardRef.current) {
      gsap.to(cardRef.current, {
        rotationY: 0,
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      })
    } else if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotationY: -10,
        scale: 0.95,
        opacity: 0.7,
        duration: 0.6,
        ease: "power2.out"
      })
    }
  }, [isActive])
  
  return (
    <div 
      ref={cardRef}
      className={`card-3d absolute top-0 left-0 w-full h-full transition-all duration-500 ${
        isActive ? 'z-10' : 'z-0'
      }`}
      style={{
        transform: isActive ? 'rotateY(0) scale(1)' : 'rotateY(-10deg) scale(0.95)',
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none'
      }}
    >
      <div className="h-full p-8 rounded-xl bg-dark-100/40 backdrop-blur-sm border border-white/10 flex flex-col">
        <div className="mb-6">
          <svg className="w-8 h-8 text-neon-blue mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-white/80 italic">{testimonial.text}</p>
        </div>
        
        <div className="mt-auto flex items-center">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-12 h-12 rounded-full mr-4 border-2 border-neon-blue/50"
          />
          <div>
            <h4 className="font-bold">{testimonial.name}</h4>
            <p className="text-sm text-white/60">{testimonial.role}, {testimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      
      return () => clearInterval(interval)
    }
  }, [inView])
  
  return (
    <section id="testimonials" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">What Our Users Say</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Hear from businesses and individuals who have transformed their operations
            and experiences with Galaxy Chat Bot.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative h-[300px] md:h-[250px]">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                isActive={index === activeIndex} 
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'bg-neon-blue w-6' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="text-3xl font-bold neon-text mb-2">500+</div>
            <p className="text-white/70">Business Clients</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold neon-purple-text mb-2">24/7</div>
            <p className="text-white/70">Support</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold neon-text mb-2">50+</div>
            <p className="text-white/70">Languages</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold neon-purple-text mb-2">99.9%</div>
            <p className="text-white/70">Uptime</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection