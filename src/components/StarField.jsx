import { useEffect, useRef } from 'react'

const StarField = () => {
  const starFieldRef = useRef(null)
  
  useEffect(() => {
    const starField = starFieldRef.current
    if (!starField) return
    
    // Clear any existing stars
    starField.innerHTML = ''
    
    // Create stars
    const starCount = Math.floor(window.innerWidth * window.innerHeight / 1000)
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      
      // Random position
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      
      // Random size
      const size = Math.random() * 2
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      
      // Random twinkle duration
      star.style.setProperty('--duration', `${3 + Math.random() * 7}s`)
      
      starField.appendChild(star)
    }
  }, [])
  
  return <div ref={starFieldRef} className="star-field"></div>
}

export default StarField