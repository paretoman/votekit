import * as typesGeoms from './typesGeoms.js'
import * as typesVoterPoint from './typesVoterPoint.js'

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
 * @property {typesVoterPoint.voterPoint1D[]} voterPoints - grid points in voterPoint format
 * @property {number[]} voteCounts - voteCount for each grid point
 * @property {typesGeoms.voterGeom1D} voterGeom - the geometry of a voter distribution in 1D
 * @memberof typesGrid
 */
/**
* @typedef {object} gridX
* @property {number[]} gridX - x coordinates for grid points
* @property {typesVoterPoint.voterPoint1D[]} voterPoints - grid points in voterPoint format
* @property {number} gridPointLength - size of grid point's region in policy space. density * length = count.
 * @memberof typesGrid
 */

/**
 * @typedef {object} grid2D - data for points on a 2D grid
 * @property {number[]} x - x coordinates for grid points
 * @property {number[]} y - y coordinates for grid points
 * @property {number[]} density - density for grid points
 * @property {number[]} voteCounts - voteCount for each grid point
 * @property {number} nx - number of x coordinates
 * @property {number} ny - number of y coordinates
 * @property {number} width - width and height of grid in pixels. grid is square.
 * @property {typesVoterPoint.voterPoint2D[]} voterPoints - grid points in voterPoint format
 * @property {typesGeoms.voterGeom2D} voterGeom - the geometry of a voter distribution in 2D
 * @memberof typesGrid
 */

export default {}
