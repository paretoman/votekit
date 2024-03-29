import * as typesVoteArrays from './typesVoteArrays.js'
import * as typesVotesForGeomGrid from './typesVotesForGeomGrid.js'

/**
 * @namespace typesVotesForGeom
 */
/**
 * @typedef {typesVotesForGeomGrid.votesForGeomGrid | votesForGeomCells | votesForGeomIntervals | votesForGeomPlurality} votesForGeom
 */

/**
 * @typedef {object} votesForGeomCells - Vote data for just one voter geometry in the form of 2D cells.
 * @property {number[][][]} cells - each cell is a list of points.
 * @property {typesVoteArrays.rankings} rankings - rankings for each cell
 * @property {typesVoteArrays.cansByRankList} cansByRankList - cansByRank for each cell
 * @property {number[]} voteCounts - number of votes for each cell
 * @property {number} totalVotes - total number of votes
 * @memberof typesVotesForGeom
 */
/**
 * @typedef {object} rankingPolygons2D - calculated cells of 2D policy space where voters share the same ranking.
 * @property {number[][][]} cells - each cell is a list of points.
 * @property {typesVoteArrays.rankings} rankings - rankings for each cell
 * @property {typesVoteArrays.cansByRankList} cansByRankList - cansByRank for each cell
 * @memberof typesVotesForGeom
 */

/**
 * @typedef {object} votesForGeomIntervals - Vote data for just one voter geometry in the form of 1D intervals.
 * @property {typesVoteArrays.rankings} rankings - rankings for each interval
 * @property {typesVoteArrays.cansByRankList} cansByRankList - cansByRank for each interval
 * @property {number[]} voteCounts - number of votes for each interval
 * @property {number} totalVotes - total number of votes
 * @property {number[]} intervalBorders - midpoints and two infinity points
 * @memberof typesVotesForGeom
 */
/**
 * @typedef {object} rankingIntervals1D - calculated intervals of 1D policy space where voters share the same ranking.
 * @property {typesVoteArrays.rankings} rankings - rankings for each interval
 * @property {typesVoteArrays.cansByRankList} cansByRankList - cansByRank for each interval
 * @property {number[]} intervalBorders - midpoints and two infinity points
 * @memberof typesVotesForGeom
 */

/**
 * @typedef {object} votesForGeomPlurality - Vote data for just one voter geometry in the form of 1D intervals.
 * @property {number[]} countByCan - The number of plurality votes for a candidate.
 * @property {number} totalVotes - total number of votes
 * @memberof typesVotesForGeom
 */

export default {}
