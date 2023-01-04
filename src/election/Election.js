/** @module */

import jupyterUpdate from '../environments/jupyter.js'
import SocialChoice from './SocialChoice.js'
import CastVotes from './CastVotes.js'

/**
 * Here we are in the context of a single election with voter objects and candidate objects.
 * @param {Menu} menu
 * @constructor
 */
export default function Election(electionOptions) {
    const self = this

    self.socialChoice = new SocialChoice(electionOptions)

    self.castVotes = new CastVotes(electionOptions)

    // Election //

    self.runElection = function (geometry) {
        const { castOptions, socialChoiceOptions } = electionOptions

        const votes = self.castVotes.run(geometry, castOptions)
        const { parties } = geometry
        const electionResults = self.socialChoice.run(votes, parties, socialChoiceOptions)
        jupyterUpdate({ votes })
        return electionResults
    }
}
