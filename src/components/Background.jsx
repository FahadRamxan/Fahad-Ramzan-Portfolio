import { motion } from 'framer-motion'

// Fixed ambient background: deep gradient, faint grid, and slow-drifting
// indigo/violet glow orbs. Sits behind all content (-z-10), pointer-events none.
export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* Faint grid */}
      <div className="absolute inset-0 bg-grid-faint [background-size:44px_44px] opacity-[0.5] mask-fade-b" />

      {/* Radial vignette top */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(99,102,241,0.16),transparent_60%)]" />

      {/* Drifting glow orbs */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-24 h-[36rem] w-[36rem] rounded-full bg-accent-600/20 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-violet-600/20 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-accent-500/10 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
