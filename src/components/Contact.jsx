import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Send,
  Check,
  Loader2,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { profile } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

// Optional: paste a Formspree endpoint (https://formspree.io/f/xxxx) here to
// receive submissions in your inbox. Left empty, the form opens the visitor's
// email client with everything pre-filled (works with zero setup).
const FORM_ENDPOINT = ''

const contactItems = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phoneHref}` },
  { icon: MapPin, label: 'Location', value: profile.location, href: null },
]

const socialItems = [
  { icon: Github, href: profile.socials.github, label: 'GitHub' },
  { icon: Linkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
  { icon: Instagram, href: profile.socials.instagram, label: 'Instagram' },
]

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const msgId = useId()

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    if (FORM_ENDPOINT) {
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('send failed')
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
        return
      } catch {
        // fall through to mailto
      }
    }

    // Zero-config fallback: open the visitor's mail client, pre-filled.
    const subject = encodeURIComponent(form.subject || `Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus('sent')
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something intelligent"
          subtitle="Have a project, role, or idea in mind? I'm always open to a conversation."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-4"
          >
            {contactItems.map((c) => {
              const Inner = (
                <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-accent-500/30">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-500/20 to-violet-600/20 text-accent-300 ring-1 ring-inset ring-white/10">
                    <c.icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">{c.label}</p>
                    <p className="truncate text-sm font-medium text-white">
                      {c.value}
                    </p>
                  </div>
                </div>
              )
              return (
                <motion.div key={c.label} variants={fadeUp}>
                  {c.href ? (
                    <a href={c.href} className="block">
                      {Inner}
                    </a>
                  ) : (
                    Inner
                  )}
                </motion.div>
              )
            })}

            <motion.div variants={fadeUp} className="flex gap-3 pt-1">
              {socialItems.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition-all hover:-translate-y-1 hover:border-accent-500/40 hover:text-white hover:shadow-glow"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Form */}
          <Reveal className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Your name"
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@email.com"
                  required
                />
              </div>
              <Field
                label="Subject"
                value={form.subject}
                onChange={update('subject')}
                placeholder="What's this about?"
                required
              />
              <div>
                <label
                  htmlFor={msgId}
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  Message
                </label>
                <textarea
                  id={msgId}
                  value={form.message}
                  onChange={update('message')}
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity…"
                  className="w-full resize-none rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/20"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-70 sm:w-auto"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : status === 'sent' ? (
                  <>
                    <Check size={16} /> Message ready!
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send message
                  </>
                )}
              </button>
              {status === 'sent' && (
                <p className="text-xs text-emerald-300">
                  Your email client should have opened with the message
                  pre-filled. If not, reach me directly at {profile.email}.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ label, type = 'text', ...props }) {
  const id = useId()
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-300"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...props}
        className="w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/20"
      />
    </div>
  )
}
