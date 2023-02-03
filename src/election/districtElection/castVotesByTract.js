import voteCasters from '../voteCasters/voteCasters.js'
import getGeoms from '../../sim/entities/getGeoms.js'

export default function castVotesByTract(geometry0, electionOptions) {
    const { castOptions, voteCasterName } = electionOptions
    const {
        canGeoms, parties, dimensions, districtGeometry,
    } = geometry0
    const { voterGroupsByTract } = districtGeometry

    const votesByTract = voterGroupsByTract.map(
        (row) => row.map(
            (voterGroups) => {
                const voterGeoms = getGeoms(voterGroups, dimensions)
                const geometry = {
                    voterGeoms, canGeoms, parties, dimensions,
                }
                return voteCasters[voteCasterName].cast(geometry, castOptions)
            },
        ),
    )
    return votesByTract
}
