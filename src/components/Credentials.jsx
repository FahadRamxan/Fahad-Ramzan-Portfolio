import { motion } from 'framer-motion'
import { GraduationCap, BadgeCheck } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { education, certifications } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

export default function Credentials() {
  return (
    <section id="credentials" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Education & Certifications"
          title="Foundations & continuous learning"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Education */}
          <div>
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-white">
              <GraduationCap size={18} className="text-accent-300" /> Education
            </div>
            <motion.div
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="space-y-4"
            >
              {education.map((e) => (
                <motion.div
                  key={e.school}
                  variants={fadeUp}
                  className="card-hover rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-white">
                      {e.degree}
                    </h3>
                    <span className="font-mono text-xs text-slate-400">
                      {e.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-accent-300">{e.school}</p>
                  <p className="mt-1 text-xs text-slate-400">{e.location}</p>
                  {e.note && (
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-accent-500/10 px-2.5 py-1 text-xs text-accent-200">
                      <BadgeCheck size={13} /> {e.note}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Certifications */}
          <div>
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-white">
              <BadgeCheck size={18} className="text-accent-300" /> Certifications
            </div>
            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            >
              {certifications.map((c) => (
                <motion.div
                  key={c.name}
                  variants={fadeUp}
                  className="group flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-accent-500/30"
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-accent-500/20 to-violet-600/20 text-accent-300 ring-1 ring-inset ring-white/10">
                    <BadgeCheck size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-medium leading-snug text-white">
                      {c.name}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">{c.issuer}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-slate-500">
                      {c.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
