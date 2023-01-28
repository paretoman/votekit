/** @module */

// d3-voronoi
// d3-select
// d3-range

import { Delaunay } from '../../lib/snowpack/build/snowpack/pkg/d3-delaunay.js'
// import { Delaunay } from 'd3-delaunay'
// import { Delaunay } from 'https://cdn.skypack.dev/d3-delaunay@6'
// https://github.com/d3/d3-delaunay

/**
 * Draw Voronoi cells to show votes.
 * Voronoi1D is called by VizOne.
 * @param {VoterGroup} voterGroup
 * @param {candidateList} candidateList
 * @param {Screen} screen
 * @constructor
 */
export default function Voronoi1D(voterGroup, candidateList, screen) {
    const self = this

    let voronoi
    let canList
    self.update = function () {
        canList = candidateList.getEntities()
        const points = canList.map((e) => [e.shape1.x, 0])
        const delaunay = Delaunay.from(points)
        voronoi = delaunay.voronoi([0, 0, screen.width, screen.height])
    }

    self.render = function () {
        const { ctx } = screen
        const { x, w, densityProfile } = voterGroup.shape1
        const h = 100

        ctx.save()

        // clip the voronoi diagram

        // http://jsfiddle.net/jimrhoskins/dDUC3/1/
        // https://dustinpfister.github.io/2019/10/08/canvas-clip/

        ctx.beginPath()
        doPath()
        // ctx.closePath()
        ctx.clip()

        const n = canList.length
        for (let i = 0; i < n; i++) {
            ctx.beginPath()
            voronoi.renderCell(i, ctx)
            ctx.fillStyle = canList[i].color
            ctx.fill()
            ctx.stroke()
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
