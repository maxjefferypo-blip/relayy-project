import { useEffect, useRef } from 'react'
import { ORB_VIDEO } from '@/lib/media'
import { Body, ClipHeading, Eyebrow, Reveal, Section } from './primitives'

/**
 * The thesis section. It sits between the capability grid and the examples so
 * that "what we automate" is immediately followed by "how we decide what to
 * automate" — which is the part a generic AI agency can't say.
 */
const PRINCIPLES = [
  {
    lead: 'Automation',
    rest: 'where rules work.',
    body: 'If something happens the same way every time, it probably shouldn’t need someone doing it manually. We automate the repetitive work that costs your team time.',
  },
  {
    lead: 'AI',
    rest: 'where intelligence helps.',
    body: 'When the work needs to understand, respond, personalise or make sense of information, AI can take automation further. We use it where it genuinely adds value.',
  },
  {
    lead: 'People',
    rest: 'where judgement matters.',
    body: 'Some things are better handled by people. We automate the work around your team, so they have more time for the conversations, decisions and relationships that matter.',
  },
]

/**
 * The hero orb again, cropped square and small. Same asset, so it costs nothing
 * extra to load and the section reads as the same family as the hero rather
 * than introducing a second visual idea.
 *
 * Decoding video off-screen is wasted work that browsers only sometimes
 * throttle, so it is paused unless it is actually on screen.
 */
function Orb() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={ORB_VIDEO}
      aria-hidden="true"
      muted
      loop
      playsInline
      preload="metadata"
      /*
       * The box matches the video's own 3828x2164, so the whole frame is always
       * shown and the orb can never be cropped — it tumbles wider on some
       * frames, and a square crop was cutting it.
       */
      className="aspect-[3828/2164] w-full max-w-[22rem] select-none object-cover sm:max-w-[26rem] md:max-w-[20rem] lg:max-w-[24rem] xl:max-w-[28rem]"
      style={{
        /*
         * The video's ground is #f2f2f0-#f3f3f3 (compression), so no flat
         * section colour matches it exactly and the frame edge would always
         * show as a faint box. Fading the edges out removes the box. The circle
         * is centred on the orb, which sits at 28% of the frame.
         */
        WebkitMaskImage:
          'radial-gradient(circle closest-side at 28% 50%, #000 74%, transparent 100%)',
        maskImage: 'radial-gradient(circle closest-side at 28% 50%, #000 74%, transparent 100%)',
      }}
    />
  )
}

export default function Approach() {
  return (
    <Section id="approach" className="relative overflow-hidden bg-[#F3F3F3]">
      {/* The heading takes a full-width row: sharing one with the orb squeezed
        it until it wrapped inside its own clip wrapper. */}
      <div className="relative z-10">
        <Eyebrow>How We Think</Eyebrow>

        <ClipHeading
          lines={['Not everything', 'needs AI.']}
          className="mt-6 md:mt-8"
          size="clamp(1.5rem, 5vw, 4.5rem)"
        />
      </div>

      <div className="mt-6 md:mt-10 md:flex md:items-start md:justify-between md:gap-10 lg:gap-16">
        <div className="relative z-10 md:max-w-xl">
          <Reveal index={1}>
            <Body className="max-w-md">
              Sometimes a simple automation is enough. Sometimes AI can
              understand, respond or decide in ways automation can’t. Knowing
              which one you need is our job.
            </Body>
          </Reveal>
        </div>

        {/* Section ground matches the hero video's own (#F3F3F3) and the orb is
          edge-masked, so it floats rather than sitting in a box.

          On mobile it is taken out of flow entirely and bled off the right
          edge: its own band cost 238px, a quarter of the section, for a purely
          decorative element. Overlapping the copy is fine here — the hero does
          the same thing, and black type over the orb's pastels stays legible.
          From `md` it returns to the flow beside the body copy, pulled up by a
          negative margin into the empty right-hand side of the heading row —
          left in place it stood 308px tall next to 84px of copy and left ~280px
          of dead space below. */}
        <Reveal
          index={2}
          className="pointer-events-none absolute -right-24 -top-2 z-0 w-[17rem] sm:-right-16 sm:w-[21rem] md:static md:-mt-24 md:w-auto md:shrink-0 lg:-mt-32 xl:-mt-40"
        >
          <Orb />
        </Reveal>
      </div>

      <Reveal index={3} className="relative z-10">
        <div className="mt-8 grid gap-px border border-black/15 bg-black/15 sm:mt-12 md:mt-14 lg:grid-cols-3">
          {PRINCIPLES.map(({ lead, rest, body }) => (
            <div key={lead} className="bg-[#F3F3F3] px-6 py-8 sm:px-7 sm:py-10 md:px-9 md:py-12">
              <p className="text-sm font-semibold uppercase leading-snug tracking-widest text-black sm:text-base">
                {lead}
                <span className="text-black/40"> {rest}</span>
              </p>
              <p className="mt-5 max-w-[36ch] text-sm font-medium leading-relaxed text-black/60 sm:text-base">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
