import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { navLinks, profile } from '../data/content'
import { useActiveSection } from '../lib/useActiveSection'
import { asset, cx, scrollToId } from '../lib/utils'

const ids = navLinks.map((l) => l.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const toggleRef = useRef(null)
  const menuRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: lock scroll, move focus in, trap Tab, Escape to close,
  // and restore focus to the toggle on close.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const node = menuRef.current
    const focusables = () =>
      node
        ? [...node.querySelectorAll('a[href], button:not([disabled])')]
        : []
    focusables()[0]?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key === 'Tab') {
        const f = focusables()
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
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      toggleRef.current?.focus()
    }
  }, [open])

  const handleNav = (e, id) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass shadow-card'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <nav className="container-x flex h-[68px] items-center justify-between">
          <a
            href="#home"
            onClick={(e) => handleNav(e, 'home')}
            className="group flex items-center gap-2.5"
            aria-label="Fahad Ramzan — home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-violet-600 font-display text-sm font-bold text-white shadow-glow">
              FR
            </span>
            <span className="hidden text-sm font-semibold text-white sm:block">
              {profile.name}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNav(e, link.id)}
                  aria-current={active === link.id ? 'page' : undefined}
                  className={cx(
                    'relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                    active === link.id
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white',
                  )}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/[0.07] ring-1 ring-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={asset(profile.resume)}
              download
              className="hidden items-center gap-2 rounded-lg bg-gradient-to-r from-accent-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              <Download size={15} /> Resume
            </a>
            <button
              ref={toggleRef}
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-lg text-slate-200 hover:bg-white/5 lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-[2px] origin-left bg-gradient-to-r from-accent-400 via-violet-500 to-accent-500"
        />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-950/85 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              id="mobile-menu"
              ref={menuRef}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-3 top-[80px] rounded-2xl border border-white/10 bg-ink-900/98 p-3 shadow-card"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleNav(e, link.id)}
                      aria-current={active === link.id ? 'page' : undefined}
                      className={cx(
                        'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                        active === link.id
                          ? 'bg-white/[0.06] text-white'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white',
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={asset(profile.resume)}
                download
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-violet-600 px-4 py-3 text-sm font-semibold text-white"
              >
                <Download size={16} /> Download Resume
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
