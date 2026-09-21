import { Github, Linkedin, Instagram, Mail, ArrowUp, Heart } from 'lucide-react'
import { profile, navLinks } from '../data/content'
import { prefersReducedMotion, scrollToId } from '../lib/utils'

const socials = [
  { icon: Github, href: profile.socials.github, label: 'GitHub' },
  { icon: Linkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
  { icon: Instagram, href: profile.socials.instagram, label: 'Instagram' },
  { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  const go = (e, id) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <footer className="relative border-t border-white/[0.06] py-12">
      <div className="container-x">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm text-center md:text-left">
            <a href="#home" onClick={(e) => go(e, 'home')} className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-violet-600 font-display text-sm font-bold text-white">
                FR
              </span>
              <span className="text-sm font-semibold text-white">
                {profile.name}
              </span>
            </a>
            <p className="mt-3 text-sm text-slate-400">
              AI Engineer building autonomous agents, real-time voice AI, and
              data-driven automation.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition-all hover:border-accent-500/40 hover:text-white"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
            <button
              onClick={toTop}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-accent-300"
            >
              Back to top <ArrowUp size={13} />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/[0.06] pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Built with React, Framer Motion &amp; Tailwind
            <Heart size={12} className="fill-accent-400 text-accent-400" />
          </p>
        </div>
      </div>
    </footer>
  )
}
