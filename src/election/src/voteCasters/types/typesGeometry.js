import * as geoms from './typesGeoms.js'
import * as typesPoints from './typesPoints.js'

// How exporting types works:
// https://stackoverflow.com/a/73232942
/**
 * @namespace typesGeometry
 */
/**
 * @typedef {object} geometry - geometry for casting votes
 * @property {geoms.canPoints} canPoints
 * @property {geoms.voterGeoms} voterGeoms
 * @property {number} dimensions
 * @property {parties} parties
 * @memberof typesGeometry
 */

/**
 * @typedef {object} parties - describes parties each candidate belongs to.
 * @property {number[]} partiesByCan - each candidate has party.
 * @property {number} numParties - total number of parties.
 * @memberof typesGeometry
 */

/**
 * @typedef {object} testGeometry -geometry for casting one vote
 * @property {typesPoints.points} canPoints
 * @property {typesPoints.points} voterPoints
 * @property {number} dimensions
 * @property {parties} parties
 * @memberof typesGeometry
 */

export default {}
