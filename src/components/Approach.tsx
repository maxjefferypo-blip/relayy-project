import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { HoloGround } from '@/components/ui/holo-ground'
import { ACCENT_ON_DARK, ClipHeading, Reveal, Section, TYPE } from './primitives'

/** The method, in order, each with what the client walks away with. */
const STEPS = [
  {
    lead: 'Find',
    rest: 'the biggest lever.',
    body: 'Where are customers lost, from first visit to fifth booking? I start with the change most likely to move your numbers.',
    outcome: 'A ranked shortlist of growth opportunities',
  },
  {
    lead: 'Test',
    rest: 'it properly.',
    body: 'Ads, emails, letters, booking flows. Whatever tools fit, set up and run end to end.',
    outcome: 'Live experiments, each with a target to beat',
  },
  {
    lead: 'Keep',
    rest: 'what works.',
    body: 'Double down on what moves your numbers, drop what doesn’t, then go again.',
    outcome: 'A before-and-after on the numbers that matter',
  },
]

/**
 * Step markers are the capability cards' holographic mark, hue-shifted per
 * step the same way, so the method reads as part of the same system.
 */
const SHAPE = '/shape-9.webp'
const STEP_HUES = [0, 125, 250]

/** What every engagement guarantees, whatever the work turns out to be. */
const PROMISES = [
  'A clear target before any work starts',
  'Progress in plain English, every week',
  'Results judged on your numbers, not activity',
]

/**
 * Scroll position through the steps: which step sits nearest the middle of the
 * viewport, and how far down the list that middle line has travelled (0–1),
 * which fills the rail. Before hydration, and if the effect never runs, step
 * one reads as active and the rail is empty, so the list is still complete.
 */
function useStepProgress() {
  const listRef = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    let frame = 0
    const update = () => {
      frame = 0
      const middle = window.innerHeight / 2
      const rect = list.getBoundingClientRect()
      setProgress(Math.min(1, Math.max(0, (middle - rect.top) / rect.height)))

      let nearest = 0
      let best = Infinity
      // Only the steps: the rail is the list's first child.
      list.querySelectorAll(':scope > li').forEach((item, i) => {
        const r = item.getBoundingClientRect()
        const distance = Math.abs(r.top + r.height / 2 - middle)
        if (distance < best) {
          best = distance
          nearest = i
        }
      })
      setActive(nearest)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return { listRef, active, progress }
}

/**
 * How the work runs, after the case studies have shown what it produces. The
 * founder is introduced in the hero, so this section is about outcomes: what
 * each step hands over, and what every engagement guarantees. The steps light
 * up in turn as each reaches the middle of the screen.
 */
export default function Approach() {
  const { listRef, active, progress } = useStepProgress()

  return (
    <Section id="approach" className="relative overflow-hidden bg-[#0A0A0A]">
      <HoloGround dark />

      <div className="relative">
      <ClipHeading lines={['Impact you can measure.']} light />

      <div className="mt-6 grid gap-10 md:mt-8 lg:grid-cols-2 lg:gap-20">
        <div className="lg:self-start">
          <Reveal index={1}>
            <p className={`max-w-[34ch] ${TYPE.lead} text-white`}>
              I care about one thing: helping your business grow, in a way you
              can see in the numbers.
            </p>
            <p className={`mt-4 max-w-[52ch] ${TYPE.body} text-white/60`}>
              No vanity reports, no account managers. Just someone as invested
              in your growth as you are.
            </p>
          </Reveal>

          <Reveal index={2}>
            <ul className="mt-8 border-t border-white/15">
              {PROMISES.map((promise) => (
                <li
                  key={promise}
                  className="flex items-baseline gap-3 border-b border-white/15 py-3.5 text-sm font-semibold text-white sm:text-base"
                >
                  <span aria-hidden="true" style={{ color: ACCENT_ON_DARK }}>
                    →
                  </span>
                  {promise}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={`-my-1 mt-8 inline-flex items-center gap-1.5 py-1 ${TYPE.action} transition-opacity duration-300 hover:opacity-70`}
              style={{ color: ACCENT_ON_DARK }}
            >
              Start with a 30-minute call
              <ArrowUpRight className="size-4 shrink-0" />
            </a>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative">
          {/* Rail: a hairline the full height of the list, filled in accent as
            the reader scrolls through it. */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[1.1rem] top-0 w-px bg-white/20 sm:left-[1.4rem]"
          >
            <span
              className="absolute inset-x-0 top-0 transition-[height] duration-150 ease-out motion-reduce:transition-none"
              style={{ height: `${progress * 100}%`, background: 'rgba(255,255,255,0.7)' }}
            />
          </span>

          {STEPS.map(({ lead, rest, body, outcome }, i) => {
            const isActive = i === active

            return (
              <li
                key={lead}
                aria-current={isActive ? 'step' : undefined}
                className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-5 py-7 sm:grid-cols-[2.8rem_minmax(0,1fr)] sm:gap-x-7 sm:py-9 lg:min-h-[24vh] lg:content-center"
              >
                {/* Dark disc behind the mark hides the rail where it passes.
                  Only the active step's mark turns and holds its colour. */}
                <span className="relative z-10 flex size-9 items-center justify-center rounded-full bg-[#0A0A0A] sm:size-11">
                  <span
                    className={`block size-full transition-[filter,opacity] duration-500 ease-out motion-reduce:transition-none ${
                      isActive ? 'shape-spin opacity-100' : 'opacity-40 grayscale'
                    }`}
                    style={{ animationDuration: '10s' }}
                  >
                    <img
                      src={SHAPE}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      width={256}
                      height={256}
                      className="size-full select-none object-contain"
                      style={{ filter: `hue-rotate(${STEP_HUES[i]}deg)` }}
                    />
                  </span>
                </span>

                <div
                  className={`transition-opacity duration-500 motion-reduce:transition-none ${
                    isActive ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <p className={`${TYPE.label} tabular-nums text-white/60`}>
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className={`mt-1.5 ${TYPE.title} text-white`}>
                    {lead}
                    <span className="text-white/60"> {rest}</span>
                  </p>
                  <p className={`mt-3 max-w-[44ch] ${TYPE.body} text-white/70`}>
                    {body}
                  </p>
                  <p className={`mt-4 ${TYPE.label} text-white/60`}>
                    You get{' '}
                    <span style={{ color: ACCENT_ON_DARK }}>{outcome}</span>
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
      </div>
    </Section>
  )
}
