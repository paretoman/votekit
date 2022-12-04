/** @module */

import { drawStrokedColor } from '../utilities/graphicsUtilities.js'
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
     * @param {Number} geoMapWidth - width of image
     * @param {Number} geoMapHeight - height of image
     */
    self.renderVoronoi = (geoMapWidth, geoMapHeight) => {
        self.renderVoronoiGeneral(0, 0, geoMapWidth, geoMapHeight, null, renderAreaText)
    }

    self.renderVoronoiColors = (x, y, geoMapWidth, geoMapHeight, colors) => {
        self.renderVoronoiGeneral(x, y, geoMapWidth, geoMapHeight, colors, undefined)
    }
    /**
     * Draw a Voronoi Diagram
     * @param {Number} x - translate image
     * @param {Number} y - translate image
     * @param {Number} geoMapWidth - width of image
     * @param {Number} geoMapHeight - height of image
     * @param {string[]} colors - an option, say "null" if do not want colors
     * @param {Function} textFunction - an option, defaults to undefined
     */
    self.renderVoronoiGeneral = (x, y, geoMapWidth, geoMapHeight, colors, textFunction) => {
        const { mctx } = screen
        const {
            voronoi, nx, ny, nd,
        } = districtMaker
        mctx.save()
        const scaleX = geoMapWidth / nx
        const scaleY = geoMapHeight / ny
        mctx.translate(x, y)
        mctx.scale(scaleX, scaleY)
        for (let i = 0; i < nd; i++) {
            mctx.beginPath()
            mctx.strokeStyle = '#333'
            mctx.lineWidth = 1 / scaleX
            voronoi.renderCell(i, mctx)
            if (colors !== null) { // option
                mctx.fillStyle = colors[i]
                mctx.fill()
            }
            mctx.stroke()
            if (textFunction !== undefined) textFunction(i) // option
        }
        mctx.restore()
    }

    function renderAreaText(i) {
        const { mctx } = screen
        const { centroids, polygonAreas } = districtMaker
        const c = centroids[i]
        const textHeight = 1
        // const area = textPercent(polygonAreas[i] / (districtMaker.nx * districtMaker.ny))
        const area = polygonAreas[i].toFixed(0)
        drawStrokedColor(area, c[0], c[1] + textHeight * 0.5 - 0.2, textHeight, 0.2, '#222', 1, mctx)
    }
}
