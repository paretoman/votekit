/** @module */

import {
    copyArrayShallow, maxIndex, minIndex, range,
} from '../utilities/jsHelpers.js'

/**
 * Single Transferable Vote
 * @param {Object} votes
 * @param {Number[]} votes.tallyFractions
 * @param {Number[]} votes.tallyFractions
 * @returns {{allocation:number[]}} - socialChoiceResults, with property allocation.
 * Allocation is an array of integers that say how many representatives each party gets.
 */
export default function stv(votes, electionMethodOptions) {
    const { tallyFractions, rankingTallyFractions, cansRankedAll } = votes
    const { seats } = electionMethodOptions

    const nk = tallyFractions.length
    const nr = rankingTallyFractions.length

    if (seats >= nk) {
        // more seats than candidates, so elect all candidates
        const allocation = Array(nk).fill(1)
        const socialChoiceResults = { allocation }
        return socialChoiceResults
    }

    // Candidates must have more votes than quota to be elected, as a fraction of total votes.
    const quota = 1 / (seats + 1)

    // start round
    let resolved = false
    // round (starts at 0)
    let r = 0
    // Count the number of candidates elected
    const elected = []
    // the current tally of first preferences among candidates still remaining
    let tally = copyArrayShallow(tallyFractions)
    // is the candidate still in the running? Alternatively, they have been eliminated.
    const stillIn = Array(nk).fill(true)
    let canInTally = range(nk)
    // Which rank is currently being added to the tally?
    const activeRank = Array(nr).fill(0)
    // What is the weight of each group of voters?
    const weight = Array(nr).fill(1)
    // has the ballot been exhausted?
    const exhausted = Array(nr).fill(false)

    while (!resolved && r < nk) {
        if (r !== 0) {
            // tally top preferences
            tally = Array(nk).fill(0)
            for (let i = 0; i < cansRankedAll.length; i++) {
                if (exhausted[i]) continue
                const ar = activeRank[i]
                const canArs = cansRankedAll[i][ar]
                // candidates in the same rank each get full support
                for (let k = 0; k < canArs.length; k++) {
                    const canAr = canArs[k]
                    tally[canAr] += rankingTallyFractions[i] * weight[i]
                }
            }
            tally = tally.filter((_, i) => stillIn[i])
            canInTally = range(nk).filter((i) => stillIn[i]) // candidate corresponding to tally
        }

        // either eliminate or elect
        const siWinner = maxIndex(tally)
        const iWinner = canInTally[siWinner]
        const votesForWinner = tally[siWinner]
        const elect = votesForWinner >= quota
        let reweight = 1
        let iEliminate
        if (elect) {
            // remove winning candidate
            iEliminate = iWinner

            // reweight and move activeRank forward
            reweight = 1 - quota / votesForWinner

            // is the counting done? Did we elect enough candidates?
            elected.push(iWinner)
            resolved = elected.length === seats
        } else {
            // remove losing candidate
            const siLoser = minIndex(tally)
            const iLoser = canInTally[siLoser]
            iEliminate = iLoser
        }

        // eliminate a candidate and reweight if needed
        stillIn[iEliminate] = false
        for (let i = 0; i < cansRankedAll.length; i++) {
            if (exhausted[i]) continue
            const ar = activeRank[i]
            const canArs = cansRankedAll[i][ar]
            if (canArs.includes(iEliminate)) {
                if (reweight !== 1) {
                    weight[i] *= reweight // reweight if voter selected winner
                }
                // move activeRank forward
                // while the current activeRank is not still in the running
                // and while the ballot is not exhausted
                let moveForward = !exhausted[i]
                while (moveForward) {
                    activeRank[i] += 1
                    const arf = activeRank[i]

                    // is ballot exhausted? then stop counting this ballot.
                    if (arf === nk) {
                        exhausted[i] = true
                        break
                    }

                    const canArfs = cansRankedAll[i][arf]

                    // Only move forward if none of the candidates in this rank are still in.
                    for (let k = 0; k < canArfs.length; k++) {
                        const can = canArfs[k]
                        moveForward = moveForward && !stillIn[can]
                    }
                }
            }
        }

        // increment round
        r += 1
    }

    // sanity check
    // We eliminated all the candidates, r == nk, but didn't get enough winners
    if (!resolved) {
        // eslint-disable-next-line no-console
        console.warn('warning: STV ran over - eliminated all candidates.')
    }

    const allocation = Array(nk).fill(0)
    for (let i = 0; i < elected.length; i++) {
        const iWinner = elected[i]
        allocation[iWinner] += 1
    }
    const socialChoiceResults = { allocation }
    return socialChoiceResults
}
