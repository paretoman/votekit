import getNormDistrict from './getNormDistrict.js'

export default function districtPreferenceTallies(votesByTract, cen) {
    const tallyNames = Object.keys(votesByTract[0][0].preferenceTallies)

    const preferenceTallies = {}
    for (let i = 0; i < tallyNames.length; i++) {
        const tallyName = tallyNames[i]

        const tallyAll = concatPreferenceTalliesDistrict(tallyName, votesByTract, cen)
        preferenceTallies[tallyName] = tallyAll
    }

    return preferenceTallies
}

function concatPreferenceTalliesDistrict(tallyName, votesByTract, cen) {
    // concatenate tallies and normalize
    const tallyAll = []
    const gfNorm = getNormDistrict(cen)

    for (let j = 0; j < cen.length; j++) {
        const [gx, gy, gf] = cen[j]
        const votesInTract = votesByTract[gx][gy]
        const tally = votesInTract.preferenceTallies[tallyName]
        const tallyNorm = tally.map((x) => x * gf * gfNorm)

        // concat
        // tallyAll.push(...tally)
        const n1 = tallyAll.length
        const n2 = tallyNorm.length
        tallyAll.length += tallyNorm.length
        for (let i = 0; i < n2; i++) {
            tallyAll[n1 + i] = tallyNorm[i]
        }
    }
    return tallyAll
}
