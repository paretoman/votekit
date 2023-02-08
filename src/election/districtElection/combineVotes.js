export default function combineVotes(votesByTract, canGeoms) {
    const numCans = canGeoms.length

    const votes = {}

    if (votesByTract[0][0].candidateTallies !== undefined) {
        votes.candidateTallies = statewideTallyFractions(votesByTract, numCans)
    }
    if (votesByTract[0][0].pairwiseTallies !== undefined) {
        votes.pairwiseTallies = statewidePairwiseTallyFractions(votesByTract, numCans)
    }
    if (votesByTract[0][0].preferenceTallies !== undefined
        && votesByTract[0][0].preferenceTallies.cansByRankList !== undefined) {
        votes.preferenceTallies = statewideRankingTallyFractions(votesByTract)
    }
    if (votesByTract[0][0].preferenceTallies !== undefined
        && votesByTract[0][0].preferenceTallies.scoreVotes !== undefined) {
        votes.preferenceTallies = statewideScoreTallyFractions(votesByTract)
    }
    votes.parties = votesByTract[0][0].parties
    return votes
}

function statewideTallyFractions(votesByTract, numCans) {
    // sum tallyFractions
    const totals = Array(numCans).fill(0)
    votesByTract.forEach(
        (row) => row.forEach(
            (votes) => {
                const { tallyFractions } = votes.candidateTallies
                for (let k = 0; k < numCans; k++) {
                    totals[k] += tallyFractions[k]
                }
            },
        ),
    )
    const dNorm = getNormStatewide(votesByTract)
    const tallyFractions = totals.map((t) => t * dNorm)
    return { tallyFractions }
}

function statewidePairwiseTallyFractions(votesByTract, numCans) {
    // sum pairwiseTallyFractions
    const pTotals = Array(numCans)
    for (let k = 0; k < numCans; k++) {
        pTotals[k] = Array(numCans).fill(0)
    }
    votesByTract.forEach(
        (row) => row.forEach(
            (votes) => {
                const { pairwiseTallyFractions } = votes.pairwiseTallies
                for (let i = 0; i < numCans; i++) {
                    for (let k = 0; k < numCans; k++) {
                        pTotals[i][k] += pairwiseTallyFractions[i][k]
                    }
                }
            },
        ),
    )
    const dNorm = getNormStatewide(votesByTract)
    const pairwiseTallyFractions = pTotals.map((row) => row.map((t) => t * dNorm))
    return { pairwiseTallyFractions }
}

function statewideRankingTallyFractions(votesByTract) {
    // concatenate cansByRankList
    let votePopAll = []
    let cansByRankListAll = []
    votesByTract.forEach(
        (row) => row.forEach(
            (votes) => {
                const { voteFractions, cansByRankList } = votes.preferenceTallies
                votePopAll = votePopAll
                    .concat(voteFractions)
                cansByRankListAll = cansByRankListAll.concat(cansByRankList)
            },
        ),
    )
    const dNorm = getNormStatewide(votesByTract)
    votePopAll = votePopAll.map((t) => t * dNorm)
    return {
        voteFractions: votePopAll,
        cansByRankList: cansByRankListAll,
    }
}

function statewideScoreTallyFractions(votesByTract) {
    // concatenate cansByRankList
    let votePopAll = []
    let scoreVoteAll = []
    votesByTract.forEach(
        (row) => row.forEach(
            (votes) => {
                const { voteFractions, scoreVotes } = votes.preferenceTallies
                votePopAll = votePopAll
                    .concat(voteFractions)
                scoreVoteAll = scoreVoteAll.concat(scoreVotes)
            },
        ),
    )
    const dNorm = getNormStatewide(votesByTract)
    votePopAll = votePopAll.map((t) => t * dNorm)
    return {
        voteFractions: votePopAll,
        scoreVotes: scoreVoteAll,
    }
}
function getNormStatewide(votesByTract) {
    const numRows = votesByTract.length
    const numCols = votesByTract[0].length
    const dNorm = 1 / (numRows * numCols)
    return dNorm
}
