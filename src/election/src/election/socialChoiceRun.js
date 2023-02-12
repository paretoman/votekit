/** @module */

import socialChoiceMethods from '../socialChoiceMethods/socialChoiceMethods.js'

export default function socialChoiceRun(votes, electionOptions) {
    // why have two different kinds of results?
    // socialChoiceResults, the smaller one,
    //   is in the context of the social choice method,
    //   which has tallies go in and analysis come out
    // electionResults, the larger one,
    //   is in the context of candidate objects and voter objects.

    const { socialChoiceOptions } = electionOptions
    const socialChoiceMethod = socialChoiceMethods[electionOptions.socialChoiceMethod]
    const socialChoiceResults = socialChoiceMethod({ votes, socialChoiceOptions })
    return socialChoiceResults
}
