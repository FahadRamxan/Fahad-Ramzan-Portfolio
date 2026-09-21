import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, X, ArrowUpRight, Sparkles } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { projects, projectCategories } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce, EASE } from '../lib/motion'
import { cx } from '../lib/utils'

const ProjectCard = forwardRef(function ProjectCard({ project, onOpen }, ref) {
  return (
    <motion.button
      ref={ref}
      layout
      onClick={() => onOpen(project)}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="card-hover group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-left"
    >
      {project.featured && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
          <Star size={10} className="fill-amber-300" /> Featured
        </span>
      )}

      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-md bg-accent-500/10 px-2 py-0.5 text-[11px] font-medium text-accent-300 ring-1 ring-inset ring-accent-500/20">
          {project.category}
        </span>
        <span className="font-mono text-xs text-slate-500">{project.year}</span>
      </div>

      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
      <p className="mt-0.5 text-sm font-medium text-slate-400">
        {project.subtitle}
      </p>

      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[11px] text-slate-300"
          >
            {t}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="rounded-md px-2 py-0.5 text-[11px] text-slate-500">
            +{project.stack.length - 4}
          </span>
        )}
      </div>

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-300 opacity-0 transition-opacity group-hover:opacity-100">
        View details <ArrowUpRight size={14} />
      </span>
    </motion.button>
  )
})

function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const prevFocused = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && panelRef.current) {
        const f = [
          ...panelRef.current.querySelectorAll(
            'a[href], button:not([disabled])',
          ),
        ]
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      if (prevFocused instanceof HTMLElement) prevFocused.focus()
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] grid place-items-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-md" />
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 shadow-card"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-lg bg-ink-900/80 text-slate-300 hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-accent-500/10 px-2 py-0.5 text-[11px] font-medium text-accent-300 ring-1 ring-inset ring-accent-500/20">
            {project.category}
          </span>
          <span className="font-mono text-xs text-slate-500">
            {project.year}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
              <Star size={10} className="fill-amber-300" /> Featured
            </span>
          )}
        </div>

        <h3 className="mt-3 text-2xl font-bold text-white">{project.title}</h3>
        <p className="text-sm font-medium text-accent-300">
          {project.subtitle}
        </p>
        <p className="mt-1 font-mono text-xs text-slate-500">{project.role}</p>

        <p className="mt-4 text-sm leading-relaxed text-slate-300">
          {project.description}
        </p>

        <div className="mt-5">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles size={15} className="text-accent-300" /> Highlights
          </h4>
          <ul className="space-y-2">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-sm leading-relaxed text-slate-400"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h4 className="mb-2 text-sm font-semibold text-white">Tech stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  )

  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          subtitle="A cross-section of AI, automation, data, and computer-vision projects. Click any card for details."
        />

        {/* Filter tabs */}
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {projectCategories.map((cat) => (
            <motion.button
              key={cat}
              variants={fadeUp}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={cx(
                'relative rounded-full px-4 py-2.5 text-sm font-medium transition-colors',
                filter === cat
                  ? 'text-white'
                  : 'text-slate-300 hover:text-white',
              )}
            >
              {filter === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-500 to-violet-600 shadow-glow"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {filter !== cat && (
                <span className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.02]" />
              )}
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onOpen={setSelected}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
