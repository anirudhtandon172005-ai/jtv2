import Boundary3DEagleLogo from '../objects/Boundary3DEagleLogo'
import BloomEffect from '../effects/BloomEffect'

/**
 * HeroScene
 * =========
 * Composes the 3D hero scene featuring the JIIT Youth Club 3D Eagle & Text boundary animation.
 */
export default function HeroScene({ mousePosition, scrollProgress, enableBloom, isLight = false }) {
  return (
    <>
      {/* Lights — Warm Gold & Crimson Accent Lighting calibrated for current theme */}
      <ambientLight intensity={isLight ? 1.5 : 0.8} color={isLight ? '#FFF5EA' : '#FFF8E7'} />
      <pointLight
        position={[4, 5, 4]}
        color={isLight ? '#B45309' : '#F59E0B'}
        intensity={isLight ? 2.8 : 3.5}
        distance={14}
      />
      <pointLight
        position={[-5, -3, 2]}
        color={isLight ? '#7F1E1D' : '#EF4444'}
        intensity={isLight ? 2.2 : 3.0}
        distance={12}
      />
      <directionalLight
        position={[0, 2, 5]}
        intensity={isLight ? 1.6 : 1.2}
        color={isLight ? '#FFFDF8' : '#FFFFFF'}
      />

      {/* Core 3D Eagle Outline Object */}
      <Boundary3DEagleLogo
        mousePosition={mousePosition}
        scrollProgress={scrollProgress}
        isLight={isLight}
      />

      {/* Post-processing — Bloom glow only in dark mode to preserve crisp contrast on light */}
      <BloomEffect enabled={enableBloom && !isLight} />
    </>
  )
}
