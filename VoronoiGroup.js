// d3-voronoi
// d3-select
// d3-range

import {Delaunay} from "https://cdn.skypack.dev/d3-delaunay@6";
// https://github.com/d3/d3-delaunay

export default function voronoiGroup(votem,voterGroup,screen) {
    // Draw Voronoi cells to show votes.

    var self = this

    let cans
    let voronoi

    let ctx = screen.ctx

    self.update = function() {
        cans = votem.getCandidates()
        const points = cans.map(e => [e.square.x,e.square.y] )
        const delaunay = Delaunay.from(points)
        voronoi = delaunay.voronoi([0, 0, screen.canvas.width,screen.canvas.height])    
    }
    
    self.render = function() {

        ctx.save()

        // draw circle clip
    
        // http://jsfiddle.net/jimrhoskins/dDUC3/1/
        // https://dustinpfister.github.io/2019/10/08/canvas-clip/
        ctx.beginPath()
        ctx.arc(voterGroup.handle.x, voterGroup.handle.y, voterGroup.r, 0, 2*3.14159)
        ctx.stroke()
        // ctx.closePath()
        ctx.clip()

        let n = cans.length
        for (let i = 0; i < n; i++) {
            ctx.beginPath()
            voronoi.renderCell(i,ctx)
            ctx.fillStyle = cans[i].square.color
            ctx.fill()
            ctx.stroke()
        }

        ctx.restore()
    }

}