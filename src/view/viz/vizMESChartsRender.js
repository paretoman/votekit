/** @module */

import colorBlender, { rgbToString } from './colorBlender.js'

/**
 * Render data for charts of budget for MES
 * @param {*} screen
 * @param {*} chartDataMES  - MES methodResults plus a little extra
 */
export default function vizMESChartsRender(screen, chartDataMES) {
    const { costShapesbyGeom, budgetShapesbyGeom, colorRGBAByGeom } = chartDataMES

    const nGeoms = costShapesbyGeom.length
    const { ctx } = screen

    ctx.save()
    ctx.globalAlpha = 0.7

    for (let g = 0; g < nGeoms; g++) {
        const costShapesByRound = costShapesbyGeom[g]
        const budgetShapesByRound = budgetShapesbyGeom[g]
        const colorRGBAByRound = colorRGBAByGeom[g]

        const nRounds = costShapesByRound.length
        for (let r = 0; r < nRounds; r++) {
            const costShape = costShapesByRound[r]
            const budgetShape = budgetShapesByRound[r]
            const colorRGBA = colorRGBAByRound[r]

            ctx.fillStyle = '#cccccc' // canList[i].colorRGBA
            ctx.strokeStyle = '#555555' // rgbToString(colorBlender([0.8, 0.2], [canList[i].colorRGBA, '#000000']))
            ctx.beginPath()
            // make a shape for budget
            ctx.moveTo(budgetShape[0][0], budgetShape[0][1])
            for (let i = 1; i < budgetShape.length; i++) {
                ctx.lineTo(budgetShape[i][0], budgetShape[i][1])
            }

            ctx.fill()
            ctx.stroke()

            ctx.fillStyle = rgbToString(colorRGBA)
            ctx.strokeStyle = rgbToString(colorBlender([0.5, 0.5], [colorRGBA, [0, 0, 0]]))
            ctx.beginPath()
            // make a shape for cost
            ctx.moveTo(costShape[0][0], costShape[0][1])
            for (let i = 1; i < costShape.length; i++) {
                ctx.lineTo(costShape[i][0], costShape[i][1])
            }

            ctx.fill()
            ctx.stroke()
        }
    }
    ctx.restore()
}
