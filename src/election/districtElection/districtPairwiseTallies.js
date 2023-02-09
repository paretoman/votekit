import getNormDistrict from './getNormDistrict.js'

export default function districtPairwiseTallies(votesByTract, cen, numCans) {
    const tallyNames = Object.keys(votesByTract[0][0].pairwiseTallies)

    const pairwiseTallies = {}
    for (let i = 0; i < tallyNames.length; i++) {
        const tallyName = tallyNames[i]

        const tallyAverage = getPairwiseTallyAverageForDistrict(tallyName, votesByTract, cen, numCans)
        pairwiseTallies[tallyName] = tallyAverage
    }

    return pairwiseTallies
}

function getPairwiseTallyAverageForDistrict(tallyName, votesByTract, cen, numCans) {
    // sum pairwiseTallyFractions
    const pTotals = Array(numCans)
    for (let k = 0; k < numCans; k++) {
        pTotals[k] = Array(numCans).fill(0)
    }
    for (let j = 0; j < cen.length; j++) {
        const [gx, gy, gf] = cen[j]
        const pairwiseTally = votesByTract[gx][gy].pairwiseTallies[tallyName]
        for (let i = 0; i < numCans; i++) {
            for (let k = 0; k < numCans; k++) {
                pTotals[i][k] += pairwiseTally[i][k] * gf
            }
        }
    }

    const gfNorm = getNormDistrict(cen)
    const pairwiseTallyAverage = pTotals.map((row) => row.map((t) => t * gfNorm))
    return pairwiseTallyAverage
}
