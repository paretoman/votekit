import voteCasters from '../castVotes/voteCasters.js'
import getGeoms from '../entities.js/getGeoms.js'

export default function castVotesByTract(geometry, electionOptions) {
    const { castOptions } = electionOptions
    const {
        canGeoms, parties, dimensions, voterDistricts,
    } = geometry
    const { voterGroupsByTract } = voterDistricts

    const votesByTract = voterGroupsByTract.map(
        (row) => row.map(
            (voterGroups) => {
                const voterGeoms = getGeoms(voterGroups, dimensions)
                const tractGeometry = {
                    voterGeoms, canGeoms, parties, dimensions, voterDistricts,
                }
                return voteCasters[electionOptions.voteCasterName].cast(tractGeometry, castOptions)
            },
        ),
    )
    return votesByTract
}