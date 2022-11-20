/** @module */

/**
 * Calculate data for charts of budget for MES
 * @param {Object} electionResults - MES methodResults plus a little extra
 */
export default function vizMESChartsCalc(electionResults, screen) {
    const { explanation, votes, colorRGBAOfCandidates } = electionResults
    const { winnersByRound, winnerMaxCostPerScoreByRound } = explanation

    const { scoreVotes, gridData } = votes

    const nRounds = winnersByRound.length
    const nGeoms = gridData.length

    const cols = 3
    const xScale = 1 / cols
    const yScale = -screen.width / cols
    const sizeChart = screen.width / cols

    const costShapesbyGeom = []
    const budgetShapesbyGeom = []
    const colorRGBAByGeom = []

    // We want to use the geometry rather than votePop because votePop normalizes to add to 1.
    for (let g = 0; g < nGeoms; g++) {
        const {
            grid, voteIndex, voterGeom,
        } = gridData[g]
        const { w, densityProfile } = voterGeom
        const xCenter = voterGeom.x

        const gridX = grid.x
        const isGauss = (densityProfile === 'gaussian')
        const sigma = w / Math.sqrt(2 * Math.PI) // w = sigma * sqrt(2*pi)

        const nVotes = voteIndex.length

        const budgets = []
        budgets[0] = Array(nVotes).fill(1)

        const costs = []

        const budgetShapes = []
        const costShapes = []
        const colorRGBA = []

        for (let r = 0; r < nRounds; r++) {
            const curBudget = budgets[r]
            const nextBudget = Array(nVotes)
            const curCost = Array(nVotes)
            const budgetShape = []
            const costShape = []
            const winner = winnersByRound[r]
            const maxCostPerScore = winnerMaxCostPerScoreByRound[r]

            // Place graph in row and column
            const idCol = r % cols
            const idRow = Math.floor(r / cols)
            const xTranslate = idCol * sizeChart
            const yTranslate = (idRow + 1) * sizeChart

            let p = 0 // point counter

            // start bottom left
            // go outside of screen by one pixel
            const bottom = 0 * yScale + yTranslate
            const left = Math.max(-1, gridX[0]) * xScale + xTranslate
            budgetShape[p] = [left, bottom]
            costShape[p] = [left, bottom]
            p += 1

            for (let i = 0; i < nVotes; i++) {
                const vi = voteIndex[i]

                const xg = gridX[i]
                if (xg < -1) continue
                if (xg > screen.width + 1) continue
                const shapeMult = (isGauss) ? Math.exp(-0.5 * ((xg - xCenter) / sigma) ** 2) : 1

                const score = scoreVotes[vi][winner]
                const cost = maxCostPerScore * score
                curCost[i] = Math.min(curBudget[i], cost)
                const dCurCosti = curCost[i] * shapeMult
                nextBudget[i] = Math.max(0, curBudget[i] - cost)
                const dCurBudgeti = curBudget[i] * shapeMult

                // add point
                const xb = xg * xScale + xTranslate
                const yb = dCurBudgeti * yScale + yTranslate
                budgetShape[p] = [xb, yb]
                const xc = xg * xScale + xTranslate
                const yc = dCurCosti * yScale + yTranslate
                costShape[p] = [xc, yc]
                p += 1
            }

            // end bottom right
            const right = Math.min(screen.width + 1, gridX[nVotes - 1]) * xScale + xTranslate
            budgetShape[p] = [right, bottom]
            costShape[p] = [right, bottom]
            p += 1

            // close path
            budgetShape[p] = [left, bottom]
            costShape[p] = [left, bottom]
            p += 1

            costs[r] = curCost
            costShapes[r] = costShape
            budgetShapes[r] = budgetShape
            colorRGBA[r] = colorRGBAOfCandidates[winner]
            if (r < (nRounds - 1)) {
                budgets[r + 1] = nextBudget
            }
        }
        costShapesbyGeom[g] = costShapes
        budgetShapesbyGeom[g] = budgetShapes
        colorRGBAByGeom[g] = colorRGBA
    }

    const chartDataMES = { costShapesbyGeom, budgetShapesbyGeom, colorRGBAByGeom }
    return chartDataMES
}
