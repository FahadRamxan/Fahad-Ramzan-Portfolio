import { motion } from 'framer-motion'
import {
  Github,
  Star,
  GitFork,
  BookMarked,
  UserPlus,
  Users,
  ArrowUpRight,
  RefreshCw,
  AlertCircle,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { profile } from '../data/content'
import { useGitHub } from '../lib/useGitHub'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

const LANG_COLORS = {
  Python: '#3776ab',
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  'Jupyter Notebook': '#da5b0b',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  C: '#555555',
  Java: '#b07219',
  Shell: '#89e051',
}
const dot = (lang) => LANG_COLORS[lang] || '#818cf8'

function relTime(iso) {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const day = 86400000
  if (diff < day) return 'today'
  const days = Math.floor(diff / day)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

function StatTile({ icon: Icon, value, label, loading }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-center">
      <Icon size={18} className="mx-auto mb-2 text-accent-300" />
      {loading ? (
        <div className="mx-auto h-7 w-12 animate-pulse rounded bg-white/10" />
      ) : (
        <div className="font-display text-2xl font-bold text-white sm:text-3xl">
          {value}
        </div>
      )}
      <div className="mt-1 text-xs text-slate-400">{label}</div>
    </div>
  )
}

export default function GitHubActivity() {
  const { loading, error, data } = useGitHub(profile.githubUsername)

  return (
    <section id="github" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Live from GitHub"
          title="Real-time open-source activity"
          subtitle="These numbers are pulled live from the GitHub API each time this page loads — no screenshots, no stale data."
        />

        {error ? (
          <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center">
            <AlertCircle className="text-amber-400" />
            <p className="text-sm text-slate-400">
              GitHub&apos;s public API is momentarily unavailable (it rate-limits
              anonymous requests). You can still explore everything on my
              profile directly.
            </p>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
            >
              <Github size={16} /> Visit GitHub Profile
            </a>
          </div>
        ) : (
          <>
            {/* Stat tiles */}
            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="grid grid-cols-2 gap-4 lg:grid-cols-4"
            >
              {[
                { icon: BookMarked, key: 'publicRepos', label: 'Public Repos' },
                { icon: Star, key: 'totalStars', label: 'Total Stars' },
                { icon: Users, key: 'followers', label: 'Followers' },
                { icon: UserPlus, key: 'following', label: 'Following' },
              ].map((t) => (
                <motion.div key={t.key} variants={fadeUp}>
                  <StatTile
                    icon={t.icon}
                    label={t.label}
                    loading={loading}
                    value={data?.[t.key] ?? 0}
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              {/* Top languages */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <h3 className="mb-4 text-sm font-semibold text-white">
                  Most-used languages
                </h3>
                {loading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-4 animate-pulse rounded bg-white/10"
                        style={{ width: `${90 - i * 12}%` }}
                      />
                    ))}
                  </div>
                ) : data?.topLanguages?.length ? (
                  <ul className="space-y-3">
                    {data.topLanguages.map((l) => {
                      const max = data.topLanguages[0].count || 1
                      return (
                        <li key={l.name}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-slate-200">
                              <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ background: dot(l.name) }}
                              />
                              {l.name}
                            </span>
                            <span className="text-xs text-slate-500">
                              {l.count} repos
                            </span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(l.count / max) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                              className="h-full rounded-full"
                              style={{ background: dot(l.name) }}
                            />
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">No language data yet.</p>
                )}
              </motion.div>

              {/* Top repos */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">
                    Recent repositories
                  </h3>
                  {loading && (
                    <RefreshCw size={14} className="animate-spin text-slate-500" />
                  )}
                </div>

                {loading ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-24 animate-pulse rounded-xl bg-white/[0.04]"
                      />
                    ))}
                  </div>
                ) : data?.topRepos?.length ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {data.topRepos.map((r) => (
                      <a
                        key={r.name}
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-all hover:-translate-y-0.5 hover:border-accent-500/40"
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate text-sm font-semibold text-white">
                            {r.name}
                          </span>
                          <ArrowUpRight
                            size={14}
                            className="shrink-0 text-slate-500 group-hover:text-accent-300"
                          />
                        </div>
                        <p className="mt-1 line-clamp-2 flex-1 text-xs text-slate-400">
                          {r.description || 'No description provided.'}
                        </p>
                        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                          {r.language && (
                            <span className="flex items-center gap-1">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ background: dot(r.language) }}
                              />
                              {r.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star size={12} /> {r.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={12} /> {r.forks}
                          </span>
                          <span className="ml-auto">{relTime(r.updated)}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No public repositories to show yet.
                  </p>
                )}
              </motion.div>
            </div>

            {/* Live contribution graph (image rendered from GitHub data) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-6 flex flex-col items-center gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            >
              <h3 className="self-start text-sm font-semibold text-white">
                Contribution activity
              </h3>
              <div className="w-full overflow-x-auto">
                <img
                  src={`https://ghchart.rshah.org/6366f1/${profile.githubUsername}`}
                  alt={`${profile.name}'s GitHub contribution graph`}
                  loading="lazy"
                  className="min-w-[560px] w-full opacity-90"
                />
              </div>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:border-accent-500/40 hover:text-white"
              >
                <Github size={16} /> See full profile on GitHub
                <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
