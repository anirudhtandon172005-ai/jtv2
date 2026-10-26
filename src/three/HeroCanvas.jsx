import { Suspense, Component, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroScene from './scenes/HeroScene'
import { useMousePosition } from '../hooks/useMousePosition'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTheme } from '../context/ThemeContext'
import './HeroCanvas.css'

class HeroErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <div className="hero-canvas__fallback" aria-hidden="true" />
    }
    return this.props.children
  }
}

function SceneCanvasSynchronizer({ isLight }) {
  return null;
}

export default function HeroCanvas() {
  const mousePosition  = useMousePosition()
  const scrollProgress = useScrollProgress()
  const prefersReducedMotion = useReducedMotion()
  const { isLight } = useTheme()
  const glRef = useRef(null)

  const isMobile     = window.innerWidth < 768
  const enableBloom  = !isMobile

  useEffect(() => {
    if (glRef.current) {
      glRef.current.setClearColor(isLight ? '#FBF9F5' : '#000000', 1.0)
    }
  }, [isLight])

  // If user prefers reduced motion: show static CSS gradient fallback
  if (prefersReducedMotion) {
    return <div className="hero-canvas__fallback hero-canvas__fallback--reduced" aria-hidden="true" />
  }

  return (
    <div className="hero-canvas" aria-hidden="true">
      <HeroErrorBoundary>
        <Suspense fallback={<div className="hero-canvas__fallback" />}>
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 62, near: 0.1, far: 100 }}
            dpr={[1, isMobile ? 1 : 1.5]}
            performance={{ min: 0.5 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            onCreated={({ gl }) => {
              glRef.current = gl
              gl.setClearColor(isLight ? '#FBF9F5' : '#000000', 1.0)
            }}
          >
            <HeroScene
              mousePosition={mousePosition}
              scrollProgress={scrollProgress}
              enableBloom={enableBloom}
              isLight={isLight}
            />
          </Canvas>
        </Suspense>
      </HeroErrorBoundary>
    </div>
  )
}
