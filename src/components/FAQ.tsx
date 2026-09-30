import { Plus } from 'lucide-react'
import { Body, ClipHeading, Eyebrow, Reveal, Section } from './primitives'

const CONTACT_EMAIL = 'hello@relayy.co.uk'

/**
 * The questions a first call usually starts with, answered in the page's own
 * voice: short sentences, plain words, no hedging.
 *
 * Every answer restates something the page already commits to (the kinds of
 * business in Examples, the tools under Capabilities, AI only where it helps,
 * scope and cost agreed up front, the 30-minute chat in Contact). Keep it that
 * way: no prices, timescales or guarantees the rest of the site doesn't make.
 *
 * No FAQPage JSON-LD: Google only shows FAQ rich results for government and
 * health sites now. The answers are plain HTML, which is what search and AI
 * crawlers read.
 */
const FAQS = [
  {
    question: 'What does Relay actually do?',
    answer:
      'We help small businesses get seen, win customers and keep them. That covers social campaigns and ad creative that get attention, the systems that turn it into enquiries and bookings, and running it all month to month. Take the lot, or just the piece you need.',
  },
  {
    question: 'Who do you work with?',
    answer:
      'Small UK businesses that run on enquiries and bookings: spas, gyms, clubs, venues and hospitality. If you want more people finding you, or more of them becoming customers, we’re probably a good fit.',
  },
  {
    question: 'Do we have to change our software?',
    answer:
      'Usually not. We build around what you already use, whether that’s WhatsApp, Gmail, HubSpot, Calendly, Stripe or Xero. If something really does need replacing, we’ll tell you why before we build anything.',
  },
  {
    question: 'Do we need to use AI?',
    answer:
      'No. We use it where it earns its place, like drafting review replies or writing up the weekly numbers. More often the quickest wins are faster replies and follow-up that actually happens.',
  },
  {
    question: 'What does it cost?',
    answer:
      'It depends on the job. Some businesses want one focused project, others want ongoing marketing support. Either way, we agree the scope and cost with you before we start. No surprises.',
  },
  {
    question: 'What happens on the first call?',
    answer:
      'It’s 30 minutes, with no obligation. You tell us how things work today and where they’re going wrong. We’ll tell you what we’d fix first, and whether we’re the right people to do it.',
  },
]

/**
 * Native <details>, so it needs no state and the answers ship in the HTML. The
 * shared `name` makes them an exclusive accordion where supported (opening one
 * closes the others); older browsers just let several stay open.
 *
 * White, between Contact's #F2F2F2 and the dark footer, so it still reads as
 * its own section. Solid hairlines top and bottom, faint dotted rules between
 * questions, so the stack reads as one piece rather than six. No crosshairs
 * like Contact's panel: they would read as a second set of expand icons.
 */
export default function FAQ() {
  return (
    <Section id="faq" className="bg-white">
      <div className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <div>
          <Eyebrow>FAQ</Eyebrow>

          <ClipHeading lines={['Straight', 'answers.']} className="mt-6 md:mt-8" />

          <Reveal index={1}>
            <Body className="mt-6 max-w-sm md:mt-10">
              Anything else? Ask us at{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="-my-1 inline-block py-1 text-black underline decoration-black/30 underline-offset-4 transition-opacity hover:opacity-60"
              >
                {CONTACT_EMAIL}
              </a>
            </Body>
          </Reveal>
        </div>

        <Reveal index={2} className="mt-10 sm:mt-14 lg:mt-0">
          <div className="border-y border-black/15">
            {FAQS.map(({ question, answer }, i) => (
              <details
                key={question}
                name="faq"
                className="group border-t border-dotted border-black/25 first-of-type:border-t-0"
              >
                <summary className="flex cursor-pointer list-none items-baseline gap-4 py-6 sm:gap-6 sm:py-7 [&::-webkit-details-marker]:hidden">
                  {/* Decorative index, in the Flow chips' small caps. */}
                  <span
                    aria-hidden="true"
                    className="w-5 shrink-0 text-[10px] font-semibold tabular-nums tracking-widest text-black/30 sm:text-[11px]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="flex-1 text-sm font-semibold uppercase leading-snug tracking-widest text-black transition-opacity duration-300 group-hover:opacity-60 group-open:!opacity-100 sm:text-base">
                    {question}
                  </h3>
                  <Plus
                    aria-hidden="true"
                    className="size-4 shrink-0 self-center text-black/40 transition-transform duration-300 group-open:rotate-45 group-open:text-black motion-reduce:transition-none sm:size-5"
                  />
                </summary>
                {/* Indented to sit under the question, past the index. */}
                <p className="max-w-[56ch] pb-7 pl-9 pr-8 text-sm font-medium leading-relaxed text-black/60 sm:pl-11 sm:text-base">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
