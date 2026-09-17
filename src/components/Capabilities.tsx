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
import { Body, ClipHeading, Eyebrow, Reveal, Section } from "./primitives";

const SHAPE = "/shape-9.png";

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
    title: "Lead Response",
    outcome: "Reply to new enquiries in seconds, while they’re still interested.",
    detail: "Automatically respond, qualify and route leads before they go cold.",
    hue: 0,
    rotate: 0,
    spin: 12,
    pulse: 3.1,
  },
  {
    title: "Follow-Up",
    outcome:
      "Keep leads moving without relying on someone remembering to chase them.",
    detail:
      "Personalised follow-ups across WhatsApp, SMS and email, triggered at the right time.",
    hue: 60,
    rotate: 52,
    spin: 14,
    reverse: true,
    pulse: 4.3,
  },
  {
    title: "Bookings",
    outcome:
      "Turn interest into confirmed appointments with less back-and-forth.",
    detail:
      "Handle availability, booking, reminders and common questions automatically.",
    hue: 125,
    rotate: 143,
    spin: 10,
    pulse: 2.7,
  },
  {
    title: "Retention",
    outcome: "Bring customers back before they quietly disappear.",
    detail:
      "Spot customers who are due to return, then trigger personalised rebooking and reactivation.",
    hue: 250,
    rotate: 219,
    spin: 13,
    reverse: true,
    pulse: 3.8,
  },
  {
    title: "Admin & Reporting",
    outcome:
      "Take repetitive work off your team so they can focus on higher-value work.",
    detail:
      "Automate data entry, reporting, document handling and the routine tasks that eat up hours.",
    hue: 190,
    rotate: 297,
    spin: 11,
    pulse: 4.9,
  },
  {
    title: "Connected Business",
    outcome: "Make the tools you already use work together.",
    detail:
      "Connect your CRM, bookings, website, email and other systems so customers and information move smoothly through your business.",
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
        <Eyebrow muted>What We Do</Eyebrow>

        <ClipHeading
          lines={["Find the opportunity.", "Build the system."]}
          className="mt-6 md:mt-8"
          /* 23 characters: the floor has to stay low or it wraps at 320px */
          size="clamp(1.1875rem, 5.5vw, 5rem)"
          light
        />

        <Reveal index={1}>
          <Body light className="mx-auto mt-8 max-w-xl md:mt-10">
            Relay finds where AI and automation can help you make more money,
            save time and work smarter, then builds it for you.
          </Body>
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-px border border-white/15 bg-white/15 sm:mt-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {CAPABILITIES.map(
            ({ title, outcome, detail, hue, rotate, spin, reverse, pulse }, i) => (
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
                <p className="mt-5 max-w-[34ch] text-sm font-semibold leading-snug text-white sm:text-base">
                  {outcome}
                </p>
                <p className="mt-3 max-w-[38ch] text-sm font-medium leading-relaxed text-white/50">
                  {detail}
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
          {/* Wraps rather than scrolling, so every mark is visible at any
            width instead of half the set sitting off-screen. */}
          <LogoRow logos={WORKS_WITH} light className="justify-center" />
        </div>
      </Reveal>
    </Section>
  );
}
