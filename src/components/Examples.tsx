import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { HoloGround } from '@/components/ui/holo-ground'
import { Body, CELL_PAD, CONTENT_GAP, ClipHeading, Flow, Reveal, Section, TYPE } from './primitives'

type Example = {
  title: string
  body: string
  flow: string[]
  /**
   * Client identity — the card's only mark.
   *
   * `logo` is a real client's artwork, served from `public/clients/`. If it is
   * absent, or fails to load, the monogram in `initials` stands in — so a
   * missing file degrades to a tidy placeholder rather than a broken image.
   *
   * A monogram means the name is still a **placeholder**, not a real client:
   * these cards describe work delivered, so only add artwork for a company that
   * has agreed to be named.
   */
  client: { name: string; initials: string; logo?: string }
  result: Result
}

/**
 * The outcome a card leads with.
 *
 * PLACEHOLDER: every figure below is illustrative, not a measured result.
 * Replace each with the client's real number (and their agreement to show it)
 * before this goes live — invented results next to real client names would
 * mislead visitors and misrepresent those clients.
 */
type Result = { metric: string; label: string }

const SYSTEMS: Example[] = [
  {
    title: 'Wellness CRM',
    client: { name: 'Northside Spas', initials: 'NS', logo: '/clients/northside-spas.png' },
    body: 'Turned booking data into repeat customers with one CRM that knows who’s new, who’s returning and who’s disappearing, with follow-up and rebooking handled automatically.',
    flow: ['Booking', 'History', 'Follow-Up', 'Rebook'],
    result: { metric: '+27%', label: 'Repeat visits in 90 days' },
  },
  {
    title: 'Padel Bookings',
    client: { name: 'Baseline', initials: 'BP', logo: '/clients/baseline.png' },
    body: 'Made the customer journey run itself: confirmations, cancellations, enquiries, follow-ups and re-engagement all handled automatically.',
    flow: ['Book', 'Confirm', 'Refill', 'Rebook'],
    result: { metric: '+18%', label: 'Court utilisation' },
  },
  /*
   * These two deliberately sit outside the booking-and-CRM pattern of the two
   * above: one is language work (drafting in a brand voice, with a human
   * approving), the other is reporting. Both are things AI is genuinely good at
   * rather than aspirational.
   */
  {
    title: 'Review Replies',
    client: { name: 'The Granary', initials: 'TG', logo: '/clients/the-granary.png' },
    body: 'Watched for new reviews, drafted a reply in the venue’s own voice for one-click approval, and routed anything negative to a manager instead of answering it automatically.',
    flow: ['Review', 'Draft', 'Approve', 'Post'],
    result: { metric: '4 hrs', label: 'Average reply time, down from 3 days' },
  },
  {
    title: 'Weekly Reporting',
    client: { name: 'Forge Fitness', initials: 'FF', logo: '/clients/forge-fitness.png' },
    body: 'Pulled numbers from the booking, payment and membership systems into one plain-English summary every Monday, so nobody had to build the report by hand.',
    flow: ['Collect', 'Summarise', 'Send'],
    result: { metric: '5 hrs', label: 'Saved every week' },
  },
]

type Campaign = {
  src: string
  alt: string
  title: string
  client: string
  width: number
  height: number
  result: Result
}

/**
 * Campaign creative, served from `public/work/` (originals in
 * `assets-src/work/`). Shown at 4:5, the feed-ad ratio, so a source at another
 * ratio is cropped to its centre.
 */
const CAMPAIGNS: Campaign[] = [
  {
    src: '/work/olenphogy.jpg',
    alt: 'Social ad for Olenphogy Magnesium-8 Pro: a hand holding the bottle above a five-star review, “I woke up feeling actually rested.”',
    title: 'Social Ad',
    client: 'Olenphogy',
    width: 900,
    height: 1125,
    result: { metric: '3.1×', label: 'Return on ad spend' },
  },
  {
    src: '/work/issue-08.jpg',
    alt: 'Street poster headlined “Can AI see patients as people?”, with a patient’s vitals overlaid on his portrait.',
    title: 'Editorial Poster',
    client: 'Issue 08',
    width: 736,
    height: 920,
    result: { metric: '+42%', label: 'Event registrations' },
  },
  {
    src: '/work/sle-transit.jpg',
    alt: 'Subway-car poster for SLÉ reading “A brighter future starts with the way we move”, over a motion-blurred cyclist.',
    title: 'Transit Poster',
    client: 'SLÉ',
    width: 900,
    height: 1107,
    result: { metric: '+35%', label: 'App downloads in campaign weeks' },
  },
]

type Slide =
  | { kind: 'system'; key: string; item: Example }
  | { kind: 'campaign'; key: string; item: Campaign }

/**
 * "All" interleaves the two, so the first swipe already shows that the work
 * spans systems *and* creative — the section's whole point.
 */
