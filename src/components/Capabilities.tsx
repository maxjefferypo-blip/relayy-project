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
import { ArrowUpRight } from "lucide-react";
import { HoloGround } from "@/components/ui/holo-ground";
import { LogoRow, type Logo } from "@/components/ui/logo-cloud";
import { selectFocus, type FocusKey } from "@/lib/focus";
import {
  ACCENT_ON_DARK,
  Body,
  CELL_PAD,
  CONTENT_GAP,
  ClipHeading,
  CornerMarks,
  Reveal,
  Section,
  TYPE,
} from "./primitives";

const SHAPE = "/shape-9.webp";

type Capability = {
  /** Pre-selects this outcome in the Contact form when the card is chosen. */
  focus: FocusKey;
  title: string;
  /** The result, stated plainly, in one line. The card's only copy. */
  outcome: string;
  /** Hue shift so one render reads as three distinct marks. */
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
    focus: "acquire",
    title: "Get more customers",
    outcome: "Find new audiences and turn interest into first bookings.",
    hue: 0,
    rotate: 0,
    spin: 12,
    pulse: 3.1,
  },
  {
    focus: "convert",
    title: "Convert more interest",
    outcome: "Stop paying for attention that never books.",
    hue: 125,
    rotate: 143,
    spin: 10,
    pulse: 2.7,
  },
  {
    focus: "retain",
    title: "Bring customers back",
    outcome: "Turn first visits into habits and regulars.",
    hue: 250,
    rotate: 219,
    spin: 13,
    reverse: true,
    pulse: 3.8,
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
    <Section id="capabilities" className="relative overflow-hidden bg-[#0A0A0A]">
      <HoloGround dark />

      <div className="relative">
      <div className="text-center">
        <ClipHeading lines={["Pick your focus. I’ll own it."]} light />

        <Reveal index={1}>
          <Body light className="mx-auto mt-6 max-w-xl md:mt-8">
            What are you trying to achieve? Tell me where growth is stuck.
            I’ll work out which levers to test, run them and measure what
            moves.
          </Body>
        </Reveal>
      </div>

      {/* Boxed like the Contact panel: hairline frame, crosshair corners. */}
      <div className={`relative ${CONTENT_GAP}`}>
        <CornerMarks light />

        <div className="grid grid-cols-1 gap-px border border-white/15 bg-white/15 lg:grid-cols-3">
          {CAPABILITIES.map(
            ({ focus, title, outcome, hue, rotate, spin, reverse, pulse }, i) => (
              /* Each cell reveals on its own, so the grid builds rather than
                arriving in one block. */
              <Reveal
                key={title}
                index={i}
                className={`group flex flex-col bg-[#0A0A0A] transition-colors duration-500 hover:bg-[#111111] ${CELL_PAD}`}
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
                  <h3 className={`${TYPE.title} text-white`}>
                    {title}
                  </h3>
                </div>
                <p className={`mt-4 max-w-[34ch] text-pretty ${TYPE.body} text-white/70`}>
                  {outcome}
                </p>
                {/* The href scrolls; the click pre-selects this focus in the form. */}
                <a
                  href="#contact"
                  onClick={() => selectFocus(focus)}
                  className={`-my-1 mt-auto flex items-center gap-1.5 self-start py-1 pt-6 ${TYPE.action} transition-opacity duration-300 hover:opacity-70`}
                  style={{ color: ACCENT_ON_DARK }}
                >
                  This is my focus
                  <ArrowUpRight className="size-4 shrink-0" />
                </a>
              </Reveal>
            ),
          )}
        </div>
      </div>

      <Reveal index={1}>
        <div className={`${CONTENT_GAP} flex flex-col items-center gap-6`}>
          <p className={`text-balance text-center ${TYPE.label} text-white/60`}>
            Tool-agnostic. I work with what you already use
          </p>
          {/* Wraps rather than scrolling, so every mark is visible at any
            width instead of half the set sitting off-screen. */}
          <LogoRow logos={WORKS_WITH} light className="justify-center" />
        </div>
      </Reveal>
      </div>
    </Section>
  );
}
