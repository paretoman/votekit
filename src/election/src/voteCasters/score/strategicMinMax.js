import { minMax, randomIndexFromCDF } from '../../util/mathHelpers.js'

/**
 * Decide how close a candidate needs to be to get the max score. Similar for min.
 * @param {number[]} dist
 * @param {object} information
 * @param {object} voterStrategy
 * @param {function} strategyRngs
 * @returns {number[]} [min, max]
 */
export default function strategicMinMax(dist, information, voterStrategy, strategyRngs) {
    if (voterStrategy === undefined) {
        return minMax(dist)
    }

    const { strategyCDF, strategy } = voterStrategy
    const idx = randomIndexFromCDF(strategyCDF, strategyRngs[0])
    const { actionName, actionOptions } = strategy[idx]

    if (actionName !== 'normalizeOverFrontrunners') {
        return minMax(dist)
    }

    const { mean, radius } = actionOptions.threshold
    const rnd = strategyRngs[1]()
    const threshold = mean + radius * (rnd * 2 - 1)

    // determine closest and furthest of the viable candidates
    const { scoreFractionAverageByCan, highestScore } = information.polling
    if (highestScore === undefined) {
        return minMax(dist)
    }

    const scoreThreshold = threshold * highestScore
    const distViable = dist.filter((d, i) => scoreFractionAverageByCan[i] >= scoreThreshold)

    if (distViable.length <= 1) {
        return minMax(dist)
    }

    return minMax(distViable)
}