const ALL_SLIDES: Slide[] = (() => {
  const out: Slide[] = []
  for (let i = 0; i < Math.max(SYSTEMS.length, CAMPAIGNS.length); i++) {
    if (SYSTEMS[i]) out.push({ kind: 'system', key: SYSTEMS[i].title, item: SYSTEMS[i] })
    if (CAMPAIGNS[i]) out.push({ kind: 'campaign', key: CAMPAIGNS[i].src, item: CAMPAIGNS[i] })
  }
  return out
})()

const FILTERS = [
  { label: 'All', kind: null },
  { label: 'Systems', kind: 'system' },
  { label: 'Campaigns', kind: 'campaign' },
] as const

type Filter = (typeof FILTERS)[number]['label']

/**
 * A real logo where there is one, the monogram where there isn't.
 *
 * Logos sit on a white chip because the cards are near-black and most brand
 * artwork is dark-on-transparent — it would otherwise vanish. `onError` falls
 * back to the monogram, so a path pointing at a file that isn't there yet shows
 * the placeholder instead of a broken image.
 */
function ClientMark({ name, initials, logo }: Example['client']) {
  const [failed, setFailed] = useState(false)

  if (logo && !failed) {
    return (
      <img
        src={logo}
        alt={name}
        onError={() => setFailed(true)}
        loading="lazy"
        draggable={false}
        /* White silhouettes on transparency, so they sit straight on the card
          like the tool marks in Capabilities — no white chip breaking the
          surface. Held back to 70% and brought up with the card on hover. */
        className="max-h-7 w-auto max-w-[8.5rem] object-contain opacity-80 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none sm:max-h-8 sm:max-w-[10rem]"
      />
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center border border-white/20 text-xs font-semibold uppercase text-white/70 transition-colors duration-500 group-hover:border-white/40 group-hover:text-white motion-reduce:transition-none">
        {initials}
      </span>
      <span className={`${TYPE.label} text-white/60 transition-colors duration-500 group-hover:text-white/80 motion-reduce:transition-none`}>
        {name}
      </span>
    </div>
  )
}

/**
 * One slide frame for both kinds of work: a 4:5 panel with a caption row under
 * it in the Flow chips' type — kind on the left, client on the right — so a
 * system card and an ad read as the same showcase.
 *
 * `aspect-ratio` only sets a minimum here: a system card whose copy runs longer
 * than 4:5 at a narrow width grows rather than clipping, and the track
 * stretches every panel to match it (the images crop to fill).
 */
function SlideFrame({ slide }: { slide: Slide }) {
  // The ad carries its own copy, so a campaign's title lives down here rather
  // than over the artwork.
  const kind = slide.kind === 'system' ? 'System' : `Campaign · ${slide.item.title}`
  const client = slide.kind === 'system' ? slide.item.client.name : slide.item.client

  return (
    <figure className="group flex w-[80%] shrink-0 snap-start flex-col sm:w-[46%] lg:w-[34%] xl:w-[30%]">
      {/* One frame per card, media and result together, so neighbouring cards
        never read as a pair. */}
      <div className="flex flex-1 flex-col border border-white/20 bg-[#0A0A0A] transition-colors duration-500 group-hover:border-white/35">
      {slide.kind === 'system' ? (
        <div className={`flex aspect-[4/5] flex-1 flex-col ${CELL_PAD}`}>
          <ClientMark {...slide.item.client} />

          <h3 className={`mt-6 ${TYPE.title} text-white`}>
            {slide.item.title}
          </h3>

          <p className={`mt-4 ${TYPE.body} text-white/60`}>
            {slide.item.body}
          </p>

          <div className="mt-auto hidden pt-8 sm:block">
            <Flow steps={slide.item.flow} light />
          </div>
        </div>
      ) : (
        <div className="relative aspect-[4/5] flex-1 overflow-hidden bg-white/5">
          <img
            src={slide.item.src}
            alt={slide.item.alt}
            width={slide.item.width}
            height={slide.item.height}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 size-full select-none object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </div>
      )}

        <div className="mt-auto border-t border-white/20 px-6 py-5 sm:px-8 sm:py-6">
          <p className="text-3xl font-semibold tabular-nums leading-none tracking-tight text-white sm:text-4xl">
            {slide.item.result.metric}
          </p>
          <p className={`mt-2 ${TYPE.label} text-white/60`}>
            {slide.item.result.label}
          </p>
        </div>
      </div>

      <figcaption className={`mt-3 flex items-center justify-between gap-4 ${TYPE.label}`}>
        <span className="text-black">{kind}</span>
        <span className="truncate text-black/60">{client}</span>
      </figcaption>
    </figure>
  )
}

export default function Examples() {
  const track = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<Filter>('All')
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const kind = FILTERS.find((f) => f.label === filter)?.kind
  const slides = kind ? ALL_SLIDES.filter((s) => s.kind === kind) : ALL_SLIDES

  // Arrow state follows the track. Re-run on filter change: the track rewinds
  // and its width changes.
  useEffect(() => {
    const el = track.current
    if (!el) return

    el.scrollLeft = 0
    const update = () => {
      // 1px of slack: fractional widths can leave scrollLeft a hair short.
      setAtStart(el.scrollLeft <= 1)
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [filter])

  /*
   * Mouse drag on desktop. Touch and trackpads already scroll natively; a
   * mouse can't, so dragging moves the track directly with snapping off, then
   * glides to the nearest slide and hands snapping back. A drag that moved
   * swallows the click that ends it, so releasing over a card does nothing.
   */
  useEffect(() => {
    const el = track.current
    if (!el) return

    let startX = 0
    let startLeft = 0
    let dragging = false
    let moved = false

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      dragging = true
      moved = false
      startX = e.clientX
      startLeft = el.scrollLeft
      el.style.scrollSnapType = 'none'
      el.style.userSelect = 'none'
      el.style.cursor = 'grabbing'
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - startX
      if (Math.abs(dx) > 4) moved = true
      el.scrollLeft = startLeft - dx
    }
    const onUp = () => {
      if (!dragging) return
      dragging = false
      el.style.userSelect = ''
      el.style.cursor = ''
      const slide = el.firstElementChild as HTMLElement | null
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0
      const width = slide ? slide.offsetWidth + gap : 0
      if (width) el.scrollTo({ left: Math.round(el.scrollLeft / width) * width, behavior: 'smooth' })
      window.setTimeout(() => {
        el.style.scrollSnapType = ''
      }, 450)
    }
    const onClick = (e: MouseEvent) => {
      if (!moved) return
      e.preventDefault()
      e.stopPropagation()
      moved = false
    }

    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('click', onClick, true)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      el.removeEventListener('click', onClick, true)
    }
  }, [])

  const step = (direction: 1 | -1) => {
    const el = track.current
    const slide = el?.firstElementChild as HTMLElement | null
    if (!el || !slide) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: direction * (slide.offsetWidth + gap), behavior: 'smooth' })
  }

  const arrow =
    'flex size-10 items-center justify-center rounded-full border border-black/25 text-black transition-opacity duration-300 hover:border-black/60 disabled:pointer-events-none disabled:opacity-30'

  return (
    <Section id="examples" className="relative overflow-hidden bg-[#F3F3F3]">
      <HoloGround />

      <div className="relative">
      <div className="text-center">
        <ClipHeading lines={['What this looks like in practice.']} />

        <Reveal index={1}>
          <Body className="mx-auto mt-6 max-w-xl md:mt-8">
            Campaigns that bring customers in. Systems that convert them and
            bring them back.
          </Body>
        </Reveal>
      </div>

      <Reveal index={2}>
        {/* Controls: filters left, arrows right, on one hairline like the
          hero's proof strip. `#work` is the hero's "See Our Work" target, so
          it lands on the cards rather than the section heading. */}
        <div id="work" className={`${CONTENT_GAP} flex scroll-mt-6 items-center justify-between gap-4 border-t border-black/20 pt-5 md:pt-6`}>
          <div role="group" aria-label="Filter work" className="flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-8">
            {FILTERS.map(({ label }) => (
              <button
                key={label}
                type="button"
                onClick={() => setFilter(label)}
                aria-pressed={filter === label}
                className={`-my-1 py-1 ${TYPE.label} transition-colors duration-300 ${
                  filter === label ? 'text-black' : 'text-black/60 hover:text-black'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Hidden when every slide already fits. */}
          <div className={`flex shrink-0 gap-2 ${atStart && atEnd ? 'invisible' : ''}`}>
            <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous" className={arrow}>
              <ArrowLeft className="size-4" />
            </button>
            <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next" className={arrow}>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Native scroll-snap, so swipe, trackpad and keyboard all work without
          script. Bleeds to the screen edge so the next slide peeks in, which is
          what tells a phone user the row scrolls; `scroll-px` keeps a snapped
          slide aligned with the section's padding rather than the screen edge. */}
        <div
          ref={track}
          role="region"
          aria-label="Our work"
          tabIndex={0}
          className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-8 overflow-x-auto overscroll-x-contain scroll-px-5 md:cursor-grab px-5 sm:-mx-8 sm:mt-8 sm:scroll-px-8 sm:px-8 md:gap-8 md:-mx-12 md:scroll-px-12 md:px-12"
        >
          {slides.map((slide) => (
            <SlideFrame key={slide.key} slide={slide} />
          ))}
        </div>
      </Reveal>
      </div>
    </Section>
  )
}
