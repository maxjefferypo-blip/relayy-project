export type Logo = {
  alt: string
  /** SVG path data on a 0 0 24 24 viewBox (e.g. a Simple Icons `path`). */
  path?: string
  /** Raster/SVG artwork. Used when `path` is absent. */
  src?: string
  width?: number
  height?: number
}

type LogoCloudProps = React.ComponentProps<'div'> & {
  logos: Logo[]
}

const SWAP = 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'

/** Lifts and brightens on hover — the row's only interaction. */
const ROW_HOVER =
  'cursor-pointer transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0'

const MARK_SIZE = {
  grid: 'block h-7 w-7 fill-black md:h-8 md:w-8',
  row: `block h-5 w-5 fill-black/70 md:h-6 md:w-6 ${ROW_HOVER} hover:fill-black`,
  rowLight: `block h-5 w-5 fill-white/55 md:h-6 md:w-6 ${ROW_HOVER} hover:fill-white`,
} as const

/** Joins a base class list with an optional caller override. */
function join(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

function Mark({ logo, size = 'grid' }: { logo: Logo; size?: keyof typeof MARK_SIZE }) {
  if (logo.path) {
    return (
      <svg
        role="img"
        aria-label={logo.alt}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={MARK_SIZE[size]}
      >
        <title>{logo.alt}</title>
        <path d={logo.path} />
      </svg>
    )
  }
  if (logo.src) {
    return (
      <img
        alt={logo.alt}
        className="block h-4 md:h-5"
        height={logo.height ?? 'auto'}
        loading="lazy"
        src={logo.src}
        width={logo.width ?? 'auto'}
      />
    )
  }
  return (
    <span className="text-center text-[11px] font-semibold uppercase tracking-widest text-black sm:text-xs md:text-sm">
      {logo.alt}
    </span>
  )
}

/**
 * Hairline grid of marks. Cells sit on a 1px background gap rather than each
 * carrying a border, so shared edges stay a single pixel.
 *
 * On hover the mark clips upward out of view while the tool's name rises into
 * its place — the same reveal the headlines use.
 */
export function LogoCloud({ logos, className, ...props }: LogoCloudProps) {
  return (
    <div
      className={join(
        'grid grid-cols-2 gap-px border border-black/15 bg-black/15 md:grid-cols-4',
        className,
      )}
      {...props}
    >
      {logos.map((logo) => (
        <div
          className="group flex cursor-pointer select-none items-center justify-center bg-white px-4 py-9 transition-colors duration-500 hover:bg-[#FAFAFA] md:py-11"
          key={logo.alt}
        >
          <div className="pointer-events-none relative flex h-8 w-full items-center justify-center overflow-hidden md:h-9">
            <span
              className={`flex items-center justify-center ${SWAP} group-hover:-translate-y-[150%] motion-reduce:transition-none`}
            >
              <Mark logo={logo} />
            </span>
            <span
              className={`absolute inset-0 flex translate-y-[150%] items-center justify-center text-center text-[11px] font-semibold uppercase tracking-widest text-accent ${SWAP} group-hover:translate-y-0 motion-reduce:transition-none sm:text-xs`}
            >
              {logo.alt}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Inline row of marks, sized to sit beside copy. Same `Logo` shape as the grid,
 * no cells or hover swap: at this size a name-on-hover would be unreadable, so
 * each mark keeps its `<title>` for screen readers and nothing else. Wraps, so
 * a set wider than its container runs onto a second line rather than clipping.
 */
export function LogoRow({
  logos,
  light = false,
  className,
  ...props
}: LogoCloudProps & { light?: boolean }) {
  return (
    <div
      className={join('flex flex-wrap items-center gap-x-6 gap-y-5 sm:gap-x-8', className)}
      {...props}
    >
      {logos.map((logo) => (
        <Mark key={logo.alt} logo={logo} size={light ? 'rowLight' : 'row'} />
      ))}
    </div>
  )
}

export default LogoCloud
