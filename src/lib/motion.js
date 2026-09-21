// Shared Framer Motion variants + easing used across the site
// for a consistent, professional motion language.

export const EASE = [0.22, 1, 0.36, 1] // easeOutExpo-ish

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
}

// Stagger container: children reveal in sequence.
export const staggerContainer = (stagger = 0.1, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

// Default viewport config for scroll-triggered reveals.
export const viewportOnce = { once: true, amount: 0.2 }
