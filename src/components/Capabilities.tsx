import {
  siCalendly,
  siClaude,
  siGmail,
  siGooglecalendar,
  siHubspot,
  siMailchimp,
  siN8n,
  siShopify,
  siStripe,
  siWhatsapp,
  siXero,
  siZapier,
} from "simple-icons";
import { LogoRow, type Logo } from "@/components/ui/logo-cloud";
import { Body, ClipHeading, CornerMarks, Eyebrow, Reveal, Section } from "./primitives";

const SHAPE = "/shape-9.webp";

type Capability = {
  title: string;
  /** The result, stated plainly. Carries the weight in the cell. */
  outcome: string;
  /** How it is actually done — the "oh, it can do that" line. */
  detail: string;
  /** Hue shift so one render reads as six distinct marks. */
  hue: number;
  /** Starting angle, kept when motion is reduced. */
  rotate: number;
  /** Seconds per revolution — low enough that the rotation actually reads. */
  spin: number;
  reverse?: boolean;
  /** Seconds per pulse — deliberately out of step with `spin`. */
  pulse: number;
};

const CAPABILITIES: Capability[] = [
  {
    title: "Get seen",
    outcome: "More of the right people finding you.",
    detail: "Brand visibility, social campaigns, ads and content.",
    hue: 0,
    rotate: 0,
    spin: 12,
    pulse: 3.1,
  },
  {
    title: "Win more customers",
    outcome: "More leads, enquiries, bookings and sales.",
    detail: "Websites, landing pages, lead magnets and booking journeys.",
    hue: 60,
    rotate: 143,
    spin: 10,
    pulse: 2.7,
  },
  {
    title: "Keep more customers",
    outcome: "More repeat business, for longer.",
    detail: "Customer journeys, lifecycle emails, loyalty and reactivation.",
    hue: 120,
    rotate: 72,
    spin: 11,
    reverse: true,
    pulse: 3.4,
  },
  {
    title: "Make more from what you've got",
    outcome: "More revenue per customer, less wasted spend.",
    detail: "Funnels, offers, pricing tests and upselling.",
    hue: 180,
    rotate: 219,
    spin: 13,
    reverse: true,
    pulse: 3.8,
  },
  {
    title: "Get time back",
    outcome: "Less admin, faster execution.",
    detail: "AI workflows, CRM automation, templates and process fixes.",
    hue: 240,
    rotate: 301,
    spin: 12,
    pulse: 2.9,
  },
  {
    title: "Know what's working",
    outcome: "Clear numbers and better decisions.",
    detail: "Reporting, tracking and regular growth reviews.",
    hue: 300,
    rotate: 36,
    spin: 10,
    reverse: true,
    pulse: 3.3,
  },
];

/**
 * Tools these systems plug into — integration targets, not partners or clients.
 * The line above them says so; bare marks under a headline read as endorsement.
 */
const WORKS_WITH: Logo[] = [
  { alt: "WhatsApp", path: siWhatsapp.path },
  { alt: "Gmail", path: siGmail.path },
  { alt: "HubSpot", path: siHubspot.path },
  { alt: "Google Calendar", path: siGooglecalendar.path },
  { alt: "Calendly", path: siCalendly.path },
  { alt: "Stripe", path: siStripe.path },
  { alt: "Xero", path: siXero.path },
  { alt: "Mailchimp", path: siMailchimp.path },
  { alt: "Shopify", path: siShopify.path },
  { alt: "Zapier", path: siZapier.path },
  { alt: "n8n", path: siN8n.path },
  { alt: "Claude", path: siClaude.path },
];

export default function Capabilities() {
  return (
    <Section id="capabilities" className="bg-[#0A0A0A]">
      <div className="text-center">
        <Eyebrow muted>What We Solve</Eyebrow>

        <ClipHeading lines={["Your problem.", "Our job."]} className="mt-6 md:mt-8" light />

        <Reveal index={1}>
          <Body light className="mx-auto mt-8 max-w-xl md:mt-10">
            You know what’s holding you back. We work out the right fix and
            make it happen.
          </Body>
        </Reveal>
      </div>

      {/* Boxed like the Contact panel: hairline frame, crosshair corners. */}
      <div className="relative mt-10 sm:mt-14 md:mt-20">
        <CornerMarks light />

        <div className="grid grid-cols-1 gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map(
            ({ title, outcome, detail, hue, rotate, spin, reverse, pulse }, i) => (
              /* Each cell reveals on its own, so the grid builds rather than
                arriving in one block. */
              <Reveal
                key={title}
                index={i}
                className="group cursor-pointer bg-[#0A0A0A] px-6 py-8 transition-colors duration-500 hover:bg-[#111111] sm:px-7 sm:py-9 md:px-8 md:py-10"
              >
                <div className="flex items-center gap-3">
                  {/* rotation on the wrapper, scale on the image, so the spin
                    animation and the hover transition don't fight over transform */}
                  <span
                    className="shape-spin block shrink-0"
                    style={
                      {
                        "--shape-rotate": `${rotate}deg`,
                        animationDuration: `${spin}s`,
                        animationDelay: `-${(rotate / 360) * spin}s`,
                        animationDirection: reverse ? "reverse" : "normal",
                      } as React.CSSProperties
                    }
                  >
                    <span
                      className="shape-pulse block"
                      style={{
                        animationDuration: `${pulse}s`,
                        animationDelay: `-${(i * 0.9).toFixed(2)}s`,
                      }}
                    >
                      <img
                        src={SHAPE}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        width={256}
                        height={256}
                        className="size-9 select-none object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 md:size-10"
                        style={{ filter: `hue-rotate(${hue}deg)` }}
                      />
                    </span>
                  </span>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white sm:text-sm">
                    {title}
                  </h3>
                </div>
                <p className="mt-5 max-w-[34ch] text-sm font-semibold leading-snug text-white sm:text-base">
                  {outcome}
                </p>
                <p className="mt-3 max-w-[38ch] text-sm font-medium leading-relaxed text-white/50 sm:text-base">
                  {detail}
                </p>
              </Reveal>
            ),
          )}
        </div>
      </div>

      <Reveal index={1}>
        <div className="mt-12 flex flex-col items-center gap-7 md:mt-16">
          <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-white/40 sm:text-xs">
            Connects to the tools you already use
          </p>
          {/* Wraps rather than scrolling, so every mark is visible at any
            width instead of half the set sitting off-screen. */}
          <LogoRow logos={WORKS_WITH} light className="justify-center" />
        </div>
      </Reveal>
    </Section>
  );
}
