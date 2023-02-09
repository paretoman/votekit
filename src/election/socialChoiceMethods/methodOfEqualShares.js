/* eslint-disable max-len */
/** @module */

import { range } from '../../utilities/jsHelpers.js'

/**
 * This method has rounds.
 * groupCost is 1/seats.
 * Add up scores.
 * Divide groupCost by total to get factor to multiply scores by.
 * For each voter, multiply scores by factor to get cost.
 * Subtract cost from budget.
 * If remaining budget is negative, add that amount to the deficit and set budget to 0.
 * Check deficit to see if there is more groupCost to spend.
 * Use this new groupCost like the old groupCost and do the steps above.
 * Do this 10 times. That should be enough, maybe.
 * If there is any deficit remaining, then subtract it from everybody.
 * @param {Object} votes - The object for vote data.
 * @param {Object} votes.preferenceLists - Lists of preferences.
 * @param {Object} votes.preferenceTallies - How many votes have a listed preference.
 * @param {Object[]} votes.preferenceLists.scoreVotes - A list of votes
 * @param {Number[]} votes.preferenceLists.scoreVotes[] - A score for each candidate. From 0 to 1.
 * @param {Object} votes.preferenceTallies.voteFractions - The fraction of the population that voted that way.
 * @param {Object} socialChoiceOptions.seats - Number of candidates to elect.
 * @returns {{allocation:number[]}} - socialChoiceResults, with property allocation.
 * Allocation is an array of integers that say whether a candidate is elected (1) or not (0).
 */
