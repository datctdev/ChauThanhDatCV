import { motion } from 'framer-motion'

function Section({ id, title, children }) {
  return (
    <section id={id} className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight text-white/90">
        {title}
      </h2>
      <div className="text-white/75 leading-relaxed">{children}</div>
    </section>
  )
}

export default function CvContent() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-24 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-white/10 bg-black/40 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Dat Chau
            </h1>
            <p className="mt-1 text-white/70">Full-Stack Developer</p>
            <p className="mt-2 text-white/65">
              Concept: <span className="text-white/90 font-medium">Portal Hopping</span>{' '}
              (Du hành không gian)
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-right"
          >
            <div className="text-xs uppercase tracking-widest text-white/50">
              Status
            </div>
            <div className="text-sm text-white/85">Available for missions</div>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Section id="about" title="🚀 About Me">
              <ul className="list-disc pl-5 space-y-2">
                <li>I build web apps, backend systems and DevOps pipelines.</li>
                <li>
                  Currently exploring cloud infrastructure, DevOps, and modern
                  frameworks.
                </li>
              </ul>
            </Section>

            <Section id="stack" title="💻 Tech Stack">
              <p className="text-white/75">
                JavaScript/TypeScript • React • Node • Java • Cloud/DevOps
                • Databases
              </p>
            </Section>
          </div>

          <div className="space-y-4">
            <Section id="skills" title="🧠 Portal Capabilities">
              <ul className="list-disc pl-5 space-y-2">
                <li>Frontend: interactive UI + motion.</li>
                <li>
                  3D: R3F scenes with postprocessing (bloom, depth vibes).
                </li>
                <li>Backend/Cloud: deploy, monitor, iterate.</li>
              </ul>
            </Section>

            <Section id="contact" title="📡 Contact">
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:chaudat1324@gmail.com"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10 transition"
                >
                  Gmail
                </a>
                <a
                  href="https://github.com/datctdev"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10 transition"
                >
                  GitHub
                </a>
              </div>
            </Section>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 text-xs text-white/50"
        >
          Tip: scroll to explore the portal. (UI is overlayed on 3D space.)
        </motion.div>
      </motion.div>
    </div>
  )
}
