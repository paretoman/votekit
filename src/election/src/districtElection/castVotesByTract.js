import voteCasters from '../voteCasters/voteCasters/voteCasters.js'
import getCanBorders from '../voteCasters/voteCasters/getCanBorders.js'

export default function castVotesByTract(geometry0, electionOptions) {
    const { castOptions, voteCasterName } = electionOptions
    const {
        canGeoms, parties, dimensions, districtGeometry,
    } = geometry0
    const { voterGeomsByTract } = districtGeometry

    const votesByTract = voterGeomsByTract.map(
        (row) => row.map(
            (voterGeoms) => {
                const geometry = {
                    voterGeoms, canGeoms, parties, dimensions,
                }
                geometry.canBorders = getCanBorders(geometry, electionOptions)
                return voteCasters[voteCasterName].cast(geometry, castOptions)
            },
        ),
    )
    return votesByTract
}
