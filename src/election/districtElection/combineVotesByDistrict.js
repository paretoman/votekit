import { range } from '../../utilities/jsHelpers.js'
import districtPairwiseTallyFractions from './districtPairwiseTallyFractions.js'
import districtTallyFractions from './districtTallyFractions.js'
import districtPreferenceLists from './districtPreferenceLists.js'
import districtPreferenceTallies from './districtPreferenceTallies.js'

export default function combineVotesByDistrict(votesByTract, canGeoms, districtGeometry) {
    const { census } = districtGeometry.districtMap
    const { nd } = districtGeometry
    const numCans = canGeoms.length

    // Loop through districts.
    // Each district has a census with a list of tracts with weights.
    // The weights indicate what fraction of the tract is in the district.
    // Tracts are listed by index.
    // This is the same index as the votes list uses.
    const votesByDistrict = range(nd).map((iDistrict) => {
        const cen = census[iDistrict]

        const votes = {}

        if (votesByTract[0][0].candidateTallies !== undefined) {
            votes.candidateTallies = districtTallyFractions(votesByTract, cen, numCans)
        }

        if (votesByTract[0][0].pairwiseTallies !== undefined) {
            votes.pairwiseTallies = districtPairwiseTallyFractions(votesByTract, cen, numCans)
        }
        if (votesByTract[0][0].preferenceLists !== undefined) {
            votes.preferenceLists = districtPreferenceLists(votesByTract, cen)
            votes.preferenceTallies = districtPreferenceTallies(votesByTract, cen)
        }
        votes.parties = votesByTract[0][0].parties
        return votes
    })
    return votesByDistrict
}
