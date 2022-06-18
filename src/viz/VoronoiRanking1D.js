/** @module */

import castRankingFindIntervals from '../castVotes/castRankingFindIntervals.js'
import colorBlender, { rgbToString } from './colorBlender.js'

/**
 * Draw Voronoi cells to show votes.
 * @param {VoterGroup} voterGroup
 * @param {CandidateSimList} candidateSimList
 * @param {Screen} screen
 * @constructor
 */
export default function VoronoiRanking1D(voterGroup, candidateSimList, screen) {
    const self = this

    let canList
    let colors
    let intervals
    self.update = function (cellData) {
        // calculate colors

        let ranking
        let intervalBorders
        if (cellData === undefined) {
            canList = candidateSimList.getCandidates()
            const canGeoms = canList.map((can) => can.shape1)
            const cd = castRankingFindIntervals(canGeoms)
            ranking = cd.ranking
            intervalBorders = cd.intervalBorders
        } else {
            ranking = cellData.ranking
            intervalBorders = cellData.intervalBorders
        }

        canList = candidateSimList.getCandidates()
        const n = canList.length
        const colorList = canList.map((can) => can.colorRGBA)

        const ni = intervalBorders.length - 1
        intervals = Array(ni)
        colors = Array(ni)
        for (let i = 0; i < ni; i++) {
            intervals[i] = [intervalBorders[i], intervalBorders[i + 1]]
            const bordaScores = ranking[i].map((r) => n - r)
            colors[i] = rgbToString(colorBlender(bordaScores, colorList))
        }
    }

    self.render = function () {
        const { ctx } = screen
        const { x, shape1 } = voterGroup
        const { w, densityProfile } = shape1
        const h = 100

        ctx.save()

        // clip the voronoi diagram

        // http://jsfiddle.net/jimrhoskins/dDUC3/1/
        // https://dustinpfister.github.io/2019/10/08/canvas-clip/

        ctx.beginPath()
        doPath()
        // ctx.closePath()
        ctx.clip()

        const n = intervals.length
        for (let i = 0; i < n; i++) {
            renderInterval(intervals[i], colors[i], ctx, screen)
        }

        ctx.beginPath()
        doPath()
        ctx.stroke()

        ctx.restore()

        function doPath() {
            if (densityProfile === 'gaussian') {
                gaussianPath()
            } else {
                rectanglePath()
            }
        }
        function gaussianPath() {
            const sigma = w / Math.sqrt(2 * Math.PI) // w = sigma * sqrt(2*pi)
            const amp = h
            const bottom = 150 + h * 0.5
            // start bottom left
            ctx.moveTo(0, bottom)
            const pa = []
            for (let i = 0; i <= screen.width; i += 1) {
                const xp = 0.5 * ((i - x) / sigma) ** 2
                const y = bottom - amp * Math.exp(-xp)
                pa.push(y)
                ctx.lineTo(i, y)
            }
            // end bottom right
            ctx.lineTo(screen.width, bottom)
            ctx.lineTo(0, bottom)
            // ctx.closePath()
        }
        function rectanglePath() {
            ctx.rect(x - w * 0.5, 150 - h * 0.5, w, h)
        }
    }
}

function renderInterval(interval, color, ctx, screen) {
    const x = Math.max(0, interval[0])
    const x2 = Math.min(screen.width, interval[1])
    const w = x2 - x
    const y = 0
    const h = screen.height

    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fillStyle = color
    ctx.fill()
    ctx.stroke()
}
