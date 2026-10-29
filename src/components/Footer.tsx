import { ORB_POSTER, ORB_VIDEO } from '@/lib/media'
import { LoopVideo } from '@/components/ui/loop-video'
import { ACCENT_ON_DARK, CELL_PAD, Reveal, TYPE } from './primitives'

const CONTACT_EMAIL = 'hello@relayy.co.uk'

/**
 * Built from the same parts as the sections above it: the hairline grid of
 * Capabilities and Examples, an eyebrow label on every cell, and the accent
 * tint that `Flow` and the hero CTA use. The oversized wordmark underneath
 * echoes the hero's big uppercase type and closes the page on the brand rather
 * than on a copyright line.
 *
 * The index carries `#approach` as well as the three nav links — the nav is
 * kept short deliberately, but a footer is where a full index belongs.
 */
const INDEX = [
  { label: 'Your Focus', href: '#capabilities' },
  { label: 'Examples', href: '#examples' },
  { label: 'How I Work', href: '#approach' },
  { label: 'Contact', href: '#contact' },
  { label: 'FAQ', href: '#faq' },
]

const CELL = `bg-[#0A0A0A] ${CELL_PAD}`
const CELL_LABEL = `${TYPE.label} text-white/60`

export default function Footer() {
  return (
    <footer className="border-t border-white/15 bg-[#0A0A0A] px-5 pb-10 pt-16 sm:px-8 sm:pb-12 sm:pt-20 md:px-12 md:pt-24">
      {/* Same hairline construction as the grids above: cells sit on a 1px
        background gap rather than each carrying a border, so shared edges stay
        a single pixel. */}
      <Reveal>
        <div className="grid grid-cols-1 gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          <div className={`${CELL} sm:col-span-2`}>
            <div className="flex items-center gap-3.5">
              {/* dark ground here, so the mark needs no disc behind it */}
              <img
                src="/relay-mark.webp"
                alt=""
                aria-hidden="true"
                width={160}
                height={103}
                className="w-9 select-none object-contain"
              />
              <span className="text-sm font-semibold uppercase tracking-widest text-white">
                Relay
              </span>
            </div>

            <p className={`mt-6 max-w-md ${TYPE.body} text-white/60`}>
              Relay is a founder-led, fractional growth partner. I help
              businesses get more customers, convert more interest and bring
              people back, without the agency overhead.
            </p>
          </div>

          <nav className={CELL} aria-label="Footer">
            <h2 className={CELL_LABEL}>Index</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {INDEX.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`-my-1 inline-block py-1 ${TYPE.body} text-white/60 transition-colors duration-300 hover:text-white`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={CELL}>
            <h2 className={CELL_LABEL}>Get In Touch</h2>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="-my-1 mt-6 inline-block break-all py-1 text-sm font-medium transition-opacity duration-300 hover:opacity-70 sm:text-base"
              style={{ color: ACCENT_ON_DARK }}
            >
              {CONTACT_EMAIL}
            </a>
            <p className={`mt-6 ${TYPE.body} text-white/60`}>United Kingdom</p>
          </div>
        </div>
      </Reveal>

      {/* Decorative: the brand is named in the first cell and again in the
        copyright, so this is hidden rather than read out a third time. The
        clamp is sized off the five caps (~3.1em all told) so the word fills the
        measure without ever overrunning it.

        The letters are filled with the hero orb, playing. Inside the block,
        white-on-black text multiplies over the video: the letters pass it
        through and everything else goes to pure black. The block then blends
        with the footer by lighten, so that black lifts to the footer's own
        #0A0A0A and no box shows. The orb's centre (28% across its frame) sits
        on the word's centre, scaled so its rings cross the letters. Same file
        as the hero background, so nothing extra loads. */}
      <Reveal index={1}>
        <div aria-hidden="true" className="relative mt-14 select-none overflow-hidden mix-blend-lighten sm:mt-20">
          <LoopVideo
            src={ORB_VIDEO}
            poster={ORB_POSTER}
            className="absolute left-[5%] top-1/2 w-[160%] max-w-none -translate-y-1/2"
          />
          <p
            className="relative bg-black text-center font-semibold uppercase leading-[0.8] text-white mix-blend-multiply"
            style={{ fontSize: 'clamp(4rem, 25vw, 20rem)' }}
          >
            Relay
          </p>
        </div>
      </Reveal>

      <Reveal index={2}>
        <div className={`mt-10 flex flex-col items-center gap-3 border-t border-white/15 pt-8 ${TYPE.label} text-white/60 sm:mt-12 sm:flex-row sm:justify-between`}>
          {/* Prerendered at build time, so after New Year the HTML says last
            year until the next deploy; the client corrects it silently. */}
          <p suppressHydrationWarning>© {new Date().getFullYear()} Relay</p>
          <p>Acquire. Convert. Retain.</p>
        </div>
      </Reveal>
    </footer>
  )
}
