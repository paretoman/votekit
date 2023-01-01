/** @module */

import electionMethods from '../electionMethods/electionMethods.js'

/**
 * Store settings and functions that deal with the election method.
 * The difference between SocialChoice and Election is that
 * Election encompasses all concepts of an election such as casting a vote
 * or the number of dimensions,
 * while SocialChoice just considers the votes and the result of the election method.
 * Then SocialChoice returns a summary of how the election went.
 * @param {Menu} menu
 * @constructor
 */
export default function SocialChoice(electionOptions, socialChoiceOptions) {
    const self = this

    self.seats = 1

    self.run = (canList, votes, parties) => {
        // why have two different kinds of results?
        // socialChoiceResults, the smaller one,
        //   is in the context of the election method,
        //   which has tallies go in and analysis come out
        // electionResults, the larger one,
        //   is in the context of candidate objects and voter objects.
        const colorRGBAOfCandidates = canList.map((c) => c.colorRGBA)
        if (electionOptions.electionType === 'allocation' || electionOptions.electionType === 'multiWinner') {
            const electionMethodOptions = socialChoiceOptions
            const electionMethod = electionMethods[electionOptions.electionMethod]
            const socialChoiceResults = electionMethod({ votes, parties, electionMethodOptions })
            const { allocation, explanation } = socialChoiceResults
            const electionResults = {
                allocation, explanation, canList, votes, colorRGBAOfCandidates,
            }
            return electionResults
        }
        const electionMethod = electionMethods[electionOptions.electionMethod]
        const socialChoiceResults = electionMethod({ votes, parties })
        const { iWinner } = socialChoiceResults
        const winner = canList[iWinner]
        const electionResults = {
            iWinner, winner, votes, colorRGBAOfCandidates,
        }
        return electionResults
    }
}
