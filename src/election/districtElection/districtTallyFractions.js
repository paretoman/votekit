import getNormDistrict from './getNormDistrict.js'

export default function districtTallyFractions(votesByTract, cen, numCans) {
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
