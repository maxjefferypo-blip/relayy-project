import { useEffect, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { ORB_VIDEO } from '@/lib/media'

const ACCENT = '#5E0ED7'
const EASE = [0.22, 1, 0.36, 1] as const

const NAV_LINKS = [
  { label: 'What We Do', href: '#capabilities' },
  { label: 'Examples', href: '#examples' },
  { label: 'Contact', href: '#contact' },
]

/** Proof points, not headlines — deliberately smaller than the h1. */
const PROOF_POINTS = ['More Growth', 'Less Admin', 'Smarter Systems']

const HEADING_WORDS = ['AI That Makes', 'Business Better']

const CTA_LABEL = 'Find Your Opportunity'


const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: EASE },
  }),
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: EASE },
  }),
}

/**
 * The mark is bright and iridescent, so on the light hero it sits on a dark
 * disc — which also mirrors the hamburger button on the other end of the nav.
 */
function Logo() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black">
      <img
        src="/relay-mark.png"
        alt="Relay"
        width={320}
        height={206}
        className="w-[22px] select-none object-contain"
      />
    </div>
  )
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)

  /**
   * The overlay is `fixed`, which covers the page but does not stop it
   * scrolling underneath on touch. Lock the body while it is open, and close
   * on Escape.
   */
  useEffect(() => {
    if (!menuOpen) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <div className="relative min-h-screen font-inter">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-[18%_center] sm:object-center"
        src={ORB_VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Mobile scrim. Portrait crops the orb across the copy, so the bottom of
        the frame fades into the video's own ground (#F3F3F3) — invisible where
        the frame is already plain, legible where it isn't. Desktop has room and
        needs none. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[55%] bg-gradient-to-t from-[#F3F3F3] via-[#F3F3F3]/85 to-transparent md:hidden"
      />

      {/* Foreground */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-between px-5 pt-5 sm:px-8 md:px-12 md:pt-6">
          <motion.div variants={fadeDown} initial="hidden" animate="visible" custom={0}>
            <Logo />
          </motion.div>

          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                variants={fadeDown}
                initial="hidden"
                animate="visible"
                custom={i + 1}
                className="-my-1 py-1 text-sm font-semibold uppercase tracking-widest text-black transition-opacity duration-300 hover:opacity-60"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={() => setMenuOpen(true)}
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            custom={5}
            aria-label="Open menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full bg-black"
          >
            <span className="h-0.5 w-4 bg-white" />
            <span className="h-0.5 w-4 bg-white" />
            <span className="h-0.5 w-4 bg-white" />
          </motion.button>
        </nav>

        {/* The middle is deliberately empty — one message per level of the
          hierarchy, and the video gets room to read. */}
        <div className="flex-1" />

        {/* Bottom */}
        <div className="flex flex-col gap-5 px-5 pb-8 sm:gap-6 sm:px-8 md:gap-10 md:px-12 md:pb-12">
          {/* CTA — above the headline on desktop, after it on mobile */}
          <motion.a
            href="#contact"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="order-3 -my-1 flex items-center gap-1 whitespace-nowrap py-1 text-base uppercase tracking-wide sm:text-xl md:order-none md:self-end md:text-2xl"
            style={{ color: ACCENT, fontWeight: 600 }}
          >
            {CTA_LABEL}
            <ArrowUpRight className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
          </motion.a>

          {/* Row B — caption + heading */}
          <div className="order-2 flex flex-col items-start gap-4 md:order-none md:flex-row md:items-end md:justify-between md:gap-4">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="order-2 w-full min-w-0 md:order-none md:w-[150px] lg:w-[220px] xl:w-[260px]"
            >
              <p className="text-left text-[9px] font-semibold uppercase leading-snug tracking-widest text-black sm:text-xs md:text-right md:text-sm">
                {/* broken explicitly, so the line never runs across the orb */}
                AI &amp; Automation
                <br />
                For Growing Businesses
              </p>
            </motion.div>

            <h1 className="order-1 w-full shrink-0 text-right md:order-none md:w-auto">
              {HEADING_WORDS.map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4 + i * 0.14, duration: 0.7, ease: EASE }}
                    className="block uppercase text-black"
                    style={{
                      fontSize: 'clamp(1.625rem, 9px + 5.75vw, 7.5rem)',
                      lineHeight: 0.88,
                      fontWeight: 600,
                    }}
                  >
                    {/* trailing space so the accessible name is not
                      "MakesBusiness" — each line is its own block */}
                    {i < HEADING_WORDS.length - 1 ? `${word} ` : word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          {/* Row C — proof points */}
          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={6}
            className="order-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/20 pt-5 sm:gap-x-10 md:order-none md:pt-6"
          >
            {PROOF_POINTS.map((point) => (
              <li
                key={point}
                className="text-[10px] font-semibold uppercase tracking-widest text-black sm:text-xs md:text-sm"
              >
                {point}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white px-5 py-5 sm:px-8">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>

          <div className="mt-16 flex flex-col gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-semibold uppercase tracking-widest text-black"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-auto flex items-center gap-1 text-xl uppercase tracking-wide"
            style={{ color: ACCENT, fontWeight: 600 }}
          >
            {CTA_LABEL}
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      )}
    </div>
  )
}
