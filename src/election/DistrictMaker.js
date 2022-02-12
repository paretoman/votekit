import lloydVoronoi from './lloydVoronoi.js'
import { polygonArea } from '../../lib/d3-polygon/src/index.js'
import { drawStrokedColor } from '../sim/entities/graphicsUtilities.js'
import geoCensus from './geoCensus.js'
/**
 * Makes and draws district boundaries.
 * Right now, just for a uniform square geography.
 * @param {Screen} screen
 */
export default function DistrictMaker(screen) {
    const self = this

    self.make = (nx, ny, n) => {
        [self.centroids, self.voronoi, self.polygons] = lloydVoronoi(nx, ny, n, 0.01)
        self.nx = nx
        self.ny = ny
        self.n = n
        self.polygonAreas = self.polygons.map(polygonArea).map((x) => -x)
        self.totalArea = nx * ny
    }

    self.census = () => geoCensus(self)

    /**
     * Draw Voronoi cell boundaries.
     * @param {Number} geoMapWidth - width of image
     * @param {Number} geoMapHeight - height of image
     */
    self.renderVoronoi = (geoMapWidth, geoMapHeight) => {
        self.renderVoronoiColors(0, 0, geoMapWidth, geoMapHeight, null, renderAreaText)
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
        const { ctx } = screen
        const {
            centroids, voronoi, nx, ny,
        } = self
        const n = centroids.length
        ctx.save()
        const scaleX = geoMapWidth / nx
        const scaleY = geoMapHeight / ny
        ctx.translate(x, y)
        ctx.scale(scaleX, scaleY)
        for (let i = 0; i < n; i++) {
            ctx.beginPath()
            ctx.strokeStyle = '#333'
            ctx.lineWidth = 1 / scaleX
            voronoi.renderCell(i, ctx)
            if (colors !== null) { // option
                ctx.fillStyle = colors[i]
                ctx.fill()
            }
            ctx.stroke()
            if (textFunction !== undefined) renderAreaText(i) // option
        }
        ctx.restore()
    }

    function renderAreaText(i) {
        const { ctx } = screen
        const c = self.centroids[i]
        const textHeight = 1
        // const area = textPercent(self.polygonAreas[i] / (self.nx * self.ny))
        const area = self.polygonAreas[i].toFixed(0)
        drawStrokedColor(area, c[0], c[1] + textHeight * 0.5 - 0.2, textHeight, 0.2, '#222', ctx)
    }
}
