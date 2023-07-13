import voteCasters from '../voteCasters/voteCasters/voteCasters.js'
import getCanBorders from '../voteCasters/voteCasters/getCanBorders.js'

export default function castVotesByTract(geometry0, electionOptions) {
    const { castOptions } = electionOptions
    const { canPoints, parties, dimensions, geography, strategySeed, voterStrategyList, information } = geometry0
    const { voterGeomsByTract } = geography

    const voterGeoms00 = voterGeomsByTract[0][0]
    const { voteCasterName } = electionOptions
    const canBorders = getCanBorders(canPoints, voterGeoms00, dimensions, voteCasterName)

    const votesByTract = voterGeomsByTract.map(
        (row) => row.map(
            (voterGeoms) => {
                const geometry = { voterGeoms, canPoints, parties, dimensions, canBorders, strategySeed, voterStrategyList, information }
                return voteCasters[voteCasterName].cast(geometry, castOptions)
            },
        ),
    )
    return votesByTract
}
