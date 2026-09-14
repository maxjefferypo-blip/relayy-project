import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

export const ACCENT = '#5E0ED7'
/** Accent tint for dark grounds: #5E0ED7 on #0A0A0A is only 2.38:1. */
export const ACCENT_ON_DARK = '#B793ED'
export const EASE = [0.22, 1, 0.36, 1] as const

/** Same fade-up the hero uses, re-triggered on scroll instead of on load. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: EASE },
  }),
}

/**
 * Every reveal on this page starts hidden and is released by an
 * IntersectionObserver, so a callback that never lands leaves the content
 * permanently invisible rather than merely un-animated — a silent failure, and
 * the worst kind for a headline.
 *
 * This pairs the observer with a plain geometry check: shortly after mount, and
 * on scroll until it fires, if the element is actually within the viewport we
 * release it ourselves. When the observer behaves (it normally does) the check
 * costs one `getBoundingClientRect` and nothing else.
 */
function useReveal<T extends Element>(amount: number) {
  const ref = useRef<T>(null)
  const observed = useInView(ref, { once: true, amount })
  const [fallback, setFallback] = useState(false)
  const revealed = observed || fallback

  useEffect(() => {
    if (revealed) return

    const check = () => {
      const el = ref.current
      if (!el) return
      // Anything at or above the fold is released — not just what is currently
      // on screen. A fast flick can jump an element from below the fold to
      // above it without an observer callback landing, and because these
      // reveals *hide* content that would leave a headline permanently
      // invisible.
      if (el.getBoundingClientRect().top < window.innerHeight) setFallback(true)
    }

    const timer = window.setTimeout(check, 500)
    window.addEventListener('scroll', check, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', check)
    }
  }, [revealed])

  return [ref, revealed] as const
}

export function Reveal({
  children,
  index = 0,
  className = '',
}: {
  children: ReactNode
  index?: number
  className?: string
}) {
  const [ref, revealed] = useReveal<HTMLDivElement>(0.25)

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={revealed ? 'visible' : 'hidden'}
      custom={index}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Small uppercase section label, e.g. "WHAT WE DO". */
export function Eyebrow({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <Reveal>
      <p
        className={`text-[10px] font-semibold uppercase tracking-widest sm:text-xs md:text-sm ${
          muted ? 'text-white/50' : 'text-black/50'
        }`}
      >
        {children}
      </p>
    </Reveal>
  )
}

/**
 * Section heading using the hero's clip reveal — each line slides up out of an
 * overflow-hidden wrapper.
 */
export function ClipHeading({
  lines,
  className = '',
  light = false,
  size = 'clamp(1.5rem, 5.5vw, 5rem)',
}: {
  lines: string[]
  className?: string
  light?: boolean
  size?: string
}) {
  const [ref, revealed] = useReveal<HTMLHeadingElement>(0.3)

  return (
    /*
     * The trigger lives on the <h2>, not on the words. Each word starts
     * translated fully outside its overflow-hidden wrapper, and
     * IntersectionObserver clips against ancestor overflow — so a trigger on
     * the word itself would never see an intersection and never fire.
     * Variants propagate from the parent instead.
     */
    <motion.h2
      ref={ref}
      className={className}
      initial="hidden"
      animate={revealed ? 'visible' : 'hidden'}
    >
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            variants={{
              hidden: { y: '110%' },
              visible: {
                y: 0,
                transition: { delay: i * 0.14, duration: 0.7, ease: EASE },
              },
            }}
            className={`block uppercase ${light ? 'text-white' : 'text-black'}`}
            style={{ fontSize: size, lineHeight: 0.92, fontWeight: 600 }}
          >
            {/* trailing space: each line is its own block, so without it the
              accessible name concatenates the lines into one word */}
            {i < lines.length - 1 ? `${line} ` : line}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

/** Body copy — sentence case, since these run longer than the hero's fragments. */
export function Body({
  children,
  light = false,
  className = '',
}: {
  children: ReactNode
  light?: boolean
  className?: string
}) {
  return (
    <p
      className={`text-sm font-medium leading-relaxed sm:text-base md:text-lg ${
        light ? 'text-white/60' : 'text-black/60'
      } ${className}`}
    >
      {children}
    </p>
  )
}

/** Short emphasis block, uppercase like the hero's stat labels. */
export function Emphasis({
  lines,
  light = false,
  className = '',
}: {
  lines: string[]
  light?: boolean
  className?: string
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase leading-relaxed tracking-widest sm:text-sm md:text-base ${
        light ? 'text-white' : 'text-black'
      } ${className}`}
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </p>
  )
}

/**
 * `A → B → C` process strip. Four steps do not fit one line in a three-column
 * grid, so each arrow is grouped with the step that *follows* it — a wrap then
 * carries the arrow down to lead the next line, instead of leaving it dangling
 * at the end of the previous one.
 */
export function Flow({ steps, light = false }: { steps: string[]; light?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-1.5">
          {i > 0 && (
            <span
              /* Decorative: the order of the chips already carries the
                sequence, and "right arrow" between every step is noise on a
                screen reader. */
              aria-hidden="true"
              className="text-xs font-semibold"
              style={{ color: light ? ACCENT_ON_DARK : ACCENT }}
            >
              →
            </span>
          )}
          <span
            className={`border px-2 py-1.5 text-[9px] font-semibold uppercase tracking-widest sm:text-[10px] ${
              light ? 'border-white/20 text-white/80' : 'border-black/15 text-black'
            }`}
          >
            {step}
          </span>
        </span>
      ))}
    </div>
  )
}

/** Section shell: consistent vertical rhythm and horizontal padding. */
export function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-8 px-5 py-16 sm:px-8 sm:py-28 md:px-12 md:py-36 ${className}`}
    >
      {children}
    </section>
  )
}
