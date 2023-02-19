/**
 * @namespace typesVoterPoint
 */

/**
 * @typedef {voterPoint[]} voterPoints - For 2D, an array of objects: {x,y,w}. For 1D, an array of objects: {x,w,densityProfile}.
 */
/**
 * @typedef {voterPoint1D | voterPoint2D} voterPoint
 */
/**
 * @typedef {Object} voterPoint1D - the point where a single voter sits in 1D
 * @property {number} x - x coordinate in policy space
 * @memberof typesVoterPoint
 */
/**
 * @typedef {Object} voterPoint2D - the point where a single voter sits in 2D
 * @property {number} x - x coordinate in policy space
 * @property {number} y - y coordinate in policy space
 * @memberof typesVoterPoint
 */

export default {}
