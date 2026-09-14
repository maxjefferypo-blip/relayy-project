# Relay — hero

React + TypeScript + Vite + Tailwind CSS 3.4 + Framer Motion + Lucide.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Structure

- `src/components/Hero.tsx` — background video, nav, mobile menu, and the
  bottom block: CTA, caption + clip-reveal headline, and a proof-point strip.
  The tool logos deliberately live in Capabilities, not here — the hero is one
  message per level and a logo row makes it six.
  One message per level: the h1 is the promise, the caption says who it's for,
  the strip is the payoff. "Find the opportunity. Build the system. Measure the
  impact." is not in the hero — it is the Process section. The middle of the
  hero is deliberately empty so the video reads.
- `src/components/Integrations.tsx` — "Works with what you use."
- `src/components/Capabilities.tsx` — dark 3x2 feature grid. Card marks are one
  render (`public/shape-9.png`) given a per-card `hue-rotate` and rotation, so a
  single file reads as six distinct icons. The 4000x4000 master lives in
  `assets-src/` — outside `public/`, so it never ships. A twelve-mark `LogoRow`
  closes the section under the line "Connects to the tools you already use" —
  the framing matters, see point 7 below. Each mark turns once
  every 10-15s (`spin`); they were 21-35s, which animates but reads as static
  at this size, so don't raise them again. The six cells reveal one after
  another (each is its own `Reveal` with a staggered index) rather than the grid
  arriving as a block. A negative `animation-delay` sets
  each mark's starting angle, and `prefers-reduced-motion` stops both the spin
  and the pulse.
- `src/components/Approach.tsx` — "Not everything needs AI." The thesis section:
  automation where rules work, AI where intelligence helps, people where
  judgement matters. It sits after the capability grid so "what we automate" is
  followed by "how we decide what to automate". Carries the `ShaderField`; the
  three principle cells are `bg-[#F2F2F2]/70` with a 2px backdrop blur so the
  Carries a small copy of the hero orb on the right: the same asset, so it costs
  nothing extra to load and the section stays in the hero's family rather than
  introducing a second visual idea. **No shader packages** — that was tried and
  reverted.

  Two details that matter if you touch it. The box is `aspect-[3828/2164]`,
  matching the video's own dimensions, so the whole frame always shows and the
  orb can never be cropped — it tumbles wider on some frames, and a square crop
  was cutting it. And its edges are masked with a radial gradient centred at 28%
  (where the orb sits in frame): the video's ground is #f2f2f0-#f3f3f3 from
  compression, so no flat section colour can match it and the frame edge would
  otherwise always show as a faint box. The section is `#F3F3F3` to match the
  hero's dominant ground. The video is paused off-screen via an
  `IntersectionObserver` — decoding video nobody can see is wasted work that
  browsers only sometimes throttle.

  The three principle cells stack until `lg`, not `md`: three across at 768px
  gave each one a seven-line ribbon of broken text.

  **On mobile the orb is absolutely positioned and bled off the right edge**,
  overlapping the heading. Its own band cost 238px — a quarter of the section —
  for a decorative element, and the overlap matches what the hero already does
  with its headline. From `md` it returns to the flow beside the body copy. The
  content columns carry `relative z-10` so they stay above it.
