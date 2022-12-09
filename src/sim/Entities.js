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
export default function Entities(menu, changes, commander, layout) {
    const self = this

    // Entities //
    self.candidateList = new CandidateList(layout, changes, commander, self)
    self.voterShapeList = new VoterShapeList(layout, changes, commander, self)
    self.candidateDnList = new CandidateDnList(layout, changes, commander, self)
}
