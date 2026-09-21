import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/motion'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignment =
    align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`flex flex-col ${alignment} gap-3 mb-14`}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-accent-300"
        >
          <span className="h-px w-6 bg-accent-400/60" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className="text-3xl sm:text-4xl md:text-5xl font-bold"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`max-w-2xl text-base sm:text-lg text-slate-400 ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
