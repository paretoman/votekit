/**
 * @namespace typesSocialChoice
 */

/**
 * @typedef {Object} socialChoiceOptions - options to specify a social choice function.
 * @property {number} seats - Number of candidates to elect.
 * @property {number} seatLimits - Upper limit of number of candidates to elect from each party, useful for OLPR.
 * @memberof typesSocialChoice
 */

/**
 * @typedef {Object} socialChoiceResults - the results returned from a social choice function.
 * @property {number} [iWinner]
 * @property {number[]} allocation - says whether each candidate is elected (1) or not (0).
 * Allocation also applies to parties. It says how many seats were allocated to each party.
 * @memberof typesSocialChoice
 */

export default {}
