import * as typesGrid from './typesGrid.js'
import * as typesVote from './typesVote.js'
import * as typesVoteArrays from './typesVoteArrays.js'
import * as typesGeoms from './typesGeoms.js'

/**
 * @namespace typesVotesForGeomGrid
 */
/**
 * @typedef {votesForGeomGridRanking | votesForGeomGridPairwise | votesForGeomGridPlurality | votesForGeomGridScore} votesForGeomGrid - Vote data for just one voter geometry in the form of a grid, 1D or 2D.
 * @memberof typesVotesForGeomGrid
 */
/**
 * @typedef {Object} votesForGeomGridRanking
 * @property {typesGrid.grid} grid - data for points on a grid
 * @property {typesVote.rankingVote[]} voteSet - a vote for each grid point
 * @property {Number[]} voteCounts
 * @property {Number} totalVotes
 * @property {Number[]} bordaFractionAverageByCan
 * @property {typesVoteArrays.rankings} rankings
 * @property {typesVoteArrays.cansByRankList} cansByRankList - cansByRank for each grid point
 * @memberof typesVotesForGeomGrid
 */
/**
 * @typedef {Object} votesForGeomGridPairwise
 * @property {typesGrid.grid} grid - data for points on a grid
 * @property {typesVote.rankingVote[]} voteSet - a vote for each grid point
 * @property {Number} totalVotes
 * @property {Number[]} bordaFractionAverageByCan
 * @property {Number[][]} winsPairwise -  The number of wins for the first of a pair of candidates.
 * @memberof typesVotesForGeomGrid
 */
/**
 * @typedef {Object} votesForGeomGridPlurality
 * @property {typesGrid.grid} grid - data for points on a grid
 * @property {typesVote.pluralityVote[]} voteSet - a vote for each grid point
 * @property {Number[]} countByCan
 * @property {Number} totalVotes
 * @memberof typesVotesForGeomGrid
 */
/**
 * @typedef {Object} votesForGeomGridScore
 * @property {typesGrid.grid} grid - data for points on a grid
 * @property {typesVote.scoreVote[]} voteSet - a vote for each grid point
 * @property {Number[]} scoreSumByCan
 * @property {Number} totalVotes
 * @property {typesGeoms.voterGeom} voterGeom
 * @memberof typesVotesForGeomGrid
 */

export default {}
