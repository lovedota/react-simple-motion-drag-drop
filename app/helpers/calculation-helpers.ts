/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * clamp(x * 255, 0, 255)
 *
 * @param {Number} num The value to the given range
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
export function clamp(num: number, min: number, max: number) {
  return Math.max(Math.min(num, max), min);
}
