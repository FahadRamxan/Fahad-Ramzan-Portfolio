import { motion } from 'framer-motion'
import {
  Code2,
  BrainCircuit,
  Bot,
  BarChart3,
  ScanEye,
  Server,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { skillGroups } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

const iconMap = { Code2, BrainCircuit, Bot, BarChart3, ScanEye, Server }

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Skills"
          title="My technical toolbox"
          subtitle="The languages, frameworks, and platforms I reach for to ship AI products."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group) => {
            const Icon = iconMap[group.icon] || Code2
            return (
              <motion.div
                key={group.title}
                variants={fadeUp}
                className="card-hover group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                {/* top accent line on hover */}
                <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent-400 to-transparent transition-transform duration-300 group-hover:scale-x-100" />

                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent-500/20 to-violet-600/20 text-accent-300 ring-1 ring-inset ring-white/10">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-base font-semibold text-white">
                    {group.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300 transition-colors group-hover:border-accent-500/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