export default function methodOfEqualShares({ votes, socialChoiceOptions }) {
    const { voteFractions } = votes.preferenceTallies
    const { scoreVotes } = votes.preferenceLists

    const { seats } = socialChoiceOptions

    const nk = scoreVotes[0].length // number of candidates
    const nv = scoreVotes.length // number of votes
    const groupCost = 1 / seats // fraction of voters in a groupCost

    const budget = Array(nv).fill(1)
    const allocation = Array(nk).fill(0)

    const winnersByRound = []
    const winnerMaxCostPerScoreByRound = []

    const small = 10 ** -4

    let nw = 0 // number of winners
    for (let r = 0; r < nk; r++) {
        if (nw >= seats) break

        // Select Winner //
        // add up number of votes for each candidate and choose the one with the most

        // import math

        // def leq(a, b):
        //     return a < b or math.isclose(a, b)

        // # N:     a list of voters.
        // # C:     a list of projects (candidates).
        // # cost:  a dictionary that assigns each project its cost.
        // # b:     the total available budget.
        // # u:     a dictionary; u[c][i] is the value that voter i assigns to candidate c.
        // #        an empty entry means that the corresponding value u[c][i] equals 0.

        // def complete_utilitarian(N, C, cost, u, b, W):
        //     util = {c: sum([u[c][i] for i in N]) for c in C}
        //     committee_cost = sum([cost[c] for c in W])
        //     while True:
        //         next_candidate = None
        //         highest_util = float("-inf")
        //         for c in C.difference(W):
        //             if leq(committee_cost + cost[c], b):
        //                 if util[c] / cost[c] > highest_util:
        //                     next_candidate = c
        //                     highest_util = util[c] / cost[c]
        //         if next_candidate is None:
        //             break
        //         W.add(next_candidate)
        //         committee_cost += cost[next_candidate]
        //     return W

        // def method_of_equal_shares(N, C, cost, u, b):
        //     W = set()
        //     total_utility = {c: sum(u[c].values()) for c in C}

        const tally = Array(nk).fill(0)
        for (let k = 0; k < nk; k++) {
            if (allocation[k] === 1) continue // no clones
            for (let i = 0; i < nv; i++) {
                tally[k] += voteFractions[i] * scoreVotes[i][k]
            }
        }

        // put candidate indices in descending order from most points to least
        const cansSorted = range(nk).sort((a, b) => tally[b] - tally[a])

        // Sort the voters so we can add one voter at a time.
        // Each voter has a maximum costPerScore that is within their budget.
        // Start with the voter with the smallest maxCostPerScore,
        // and calculate how much voters will spend if they all pay that costPerScore.

        //     supporters = {c: set([i for i in N if u[c][i] > 0]) for c in C}
        //     budget = {i: b / len(N) for i in N}
        //     while True:
        //         next_candidate = None
        let bestCandidate = null
        //         lowest_rho = float("inf")
        let lowestMaxCostPerScore = Infinity
        //         for c in C.difference(W):
        //             if leq(cost[c], sum([budget[i] for i in supporters[c]])):

        for (let k = 0; k < nk; k++) {
            const can = cansSorted[k]

            if (allocation[can] === 1) continue // no clones

            // check if candidate's lowest possible costPerScore is smaller than current lowest

            // See if this candidate is within every voter's budget.
            const groupCostPerScore = groupCost / tally[can]
            let withinBudget = true
            for (let i = 0; i < nv; i++) {
                const score = scoreVotes[i][can]
                if (budget[i] < groupCostPerScore * score) {
                    withinBudget = false
                    break
                }
            }

            // If the candidate is within every voter's budget, then select the candidate.
            if (withinBudget && groupCostPerScore < lowestMaxCostPerScore) {
                lowestMaxCostPerScore = groupCostPerScore
                bestCandidate = can
                break
            }

            // If the candidate is outside of some voter's budget,
            // then there might be a better choice of candidate.
            // We will have to do the more complex process of "masking"
            // the scores within the budget.

            //                 supporters_sorted = sorted(supporters[c], key=lambda i: budget[i] / u[c][i])

            const maxCostPerScore = []
            let totalBudget = 0
            const supporters = []
            for (let i = 0, j = 0; i < nv; i++) {
                const bud = budget[i]
                const score = scoreVotes[i][can]
                maxCostPerScore[i] = bud / score
                if (score > 0) {
                    totalBudget += bud * voteFractions[i]
                    supporters[j] = i
                    j += 1
                }
            }

            // is there room in the budget for this candidate?
            // within rounding error
            if (totalBudget + small - groupCost < 0) {
                continue
            }

            // ascending order
            const supportersSorted = supporters.sort((a, b) => maxCostPerScore[a] - maxCostPerScore[b])
            const ns = supportersSorted.length
            //                 price = cost[c]
            let costLeft = groupCost
            //                 util = total_utility[c]
            let scoreLeft = tally[can]
            //                 for i in supporters_sorted:

            // increase the max cost per score until the cost is met
            let curMaxCostPerScore = null
            for (let j = 0; j < ns; j++) {
                const i = supportersSorted[j]
                //                     if leq(price * u[c][i], budget[i] * util):
                //                         break
                //                     price -= budget[i]
                //                     util -= u[c][i]

                // maxCostPerScore = budget / score   for each voter
                // console.log({costLeft,scoreLeft,maxCostPerScore[i]})
                curMaxCostPerScore = maxCostPerScore[i]
                if (costLeft < scoreLeft * curMaxCostPerScore) {
                    break
                }
                // remove voter
                costLeft -= voteFractions[i] * budget[i]
                scoreLeft -= voteFractions[i] * scoreVotes[i][can]
                // if (scoreLeft < 0) {
                //     console.log(Math.round(scoreLeft * 100))
                // }
            }
            // console.log(scoreLeft)
            //                 rho = price / util \
            //                         if not math.isclose(util, 0) and not math.isclose(price, 0) \
            //                         else budget[supporters_sorted[-1]] / u[c][supporters_sorted[-1]]

            // get a more accurate estimate, possibly, if there isn't an issue of rounding error
            if (costLeft > small && scoreLeft > small) {
                curMaxCostPerScore = costLeft / scoreLeft
            }
            // const curMaxCostPerScore = (nearZero(scoreLeft) || nearZero(costLeft))
            //     ? budget[supportersSorted[ns - 1]] / scoreVotes[supportersSorted[ns - 1]][can]
            //     : costLeft / scoreLeft

            // const maxCostPerScore = price / util
            //                 if rho < lowest_rho:
            //                     next_candidate = c
            //                     lowest_rho = rho
            if (curMaxCostPerScore < lowestMaxCostPerScore) {
                bestCandidate = can
                lowestMaxCostPerScore = curMaxCostPerScore
            }
        }

        // If no candidate is within the budget,
        // pick the candidate with the highest score,
        // and keep going until we have all the candidates selected.
        if (bestCandidate === null) {
            for (let k = 0; k < nk; k++) {
                const can = cansSorted[k]

                if (allocation[can] === 1) continue // no clones

                allocation[can] = 1
                nw += 1
                if (nw >= seats) break
            }
            break
        }

        //         if next_candidate is None:
        //             break
        //         W.add(next_candidate)
        allocation[bestCandidate] = 1
        nw += 1
        winnersByRound[r] = bestCandidate
        winnerMaxCostPerScoreByRound[r] = lowestMaxCostPerScore

        //         for i in N:
        //             budget[i] -= min(budget[i], lowest_rho * u[next_candidate][i])
        // console.log(lowestMaxCostPerScore)
        for (let i = 0; i < nv; i++) {
            const score = scoreVotes[i][bestCandidate]
            const cost = lowestMaxCostPerScore * score
            budget[i] = Math.max(0, budget[i] - cost)
        }
        //     return complete_utilitarian(N, C, cost, u, b, W)  # one of the possible completions
    }

    const explanation = { winnersByRound, winnerMaxCostPerScoreByRound, socialChoiceOptions }
    const socialChoiceResults = { allocation, explanation }
    return socialChoiceResults
}

// function nearZero(a) {
//     return Math.abs(a) < 10 ** -7
// }

/** @constant {Object} - an object: this function and descriptions of its name, input, and output */
export const methodOfEqualSharesMetadata = {
    name: 'Method of Equal Shares',
    shortName: 'MES',
    functionName: 'methodOfEqualShares',
    voteCasterName: 'scoreFull', // for input
    socialChoiceType: 'multiWinner',
    elect: methodOfEqualShares,
}
