import { useEffect, useState } from 'react'
import PortalScene from './components/PortalScene'
import CvContent from './components/CvContent'
import LoadingScreen from './components/LoadingScreen'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // small delay to let the user feel the boot sequence
    const t = setTimeout(() => setReady(true), 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {!ready ? (
        <LoadingScreen onDone={() => setReady(true)} />
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0">
            <PortalScene />
          </div>

          <div className="relative z-10">
            <CvContent />
          </div>
        </>
      )}
    </main>
  )
}
