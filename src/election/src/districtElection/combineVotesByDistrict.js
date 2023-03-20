import { range } from '../election/mathHelpers.js'
import districtPairwiseTallies from './districtPairwiseTallies.js'
import districtCandidateTallies from './districtCandidateTallies.js'
import districtPreferenceLists from './districtPreferenceLists.js'
import districtPreferenceTallies from './districtPreferenceTallies.js'

export default function combineVotesByDistrict(votesByTract, canPoints, geography) {
    const { census } = geography
    const { nd } = geography.districtMap
    const numCans = canPoints.length

    // Loop through districts.
    // Each district has a census with a list of tracts with weights.
    // The weights indicate what fraction of the tract is in the district.
    // Tracts are listed by index.
    // This is the same index as the votes list uses.
    const votesByDistrict = range(nd).map((iDistrict) => {
        const cen = census[iDistrict]

        const votes = {}

        if (votesByTract[0][0].candidateTallies !== undefined) {
            votes.candidateTallies = districtCandidateTallies(votesByTract, cen, numCans)
        }

        if (votesByTract[0][0].pairwiseTallies !== undefined) {
            votes.pairwiseTallies = districtPairwiseTallies(votesByTract, cen, numCans)
        }
        if (votesByTract[0][0].preferenceLists !== undefined) {
            votes.preferenceLists = districtPreferenceLists(votesByTract, cen)
            votes.preferenceTallies = districtPreferenceTallies(votesByTract, cen)
        }
        votes.parties = votesByTract[0][0].parties
        votes.numCans = numCans
        return votes
    })
    return votesByDistrict
}
