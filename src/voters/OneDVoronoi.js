/** @module */

// d3-voronoi
// d3-select
// d3-range

import { Delaunay } from '../../snowpack/build/snowpack/pkg/d3-delaunay.js'
// import { Delaunay } from 'd3-delaunay'
// import { Delaunay } from 'https://cdn.skypack.dev/d3-delaunay@6'
// https://github.com/d3/d3-delaunay

/**
 * Draw Voronoi cells to show votes.
 * OneDVoronoi is a component of OneDVoterBlock.
 * @param {VoterGroup} voterGroup
 * @param {Election} election
 * @param {Screen} screen
 * @constructor
 */
export default function OneDVoronoi(voterGroup, screen) {
    const self = this

    let cans
    let voronoi

    self.update = function (candidates) {
        cans = candidates.getCandidates()
        const points = cans.map((e) => [e.x, e.y])
        const delaunay = Delaunay.from(points)
        voronoi = delaunay.voronoi([0, 0, screen.width, screen.height])
    }

    self.render = function () {
        const { ctx } = screen
        const { x, w1, densityProfile1 } = voterGroup
        const h = 100

        ctx.save()

        // clip the voronoi diagram

        // http://jsfiddle.net/jimrhoskins/dDUC3/1/
        // https://dustinpfister.github.io/2019/10/08/canvas-clip/

        ctx.beginPath()
        doPath()
        // ctx.closePath()
        ctx.clip()

        const n = cans.length
        for (let i = 0; i < n; i++) {
            ctx.beginPath()
            voronoi.renderCell(i, ctx)
            ctx.fillStyle = cans[i].color
            ctx.fill()
            ctx.stroke()
        }

        ctx.beginPath()
        doPath()
        ctx.stroke()

        ctx.restore()

        function doPath() {
            if (densityProfile1 === 'gaussian') {
                gaussianPath()
            } else {
                rectanglePath()
            }
        }
        function gaussianPath() {
            const sigma = w1 / Math.sqrt(2 * Math.PI) // w = sigma * sqrt(2*pi)
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
            ctx.rect(x - w1 * 0.5, 150 - h * 0.5, w1, h)
        }
    }
}
