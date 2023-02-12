import voteCasters from '../voteCasters/voteCasters/voteCasters.js'
import getCanBorders from '../voteCasters/voteCasters/getCanBorders.js'

export default function castVotesByTract(geometry0, electionOptions) {
    const { castOptions, voteCasterName } = electionOptions
    const { canGeoms, parties, dimensions, geography } = geometry0
    const { voterGeomsByTract } = geography

    const voterGeoms00 = voterGeomsByTract[0][0]
    const canBorders = getCanBorders(canGeoms, voterGeoms00, dimensions, electionOptions)

    const votesByTract = voterGeomsByTract.map(
        (row) => row.map(
            (voterGeoms) => {
                const geometry = { voterGeoms, canGeoms, parties, dimensions, canBorders }
                return voteCasters[voteCasterName].cast(geometry, castOptions)
            },
        ),
    )
    return votesByTract
}
