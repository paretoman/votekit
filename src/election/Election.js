/** @module */

import jupyterUpdate from '../environments/jupyter.js'
import voteCasters from '../castVotes/voteCasters.js'
import socialChoiceRun from './socialChoiceRun.js'

/**
 * Here we are in the context of a single election with voter objects and candidate objects.
 * @param {Menu} menu
 * @constructor
 */
export default function Election(electionOptions) {
    const self = this

    // Election //

    self.runElection = function (geometry) {
        const { canGeoms, voterGeoms } = geometry
        if (voterGeoms.length === 0) return { error: 'No Voters' }
        if (canGeoms.length === 0) return { error: 'No Candidates' }

        const { castOptions } = electionOptions

        const votes = voteCasters[electionOptions.voteCasterName].cast(geometry, castOptions)
        const { parties } = geometry
        const electionResults = socialChoiceRun(votes, parties, electionOptions)
        jupyterUpdate({ votes })
        return electionResults
    }
}
