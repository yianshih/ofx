/**
 * Email Format (test@gmail.com)
 */
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * Accepts Float Number (0.3,-10.5)
 */
export const FLOAT_NUMBER_REGEX = /^-?\d+\.?\d*$/

/**
 * Only accepts 0 ~ 9
 */
export const INTEGER_REGEX = /^\d+$/