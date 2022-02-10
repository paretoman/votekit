/** @module */

import ElectionMethod from './ElectionMethod.js'
import castVotes from '../castVotes/castVotes.js'

/**
 * An election with many districts.
 * Voters are from many groups.
 * Voter groups are centered around a point.
 * The point is moved by simplex noise to create distinct districts.
 * All the voter groups share the same voter basis.
 * @param {Menu} menu
 * @param {Election} election
 */
export default function GeoElection(menu) {
    const self = this

    const voterBasisSet = []
    const candidates = []
    self.method = new ElectionMethod(candidates, menu)

    self.newVoterBasis = function (voterBasis) {
        voterBasisSet.push(voterBasis)
    }

    self.newCandidate = function (can) {
        candidates.push(can)
    }

    // Temporary function for showing tallies
    // Right now, just one district and just one voterCenter.
    self.updateTallies = function () {
        // only update the tallies for each candidate so they can be shown

        // Voters cast votes for candidates.
        const votes = castVotes.pluralityBallot(candidates, voterBasisSet)

        candidates.forEach((can, index) => {
            const fraction = votes.tallyFractions[index]
            can.setFraction(fraction)
        })
    }
    // for each district
    // clear old voter groups
    // make a set of voter groups,
    // but these will be different than regular voter groups because we won't be able to drag them.
    // election.newVoterGroup
    // make a set of candidates
}
