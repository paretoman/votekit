/**
 * @namespace typesVoteArrays
 */
/**
 * @typedef {object[][]} scoreVotes - Each preference has a score for each candidate.
 * @memberof typesVoteArrays
 */
/**
 * @typedef {object[][]} rankings - Each preference has a rank for each candidate.
 * @memberof typesVoteArrays
 */
/**
 * @typedef {number[][][]} cansByRankList - Each preference is a list indexed by ranking.
 * A list of candidates is at each ranking.
 * The first index is a group of voters who share the same ranking.
 * The second index is the rank number.
 * The third index is for a list of candidates at that rank.
 * @memberof typesVoteArrays
 */
export default {}
