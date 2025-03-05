import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  const formRef = useRef(null)
  const chatbotRef = useRef(null)
  
  useEffect(() => {
    if (inView && chatbotRef.current) {
      gsap.from(chatbotRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out"
      })
    }
  }, [inView])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value
    })
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      })
    }
  }
  
  const validateForm = () => {
    const errors = {}
    
    if (!formState.name.trim()) {
      errors.name = 'Name is required'
    }
    
    if (!formState.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = 'Email is invalid'
    }
    
    if (!formState.message.trim()) {
      errors.message = 'Message is required'
    }
    
    return errors
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const errors = validateForm()
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Reset form after submission
      setFormState({
        name: '',
        email: '',
        message: ''
      })
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }
  
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">Contact & AI Integration</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Get in touch with our team or try our AI assistant to answer your questions instantly.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2">
            <motion.form
              ref={formRef}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-xl bg-dark-100/30 backdrop-blur-sm border border-white/10"
              onSubmit={handleSubmit}
            >
              <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-dark-200 border ${
                    formErrors.name ? 'border-red-500' : 'border-white/20'
                  } focus:outline-none focus:border-neon-blue/50`}
                  placeholder="Your name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-dark-200 border ${
                    formErrors.email ? 'border-red-500' : 'border-white/20'
                  } focus:outline-none focus:border-neon-blue/50`}
                  placeholder="your.email@example.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-2 rounded-lg bg-dark-200 border ${
                    formErrors.message ? 'border-red-500' : 'border-white/20'
                  } focus:outline-none focus:border-neon-blue/50`}
                  placeholder="How can we help you?"
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="neon-button w-full py-3 rounded-lg bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/50 text-white font-medium"
              >
                {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent!' : 'Send Message'}
              </button>
              
              {isSubmitted && (
                <p className="mt-4 text-center text-green-400">
                  Thank you for your message! We'll get back to you soon.
                </p>
              )}
            </motion.form>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div 
              ref={chatbotRef}
              className="h-full p-6 rounded-xl bg-dark-100/30 backdrop-blur-sm border border-white/10 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-6">AI Chat Assistant</h3>
              
              <div className="flex-1 mb-4 overflow-hidden rounded-lg bg-dark-200 border border-white/20 p-4 flex flex-col">
                <div className="flex items-start mb-4">
                  <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-neon-blue text-xs">AI</span>
                  </div>
                  <div className="bg-dark-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Hello! I'm Galaxy Chat Bot. How can I assist you today?</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-4 self-end">
                  <div className="bg-neon-blue/20 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">What features does Galaxy Chat Bot offer?</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center ml-3 flex-shrink-0">
                    <span className="text-neon-purple text-xs">You</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-neon-blue text-xs">AI</span>
                  </div>
                  <div className="bg-dark-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Galaxy Chat Bot offers 24/7 AI support, multilingual capabilities in over 50 languages, adaptive learning that improves with use, custom AI solutions for businesses, and enterprise-grade security with data encryption.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-dark-200 border border-white/20 focus:outline-none focus:border-neon-blue/50"
                  placeholder="Type your message..."
                  disabled
                />
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neon-blue"
                  disabled
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <p className="mt-4 text-sm text-white/50 text-center">
                This is a demo of our AI chat interface. Try the full version by signing up!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection