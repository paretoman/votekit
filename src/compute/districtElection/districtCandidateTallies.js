import getNormDistrict from './getNormDistrict.js'

export default function districtCandidateTallies(votesByTract, cen, numCans) {
    // average tallies

    const tallyNames = Object.keys(votesByTract[0][0].candidateTallies)

    const candidateTallies = {}
    for (let i = 0; i < tallyNames.length; i++) {
        const tallyName = tallyNames[i]

        const tallyAverage = getCandidateTallyAverage(tallyName, votesByTract, cen, numCans)
        candidateTallies[tallyName] = tallyAverage
    }

    return candidateTallies
}

function getCandidateTallyAverage(tallyName, votesByTract, cen, numCans) {
    // average the tally
    const totals = Array(numCans).fill(0)
    for (let j = 0; j < cen.length; j++) {
        const [gx, gy, gf] = cen[j]
        const tally = votesByTract[gx][gy].candidateTallies[tallyName]
        for (let k = 0; k < numCans; k++) {
            totals[k] += tally[k] * gf
        }
    }
    const gfNorm = getNormDistrict(cen)
    const tallyAverage = totals.map((t) => t * gfNorm)
    return tallyAverage
}
