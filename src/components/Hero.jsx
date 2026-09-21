import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Instagram,
  ArrowDown,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { profile } from '../data/content'
import { asset, scrollToId } from '../lib/utils'
import { fadeUp, staggerContainer, EASE } from '../lib/motion'

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(
      () => setI((p) => (p + 1) % profile.roles.length),
      2600,
    )
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative inline-flex min-h-[1.4em] items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="gradient-text font-semibold"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const socials = [
  { icon: Github, href: profile.socials.github, label: 'GitHub' },
  { icon: Linkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
  { icon: Instagram, href: profile.socials.instagram, label: 'Instagram' },
  { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
  { icon: Phone, href: `tel:${profile.phoneHref}`, label: 'Phone' },
]

export default function Hero() {
  const scrollTo = scrollToId

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Text */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="show"
          className="order-2 lg:order-1"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-3.5 py-1.5 text-xs font-medium text-accent-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </motion.span>

          <motion.p
            variants={fadeUp}
            className="mt-6 font-mono text-sm text-slate-400"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-2 text-5xl font-extrabold leading-[1.05] sm:text-6xl md:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-4 text-2xl font-medium text-slate-200 sm:text-3xl"
          >
            <RotatingRole />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-4 flex items-center gap-2 text-sm text-slate-400"
          >
            <MapPin size={15} className="text-accent-400" />
            {profile.location}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('contact')}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
            >
              <Sparkles size={16} /> Get in touch
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-accent-500/40 hover:bg-white/[0.06]"
            >
              View my work
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition-all hover:-translate-y-1 hover:border-accent-500/40 hover:text-white hover:shadow-glow"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="order-1 flex justify-center lg:order-2"
        >
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-accent-600/40 via-violet-600/30 to-transparent blur-2xl" />
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-accent-500 to-violet-600 opacity-70 blur-md" />
              <picture>
                <source srcSet={asset(profile.photo)} type="image/webp" />
                <img
                  src={asset(profile.photoFallback)}
                  alt={`${profile.name} — ${profile.roles[0]}`}
                  width={640}
                  height={640}
                  loading="eager"
                  decoding="async"
                  className="relative h-64 w-64 rounded-[2rem] border border-white/10 object-cover shadow-glow-lg sm:h-80 sm:w-80"
                />
              </picture>
            </motion.div>
            {/* Floating tech chip */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 rounded-xl glass px-4 py-3 shadow-card"
            >
              <p className="font-mono text-xs text-slate-400">currently</p>
              <p className="text-sm font-semibold text-white">
                Building AI agents
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 hover:text-accent-300 sm:flex"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  )
}
