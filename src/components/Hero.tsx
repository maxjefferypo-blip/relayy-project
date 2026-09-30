import { useEffect, useState } from 'react'
import { m, type Variants } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { ORB_POSTER, ORB_VIDEO } from '@/lib/media'
import { LoopVideo } from '@/components/ui/loop-video'

const ACCENT = '#5E0ED7'
const EASE = [0.22, 1, 0.36, 1] as const

const NAV_LINKS = [
  { label: 'What We Do', href: '#capabilities' },
  { label: 'Examples', href: '#examples' },
  { label: 'Contact', href: '#contact' },
]

/** Proof points, not headlines — deliberately smaller than the h1. */
const PROOF_POINTS = ['More Reach', 'More Customers', 'Less Admin']

const HEADING_WORDS = ['Better Marketing.', 'Smarter Automation.', 'Less Admin.']

const CTA_LABEL = 'Tell Us What You Need'


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
        src="/relay-mark.webp"
        alt="Relay"
        width={160}
        height={103}
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
      <LoopVideo
        src={ORB_VIDEO}
        poster={ORB_POSTER}
        className="absolute inset-0 h-full w-full object-cover object-[18%_center] sm:object-center"
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
          <m.div variants={fadeDown} initial="hidden" animate="visible" custom={0}>
            <Logo />
          </m.div>

          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {NAV_LINKS.map((link, i) => (
              <m.a
                key={link.label}
                href={link.href}
                variants={fadeDown}
                initial="hidden"
                animate="visible"
                custom={i + 1}
                className="-my-1 py-1 text-xs font-semibold uppercase tracking-widest text-black transition-opacity duration-300 hover:opacity-60"
              >
                {link.label}
              </m.a>
            ))}
          </div>

          <m.button
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
          </m.button>
        </nav>

        {/* The middle is deliberately empty — one message per level of the
          hierarchy, and the video gets room to read. */}
        <div className="flex-1" />

        {/* Bottom */}
        <div className="flex flex-col gap-5 px-5 pb-8 sm:gap-6 sm:px-8 md:gap-8 md:px-12 md:pb-12">
          {/* Source order follows mobile reading order; desktop places copy on the left. */}
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between md:gap-4">
            <h1 className="w-full shrink-0 text-left md:w-auto md:text-right">
              {HEADING_WORDS.map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <m.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4 + i * 0.14, duration: 0.7, ease: EASE }}
                    className="block text-[clamp(1.125rem,5.2vw,2rem)] uppercase text-black md:text-[clamp(0.95625rem,4.08vw,4.8875rem)]"
                    style={{
                      lineHeight: 0.88,
                      fontWeight: 600,
                    }}
                  >
                    {/* trailing space so the accessible name is not
                      "MakesBusiness" — each line is its own block */}
                    {i < HEADING_WORDS.length - 1 ? `${word} ` : word}
                  </m.span>
                </span>
              ))}
            </h1>

            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
              className="w-full min-w-0 md:order-first md:w-[260px] lg:w-[300px] xl:w-[340px]"
            >
              {/* Two lines at every width, like each section's subheader. */}
              <p className="max-w-[44ch] text-balance text-left text-xs font-normal leading-relaxed text-black/70 lg:text-sm">
                Campaigns that get you seen. Systems that turn attention into
                customers.
              </p>
            </m.div>
          </div>

          {/* CTA — above the headline on desktop, after it on mobile */}
          <m.a
            href="#contact"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={7}
            className="-my-1 flex items-center gap-1.5 whitespace-nowrap py-1 text-[13px] uppercase tracking-wide sm:text-[15px] md:order-first md:self-end md:text-lg"
            style={{ color: ACCENT, fontWeight: 600 }}
          >
            {CTA_LABEL}
            <ArrowUpRight className="size-[14px] shrink-0 sm:size-4 md:size-[18px]" />
          </m.a>

          {/* Row C — proof points */}
          <m.ul
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={8}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/20 pt-5 sm:gap-x-10 md:pt-6"
          >
            {PROOF_POINTS.map((point) => (
              <li
                key={point}
                className="text-[10px] font-semibold uppercase tracking-widest text-black/70 sm:text-[11px] md:text-xs"
              >
                {point}
              </li>
            ))}
          </m.ul>
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
