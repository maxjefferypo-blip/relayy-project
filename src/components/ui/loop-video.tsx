import { useEffect, useRef, useState, type CSSProperties } from 'react'

/**
 * Slightly under real time: the tumble reads calmer, and the 48fps encode has
 * the frames to stay smooth at this speed (the 24fps master did not).
 */
const PLAYBACK_RATE = 0.8

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
 * A tap is rarely what happens, though: on a phone people scroll, and a scroll
 * is not a user gesture. So when playback is refused the element is marked
 * `.loop-video-still` and the poster gets a slow CSS drift instead (index.css)
 * — it still moves, it just isn't the video.
 *
 * `autoPlay` is set too (unless preload is "none"), so the browser can start as soon as it has frames
 * rather than waiting for the script bundle to download and hydrate.
 *
 * Decoding video nobody can see is wasted work that browsers only sometimes
 * throttle, so it is paused off-screen. iOS also pauses it when the tab is
 * backgrounded and does not resume it, so it is restarted on return.
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
  const [refused, setRefused] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    // React sets `muted` as a property after creating the element, never as an
    // attribute. Set it again before the first play() so autoplay policy sees a
    // muted video.
    video.muted = true
    // Both: `playbackRate` alone is reset to the default whenever the element
    // reloads its source.
    video.defaultPlaybackRate = PLAYBACK_RATE
    video.playbackRate = PLAYBACK_RATE

    let onScreen = false
    const play = () => {
      if (!onScreen || !video.paused || document.hidden) return
      video.play().catch((err: unknown) => {
        // AbortError just means a pause() overtook this play(); only a policy
        // refusal means the video will not run without a gesture.
        if (err instanceof DOMException && err.name === 'NotAllowedError') setRefused(true)
      })
    }
    const onPlaying = () => {
      setRefused(false)
      stopRetrying()
    }

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) play()
      else video.pause()
    })
    observer.observe(video)

    const stopRetrying = () => GESTURES.forEach((g) => window.removeEventListener(g, play))
    GESTURES.forEach((g) => window.addEventListener(g, play, { passive: true }))
    video.addEventListener('playing', onPlaying)
    document.addEventListener('visibilitychange', play)

    return () => {
      observer.disconnect()
      stopRetrying()
      video.removeEventListener('playing', onPlaying)
      document.removeEventListener('visibilitychange', play)
    }
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      preload={preload}
      // Autoplay ignores `preload="none"` and would fetch a below-the-fold
      // video on page load, so that one waits for the observer instead.
      autoPlay={preload !== 'none'}
      aria-hidden="true"
      tabIndex={-1}
      muted
      loop
      playsInline
      disablePictureInPicture
      className={`loop-video pointer-events-none select-none ${refused ? 'loop-video-still' : ''} ${className}`}
      style={style}
    />
  )
}
