/** @module */

import getCanBorders from '../voteCasters/voteCasters/getCanBorders.js'
import voteCasters from '../voteCasters/voteCasters/voteCasters.js'
import socialChoiceRun from './socialChoiceRun.js'

/**
 * Here we are in the context of a single election.
 */
export default function election(geometry, electionPhaseOptions) {
    const { castOptions } = electionPhaseOptions

    const { voteCasterName } = electionPhaseOptions.phaseOptions
    const { canPoints, voterGeoms, dimensions } = geometry

    const geometry2 = { ...geometry }
    const canBorders = getCanBorders(canPoints, voterGeoms, dimensions, voteCasterName)
    geometry2.canBorders = canBorders

    const votes = voteCasters[voteCasterName].cast(geometry2, castOptions)
    const socialChoiceResults = socialChoiceRun(votes, electionPhaseOptions)
    const sequenceResults = {
        electionPhaseOptions, geometry, votes, socialChoiceResults,
    }
    return sequenceResults
}
