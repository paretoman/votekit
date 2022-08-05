/** @module */

import voteCasters from '../castVotes/voteCasters.js'
import { countUnique } from '../utilities/jsHelpers.js'
import SocialChoice from './SocialChoice.js'

/**
 * Here we are in the context of a single election with voter objects and candidate objects.
 * @param {Menu} menu
 * @constructor
 */
export default function Election(menu) {
    const self = this

    self.socialChoice = new SocialChoice(menu)
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

    // TODO: consider more than one party for a candidate.
    const getPartyByCan = (canList) => canList.map((can) => can.party[0])
    self.getParties = (canList) => {
        const partiesByCan = getPartyByCan(canList)
        const numParties = countUnique(partiesByCan)
        const parties = { partiesByCan, numParties }
        return parties
    }

    // Election //

    self.runElectionOne = function (voterShapes, canList, optionCast) {
        const parties = self.getParties(canList)
        const votes = self.castVotes(voterShapes, canList, parties, optionCast)
        const electionResults = self.socialChoice.run(canList, votes, parties)
        return electionResults
    }

    // Voters cast votes for candidates.
    // There is also a separate graphical representation in Voronoi2D.js
    self.castVotes = (voterShapes, canList, parties, optionCast) => {
        const voterGeoms = mapVoters(voterShapes)
        const canGeoms = mapCans(canList)
        const { cast } = voteCasters[self.socialChoice.casterName]
        const votes = cast({
            canGeoms, voterGeoms, dimensions: self.dimensions, optionCast, parties,
        })
        return votes
    }

    self.testVoteE = (voterTest, candidateSimList, optionCast) => {
        const voterShapes = [voterTest]
        const canList = candidateSimList.getCandidates()
        const voterGeom = mapVoters(voterShapes)[0]
        const canGeoms = mapCans(canList)
        const partiesByCan = getPartyByCan(canList)
        const { castTestVote } = voteCasters[self.socialChoice.casterName]
        const vote = castTestVote({
            canGeoms, voterGeom, dimensions: self.dimensions, optionCast, partiesByCan,
        })
        return vote
    }
}
