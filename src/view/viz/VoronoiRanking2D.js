/** @module */

import castRankingFindPolygons from '../../election/src/voteCasters/ranking/castRankingFindPolygons.js'
import colorBlender, { rgbToString } from './colorBlender.js'

/**
 * Draw Voronoi cells to show votes.
 * @param {VoterGroup} voterGroup
 * @param {CandidateList} candidateList
 * @param {Screen} screen
 * @constructor
 */
export default function VoronoiRanking2D(voterGroup, candidateList, screen) {
    const self = this

    let canList
    let colors
    let cells
    self.update = function (votesForGeom) {
        // calculate colors

        let { rankings } = votesForGeom
        cells = votesForGeom.cells
        if (rankings === undefined || cells === undefined) {
            canList = candidateList.getEntities()
            const canPoints = canList.map((can) => [can.shape2.x, can.shape2.y])
            const voterGeom = voterGroup.shape2
            const verbosity = 3
            const cd = castRankingFindPolygons(voterGeom, canPoints, verbosity)
            rankings = cd.rankings
            cells = cd.cells
        }

        canList = candidateList.getEntities()

        const n = canList.length
        const cn = cells.length
        colors = Array(cn)
        const colorList = canList.map((can) => can.colorRGBA)
        for (let i = 0; i < cn; i++) {
            const bordaScores = rankings[i].map((r) => n - r)
            colors[i] = rgbToString(colorBlender(bordaScores, colorList))
        }
    }

    self.render = function () {
        const { ctx } = screen
        const { x, y, w } = voterGroup.shape2

        ctx.save()

        const cn = cells.length
        for (let i = 0; i < cn; i++) {
            ctx.beginPath()
            cellPath(ctx, cells[i])
            ctx.fillStyle = colors[i]
            ctx.strokeStyle = colors[i]
            ctx.fill()
            ctx.stroke()
        }

        // border
        ctx.strokeStyle = '#222'
        ctx.beginPath()
        ctx.arc(x, y, w * 0.5, 0, 2 * Math.PI)
        ctx.stroke()

        ctx.restore()
    }
}

function cellPath(ctx, cell) {
    const cc = cell.length
    const first = cell[cc - 1]
    ctx.moveTo(first[0], first[1])
    for (let i = 0; i < cc; i++) {
        const coord = cell[i]
        ctx.lineTo(coord[0], coord[1])
    }
}
