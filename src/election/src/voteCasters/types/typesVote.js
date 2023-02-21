/**
 * @namespace typesVote
 */

/**
 * @typedef rankingVote - a rank for each candidate.
 * @property {number[]} cansByRank - an array of candidates lists, indexed by rank. Candidates can share a rank.
 * @property {number[][]} [netWinsPairwise] - a win, tie, or loss (1,0,-1) for the first of a pair of candidates, indexed by pair.
 * @property {number[]} [ranking] - an array of ranks, indexed by candidate.
 * @property {number[]} [bordaScores] - The borda scores for each candidate for one vote.
 * @property {number[]} [bordaFractions] - Fractional borda scores, between 0 and 1.
 * @memberof typesVote
 */

/**
 * @typedef pairwiseVote - how candidates compare head-to-head.
 * @property {number[][]} netWinsPairwise - a win, tie, or loss (1,0,-1) for the first of a pair of candidates, indexed by pair.
 * @property {number[]} [cansByRank] - an array of candidates lists, indexed by rank. Candidates can share a rank.
 * @property {number[]} [ranking] - an array of ranks, indexed by candidate.
 * @property {number[]} [bordaScores] - The borda scores for each candidate for one vote.
 * @property {number[]} [bordaFractions] - Fractional borda scores, between 0 and 1.
 * @memberof typesVote
 */

/**
 * @typedef pluralityVote - a choice of a candidate.
 * @property {number[]} pluralityAllocation - an array of 0's except for a 1 for the chosen candidate.
 * @property {number} pluralityVote - the chosen candidate.
 * A candidate is represented as an integer from 0 to a max.
 * The max is the number of candidates minus 1.
 * @memberof typesVote
 */

/**
 * @typedef scoreVote - a score for each candidate.
 * @property {number[]} scoreVote - an array of scores, indexed by candidate
 * A score is a number between 0 and 1.
 * In the future, maybe integers between 0 and a maximum score.
 * @memberof typesVote
 */

export default {}
