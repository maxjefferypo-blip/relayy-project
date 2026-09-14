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
import { LogoMarquee, type Logo } from "@/components/ui/logo-cloud";
import { Body, ClipHeading, Eyebrow, Reveal, Section } from "./primitives";

const SHAPE = "/shape-9.png";

type Capability = {
  title: string;
  body: string;
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
    title: "Lead Conversion",
    body: "Respond faster. Qualify better. Convert more.",
    hue: 0,
    rotate: 0,
    spin: 12,
    pulse: 3.1,
  },
  {
    title: "Follow-Up",
    body: "Keep leads moving without relying on someone remembering.",
    hue: 60,
    rotate: 52,
    spin: 14,
    reverse: true,
    pulse: 4.3,
  },
  {
    title: "Bookings",
    body: "Turn interest into confirmed appointments with less back-and-forth.",
    hue: 125,
    rotate: 143,
    spin: 10,
    pulse: 2.7,
  },
  {
    title: "CRM Automation",
    body: "Keep customer data clean and useful without manual updates.",
    hue: 190,
    rotate: 219,
    spin: 13,
    reverse: true,
    pulse: 3.8,
  },
  {
    title: "Retention",
    body: "Bring customers back before they quietly disappear.",
    hue: 250,
    rotate: 297,
    spin: 11,
    pulse: 4.9,
  },
  {
    title: "Internal Workflows",
    body: "Automate repetitive admin and free your team to focus on higher-value work.",
    hue: 310,
    rotate: 338,
    spin: 15,
    reverse: true,
    pulse: 3.4,
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
        <Eyebrow muted>What We Automate</Eyebrow>

        <ClipHeading
          lines={["The work that shouldn’t", "be manual anymore."]}
          className="mt-6 md:mt-8"
          /* 23 characters: the floor has to stay low or it wraps at 320px */
          size="clamp(1.1875rem, 5.5vw, 5rem)"
          light
        />

        <Reveal index={1}>
          <Body light className="mx-auto mt-8 max-w-xl md:mt-10">
            Relay helps you automate the parts of your business that slow
            growth, waste time or let customers slip through the cracks.
          </Body>
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-px border border-white/15 bg-white/15 sm:mt-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {CAPABILITIES.map(
            ({ title, body, hue, rotate, spin, reverse, pulse }, i) => (
              /* Each cell reveals on its own, so the grid builds rather than
                arriving in one block. */
              <Reveal
                key={title}
                index={i}
                className="group cursor-pointer bg-[#0A0A0A] px-6 py-8 transition-colors duration-500 hover:bg-[#111111] sm:px-7 sm:py-10 md:px-9 md:py-12"
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
                <p className="mt-4 max-w-[34ch] text-sm font-medium leading-relaxed text-white/50 sm:text-base">
                  {body}
                </p>
              </Reveal>
            ),
          )}
      </div>

      <Reveal index={1}>
        <div className="mt-12 flex flex-col items-center gap-7 md:mt-16">
          <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-white/40 sm:text-xs">
            Connects to the tools you already use
          </p>
          {/* Full-bleed on mobile so the marquee runs edge to edge rather than
            starting and stopping inside the section padding. */}
          <LogoMarquee
            logos={WORKS_WITH}
            light
            edge="#0A0A0A"
            className="-mx-5 w-screen max-w-[calc(100%+2.5rem)] sm:-mx-8 sm:max-w-[calc(100%+4rem)] md:mx-0 md:w-full md:max-w-none"
          />
        </div>
      </Reveal>
    </Section>
  );
}
