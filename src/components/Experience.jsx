import { motion } from 'framer-motion'
import { Briefcase, MapPin, Dot } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { experience } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've been building"
          subtitle="Roles across AI automation, data science, and applied ML."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-accent-500/60 via-white/10 to-transparent sm:left-5" />

          <motion.ol
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-8"
          >
            {experience.map((job) => (
              <motion.li
                key={`${job.company}-${job.period}`}
                variants={fadeUp}
                className="relative pl-14 sm:pl-16"
              >
                {/* Dot */}
                <span className="absolute left-0 top-1 grid h-9 w-9 place-items-center rounded-full border border-accent-500/40 bg-ink-900 text-accent-300 shadow-glow sm:h-10 sm:w-10">
                  <Briefcase size={16} />
                </span>

                <div className="card-hover rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold text-white">
                      {job.role}
                    </h3>
                    {job.current && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Current
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
                    <span className="font-medium text-accent-300">
                      {job.company}
                    </span>
                    {job.note && (
                      <span className="text-slate-500">· {job.note}</span>
                    )}
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-slate-400">
                    <span>{job.period}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} /> {job.location}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {job.points.map((p, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm leading-relaxed text-slate-400"
                      >
                        <Dot
                          size={18}
                          className="-ml-1 mt-0.5 shrink-0 text-accent-400"
                        />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
