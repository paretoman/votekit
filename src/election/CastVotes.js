import voteCasters from '../castVotes/voteCasters.js'
import getGeoms from '../entities.js/getGeoms.js'

/**
 * Voters cast votes for candidates.
 * @param {Menu} menu - add to menu options
 */
export default function CastVotes(electionOptions, simOptions) {
    const self = this

    self.run = (geometry, castOptions) => {
        const { voterGeoms, canGeoms, parties } = geometry
        const { dimensions } = simOptions
        const { cast } = voteCasters[electionOptions.voteCasterName]
        const votes = cast({
            canGeoms, voterGeoms, dimensions, castOptions, parties,
        })
        return votes
    }

    self.runTest = (voterTest, candidateList) => {
        const { dimensions } = simOptions
        const voterShapes = [voterTest]
        const canList = candidateList.getCandidates()
        const voterGeom = getGeoms(voterShapes, dimensions)[0]
        const canGeoms = getGeoms(canList, dimensions)
        const partiesByCan = getPartyByCan(canList)
        const { castTestVote } = voteCasters[electionOptions.voteCasterName]
        const vote = castTestVote({
            canGeoms, voterGeom, dimensions, partiesByCan,
        })
        return vote
    }

    // TODO: consider more than one party for a candidate.
    function getPartyByCan(canList) { return canList.map((can) => can.party[0]) }
}
