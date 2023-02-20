import * as typesGeoms from './typesGeoms.js'
import * as typesPoints from './typesPoints.js'

/**
 * @namespace typesGrid
 */
/**
 * @typedef {grid1D | grid2D} grid - data for points on a grid
 */
/**
 * @typedef {object} grid1D - data for points on a 1D grid
 * @property {number[]} x - x coordinates for grid points
 * @property {number[]} density - density for grid points
 * @property {typesPoints.point1D[]} voterPoints - grid points in point1D format
 * @property {number[]} voteCounts - voteCount for each grid point
 * @property {number} totalVotes - total number of votes
 * @property {typesGeoms.voterGeom1D} voterGeom - the geometry of a voter distribution in 1D
 * @memberof typesGrid
 */
/**
* @typedef {object} gridX
* @property {number[]} gridX - x coordinates for grid points
* @property {typesPoints.point1D[]} voterPoints - grid points in point1D format
* @property {number} gridPointLength - size of grid point's region in policy space. density * length = count.
 * @memberof typesGrid
 */

/**
 * @typedef {object} grid2D - data for points on a 2D grid
 * @property {number[]} x - x coordinates for grid points
 * @property {number[]} y - y coordinates for grid points
 * @property {number[]} density - density for grid points
 * @property {number[]} voteCounts - voteCount for each grid point
 * @property {number} totalVotes - total number of votes
 * @property {number} nx - number of x coordinates
 * @property {number} ny - number of y coordinates
 * @property {number} width - width and height of grid in pixels. grid is square.
 * @property {typesPoints.point2D[]} voterPoints - grid points in point2D format
 * @property {typesGeoms.voterGeom2D} voterGeom - the geometry of a voter distribution in 2D
 * @memberof typesGrid
 */

export default {}
