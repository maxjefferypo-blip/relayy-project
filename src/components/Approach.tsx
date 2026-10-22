import { ORB_POSTER, ORB_VIDEO_SMALL } from '@/lib/media'
import { LoopVideo } from '@/components/ui/loop-video'
import { Body, ClipHeading, Eyebrow, Reveal, Section } from './primitives'

/** Diagnosis first, then delivery, then measurement — one person throughout. */
const PRINCIPLES = [
  {
    lead: 'Diagnose',
    rest: 'the real problem.',
    body: '“Plenty of people visit our website, but hardly anyone books.” Tell us what’s getting in the way. You don’t need to know the solution. Working out where it goes wrong is our job.',
  },
  {
    lead: 'Build',
    rest: 'the fix.',
    body: 'We choose what the problem actually needs and deliver it, whether that’s a website, a campaign, a customer journey or an automation. Creative, marketing and AI are tools, not the pitch.',
  },
  {
    lead: 'Improve',
    rest: 'what’s working.',
    body: 'Every piece of work has a defined scope and a measurable goal, agreed before we start. We track the number that matters and keep improving it.',
  },
]

/**
 * The hero orb again, small. Same frames at a lighter encode, and the same
 * poster, so the section reads as the same family as the hero rather than
 * introducing a second visual idea. It loads nothing until it scrolls in.
 */
function Orb() {
  return (
    <LoopVideo
      src={ORB_VIDEO_SMALL}
      poster={ORB_POSTER}
      preload="none"
      /*
       * The box matches the video's own 3828x2164, so the whole frame is always
       * shown and the orb can never be cropped — it tumbles wider on some
       * frames, and a square crop was cutting it.
       */
      className="aspect-[3828/2164] w-full max-w-[22rem] object-cover sm:max-w-[26rem] md:max-w-[14rem] lg:max-w-[24rem] xl:max-w-[28rem]"
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
        <Eyebrow>Our Approach</Eyebrow>

        <ClipHeading lines={['Diagnose first.', 'Then deliver.']} className="mt-6 md:mt-8" />
      </div>

      <div className="mt-6 md:mt-10 md:flex md:items-start md:justify-between md:gap-10 lg:gap-16">
        <div className="relative z-10 md:max-w-xl">
          <Reveal index={1}>
            <Body className="max-w-xl">
              No big agency team, no unnecessary complexity. You work directly
              with the person who finds the problem and fixes it.
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
          className="pointer-events-none absolute -right-20 top-8 z-0 w-[15rem] sm:-right-16 sm:top-20 sm:w-[21rem] md:static md:-mt-24 md:w-auto md:shrink-0 lg:-mt-32 xl:-mt-40"
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
