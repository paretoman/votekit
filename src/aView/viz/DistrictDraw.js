/** @module */

import { drawStrokedColor } from '../../utilities/graphicsUtilities.js'
/**
 * Draws district boundaries.
 * Right now, just for a uniform square geography.
 * @param {Screen} screen
 * @constructor
 */
export default function DistrictDraw(screen, districtMaker) {
    const self = this

    /**
     * Define district lines and count demographics.
     * @param {Number} nx - number of voter cells in x
     * @param {Number} ny - number of voter cells in y
     * @param {Number} nd - number of districts.
     */

    /**
     * Draw Voronoi cell boundaries.
     * @param {Number} districtMapWidth - width of image
     * @param {Number} districtMapHeight - height of image
     */
    self.renderVoronoi = (districtMapWidth, districtMapHeight) => {
        self.renderVoronoiGeneral(0, 0, districtMapWidth, districtMapHeight, null, renderAreaText)
    }

    self.renderVoronoiColors = (x, y, districtMapWidth, districtMapHeight, colors) => {
        self.renderVoronoiGeneral(x, y, districtMapWidth, districtMapHeight, colors, undefined)
    }
    /**
     * Draw a Voronoi Diagram
     * @param {Number} x - translate image
     * @param {Number} y - translate image
     * @param {Number} districtMapWidth - width of image
     * @param {Number} districtMapHeight - height of image
     * @param {string[]} colors - an option, say "null" if do not want colors
     * @param {Function} textFunction - an option, defaults to undefined
     */
    self.renderVoronoiGeneral = (x, y, districtMapWidth, districtMapHeight, colors, textFunction) => {
        const { ctx } = screen
        const {
            voronoi, nx, ny, nd,
        } = districtMaker
        ctx.save()
        const scaleX = districtMapWidth / nx
        const scaleY = districtMapHeight / ny
        ctx.translate(x, y)
        ctx.scale(scaleX, scaleY)
        for (let i = 0; i < nd; i++) {
            ctx.beginPath()
            ctx.strokeStyle = '#333'
            ctx.lineWidth = 1 / scaleX
            voronoi.renderCell(i, ctx)
            if (colors !== null) { // option
                ctx.fillStyle = colors[i]
                ctx.fill()
            }
            ctx.stroke()
            if (textFunction !== undefined) textFunction(i) // option
        }
        ctx.restore()
    }

    function renderAreaText(i) {
        const { ctx } = screen
        const { centroids, polygonAreas } = districtMaker
        const c = centroids[i]
        const textHeight = 1
        // const area = textPercent(polygonAreas[i] / (districtMaker.nx * districtMaker.ny))
        const area = polygonAreas[i].toFixed(0)
        drawStrokedColor(area, c[0], c[1] + textHeight * 0.5 - 0.2, textHeight, 0.2, '#222', 1, ctx)
    }
}