- `src/components/Examples.tsx` — a five-cell bento (3+3 over 2+2+2 at `lg`,
  two columns at `sm`, stacked on mobile) on one hairline grid. Each cell is a
  client monogram, title, body and `Flow` strip. There is no sector icon — the
  client mark is the card's only identity.

  Client logos live in `public/clients/` (see the README there); originals are in
  `assets-src/clients/` and never ship. They are **white silhouettes on
  transparency**, not the brands' own colours: each source is converted so alpha
  follows the artwork's darkness, which drops white/JPEG backgrounds out and
  lets the mark sit straight on the card like the tool marks in Capabilities. A
  white chip behind full-colour logos broke the dark surface.

  The conversion uses a **smoothstep**, not a linear ramp: below 0.15 darkness
  is knocked out entirely, above 0.55 is solid. A linear map leaves an off-white
  or JPEG-noisy background sitting at a low but visible alpha — a faint box on
  the dark card (Northside was only 4.9% transparent before this). The band
  between the two keeps edges antialiased, and the solid ceiling stops a brown
  or red wordmark reading far fainter than a black one. Regenerate the same way
  if a logo is replaced. A card with no `logo`, or whose file
  fails to load, falls back to a monogram — so a missing file degrades tidily
  rather than showing a broken image. **Football Hospitality is deliberately
  still on its monogram:** the artwork supplied is The FA's England Football
  mark, which would assert a client relationship with a real organisation.

  The monogram (initials tile + name) stands in for a client logo.
  **The names are invented** — Northside Spa, Matchday Club, Baseline Padel,
  The Granary, Forge Fitness — because these cards describe work delivered in
  past tense ("Connected…", "Streamlined…", "Automated…"), so a recognisable
  brand mark would assert a client relationship that does not exist. Replace
  only when a client has agreed to be named; `Logo.src` in `ui/logo-cloud`
  already takes raster or SVG artwork.

  The last two cells (Review Replies, Weekly Reporting) deliberately sit outside
  the booking-and-CRM pattern of the first three — one is language work with a
  human approving, the other is reporting — so the five read as a range rather
  than one trick. The section's "not client case studies" disclaimer was removed
  deliberately when the copy went past tense; keep it that way only while these
  are real engagements.

- `src/components/Process.tsx` — **parked**, not rendered. "Find the
  opportunity. Build the system. Measure the impact." as a three-step stepper on a vertical rail. One step is
  active at a time (click to change): earlier steps show a check, later ones
  their number, and a companion panel shows what the active step produces. On
  mobile only the active step keeps its body copy — three at once is a wall of
  text on a narrow screen. The rail is a 1px line from the foot of one tile to
  the next, masked by each tile's own background. The hero states the line;
  this section earns it. To bring it back, add `<Process />` to `App.tsx` **and**
  restore the "How It Works" → `#process` nav link in `Hero.tsx`, or the link
  points at nothing.
- `src/components/Contact.tsx` — enquiry form in a bordered panel with corner marks.
- `src/components/Footer.tsx` — logo, positioning line, email, centred
  copyright. Deliberately has no section index: this is one page, the nav
  already lists the sections, and the contact form sits directly above it.
- `public/favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png` (180) and
  `favicon-512.png` — the brand mark on black, at 80% of the square. Black
  because the mark's highlights are near-white and would vanish on a light
  browser tab, the same reason the nav puts it on a disc. Rendered from
  `relay-mark.png` via headless Chromium; regenerate all four together if the
  mark changes. There is no `.ico` and no vector — the source is raster.
- `public/relay-mark.png` — the brand mark. The supplied render had the black
  background baked in (no alpha), so it was decoded, given alpha from per-pixel
  luminance, un-premultiplied, cropped to the artwork and downscaled. The
  1536x1024 master is in `assets-src/`. On light ground (nav, mobile menu) the
  mark sits on a black disc, because its highlights are near-white; on dark
  ground (footer) it is used directly.
- `src/components/ui/logo-cloud.tsx` — reusable logo marks (shadcn-convention
  path). `LogoCloud` is the bordered grid the parked Integrations section uses;
  `LogoRow` is a static inline row; `LogoMarquee` is the scrolling version that
  closes Capabilities — the track holds the set twice and translates -50% so the
  loop is seamless, with edge gradients (pass the section colour as `edge`)
  fading it in rather than letting marks pop at a hard boundary. It pauses on
  hover and stops under `prefers-reduced-motion`. Mark size is a **variant**
  (`grid` / `row`), not a class override, so no class ever conflicts and the
  file needs no `cn()` — importing `tailwind-merge` here put ~9kB gzipped on
  the critical path for nothing. Keep it that way, and keep the row's gaps in
  the component rather than passing them from the caller: `join` does not
  resolve Tailwind conflicts, so a caller-side `gap-*` would silently depend on
  stylesheet order.
