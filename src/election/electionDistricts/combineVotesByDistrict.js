import { range } from '../../utilities/jsHelpers.js'

export default function combineVotesByDistrict(votesByTract, canGeoms, voterDistricts) {
    const { census } = voterDistricts.districtMaker
    const { nd } = voterDistricts
    const numCans = canGeoms.length

    // loop through districts
    // each district has a census with a list of tracts with weights
    // tracts are listed by index
    // This is the same index as the votes list uses.
    const votesByDistrict = range(nd).map((iDistrict) => {
        const cen = census[iDistrict]

        const votes = {}

        if (votesByTract[0][0].tallyFractions !== undefined) {
            // tf - tally fractions
            const tf = districtTallyFractions(votesByTract, cen, numCans)
            votes.tallyFractions = tf
        }

        if (votesByTract[0][0].pairwiseTallyFractions !== undefined) {
            // pwtf - pairwise tally fractions
            const pwtf = districtPairwiseTallyFractions(votesByTract, cen, numCans)
            votes.pairwiseTallyFractions = pwtf
        }
        if (votesByTract[0][0].cansByRank !== undefined) {
            // vrtf - votes ranked tally fractions
            const vrtf = districtRankingTallyFractions(votesByTract, cen)
            votes.votePop = vrtf.votePop
            votes.cansByRank = vrtf.cansByRank
        }
        if (votesByTract[0][0].scoreVotes !== undefined) {
            // vstf - votes score tally fractions
            const vstf = districtScoreTallyFractions(votesByTract, cen)
            votes.votePop = vstf.votePop
            votes.scoreVotes = vstf.scoreVotes
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
        const { tallyFractions } = votesByTract[gx][gy]
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
        const { pairwiseTallyFractions } = votesByTract[gx][gy]
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
    // concatenate cansByRank
    let votePopAll = []
    let cansByRankAll = []

    let gfSum = 0
    for (let j = 0; j < cen.length; j++) {
        const [, , gf] = cen[j]
        gfSum += gf
    }
    const gfNorm = 1 / gfSum

    for (let j = 0; j < cen.length; j++) {
        const [gx, gy, gf] = cen[j]
        gfSum += gf
        const { votePop, cansByRank } = votesByTract[gx][gy]
        const votePopNorm = votePop
            .map((x) => x * gf * gfNorm)
        votePopAll = votePopAll
            .concat(votePopNorm)
        cansByRankAll = cansByRankAll.concat(cansByRank)
    }
    return {
        votePop: votePopAll,
        cansByRank: cansByRankAll,
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
        const { votePop, scoreVotes } = votesByTract[gx][gy]
        const votePopNorm = votePop
            .map((x) => x * gf * gfNorm)
        votePopAll = votePopAll
            .concat(votePopNorm)
        scoreVotesAll = scoreVotesAll.concat(scoreVotes)
    }
    return {
        votePop: votePopAll,
        scoreVotes: scoreVotesAll,
    }
}
