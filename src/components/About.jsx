import { motion } from 'framer-motion'
import { Award, Users, Trophy, Languages as LangIcon } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import CountUp from './ui/CountUp'
import Reveal from './ui/Reveal'
import { stats, profile, achievements, languages } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

const achievementIcons = { Award, Users, Trophy, Languages: LangIcon }

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="About"
          title="Turning data & AI into real outcomes"
          subtitle="A quick snapshot of who I am and what I've shipped."
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: narrative + achievements */}
          <div>
            <Reveal className="space-y-5 text-base leading-relaxed text-slate-400 sm:text-lg">
              <p>{profile.summary}</p>
              <p>
                From{' '}
                <span className="text-slate-200">
                  real-time voice platforms
                </span>{' '}
                and{' '}
                <span className="text-slate-200">multi-tenant RAG chatbots</span>{' '}
                to{' '}
                <span className="text-slate-200">Power BI dashboards</span> and{' '}
                <span className="text-slate-200">computer-vision pipelines</span>
                , I like owning problems end-to-end — architecture, modeling,
                deployment, and the metrics that prove it worked.
              </p>
            </Reveal>

            <motion.ul
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {achievements.map((a) => {
                const Icon = achievementIcons[a.icon] || Award
                return (
                  <motion.li
                    key={a.text}
                    variants={fadeUp}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 text-sm text-slate-300"
                  >
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-500/15 text-accent-300">
                      <Icon size={16} />
                    </span>
                    {a.text}
                  </motion.li>
                )
              })}
            </motion.ul>
          </div>

          {/* Right: stats + languages */}
          <div className="space-y-6">
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="card-hover rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
                >
                  <div className="font-display text-3xl font-bold text-white sm:text-4xl">
                    <span className="gradient-text">
                      <CountUp value={s.value} suffix={s.suffix} />
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-slate-400">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <Reveal className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                <LangIcon size={16} className="text-accent-300" /> Languages
              </div>
              <div className="space-y-4">
                {languages.map((l, idx) => (
                  <div key={l.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-slate-200">{l.name}</span>
                      <span className="text-xs text-slate-500">{l.level}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.pct}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 0.15 * idx,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-accent-400 to-violet-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
