import * as typesVoteArrays from './typesVoteArrays.js'
import * as typesVotesForGeomGrid from './typesVotesForGeomGrid.js'

/**
 * @namespace typesVotesForGeom
 */
/**
 * @typedef {typesVotesForGeomGrid.votesForGeomGrid | votesForGeomCells | votesForGeomIntervals | votesForGeomPlurality} votesForGeom
 */

/**
 * @typedef {Object} votesForGeomCells - Vote data for just one voter geometry in the form of 2D cells.
 * @property {Number[][][]} cells - each cell is a list of points.
 * @property {typesVoteArrays.rankings} rankings - rankings for each cell
 * @property {typesVoteArrays.cansByRankList} cansByRankList - cansByRank for each cell
 * @property {Number[]} voteCounts - number of votes for each cell
 * @property {Number} totalVotes - total number of votes
 * @memberof typesVotesForGeom
 */
/**
 * @typedef {Object} rankingPolygons2D - calculated cells of 2D policy space where voters share the same ranking.
 * @property {Number[][][]} cells - each cell is a list of points.
 * @property {typesVoteArrays.rankings} rankings - rankings for each cell
 * @property {typesVoteArrays.cansByRankList} cansByRankList - cansByRank for each cell
 * @memberof typesVotesForGeom
 */

/**
 * @typedef {Object} votesForGeomIntervals - Vote data for just one voter geometry in the form of 1D intervals.
 * @property {typesVoteArrays.rankings} rankings - rankings for each interval
 * @property {typesVoteArrays.cansByRankList} cansByRankList - cansByRank for each interval
 * @property {Number[]} voteCounts - number of votes for each interval
 * @property {Number} totalVotes - total number of votes
 * @property {Number[]} intervalBorders - midpoints and two infinity points
 * @memberof typesVotesForGeom
 */
/**
 * @typedef {Object} rankingIntervals1D - calculated intervals of 1D policy space where voters share the same ranking.
 * @property {typesVoteArrays.rankings} rankings - rankings for each interval
 * @property {typesVoteArrays.cansByRankList} cansByRankList - cansByRank for each interval
 * @property {Number[]} intervalBorders - midpoints and two infinity points
 * @memberof typesVotesForGeom
 */

/**
 * @typedef {Object} votesForGeomPlurality - Vote data for just one voter geometry in the form of 1D intervals.
 * @property {Number[]} countByCan - The number of plurality votes for a candidate.
 * @property {Number} totalVotes - total number of votes
 * @memberof typesVotesForGeom
 */

export default {}
