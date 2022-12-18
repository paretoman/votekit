import voteCasters from '../castVotes/voteCasters.js'
import CastOptions from './CastOptions.js'

/**
 * Voters cast votes for candidates.
 * @param {Menu} menu - add to menu options
 */
export default function CastVotes(menu, socialChoice) {
    const self = this

    self.options = new CastOptions(menu)

    self.run = (voterShapes, canList, parties, optionCast) => {
        const voterGeoms = getGeoms(voterShapes)
        const canGeoms = getGeoms(canList)
        const { cast } = voteCasters[socialChoice.casterName]
        const votes = cast({
            canGeoms, voterGeoms, dimensions: self.options.dimensions, optionCast, parties,
        })
        return votes
    }

    self.runTest = (voterTest, candidateList, optionCast) => {
        const voterShapes = [voterTest]
        const canList = candidateList.getCandidates()
        const voterGeom = getGeoms(voterShapes)[0]
        const canGeoms = getGeoms(canList)
        const partiesByCan = getPartyByCan(canList)
        const { castTestVote } = voteCasters[socialChoice.casterName]
        const vote = castTestVote({
            canGeoms, voterGeom, dimensions: self.options.dimensions, optionCast, partiesByCan,
        })
        return vote
    }

    function getGeoms(entities) {
        if (self.options.dimensions === 1) {
            return entities.map((ent) => (ent.shape1))
        }
        return entities.map((ent) => (ent.shape2))
    }

    // TODO: consider more than one party for a candidate.
    function getPartyByCan(canList) { return canList.map((can) => can.party[0]) }
}
