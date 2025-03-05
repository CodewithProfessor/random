import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'

const categories = [
  {
    id: 1,
    title: "General Chat",
    description: "Everyday conversations and assistance for all your questions.",
    icon: "💬",
    color: "from-blue-500/20 to-cyan-400/20",
    border: "border-blue-500/40"
  },
  {
    id: 2,
    title: "Productivity",
    description: "Task management, scheduling, and workflow optimization.",
    icon: "⏱️",
    color: "from-green-500/20 to-emerald-400/20",
    border: "border-green-500/40"
  },
  {
    id: 3,
    title: "Content Creation",
    description: "Generate articles, stories, and creative content.",
    icon: "✍️",
    color: "from-purple-500/20 to-violet-400/20",
    border: "border-purple-500/40"
  },
  {
    id: 4,
    title: "Business",
    description: "Market analysis, business strategies, and customer support.",
    icon: "💼",
    color: "from-yellow-500/20 to-amber-400/20",
    border: "border-yellow-500/40"
  },
  {
    id: 5,
    title: "Health",
    description: "Wellness tips, fitness tracking, and health information.",
    icon: "🏥",
    color: "from-red-500/20 to-rose-400/20",
    border: "border-red-500/40"
  },
  {
    id: 6,
    title: "Finance",
    description: "Financial advice, budgeting, and investment insights.",
    icon: "💰",
    color: "from-teal-500/20 to-cyan-400/20",
    border: "border-teal-500/40"
  }
]

const CategoryCard = ({ category, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  const cardRef = useRef(null)
  
  useEffect(() => {
    if (inView && cardRef.current) {
      gsap.to(cardRef.current, {
        rotationY: 10,
        rotationX: 5,
        duration: 0.8,
        ease: "power2.out"
      })
    }
  }, [inView])
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
    >
      <div 
        ref={cardRef}
        className="card-3d h-full p-6 rounded-xl bg-gradient-to-br border backdrop-blur-sm"
        style={{
          background: `linear-gradient(135deg, ${category.color.split(' ')[0].replace('from-', '')} 0%, ${category.color.split(' ')[1].replace('to-', '')} 100%)`,
          borderColor: category.border.replace('border-', '')
        }}
      >
        <div className="text-4xl mb-4">{category.icon}</div>
        <h3 className="text-xl font-bold mb-2">{category.title}</h3>
        <p className="text-white/70">{category.description}</p>
      </div>
    </motion.div>
  )
}

const CategorySection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">AI Chatbot Categories</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Explore our specialized AI solutions designed for various needs and industries.
            Each category is powered by custom-trained models for optimal performance.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap gap-6 justify-center">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection