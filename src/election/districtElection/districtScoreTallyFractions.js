import getNormDistrict from './getNormDistrict.js'

export default function districtScoreTallyFractions(votesByTract, cen) {
    // concatenate scoreVotes
    let votePopAll = []
    let scoreVotesAll = []

    const gfNorm = getNormDistrict(cen)

    for (let j = 0; j < cen.length; j++) {
        const [gx, gy, gf] = cen[j]
        const votesInTract = votesByTract[gx][gy]
        const { voteFractions } = votesInTract.preferenceTallies
        const { scoreVotes } = votesInTract.preferenceLists
        const votePopNorm = voteFractions
            .map((x) => x * gf * gfNorm)
        votePopAll = votePopAll
            .concat(votePopNorm)
        scoreVotesAll = scoreVotesAll.concat(scoreVotes)
    }
    return {
        preferenceTallies: { voteFractions: votePopAll },
        preferenceLists: { scoreVotes: scoreVotesAll },
    }
}
