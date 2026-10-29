import { useEffect, useState } from 'react'
import { m, type Variants } from 'framer-motion'
import { ArrowDown, ArrowUpRight, X } from 'lucide-react'
import { ORB_POSTER, ORB_VIDEO } from '@/lib/media'
import { LoopVideo } from '@/components/ui/loop-video'
import { CornerMarks } from './primitives'

const ACCENT = '#5E0ED7'
const EASE = [0.22, 1, 0.36, 1] as const

const NAV_LINKS = [
  { label: 'Your Focus', href: '#capabilities' },
  { label: 'Examples', href: '#examples' },
  { label: 'Contact', href: '#contact' },
]

/** Proof points, not headlines — deliberately smaller than the h1. */
const PROOF_POINTS = ['Acquire', 'Convert', 'Retain']

const HEADING_WORDS = ['Your Fractional', 'Growth Partner.']

const CTA_LABEL = 'Tell Me The Problem'
const WORK_LABEL = 'See The Work'


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

/**
 * Founder byline. The service is one person, so the hero says who: top right
 * on desktop, where the frame is empty. Phones get `BylinePill` in the nav.
 *
 * Built from the site's own parts: the hairline panel and crosshair corners of
 * Capabilities and Contact, the uppercase label type, the accent for the role,
 * and the capability cards' holographic mark turning on the photo's corner.
 */
function Byline({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center gap-4 border border-black/15 bg-[#F3F3F3]/85 py-3.5 pl-3.5 pr-5 md:gap-5 md:py-4 md:pl-4 md:pr-6 ${className}`}
    >
      <CornerMarks />

      {/* The photo, clean, with the capability cards' holographic mark as a
        small turning badge on its corner: the same `shape-spin` they use, so
        reduced motion stills it. */}
      <span className="relative block size-16 shrink-0 md:size-[4.5rem] lg:size-20">
        <img
          src="/max.jpg"
          alt="Max, founder of Relay"
          width={640}
          height={640}
          className="size-full select-none rounded-full border-2 border-white object-cover"
        />
        <span
          aria-hidden="true"
          className="shape-spin absolute -bottom-1 -right-1.5 block size-7 md:size-8"
          style={{ animationDuration: '10s' }}
        >
          <img
            src="/shape-9.webp"
            alt=""
            width={256}
            height={256}
            className="size-full select-none object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
          />
        </span>
      </span>

      <div className="max-w-[16rem]">
        <p className="text-xs font-semibold uppercase tracking-widest text-black md:text-sm">
          Hi, I’m Max
        </p>
        <p
          className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest md:text-[11px]"
          style={{ color: ACCENT }}
        >
          Founder · Relay
        </p>
        <p className="mt-2 text-xs leading-relaxed text-black/70 lg:text-[13px]">
          You’ll work directly with me, from the first call to the results.
        </p>
      </div>
    </div>
  )
}

/**
 * The byline on phones: the card does not fit beside the headline, so it
 * shrinks to a pill in the nav, matching the height of the menu button beside
 * it. Same photo and turning mark as the card; taps through to how the work
 * runs.
 */
function BylinePill() {
  return (
    <a
      href="#approach"
      className="flex h-9 items-center gap-2 rounded-full border border-black/15 bg-[#F3F3F3]/90 py-1 pl-1 pr-3.5"
    >
      <span className="relative block size-7 shrink-0">
        <img
          src="/max.jpg"
          alt=""
          width={640}
          height={640}
          className="size-full select-none rounded-full object-cover"
        />
        <span
          aria-hidden="true"
          className="shape-spin absolute -bottom-1 -right-1.5 block size-3.5"
          style={{ animationDuration: '10s' }}
        >
          <img src="/shape-9.webp" alt="" width={256} height={256} className="size-full object-contain" />
        </span>
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-black">
        Hi, I’m Max
      </span>
    </a>
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

          <div className="flex items-center gap-2.5">
            <m.div variants={fadeDown} initial="hidden" animate="visible" custom={4} className="md:hidden">
              <BylinePill />
            </m.div>

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
          </div>
        </nav>

        <m.div
          variants={fadeDown}
          initial="hidden"
          animate="visible"
          custom={5}
          className="absolute right-12 top-24 hidden md:block lg:top-28"
        >
          <Byline />
        </m.div>

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
                    className="block text-[clamp(1.5rem,8vw,2.75rem)] uppercase text-black md:text-[clamp(0.95625rem,5vw,6rem)]"
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
                More customers, more returning customers, more growth. Without
                the agency overhead.
              </p>
            </m.div>
          </div>

          {/* CTAs — above the headline on desktop, after it on mobile */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={7}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] uppercase tracking-wide sm:gap-x-8 sm:text-[15px] md:order-first md:self-end md:text-lg"
            style={{ fontWeight: 600 }}
          >
            <a
              href="#contact"
              className="-my-1 flex items-center gap-1.5 whitespace-nowrap py-1"
              style={{ color: ACCENT }}
            >
              {CTA_LABEL}
              <ArrowUpRight className="size-[14px] shrink-0 sm:size-4 md:size-[18px]" />
            </a>
            <a
              href="#work"
              className="-my-1 flex items-center gap-1.5 whitespace-nowrap py-1 text-black transition-opacity duration-300 hover:opacity-60"
            >
              {WORK_LABEL}
              <ArrowDown className="size-[14px] shrink-0 sm:size-4 md:size-[18px]" />
            </a>
          </m.div>

          {/* Row C — proof points */}
          <m.ul
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={8}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-black/20 pt-5 sm:gap-x-10 md:pt-6"
          >
            {PROOF_POINTS.map((point) => (
              <li
                key={point}
                className="text-[10px] font-semibold uppercase tracking-wider text-black/70 sm:text-[11px] sm:tracking-widest md:text-xs"
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
