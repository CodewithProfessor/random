import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

const HeroSection = () => {
  const planetRef = useRef(null)
  
  useEffect(() => {
    if (!planetRef.current) return
    
    // Set up Three.js scene
    const scene = new THREE.Scene()
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 2
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    })
    renderer.setSize(300, 300)
    planetRef.current.appendChild(renderer.domElement)
    
    // Planet geometry
    const geometry = new THREE.SphereGeometry(1, 64, 64)
    
    // Planet material with custom shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        baseColor: { value: new THREE.Color(0x121A2B) },
        glowColor: { value: new THREE.Color(0x00FFFF) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 baseColor;
        uniform vec3 glowColor;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          // Base planet color
          vec3 color = baseColor;
          
          // Add some noise patterns
          float noise = sin(vUv.x * 20.0 + time) * sin(vUv.y * 20.0 + time) * 0.1;
          
          // Edge glow effect
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          vec3 finalColor = mix(color, glowColor, fresnel * 0.6 + noise);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    })
    
    // Create planet mesh
    const planet = new THREE.Mesh(geometry, material)
    scene.add(planet)
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x00ffff, 1)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)
    
    // Animation loop
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Rotate planet
      planet.rotation.y += 0.005
      
      // Update time uniform for shader
      time += 0.01
      material.uniforms.time.value = time
      
      renderer.render(scene, camera)
    }
    
    animate()
    
    // Handle resize
    const handleResize = () => {
      const size = Math.min(300, window.innerWidth * 0.8)
      renderer.setSize(size, size)
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      planetRef.current?.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])
  
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-primary/80 z-0"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 neon-text">
                The Future of <br />
                <span className="neon-purple-text">AI Conversation</span>
              </h1>
              
              <p className="text-lg text-white/80 mb-8 max-w-xl">
                Experience the next generation of AI with Galaxy Chat Bot. 
                Powered by advanced machine learning and natural language processing 
                for seamless, intelligent conversations.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#try-now" className="neon-button px-6 py-3 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/50 text-white font-medium">
                  Try For Free
                </a>
                <a href="#learn-more" className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-white/40 transition-all">
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div ref={planetRef} className="w-[300px] h-[300px] animate-float"></div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-neon-blue/30 animate-pulse-slow"></div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-neon-purple/20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection