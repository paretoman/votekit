import voteCasters from '../castVotes/voteCasters.js'
import getGeoms from '../entities.js/getGeoms.js'

export default function castVotesByTract(geometry, electionOptions) {
    const { castOptions } = electionOptions
    const {
        canGeoms, parties, dimensions, voterGeo,
    } = geometry
    const { voterGroupsByTract } = voterGeo

    const votesByTract = voterGroupsByTract.map(
        (row) => row.map(
            (voterGroups) => {
                const voterGeoms = getGeoms(voterGroups, dimensions)
                const tractGeometry = {
                    voterGeoms, canGeoms, parties, dimensions, voterGeo,
                }
                return voteCasters[electionOptions.voteCasterName].cast(tractGeometry, castOptions)
            },
        ),
    )
    return votesByTract
}
