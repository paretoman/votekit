/** @module */

import castVotes from '../castVotes/castVotes.js'
import ElectionMethod from './ElectionMethod.js'

/**
 * Here we are in the context of a single election with voter objects and candidate objects.
 * @param {Menu} menu
 * @constructor
 */
export default function Election(menu) {
    const self = this

    self.method = new ElectionMethod(menu)
    self.dimensions = 1

    self.setDimensions = (d) => { self.dimensions = d }

    // Dimensions //

    /** Get the correct geometry, depending on dimension. */
    const mapVoters = (voterGroups) => {
        if (self.dimensions === 1) {
            return voterGroups.map((vg) => (vg.shape1))
        }
        return voterGroups.map((vg) => (vg.shape2))
    }

    /** Get the correct geometry, depending on dimension. */
    const mapCans = (canList) => {
        if (self.dimensions === 1) {
            return canList.map((can) => (can.shape1))
        }
        return canList.map((can) => (can.shape2))
    }

    // Election //

    self.runElection = function (voterGroups, canList) {
        const voterGeom = mapVoters(voterGroups)
        const canGeom = mapCans(canList)
        const votes = castVotes.pluralityBallot(canGeom, voterGeom, self.dimensions)
        const methodResults = self.method.run(canList, votes)
        const electionResults = { ...methodResults, votes }
        return electionResults
    }

    // Voters cast votes for candidates.
    // There is also a separate graphical representation in Voronoi2D.js
    self.castVotes = (voters, candidates) => {
        const voterGroups = voters.getVoterGroups()
        const canList = candidates.getCandidates()
        const voterGeom = mapVoters(voterGroups)
        const canGeom = mapCans(canList)
        const votes = castVotes.pluralityBallot(canGeom, voterGeom, self.dimensions)
        return votes
    }

    self.testVote = (testVoter, candidates) => {
        const voterGroups = [testVoter]
        const canList = candidates.getCandidates()
        const voterGeom = mapVoters(voterGroups)
        const canGeom = mapCans(canList)
        const vote = castVotes.pluralityBallot(canGeom, voterGeom, self.dimensions, true)
        return vote
    }
}
