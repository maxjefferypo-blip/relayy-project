import orb1920 from '@/assets/orb-1920.mp4'
import orb1280 from '@/assets/orb-1280.mp4'
import orbPoster from '@/assets/orb-poster.webp'

/**
 * The hero orb. Used by the hero as a full-bleed background and by Approach as
 * a small companion, so there is one place to change it.
 *
 * Self-hosted re-encodes of the 3828x2164 master, which is 22MB at 17.5Mbps
 * and still lives at
 * https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4
 * At that bitrate iOS Safari would not autoplay until most of the file had
 * downloaded, and showed its own play button in the meantime. Both encodes are
 * H.264 High, CRF 24, faststart, no audio track; see README to regenerate.
 *
 * The video's own ground is #F3F3F3, which is why it sits on light sections
 * with no visible edge.
 */
export const ORB_VIDEO = orb1920 // 1920x1086, 2.7MB. Full-bleed hero.
export const ORB_VIDEO_SMALL = orb1280 // 1280x724, 1.6MB. Approach's companion.
/** The first frame, so something shows before playback and if it is refused. */
export const ORB_POSTER = orbPoster
