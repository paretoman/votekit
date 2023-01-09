/** @module */
import VoterShapeList from '../voters/VoterShapeList.js'
import CandidateList from '../candidates/CandidateList.js'
import CandidateDnList from '../candidateDns/CandidateDnList.js'

/**
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Commander} commander
 * @param {Layout} layout
 */
export default function Entities(changes, commander) {
    const self = this

    // Entities //
    self.candidateList = new CandidateList(changes, commander, self)
    self.voterShapeList = new VoterShapeList(changes, commander, self)
    self.candidateDnList = new CandidateDnList(changes, commander, self)
}
