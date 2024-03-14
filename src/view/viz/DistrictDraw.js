/** @module */

import { drawStrokedColor } from '../../util/graphicsUtilities.js'
/**
 * Draws district boundaries.
 * Right now, just for a uniform square geography.
 * @param {Screen} screen
 * @constructor
 */
export default function DistrictDraw(screen) {
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
    self.renderVoronoi = (districtMap, districtMapWidth, districtMapHeight) => {
        self.renderVoronoiGeneral(districtMap, 0, 0, districtMapWidth, districtMapHeight, null, renderAreaText)
    }

    self.renderVoronoiColors = (districtMap, x, y, districtMapWidth, districtMapHeight, colors) => {
        self.renderVoronoiGeneral(districtMap, x, y, districtMapWidth, districtMapHeight, colors, undefined)
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
    self.renderVoronoiGeneral = (districtMap, x, y, districtMapWidth, districtMapHeight, colors, textFunction) => {
        const { ctx } = screen
        const { voronoi, nd } = districtMap
        ctx.save()
        const scaleX = districtMapWidth
        const scaleY = districtMapHeight
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
            if (textFunction !== undefined) textFunction(districtMap, i) // option
        }
        ctx.restore()
    }

    function renderAreaText(districtMap, i) {
        const { ctx } = screen
        const { centroids, polygonAreas } = districtMap
        const c = centroids[i]
        const textHeight = 0.1
        // const areaText = textPercent(polygonAreas[i] / (districtMap.totalArea))
        const area = polygonAreas[i]
        const area1000 = area * 1000
        const areaText = area1000.toFixed(0)
        drawStrokedColor(areaText, c[0], c[1] + textHeight * 0.5, textHeight, 0.2, '#222', 1, ctx)
    }
}
