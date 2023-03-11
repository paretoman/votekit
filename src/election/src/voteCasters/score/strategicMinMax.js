import { minMax, randomIndexFromCDF } from '../../election/mathHelpers.js'

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

    const { actionCDF, actionList } = voterStrategy
    const idx = randomIndexFromCDF(actionCDF, strategyRngs[0])
    const { actionName, actionOptions } = actionList[idx]

    if (actionName !== 'normalizeOverFrontrunners') {
        return minMax(dist)
    }

    const { mean, radius } = actionOptions.threshold
    const rnd = strategyRngs[1]()
    const threshold = mean + radius * (rnd * 2 - 1)

    // determine closest and furthest of the viable candidates
    const { electionResultsList } = information
    if (electionResultsList.length === 0) {
        return minMax(dist)
    }
    const { scoreFractionAverageByCan } = electionResultsList[electionResultsList.length - 1].votes.candidateTallies
    const { highestScore } = information.polling

    const scoreThreshold = threshold * highestScore
    const distViable = dist.filter((d, i) => scoreFractionAverageByCan[i] >= scoreThreshold)

    if (distViable.length <= 1) {
        return minMax(dist)
    }

    return minMax(distViable)
}
