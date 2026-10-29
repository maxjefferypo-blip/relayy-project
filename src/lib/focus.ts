/**
 * The outcomes a visitor can pick. Capabilities offers them as cards; Contact
 * asks the same question in the form, so choosing a card pre-selects it there.
 */
export const FOCUSES = [
  { key: 'acquire', label: 'Get more customers' },
  { key: 'convert', label: 'Convert more interest' },
  { key: 'retain', label: 'Bring customers back' },
  { key: 'unsure', label: 'Not sure yet' },
] as const

export type FocusKey = (typeof FOCUSES)[number]['key']

const EVENT = 'relay:focus'

/** Called by a card on click; the card's own `#contact` href does the scroll. */
export function selectFocus(key: FocusKey) {
  window.dispatchEvent(new CustomEvent<FocusKey>(EVENT, { detail: key }))
}

export function onFocusSelected(handler: (key: FocusKey) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<FocusKey>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}
