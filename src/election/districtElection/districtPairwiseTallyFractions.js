import getNormDistrict from './getNormDistrict.js'

export default function districtPairwiseTallyFractions(votesByTract, cen, numCans) {
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
