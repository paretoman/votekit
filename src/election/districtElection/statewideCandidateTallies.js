import getNormStatewide from './getNormStatewide.js'

export default function statewideCandidateTallies(votesByTract, numCans) {
    const tallyNames = Object.keys(votesByTract[0][0].candidateTallies)

    const candidateTallies = {}
    for (let i = 0; i < tallyNames.length; i++) {
        const tallyName = tallyNames[i]

        const tallyAverage = getCandidateTallyAverageStatewide(tallyName, votesByTract, numCans)
        candidateTallies[tallyName] = tallyAverage
    }

    return candidateTallies
}

function getCandidateTallyAverageStatewide(tallyName, votesByTract, numCans) {
    // sum tallyFractions
    const totals = Array(numCans).fill(0)
    votesByTract.forEach(
        (row) => row.forEach(
            (votes) => {
                const tally = votes.candidateTallies[tallyName]
                for (let k = 0; k < numCans; k++) {
                    totals[k] += tally[k]
                }
            },
        ),
    )
    const dNorm = getNormStatewide(votesByTract)
    const tallyAverage = totals.map((t) => t * dNorm)
    return tallyAverage
}
