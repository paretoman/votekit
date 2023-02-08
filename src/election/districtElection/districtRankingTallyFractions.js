import getNormDistrict from './getNormDistrict.js'

export default function districtRankingTallyFractions(votesByTract, cen) {
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
