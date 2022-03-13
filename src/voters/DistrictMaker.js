/** @module */

import lloydVoronoi from './lloydVoronoi.js'
import { polygonArea } from '../../lib/d3-polygon/src/index.js'
import { drawStrokedColor } from '../utilities/graphicsUtilities.js'
import geoCensus from './geoCensus.js'
/**
 * Makes and draws district boundaries.
 * Right now, just for a uniform square geography.
 * @param {Screen} screen
 * @constructor
 */
export default function DistrictMaker(screen) {
    const self = this

    /**
     * Define district lines and count demographics.
     * @param {Number} nx - number of voter cells in x
     * @param {Number} ny - number of voter cells in y
     * @param {Number} nd - number of districts.
     */
    self.make = (nx, ny, nd) => {
        [self.centroids, self.voronoi, self.polygons] = lloydVoronoi(nx, ny, nd, 0.01)
        self.nx = nx
        self.ny = ny
        self.nd = nd
        self.polygonAreas = self.polygons.map(polygonArea).map((x) => -x)
        self.totalArea = nx * ny

        self.census = geoCensus(self)
    }

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
        const { gctx } = screen
        const {
            voronoi, nx, ny, nd,
        } = self
        gctx.save()
        const scaleX = geoMapWidth / nx
        const scaleY = geoMapHeight / ny
        gctx.translate(x, y)
        gctx.scale(scaleX, scaleY)
        for (let i = 0; i < nd; i++) {
            gctx.beginPath()
            gctx.strokeStyle = '#333'
            gctx.lineWidth = 1 / scaleX
            voronoi.renderCell(i, gctx)
            if (colors !== null) { // option
                gctx.fillStyle = colors[i]
                gctx.fill()
            }
            gctx.stroke()
            if (textFunction !== undefined) textFunction(i) // option
        }
        gctx.restore()
    }

    function renderAreaText(i) {
        const { gctx } = screen
        const c = self.centroids[i]
        const textHeight = 1
        // const area = textPercent(self.polygonAreas[i] / (self.nx * self.ny))
        const area = self.polygonAreas[i].toFixed(0)
        drawStrokedColor(area, c[0], c[1] + textHeight * 0.5 - 0.2, textHeight, 0.2, '#222', gctx)
    }
}
