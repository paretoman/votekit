/** @module */

import splitPolygon from '../lib/snowpack/build/snowpack/pkg/split-polygon.js'
import { equidistantLine } from '../castVotes/CastPluralityAreaSummer.js'
import { blend } from '../lib/colorBlendScript.js'

/**
 * Draw Voronoi cells to show votes.
 * @param {VoterGroup} voterGroup
 * @param {CandidateSimList} candidateSimList
 * @param {Screen} screen
 * @constructor
 */
export default function VoronoiRanking2D(voterGroup, candidateSimList, screen) {
    const self = this

    let canList
    let colors
    let cells
    self.update = function () {
        // just keep dividing up the screen for each pair. Keep track of color, too.

        // start with screen rectangle
        const screenRect = makeRect(0, 0, screen.width, screen.height)
        colors = ['#000000']
        cells = [screenRect]

        let ncombo = 1 // level of cell combinations. Useful for color blending ratio.

        canList = candidateSimList.getCandidates()
        const n = canList.length
        for (let i = 0; i < n - 1; i++) {
            for (let k = i + 1; k < n; k++) {
                const cn = cells.length
                // split cells with voronoi, guess how many cells
                const newCells = Array(cn * 2)
                const newColors = Array(cn * 2)

                let o = 0
                for (let m = 0; m < cn; m++) {
                    const subject = cells[m]

                    const plane = eqPlane(canList[i], canList[k])

                    const newC = splitPolygon(subject, plane)

                    const p = 1 / ncombo
                    const color = colors[m]

                    const pos = newC.positive
                    if (pos !== undefined && pos.length > 2) {
                        newCells[o] = pos

                        const can = canList[k]
                        const newColor = blend(color, can.color, p)
                        newColors[o] = newColor

                        o += 1
                    }
                    const neg = newC.negative
                    if (neg !== undefined && neg.length > 2) {
                        newCells[o] = neg

                        const can = canList[i]
                        const newColor = blend(color, can.color, p)
                        newColors[o] = newColor

                        o += 1
                    }
                }
                newCells.splice(o)
                newColors.splice(o)
                cells = newCells
                colors = newColors
                ncombo += 1
            }
        }
    }

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

        const cn = cells.length
        for (let i = 0; i < cn; i++) {
            ctx.beginPath()
            cellPath(ctx, cells[i])
            ctx.fillStyle = colors[i]
            ctx.strokeStyle = colors[i]
            ctx.fill()
            ctx.stroke()
        }

        ctx.beginPath()
        ctx.arc(voterGroup.x, voterGroup.y, voterGroup.shape2.w * 0.5, 0, 2 * Math.PI)
        ctx.stroke()

        ctx.restore()
    }
}

function makeRect(x, y, w, h) {
    // the points are in counterclockwise order
    // assuming a coordinate system where y points down and x points right.
    // top left
    // bottom left
    // bottom right
    // top right
    const subject = [
        [x, y],
        [x, y + h],
        [x + w, y + h],
        [x + w, y],
    ]
    return subject
}
function eqPlane(c1, c2) {
    const { A, b } = equidistantLine(c1, c2)
    return [A.x, A.y, -b]
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
