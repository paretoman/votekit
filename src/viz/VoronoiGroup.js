/** @module */

// d3-voronoi
// d3-select
// d3-range

import { Delaunay } from '../lib/snowpack/build/snowpack/pkg/d3-delaunay.js'
// import { Delaunay } from 'd3-delaunay'
// import { Delaunay } from 'https://cdn.skypack.dev/d3-delaunay@6'
// https://github.com/d3/d3-delaunay

/**
 * Draw Voronoi cells to show votes.
 * @param {VoterGroup} voterGroup
 * @param {Candidates} candidates
 * @param {Screen} screen
 * @constructor
 */
export default function VoronoiGroup(voterGroup, candidates, screen) {
    const self = this

    const cans = candidates.getCandidates()
    const points = cans.map((e) => [e.x, e.y])
    const delaunay = Delaunay.from(points)
    const voronoi = delaunay.voronoi([0, 0, screen.width, screen.height])

    self.render = function () {
        const { ctx } = screen

        ctx.save()

        // draw circle clip

        // http://jsfiddle.net/jimrhoskins/dDUC3/1/
        // https://dustinpfister.github.io/2019/10/08/canvas-clip/
        ctx.beginPath()
        ctx.arc(voterGroup.x, voterGroup.y, voterGroup.shape2.w * 0.5, 0, 2 * Math.PI)
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
        ctx.arc(voterGroup.x, voterGroup.y, voterGroup.shape2.w * 0.5, 0, 2 * Math.PI)
        ctx.stroke()

        ctx.restore()
    }
}
