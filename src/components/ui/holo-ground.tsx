import { ORB_POSTER } from '@/lib/media'

/**
 * Holographic ground: the hero orb's first frame, blown up and blurred into a
 * wash of its own colours, so a section belongs to the hero without repeating
 * it. Decorative only; the parent section must be `relative overflow-hidden`
 * and its content `relative`.
 *
 * On dark sections the frame is inverted and hue-rotated back: the poster's
 * #F3F3F3 ground becomes near-black (#0C0C0C, against the page's #0A0A0A)
 * while the orb keeps roughly its own hues, so the glow sits on the dark
 * rather than greying it out.
 */
export function HoloGround({ dark = false }: { dark?: boolean }) {
  return (
    <img
      src={ORB_POSTER}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`pointer-events-none absolute inset-0 size-full scale-150 select-none object-cover blur-2xl ${
        dark ? 'opacity-80' : 'saturate-200'
      }`}
      style={dark ? { filter: 'invert(1) hue-rotate(180deg) saturate(2.2) blur(40px)' } : undefined}
    />
  )
}
