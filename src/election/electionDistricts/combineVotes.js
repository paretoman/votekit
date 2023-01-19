export default function combineVotes(votesByTract, canGeoms) {
    const numCans = canGeoms.length

    const votes = {}

    if (votesByTract[0][0].tallyFractions !== undefined) {
        // tf - tally fractions
        const tf = statewideTallyFractions(votesByTract, numCans)
        votes.tallyFractions = tf
    }
    if (votesByTract[0][0].pairwiseTallyFractions !== undefined) {
        // pwtf - pairwise tally fractions
        const pwtf = statewidePairwiseTallyFractions(votesByTract, numCans)
        votes.pairwiseTallyFractions = pwtf
    }
    if (votesByTract[0][0].cansByRank !== undefined) {
        // vrtf - votes ranked tally fractions
        const vrtf = statewideRankingTallyFractions(votesByTract)
        votes.votePop = vrtf.votePop
        votes.cansByRank = vrtf.cansByRank
    }
    if (votesByTract[0][0].scoreVotes !== undefined) {
        // vstf - votes score tally fractions
        const vstf = statewideScoreTallyFractions(votesByTract)
        votes.votePop = vstf.votePop
        votes.scoreVotes = vstf.scoreVotes
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
                const { tallyFractions } = votes
                for (let k = 0; k < numCans; k++) {
                    totals[k] += tallyFractions[k]
                }
            },
        ),
    )
    const norm = 1 / totals.reduce((p, c) => p + c)
    const tallyFractions = totals.map((t) => t * norm)
    return tallyFractions
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
                const { pairwiseTallyFractions } = votes
                for (let i = 0; i < numCans; i++) {
                    for (let k = 0; k < numCans; k++) {
                        pTotals[i][k] += pairwiseTallyFractions[i][k]
                    }
                }
            },
        ),
    )
    const pNorm = 1 / (pTotals[0][1] + pTotals[1][0]) // sum wins and losses
    const pairwiseTallyFractions = pTotals.map((row) => row.map((t) => t * pNorm))
    return pairwiseTallyFractions
}

function statewideRankingTallyFractions(votesByTract) {
    // concatenate cansByRank
    let votePopAll = []
    let cansByRankAll = []
    votesByTract.forEach(
        (row) => row.forEach(
            (votes) => {
                const { votePop, cansByRank } = votes
                votePopAll = votePopAll
                    .concat(votePop)
                cansByRankAll = cansByRankAll.concat(cansByRank)
            },
        ),
    )
    const numRows = votesByTract.length
    const numCols = votesByTract[0].length
    const rNorm = 1 / (numRows * numCols)
    votePopAll = votePopAll.map((t) => t * rNorm)
    return {
        votePop: votePopAll,
        cansByRank: cansByRankAll,
    }
}

function statewideScoreTallyFractions(votesByTract) {
    // concatenate cansByRank
    let votePopAll = []
    let scoreVoteAll = []
    votesByTract.forEach(
        (row) => row.forEach(
            (votes) => {
                const { votePop, scoreVotes } = votes
                votePopAll = votePopAll
                    .concat(votePop)
                scoreVoteAll = scoreVoteAll.concat(scoreVotes)
            },
        ),
    )
    const numRows = votesByTract.length
    const numCols = votesByTract[0].length
    const rNorm = 1 / (numRows * numCols)
    votePopAll = votePopAll.map((t) => t * rNorm)
    return {
        votePop: votePopAll,
        scoreVotes: scoreVoteAll,
    }
}
