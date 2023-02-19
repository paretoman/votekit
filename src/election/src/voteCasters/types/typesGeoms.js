/**
 * @namespace typesGeoms
 */
/**
 * @typedef {canGeom1D[] | canGeom2D[]} canGeoms - geometries for a number of candidates.
 * For 2D, an array of objects: {x,y}. For 1D, an array of objects: {x}.
 * @memberof typesGeoms
 */
/**
 * @typedef {voterGeom1D[] | voterGeom2D[]} voterGeoms - geometries for a number of voters
 * @memberof typesGeoms
 */
/**
 * @typedef {voterGeom1D | voterGeom2D} voterGeom - geometries for a number of voters
 * @memberof typesGeoms
 */
/**
 * @typedef {object} canGeom1D - the point where a candidate sits in 1D
 * @property {number} x - x position
 * @memberof typesGeoms
 */
/**
 * @typedef {object} canGeom2D - the point where a candidate sits in 2D
 * @property {number} x - x position
 * @property {number} y - y position
 * @memberof typesGeoms
 */
/**
 * @typedef {object} voterGeom1D - the geometry of a voter distribution in 1D
 * @property {number} x - x position
 * @property {number} w - width
 * @property {String} densityProfile - how voters are spread in policy space
 * @memberof typesGeoms
 */
/**
 * @typedef {object} voterGeom2D - the geometry of a voter distribution in 2D
 * @property {number} x - x position
 * @property {number} y - y position
 * @property {number} w - width
 * @property {String} densityProfile - how voters are spread in policy space
 * @memberof typesGeoms
 */

export default {}
