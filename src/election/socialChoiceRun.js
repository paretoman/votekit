/** @module */

import electionMethods from '../electionMethods/electionMethods.js'

export default function socialChoiceRun(votes, electionOptions) {
    // why have two different kinds of results?
    // socialChoiceResults, the smaller one,
    //   is in the context of the election method,
    //   which has tallies go in and analysis come out
    // electionResults, the larger one,
    //   is in the context of candidate objects and voter objects.

    const { socialChoiceOptions } = electionOptions
    const electionMethodOptions = socialChoiceOptions
    const electionMethod = electionMethods[electionOptions.electionMethod]
    const electionResults = electionMethod({ votes, electionMethodOptions })
    electionResults.votes = votes
    return electionResults
}
