import * as typesMath from './typesMath.js'

/**
 * @namespace typesCanBorders
 */

/**
 * @typedef {Object} canBorders
 * @property {pairwiseIntervals1D} [pairwiseIntervals1D]
 * @property {voronoiIntervals1D} [voronoiIntervals1D]
 * @property {voronoiLines2D} [voronoiLines2D]
 * @property {rankingIntervals1D} [rankingIntervals1D]
 * @memberof typesCanBorders
 */

/**
 * @typedef {Object} pairwiseIntervals1D
 * @property {number[][]} midpoints - midpoint for every pair of candidates
 * @property {number[][]} iLower - true if first candidate of pair is lower in x coordinate than second.
 * @memberof typesCanBorders
 */
/**
 * @typedef {Object} voronoiIntervals1D
 * @memberof typesCanBorders
 */
/**
 * @typedef {typesMath.lineHomogeneous[]} voronoiLines2D
 * @memberof typesCanBorders
 */
/**
 * @typedef {Object} rankingIntervals1D
 * @memberof typesCanBorders
 */

export default {}
