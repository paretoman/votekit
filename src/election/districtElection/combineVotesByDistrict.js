import { range } from '../../utilities/jsHelpers.js'

export default function combineVotesByDistrict(votesByTract, canGeoms, voterDistricts) {
    const { census } = voterDistricts.districtMaker
    const { nd } = voterDistricts
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
            // tf - tally fractions
            const tf = districtTallyFractions(votesByTract, cen, numCans)
            votes.candidateTallies = { tallyFractions: tf }
        }

        if (votesByTract[0][0].pairwiseTallies !== undefined) {
            // pwtf - pairwise tally fractions
            const pwtf = districtPairwiseTallyFractions(votesByTract, cen, numCans)
            votes.pairwiseTallies = { pairwiseTallyFractions: pwtf }
        }
        if (votesByTract[0][0].preferenceTallies !== undefined
            && votesByTract[0][0].preferenceTallies.cansByRankList !== undefined) {
            // vrtf - votes ranked tally fractions
            const vrtf = districtRankingTallyFractions(votesByTract, cen)
            votes.preferenceTallies = {
                voteFractions: vrtf.voteFractions,
                cansByRankList: vrtf.cansByRankList,
            }
        }
        if (votesByTract[0][0].preferenceTallies !== undefined
            && votesByTract[0][0].preferenceTallies.scoreVotes !== undefined) {
            // vstf - votes score tally fractions
            const vstf = districtScoreTallyFractions(votesByTract, cen)
            votes.preferenceTallies = {
                voteFractions: vstf.voteFractions,
                scoreVotes: vstf.scoreVotes,
            }
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
    const norm = 1 / totals.reduce((p, c) => p + c)
    const tallyFractions = totals.map((t) => t * norm)
    return tallyFractions
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
    const pNorm = 1 / (pTotals[0][1] + pTotals[1][0]) // sum wins and losses
    const pairwiseTallyFractions = pTotals.map((row) => row.map((t) => t * pNorm))
    return pairwiseTallyFractions
}

function districtRankingTallyFractions(votesByTract, cen) {
    // concatenate cansByRankList
    let votePopAll = []
    let cansByRankListAll = []

    let gfSum = 0
    for (let j = 0; j < cen.length; j++) {
        const [, , gf] = cen[j]
        gfSum += gf
    }
    const gfNorm = 1 / gfSum

    for (let j = 0; j < cen.length; j++) {
        const [gx, gy, gf] = cen[j]
        gfSum += gf
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

    let gfSum = 0
    for (let j = 0; j < cen.length; j++) {
        const [, , gf] = cen[j]
        gfSum += gf
    }
    const gfNorm = 1 / gfSum

    for (let j = 0; j < cen.length; j++) {
        const [gx, gy, gf] = cen[j]
        gfSum += gf
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
