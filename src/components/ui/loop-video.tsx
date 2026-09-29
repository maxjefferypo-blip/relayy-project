import { useEffect, useRef, type CSSProperties } from 'react'

/** Interactions that count as a user gesture, so a `play()` inside one is always allowed. */
const GESTURES = ['touchend', 'click', 'keydown'] as const

/**
 * Silent, looping, decorative video that plays only while it is on screen.
 *
 * Autoplay is a request, not a guarantee. iOS Low Power Mode and Android Data
 * Saver refuse it outright, and iOS then paints its own play button over the
 * frame — one nobody can tap here, because the video sits under the page's
 * content. So the native button is hidden (`.loop-video` in index.css), the
 * poster stands in for the video, and playback is retried on the first tap or
 * key press, which the browser always allows.
 *
 * Decoding video nobody can see is wasted work that browsers only sometimes
 * throttle, so it is paused off-screen.
 */
export function LoopVideo({
  src,
  poster,
  preload = 'auto',
  className = '',
  style,
}: {
  src: string
  poster?: string
  preload?: 'auto' | 'metadata' | 'none'
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    // React sets `muted` as a property after creating the element, never as an
    // attribute. Set it again before the first play() so autoplay policy sees a
    // muted video.
    video.muted = true

    let onScreen = false
    const play = () => {
      if (onScreen && video.paused) void video.play().catch(() => {})
    }

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) play()
      else video.pause()
    })
    observer.observe(video)

    const stopRetrying = () => GESTURES.forEach((g) => window.removeEventListener(g, play))
    GESTURES.forEach((g) => window.addEventListener(g, play, { passive: true }))
    video.addEventListener('playing', stopRetrying, { once: true })

    return () => {
      observer.disconnect()
      stopRetrying()
      video.removeEventListener('playing', stopRetrying)
    }
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      preload={preload}
      aria-hidden="true"
      tabIndex={-1}
      muted
      loop
      playsInline
      disablePictureInPicture
      className={`loop-video pointer-events-none select-none ${className}`}
      style={style}
    />
  )
}
