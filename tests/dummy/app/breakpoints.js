/**
 * Breakpoint threshold measurements in ems.
 */
const THRESHOLDS = {
  small: 30,
  medium: 49.125,
  large: 64,
  xLarge: 90
};

/**
 * Breakpoint mapping
 *
 *  - In rendered markup, these are converted to dasherized element classes
 *    and prefaced with "media-".
 *  - In interpolated HTMLBars contexts, these are prefaced with "is",
 *    camelized, and available on the `media` object
 *      - for example, "{{#if media.isSmall}}"
 */
export default {
  small: `(max-width: ${THRESHOLDS.small}em)`,
  medium: `(min-width: ${THRESHOLDS.small + 1}em) and (max-width: ${THRESHOLDS.medium}em)`,
  large: `(min-width: ${THRESHOLDS.medium + 1}em) and (max-width: ${THRESHOLDS.large}em)`,
  xLarge: `(min-width: ${THRESHOLDS.large + 1}em)`,  // AKA "monitor"

  // meta semantic helpers
  greaterThanSmall: `(min-width: ${THRESHOLDS.small + 1}em)`,
  greaterThanMedium: `(min-width: ${THRESHOLDS.medium + 1}em)`,
  greaterThanLarge: `(min-width: ${THRESHOLDS.large + 1}em)`,
  greaterThanXLarge: `(min-width: ${THRESHOLDS.xLarge + 1}em)`,

  lessThanMedium: `(max-width: ${THRESHOLDS.small}em)`,
  lessThanLarge: `(max-width: ${THRESHOLDS.medium}em)`,
  lessThanXLarge: `(max-width: ${THRESHOLDS.large}em)`
};
