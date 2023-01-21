import voteCasters from '../voteCasters/voteCasters.js'
import getGeoms from '../../sim/entities/getGeoms.js'

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
