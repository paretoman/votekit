import getNormStatewide from './getNormStatewide.js'

export default function statewideScoreTallyFractions(votesByTract) {
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
