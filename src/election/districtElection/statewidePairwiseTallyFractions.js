import getNormStatewide from './getNormStatewide.js'

export default function statewidePairwiseTallyFractions(votesByTract, numCans) {
    // sum pairwiseTallyFractions
    const pTotals = Array(numCans)
    for (let k = 0; k < numCans; k++) {
        pTotals[k] = Array(numCans).fill(0)
    }
    votesByTract.forEach(
        (row) => row.forEach(
            (votes) => {
                const { pairwiseTallyFractions } = votes.pairwiseTallies
                for (let i = 0; i < numCans; i++) {
                    for (let k = 0; k < numCans; k++) {
                        pTotals[i][k] += pairwiseTallyFractions[i][k]
                    }
                }
            },
        ),
    )
    const dNorm = getNormStatewide(votesByTract)
    const pairwiseTallyFractions = pTotals.map((row) => row.map((t) => t * dNorm))
    return { pairwiseTallyFractions }
}
