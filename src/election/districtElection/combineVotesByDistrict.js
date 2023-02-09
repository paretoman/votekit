import { range } from '../../utilities/jsHelpers.js'
import districtPairwiseTallyFractions from './districtPairwiseTallyFractions.js'
import districtRankingTallyFractions from './districtRankingTallyFractions.js'
import districtScoreTallyFractions from './districtScoreTallyFractions.js'
import districtTallyFractions from './districtTallyFractions.js'

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
        if (votesByTract[0][0].preferenceLists !== undefined
            && votesByTract[0][0].preferenceLists.cansByRankList !== undefined) {
            const prefs = districtRankingTallyFractions(votesByTract, cen)
            votes.preferenceTallies = prefs.preferenceTallies
            votes.preferenceLists = prefs.preferenceLists
        }
        if (votesByTract[0][0].preferenceTallies !== undefined
            && votesByTract[0][0].preferenceTallies.scoreVotes !== undefined) {
            const prefs = districtScoreTallyFractions(votesByTract, cen)
            votes.preferenceTallies = prefs.preferenceTallies
            votes.preferenceLists = prefs.preferenceLists
        }
        votes.parties = votesByTract[0][0].parties
        return votes
    })
    return votesByDistrict
}
