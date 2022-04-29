/** @module */

import castVotes from '../castVotes/castVotes.js'
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
        const voterGeom = mapVoters(voterShapes)
        const canGeom = mapCans(canList)
        const casterFun = castVotes[self.countVotes.caster]
        const votes = casterFun(canGeom, voterGeom, self.dimensions, optionCast)
        const electionResults = self.countVotes.run(canList, votes)
        return electionResults
    }

    // Voters cast votes for candidates.
    // There is also a separate graphical representation in Voronoi2D.js
    self.castVotes = (voterSimList, candidateSimList, optionCast) => {
        const voterShapes = voterSimList.getVoterShapes()
        const canList = candidateSimList.getCandidates()
        const voterGeom = mapVoters(voterShapes)
        const canGeom = mapCans(canList)
        const casterFun = castVotes[self.countVotes.caster]
        const votes = casterFun(canGeom, voterGeom, self.dimensions, optionCast)
        return votes
    }

    self.testVote = (voterTest, candidateSimList, optionCast) => {
        const voterShapes = [voterTest]
        const canList = candidateSimList.getCandidates()
        const voterGeom = mapVoters(voterShapes)
        const canGeom = mapCans(canList)
        const casterFun = castVotes[self.countVotes.caster]
        const vote = casterFun(canGeom, voterGeom, self.dimensions, optionCast, true)
        return vote
    }
}
