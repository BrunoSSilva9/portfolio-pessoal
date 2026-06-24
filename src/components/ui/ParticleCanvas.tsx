// =============================================================================
// ParticleCanvas — Three.js hero com partículas esféricas (círculo mágico)
// AGENTS.md Seção 6 (Hero) + Seção 7
// - ~800 partículas em posição esférica, cor --color-purple com alpha
// - Rotação lenta: 0.001 rad/frame
// - Mouse parallax suave com useFrame
// - aria-hidden="true" — puramente decorativo
// - pointer-events: none — não bloqueia cliques
// - Mobile: 200 partículas (performance)
// - Reduced motion: gradiente CSS estático
// =============================================================================

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
// @ts-expect-error Types are missing or misconfigured in this version
import { Points, PointMaterial } from '@react-three/drei'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import * as THREE from 'three'

// ─── Partícula com movimento orbital ─────────────────────────────────────────
function MagicParticles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Gerar posições em esfera aleatória
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Distribuição uniforme em esfera (método de Marsaglia)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.5 + Math.random() * 1.5 // raio entre 2.5 e 4.0

      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  // Parallax do mouse
  useThree(({ gl }) => {
    gl.domElement.addEventListener('mousemove', (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.3
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.3
    })
  })

  useFrame(() => {
    if (!pointsRef.current) return
    // Rotação lenta constante
    pointsRef.current.rotation.y += 0.001
    pointsRef.current.rotation.x += 0.0003

    // Parallax suave (lerp)
    pointsRef.current.rotation.y += (mouseRef.current.x - pointsRef.current.rotation.y) * 0.02
    // Evitar drift excessivo — manter rotação base
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#7F77DD"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  )
}

// ─── Círculo mágico (anel de partículas no centro) ───────────────────────────
function MagicRing() {
  const ringRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 200
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r = 1.8 + (Math.random() - 0.5) * 0.1
      pos[i * 3 + 0] = r * Math.cos(angle)
      pos[i * 3 + 1] = r * Math.sin(angle)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.05
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    ringRef.current.rotation.z = clock.elapsedTime * 0.05
  })

  return (
    <Points ref={ringRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#E8A838"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  )
}

// ─── Gradiente estático (reduced motion) ─────────────────────────────────────
function StaticBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(127,119,221,0.12) 0%, rgba(232,168,56,0.05) 50%, transparent 70%)',
      }}
    />
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────
export function ParticleCanvas() {
  const prefersReduced = useReducedMotion()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const particleCount = isMobile ? 200 : 800

  if (prefersReduced) {
    return <StaticBackground />
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{ pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <MagicParticles count={particleCount} />
        <MagicRing />
      </Canvas>
    </div>
  )
}
