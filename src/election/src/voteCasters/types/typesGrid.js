import * as typesGeoms from './typesGeoms.js'
import * as typesVoterPoint from './typesVoterPoint.js'

/**
 * @namespace typesGrid
 */
/**
 * @typedef {grid1D | grid2D} grid - data for points on a grid
 */
/**
 * @typedef {Object} grid1D - data for points on a 1D grid
 * @property {Number[]} x - x coordinates for grid points
 * @property {typesVoterPoint.voterPoint1D[]} voterPoints - pass this to the testVote function.
 * @property {Number} gridPointLength - size of grid point's region in policy space. density * length = count.
 * @memberof typesGrid
 */
/**
* @typedef {Object} gridX
* @property {Number[]} gridX - x coordinates for grid points
* @property {typesVoterPoint.voterPoint1D[]} voterPoints - pass this to the testVote function.
* @property {Number} gridPointLength - size of grid point's region in policy space. density * length = count.
 * @memberof typesGrid
 */

/**
 * @typedef {Object} grid2D - data for points on a 2D grid
 * @property {Number[]} x - x coordinates for grid points
 * @property {Number[]} y - y coordinates for grid points
 * @property {Number[]} density - density for grid points
 * @property {Number[]} voteCounts - voteCount for each grid point
 * @property {Number} nx - number of x coordinates
 * @property {Number} ny - number of y coordinates
 * @property {Number} width - width and height of grid in pixels. grid is square.
 * @property {typesVoterPoint.voterPoint2D[]} voterPoints - pass this to the testVote function.
 * @property {typesGeoms.voterGeom2D} voterGeom - the geometry of a voter distribution in 2D
 * @memberof typesGrid
 */

export default {}
