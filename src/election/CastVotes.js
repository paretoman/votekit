import voteCasters from '../castVotes/voteCasters.js'

/**
 * Voters cast votes for candidates.
 * @param {Menu} menu - add to menu options
 */
export default function CastVotes(menu, socialChoice, simOptions) {
    const self = this

    self.run = (voterShapes, canList, parties, simCastOptions) => {
        const { dimensions } = simOptions
        const voterGeoms = getGeoms(voterShapes, dimensions)
        const canGeoms = getGeoms(canList, dimensions)
        const { cast } = voteCasters[socialChoice.casterName]
        const votes = cast({
            canGeoms, voterGeoms, dimensions, simCastOptions, parties,
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
        const { castTestVote } = voteCasters[socialChoice.casterName]
        const vote = castTestVote({
            canGeoms, voterGeom, dimensions, partiesByCan,
        })
        return vote
    }

    function getGeoms(entities, dimensions) {
        if (dimensions === 1) {
            return entities.map((ent) => (ent.shape1))
        }
        return entities.map((ent) => (ent.shape2))
    }

    // TODO: consider more than one party for a candidate.
    function getPartyByCan(canList) { return canList.map((can) => can.party[0]) }
}
