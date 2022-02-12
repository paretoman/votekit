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

    self.renderVoronoi = (geoMapWidth, geoMapHeight) => {
        const { ctx } = screen
        const {
            centroids, voronoi, nx, ny,
        } = self
        const n = centroids.length
        ctx.save()
        const scaleX = geoMapWidth / nx
        const scaleY = geoMapHeight / ny
        ctx.scale(scaleX, scaleY)
        for (let i = 0; i < n; i++) {
            ctx.beginPath()
            ctx.lineWidth = 2 / scaleX
            voronoi.renderCell(i, ctx)
            ctx.stroke()
            renderAreaText(i)
        }
        ctx.restore()
    }

    self.renderVoronoiWinners = (geoMapWidth, geoMapHeight, winnerColors) => {
        const { ctx } = screen
        const {
            centroids, voronoi, nx, ny,
        } = self
        const n = centroids.length
        ctx.save()
        const scaleX = geoMapWidth / nx
        const scaleY = geoMapHeight / ny
        ctx.translate(400, 0)
        ctx.scale(scaleX, scaleY)
        for (let i = 0; i < n; i++) {
            ctx.beginPath()
            ctx.lineWidth = 2 / scaleX
            voronoi.renderCell(i, ctx)
            ctx.fillStyle = winnerColors[i]
            ctx.fill()
            ctx.stroke()
        }
        ctx.restore()
    }

    function renderAreaText(i) {
        const { ctx } = screen
        const c = self.centroids[i]
        const textHeight = 1
        // const area = textPercent(self.polygonAreas[i] / (self.nx * self.ny))
        const area = self.polygonAreas[i].toFixed(0)
        drawStrokedColor(area, c[0], c[1] - textHeight * 0.5 - 0.2, textHeight, 0.2, '#222', ctx)
    }
}
