# Client logos

Drop each client's artwork here, named to match the `logo` path in
`src/components/Examples.tsx`:

| Card | File |
| --- | --- |
| Wellness CRM | `northside-spas.png` |
| Padel Bookings | `baseline.png` |
| Review Replies | `the-granary.png` |
| Weekly Reporting | `forge-fitness.png` |

Originals live in `assets-src/clients/` (outside `public/`, so they never ship).
The files here are trimmed of surrounding whitespace and normalised to 96px tall
for retina; regenerate them the same way if a logo is replaced, or a lockup with
baked-in margin will render small and floating inside its chip.

PNG with transparency, or SVG. They render at 20-24px tall on a white chip
(the cards are near-black and most logos are dark-on-transparent), so trim any
baked-in whitespace or the mark will look small and float.

A card with no file — or a path pointing at a file that isn't here — falls back
to its monogram, so nothing breaks while you gather them.

**Only add a logo for a company that has agreed to be named.** These cards
describe work delivered, so a logo asserts a client relationship.