- `src/components/primitives.tsx` — shared type, motion and layout primitives.
  `Reveal` and `ClipHeading` both start hidden and are released by
  `useReveal`, which pairs framer's `useInView` with a plain
  `getBoundingClientRect` check on a timer and on scroll. That check releases
  anything **at or above** the fold, not just what is currently on screen: a
  fast flick can carry an element from below the fold to above it without an
  observer callback landing. The belt and braces
  matter: these reveals hide content rather than merely un-animating it, so a
  missed observer callback would leave a headline permanently invisible.
  `Flow` takes a `light` prop for the dark Examples section, and groups each
  arrow with the step that *follows* it so a four-step strip wraps with the
  arrow leading the next line rather than dangling at the end of the previous.
  Named `primitives`, not `ui`, because a `ui.tsx` file next to a `ui/` folder
  makes `./ui` imports ambiguous.
- `src/lib/media.ts` — `ORB_VIDEO`, the hero orb, imported by both Hero and
  Approach so there is one URL to change when you self-host it (see point 1).
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge).
- `src/index.css` — Tailwind directives and base resets.
- `tailwind.config.js` — `font-inter` and an `accent` colour (`#5E0ED7`).
- Inter is loaded from Google Fonts in `index.html`.

## Mobile

- **Hero order changes below `md`.** The bottom block is a column whose
  children carry `order-*`, so mobile reads h1 → caption → CTA → proof strip
  while desktop keeps the CTA above the headline row. Every ordered child needs
  `md:order-none`, and the CTA is `md:self-end` to stay right on desktop.
- **The h1 uses `clamp(1.75rem, 10px + 6.2vw, 8rem)`.** The slope was solved so
  that 390px gets ~34px (up from 28px) while 1440px stays ~99px — desktop is
  where it was. The `1.75rem` floor only binds below ~300px; at 320px the line
  measures 280px against 280px of available width, so do not raise it.
- **The bottom of the hero carries a mobile-only scrim** fading to `#F3F3F3` —
  sampled from the video's own ground, so it is invisible where the frame is
  plain. Portrait `object-cover` crops the orb across the copy; the video is
  also panned (`object-[18%_center]`) because the orb sits left of centre in
  the source. Both are `md:hidden` / `sm:object-center`.
- **Touch targets:** footer and contact links carry `py-1` with the list `gap`
  removed, which clears the 24px WCAG minimum (they were 17px) without changing
  the visual rhythm. Anything new that is a bare text link needs the same.
- The mobile menu locks body scroll and closes on Escape — `fixed` alone does
  not stop the page scrolling underneath on touch.

## Headings

`ClipHeading` renders each line inside its own `overflow-hidden` wrapper, so a
line too long for its container wraps *inside* the clip: the reveal then slides
a two-line block, and a heading written as two lines renders as three.

**Check this after editing any heading, and check the `size` floor too** — the
failures cluster at 320px (floor too high for a long line) and at 1024-1280
(where two-column layouts halve the available width). The reliable test is a
`Range` over the text node, counting `getClientRects()`; `getClientRects()` on
the element itself returns one rect however many lines it holds, so it silently
reports everything as fine:

```js
[...document.querySelectorAll('h1 span > span, h2 span > span')].forEach(el => {
  const r = document.createRange()
  r.selectNodeContents(el.firstChild)
  if (r.getClientRects().length > 1) console.warn('wrapped:', el.textContent)
})
```

Approach's heading gets a full-width row of its own for this reason — sharing
one with the orb squeezed it until it wrapped.

## Animation timings

| Element | Variant | Delay |
| --- | --- | --- |
| Logo, nav links, hamburger | `fadeDown` (y -20 → 0, 0.5s) | `index * 0.1s`, index 0–5 |
| Eyebrow, CTA, support line, proof points | `fadeUp` (y 32 → 0, 0.6s) | `index * 0.12s`, index 2–6 |
| Heading words | clip reveal (y 110% → 0, 0.7s) | `0.4 + i * 0.14` |

All use `ease: [0.22, 1, 0.36, 1]`.

## SEO and social

