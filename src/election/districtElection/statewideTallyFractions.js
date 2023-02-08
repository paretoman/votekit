import getNormStatewide from './getNormStatewide.js'

export default function statewideTallyFractions(votesByTract, numCans) {
    // sum tallyFractions
    const totals = Array(numCans).fill(0)
    votesByTract.forEach(
        (row) => row.forEach(
            (votes) => {
                const { tallyFractions } = votes.candidateTallies
                for (let k = 0; k < numCans; k++) {
                    totals[k] += tallyFractions[k]
                }
            },
        ),
    )
    const dNorm = getNormStatewide(votesByTract)
    const tallyFractions = totals.map((t) => t * dNorm)
    return { tallyFractions }
}
