const BREAKPOINT = {
  DEFAULT: 1280,
  TABLE: 768,
}

const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINT.DEFAULT}px)`)
const mediaQueryTable = window.matchMedia(`(min-width: ${BREAKPOINT.TABLE}px)`)

export { mediaQuery, mediaQueryTable }