`index.html` carries the title, description, canonical, Open Graph and Twitter
card tags, and `ProfessionalService` JSON-LD. `public/` has `robots.txt`,
`sitemap.xml`, a branded `404.html` (standalone — the React app never mounts
there, so the brand is inlined) and `og-image.png` (1200x630, generated from
the brand mark — logo-forward, since link previews in WhatsApp and Slack are
small and brand recognition matters more there than a headline).

**Every absolute URL in those files says `https://relay.co.uk`.** Confirm the
domain before launch and update all five places — `index.html` (canonical,
`og:url`, `og:image`, `twitter:image`, JSON-LD `url`/`logo`/`image`),
`robots.txt` and `sitemap.xml` — or link previews break and the canonical points
at nothing.

`404.html` is served automatically by Netlify, Vercel and GitHub Pages. Other
hosts may need it wired up explicitly.

## Accessibility notes

Checked and kept passing; re-check after editing copy or colour:

- **Heading order is H1 → H2 → H3 with no skips**, one H1, and the page is
  wrapped in a `<main>` landmark.
- **`ClipHeading` and the hero H1 add a trailing space to every line but the
  last.** Each line is its own block, so without it `textContent` runs them
  together and the accessible name becomes "AI That MakesBusiness Better".
- **Accent on dark uses `ACCENT_ON_DARK` (#B793ED), not `ACCENT`.** The brand
  purple is only 2.38:1 on `#0A0A0A`. The `Flow` arrows are also `aria-hidden`:
  chip order already carries the sequence, and "right arrow" between every step
  is noise on a screen reader.
- Every decorative image carries `alt=""`; every meaningful one has real alt
  text. Tap targets are all at least 24px tall.

## Before this goes live

1. **The video is hotlinked from a third-party CDN.** Host your own copy before
   launch, and add a `poster` image so there's no flash before the first frame.
   It is used twice now (hero background, Approach companion) but the URL lives
   in `src/lib/media.ts`, so it is still one line to change.
2. **The enquiry form posts to `VITE_FORM_ENDPOINT`** — see `.env.example`.
   Set it to a form-to-email endpoint (Formspree's free tier needs no backend)
   and put the destination address in that service's dashboard, not in the code,
   so it never ships in the bundle to be scraped. With the variable unset the
   form falls back to composing a `mailto:`, which works but loses most
   enquiries — so set it before launch, and remember `.env` is git-ignored, so
   the host needs the variable configured too. A hidden honeypot field blocks
   basic bots; anything heavier needs the service's own spam filtering.
3. `hello@relay.co.uk` appears in the form and the contact details — confirm it
   exists. There is deliberately **no phone number**; add one if you want it.
4. Nav links all resolve to real sections (`#capabilities`, `#examples`,
   `#contact`). There is **no About section**, and "How It Works" was removed
   when Process was parked — links were dropped rather than left pointing at
   `#`. Keep it that way: check `a[href^="#"]` still resolves after adding or
   parking a section.
5. The footer has **no Privacy Policy or Terms** links. Add them once those
   pages exist; a UK site collecting enquiry data will want a privacy policy.
   They are the one thing that should go back into the simplified footer.
6. **Logo marks come from `simple-icons` (bundled, not hotlinked)** and render
   monochrome. The twelve in Capabilities cost ~10kB gzipped — tree-shaking
   works, so the cost scales with the count. Simple Icons has no OpenAI, Slack,
   Twilio or Pipedrive mark in this version. Simple Icons ships the files under CC0, but the marks are
   still the vendors' trademarks — check each brand's guidelines before launch.
   Salesforce is no longer in the set, so Calendly takes that slot.
7. **These are integration targets, not partners or clients.** Keep a line of
   framing above them ("Connects to the tools you already use"). An unlabelled
   logo wall reads as endorsement, and claiming partnership would not be true.

## Notes

- The heading is `shrink-0` and the small left caption is `min-w-0`, so on very
  narrow screens (~320px) the caption reflows rather than letting the headline
  overflow the viewport. At 360px and up there is slack and neither moves.
- React 19 (the current Vite scaffold default) rather than the React 18 named in
  the brief — Framer Motion 13 supports it and nothing in the spec depends on 18.
