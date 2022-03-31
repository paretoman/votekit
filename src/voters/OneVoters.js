/** @module */

import SimVoterList from './SimVoterList.js'

/**
 * OneVoters inherits from SimVoterList. It isn't used right now.
 * @constructor
 */
export default function OneVoters(sim) {
    const self = this

    SimVoterList.call(self, sim)
}
