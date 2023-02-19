import * as typesVotesForGeom from './typesVotesForGeom.js'
import * as typesGeometry from './typesGeometry.js'
import * as typesVoteArrays from './typesVoteArrays.js'

/**
 * @namespace typesVotes
 */
/**
 * @typedef {Object} votes - The vote a data structure that contains the information needed to elect, explain, and visualize.
 * @property {preferenceLists} [preferenceLists] - Lists of preferences.
 * @property {preferenceTallies} [preferenceTallies] - How many votes have a listed preference.
 * @property {candidateTallies} [candidateTallies] - vote tallies indexed by candidate
 * @property {pairwiseTallies} [pairwiseTallies] - pairwise tallies
 * @property {typesVotesForGeom.votesForGeom[]} votesByGeom - Vote data for each voter geometry. A list of votesForGeom.
 * @property {typesGeometry.parties} parties - describes parties each candidate belongs to.
 * @property {number} numCans - the number of candidates, comes in handy.
 * @memberof typesVotes
 */
/**
 * @typedef {Object} preferenceLists - Lists of preferences.
 * @property {typesVoteArrays.scoreVotes} [scoreVotes]
 * @property {typesVoteArrays.rankings} [rankings]
 * @property {typesVoteArrays.cansByRankList} [cansByRankList]
 * @memberof typesVotes
 */
/**
 * @typedef {Object} preferenceTallies - How many votes have a listed preference.
 * @property {number[]} voteFractions - The fraction of voters who share the same preference.
 * @memberof typesVotes
 */
/**
 * @typedef {Object} candidateTallies - vote tallies indexed by candidate
 * @property {number[]} [voteFractionsByCan] - The fraction of plurality votes for each candidate.
 * @property {number[]} [scoreFractionAverageByCan] - the average fractional score for each candidate.
 * @property {number[]} [firstPreferenceFractions] - A list of fractions of voters
 * who ranked a candidate first, indexed by candidate.
 * @property {number[]} [bordaFractionAverageByCan] - The average fractional borda score for a candidate.
 * @memberof typesVotes
 */
/**
 * @typedef {Object} pairwiseTallies - pairwise tallies
 * @property {number[][]} winFractionPairwise - The fraction of wins for the first of a pair of candidates.
 * who preferred candidate i over k, indexed by [i][k].
 * @memberof typesVotes
 */

export default {}
