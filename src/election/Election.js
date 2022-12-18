/** @module */

import jupyterUpdate from '../environments/jupyter.js'
import SocialChoice from './SocialChoice.js'
import CastVotes from './CastVotes.js'

/**
 * Here we are in the context of a single election with voter objects and candidate objects.
 * @param {Menu} menu
 * @constructor
 */
export default function Election(menu) {
    const self = this

    self.socialChoice = new SocialChoice(menu)
    self.castVotes = new CastVotes(menu, self.socialChoice)

    // Election //

    self.runElection = function (voterShapes, canList, optionCast) {
        const parties = self.getParties(canList)
        const votes = self.castVotes.run(voterShapes, canList, parties, optionCast)
        const electionResults = self.socialChoice.run(canList, votes, parties)
        jupyterUpdate({ votes })
        return electionResults
    }

    self.getParties = (canList) => {
        const partiesByCan = getPartyByCan(canList)
        // TODO: figure out how to vary the number of parties, allow skipping etc.
        const numParties = 10
        const parties = { partiesByCan, numParties }
        return parties
    }

    // TODO: consider more than one party for a candidate.
    function getPartyByCan(canList) { return canList.map((can) => can.party[0]) }
}
