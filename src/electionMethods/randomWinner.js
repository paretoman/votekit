/** @module */

/**
 * pick a random candidate as the winner
 * @param {*} votes
 * @returns
 */
export default function randomWinner(votes) {
    const nk = votes.tallyFractions.length
    const iWinner = Math.floor(Math.random() * nk)
    const results = { iWinner }
    return results
}
