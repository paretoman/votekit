import * as geoms from './typesGeoms.js'
import * as typesTestVoter from './typesTestVoter.js'

// How exporting types works:
// https://stackoverflow.com/a/73232942
/**
 * @namespace typesGeometry
 */
/**
 * @typedef {Object} geometry - geometry for casting votes
 * @property {geoms.canGeom1D[] | geoms.canGeom2D[]} canGeoms - For 2D, an array of objects: {x,y}. For 1D, an array of objects: {x}.
 * @property {geoms.voterGeom1D[] | geoms.voterGeom2D[]} voterGeoms - For 2D, an array of objects: {x,y,w}. For 1D, an array of objects: {x,w,densityProfile}.
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
 * @property {geoms.canGeom1D[] | geoms.canGeom2D[]} canGeoms - For 2D, an array of objects: {x,y}. For 1D, an array of objects: {x}.
 * @property {typesTestVoter.testVoter[]} testVoters - For 2D, an array of objects: {x,y,w}. For 1D, an array of objects: {x,w,densityProfile}.
 * @property {Number} dimensions
 * @property {parties} parties
 * @memberof typesGeometry
 */

export default {}
