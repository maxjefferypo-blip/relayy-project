import { Plus } from 'lucide-react'
import { Body, ClipHeading, Eyebrow, Reveal, Section } from './primitives'

const CONTACT_EMAIL = 'hello@relayy.co.uk'

/**
 * The questions a first call usually starts with. Every answer restates
 * something the page already commits to (existing tools, AI only where it
 * helps, scope and cost agreed up front, the 30-minute chat), so nothing here
 * promises more than the sections above.
 *
 * No FAQPage JSON-LD: Google only shows FAQ rich results for government and
 * health sites now. The answers are plain HTML, which is what search and AI
 * crawlers read.
 */
const FAQS = [
  {
    question: 'Who do you work with?',
    answer:
      'Small and growing businesses across the UK, especially those that rely on enquiries, bookings or repeat customers, like clinics, spas, gyms, venues and hospitality. If leads are coming in and admin is eating your time, we can usually help.',
  },
  {
    question: 'Do we have to change the software we use?',
    answer:
      'Usually not. We work with the tools you already have, like WhatsApp, Gmail, HubSpot, Calendly and Stripe, and connect the gaps between them. If something genuinely needs replacing, we’ll explain why before anything is built.',
  },
  {
    question: 'Do we need to use AI?',
    answer:
      'Not unless it helps. AI is one part of the toolkit, used where it makes a practical difference, like drafting replies or summarising reports. Often the biggest wins come from faster follow-up and simple automation.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'It depends on what you need. Some businesses come to us for a focused project, others for ongoing support. Either way, we agree the scope and cost up front, so there are no surprises.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Tell us about one thing you want to improve, using the form above or by email. We’ll arrange a 30-minute call, with no obligation, to understand how things work today and where the quickest wins are.',
  },
]

/**
 * Native <details>, so it needs no state and the answers ship in the HTML. The
 * shared `name` makes them an exclusive accordion where supported (opening one
 * closes the others); older browsers just let several stay open.
 *
 * White, between Contact's #F2F2F2 and the dark footer, so it still reads as
 * its own section. The list is a hairline stack, the same 1px rules as the
 * grids above.
 */
export default function FAQ() {
  return (
    <Section id="faq" className="bg-white">
      <div className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <div>
          <Eyebrow>FAQ</Eyebrow>

          <ClipHeading lines={['Straight', 'answers.']} className="mt-6 md:mt-8" />

          <Reveal index={1}>
            <Body className="mt-8 max-w-sm md:mt-10">
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
          <div className="border-t border-black/15">
            {FAQS.map(({ question, answer }) => (
              <details key={question} name="faq" className="group border-b border-black/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 transition-opacity hover:opacity-60 sm:py-7 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-sm font-semibold uppercase leading-snug tracking-widest text-black sm:text-base">
                    {question}
                  </h3>
                  <Plus
                    aria-hidden="true"
                    className="size-4 shrink-0 text-black/40 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none sm:size-5"
                  />
                </summary>
                <p className="max-w-[60ch] pb-7 text-sm font-medium leading-relaxed text-black/60 sm:text-base">
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
