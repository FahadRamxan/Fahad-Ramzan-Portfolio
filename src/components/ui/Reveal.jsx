import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../../lib/motion'

// Scroll-triggered reveal wrapper. Pass a custom `variants` to override.
export default function Reveal({
  children,
  variants = fadeUp,
  className = '',
  as = 'div',
  delay = 0,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
