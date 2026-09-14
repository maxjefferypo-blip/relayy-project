import { useState } from 'react'
import { Check } from 'lucide-react'
import { Body, ClipHeading, Eyebrow, Flow, Reveal, Section } from './primitives'

const ACCENT = '#5E0ED7'
const SHAPE = '/shape-9.png'

/**
 * The hero states "find the opportunity, build the system, measure the impact";
 * this section is where it earns it. One step is active at a time — steps before
 * it read as done, steps after it as pending — with the companion panel showing
 * what that step actually produces.
 */
const STEPS = [
  {
    number: '01',
    title: 'Find The Opportunity',
    body: 'We look at where your business actually loses time, customers or money — before anyone talks about tools.',
    /** Hue shift on the shared mark, as in the capability grid. */
    hue: 0,
    output: 'What you get',
    detail: 'A short list of the places worth fixing first, ranked by what they cost you now.',
    flow: ['Audit', 'Map', 'Prioritise'],
  },
  {
    number: '02',
    title: 'Build The System',
    body: 'Automation, AI or both, built around how your business already works and the software you already pay for.',
    hue: 190,
    output: 'What you get',
    detail: 'A working system in your own stack, not a demo — connected, tested and handed over.',
    flow: ['Connect', 'Automate', 'Test'],
  },
  {
    number: '03',
    title: 'Measure The Impact',
    body: 'Faster responses, more bookings, fewer hours on admin. If it doesn’t move a number that matters, it isn’t finished.',
    hue: 280,
    output: 'What you get',
    detail: 'The before and after on the number you cared about, so you can see whether it worked.',
    flow: ['Baseline', 'Track', 'Report'],
  },
]

export default function Process() {
  const [active, setActive] = useState(0)
  const step = STEPS[active]

  return (
    <Section id="process" className="bg-white">
      <div className="md:max-w-2xl">
        <Eyebrow>How It Works</Eyebrow>

        <ClipHeading
          lines={['Three steps.', 'No mystery.']}
          className="mt-6 md:mt-8"
          size="clamp(1.75rem, 5vw, 4.5rem)"
        />

        <Reveal index={1}>
          <Body className="mt-8 max-w-lg">
            No long discovery phase. We find where the opportunity is, build the
            system around it, and show you what changed.
          </Body>
        </Reveal>
      </div>

      <Reveal index={2}>
        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-2 lg:gap-16">
          {/* Steps */}
          <ol className="flex flex-col">
            {STEPS.map(({ number, title, body }, i) => {
              const isActive = i === active
              const isDone = i < active

              return (
                <li key={number} className="relative">
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-5 top-11 w-px -translate-x-1/2 bg-black/15"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={isActive ? 'step' : undefined}
                    className="flex w-full gap-5 pb-7 text-left last:pb-0 sm:gap-6 sm:pb-9"
                  >
                    <span
                      className={`relative z-10 flex size-10 shrink-0 items-center justify-center border text-[11px] font-semibold uppercase tracking-widest transition-colors duration-500 motion-reduce:transition-none ${
                        isActive
                          ? 'border-black bg-black text-white'
                          : 'border-black/15 bg-white text-black/40'
                      }`}
                    >
                      {isDone ? <Check className="size-4" strokeWidth={2.5} /> : number}
                    </span>

                    <span
                      className={`block min-w-0 pt-1 transition-opacity duration-500 motion-reduce:transition-none ${
                        isActive ? 'opacity-100' : 'opacity-35'
                      }`}
                    >
                      <span className="block text-sm font-semibold uppercase tracking-widest text-black sm:text-base">
                        {title}
                      </span>
                      {/* On mobile only the active step keeps its body — three
                        at once is a wall of text on a narrow screen. */}
                      <span
                        className={`mt-3 max-w-[52ch] text-sm font-medium leading-relaxed text-black/60 sm:mt-3 sm:block sm:text-base ${
                          isActive ? 'block' : 'hidden'
                        }`}
                      >
                        {body}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          {/* Companion panel — what the active step produces */}
          <div className="relative flex min-h-[20rem] flex-col justify-between border border-black/15 bg-[#F7F7F7] p-8 sm:p-10 lg:min-h-[24rem]">
            <img
              key={step.number}
              src={SHAPE}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={256}
              height={256}
              className="shape-spin size-16 self-end object-contain sm:size-20"
              style={{ filter: `hue-rotate(${step.hue}deg)`, animationDuration: '18s' }}
            />

            <div>
              <p
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: ACCENT }}
              >
                {step.output}
              </p>
              <p className="mt-4 max-w-sm text-base font-medium leading-relaxed text-black sm:text-lg">
                {step.detail}
              </p>
              <div className="mt-8">
                <Flow steps={step.flow} />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
