import { minIndex, randomIndexFromCDF, range } from '../../util/mathHelpers.js'

export default function strategicPlurality(dist2, information, voterStrategy, strategyRngs) {
    if (voterStrategy === undefined) {
        return minIndex(dist2)
    }

    const { strategyCDF, strategy } = voterStrategy
    const idx = randomIndexFromCDF(strategyCDF, strategyRngs[0])
    const { actionName, actionOptions } = strategy[idx]

    if (actionName !== 'lesserEvil') {
        return minIndex(dist2)
    }

    const { mean, radius } = actionOptions.threshold
    const rnd = strategyRngs[1]()
    const threshold = mean + radius * (rnd * 2 - 1)

    // determine closest of the viable candidates
    const { voteFractionsByCan, highestScore } = information.polling
    if (highestScore === undefined) {
        return minIndex(dist2)
    }

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
