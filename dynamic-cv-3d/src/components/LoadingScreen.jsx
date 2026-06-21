import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export default function LoadingScreen({ onDone }) {
  const lines = useMemo(
    () => [
      'Initializing AI Agent Core... ',
      'Linking Portal Shards... ',
      'Warming Up Quantum Canvas... ',
      'Finalizing UI Overlay... ',
    ],
    [],
  )

  const [idx, setIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setCursor((c) => !c), 520)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return
        setIdx(i)
        setProgress(0)

        // animate to 100%
        for (let p = 0; p <= 100; p += 4) {
          if (cancelled) return
          setProgress(p)
          // vary speed a bit
          // eslint-disable-next-line no-await-in-loop
          await sleep(45 + Math.random() * 25)
        }
      }
      if (!cancelled) onDone?.()
    })()

    return () => {
      cancelled = true
    }
  }, [lines, onDone])

  const current = lines[idx] ?? ''
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="relative z-50 flex min-h-screen items-center justify-center bg-black px-6"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur">
        <div className="text-sm font-mono leading-relaxed text-white/80">
          <div className="flex items-center gap-2">
            <span className="text-white/90">{'>'}</span>
            <span className="whitespace-pre-wrap">{current}</span>
            <span className="text-white/90">{progress}%</span>
            {cursor ? <span className="text-white/90">▋</span> : null}
          </div>

          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'tween', duration: 0.15 }}
            />
          </div>

          <div className="mt-5 text-xs text-white/50">
            Boot sequence running in deep space...
          </div>
        </div>
      </div>
    </motion.div>
  )
}
