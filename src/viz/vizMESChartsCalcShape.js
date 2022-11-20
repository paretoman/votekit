/** @module */

/**
 * Calculate shape data for charts of budget for MES
 * @param {Object} electionResults - MES methodResults plus a little extra candidate data
 * @param {Object} screen
 * @param {Object} budgetDataMES
 * @returns chartDataMES
 */
export default function vizMESChartsCalcShape(electionResults, screen, budgetDataMES) {
    const { explanation, votes } = electionResults
    const { winnersByRound } = explanation

    const { costsByGeom, budgetsByGeom, colorRGBAByGeom } = budgetDataMES

    const { gridData } = votes

    const nRounds = winnersByRound.length
    const nGeoms = gridData.length

    const cols = 3
    const xScale = 1 / cols
    const yScale = -screen.width / cols
    const sizeChart = screen.width / cols

    const costShapesbyGeom = []
    const budgetShapesbyGeom = []

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

        const budgets = budgetsByGeom[g]
        const costs = costsByGeom[g]

        const budgetShapes = []
        const costShapes = []

        for (let r = 0; r < nRounds; r++) {
            const curBudget = budgets[r]
            const curCost = costs[r]
            const budgetShape = []
            const costShape = []

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
                const xg = gridX[i]
                if (xg < -1) continue
                if (xg > screen.width + 1) continue
                const shapeMult = (isGauss) ? Math.exp(-0.5 * ((xg - xCenter) / sigma) ** 2) : 1

                // The shape is affected by the density of voters.
                const dCurCosti = curCost[i] * shapeMult
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

            costShapes[r] = costShape
            budgetShapes[r] = budgetShape
        }
        costShapesbyGeom[g] = costShapes
        budgetShapesbyGeom[g] = budgetShapes
    }

    const chartDataMES = { costShapesbyGeom, budgetShapesbyGeom, colorRGBAByGeom }
    return chartDataMES
}
