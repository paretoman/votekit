import { range } from '../../utilities/jsHelpers.js'

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
        if (votesByTract[0][0].preferenceTallies !== undefined
            && votesByTract[0][0].preferenceTallies.cansByRankList !== undefined) {
            votes.preferenceTallies = districtRankingTallyFractions(votesByTract, cen)
        }
        if (votesByTract[0][0].preferenceTallies !== undefined
            && votesByTract[0][0].preferenceTallies.scoreVotes !== undefined) {
            votes.preferenceTallies = districtScoreTallyFractions(votesByTract, cen)
        }
        votes.parties = votesByTract[0][0].parties
        return votes
    })
    return votesByDistrict
}

function districtTallyFractions(votesByTract, cen, numCans) {
    // sum tallyFractions
    const totals = Array(numCans).fill(0)
    for (let j = 0; j < cen.length; j++) {
        const [gx, gy, gf] = cen[j]
        const { tallyFractions } = votesByTract[gx][gy].candidateTallies
        for (let k = 0; k < numCans; k++) {
            totals[k] += tallyFractions[k] * gf
        }
    }
    const gfNorm = getNormDistrict(cen)
    const tallyFractions = totals.map((t) => t * gfNorm)
    return { tallyFractions }
}

function districtPairwiseTallyFractions(votesByTract, cen, numCans) {
    // sum pairwiseTallyFractions
    const pTotals = Array(numCans)
    for (let k = 0; k < numCans; k++) {
        pTotals[k] = Array(numCans).fill(0)
    }
    for (let j = 0; j < cen.length; j++) {
        const [gx, gy, gf] = cen[j]
        const { pairwiseTallyFractions } = votesByTract[gx][gy].pairwiseTallies
        for (let i = 0; i < numCans; i++) {
            for (let k = 0; k < numCans; k++) {
                pTotals[i][k] += pairwiseTallyFractions[i][k] * gf
            }
        }
    }

    const gfNorm = getNormDistrict(cen)
    const pairwiseTallyFractions = pTotals.map((row) => row.map((t) => t * gfNorm))
    return { pairwiseTallyFractions }
}

function districtRankingTallyFractions(votesByTract, cen) {
    // concatenate cansByRankList
    let votePopAll = []
    let cansByRankListAll = []

    const gfNorm = getNormDistrict(cen)

    for (let j = 0; j < cen.length; j++) {
        const [gx, gy, gf] = cen[j]
        const { voteFractions, cansByRankList } = votesByTract[gx][gy].preferenceTallies
        const votePopNorm = voteFractions
            .map((x) => x * gf * gfNorm)
        votePopAll = votePopAll
            .concat(votePopNorm)
        cansByRankListAll = cansByRankListAll.concat(cansByRankList)
    }
    return {
        voteFractions: votePopAll,
        cansByRankList: cansByRankListAll,
    }
}

function districtScoreTallyFractions(votesByTract, cen) {
    // concatenate scoreVotes
    let votePopAll = []
    let scoreVotesAll = []

    const gfNorm = getNormDistrict(cen)

    for (let j = 0; j < cen.length; j++) {
        const [gx, gy, gf] = cen[j]
        const { voteFractions, scoreVotes } = votesByTract[gx][gy].preferenceTallies
        const votePopNorm = voteFractions
            .map((x) => x * gf * gfNorm)
        votePopAll = votePopAll
            .concat(votePopNorm)
        scoreVotesAll = scoreVotesAll.concat(scoreVotes)
    }
    return {
        voteFractions: votePopAll,
        scoreVotes: scoreVotesAll,
    }
}

/**
 * Normalize the sum of the stats for a district.
 * @param {Number[][]} cen - An entry in the census for a district,
 * containing the fraction of a tract in a district
 * @returns {Number} normalizing parameter to multiply stat sum by.
 */
function getNormDistrict(cen) {
    let gfSum = 0
    for (let j = 0; j < cen.length; j++) {
        const [, , gf] = cen[j]
        gfSum += gf
    }
    const gfNorm = 1 / gfSum
    return gfNorm
}
