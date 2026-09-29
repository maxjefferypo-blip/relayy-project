import { useState } from 'react'
import { ClipHeading, Eyebrow, Flow, Reveal, Section } from './primitives'

type Example = {
  title: string
  body: string
  flow: string[]
  /** Bento span. Two wide cells, then three narrow — 3+3 over 2+2+2. */
  span: string
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
}

const EXAMPLES: Example[] = [
  {
    title: 'Wellness CRM',
    client: { name: 'Northside Spas', initials: 'NS', logo: '/clients/northside-spas.png' },
    body: 'Turned booking data into repeat customers with one CRM that knows who’s new, who’s returning and who’s disappearing, with follow-up and rebooking handled automatically. More repeat visits. Less CRM admin.',
    flow: ['Booking', 'History', 'Follow-Up', 'Rebook'],
    span: 'sm:col-span-2 lg:col-span-3',
  },
  {
    title: 'Football Hospitality',
    // The artwork is The FA's England Football mark; `name` is also the alt
    // text, so keep it in step with whatever the logo actually shows.
    client: { name: 'Matchday Club', initials: 'MC', logo: '/clients/matchday.png' },
    body: 'Turned enquiries into booked hospitality without the two-day wait, connecting availability, quotes and customer communication end to end. More enquiries converted. Less chasing.',
    flow: ['Enquiry', 'Availability', 'Quote', 'Confirm'],
    span: 'sm:col-span-2 lg:col-span-3',
  },
  {
    title: 'Padel Bookings',
    client: { name: 'Baseline', initials: 'BP', logo: '/clients/baseline.png' },
    body: 'Made the customer journey run itself: confirmations, cancellations, enquiries, follow-ups and re-engagement all handled automatically. More bookings. Better utilisation. Less admin.',
    flow: ['Book', 'Confirm', 'Refill', 'Rebook'],
    span: 'lg:col-span-2',
  },
  /*
   * These two deliberately sit outside the booking-and-CRM pattern of the three
   * above: one is language work (drafting in a brand voice, with a human
   * approving), the other is reporting. Both are things AI is genuinely good at
   * rather than aspirational.
   */
  {
    title: 'Review Replies',
    client: { name: 'The Granary', initials: 'TG', logo: '/clients/the-granary.png' },
    body: 'Watched for new reviews, drafted a reply in the venue’s own voice for one-click approval, and routed anything negative to a manager instead of answering it automatically. Better reputation. Minutes, not hours.',
    flow: ['Review', 'Draft', 'Approve', 'Post'],
    span: 'lg:col-span-2',
  },
  {
    title: 'Weekly Reporting',
    client: { name: 'Forge Fitness', initials: 'FF', logo: '/clients/forge-fitness.png' },
    body: 'Pulled numbers from the booking, payment and membership systems into one plain-English summary every Monday, so nobody had to build the report by hand. Clearer numbers. No manual reporting.',
    flow: ['Collect', 'Summarise', 'Send'],
    span: 'sm:col-span-2 lg:col-span-2',
  },
]

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
      <span className="text-[11px] font-semibold uppercase tracking-widest text-white/40 transition-colors duration-500 group-hover:text-white/60 motion-reduce:transition-none">
        {name}
      </span>
    </div>
  )
}

export default function Examples() {
  return (
    <Section id="examples" className="bg-[#0A0A0A]">
      <div className="md:max-w-2xl">
        <Eyebrow muted>Make It Real</Eyebrow>

        {/* 17 characters on the long line, the longest of any section
          heading. Each line is clipped to its own row, so one that wraps is cut
          in half rather than flowing — check it at 320px if it grows. */}
        <ClipHeading
          lines={['What this looks', 'like in practice.']}
          className="mt-6 md:mt-8"
          light
        />
      </div>

      <Reveal index={1}>
        {/* Bento on one hairline: cells sit on a 1px background gap rather than
          each carrying a border, so shared edges stay a single pixel. */}
        <div className="mt-10 grid grid-cols-1 gap-px border border-white/15 bg-white/15 sm:mt-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-6">
          {EXAMPLES.map(({ title, body, flow, span, client }) => (
            <div
              key={title}
              className={`group flex flex-col bg-[#0A0A0A] px-6 py-8 transition-colors duration-500 hover:bg-[#111111] sm:px-7 sm:py-10 md:px-9 md:py-12 ${span}`}
            >
              <ClientMark {...client} />

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-white sm:text-base">
                {title}
              </h3>

              <p className="mt-4 max-w-[46ch] text-sm font-medium leading-relaxed text-white/50 sm:text-base">
                {body}
              </p>

              <div className="mt-8 md:mt-auto md:pt-10">
                <Flow steps={flow} light />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
