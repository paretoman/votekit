/** @module */

import voteCasters from '../castVotes/voteCasters.js'
import CountVotes from './CountVotes.js'

/**
 * Here we are in the context of a single election with voter objects and candidate objects.
 * @param {Menu} menu
 * @constructor
 */
export default function Election(menu) {
    const self = this

    self.countVotes = new CountVotes(menu)
    self.dimensions = 1

    self.setDimensions = (d) => { self.dimensions = d }

    // Dimensions //

    /** Get the correct geometry, depending on number of dimensions. */
    const mapVoters = (voterShapes) => {
        if (self.dimensions === 1) {
            return voterShapes.map((vg) => (vg.shape1))
        }
        return voterShapes.map((vg) => (vg.shape2))
    }

    /** Get the correct geometry, depending on number of dimensions. */
    const mapCans = (canList) => {
        if (self.dimensions === 1) {
            return canList.map((can) => (can.shape1))
        }
        return canList.map((can) => (can.shape2))
    }

    // Election //

    self.runElection = function (voterShapes, canList, optionCast) {
        const votes = self.castVotes(voterShapes, canList, optionCast)
        const electionResults = self.countVotes.run(canList, votes)
        return electionResults
    }

    // Voters cast votes for candidates.
    // There is also a separate graphical representation in Voronoi2D.js
    self.castVotes = (voterShapes, canList, optionCast, isTestVoter) => {
        const voterGeom = mapVoters(voterShapes)
        const canGeom = mapCans(canList)
        const voteCaster = voteCasters[self.countVotes.casterName]
        const votes = voteCaster(canGeom, voterGeom, self.dimensions, optionCast, isTestVoter)
        return votes
    }

    self.testVoteE = (voterTest, candidateSimList, optionCast) => {
        const voterShapes = [voterTest]
        const canList = candidateSimList.getCandidates()
        const vote = self.castVotes(voterShapes, canList, optionCast, true)
        return vote
    }
}
