import { minIndex, randomIndexFromCDF, range } from '../../election/mathHelpers.js'

export default function strategicPlurality(dist2, information, voterStrategy, strategyRngs) {
    if (voterStrategy === undefined) {
        return minIndex(dist2)
    }

    const { actionCDF, actionList } = voterStrategy
    const idx = randomIndexFromCDF(actionCDF, strategyRngs[0])
    const { actionName, actionOptions } = actionList[idx]

    if (actionName !== 'lesserEvil') {
        return minIndex(dist2)
    }

    const { mean, radius } = actionOptions.threshold
    const rnd = strategyRngs[1]()
    const threshold = mean + radius * (rnd * 2 - 1)

    // determine closest of the viable candidates
    const { electionResultsList } = information
    if (electionResultsList.length === 0) {
        return minIndex(dist2)
    }
    const { voteFractionsByCan } = electionResultsList[electionResultsList.length - 1].votes.candidateTallies
    const { highestScore } = information.polling

    const scoreThreshold = threshold * highestScore
    const indexViable = range(dist2.length).filter((i) => voteFractionsByCan[i] >= scoreThreshold)
    const dist2Viable = dist2.filter((d, i) => voteFractionsByCan[i] >= scoreThreshold)

    if (dist2Viable.length <= 1) {
        return minIndex(dist2)
    }

    const minIndexViable = minIndex(dist2Viable)
    const minIdx = indexViable[minIndexViable]
    return minIdx
}
