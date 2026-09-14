import {
  siGooglecalendar,
  siHubspot,
  siCalendly,
  siMailchimp,
  siMeta,
  siStripe,
  siWhatsapp,
  siZapier,
} from 'simple-icons'
import { LogoCloud, type Logo } from '@/components/ui/logo-cloud'
import { Body, ClipHeading, Eyebrow, Reveal, Section } from './primitives'

/**
 * Tools Relay connects to — not partners or clients. Marks come from
 * Simple Icons (bundled, not hotlinked) and render monochrome.
 */
const INTEGRATIONS: Logo[] = [
  { alt: 'HubSpot', path: siHubspot.path },
  { alt: 'Calendly', path: siCalendly.path },
  { alt: 'WhatsApp', path: siWhatsapp.path },
  { alt: 'Stripe', path: siStripe.path },
  { alt: 'Google Calendar', path: siGooglecalendar.path },
  { alt: 'Meta', path: siMeta.path },
  { alt: 'Mailchimp', path: siMailchimp.path },
  { alt: 'Zapier', path: siZapier.path },
]

export default function Integrations() {
  return (
    <Section id="integrations" className="bg-[#F1F0EE]">
      <Eyebrow>What We Connect</Eyebrow>

      <ClipHeading
        lines={['Works with what you use.']}
        className="mt-6 md:mt-8"
        /* one long line, so the floor drops further than the section default
           to keep it unwrapped down to 320px */
        size="clamp(1.125rem, 5.5vw, 5rem)"
      />

      <div className="mt-10 max-w-2xl md:mt-12">
        <Reveal index={1}>
          <Body>
            We don’t replace your stack. We connect it — so the work between your systems
            stops being manual.
          </Body>
        </Reveal>
      </div>

      <Reveal index={2}>
        <LogoCloud logos={INTEGRATIONS} className="mt-12 md:mt-16" />
      </Reveal>

      <Reveal index={3}>
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-widest text-black/40 sm:text-xs">
          Using something else? We’ll connect that too.
        </p>
      </Reveal>
    </Section>
  )
}
