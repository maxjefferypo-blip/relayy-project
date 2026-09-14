import { useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { ClipHeading, Eyebrow, Reveal, Section } from './primitives'

const CONTACT_EMAIL = 'hello@relayy.co.uk'

/**
 * Form endpoint — set `VITE_FORM_ENDPOINT` in `.env` (see `.env.example`).
 * A form-to-email service such as Formspree is enough; the destination address
 * lives in that service's dashboard, so it never ships in the bundle where it
 * would be scraped. With nothing configured the form falls back to composing a
 * `mailto:`, so an enquiry is never silently dropped.
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error'

const DETAILS = [
  { label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'Based', value: 'United Kingdom' },
  { label: 'Opportunity Session', value: '30 minutes · No obligation' },
]

const FIELDS = [
  { name: 'name', label: 'Your name', placeholder: 'Max Smith', type: 'text', required: true },
  { name: 'business', label: 'Business name', placeholder: 'Your business', type: 'text', required: true },
  { name: 'email', label: 'Work email', placeholder: 'max@yourbusiness.com', type: 'email', required: true },
  { name: 'website', label: 'Website', placeholder: 'yourbusiness.com', type: 'text', required: false },
] as const

const labelClass = 'block text-[10px] font-semibold uppercase tracking-widest text-black/50'
const inputClass =
  'mt-2.5 w-full border border-black/15 bg-white px-4 py-3 text-sm font-medium text-black outline-none transition-colors placeholder:text-black/30 focus:border-black/50 sm:text-base'

/** Hairline crosshair, one per panel corner. */
function CornerMark({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute block size-3 ${className}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/40" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/40" />
    </span>
  )
}

export default function Contact() {
  const [values, setValues] = useState({
    name: '',
    business: '',
    email: '',
    website: '',
    problem: '',
  })
  /** Bait field: hidden from people, filled by bots. */
  const [trap, setTrap] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const subject = `Relay enquiry — ${values.business || values.name}`

  function mailtoFallback() {
    const body = [
      `Name: ${values.name}`,
      `Business: ${values.business}`,
      `Email: ${values.email}`,
      `Website: ${values.website || '—'}`,
      '',
      'What could work better?',
      values.problem,
    ].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Pretend to succeed for bots rather than telling them they were caught.
    if (trap) {
      setStatus('sent')
      return
    }

    if (!ENDPOINT) {
      mailtoFallback()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, _subject: subject }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" className="bg-[#F2F2F2]">
      <Reveal>
        <div className="relative border border-black/15">
          <CornerMark className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
          <CornerMark className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
          <CornerMark className="left-0 bottom-0 -translate-x-1/2 translate-y-1/2" />
          <CornerMark className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />

          <div className="grid lg:grid-cols-2">
            {/* Left — the pitch */}
            <div className="border-b border-black/15 p-6 sm:p-10 lg:border-b-0 lg:border-r lg:p-14">
              <Eyebrow>Have Something In Mind?</Eyebrow>

              <ClipHeading
                lines={['Let’s see if we can', 'make it work better.']}
                className="mt-5 md:mt-6"
                size="clamp(1.125rem, 2.6vw, 2.5rem)"
              />

              <p className="mt-6 max-w-md text-sm font-medium leading-relaxed text-black/60 sm:text-base">
                Tell us what’s taking too much time, costing you customers, or simply not working
                as well as it should.
              </p>

              <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-black/60 sm:text-base">
                We’ll show you where AI or automation could make the biggest difference.
              </p>

              <dl className="mt-10 flex flex-col gap-6 sm:mt-12">
                {DETAILS.map((item) => (
                  <div key={item.label}>
                    <dt className={labelClass}>{item.label}</dt>
                    <dd className="mt-1.5 text-sm font-medium text-black sm:text-base">
                      {item.href ? (
                        <a
                          href={item.href}
                          className="-my-1 inline-block py-1 transition-opacity hover:opacity-60"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right — the form */}
            <div className="p-6 sm:p-10 lg:p-14">
              {status === 'sent' ? (
                <div className="flex h-full min-h-[18rem] flex-col justify-center">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                    Enquiry sent
                  </p>
                  <p className="mt-5 max-w-sm text-lg font-semibold uppercase leading-tight text-black sm:text-xl">
                    Thanks — we’ve got it.
                  </p>
                  <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-black/60 sm:text-base">
                    A real person will read this and get back to you, usually within a working
                    day.
                  </p>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {FIELDS.map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className={labelClass}>
                      {field.label}
                      {field.required && <span className="text-accent"> *</span>}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={values[field.name]}
                      onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="problem" className={labelClass}>
                    What could work better?
                    <span className="text-accent"> *</span>
                  </label>
                  <textarea
                    id="problem"
                    name="problem"
                    required
                    rows={4}
                    placeholder="Tell us about the problem, process or idea you have in mind..."
                    value={values.problem}
                    onChange={(e) => setValues((v) => ({ ...v, problem: e.target.value }))}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Honeypot — off-screen rather than display:none, which some
                  bots skip. Never announced, never tabbed to. */}
                <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
                  <label htmlFor="company">Company (leave blank)</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={trap}
                    onChange={(e) => setTrap(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group mt-2 flex w-full items-center justify-center gap-2 bg-black px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                >
                  {status === 'sending' ? 'Sending…' : 'Let’s talk'}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                {status === 'error' ? (
                  <p role="alert" className="text-[11px] font-medium text-accent">
                    That didn’t send. Please try again, or email us directly at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                ) : (
                  <p className="text-[11px] font-medium italic text-black/40">
                    No sales pitch from a robot. A real person will get back to you.
                  </p>
                )}
              </form>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
