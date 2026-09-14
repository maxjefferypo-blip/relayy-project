import { Reveal } from './primitives'

const CONTACT_EMAIL = 'hello@relayy.co.uk'

/**
 * One page, so the footer carries no section index — the nav already does that,
 * and the contact form sits directly above. Brand, one line of positioning, the
 * email, and the copyright.
 */
export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-20 md:px-12 md:pt-24">
      <div className="border-t border-white/15 pt-14 md:pt-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
          <Reveal>
            <div className="flex items-center gap-3.5">
              {/* dark ground here, so the mark needs no disc behind it */}
              <img
                src="/relay-mark.png"
                alt=""
                aria-hidden="true"
                width={320}
                height={206}
                className="w-9 select-none object-contain"
              />
              <span className="text-sm font-semibold uppercase tracking-widest text-white">
                Relay
              </span>
            </div>

            <p className="mt-6 max-w-md text-sm font-medium leading-relaxed text-white/50">
              Relay helps businesses grow and operate better by using AI and automation where it
              actually makes commercial sense — getting more from the customers, people and
              systems they already have.
            </p>
          </Reveal>

          <Reveal index={1} className="md:text-right">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white">
              Get In Touch
            </h2>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="-mb-1 mt-4 inline-block py-1 text-sm font-medium text-white/50 transition-colors duration-300 hover:text-white sm:text-base"
            >
              {CONTACT_EMAIL}
            </a>
          </Reveal>
        </div>

        <Reveal index={2}>
          <p className="mt-16 text-center text-[10px] font-semibold uppercase tracking-widest text-white/40 sm:mt-20 sm:text-xs">
            © {new Date().getFullYear()} Relay · AI that makes business better
          </p>
        </Reveal>
      </div>
    </footer>
  )
}
