import getNormStatewide from './getNormStatewide.js'

export default function statewidePairwiseTallies(votesByTract, numCans) {
    // average pairwiseTallies
    const tallyNames = Object.keys(votesByTract[0][0].pairwiseTallies)

    const pairwiseTallies = {}
    for (let i = 0; i < tallyNames.length; i++) {
        const tallyName = tallyNames[i]

        const tallyAverage = getPairwiseTallyAverageStatewide(tallyName, votesByTract, numCans)
        pairwiseTallies[tallyName] = tallyAverage
    }

    return pairwiseTallies
}

function getPairwiseTallyAverageStatewide(tallyName, votesByTract, numCans) {
    const pTotals = Array(numCans)
    for (let k = 0; k < numCans; k++) {
        pTotals[k] = Array(numCans).fill(0)
    }
    votesByTract.forEach(
        (row) => row.forEach(
            (votes) => {
                const pairwiseTally = votes.pairwiseTallies[tallyName]
                for (let i = 0; i < numCans; i++) {
                    for (let k = 0; k < numCans; k++) {
                        pTotals[i][k] += pairwiseTally[i][k]
                    }
                }
            },
        ),
    )
    const dNorm = getNormStatewide(votesByTract)
    const pairwiseTallyAverage = pTotals.map((row) => row.map((t) => t * dNorm))
    return pairwiseTallyAverage
}
