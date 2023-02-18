import * as geoms from './typesGeoms.js'
import * as typesVoterPoint from './typesVoterPoint.js'

// How exporting types works:
// https://stackoverflow.com/a/73232942
/**
 * @namespace typesGeometry
 */
/**
 * @typedef {Object} geometry - geometry for casting votes
 * @property {geoms.canGeoms} canGeoms
 * @property {geoms.voterGeoms} voterGeoms
 * @property {Number} dimensions
 * @property {parties} parties
 * @memberof typesGeometry
 */

/**
 * @typedef {Object} parties - describes parties each candidate belongs to.
 * @property {Number[][]} partiesByCan - each candidate has a list of parties.
 * @property {Number} numParties - total number of parties.
 * @memberof typesGeometry
 */

/**
 * @typedef {Object} testGeometry -geometry for casting one vote
 * @property {geoms.canGeoms} canGeoms
 * @property {typesVoterPoint.voterPoints} voterPoints
 * @property {Number} dimensions
 * @property {parties} parties
 * @memberof typesGeometry
 */

export default {}
