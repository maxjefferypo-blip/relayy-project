import { Plus } from 'lucide-react'
import { HoloGround } from '@/components/ui/holo-ground'
import { Body, ClipHeading, Reveal, Section, TYPE } from './primitives'

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
      'Relay is a fractional growth partner. I help businesses get more customers, convert more of the interest they already have and bring people back. I find the biggest lever, run experiments across ads, websites, email, SMS and even physical letters, and measure what works.',
  },
  {
    question: 'Who will we actually work with?',
    answer:
      'Me, Max. No account managers or handoffs: the person who diagnoses the problem is the person doing the work. For highly specialised jobs I bring in trusted collaborators, and I’ll tell you when I do.',
  },
  {
    question: 'Who do you work with?',
    answer:
      'Businesses where customers book, visit and come back: wellness and recovery clinics, gyms, spas, aesthetics and hospitality. Usually established, with real customers, but nobody in-house who owns growth.',
  },
  {
    question: 'How is this different from an agency?',
    answer:
      'You get a hands-on growth function, not a list of deliverables. I focus on one growth problem at a time, test it properly and judge it on your numbers, without the overhead of a bigger team.',
  },
  {
    question: 'Do we need new software or AI?',
    answer:
      'Usually not. I’m tool-agnostic: I build around what you already use, from WhatsApp and Gmail to HubSpot, Calendly or Stripe, and bring in AI or new tools only where they earn their place. If something really needs replacing, I’ll explain why first.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Most clients start with a Growth Sprint: two to four weeks to find one opportunity, launch one or two experiments and measure early results. If it works, we carry on monthly with a defined scope. The price is agreed before we start.',
  },
  {
    question: 'What happens on the first call?',
    answer:
      'It’s 30 minutes with me, with no obligation. You tell me what’s getting in the way. I’ll tell you where I’d look first, and whether I’m the right person to help.',
  },
]

/**
 * Native <details>, so it needs no state and the answers ship in the HTML. The
 * shared `name` makes them an exclusive accordion where supported (opening one
 * closes the others); older browsers just let several stay open.
 *
 * Dark, after Contact's light panel, so the page keeps alternating; the
 * footer below it is separated by a hairline. Solid hairlines top and bottom, faint dotted rules between
 * questions, so the stack reads as one piece rather than six. No crosshairs
 * like Contact's panel: they would read as a second set of expand icons.
 */
export default function FAQ() {
  return (
    <Section id="faq" className="relative overflow-hidden bg-[#0A0A0A]">
      <HoloGround dark />

      <div className="relative">
      <ClipHeading lines={['Straight answers.']} light />

      <div className="mt-6 md:mt-8 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <div>

          <Reveal index={1}>
            <Body light className="max-w-sm">
              Anything else? Ask me at{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="-my-1 inline-block py-1 text-white underline decoration-white/40 underline-offset-4 transition-opacity hover:opacity-60"
              >
                {CONTACT_EMAIL}
              </a>
            </Body>
          </Reveal>
        </div>

        <Reveal index={2} className="mt-8 lg:mt-0">
          <div className="border-y border-white/20">
            {FAQS.map(({ question, answer }) => (
              <details
                key={question}
                name="faq"
                className="group border-t border-dotted border-white/25 first-of-type:border-t-0"
              >
                <summary className="flex cursor-pointer list-none items-baseline gap-4 py-6 sm:gap-6 sm:py-7 [&::-webkit-details-marker]:hidden">
                  <h3 className={`flex-1 ${TYPE.title} text-white transition-opacity duration-300 group-hover:opacity-60 group-open:!opacity-100`}>
                    {question}
                  </h3>
                  <Plus
                    aria-hidden="true"
                    className="size-4 shrink-0 self-center text-white/60 transition-transform duration-300 group-open:rotate-45 group-open:text-white motion-reduce:transition-none sm:size-5"
                  />
                </summary>
                <p className={`max-w-[56ch] pb-7 pr-8 ${TYPE.body} text-white/70`}>
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
      </div>
    </Section>
  )
}
