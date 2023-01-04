/** @module */

import jupyterUpdate from '../environments/jupyter.js'
import SocialChoice from './SocialChoice.js'
import voteCasters from '../castVotes/voteCasters.js'

/**
 * Here we are in the context of a single election with voter objects and candidate objects.
 * @param {Menu} menu
 * @constructor
 */
export default function Election(electionOptions) {
    const self = this

    self.socialChoice = new SocialChoice(electionOptions)

    // Election //

    self.runElection = function (geometry) {
        const { castOptions, socialChoiceOptions } = electionOptions

        const votes = voteCasters[electionOptions.voteCasterName].cast(geometry, castOptions)
        const { parties } = geometry
        const electionResults = self.socialChoice.run(votes, parties, socialChoiceOptions)
        jupyterUpdate({ votes })
        return electionResults
    }
}
