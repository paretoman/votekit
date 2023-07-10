/** @module */

import socialChoiceMethods from '../socialChoiceMethods/socialChoiceMethods.js'
import makeAllocation from './makeAllocation.js'

export default function socialChoiceRun(votes, electionPhaseOptions) {
    // why have two different kinds of results?
    // socialChoiceResults, the smaller one,
    //   is in the context of the social choice method,
    //   which has tallies go in and analysis come out
    // sequenceResults, the larger one,
    //   is in the context of candidate objects and voter objects.

    const { socialChoiceOptions, socialChoiceMethod } = electionPhaseOptions.phaseOptions
    const socialChoice = socialChoiceMethods[socialChoiceMethod]
    const socialChoiceResults = socialChoice(votes, socialChoiceOptions)
    if (socialChoiceResults.allocation === undefined) {
        socialChoiceResults.allocation = makeAllocation(votes, socialChoiceResults)
    }
    return socialChoiceResults
}
