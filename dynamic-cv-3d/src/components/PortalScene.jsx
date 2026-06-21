import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function PortalField() {
  const group = useRef()

  const portals = useMemo(() => {
    const count = 14
    const items = []

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 4.5 + Math.random() * 2.5
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = (Math.random() - 0.5) * 2.0

      items.push({
        id: i,
        position: new THREE.Vector3(x, y, z),
        scale: 0.6 + Math.random() * 0.9,
        hue: 260 + Math.random() * 60,
        rotY: angle,
      })
    }

    return items
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!group.current) return

    group.current.rotation.y = t * 0.08
    group.current.rotation.x = Math.sin(t * 0.25) * 0.03

    // gentle pulse per frame
    group.current.children.forEach((mesh, idx) => {
      const s = 1 + Math.sin(t * 1.2 + idx) * 0.05
      mesh.scale.setScalar(mesh.userData.baseScale * s)
    })
  })

  return (
    <group ref={group}>
      {portals.map((p) => (
        <mesh
          key={p.id}
          position={p.position}
          rotation={[Math.PI * 0.5, p.rotY, 0]}
          scale={p.scale}
          userData={{ baseScale: p.scale }}
        >
          <torusGeometry args={[1.1, 0.28, 16, 64]} />
          <meshStandardMaterial
            color={`hsl(${p.hue} 100% 70%)`}
            emissive={`hsl(${p.hue} 100% 70%)`}
            emissiveIntensity={1.2}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#0b0b12']} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 4]} intensity={1.2} />

      <PortalField />

      <EffectComposer>
        <Bloom
          intensity={1.1}
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          kernelSize={3}
        />
      </EffectComposer>
    </>
  )
}

export default function PortalScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.5, 10], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  )
}
