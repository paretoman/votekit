/** @module */

import { range } from '../../utilities/jsHelpers.js'

/**
 * This method has rounds.
 * Each round, the votes are weighted based on the previous round.
 * Weights start at 1.
 * Each round, the candidate with the highest weighted tally is selected.
 * Then the scores for the candidate are sorted.
 * The voters' weight is spent, starting from the top scores.
 * Weight is spent until the weight of voters included is equal to 1/seats, which is the quota.
 * @param {Object} votes - The object for vote data.
 * @param {Object[]} votes.scoreVotes - A list of votes
 * @param {Number[]} votes.scoreVotes[] - A score for each candidate. From 0 to 1.
 * @param {Object} votes.voteFractions - The fraction of the population that voted that way.
 * @param {Object} socialChoiceOptions.seats - Number of candidates to elect.
 * @returns {{allocation:number[]}} - socialChoiceResults, with property allocation.
 * Allocation is an array of integers that say whether a candidate is elected (1) or not (0).
 */
export default function allocatedScore({ votes, socialChoiceOptions }) {
    const { scoreVotes, voteFractions } = votes

    const { seats } = socialChoiceOptions

    const nk = scoreVotes[0].length // number of candidates
    const nv = scoreVotes.length // number of votes
    const quota = 1 / seats // fraction of voters in a quota

    const weight = Array(nv).fill(1)
    const allocation = Array(nk).fill(0)

    let nw = 0 // number of winners
    for (let r = 0; r < nk; r++) {
        if (nw >= seats) break

        // Select Winner //
        // add up number of votes for each candidate and choose the one with the most

        const tally = Array(nk).fill(0)
        for (let k = 0; k < nk; k++) {
            if (allocation[k] === 1) continue // no clones
            for (let i = 0; i < nv; i++) {
                tally[k] += weight[i] * voteFractions[i] * scoreVotes[i][k]
            }
        }

        const max = Math.max(...tally)
        const iWinner = tally.indexOf(max)

        allocation[iWinner] = 1
        nw += 1

        // Adjust Weight //

        // sort scores for winner, find indices of sorted scores
        // sort descending
        const iSortVoters = range(nv).sort(
            (a, b) => scoreVotes[b][iWinner] - scoreVotes[a][iWinner],
        )

        // add up to a quota
        // remove weight from votes inside quota
        // sumTop is the sum of the top scores that the winner received.
        let sumTop = 0
        for (let i = 0; i < nv; i++) {
            const index = iSortVoters[i]
            const score = scoreVotes[index][iWinner]
            sumTop += score * weight[index] * voteFractions[i]
            weight[index] = 0 // remove vote
            if (sumTop >= quota) {
                break
            }
        }
        // Todo: deal with when scores are the same.
        // Todo: deal with sumTop not exactly equal to quota.
    }

    const socialChoiceResults = { allocation }
    return socialChoiceResults
}

/** @constant {Object} - an object: this function and descriptions of its name, input, and output */
export const allocatedScoreMetadata = {
    name: 'Allocated Score',
    shortName: 'AllocScore',
    functionName: 'allocatedScore',
    voteCasterName: 'scoreLong', // for input
    socialChoiceType: 'multiWinner',
    elect: allocatedScore,
}
