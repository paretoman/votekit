/** @module */

/**
 * Calculate data for charts of budget for MES
 * @param {Object} electionResults - MES methodResults plus a little extra
 * @returns budgetDataMES
 */
export default function vizMESChartsCalcBudget(electionResults) {
    const { socialChoiceResults, votes, colorRGBAOfCandidates } = electionResults
    const { winnersByRound, winnerMaxCostPerScoreByRound } = socialChoiceResults.explanation

    const { scoreVotes } = votes.preferenceTallies
    const { votesByGeom } = votes

    const nRounds = winnersByRound.length
    const nGeoms = votesByGeom.length

    const costsByGeom = []
    const budgetsByGeom = []
    const colorRGBAByGeom = []

    // We want to use the geometry rather than voteFractions because voteFractions normalizes to add to 1.
    for (let g = 0; g < nGeoms; g++) {
        const { voteIndex } = votesByGeom[g]

        const nVotes = voteIndex.length

        const budgets = []
        budgets[0] = Array(nVotes).fill(1)

        const costs = []

        const colorRGBA = []

        for (let r = 0; r < nRounds; r++) {
            const curBudget = budgets[r]
            const nextBudget = Array(nVotes)
            const curCost = Array(nVotes)
            const winner = winnersByRound[r]
            const maxCostPerScore = winnerMaxCostPerScoreByRound[r]

            for (let i = 0; i < nVotes; i++) {
                const vi = voteIndex[i]

                const score = scoreVotes[vi][winner]
                const cost = maxCostPerScore * score
                curCost[i] = Math.min(curBudget[i], cost)
                nextBudget[i] = Math.max(0, curBudget[i] - cost)
            }

            costs[r] = curCost
            colorRGBA[r] = colorRGBAOfCandidates[winner]
            if (r < (nRounds - 1)) {
                budgets[r + 1] = nextBudget
            }
        }
        colorRGBAByGeom[g] = colorRGBA
        costsByGeom[g] = costs
        budgetsByGeom[g] = budgets
    }

    const budgetDataMES = { costsByGeom, budgetsByGeom, colorRGBAByGeom }
    return budgetDataMES
}
