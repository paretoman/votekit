import getNormStatewide from './getNormStatewide.js'

export default function statewideRankingTallyFractions(votesByTract) {
    // concatenate cansByRankList
    let votePopAll = []
    let cansByRankListAll = []
    votesByTract.forEach(
        (row) => row.forEach(
            (votes) => {
                const { voteFractions } = votes.preferenceTallies
                const { cansByRankList } = votes.preferenceLists
                votePopAll = votePopAll
                    .concat(voteFractions)
                cansByRankListAll = cansByRankListAll.concat(cansByRankList)
            },
        ),
    )
    const dNorm = getNormStatewide(votesByTract)
    votePopAll = votePopAll.map((t) => t * dNorm)
    return {
        preferenceTallies: { voteFractions: votePopAll },
        preferenceLists: { cansByRankList: cansByRankListAll },
    }
}
