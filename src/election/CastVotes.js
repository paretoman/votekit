import voteCasters from '../castVotes/voteCasters.js'

/**
 * Voters cast votes for candidates.
 * @param {Menu} menu - add to menu options
 */
export default function CastVotes(electionOptions) {
    const self = this

    self.run = (geometry, castOptions) => {
        const {
            voterGeoms, canGeoms, parties, dimensions,
        } = geometry
        const { cast } = voteCasters[electionOptions.voteCasterName]
        const votes = cast({
            canGeoms, voterGeoms, dimensions, castOptions, parties,
        })
        return votes
    }

    self.runTest = (geometry) => {
        const { castTestVote } = voteCasters[electionOptions.voteCasterName]
        const vote = castTestVote(geometry)
        return vote
    }
}
