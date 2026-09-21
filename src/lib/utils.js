// Resolve a file placed in /public against the deploy base path.
export const asset = (p) => `${import.meta.env.BASE_URL}${p}`

// Conditional className joiner.
export const cx = (...classes) => classes.filter(Boolean).join(' ')

// True when the visitor asked the OS to reduce motion.
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Scroll to a section by id, offsetting for the fixed navbar and
// honoring the reduced-motion preference (instant jump vs smooth).
export const scrollToId = (id, offset = 72) => {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}
